import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Dashboard from './containers/Dashboard';
import EventDetails from './containers/EventDetails';
import Login from './containers/Login';
import CreateEvent from './containers/CreateEvent';
import Profile from './containers/Profile';
import SignUP from './containers/SignUp';
import Loading from './containers/Loading';

class App extends Component {
	render() {
		return (
			<div>
				<Loading />
				<Switch>
					<Route exact path='/' component={Dashboard}/>
					<Route exact path='/event/edit/:id' component={EventDetails}/>
					<Route exact path='/event/details/:id' component={EventDetails}/>
					<Route path='/login' component={Login}/>
					<Route path='/create' component={CreateEvent}/>
					<Route path='/profile' component={Profile}/>
					<Route path='/signup' component={SignUP}/>
				</Switch>
			</div>
		);
	}
}

App.propTypes = {
	authUser: PropTypes.object
};

export const mapStateToProps = (state) => ({
	authUser: state.account.auth
});

export default connect(mapStateToProps)(App);
