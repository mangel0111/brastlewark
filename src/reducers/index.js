import { combineReducers } from 'redux';
import account from './account';
import event from './event';

export default combineReducers({
	account,
	event
});
