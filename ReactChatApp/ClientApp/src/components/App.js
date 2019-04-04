import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './Layout';
import { Home } from './Home';
import { FetchData } from './FetchData';
import { Counter } from './Counter';
import Authenticate from './Authenticate';
import configuration from '../configuration/configurations';
import WebsocketService from '../services/WebsocketService';
export default class App extends Component {
	constructor(props) {
		super(props);
		this._websocketServiceInstance = WebsocketService.instance;
	}

	connectToService = user => {
		if (user !== undefined) {
			this._websocketServiceInstance.init(
				'http://localhost:5000/chat',
				user.id_token
			);
		}
	};

	notAuthenticated() {
		return (
			<div>You are not authenticated, please click here to authenticate.</div>
		);
	}

	isAuthenticated = () => {
		return (
			<Layout>
				<Route exact path="/" component={Home} />
				<Route path="/counter" component={Counter} />
				<Route path="/fetchdata" component={FetchData} />
			</Layout>
		);
	};

	render() {
		const { user, isAuthenticated, LoginAction, LogoutAction } = this.props;
		return (
			<Authenticate
				user={user}
				isAuthenticated={isAuthenticated}
				OidcSettings={configuration}
				LoginAction={LoginAction}
				LogoutAction={LogoutAction}
				renderNotAuthenticated={this.notAuthenticated}
			>
				{this.isAuthenticated()}
			</Authenticate>
		);
	}
}
