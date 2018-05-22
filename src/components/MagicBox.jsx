import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import styled from 'styled-components';

const Box = styled.div`
	background-color: #2c353d;
    color: white;
    position: fixed;
	bottom: 25px;
	right: 25px;
    padding: 15px 20px;
	border-radius: 50%;
	box-shadow: 0 2px #d9d7d7;
	box-shadow: 0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.2);
	cursor: pointer;
`;

export class MagicBox extends Component {
	render(){
		const { action = {} } = this.props;
		return (<Box onClick={action.action}>{action.label}</Box>);
	}
}

MagicBox.propTypes = {
	action: PropTypes.object
};

export default MagicBox;
