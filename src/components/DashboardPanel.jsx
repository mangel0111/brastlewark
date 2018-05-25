import React, { Component } from 'react';
import styled from 'styled-components';
import GnomeBox from '../containers/GnomeBox';
import PropTypes from 'prop-types';

const Dashboard = styled.div`
	margin: 60px 5%;
`;

const Options = styled.ul`
	display: flex;
	list-style-type: none;
	font-family: 'Hind-SemiBold';
	font-size: 10px;
`;

const GnomesList = styled.div`
	margin: 40px 5%;
	display: flex;
	flex-wrap: wrap;

	p {
		font-family: 'Hind-Regular';
		color: #7d7d7d;
	}
`;

const Title = styled.h1`
	font-family: 'Hind-Light';
	margin: 0 2%;
`;

export class DashboardPanel extends Component {
	
	render(){
		const { gnomes  }= this.props;
		return (
			<Dashboard>
				<Options>
					<Title>Gnomes</Title>
				</Options>
				<GnomesList>
					{gnomes.length !== 0 ? gnomes.map(gnome => 
						<GnomeBox 
							key={gnome.id} 
							gnome={gnome}
						/>): 
						<p>No gnome to display</p>
					}
				</GnomesList>
			</Dashboard>
		);
	}
}

DashboardPanel.propTypes= {
	gnomes: PropTypes.array
};

export default DashboardPanel;
