import {createStore, applyMiddleware, compose} from 'redux'
import {reduxReactRouter} from 'redux-router'
import createHistory from 'history/lib/createHashHistory'
import routes from '../routes'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers/RootReducer'

const finalCreateStore = compose(
	applyMiddleware(thunk),
	reduxReactRouter({routes, createHistory}),
	applyMiddleware(createLogger())
)(createStore)

export default function configureStore(initialState) {
	const store = finalCreateStore(rootReducer, initialState)
	return store
}