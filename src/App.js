import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Dashboard from './containers/Dashboard';
import Loading from './containers/Loading';

class App extends Component {
	render() {
		return (
			<div>
				<Loading />
				<Switch>
					<Route exact path='/' component={Dashboard}/>
				</Switch>
			</div>
		);
	}
}

export default connect()(App);
