import React, { useState } from "react";
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';

const LoginComponent = (props) => {
    let [role, setRole] = useState('');

    return (
        <Modal  {...props}>
            <Modal.Header closeButton>
                <Modal.Title>Enter Your Role</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            Role
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text"
                                placeholder="Enter your role"
                                onChange={(evt) => setRole(evt.target.value)} />
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
          </Button>
                <Button variant="primary" onClick={() => props.onSubmit(role)}>
                    Save Changes
          </Button>
            </Modal.Footer>
        </Modal>)
}

export default LoginComponent;