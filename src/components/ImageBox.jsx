import React, { Component } from 'react';
import styled from 'styled-components';

const Image = styled.img`
	width: ${props => props.width ? props.width :'200px'};
	height: ${props => props.height ? props.height :'200px'};
	border-radius: 50%;
	box-shadow: 0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.2);
`;

export class ImageBox extends Component {
   
	render(){
		return (<Image {...this.props}/>);
	}
}

export default ImageBox;
