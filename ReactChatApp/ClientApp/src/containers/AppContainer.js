import React from 'react';
import App from '../components/App';
import { UserLogin, UserLogout, UserLoginFail } from '../actions/AppActions';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');

const AppContainer = ({ app, LoginAction, LogoutAction, LoginFailAction }) => {
	return (
		<BrowserRouter basename={baseUrl}>
			<App
				{...app}
				LoginAction={LoginAction}
				LoginFailAction={LoginFailAction}
				LogoutAction={LogoutAction}
			/>
		</BrowserRouter>
	);
};

const mapStateToProps = store => {
	return {
		app: store.app,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		LoginAction: user => dispatch(UserLogin(user)),
		LogoutAction: () => dispatch(UserLogout()),
		LoginFailAction: error => dispatch(UserLoginFail(error)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AppContainer);
