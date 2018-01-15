import { combineReducers } from 'redux';
import stats from './stats'
import streamStats from './streamStats'

const combinedReducers =  combineReducers({
    stats,
    streamStats
})

export default combinedReducers;