import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const AttendeesBoxPanel = styled.div`
	font-family: 'Hind-Regular';
	margin: 0 20px 20px 0;
	background: white;
	padding: 20px;
	padding-bottom: 0;
	max-width: 305px;
	border: 1px solid #fafafa;
	box-shadow: 1px 2px #ececec;
	flex: 1 100%;
    display: inline-block};
`;

const Attendees = styled.div`
	display: flex;
	flex-wrap: wrap;

	div {
		color: #99a2ab;
		background-color: #d4d7dd;
		font-size: 11px;
		margin: 0 5px 5px 0;
		padding: 7px 15px;
		border-radius: 25px;
	}
`;

export class AttendeesBox extends Component {
	render(){
		const { attendees } = this.props;
		return (
			<AttendeesBoxPanel>
                Attendes
				<Attendees>
					{attendees.map(attende => 
						(<div key={attende.id}>{`${attende.firstName} ${attende.lastName}`}</div>))
					}
				</Attendees>
			</AttendeesBoxPanel>);
	}
}

AttendeesBox.propTypes = {
	attendees: PropTypes.array
};

export default AttendeesBox;
