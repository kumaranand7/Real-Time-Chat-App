import React, { useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";

const SendMessages = ({ sendMessage }) => {
  const [msg, setMessage] = useState('');

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage(msg); // Llama a la función prop sendMessage
        setMessage('');
      }}
    >
      <InputGroup className="mb-3">
        <InputGroup.Text>Chat</InputGroup.Text>
        <Form.Control
          onChange={(e) => setMessage(e.target.value)}
          value={msg}
          placeholder="ESCRIBE UN MENSAJE"
        />
        <Button variant="primary" type="submit" disabled={!msg}>
          ENVIAR
        </Button>
      </InputGroup>
    </Form>
  );
};
export default SendMessages;
