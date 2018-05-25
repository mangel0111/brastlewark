import { call, put } from 'redux-saga/effects';
import createActionsWatchers from '../utils/create-actions-watchers';
import { isLoading } from '../actions/view';
import { fetchGnomes } from '../api/gnomes';
import { gnomesFetched } from '../actions/gnomes';

export function* fetchGnomesSaga(option) {
	yield put(isLoading(true));
	const result = yield call(fetchGnomes, option);
	yield put(isLoading(false));
	if(!result.error) {
		yield put(gnomesFetched(result));
	}
}

export default createActionsWatchers({
	FETCH_GNOMES: fetchGnomesSaga
});
