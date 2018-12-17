import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Page } from '../components/Page';
import { User } from '../components/User';

class App extends Component {
	render() {
		const { user, page } = this.props;
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Мой топ фото</h1>
				</header>
				<User {...user} />
				<Page {...page} />
			</div>
		);
	}
}

//Mapping reducers state to React component props
const mapToStateProps = store => {
	console.log(store);
	return {
		user: store.user,
		page: store.page,
	};
};

export default connect(mapToStateProps)(App);
