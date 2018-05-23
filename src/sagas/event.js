import { call, put } from 'redux-saga/effects';
import createActionsWatchers from '../utils/create-actions-watchers';
import { fetchEvents, fetchEvent, attendEvent, unattendEvent, createEvent, deleteEvent, updateEvent } from '../api/event';
import { eventsFetched, eventFetched, fetchEvents as fetchEventsAction, eventError  } from '../actions/event';
import { isLoading } from '../actions/view';

export function* fetchEventsSaga(option) {
	yield put(isLoading(true));
	const result = yield call(fetchEvents, option);
	yield put(isLoading(false));
	if(!result.error) {
		yield put(eventsFetched(result));
	}
}

export function* addEventSaga(option) {
	yield put(isLoading(true));
	const result = yield call(createEvent, option);
	yield put(isLoading(false));
	if(!result.error) {
		window.location = '/';
	} else {
		yield put(eventError(result.errors));
	}
}

export function* deleteEventSaga(option) {
	yield put(isLoading(true));
	yield call(deleteEvent, option);
	yield put(isLoading(false));
	window.location = '/';
}

export function* updateEventSaga(option) {
	yield put(isLoading(true));
	const result = yield call(updateEvent, option);
	yield put(isLoading(false));
	if(!result.error) {
		window.location = '/';
	} else {
		yield put(eventError(result.errors));
	}
}


export function* fetchEventSaga(option) {
	yield put(isLoading(true));
	const result = yield call(fetchEvent, option);
	yield put(isLoading(false));
	if(!result.error) {
		yield put(eventFetched(result));
	}
}

export function* attendEventSaga(option) {
	yield put(isLoading(true));
	const result = yield call(attendEvent, option);
	yield put(isLoading(false));
	if(!result.error) {
		yield put(fetchEventsAction());
	}
}

export function* unattendEventSaga(option) {
	yield put(isLoading(true));
	const result = yield call(unattendEvent, option);
	yield put(isLoading(false));
	if(!result.error) {
		yield put(fetchEventsAction());
	}
}

export default createActionsWatchers({
	FETCH_EVENTS: fetchEventsSaga,
	FETCH_EVENT: fetchEventSaga,
	ATTEND_EVENT: attendEventSaga,
	UNATTEND_EVENT: unattendEventSaga,
	CREATE_EVENT: addEventSaga,
	UPDATE_EVENT: updateEventSaga,
	DELETE_EVENT: deleteEventSaga
});
