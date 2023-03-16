import React, { useState, useEffect } from 'react'

const ChatBar = ({ socket }) => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        socket.on("newUserResponse", data => setUsers(data))
    }, [socket, users])

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