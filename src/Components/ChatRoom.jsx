
import { Col, Row } from "react-bootstrap";
import MessageContainer from "./MessageContainer";
import SendMessages from "./SendMessages";
const ChatRoom = ({ messages, sendMessage}) => <div>
    <Row className="px-5 py-5">
        <Col sm={10}>
            <h2>CHATROOM</h2>
        </Col>
        <Col>
        </Col>
    </Row>
    <Row className="px-5 py-5">
        <Col sm={12}>
            <MessageContainer messages={messages} />
        </Col>
        <Col sm={12}>
            <SendMessages sendMessage={sendMessage} />
        </Col>
    </Row>
</div>
export default ChatRoom