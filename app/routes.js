import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import Home from './containers/Home'
import Login from './containers/Login'
import SignUp from './containers/SignUp'
import Board from './containers/Board'

export default (
	<Route path="/" component = {App} >
		<IndexRoute component={Home}/>
		<Route path="login" component = {Login}/>
		<Route path="signup" component = {SignUp}/>
		<Route path="board/:boardId" component = {Board}/>
	</Route>
)