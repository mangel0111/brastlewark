import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ContextMenu from '../components/ContextMenu';
import arrowBack from '../assets/images/arrowBack.png';

const HeaderBar = styled.nav`
    height: 40px;
`;

const NavBar = styled.div`
    display: flex;
`;

const BackTo =  styled.div`
	margin: 10px auto 0 auto;
	font-family: 'Hind-Regular';
	font-size: 14px;
	color: #575758;
	cursor: pointer;

	img {
		width: 30px;
		position: relative;
		top: 10px;
		right: 5px;
	}
`;

const Icon = styled.div`
    font-family: 'Hind-SemiBold';
    font-size: 28px;
	margin: 0 30px;
	cursor: pointer;
`;

const ProfileInformation = styled.div`
    font-family: 'Hind-Light';
    margin: 10px 0 0 ${props => props.backTo ? '0': 'auto'};
    font-size: 15px;
    color: #b7b7b7;
	padding: 0 30px;
	cursor: pointer;
	z-index: 9999;
    position: absolute;
    right: 10px;
`;

const Close = styled(ProfileInformation)`
	color: #232323;

	span {
		font-size: 20px;
		font-weight: bolder;
	}
`;

const Gradient = styled.div`
    background: linear-gradient(#eaeaea, #f9f9fb);
    height: 20px;
`;

const IconInitials = styled.span`
    border-radius: 50%;
    background: #b7b7b7;
    color: #7f7f7f;
    padding: 5px 7px;
    margin-right: 10px;
`;

const Link = styled.a`
	color: #7f7f7f;
	margin-left: 5px;
	font-size: 14px;
	cursor: pointer;
	z-index: 99999;
	text-decoration: none;
`;

export class Header extends Component {

	render(){
		const { authUser, light, backTo, canClose, signUp } = this.props;
		let name = 'Don\'t\' have account?';
		let initials = '';
		let optionsVisible = false;
		if(authUser.firstName){
			optionsVisible = true;
			name = `${authUser.firstName} ${authUser.lastName}`;
			initials = `${authUser.firstName.charAt(0)} ${authUser.lastName.charAt(0)}`;
		}
	
		let href = '/SignUp';
		if(signUp) {
			href = '/login';
		}
		return (
			<HeaderBar>
				<Gradient />
				<NavBar>
					<Icon onClick={()=> window.location = '/'} light={light}>E.</Icon>
					{
						backTo && backTo.label &&
						<BackTo
							onClick={()=> window.location= backTo.url}
						>
							<img src={arrowBack} alt="arrowBack" />{backTo.label}
						</BackTo>
					}
					{
						canClose ? 
							<Close
								onClick={()=> window.location = '/'}
								backTo={backTo}
							> 
								<span>x</span> Close
							</Close>
							:
							<ProfileInformation
								backTo={backTo && backTo.label}
							>
								{initials && <IconInitials onClick={()=> window.location='/profile'}>{initials}</IconInitials>}
								<span onClick={()=> window.location='/profile'}>
									{name}
								</span>
								{!authUser.firstName && <Link href={href}>{signUp ? 'SIGN IN': 'SIGN UP'}</Link>}
								{
									optionsVisible &&
							<ContextMenu 
								actions={[{
									key:'logut',
									label: 'Log Out',
									onClick:(e)=> {
										e.stopPropagation();
										window.sessionStorage.clear();
										window.location = '/login';
									}
								}]}
							/>}	
							</ProfileInformation>
							
					}
					
				</NavBar>
			</HeaderBar>);
	}
}

Header.defaultProps ={
	authUser: {},
	light: false,
	signUp: false
};

Header.propTypes = {
	canClose: PropTypes.bool,
	authUser: PropTypes.object,
	light: PropTypes.bool,
	backTo: PropTypes.object,
	signUp: PropTypes.bool
};

export default Header;
