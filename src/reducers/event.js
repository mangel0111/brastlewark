

import { handleActions } from 'redux-actions';

export const eventState = {
	events: [],
	event: {}
};

export default handleActions({
	EVENTS_FETCHED: (state, { payload }) =>
		Object.assign({}, state, {
			events: payload
		}),
	EVENT_FETCHED: (state, { payload }) =>
		Object.assign({}, state, {
			event: payload
		})
}, eventState);
