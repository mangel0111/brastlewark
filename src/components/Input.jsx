import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import iconEye from '../assets/images/icon-show.png';

const InputForm = styled.input`
    width: 300px;
    height: 25px;
    padding: 5px 30px 5px 5px;
    border: none;
    background-color: transparent;
    color: #4d555e;
    border-bottom: 1px solid ${(props) => props.error ? '#f56161': '#cac9c9'};
    z-index: 9999;

    &:focus {
        outline: none;
    }

    &::placeholder { 
        color: #4d555e;
        opacity: 1;
    }

    &[type=date],&[type=time] {
        margin-top: 20px;
    }

    &:-webkit-autofill{
        -webkit-box-shadow: 0 0 0 30px #f9f9fc inset !important;
    }
`;

const LabelError = styled.div`
    text-align: left;
    color: #f56161;
    font-size: 14px;
`;

const LabelTitle = styled.label`
    font-size: 12px;
    color: #dee1e3;
    position: relative;
    display: block;
    width: 20px;
    white-space: nowrap;
    transition: top 1s;
    top: ${props => props.isFocus ? '5px': props.value ? '5px': '30px'};
`;

const IconInput = styled.i`
    position: relative;
    left: -30px;
`;

export class Input extends Component {
	constructor(props){
		super(props);
		this.state = {
			focus: false
		};
	}
	render(){
		const { error, title, value, type } = this.props;
		return(
			<div>
				{title && <LabelTitle value={value} isFocus={this.state.focus}>{title}</LabelTitle>}
				<InputForm 
					onFocus={()=> this.setState({ focus: true })}
					onBlur={()=> this.setState({ focus: false })}
					{...this.props}
				/>
				{type === 'password' && <IconInput><img src={iconEye} alt="icon-eye" /></IconInput> }
				{error && <LabelError>{error.label}</LabelError>}
			</div>);
		
	}
}

Input.propTypes = {
	error: PropTypes.object,
	title: PropTypes.string,
	value: PropTypes.string,
	type: PropTypes.string
};

export default Input;
