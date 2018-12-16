
import { fetchGnomesSaga } from './gnomes';
import { fetchGnomes } from '../api/gnomes';

describe('Saga Gnome test', ()=> {
	it('should fetch the gnomes correctly', ()=> {
		// Set the Generator function in a constant
		const generator = fetchGnomesSaga({}); // We send nothing because we don't care this right now
		let isLoading = generator.next(); // The first stop is when the saga change the state to Loading
		expect(isLoading.value).toEqual(
			{'@@redux-saga/IO': true, 'PUT': {'action': {'payload': true, 'type': 'IS_LOADING'}, 'channel': null}}
		); // Now we validate that the state is the correct.
        
		// The next stop is the fetchGnomes API
		const callGnomes = generator.next();
		expect(callGnomes.value.CALL.fn).toEqual(fetchGnomes);
        
		// The next stop before receive the gnomes is disable the loading, in this step is where the data is received, so we send the data on the next
		isLoading = generator.next({ status: true, data: [1,2,3]});
		expect(isLoading.value).toEqual(
			{'@@redux-saga/IO': true, 'PUT': {'action': {'payload': false, 'type': 'IS_LOADING'}, 'channel': null}}
		);
        
		// We received the data already, but now we call the redux action who change the state with the payload received [1,2,3]
		const gnomesReceived = generator.next();
		expect(gnomesReceived.value).toEqual(
			{'@@redux-saga/IO': true, 'PUT': {'action': {'payload': {'data': [1,2,3], 'status': true}, 'type': 'GNOMES_FETCHED'}, 'channel': null}}
		);
        
		// The next step and the last one is just finish the generator, we need to validate it to avoid extra steps before end.
		const endGenerator = generator.next();
		expect(endGenerator).toEqual({'done': true, 'value': undefined});
	});
	it('should fetch the gnomes but fails ', ()=> {
		// Set the Generator function in a constant
		const generator = fetchGnomesSaga({}); // We send nothing because we don't care this right now
		let isLoading = generator.next(); // The first stop is when the saga change the state to Loading
		expect(isLoading.value).toEqual(
			{'@@redux-saga/IO': true, 'PUT': {'action': {'payload': true, 'type': 'IS_LOADING'}, 'channel': null}}
		); // Now we validate that the state is the correct.
        
		// The next stop is the fetchGnomes API
		const callGnomes = generator.next();
		expect(callGnomes.value.CALL.fn).toEqual(fetchGnomes);
        
		// The next stop before receive the gnomes is disable the loading, here the fetch fails, we don't care the error, but we need to hanlde it.
		isLoading = generator.next({ error: true });
		expect(isLoading.value).toEqual(
			{'@@redux-saga/IO': true, 'PUT': {'action': {'payload': false, 'type': 'IS_LOADING'}, 'channel': null}}
		);
        
		// We received the data already, but now we call the redux action who change the state with the payload received [1,2,3]
		const gnomesNotReceivedAndDone = generator.next();
		expect(gnomesNotReceivedAndDone).toEqual({'done': true, 'value': undefined});
	});
});