import React from 'react';
import PropTypes from 'prop-types';

export const User = ({
	name,
	isFetching,
	error,
	handleLogin,
	handleLogout,
}) => {
	const renderTemplate = () => {
		if (error) {
			return <p>Во время запроса произошла ошибка, обновите страницу</p>;
		}

		if (isFetching) {
			return <p>Загрузка...</p>;
		}

		if (name) {
			return (
				<React.Fragment>
					<p>Привет, {name} </p>
					<button className="btn" onClick={handleLogout}>
						Выйти
					</button>
				</React.Fragment>
			);
		} else {
			return (
				<button className="btn" onClick={handleLogin}>
					Войти
				</button>
			);
		}
	};
	return <div className="ib user">{renderTemplate()}</div>;
};

User.propTypes = {
	name: PropTypes.string.isRequired,
	isFetching: PropTypes.bool.isRequired,
	handleLogin: PropTypes.func.isRequired,
	handleLogout: PropTypes.func.isRequired,
	error: PropTypes.string,
};
