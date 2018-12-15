import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ImageBox from '../ImageBox';

const GnomeBoxPanel = styled.div`
	font-family: 'Hind-Regular';
	margin: 0 20px 20px 0;
	background: white;
	padding: 20px;
	padding-bottom: 0;
	max-width: 305px;
	border: 1px solid #fafafa;
	box-shadow: 1px 2px #ececec;
	flex: 1 100%;
	text-align: center;
	cursor: pointer;

	p {
		margin: 0;
		font-size: 12px;
		color: #888686;
	}

	h5 {
		color: #a2a1a1;
		font-weight: normal;
		display: flex;
		margin: 10px 0;
	}
`;

const Name = styled.div`
	width: 300px;
	font-size: 16px;
	margin: 20px 0;
`;

export class GnomeBox extends Component {
	getBlock({ gnome }){
		return (
			<GnomeBoxPanel 
				onClick={()=> window.location = `/gnomes/${gnome.id}`}
				key={gnome.id}
			>
				<ImageBox src={gnome.thumbnail} alt={`Profile: ${gnome.name}`}/>
				<Name>{gnome.name}</Name>
			</GnomeBoxPanel>);
	}
    
	render(){
		const { gnome } = this.props;
		return (this.getBlock({ gnome }));
	}
}

GnomeBox.propTypes = {
	gnome: PropTypes.object,
	dispatch: PropTypes.func
};

export default GnomeBox;
