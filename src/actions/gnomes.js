import { createAction } from 'redux-actions';

export const fetchGnomes = createAction('FETCH_GNOMES');
export const gnomesFetched = createAction('GNOMES_FETCHED');
