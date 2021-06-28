import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './store/reducers/rootReducer'
import { Provider, useSelector } from 'react-redux'
import thunk from 'redux-thunk'

import { ReactReduxFirebaseProvider, isLoaded } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'

import { getFirestore } from 'redux-firestore'
import { getFirebase } from 'react-redux-firebase'

import firebase from './config/fbConfig'

const store = createStore(
	rootReducer,
	applyMiddleware(thunk.withExtraArgument({
		getFirebase, getFirestore
	}))
)

const rrfConfig = {
	userProfile: 'users',
}

const rrfProps = {
	firebase,
	config: rrfConfig,
	dispatch: store.dispatch,
	createFirestoreInstance,
}

function AuthIsLoaded({ children }) {
	const auth = useSelector((state) => state.firebase.auth); if
		(!isLoaded(auth))
		return (
			null
		);
	return children;
}

ReactDOM.render(

	<Provider store={store}>
		<ReactReduxFirebaseProvider {...rrfProps}>
			<AuthIsLoaded>
				<React.StrictMode>
					<App />
				</React.StrictMode>
			</AuthIsLoaded>
		</ReactReduxFirebaseProvider>
	</Provider>

	,

	document.getElementById('root')
);