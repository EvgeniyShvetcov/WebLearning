import React from 'react';
import { User } from '../components/User';
import { handleLogin } from '../actions/UserActions';
import { connect } from 'react-redux';

const UserContainer = ({ user, handleLoginAction }) => {
	return <User {...user} handleLogin={handleLoginAction} />;
};

//Mapping reducers state to React component props
const mapStateToProps = store => {
	return {
		user: store.user,
	};
};

//Mapping actions to React component props
const mapDispatchToProps = dispatch => {
	return {
		handleLoginAction: () => dispatch(handleLogin()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserContainer);
