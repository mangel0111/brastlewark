import queryString from 'query-string';

export const fetchApi = (url, {
	method = 'GET',
	params,
	headers = {
		'content-type': 'application/json'
	},
	data
}) => {
	let paramText = queryString.stringify(params);
	paramText = paramText ? `?${paramText}` : '';
	
	return fetch(`${url}${paramText}`, {
		body: JSON.stringify(data),
		cache: 'no-cache',
		headers,
		method, // *GET, POST, PUT, DELETE, etc.
	}).then(response => {
		return response.json();
	}).catch(error => { 
		return { error }; 
	});
};
