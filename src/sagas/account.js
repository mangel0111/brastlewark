import { call } from 'redux-saga/effects';
import createActionsWatchers from '../utils/create-actions-watchers';
import { loginUser } from '../api/account';

export function* loginUserSaga(option) {
	const result = yield call(loginUser, option);
	if(!result.error) {
		Object.keys(result).forEach(key => {
			window.sessionStorage.setItem(key, result[key]);
		});
		window.location = '/';
	}
}

export default createActionsWatchers({
	LOGIN_USER: loginUserSaga
});
