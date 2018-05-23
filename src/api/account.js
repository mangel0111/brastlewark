import { fetchApi } from '../utils/api-utils';
const authenticationUrl = 'https://testproject-api-v2.strv.com';

export const loginUser = ({ data }) =>{
	return fetchApi(`${authenticationUrl}/auth/native`, {
		data,
		method: 'POST'
	});
};

export const addUser = ({ data }) =>{
	return fetchApi(`${authenticationUrl}/users`, {
		data,
		method: 'POST'
	});
};

