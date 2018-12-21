import React, { Component } from 'react';
import './App.css';
import PageContainer from '../containers/PageContainer';
import UserContainer from '../containers/UserContainer';

class App extends Component {
	render() {
		return (
			<div className="app">
				<PageContainer />
				<UserContainer />
			</div>
		);
	}
}

export default App;
