import { combineReducers } from 'redux';
import gnomes from './gnomes';
import view from './view';

export default combineReducers({
	gnomes,
	view
});
