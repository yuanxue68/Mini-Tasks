import React from 'react'
import {render} from 'react-dom'
import Root from './containers/Root'
import configureStore from './stores/configureStore'
import 'isomorphic-fetch'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

const store = configureStore()

render(
	<Root store = {store} />, document.getElementById('root')
)
