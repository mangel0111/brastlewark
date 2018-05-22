import { call, put } from 'redux-saga/effects';
import createActionsWatchers from '../utils/create-actions-watchers';
import { fetchEvents, fetchEvent, attendEvent, unattendEvent, createEvent } from '../api/event';

import { eventsFetched, eventFetched, fetchEvents as fetchEventsAction  } from '../actions/event';

export function* fetchEventsSaga(option) {
	const result = yield call(fetchEvents, option);
	if(!result.error) {
		yield put(eventsFetched(result));
	}
}

export function* addEventsSaga(option) {
	const result = yield call(createEvent, option);
	if(!result.error) {
		window.location = '/';
	}
}

export function* fetchEventSaga(option) {
	const result = yield call(fetchEvent, option);
	if(!result.error) {
		yield put(eventFetched(result));
	}
}

export function* attendEventSaga(option) {
	const result = yield call(attendEvent, option);
	if(!result.error) {
		yield put(fetchEventsAction());
	}
}

export function* unattendEventSaga(option) {
	const result = yield call(unattendEvent, option);
	if(!result.error) {
		yield put(fetchEventsAction());
	}
}

export default createActionsWatchers({
	FETCH_EVENTS: fetchEventsSaga,
	FETCH_EVENT: fetchEventSaga,
	ATTEND_EVENT: attendEventSaga,
	UNATTEND_EVENT: unattendEventSaga,
	CREATE_EVENT: addEventsSaga
});
