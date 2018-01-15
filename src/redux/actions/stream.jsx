import {
    GET_STATS_STREAM_START,
    GET_STATS_STREAM_UPDATE
} from "./action-types";

export const getStream = {
    request: () => ({type: GET_STATS_STREAM_START}),
    success: (data) => ({type: GET_STATS_STREAM_UPDATE, payload: data})
}