import { getStats } from "./stats";
import { getStream } from "./stream";
import 'whatwg-fetch';

export const getStatsData = (code) => {
  return (dispatch) => {
      dispatch(getStats.request());

      const url = `/bitfinex/book/tBTCUSD/P0?len=100`

      fetch(url, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
          },
      }).then((data) => {
        data.json().then((jsonData) => {
            const dataToSend = {
                asks: [],
                bids: [],
            }
            jsonData.forEach((data) => {
                const price  = data[0];
                const count = data[1];
                const amount = data[2];
                const side = amount > 0 ? 'bids' : 'asks';
                dataToSend[side].push({price, count, amount})
            })
            
          dispatch(getStats.success(dataToSend))
        }).catch(() => {
          dispatch(getStats.failure('Not Found'))
        })
      }).catch((error) => {
        dispatch(getStats.failure(error.message))
      })
  }
}


export const getStreamData = () => {
    return (dispatch) => {
        dispatch(getStream.request())
        let socket = new WebSocket('ws:localhost:3001');

        // Connection opened
        socket.addEventListener('open', function (event) {
            socket.send('Hello Server!', event);
        });

        socket.addEventListener('error', function (event) {
            socket.send('Error!', event);
        });

        // Listen for messages
        socket.addEventListener('message', function (event) {
            const data = JSON.parse(event.data);

            const dataToSend = {
                asks: [],
                bids: [],
            }
            
            console.log('data.asks=', data.asks);

            Object.keys(data.asks).forEach((key) => {
                dataToSend.asks.push(data.asks[key]);
            })

            Object.keys(data.bids).forEach((key) => {
                dataToSend.bids.push(data.bids[key]);
            })

            dispatch(getStream.success(dataToSend))
        });
    }
}