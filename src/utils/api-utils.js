import queryString from 'query-string';

const API_KEY = '2uuEyr82PCfgVsIx0jOJ3bdG/InpZD5UB7+T7mI9FU2e';
export const fetchApi = (url, {
	method = 'GET',
	params,
	data
}) => {
	let paramText = queryString.stringify(params);
	paramText = paramText ? `?${paramText}` : '';
	const headers = {
		'APIKey': API_KEY,
		'content-type': 'application/json'
	};
	const authorization = window.sessionStorage.getItem('authorization');
	if(authorization){
		headers.Authorization = authorization;
	} 
	
	return fetch(`${url}${paramText}`, {
		body: JSON.stringify(data),
		cache: 'no-cache',
		headers,
		method, // *GET, POST, PUT, DELETE, etc.
	}).then(response => {
		const authorization = response.headers.get('authorization');
		if(authorization) {
			window.sessionStorage.setItem('authorization', authorization);
		}
		if(response.status === 403){
			window.sessionStorage.clear();
			window.location = '/login';
		}
		return response.json();
	}).catch(error => { 
		return { error }; 
	});
};
