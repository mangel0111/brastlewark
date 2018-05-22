import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Triangle = styled.span`
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #a29c9c;
    position: relative;
    top: 13px;
    left: 10px;
    cursor: pointer;
`;

const Box = styled.ul`
    list-style: none;
    background: white;
    border: 1px solid #fafafa;
    padding: 5px;
    text-align: right;
    cursor: pointer;
    width: 100px;
    position: relative;
    top: -20px;
    left: 40px;
    color: #545151;
    box-shadow: 1px 2px #ececec;

    li, &:hover {
        cursor: pointer;
    }
`;

export class ContextMenu extends Component {
	constructor(props){
		super(props);
		this.state = {
			visible: false
		};
	}
    
	changeState(visible){
		this.setState({ visible });
	}
    
	render(){
		const { actions } = this.props;
		const { visible }= this.state;
		return (
			<span>
				<Triangle
					onClick={()=>this.changeState(true)}
				/>
				{
					visible && 
                    <Box onLeave={()=>this.changeState(false)}>{actions.map(action => <li onClick={action.onClick} key={action.key}>{action.label}</li>)}
                    </Box>
				}
			</span>);
	}
}


ContextMenu.propTypes = {
	actions: PropTypes.array,
	onLeave: PropTypes.func,
	visible: PropTypes.bool
};


export default ContextMenu;
