import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import ImageBox from '../../components/ImageBox';
import { fetchGnome } from '../../actions/gnomes';

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
        margin-top: 30px;
    }

    p {
        margin: 0 0 40px 0;
        font-size: 14px;
        font-family: 'Hind-Light';
        color: #a9a8a8;
    }
`;

const DescriptionBlock = styled.h5`
    margin: 5px;

	span {
		padding-right: 10px;
		color: #888888;
	}
`;

const Image = styled.div`
    position: relative;
    margin-top: 0;
    margin: 0 auto;
    margin-top: 0 !important;
`;

const Professions = styled.div`
    margin-top: 25px !important;
    display: grid;

    ul {
        margin-top: 30px;
        text-decoration: none;
        list-style: none;
        display: inline-flex;
        margin: 20px auto;
        flex-wrap: wrap;

        li {
            color: #99a2ab;
            background-color: #d4d7dd;
            font-size: 11px;
            margin: 0 5px 5px 0;
            padding: 7px 15px;
            border-radius: 25px;
            cursor: pointer;
        }
    }
`;

export class GnomeDetails extends Component {

	componentDidMount(){
		const { dispatch, match } = this.props;
		dispatch(fetchGnome({
			params: {
				id: parseInt(match.params.id)
			}
		}));	
	}
    
	goToFriend({ friend }){
		const { gnomes } = this.props;
		const gnomeSelected = gnomes.find(gnome => gnome.name === friend);
		if(gnomeSelected) {
			window.location = `/gnomes/${gnomeSelected.id}`;
		}
	}

	render(){
		const { gnome } = this.props;
		if(gnome.id === undefined) {
			return null; 
		}
		return (
			<div>
				<Header />
				<ProfileHeader>
					<Image>
						<ImageBox 
							src={gnome.thumbnail} 
							alt={`Profile: ${gnome.name}`}
							width="150px"
							height="150px"
						/>
					</Image>
					<div>{gnome.name}</div>
					<DescriptionBlock><span>Age</span>{gnome.age}</DescriptionBlock>
					<DescriptionBlock><span>Weight</span>{gnome.weight}</DescriptionBlock>
					<DescriptionBlock><span>Height</span>{gnome.height}</DescriptionBlock>
					<DescriptionBlock><span>Hair Color</span>{gnome.hair_color} </DescriptionBlock>
					{
						gnome.professions &&
                        <Professions>
                            Professions:<ul>{gnome.professions.map(profession => (<li key={profession}> { profession} </li>))}{gnome.professions.length === 0 && 'This gnome do not have any Profession'}</ul>
                        </Professions>
					}
					{
						gnome.friends &&
                        <Professions>
                            Friends:<ul>{gnome.friends.map(friend => (<li onClick={()=>this.goToFriend({ friend })} key={friend}> { friend} </li>))}{gnome.friends.length === 0 && 'This gnome do not have any Friends'}</ul>
                        </Professions>
					}
                    
				</ProfileHeader>
			</div>);
	}
}

GnomeDetails.propTypes = {
	gnome :PropTypes.object,
	gnomes: PropTypes.array,
	match: PropTypes.object,
	dispatch: PropTypes.func
};

export const mapStateToProps = (state) => ({
	gnome: state.gnomes.gnome,
	gnomes: state.gnomes.gnomes
});

export default connect(mapStateToProps)(GnomeDetails);
