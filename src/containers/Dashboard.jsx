import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../containers/Header';
import { authUser } from '../actions/account';
import { fetchEvents } from '../actions/event';

import MagicBox from '../components/MagicBox';
import DashboardPanel from '../components/DashboardPanel';

export class Dashboard extends Component {
	constructor(props){
		super(props);

		this.state = {
			currentOption: 'ALL_EVENTS',
			viewMode: 'BLOCK'
		};
	}

	componentDidMount(){
		const { dispatch } = this.props;
		const id = window.sessionStorage.getItem('id');
		if(!id){
			window.location = '/login';
		} else {
			const auth = {
				id
			};
			Object.keys(window.sessionStorage)
				.forEach(key => auth[key] = window.sessionStorage.getItem(key));
			dispatch(authUser(auth));
			dispatch(fetchEvents({
				params: {}
			}));
		}
	}

	render(){
		const { authUser, events } = this.props;
		
		return (<div>
			<Header 
				authUser={authUser}
			/>
			<DashboardPanel 
				events={events}
			/>
			<MagicBox action={{
				label: '+',
				action: ()=> window.location = '/create'
			}} />
		</div>);
	}
}

Dashboard.propTypes = {
	dispatch: PropTypes.func,
	authUser: PropTypes.object,
	history: PropTypes.object,
	events: PropTypes.array
};


export const mapStateToProps = (state) => ({
	authUser: state.account.authUser,
	events: state.event.events
});

export default connect(mapStateToProps)(Dashboard);
