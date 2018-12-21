import React from 'react';
import PropTypes from 'prop-types';

export const User = ({ name, isFetching, error, handleLogin }) => {
	const renderTemplate = () => {
		if (error) {
			return <p>Во время запроса произошла ошибка, обновите страницу</p>;
		}

		if (isFetching) {
			return <p>Загрузка...</p>;
		}

		if (name) {
			return <p>Привет, {name} </p>;
		} else {
			return (
				<button className="btn" onClick={handleLogin}>
					Войти
				</button>
			);
		}
	};
	console.log('<User/> render');
	return <div className="ib user">{renderTemplate()}</div>;
};

User.propTypes = {
	name: PropTypes.string.isRequired,
	isFetching: PropTypes.bool.isRequired,
	handleLogin: PropTypes.func.isRequired,
	error: PropTypes.string,
};
