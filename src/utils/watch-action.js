import { take, fork, call, all, select } from 'redux-saga/effects';

/* eslint func-names: 0*/
// eslint-disable-next-line no-empty-function
const GeneratorFunction = Object.getPrototypeOf(function* () {}).constructor;

export const MAP_STATE_TO_SAGA = Symbol('Saga.mapStateToSaga');

export function* workerBoundary(worker, payload) {
	try {
		const selector = worker[MAP_STATE_TO_SAGA];
		if (selector instanceof Function && !(selector instanceof GeneratorFunction)) {
			const mappedState = yield select(selector);
			yield call(worker, Object.assign(payload, mappedState));
		} else {
			yield call(worker, payload);
		}
	} catch (e) {
		console.error(e); // eslint-disable-line no-console
	}
}

export default function* watchAction(type, workers) {
	const workersArray = Array.isArray(workers) ? workers : [workers];
	while (true) {	// eslint-disable-line no-constant-condition
		const { payload } = yield take(type);
		yield all(workersArray.map(worker => fork(workerBoundary, worker, payload)));
	}
}
