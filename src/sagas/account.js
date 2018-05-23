import { call, put } from 'redux-saga/effects';
import createActionsWatchers from '../utils/create-actions-watchers';
import { loginUser, addUser } from '../api/account';
import { isLoading } from '../actions/view';
import { loginError } from '../actions/account'; 

export function* loginUserSaga(option) {
	yield put(isLoading(true));
	const result = yield call(loginUser, option);
	yield put(isLoading(false));
	if(!result.error) {
		Object.keys(result).forEach(key => {
			window.sessionStorage.setItem(key, result[key]);
		});
		window.location = '/';
	} else {
		yield put(loginError(result.error));
	}
}

export function* createUserSaga(option) {
	yield put(isLoading(true));
	const result = yield call(addUser, option);
	yield put(isLoading(false));
	if(!result.error) {
		window.location = '/login';
	} else {
		yield put(loginError(result.errors));
	}
}

export default createActionsWatchers({
	LOGIN_USER: loginUserSaga,
	CREATE_USER: createUserSaga
});
