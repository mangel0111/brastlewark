import { handleActions } from 'redux-actions';

export const accountState = {
	authUser: {},
	error: ''
};

export default handleActions({
	AUTH_USER: (state, { payload }) =>
		Object.assign({}, state, {
			authUser: payload
		}),
	LOGIN_ERROR: (state, { payload }) =>
		Object.assign({}, state, {
			error: payload
		})
}, accountState);
