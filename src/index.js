import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';
import registerServiceWorker from './registerServiceWorker';
import createActionWatcher from './utils/create-action-watcher';
import combineWatchers from './utils/combine-watchers';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(function* fullSaga() {
	const rootWatcher = combineWatchers(rootSaga);
	const watchers = Object.keys(rootWatcher)
		.map(type => createActionWatcher(type, rootWatcher[type]));
	yield all(watchers);
});

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>, 
	document.getElementById('root')
);
registerServiceWorker();
