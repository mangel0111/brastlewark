import { handleActions } from 'redux-actions';

export const gnomesState = {
	gnomes: [],
	gnome: {}
};

export default handleActions({
	GNOMES_FETCHED: (state, { payload }) =>
		Object.assign({}, state, {
			gnomes: payload.Brastlewark
		}),
	GNOME_FETCHED: (state, { payload }) =>
		Object.assign({}, state, {
			gnome: payload
		})
}, gnomesState);
