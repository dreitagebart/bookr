import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import root from './root'
import project from './project'
import settings from './settings'
import tracker from './tracker'
import projectMW from '../middlewares/project'

const middleware = applyMiddleware(thunk, projectMW)

const store = combineReducers({ root, project, tracker, settings })

export default createStore(store, middleware)
