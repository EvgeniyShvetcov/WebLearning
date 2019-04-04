import React from 'react';
import { Panel } from 'react-bootstrap';
import './Users.css';

export class Users extends React.Component {
	componentDidMount() {
		const { users, GetConnectedUsersAction } = this.props;
		if (users.length === 0) {
			GetConnectedUsersAction('http://localhost:5000/api/Chat/LoggedOnUsers');
		}
	}

	renderUsers() {
		const { users, isFetching, error } = this.props;
		if (error) return <p>{error}</p>;
		if (isFetching) {
			return <p>Loading...</p>;
		} else {
			const usersList = users.map(user => {
				return <li key={user.id}>{user.name}</li>;
			});
			return <ul className="online-users">{usersList}</ul>;
		}
	}

	render() {
		return (
			<Panel>
				<Panel.Heading>
					<Panel.Title componentClass="h3">Users Online: </Panel.Title>
				</Panel.Heading>
				<Panel.Body>{this.renderUsers()}</Panel.Body>
			</Panel>
		);
	}
}
