import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Header from '../containers/Header';
import { authUser } from '../actions/account';
import { fetchEvent, deleteEvent } from '../actions/event';
import EventBox from './EventBox';
import { getAuthUser } from '../utils/account-utils';
import AttendeesBox from '../components/AttendeesBox';
import EventEdit from './EventEdit';
import iconDelete from '../assets/images/icon-delete.png';

const Details = styled.div`
    margin: 60px 80px;
    font-family: 'Hind-Regular';

    h5 {
        font-size: 11px;
        color: #a3a7ae;
    }
`;
const EventHeader = styled.div`
	display: flex;
	margin-right: 40px;
`;

const DeleteEvent = styled.div`
	cursor: pointer;
	margin-left: auto;
	color: #ff4081;
	font-size: 11px;

	img {
		margin-right: 7px;
	}
`;

const PanelDashboard = styled.div`
    margin-top: 25px;
    display: flex;
`;

export class EventDetails extends Component {
	componentDidMount(){
		const { dispatch, match } = this.props;
		const auth = getAuthUser();
		dispatch(authUser(auth));
		dispatch(fetchEvent({
			id: match.params.id
		}));
	}

    
	render(){
		const { authUser, event, match } = this.props;
		const isEdit = match.path.includes('edit');

		let label = '';
		if(!isEdit){
			label = 'Back to events';
		}

		return (
			<div>
				<Header
					authUser={authUser}
					backTo={{
						label,
						url: '/'
					}}
				/>
				<Details>
					<EventHeader>
						<h5>DETAIL EVENT #{event.id}</h5>
						{
							isEdit && 
							<DeleteEvent
								onClick={()=> {
									const { dispatch, event } = this.props;
									dispatch(deleteEvent({ data: event }));
								}}
							>
								<img src={iconDelete} alt="icon delete" /> DELETE EVENT
							</DeleteEvent>
						}
					</EventHeader>
					<PanelDashboard>
						{
							isEdit ? 
								<EventEdit 
									key={event.id} 
									event={event}
								/>:
								<EventBox 
									enableRelocation={false}
									key={event.id} 
									event={event}
									viewMode="BLOCK_EXTENDED"
								/>
						}
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
