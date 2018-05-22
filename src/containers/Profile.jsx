import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Header from '../containers/Header';
import { authUser } from '../actions/account';
import { fetchEvents } from '../actions/event';
import DashboardPanel from '../components/DashboardPanel'; 

const Box = styled.div`
	background-color: #d9dce1;
    color: white;
    padding: 15px 20px;
	border-radius: 50%;
    cursor: pointer;
    width: 80px;
    height: 80px;
    position: absolute;
    top: 40px;
    left: 43%;
    font-size: 55px;
    font-family: 'Hind-Light';
`;

const ProfileHeader = styled.div`
    font-family: 'Hind-Regular';
    margin: 120px 10% 0;
    background: white;
    width: 72%;
    padding: 20px;
    padding-bottom: 0;
    border: 1px solid #fafafa;
    box-shadow: 1px 2px #ececec;
    display: inline-block};
    text-align: center;

    div {
        margin-top: 60px;
    }

    p {
        margin: 0 0 40px 0;
        font-size: 14px;
        font-family: 'Hind-Light';
        color: #a9a8a8;
    }
`;

export class Profile extends Component {
	componentDidMount(){
		const { dispatch } = this.props;
		const id = window.sessionStorage.getItem('id');
		if(!id){
			window.location = '/login';
		} else {
			const auth = {
				id
			};
			Object.keys(window.sessionStorage)
				.forEach(key => auth[key] = window.sessionStorage.getItem(key));
			dispatch(authUser(auth));
			dispatch(fetchEvents({}));
		}
	}
    
	render(){
		const { authUser, events } = this.props;
		return (
			<div>
				<Header
					authUser={authUser}
				/>
				<ProfileHeader>
					<Box>
						{authUser.firstName && `${authUser.firstName.charAt(0)} ${authUser.lastName.charAt(0)}`}
					</Box>
					<div>{`${authUser.firstName} ${authUser.lastName}`} </div>
					<p>{authUser.email}</p>
				</ProfileHeader>
				<DashboardPanel 
					showOptions={false}
					events={events}
				/>
			</div>);
	}
}

Profile.propTypes = {
	authUser :PropTypes.object,
	events: PropTypes.array,
	dispatch: PropTypes.func
};

export const mapStateToProps = (state) => ({
	authUser: state.account.authUser,
	events: state.event.events
});

export default connect(mapStateToProps)(Profile);
