import { fetchApi } from '../utils/api-utils';
const eventsUrl = 'https://testproject-api-v2.strv.com/events';

export const fetchEvents = () =>{
	return fetchApi(eventsUrl, {});
};

export const createEvent = ({ data }) =>{
	return fetchApi(`${eventsUrl}`, {
		method: 'POST',
		data
	});
};

export const updateEvent = ({ data }) =>{
	return fetchApi(`${eventsUrl}/${data.id}`, {
		method: 'PATCH',
		data: {
			title: data.title,
			description: data.description,
			startsAt: data.startsAt,
			capacity: data.capacity
		}
	});
};

export const deleteEvent = ({ data }) =>{
	return fetchApi(`${eventsUrl}/${data.id}`, {
		method: 'DELETE'
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
