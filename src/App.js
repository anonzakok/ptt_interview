import React from 'react';
import { BrowserRouter as Router,  Switch } from 'react-router-dom';
import routes from './Config/routes.js';
import { ContextProvider } from './Context';
import AppRoute from './Components/AppRoute';

function App() {
	return (
		<ContextProvider>
			<Router>
				<Switch>
					{routes.map((route) => (
						<AppRoute
							key={route.path}
							path={route.path}
							component={route.component}
							isPrivate={route.isPrivate}
						/>
					))}
				</Switch>
			</Router>
		</ContextProvider>
	);
}

export default App;
