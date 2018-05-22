import { fetchApi } from '../utils/api-utils';
const eventsUrl = 'https://testproject-api-v2.strv.com/events';

export const fetchEvents = ({ params}) =>{
	return fetchApi(eventsUrl, {
		params
	});
};

export const createEvent = ({ data }) =>{
	return fetchApi(`${eventsUrl}`, {
		method: 'POST',
		data
	});
};

export const fetchEvent = ({ id }) =>{
	return fetchApi(`${eventsUrl}/${id}`, {});
};

export const attendEvent = ({ id }) =>{
	return fetchApi(`${eventsUrl}/${id}/attendees/me`, {
		method: 'POST'
	});
};

export const unattendEvent = ({ id }) =>{
	return fetchApi(`${eventsUrl}/${id}/attendees/me`, {
		method: 'DELETE'
	});
};
