import { handleActions } from 'redux-actions';

export const viewState = {
	isLoading: false
};

export default handleActions({
	IS_LOADING: (state, { payload }) =>
		Object.assign({}, state, {
			isLoading: payload
		})
}, viewState);
