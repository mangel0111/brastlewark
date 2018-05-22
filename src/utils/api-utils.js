import queryString from 'query-string';

const API_KEY = '2uuEyr82PCfgVsIx0jOJ3bdG/InpZD5UB7+T7mI9FU2e';
export const fetchApi = (url, {
	method = 'GET',
	params,
	data
}) => {
	let paramText = queryString.stringify(params);
	paramText = paramText ? `?${paramText}` : '';
	return fetch(`${url}${paramText}`, {
		body: JSON.stringify(data),
		cache: 'no-cache',
		headers: {
			'APIKey': API_KEY,
			'content-type': 'application/json'
		},
		method, // *GET, POST, PUT, DELETE, etc.
	}).then(response => response.json());
};
