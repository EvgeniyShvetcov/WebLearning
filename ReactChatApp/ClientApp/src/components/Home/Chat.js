import React from 'react';
import { Panel } from 'react-bootstrap';
import moment from 'moment';
import InputField from './InputField';
import './Chat.css';

export class Chat extends React.Component {
	constructor(props) {
		super(props);

		this.panel = React.createRef();
		this.renderMessagesList = this.renderMessagesList.bind(this);

		this.scrollDown = () => {
			if (this.panel.current)
				this.panel.current.scrollTop = this.panel.current.scrollHeight;
		};
	}

	componentDidMount() {
		const {
			messages,
			messagesOffset,
			countOfAllMessages,
			GetMessageHistoryAction,
		} = this.props;
		if (messages.length === 0 || messages.length !== countOfAllMessages)
			//After first entering in the chat, load the last ten messages
			GetMessageHistoryAction(
				'http://localhost:5000/api/Chat/InitialMessages',
				10,
				messagesOffset
			);
		this.scrollDown();
	}

	componentDidUpdate(prevProps) {
		const { messages, afterGettingHistory } = this.props;
		if (messages.length > 10 && afterGettingHistory) return;
		//If we get some messages, scroll down the chat window
		if (prevProps.messages.length < messages.length) this.scrollDown();
	}

	onScrollHandler() {
		const panelTopHeight = this.panel.current.scrollTop;
		const { countOfAllMessages, messagesOffset, isFetching } = this.props;
		//When we scroll up to the top of the window get more history message
		if (panelTopHeight > 100) return;
		if (
			!isFetching &&
			countOfAllMessages > 0 &&
			messagesOffset < countOfAllMessages
		) {
			this.props.GetMessageHistoryAction(
				'http://localhost:5000/api/Chat/InitialMessages',
				10,
				messagesOffset
			);
		}
	}

	renderMessagesList() {
		if (this.props.error) return <p>{this.props.error}</p>;
		if (!this.props.afterGettingHistory && this.props.isFetching) {
			return <p className="loader">Loading...</p>;
		} else {
			const messages = this.props.messages.map(message => {
				return (
					<li className={message.messageType} key={message.id}>
						<div className="msg">
							<div className="user">{message.sender}</div>
							<p>{message.message}</p>
							<time>{moment(message.date).format('HH:mm:ss')}</time>
						</div>
					</li>
				);
			});
			return <ol className="chat">{messages}</ol>;
		}
	}

	render() {
		return (
			<Panel>
				<div
					id="scroll"
					onScroll={() => this.onScrollHandler()}
					className="panel-body chat-container"
					ref={this.panel}
				>
					{this.renderMessagesList()}
				</div>
				<InputField sendMessage={this.props.SendMessageAction} />
			</Panel>
		);
	}
}
