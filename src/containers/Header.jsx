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

export class Header extends Component {

	render(){
		const { authUser, light, backTo, canClose } = this.props;
		let name = 'Don\'t\' have account?';
		let initials = '';
		let optionsVisible = false;
		if(authUser.firstName){
			optionsVisible = true;
			name = `${authUser.firstName} ${authUser.lastName}`;
			initials = `${authUser.firstName.charAt(0)} ${authUser.lastName.charAt(0)}`;
		}
		return (
			<HeaderBar>
				<Gradient />
				<NavBar>
					<Icon onClick={()=> window.location = '/'} light={light}>E.</Icon>
					{
						backTo && 
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
								backTo={backTo}
								onClick={()=> window.location='/profile'}
							>
								{initials && <IconInitials>{initials}</IconInitials>}
								{name}
								{
									optionsVisible &&
							<ContextMenu 
								actions={[{
									key:'logut',
									label: 'Log Out',
									onClick:()=> {
										window.sessionStorage.clear();
										window.location = '/login';
									}
								}]}
							/>
								}
							</ProfileInformation>
					}
				</NavBar>
			</HeaderBar>);
	}
}

Header.defaultProps ={
	authUser: {},
	light: false
};

Header.propTypes = {
	canClose: PropTypes.bool,
	authUser: PropTypes.object,
	light: PropTypes.bool,
	backTo: PropTypes.string
};

export default Header;
