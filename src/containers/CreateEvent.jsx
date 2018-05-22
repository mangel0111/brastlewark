import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import styled from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';
import Header from './Header';
import { authUser } from '../actions/account';
import Input from '../components/Input';
import Button from '../components/Button';
import { createEvent } from '../actions/event';

const Dashboard = styled.div`
    display: flex;
`;

const CreateBox = styled.div`
    font-family: 'Hind-Regular';
    margin: 120px auto;
    background: white;
    padding: 20px;
    min-width: 320px;
    padding-bottom: 0;
    border: 1px solid #fafafa;
    box-shadow: 1px 2px #ececec;
    display: inline-block};
    text-align: center;

    h1 {
        font-weight: normal;
        font-size: 24px;
        margin-bottom: 0;
        color: #5a5959;
    }

    p {
        margin: 0;
        font-size: 14px;
        color: #a4a2a2;
    }

    div {
        display: inline-grid;

        input, button {
            margin-bottom: 15px;
        }
        button {
            width: 200px;
            padding: 15px 0px;
            margin: 20px auto 40px auto;
        }
    }

`;

export class CreateEvent extends Component {
    
	constructor (props) {
		super(props);
		this.state = {
			title: '',
			description: '',
			capacity: 0,
			date: '', 
			time:'',
			errors: []
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
		}
	}
    
	validate({ data }){	
		const validator = ['title','description', 'capacity','date', 'time'];
		const errors = validator
			.filter(validator => {
				return !data[validator];
			})
			.map(validator => ({ key: validator, label: `${validator[0].toUpperCase()}${validator.slice(1)} has to be filled up`}));
		return errors;
	}
    
	saveEvent(){
		const { dispatch }= this.props;
		const { title, description, capacity, date, time } = this.state;
		const data = {
			title, description, capacity, startsAt: `${date}T${time}Z`
		};
		const errors = this.validate({ data: { title, description, capacity, date, time} });
		if(errors.length === 0) {
			dispatch(createEvent({ data }));
		} else {
			this.setState({errors });
		}		
	}
    
	render(){
		const { errors } = this.state;
		return (
			<div>
				<Header
					canClose
				/>
				<Dashboard>
					<CreateBox>
						<h1>Create new event</h1>
						<p>Enter details below</p>
						<div>
							<Input
								onChange={({target})=> this.setState({ title : target.value})}
								placeholder="Title" 
								error={errors.find(error => error.key === 'title')}
							/>
							<Input 
								onChange={({target})=> this.setState({ description : target.value})}
								placeholder="Description" 
								error={errors.find(error => error.key === 'description')}
							/>
							<Input 
								type="date"
								onChange={({target})=> this.setState({ date : target.value})}
								placeholder="Date" 
								error={errors.find(error => error.key === 'date')}
							/>
							<Input 
								type="time"
								onChange={({target})=> this.setState({ time : target.value})}
								placeholder="Time" 
								error={errors.find(error => error.key === 'time')}
							/>
							<Input 
								type='number'
								min='0'
								max='1000'
								onChange={({target})=> this.setState({ capacity : target.value})}
								placeholder="Capacity" 
								error={errors.find(error => error.key === 'capacity')}
							/>
							<Button onClick={()=> this.saveEvent()}> CREATE NEW EVENT </Button>
						</div>
					</CreateBox>
				</Dashboard>
				
			</div>);
	}
}

CreateEvent.propTypes = {
	authUser: PropTypes.object,
	dispatch: PropTypes.func
};


export const mapStateToProps = (state) => ({
	authUser: state.account.authUser
});

export default connect(mapStateToProps)(CreateEvent);
