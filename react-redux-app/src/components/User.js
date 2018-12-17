import React from 'react';
import PropTypes from 'prop-types';

export const User = ({ name }) => {
	return (
		<React.Fragment>
			<p>Привет, {name} </p>
		</React.Fragment>
	);
};

User.propTypes = {
	name: PropTypes.string.isRequired,
};
