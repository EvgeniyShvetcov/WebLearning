import React, { Component } from 'react';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
	displayName = Layout.name;

	render() {
		return (
			<React.Fragment>
				<NavMenu />
				<div className="container-fluid">{this.props.children}</div>
			</React.Fragment>
		);
	}
}
