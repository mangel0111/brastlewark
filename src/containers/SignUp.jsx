import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Header from '../containers/Header';
import { createUser } from '../actions/account';
import phantomGray from '../assets/images/phantomGray.png';
import Input from '../components/Input';
import Button from '../components/Button';

const Panel = styled.div`
    display: flex;
    position: relative;
    top: -40px;
`;


const Phantom = styled.div`
    width: 30%;

    img {
		width: 30%;
		height: 100%;
		margin-bottom: -50px;
		position: fixed;
    }
`;

const LoginPage = styled.div`
    width: 35%;
    margin: 250px auto;
    font-family: 'Hind-Light';

    h1 {
        color: #353535;
        font-size: 22px;
        margin-bottom: 0;
    }

    p {
        font-family: 'Hind-Regular';
        margin-top: 0;
        font-size: 16px;
        color: ${props => props.error ? '#ff6297':'#7d7d7d'};
	}
	
	input {
		border-color: ${props => props.error ? '#ff6297':'#cac9c9'};
	}

	button {
		margin-top: 40px;
	}
`;


export class SignUp extends Component {
	
	constructor (props){
		super(props);
		this.state = {
			email: '',
			firstName: '',
			lastName: '',
			password: '',
			repeatPassword: '',
			errors: []
		};
	}

	signUp() {
		const { dispatch } = this.props;
		const {email, password, firstName, lastName } = this.state;
		const errors =  this.validate();
		if(errors.length > 0) {
			this.setState({ errors });
		} else {
			dispatch(createUser({
				data: {
					email,
					password,
					firstName,
					lastName
				}
			}));
		}
	}
	
	validate(){
		const { password, repeatPassword} = this.state;
		const errors = [];
		if(password !== repeatPassword) {
			errors.push({ key: 'repeatPassword', label: 'The password must match'});
		}
		if(repeatPassword === ''){
			errors.push({ key: 'repeatPassword', label: 'The password has to be filled up'});
		}
		return errors;
	}

	checkAuth(){
		const authId = window.sessionStorage.getItem('id');
		if(authId){
			window.location = '/';
		}
	}
    
	render(){
		const { error } = this.props;
		const { errors } = this.state;
		const errorsFiltered = [];
		Object.keys(error).forEach(key => {
			errorsFiltered.push({
				key,
				label: error[key].message 
			});
		});
		this.checkAuth();
		return (
			<div>
				<Header
					light
					signUp
				/>
				<Panel>
					<Phantom>
						<img src={phantomGray} alt={'logo'}/> 
					</Phantom>
					<LoginPage
						error={error}
					>
						
						<h1>Get Started absolutely free.</h1>
						{error ?
							<p>Oops! That email and password combination is not valid.</p>
							:
							<p>Enter your details below</p>
						}
						
						<form autoComplete="off">
							<Input 
								value={this.state.firstName}
								onChange={({ target })=> this.setState({firstName: target.value })} 
								title="First name" 
								autoComplete="off"
								error={errorsFiltered.find(error => error.key === 'firstName')}
								type="text"
							/>	
							<Input 
								value={this.state.lastName}
								onChange={({ target })=> this.setState({lastName: target.value })} 
								title="Last name" 
								autoComplete="off"
								error={errorsFiltered.find(error => error.key === 'lastName')}
								type="text"
							/>	
							<Input 
								value={this.state.email}
								onChange={({ target })=> this.setState({email: target.value })} 
								title="Email" 
								error={errorsFiltered.find(error => error.key === 'email')}
								autoComplete="off"
								type="email"
							/>		
							<Input 
								value={this.state.password}
								title="Password" 
								type="password"
								autoComplete="off"
								error={errorsFiltered.find(error => error.key === 'password')}
								onChange={({ target })=> this.setState({password: target.value })} 
							/>
							<Input 
								value={this.state.repeatPassword}
								title="Repeat Password" 
								type="password"
								autoComplete="off"
								error={errors.find(error => error.key === 'repeatPassword')}
								onChange={({ target })=> this.setState({repeatPassword: target.value })} 
							/>
						</form>
						<div><Button onClick={()=> this.signUp()}>SIGN UP</Button></div>
					</LoginPage>
				</Panel>
			</div>
		);
	}
}

SignUp.propTypes = {
	authUser: PropTypes.object,
	dispatch: PropTypes.func,
	history: PropTypes.object,
	error: PropTypes.string
};

export const mapStateToProps = (state) => ({
	authUser: state.account.authUser,
	error: state.account.error
});

export default connect(mapStateToProps)(SignUp);
