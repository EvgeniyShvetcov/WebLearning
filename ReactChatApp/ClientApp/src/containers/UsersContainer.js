import React from 'react';
import { connect } from 'react-redux';
import { Users } from '../components/Home/Users';
import { GetConnectedUsers } from '../actions/UsersActions';

const UsersContainer = props => {
	return <Users {...props} />;
};

const mapStateToProps = store => {
	return {
		...store.users,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		GetConnectedUsersAction: (apiPath, queryParameters) =>
			dispatch(GetConnectedUsers(apiPath, queryParameters)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UsersContainer);
