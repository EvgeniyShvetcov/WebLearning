import React, { PropTypes } from 'react';
import { Panel } from 'react-bootstrap';
import UsersServices from '../../services/UsersService';

export class Users extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        };
        this.setUsersList = this.setUsersList.bind(this);

        this.usersService = new UsersServices();
        this.usersService.fetchOnlineUsersList(this.setUsersList);
    }

    setUsersList(usersList){
        this.setState({
            users: usersList
        })
    }

    render() {
        const users = this.state.users.length === 0 ? <p>Loading...</p>: this.state.users.map((user) => {
            return <li key={user.id}>{user.name}</li>
        })
        return (
            <div>
                <Panel>
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">Users Online: </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <ul className='chat-users'>
                            {users}
                        </ul>
                    </Panel.Body>
                </Panel>
            </div>
        );
    }
}

//Users.propTypes = {UserState: React.PropTypes.array};