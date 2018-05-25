import { handleActions } from 'redux-actions';

export const gnomesState = {
	gnomes: []
};

export default handleActions({
	GNOMES_FETCHED: (state, { payload }) =>
		Object.assign({}, state, {
			gnomes: payload.Brastlewark
		})
}, gnomesState);
