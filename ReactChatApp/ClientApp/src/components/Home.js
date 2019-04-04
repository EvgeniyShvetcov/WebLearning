import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import UsersContainer from '../containers/UsersContainer';
import ChatContainer from '../containers/ChatContainer';

export class Home extends Component {
	displayName = Home.name;
	render() {
		return (
			<Row>
				<Col sm={3}>
					<UsersContainer />
				</Col>
				<Col sm={9}>
					<ChatContainer />
				</Col>
			</Row>
		);
	}
}
