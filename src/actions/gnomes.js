import { createAction } from 'redux-actions';

export const fetchGnomes = createAction('FETCH_GNOMES');
export const fetchGnome = createAction('FETCH_GNOME');
export const gnomesFetched = createAction('GNOMES_FETCHED');
export const gnomeFetched = createAction('GNOME_FETCHED');
