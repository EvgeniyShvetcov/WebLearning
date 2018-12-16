import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

class App extends Component {
	render() {
		const { name, surname, age } = this.props.user;
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Мой топ фото</h1>
				</header>
				<p className="App-intro">Здесь будут мои самые залайканые фото</p>
				<p>
					Меня зовут: {name} {surname}. Мне {age} лет.
				</p>
			</div>
		);
	}
}

//Mapping reducers state to React component props
const mapToStateProps = store => {
	console.log(store);
	return {
		user: store.user,
	};
};

export default connect(mapToStateProps)(App);
