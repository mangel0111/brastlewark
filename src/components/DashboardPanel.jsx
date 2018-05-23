import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import EventBox from '../containers/EventBox';
import PropTypes from 'prop-types';
import BlockIcon from '../assets/images/icon-grid.png';
import ListIcon from '../assets/images/list_view.png';
const Dashboard = styled.div`
	margin: 60px 5%;
`;

const Options = styled.ul`
	display: flex;
	list-style-type: none;
	font-family: 'Hind-SemiBold';
	font-size: 10px;
`;

const ListOption = styled.li`
	margin-left: 30px;
	color: ${(props)=> props.isSelect ? 'black' :'#989696'};
	cursor: pointer;
`;

const EventsList = styled.div`
	margin: 40px 5%;
	display: flex;
	flex-wrap: wrap;

	p {
		font-family: 'Hind-Regular';
	}
`;

const ViewModel = styled.li`
	margin-left: auto;
	padding-right: 12%;
	padding-left: 10px;

	span {
		margin-left: 10px;
		cursor: pointer;
	}
`;

const ViewIcon = styled.img`
	${props => props.viewMode === 'LIST' && props.isList && `
		filter: invert(100%);
	`};

	${props => props.viewMode === 'LIST' && props.isBlock && `
		opacity: 0.5;
	`};
`;

const Title = styled.h1`
	font-family: 'Hind-Light';
	margin: 0 2%;
`;

const OptionsList = [{
	key: 'ALL_EVENTS',
	label: 'ALL EVENTS'
}, {
	key: 'FUTURE_EVENTS',
	label: 'FUTURE EVENTS'
}, {
	key: 'PAST_EVENTS',
	label: 'PAST EVENTS'
}];

export class DashboardPanel extends Component {
	constructor(props){
		super(props);

		this.state = {
			currentOption: 'ALL_EVENTS',
			viewMode: 'BLOCK'
		};
	}
	
	filterEvents({ events, currentOption }){ 
		let filteredEvents = events;
		if(currentOption === 'FUTURE_EVENTS' || currentOption === 'PAST_EVENTS') {
			filteredEvents = events.filter(event => {
				const eventDate = moment.utc(event.startsAt, 'YYYY-MM-DD[T]HH:mm[Z]');
				const today = moment.utc(moment(), 'YYYY-MM-DD[T]HH:mm[Z]');
				const isInFuture = eventDate.isAfter(today);
				return isInFuture && currentOption === 'FUTURE_EVENTS';
			});
		} 
		return filteredEvents;
	}

	render(){
		const { currentOption, viewMode } = this.state;
		const { events, showOptions = true  }= this.props;
		const filteredEvents = this.filterEvents({ currentOption, events });
		return (
			<Dashboard>
				<Options>
					{!showOptions && <Title>My Events</Title> }
					{showOptions && OptionsList.map(option => 
						<ListOption 
							key={option.key}
							isSelect={currentOption === option.key}
							onClick={()=> this.setState({
								currentOption: option.key
							})}
						>
							{option.label}
						</ListOption>
					)}
					<ViewModel>
						<span onClick={()=> this.setState({ viewMode: 'BLOCK'})}>
							<ViewIcon 
								viewMode={this.state.viewMode} 
								src={BlockIcon}  
								alt="block"
								isBlock
							/>
						</span>
						<span onClick={()=> this.setState({ viewMode: 'LIST'})}>
							<ViewIcon 
								viewMode={this.state.viewMode} 
								src={ListIcon} 
								alt="list"
								isList
							/>
						</span>
					</ViewModel>
				</Options>
				<EventsList viewMode={viewMode}>
					{filteredEvents.length !== 0 ? filteredEvents.map(event => 
						<EventBox 
							key={event.id} 
							event={event}
							viewMode={viewMode}
						/>): 
						<p>No events to display</p>
					}
				</EventsList>
			</Dashboard>
		);
	}
}

DashboardPanel.propTypes= {
	events: PropTypes.array,
	showOptions: PropTypes.bool
};

export default DashboardPanel;
