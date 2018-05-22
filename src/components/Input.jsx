import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const InputForm = styled.input`
    width: 300px;
    height: 25px;
    padding: 5px;
    border: none;
    background-color: transparent;
    border-bottom: 1px solid ${(props) => props.error ? '#f56161': '#cac9c9'};

    &::placeholder { 
        color: #cac9c9;
        opacity: 1;
    }
`;

const LabelError = styled.div`
    text-align: left;
    color: #f56161;
    font-size: 14px;
    position: relative;
    top: -10px;
`;

export class Input extends Component {
	render(){
		const { error } = this.props;
		return(
			<div>
				<InputForm {...this.props}/>
				{error && <LabelError>{error.label}</LabelError>}
			</div>);
		
	}
}

Input.propTypes = {
	error: PropTypes.object
};

export default Input;
