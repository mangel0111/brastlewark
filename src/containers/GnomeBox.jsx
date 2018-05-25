import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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
`;

const DescriptionBlock = styled.h5`
	span {
		padding-right: 10px;
		color: #4a4949;
	}
`;

const Image = styled.img`
	width: 200px;
	height: 200px;
	border-radius: 50%;
`;


export class GnomeBox extends Component {
	getBlock({ gnome }){
		return (
			<GnomeBoxPanel 
				onClick={()=> window.location = `/gnomes/${gnome.id}`}
				key={gnome.id}
			>
				<Image src={gnome.thumbnail} alt={`Profile: ${gnome.name}`}/>
				<Name>{gnome.name}</Name>
				{
					false && <div><DescriptionBlock><span>Age</span>{gnome.age}</DescriptionBlock>
						<DescriptionBlock><span>Weight</span>{gnome.weight}</DescriptionBlock>
						<DescriptionBlock><span>Height</span>{gnome.height}</DescriptionBlock></div>
				}
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

export default connect()(GnomeBox);
