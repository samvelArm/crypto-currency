import {
    GET_STATS_STREAM_START,
    GET_STATS_STREAM_UPDATE
} from "../actions/action-types";

const initialState = {
    streamData: {
        bids: [],
        asks: []
    },
    isStarted: false,
    dataNumber: 0,
}


export default (state = initialState, action) => {
    console.log('state=', state);
    switch (action.type) {
        case GET_STATS_STREAM_START:
            return {
                ...state,
                isStarted: true
            };
        case GET_STATS_STREAM_UPDATE:
            return {
                ...state,
                streamData: action.payload,
                dataNumber: state.dataNumber + 1
            };
        default:
            return state;
    }
}