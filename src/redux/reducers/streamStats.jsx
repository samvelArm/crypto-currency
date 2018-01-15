import {
    GET_STATS_STREAM_START,
    GET_STATS_STREAM_UPDATE
} from "../actions/action-types";

const initialState = {
    streamData: {
        bids: [],
        asks: []
    },
    isStarted: false
}


export default (state = initialState, action) => {
    switch (action.type) {
        case GET_STATS_STREAM_START:
            return {
                ...state,
                isStarted: true
            };
        case GET_STATS_STREAM_UPDATE:
            return {
                ...state,
                streamData: action.payload
            };
        default:
            return state;
    }
}