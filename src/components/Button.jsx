import React, { Component } from 'react';
import styled from 'styled-components';

const ButtonForm = styled.button`
    background-color: #22D585;
    border: none;
    color: white;
    padding: 15px 80px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    border-radius: 3px;
    font-family: 'Hind-Regular';
`;

export class Button extends Component {
	render(){
		const props = this.props;
		return (<ButtonForm {...props}/>);
	}
}

export default Button;
