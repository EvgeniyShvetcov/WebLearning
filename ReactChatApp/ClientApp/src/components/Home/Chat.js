import React from 'react';
import { Panel, Form, InputGroup, Button} from 'react-bootstrap';
import moment from 'moment';

export class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: [],
            currentMessage: ''
        }
        this.handlePanelRef = this.handlePanelRef.bind(this);
        this.handleMessageRef = this.handleMessageRef.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.addMessage = this.addMessage.bind(this);
    }

    handlePanelRef(div) {
        this.panel = div;
    }
    handleMessageRef(input) {
        this.msg = input;
    }

    handleMessageChange(event){
        this.setState({
            currentMessage: event.target.value
        });
    }

    onSubmit(event){
        event.preventDefault();
        this.addMessage();
    }

    addMessage(){
        let currentMessage = this.state.currentMessage;
        if(currentMessage.length === 0){
            return;
        }
        let id = this.state.messages.length;
        let date = new Date();

        let messages = this.state.messages;
        messages.push({
            id,
            date,
            message: currentMessage,
            sender: 'jurgen'
        });
        this.setState({
            messages: messages,
            currentMessage: ''
        });
        this.msg.focus();
        this.panel.scrollTop = this.panel.scrollHeight - this.panel.clientHeight;
    }

    render() {
        const messages =this.state.messages.map((message) => {
            return (
                <li key={message.id}>
                    <strong>{message.sender} </strong>
                    ({moment(message.date).format('HH:mm:ss')})<br />
                    {message.message}
                </li>
            );
        })
        return (
            <Panel>
                <Panel.Body className="panel-chat" ref={this.handlePanelRef}>
                    <ul>
                        {messages}
                    </ul>
                </Panel.Body>
                <Panel.Footer>
                    <Form onSubmit={this.onSubmit}>
                        <label className='sr-only' htmlFor='msg'>Message</label>
                        <InputGroup className='col-md-12'>
                            <InputGroup.Button>
                                <Button className='chat-button'>:-)</Button>
                            </InputGroup.Button>
                            <input type='text' value={this.state.currentMessage}
                                    onChange={this.handleMessageChange}
                                    className='form-control'
                                    id='msg'
                                    placeholder='Your message...'
                                    ref={this.handleMessageRef} />
                            <InputGroup.Button><Button type='submit' className='chat-button'>Send</Button></InputGroup.Button>
                        </InputGroup>
                    </Form>
                </Panel.Footer>
            </Panel>
        )
    }
}