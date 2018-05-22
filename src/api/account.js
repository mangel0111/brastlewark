import { fetchApi } from '../utils/api-utils';
const authenticationUrl = 'https://testproject-api-v2.strv.com/auth/native';

export const loginUser = ({ data }) =>{
	return fetchApi(authenticationUrl, {
		data,
		method: 'POST'
	});
};
