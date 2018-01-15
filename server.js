const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const proxy = require('http-proxy-middleware');
const WS = require('ws');
const _ = require('lodash');
const fs = require('fs');
const moment = require('moment');

const pair = 'btcusd';

const conf = {
    wshost: "wss://api.bitfinex.com/ws/2"
}

const BOOK = {}

console.log(pair, conf.wshost)

let connected = false;
let connecting = false;
let cli;

function connect() {
    if (connecting || connected) return
    connecting = true

    cli = new WS(conf.wshost, { /*rejectUnauthorized: false*/ })

    cli.on('open', function open() {
        console.log('WS open')
        connecting = false
        connected = true
        BOOK.bids = {}
        BOOK.asks = {}
        BOOK.psnap = {}
        BOOK.mcnt = 0
        cli.send(JSON.stringify({ event: "subscribe", channel: "book", pair: pair, prec: "P0" }))
    })

    cli.on('close', function open() {
        console.log('WS close')
        connecting = false
        connected = false
    })

    cli.on('message', function(msg) {
        msg = JSON.parse(msg)

        if (msg.event) return
        if (msg[1] === 'hb') return

        if (BOOK.mcnt === 0) {
            _.each(msg[1], function(pp) {
                pp = { price: pp[0], cnt: pp[1], amount: pp[2] }
                const side = pp.amount >= 0 ? 'bids' : 'asks'
                pp.amount = Math.abs(pp.amount)
                BOOK[side][pp.price] = pp
            })
        } else {
            let pp = { price: msg[1], cnt: msg[2], amount: msg[3], ix: msg[4] }
            if (!pp.cnt) {
                let found = true
                if (pp.amount > 0) {
                    if (BOOK['bids'][pp.price]) {
                        delete BOOK['bids'][pp.price]
                    } else {
                        found = false
                    }
                } else if (pp.amount < 0) {
                    if (BOOK['asks'][pp.price]) {
                        delete BOOK['asks'][pp.price]
                    } else {
                        found = false
                    }
                }
                if (!found) {
                    fs.appendFileSync(logfile, "[" + moment().format() + "] " + pair + " | " + JSON.stringify(pp) + " BOOK delete fail side not found\n")
                }
            } else {
                let side = pp.amount >= 0 ? 'bids' : 'asks'
                pp.amount = Math.abs(pp.amount)
                BOOK[side][pp.price] = pp
            }
        }

        _.each(['bids', 'asks'], function(side) {
            let sbook = BOOK[side]
            let bprices = Object.keys(sbook)

            let prices = bprices.sort(function(a, b) {
                if (side === 'bids') {
                    return +a >= +b ? -1 : 1
                } else {
                    return +a <= +b ? -1 : 1
                }
            })

            BOOK.psnap[side] = prices
            //console.log("num price points", side, prices.length)
        })

        BOOK.mcnt++
        checkCross(msg)
    })
}

setInterval(function() {
    if (connected) return
    connect()
}, 2500)

function checkCross(msg) {
    let bid = BOOK.psnap.bids[0]
    let ask = BOOK.psnap.asks[0]
    if (bid >= ask) {
        let lm = [moment.utc().format(), "bid(" + bid + ")>=ask(" + ask + ")"]
        fs.appendFileSync(logfile, lm.join('/') + "\n")
    }
}


const app = express();

const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

app.use(express.static(__dirname + '/www'));

app.use('/bitfinex', proxy({
  target: 'https://api.bitfinex.com/v1',
  changeOrigin: true,
  pathRewrite: {'/bitfinex': ''}
}))

const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://localhost', host, port);
});

const wss = new WS.Server({server: app, port: 3001});

var isClientConnected = false;
var interval;

wss.on('connection', function connection(ws) {
    isClientConnected = true;
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    ws.on('error', function incoming(message) {
        console.log('received: %s', message);
        isClientConnected = false;
    });

    function saveBook() {
        if (isClientConnected) {
            try {
                ws.send(JSON.stringify(BOOK));
            } catch (e) {
                console.log('error=', e);
            }
        } else {
            clearInterval(interval);
        }
    }
    interval = setInterval(function() {
        saveBook()
    }, 1000)
});

