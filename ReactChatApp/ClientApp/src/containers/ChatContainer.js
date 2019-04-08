import React from 'react';
import { connect } from 'react-redux';
import { Chat } from '../components/Home/Chat';
import { SendMessage, GetMessageHistory } from '../actions/ChatActions';
import MessageType from '../helpers/MessageType';

const ChatContainer = props => {
	return <Chat {...props} />;
};

const injectMessageType = store => {
	const user = store.app.user;
	const messages = store.chat.messages;
	return messages.map(message => {
		if (message.sender === undefined) return message;
		const messageType =
			message.sender === user.profile.name
				? MessageType.OwnMessage
				: MessageType.UsersMessage;
		return { ...message, messageType: messageType };
	});
};

const mapStateToProps = store => {
	const messages = injectMessageType(store);
	return {
		...store.chat,
		messages: messages,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		SendMessageAction: message => dispatch(SendMessage(message)),
		GetMessageHistoryAction: (
			apiPath,
			requestedMessagesCount,
			messagesOffset
		) =>
			dispatch(
				GetMessageHistory(apiPath, requestedMessagesCount, messagesOffset)
			),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChatContainer);
