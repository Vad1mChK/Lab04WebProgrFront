import { legacy_createStore as createStore } from 'redux'
import reducer, { ReducerState } from './reducer'

const initialState = new ReducerState([], 1)

const store = createStore(reducer, initialState)

export default store