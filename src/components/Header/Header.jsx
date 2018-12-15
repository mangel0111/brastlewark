import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const HeaderBar = styled.nav`
    height: 40px;
`;

const NavBar = styled.div`
    display: flex;
`;

const Icon = styled.div`
    font-family: 'Hind-SemiBold';
    font-size: 28px;
	margin: 0 30px;
	cursor: pointer;
`;

const Gradient = styled.div`
    background: linear-gradient(#eaeaea, #f9f9fb);
    height: 20px;
`;

export class Header extends Component {

	render(){
		const { light } = this.props;
		
		return (
			<HeaderBar>
				<Gradient />
				<NavBar>
					<Icon onClick={()=> window.location = '/'} light={light}>W.</Icon>					
				</NavBar>
			</HeaderBar>);
	}
}

Header.defaultProps ={
	light: false
};

Header.propTypes = {
	light: PropTypes.bool
};

export default Header;
