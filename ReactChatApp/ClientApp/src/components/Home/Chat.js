import React from 'react';
import { Panel, Form, InputGroup, Button} from 'react-bootstrap';
import moment from 'moment';
import ChatService from '../../services/ChatService';

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
        
        this.setMessagesList = this.setMessagesList.bind(this);
        this.chatService = new ChatService(this.addMessage);
        this.chatService.fetchMessagesList(this.setMessagesList);

        this.focusField = () => {
            if(this.msg) this.msg.focus();
        }
        this.scrollDown = () => {
            if(this.panel) this.panel.scrollTop = this.panel.scrollHeight;
        }
    }

    componentDidMount(){
        this.focusField();
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
        this.chatService.sendMessage(this.state.currentMessage);
    }

    addMessage(newMessage){
        if(newMessage.length === 0){
            return;
        }
        let messages = this.state.messages;

        messages.push(newMessage);
        this.setState({
            messages: messages,
            currentMessage: ''
        });
        this.focusField();
        this.scrollDown();
    }

    setMessagesList(messagesList){
        this.setState({
            messages : messagesList
        });

        this.scrollDown();
    }

    render() {
        const messages = this.state.messages.length === 0 ? <p>Loading...</p> : this.state.messages.map((message) => {
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