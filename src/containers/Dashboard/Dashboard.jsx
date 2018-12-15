import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import { fetchGnomes } from '../../actions/gnomes';
import DashboardPanel from '../../components/DashboardPanel';

export class Dashboard extends Component {

	componentDidMount(){
		const { dispatch } = this.props;
		dispatch(fetchGnomes({
			params: {}
		}));	
	}

	render(){
		const { gnomes } = this.props;
		
		return (<div>
			<Header />
			<DashboardPanel 
				gnomes={gnomes}
			/>
		</div>);
	}
}

Dashboard.propTypes = {
	dispatch: PropTypes.func,
	gnomes: PropTypes.array
};


export const mapStateToProps = (state) => ({
	gnomes: state.gnomes.gnomes
});

export default connect(mapStateToProps)(Dashboard);
