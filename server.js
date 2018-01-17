const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const proxy = require('http-proxy-middleware');
const WS = require('ws');
const _ = require('lodash');

const pair = 'BTCUSD';
const symbol = 'tBTCUSD';

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
        cli.send(JSON.stringify({
            event: "subscribe",
            channel: "book",
            symbol: symbol,
            pair: pair,
            prec: "P0",
            freq: "F1",
            len: "100"
        }))
    })

    cli.on('close', function open() {
        console.log('WS close')
        connecting = false
        connected = false
    })

    cli.on('message', function(msgJSON) {
        let msg;
        try {
            msg = JSON.parse(msgJSON)
        } catch(e) {
            console.log("Error", e);
        }
        if (msg.event) return
        if (msg[1] === 'hb') return

        if (msg && msg[1] && Array.isArray(msg[1]) && Array.isArray(msg[1][0])) {
            // Snapshot
            _.each(msg[1], function(pp) {
                pp = { price: pp[0], count: pp[1], amount: pp[2] }
                const side = pp.amount > 0 ? 'bids' : 'asks'
                BOOK[side][pp.price] = pp
            })
        } else {
            // Update
            const price = msg[1][0];
            const count = msg[1][1];
            const amount = msg[1][2];

            const side = amount > 0 ? 'bids' : 'asks'

            if (count === 0) {
                delete BOOK[side][price];
            } else if (count > 0) {
                BOOK[side][price] = {price, amount, count};
            }
        }
    })
}

setInterval(function() {
    if (connected) return
    connect()
}, 2500)

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
  target: 'https://api.bitfinex.com/v2',
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

    ws.on('close', function incoming(message) {
        console.log('received: %s', message);
        isClientConnected = false;
    });

    function saveBook() {
        if (isClientConnected) {
            try {
                ws.send(JSON.stringify(BOOK));
            } catch (e) {
                // console.log('error=', e);
            }
        } else {
            clearInterval(interval);
        }
    }
    interval = setInterval(function() {
        saveBook()
    }, 1000)
});

