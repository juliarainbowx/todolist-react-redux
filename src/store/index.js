import { combineReducers, createStore } from 'redux'

import globalReducer from './global/globalReducer'
import counterReducer from './counter/counterReducer'
import tasksReducer from './tasks/tasksReducer'

const reducers = combineReducers({
    global:globalReducer,
    counter:counterReducer,
    todos:tasksReducer
})

export default createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())