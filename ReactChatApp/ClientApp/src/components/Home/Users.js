import React from 'react';
import { Panel } from 'react-bootstrap';
import UsersServices from '../../services/UsersService';
import WebsocketService from '../../services/WebsocketService';
import './Users.css';

export class Users extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			users: [],
		};
		this.setUsersList = this.setUsersList.bind(this);
		this.onUserLoginOn = this.onUserLoginOn.bind(this);
		this.onUserLoginOut = this.onUserLoginOut.bind(this);

		this.usersService = new UsersServices(
			WebsocketService.instance,
			this.onUserLoginOn,
			this.onUserLoginOut
		);
	}

	componentDidMount() {
		this.usersService.fetchOnlineUsersList(this.setUsersList);
	}

	onUserLoginOn(user) {
		this.setState({
			users: [...this.state.users, user],
		});
	}

	onUserLoginOut(user) {
		this.setState({
			users: this.state.users.filter(item => item.id !== user.id),
		});
	}

	setUsersList(usersList = []) {
		this.setState({
			users: [...usersList],
		});
	}

	renderUsers() {
		return this.state.users.length === 0 ? (
			<p>Loading...</p>
		) : (
			this.state.users.map(user => {
				return <li key={user.id}>{user.name}</li>;
			})
		);
	}

	render() {
		return (
			<Panel>
				<Panel.Heading>
					<Panel.Title componentClass="h3">Users Online: </Panel.Title>
				</Panel.Heading>
				<Panel.Body>
					<ul className="online-users">{this.renderUsers()}</ul>
				</Panel.Body>
			</Panel>
		);
	}
}

//Users.propTypes = {UserState: React.PropTypes.array};
