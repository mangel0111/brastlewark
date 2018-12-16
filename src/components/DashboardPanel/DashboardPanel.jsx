import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GnomeBox from '../GnomeBox';
import Input from '../Input';

const Dashboard = styled.div`
	margin: 60px 5%;
`;

const Options = styled.div`
	display: flex;
	list-style-type: none;
	font-family: 'Hind-SemiBold';
	font-size: 10px;
`;

const GnomesList = styled.div`
	margin: 40px 0 0 5%;;
	display: flex;
	flex-wrap: wrap;

	p {
		font-family: 'Hind-Regular';
		color: #7d7d7d;
	}
`;

const Title = styled.h1`
	font-family: 'Hind-Light';
	margin: 0 5%;
`;

const Filter = styled.div`
	margin-left: auto;
	position: relative;
    top: -25px;
`;

export class DashboardPanel extends Component {
	constructor(props){
		super(props);
		this.state = {
			filterText: ''
		};
	}

	filter(){
		const { gnomes }= this.props;
		const { filterText } = this.state;
		const gnomesFiltered = gnomes.filter(gnome => {
			if(filterText){
				return gnome.name.toLowerCase().includes(filterText.toLowerCase());
			}
			return true;
		});
		return gnomesFiltered;
	}

	render(){
		const { filterText } = this.state;
		const gnomesFiltered = this.filter();
		return (
			<Dashboard>
				<Options>
					<Title>Gnomes</Title>
					<Filter>
						<Input
							type="text" 
							width="150px"
							isFilter
							title="Filter"
							value={filterText}
							onChange={({target})=> this.setState({ filterText: target.value })}
						/>
					</Filter>
				</Options>
				<GnomesList>
					{gnomesFiltered.length !== 0 ? gnomesFiltered.map(gnome => 
						<GnomeBox 
							key={gnome.id} 
							gnome={gnome}
						/>): 
						<p>No gnomes to display</p>
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
