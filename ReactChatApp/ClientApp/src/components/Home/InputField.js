import React, { Component } from 'react';
import { Panel, Form, InputGroup, Button } from 'react-bootstrap';

export default class InputField extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentMessage: '',
		};
	}

	componentDidMount() {
		this.focusInputField();
	}

	focusInputField = () => {
		if (this.msg) this.msg.focus();
	};

	handleMessageRef = input => {
		this.msg = input;
	};

	handleMessageChange(event) {
		event.preventDefault();
		this.setState({ currentMessage: event.target.value });
	}

	onSubmit(event) {
		event.preventDefault();
		this.props.chatService.sendMessage(this.state.currentMessage);
		this.setState({ currentMessage: '' });
	}

	render() {
		return (
			<Panel.Footer>
				<Form onSubmit={event => this.onSubmit(event)}>
					<label className="sr-only" htmlFor="msg">
						Message
					</label>
					<InputGroup className="col-md-12">
						<InputGroup.Button>
							<Button className="chat-button">:-)</Button>
						</InputGroup.Button>
						<input
							type="text"
							value={this.state.currentMessage}
							onChange={event => this.handleMessageChange(event)}
							className="form-control"
							id="msg"
							placeholder="Your message..."
							ref={this.handleMessageRef}
							autoCorrect={'off'}
							autoCapitalize={'off'}
							autoSave={'off'}
						/>
						<InputGroup.Button>
							<Button type="submit" className="chat-button">
								Send
							</Button>
						</InputGroup.Button>
					</InputGroup>
				</Form>
			</Panel.Footer>
		);
	}
}
