import { createAction } from 'redux-actions';

export const authUser = createAction('AUTH_USER');
export const loginUser = createAction('LOGIN_USER');
export const loginError = createAction('LOGIN_ERROR');
export const createUser = createAction('CREATE_USER');
