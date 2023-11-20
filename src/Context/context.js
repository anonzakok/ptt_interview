import React, { useReducer } from 'react';
import { initialState, AuthReducer } from './reducer';

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();

export function useAuthState() {
	const context = React.useContext(AuthStateContext);
	if (context === undefined) {
		throw new Error('useAuthState must be used within a ContextProvider');
	}

	return context;
}

export function useAuthDispatch() {
	const context = React.useContext(AuthDispatchContext);
	if (context === undefined) {
		throw new Error('useAuthDispatch must be used within a ContextProvider');
	}

	return context;
}

export const ContextProvider = ({ children }) => {
	const [data, dispatch] = useReducer(AuthReducer, initialState);

	return (
		<AuthStateContext.Provider value={data}>
			<AuthDispatchContext.Provider value={dispatch}>
				{children}
			</AuthDispatchContext.Provider>
		</AuthStateContext.Provider>
	);
};
