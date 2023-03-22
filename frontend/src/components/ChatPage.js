import React, { useEffect, useState, useRef } from 'react'
import ChatBar from './ChatBar'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([])
  const lastMessageRef = useRef(null);
  const [users, setUsers] = useState([])

  useEffect(() => {
    socket.on("newUserResponse", data => setUsers(data))
  }, [socket, users])

  useEffect(() => {
    socket.on("messageResponse", data => setMessages([...messages, data]))
  }, [socket, messages])

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat">
      <div className='chat__main'>
        <ChatBody messages={messages} lastMessageRef={lastMessageRef} />
        <ChatFooter socket={socket} users={users}/>
      </div>
      <ChatBar users={users} />
    </div>
  )
}

export default ChatPage;