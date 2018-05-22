import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';
import profile from '../assets/images/profile.png';
import { attendEvent, unattendEvent } from '../actions/event';

const EventBoxPanel = styled.div`
	font-family: 'Hind-Regular';
	margin: 0 20px 20px 0;
	background: white;
	padding: 20px;
	padding-bottom: 0;
	max-width: ${(props)=> props.viewMode !== 'BLOCK' ? props.viewMode === 'LIST' ? 'none': '800px': '305px'};
	border: 1px solid #fafafa;
	box-shadow: 1px 2px #ececec;
	flex: 1 100%;
	display: ${(props)=> props.viewMode !== 'LIST' ? 'inline-block': 'inline-flex'};
	
	p {
		margin: 0;
		font-size: 12px;
		color: #888686;
	}

	h5 {
		color: #a2a1a1;
		font-weight: normal;
		display: flex;
		margin-top: ${(props)=> props.viewMode === 'LIST' ? '4px': '23px'};
	}
`;


const EventButton = styled.span`
	cursor: pointer;
	background-color: ${(props) => props.action};
	border: none;
	color: white;
	padding: 2px 20px;
	text-align: center;
	-webkit-text-decoration: none;
	text-decoration: none;
	display: inline-block;
	font-size: 14px;
	border-radius: 3px;
	font-family: 'Hind-Regular';
	margin-left: auto;
	position: relative;
	top: -4px;
	left: ${(props) => props.viewMode === 'LIST'? '80px': 0};
`;

const DateEvent = styled.h5`
	color: #c3c3c3 !important;
	font-size: 12px;
	margin: 10px 0 10px;
	width: 160px;
`;

const IconPeople = styled.img`
	width: 17px;
	position: relative;
	top: 1px;
`;

const Name = styled.div`
	width: 300px;
	font-size: ${props => props.viewMode === 'BLOCK_EXTENDED' ? '36px' : '16px'}
`;

const Description = styled.h5`
	display: inline-block !important;
    width: 220px;
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis;
`;

const Author = styled.p`
	margin: 5px 30px !important;
	width: 90px;
`;

const Attendee = styled.h5`
	margin-left: 40px;
`;


export class EventBox extends Component {
	getBlock({ event }){
		const { viewMode, enableRelocation = true } = this.props;
		return (
			<EventBoxPanel 
				onClick={()=> enableRelocation ? window.location = `/event/${event.id}`: false}
				viewMode={viewMode}
				key={event.id}
			>
				<DateEvent>{this.getDate(event)}</DateEvent>
				<Name viewMode={viewMode}>{event.title}</Name>
				{event.owner && <p>{`${event.owner.firstName} ${event.owner.lastName}`}</p>}
				<h5>{event.description}</h5>
				<h5>
					<span>
						<IconPeople src={profile} alt={'profile'}/> 
					</span>
					{event.attendees && `${event.attendees.length} of ${event.capacity}`}
					{this.getEventButton({ event })}
				</h5>
			</EventBoxPanel>);
	}

	getList({ event }){
		const { viewMode, enableRelocation = true } = this.props;
		return (
			<EventBoxPanel 
				onClick={()=> enableRelocation ? window.location = `/event/${event.id}`: false}
				viewMode={viewMode} 
				key={event.id}
			>
				<Name>{event.title}</Name>
				<Description>{event.description}</Description>
				{event.owner && <Author>{`${event.owner.firstName} ${event.owner.lastName}`}</Author>}
				<DateEvent>{this.getDate(event)}</DateEvent>
				<Attendee>
					{`${event.attendees.length} of ${event.capacity}`}
					{this.getEventButton({ event })}
				</Attendee>
			</EventBoxPanel>);
	}
    
	getDate({ startsAt }){
		const date = moment(startsAt).format('MMMM Do, YYYY - h:mm a');
		return date;
	}
    
	getEventButton({ event }){
		const { authUser, viewMode } = this.props;
		let label = 'Join';
		let action = '#4CAF50';
		if(event.attendees  && event.attendees.find(attendee => attendee.id === authUser.id)){
			label = 'Leave';
			action = '#fc4482';
		}
		if(event.owner && event.owner.id === authUser.id) {
			label = 'Edit';
			action = '#FFFFFF';
		}
		return (
			<EventButton 
				viewMode={viewMode} 
				action={action}
				onClick={(e)=> {
					e.stopPropagation();
					const{ dispatch }= this.props;
					switch(label){
					case 'Join':
						dispatch(attendEvent(event));
						break;
					case 'Edit':
						break;
					case 'Leave':
						dispatch(unattendEvent(event));
						break;
					default:
						break;
					}
				}}
			>
				{label}
			</EventButton>);
	}	


	getView({ event }) {
		const { viewMode } = this.props;
		if(viewMode === 'LIST') {
			return this.getList({ event });
		}
		return this.getBlock({ event });
	}

	render(){
		const { event } = this.props;
		return (this.getView({ event }));
	}
}

EventBox.propTypes = {
	event: PropTypes.object,
	viewMode: PropTypes.string,
	authUser: PropTypes.object,
	dispatch: PropTypes.func,
	enableRelocation: PropTypes.bool
};

export const mapStateToProps = (state) => ({
	authUser: state.account.authUser
});

export default connect(mapStateToProps)(EventBox);
