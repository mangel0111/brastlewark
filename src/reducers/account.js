import { handleActions } from 'redux-actions';

export const accountState = {
	authUser: {}
};

export default handleActions({
	AUTH_USER: (state, { payload }) =>
		Object.assign({}, state, {
			authUser: payload
		})
}, accountState);
