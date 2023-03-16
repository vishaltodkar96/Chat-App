import { BrowserRouter, Routes, Route } from "react-router-dom"
import ChatPage from "./components/ChatPage";
import socketIO from "socket.io-client"
import Join from "./components/Join/Join";

const socket = socketIO.connect("http://localhost:4000")
function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Join socket={socket} />}></Route>
          <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;