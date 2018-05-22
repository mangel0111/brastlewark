import { camel } from 'change-case';
import { fork } from 'redux-saga/effects';
import watchAction from './watch-action';

export default function createActionWatcher(type, worker) {
	const watcherName = camel(`${type}_WATCHER`);
	const watcher = watchAction.bind(this, type, worker);
	return fork(Object.defineProperty(watcher, 'name', { value: watcherName, configurable: true }));
}
