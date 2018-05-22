import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Header from '../containers/Header';
import { authUser } from '../actions/account';
import { fetchEvent } from '../actions/event';
import EventBox from './EventBox';
import AttendeesBox from '../components/AttendeesBox';

const Details = styled.div`
    margin: 60px 80px;
    font-family: 'Hind-Regular';

    h5 {
        font-size: 11px;
        color: #a3a7ae;
    }
`;

const PanelDashboard = styled.div`
    margin-top: 25px;
    display: flex;
`;

export class EventDetails extends Component {
	componentDidMount(){
		const { dispatch, match } = this.props;
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
			dispatch(fetchEvent({
				id: match.params.id
			}));
		}
	}

    
	render(){
		const { authUser, event } = this.props;
		return (
			<div>
				<Header
					authUser={authUser}
					backTo={{
						label: 'Back to events',
						url: '/'
					}}
                    
				/>
				<Details>
					<div>
						<h5>DETAIL EVENT #{event.id}</h5>
					</div>
					<PanelDashboard>
						<EventBox 
							enableRelocation={false}
							key={event.id} 
							event={event}
							viewMode="BLOCK_EXTENDED"
						/>
						<AttendeesBox attendees={event.attendees || []}/>
					</PanelDashboard>
				</Details>
			</div>);
	}
}

EventDetails.propTypes = {
	dispatch: PropTypes.func,
	authUser: PropTypes.object,
	history: PropTypes.object,
	event: PropTypes.object,
	match: PropTypes.object
};

export const mapStateToProps = (state) => ({
	authUser: state.account.authUser,
	event: state.event.event
});

export default connect(mapStateToProps)(EventDetails) ;
