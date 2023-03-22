import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import './Join.css';

export default function Join({ socket }) {

  const navigate = useNavigate()
  const [userName, setUserName] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (userName) {
      localStorage.setItem("userName", userName)
      socket.emit("newUser", { userName, socketID: socket.id, chatId: Math.floor(Math.random() * 1000) })
      navigate("/chat")
    } else {
      alert("Please Enter Name");
    }
  }

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join A Chat</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input type="text"
              minLength={6}
              name="username"
              id='username'
              className='joinInput'
              value={userName}
              placeholder="Name"
              onChange={e => setUserName(e.target.value)}
            />
          </div>
          <button className={'button mt-20'} type="submit">SIGN IN</button>
        </form>
      </div>
    </div>
  );
}
