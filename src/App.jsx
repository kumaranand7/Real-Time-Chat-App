import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Col, Row } from 'react-bootstrap'
import WaitingRoom from './Components/WaitingRoom'
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import ChatRoom from './Components/ChatRoom'
function App() {
  const [count, setCount] = useState(0)
  const [messages, setMessages] = useState([])
  const [conn, setConnection] = useState();
  const joinChatRoom = async (username, chatroom) => {
    try {
      //Aqui se inicia la conexion
      const conn = new HubConnectionBuilder()
        .withUrl("https://localhost:7153/Chat")
        .configureLogging(LogLevel.Information)
        .build();
      conn.on("JoinSpecificChatRoom", (username, msg) => {
        console.log("msg:", msg);
      });
      conn.on("ReceiveSpecificMessage", (username, msg) => {
        setMessages(messages => [...messages, { username, msg }])
      });
      await conn.start();
      await conn.invoke("JoinSpecificChatRoom", { username, chatroom })
      setConnection(conn)

    } catch (ex) {
      console.log(ex)
    }
  }
  const sendMessage = async (message) => {
    try {
      await conn.invoke("SendMessage", message)
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <>
      <main>
        <Container>
          <Row className='px-5 my-5'>
            <Col sm='12'>
              <h1 className='font-weight-light'>WELCOME TO THE CHATROOM</h1>
            </Col>
          </Row>
          {!conn
            ? <WaitingRoom joinChatRoom={joinChatRoom}></WaitingRoom>
            : <ChatRoom messages={messages} sendMessage={sendMessage}>
            </ChatRoom>
          }
        </Container>
      </main>
    </>
  )
}
export default App
