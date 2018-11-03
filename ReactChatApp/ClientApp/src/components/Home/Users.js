import React, { PropTypes } from 'react';
import { Panel } from 'react-bootstrap';

export class Users extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [
                { id: 1, name: "juergen" },
                { id: 2, name: "marion" },
                { id: 3, name: "peter" },
                { id: 4, name: "mo" },
            ]
        };
    }

    render() {
        const users = this.state.users.map((user) => {
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