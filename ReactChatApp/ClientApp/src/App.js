import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import Authenticate from './Authenticate';
import configuration from './configuration/configurations';
import WebsocketService from './services/WebsocketService';
import { Chat } from './components/Home/Chat';

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: undefined,
		};
		this._websocketServiceInstance = WebsocketService.instance;
	}

	userLoggedIn(user) {
		if (user) {
			this._websocketServiceInstance.init(
				'http://localhost:5000/chat',
				user.id_token
			);
			this.setState({ user });
		}
	}

	userLoggedOut = () => {
		this.setState({ user: undefined });
	};

	notAuthenticated() {
		return (
			<div>You are not authenticated, please click here to authenticate.</div>
		);
	}

	isAuthenticated = () => {
		if (this.state.user) {
			return (
				<Layout>
					<Route
						exact
						path="/"
						render={() => (
							<Home chat={<Chat user={this.state.user.profile} />} />
						)}
					/>
					<Route path="/counter" component={Counter} />
					<Route path="/fetchdata" component={FetchData} />
				</Layout>
			);
		} else {
			return <div>Loading...</div>;
		}
	};

	render() {
		return (
			<Authenticate
				OidcSettings={configuration}
				userLoaded={user => this.userLoggedIn(user)}
				userUnLoaded={() => this.userLoggedOut()}
				renderNotAuthenticated={this.notAuthenticated}
			>
				{this.isAuthenticated()}
			</Authenticate>
		);
	}
}
