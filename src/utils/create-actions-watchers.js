import { isValidType, isValidWorker, areValidWorkers } from './combine-watchers';

export default function createActionsWatchers(wdo) {
	for (const type of Object.keys(wdo)) {
		if (!isValidType(type)) {
			throw new Error(`createActionsWatchers invalid action type: ${type}`);
		}
		if (Array.isArray(wdo[type])) {
			if (!areValidWorkers(wdo[type])) {
				throw new Error(`createActionsWatchers some of the workers is not a Function: ${type}`);
			}
		} else if (!isValidWorker(wdo[type])) {
			throw new Error(`createActionsWatchers worker is not a Function: ${type}`);
		}
	}
	return wdo;
}
