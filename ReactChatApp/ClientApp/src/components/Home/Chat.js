import React from 'react';
import { Panel } from 'react-bootstrap';
import moment from 'moment';
import ChatService from '../../services/ChatService';
import WebsocketService from '../../services/WebsocketService';
import InputField from './InputField';
import './Chat.css';

export class Chat extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: [],
		};
		this.addMessage = this.addMessage.bind(this);

		this.setMessagesList = this.setMessagesList.bind(this);
		this.chatService = new ChatService(
			WebsocketService.instance,
			this.addMessage
		);

		this.panel = React.createRef();
		this.messagesOffset = 0;
		this.isLoading = false;
		this.allMessagesCount = undefined;

		this.scrollDown = () => {
			if (this.panel.current)
				this.panel.current.scrollTop = this.panel.current.scrollHeight;
		};
	}

	componentDidMount() {
		this.chatService
			.fetchMessagesList(10, this.messagesOffset)
			.then(responseData => {
				this.setMessagesList(responseData.messages);
				this.messagesOffset += 10;
			});
	}

	addMessage(newMessage) {
		if (newMessage.length === 0) {
			return;
		}
		this.setState({
			messages: [...this.state.messages, newMessage],
		});
		this.scrollDown();
	}

	setMessagesList(messagesList) {
		this.setState({
			messages: messagesList,
		});

		this.scrollDown();
	}

	onScrollHandler() {
		if (this.isLoading) return;
		const panelTopHeight = this.panel.current.scrollTop;

		if (panelTopHeight < 100) {
			if (
				this.allMessagesCount === undefined ||
				(this.allMessagesCount > 0 &&
					this.messagesOffset < this.allMessagesCount)
			) {
				this.isLoading = true;
				this.chatService
					.fetchMessagesList(10, this.messagesOffset)
					.then(responseData => {
						this.allMessagesCount = responseData.countOfAllMessages;
						let receivedMessagesCount = responseData.messages.length;
						this.setState({
							messages: [...responseData.messages, ...this.state.messages],
						});
						this.messagesOffset += 10;
						this.isLoading = false;
					})
					.catch(err => {
						this.isLoading = false;
						console.error(err);
					});
			}
		}
	}

	render() {
		const messages =
			this.state.messages.length === 0 ? (
				<p>Loading...</p>
			) : (
				this.state.messages.map(message => {
					let cssclass =
						message.sender === this.props.user.name ? 'self' : 'other';
					return (
						<li className={cssclass} key={message.id}>
							<div className="msg">
								<div className="user">{message.sender}</div>
								<p>{message.message}</p>
								<time>{moment(message.date).format('HH:mm:ss')}</time>
							</div>
						</li>
					);
				})
			);
		return (
			<Panel>
				<div
					id="scroll"
					onScroll={() => this.onScrollHandler()}
					className="panel-body chat-container"
					ref={this.panel}
				>
					<ol className="chat">{messages}</ol>
				</div>
				<InputField chatService={this.chatService} />
			</Panel>
		);
	}
}
