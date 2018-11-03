import React, { Component } from 'react';
import { Chat } from './Home/Chat';
import { Users } from './Home/Users';
import {Row, Col} from 'react-bootstrap';

export class Home extends Component {
  displayName = Home.name

  render() {
    return (
        <Row>
            <Col sm={3}>
              <Users />
            </Col>
            <Col sm={9}>
              <Chat />
            </Col>
        </Row>
    );
  }
}
