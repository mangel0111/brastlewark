import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Input from '../components/Input';
import MagicBox from '../components/MagicBox';
import { updateEvent } from '../actions/event';

const EventBoxPanel = styled.div`
	font-family: 'Hind-Regular';
	margin: 0 30px 20px 0;
	background: white;
	padding: 40px 30px;;
	max-width: 800px;
	border: 1px solid #fafafa;
	box-shadow: 1px 2px #ececec;
	flex: 1 100%;
	display: 'inline-block';
	
	p {
		margin: 0;
		font-size: 12px;
		color: #888686;
	}

	h5 {
		color: #a2a1a1;
		font-weight: normal;
		display: flex;
		margin-top: 23px;
    }
    
    input {
        width: 97%;
    }

    div {
        margin-bottom: 25px;
    }
`;

const ErrorLabel = styled.p`
    color: #ff6297 !important;
    margin-bottom: 20px !important;
    font-size: 14px !important;
`;

export class EventEdit extends Component {
	constructor (props) {
		super(props);
		this.state = {
			changeState: false,
			errors: []
		};
	}
    
	validate({ data }){	
		const validator = ['title','description', 'capacity','startsAt'];
		const errors = validator
			.filter(validator => {
				return !data[validator];
			})
			.map(validator => ({ key: validator, label: `${validator[0].toUpperCase()}${validator.slice(1)} has to be filled up`}));
		return errors;
	}
    
	render(){
		const { errors } = this.state;
		const { event, eventErrors } = this.props;
		const errorsToDisplay = [];
		Object.keys(eventErrors).forEach(key =>errorsToDisplay.push(eventErrors[key]));
		return (
			<EventBoxPanel>
				{errorsToDisplay && errorsToDisplay.length > 0 && errorsToDisplay.map(errorToDisplay => 
					<ErrorLabel key={errorsToDisplay.path} >
						{`${errorToDisplay.message[0].toUpperCase()}${errorToDisplay.message.slice(1)}`}
					</ErrorLabel>)
				}
				<Input
					type="date"
					value={event && event.startsAt && event.startsAt.slice(0,10)}
					onChange={({target})=> {
						this.setState({ changeState: !this.state.changeState});
						event.startsAt = `${target.value}${event.startsAt.slice(10,event.startsAt.length)}`;
					}}
					error={errors.find(error => error.key === 'startsAt')}
					title="Date"
				/>
				<Input 
					type="time"
					value={event && event.startsAt && event.startsAt.slice(11,event.startsAt.length-1)}
					onChange={({target})=> {
						this.setState({ changeState: !this.state.changeState});
						event.startsAt = `${event.startsAt.slice(0,10)}T${target.value}Z`;
					}}
					title="Time" 
					error={errors.find(error => error.key === 'startsAt')}
				/>
				<Input
					value={event.title}
					onChange={({target})=> {
						this.setState({ changeState: !this.state.changeState});
						event.title = target.value;
					}}
					title="Title"
					error={errors.find(error => error.key === 'title')}
				/>
				<Input 
					value={event.description}
					onChange={({target})=> {
						this.setState({ changeState: !this.state.changeState});
						event.description = target.value;
					}}
					title="Description" 
					error={errors.find(error => error.key === 'description')}
				/>
				<Input 
					value={event.capacity}
					type='number'
					min='0'
					max='1000'
					onChange={({target})=> {
						this.setState({ changeState: !this.state.changeState});
						event.capacity = target.value;
					}}
					title="Capacity" 
					error={errors.find(error => error.key === 'capacity')}
				/>
				<MagicBox
					isAction={true}
					action={{
						label: '✓',
						action: ()=> {
							const { dispatch, event } = this.props;
							const errors = this.validate({ data: event });
							if(errors.length === 0) {
								dispatch(updateEvent({
									data: event
								}));
							} else {
								this.setState({ errors });
							}
						}
					}} 
				/>
			</EventBoxPanel>);
	}
}

EventEdit.propTypes = {
	event: PropTypes.object,
	dispatch: PropTypes.func,
	match: PropTypes.object,
	eventErrors: PropTypes.object
};

export const mapStateToProps = (state) => ({
	eventErrors: state.event.errors
}); 

export default connect(mapStateToProps)(EventEdit);
