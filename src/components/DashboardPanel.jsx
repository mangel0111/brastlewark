import React, { Component } from 'react';
import styled from 'styled-components';
import EventBox from '../containers/EventBox';
import PropTypes from 'prop-types';

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
    
	render(){
		const { currentOption, viewMode } = this.state;
		const { events, showOptions = true  }= this.props;
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
						<span onClick={()=> this.setState({ viewMode: 'BLOCK'})}>Block</span>
						<span onClick={()=> this.setState({ viewMode: 'LIST'})}>List</span>
					</ViewModel>
				</Options>
				<EventsList viewMode={viewMode}>
					{events.length !== 0 && events.map(event => 
						<EventBox 
							key={event.id} 
							event={event}
							viewMode={viewMode}
						/>)}
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
