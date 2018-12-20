import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Page } from '../components/Page';
import { User } from '../components/User';
import { getPhotos } from '../actions/PageActions';
import { handleLogin } from '../actions/UserActions';

class App extends Component {
	render() {
		const { user, page, getPhotosAction, handleLoginAction } = this.props;
		return (
			<div className="app">
				<Page getPhotos={getPhotosAction} {...page} />
				<User handleLogin={handleLoginAction} {...user} />
			</div>
		);
	}
}

//Mapping reducers state to React component props
const mapToStateProps = store => {
	return {
		user: store.user,
		page: store.page,
	};
};

//Mapping actions to React component props
const mapDispatchToProps = dispatch => {
	return {
		getPhotosAction: year => dispatch(getPhotos(year)),
		handleLoginAction: () => dispatch(handleLogin()),
	};
};

export default connect(
	mapToStateProps,
	mapDispatchToProps
)(App);
