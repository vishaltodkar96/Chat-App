import React from 'react'

const ChatBar = ({ users }) => {

    return (
        <div className='chat__sidebar'>
            <div>
                <h2 className='chat__header'>Active Users</h2>
                <div className='chat__users'>
                    {users.map(user => <p key={user.socketID}>{user.userName}</p>)}
                </div>
            </div>
        </div>
    )
}

export default ChatBar;