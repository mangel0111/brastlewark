import { combineReducers } from 'redux';
import account from './account';
import event from './event';
import view from './view';

export default combineReducers({
	account,
	event,
	view
});
