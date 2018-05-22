import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Header from '../containers/Header';
import { loginUser } from '../actions/account';
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
        width: 100%;
        height: 800px;
        margin-bottom: -50px;
    }
`;

const LoginPage = styled.div`
    width: 35%;
    margin: 250px auto;
    font-family: 'Hind-Light';

    div {
        margin-top: 20px;
    }

    h1 {
        color: #353535;
        font-size: 22px;
        margin-bottom: 0;
    }

    p {
        font-family: 'Hind-Regular';
        margin-top: 0;
        font-size: 16px;
        color: #7d7d7d;
    }
`;

export class Login extends Component {
    
	login() {
		const { dispatch } = this.props;
		const {email, password} = this.state;
		dispatch(loginUser({
			data: {
				email,
				password
			}
		}));
	}
    
	checkAuth(){
		const authId = window.sessionStorage.getItem('id');
		if(authId){
			window.location = '/';
		}
	}
    
	render(){
		this.checkAuth();
		return (
			<div>
				<Header
					light
				/>
				<Panel>
					<Phantom>
						<img src={phantomGray} alt={'logo'}/> 
					</Phantom>
					<LoginPage>
						<h1>Sign In to Eventio.</h1>
						<p>Enter your details below</p>
						<div>
							<Input 
								onChange={({ target })=> this.setState({email: target.value })} 
								placeholder="Email" 
								type="email"
							/>
						</div>
						<div>
							<Input 
								placeholder="Password" 
								type="password"
								onChange={({ target })=> this.setState({password: target.value })} 
							/>
						</div>
						<div>
							<Button onClick={()=> this.login()}>SIGN IN</Button></div>
					</LoginPage>
				</Panel>
			</div>
		);
	}
}

Login.propTypes = {
	authUser: PropTypes.object,
	dispatch: PropTypes.func,
	history: PropTypes.object
};

export const mapStateToProps = (state) => ({
	authUser: state.account.authUser
});


export default connect(mapStateToProps)(Login);
