import React, { useState } from "react";
import "./Login.css";
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import { useAuth } from "../../api/AuthProvider";

const Login = () => {

    const [emailText, setEmailText] = useState('');
    const [passText, setPassText] = useState('');
    const {user, loginAction, notFoundError} = useAuth();

    const checkValid = (emailText, passText) => {
        return !!passText && checkEmail(emailText);
    }

    const checkEmail = (emailText) => {
        return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(emailText);
    }

    const isValid = checkValid(emailText, passText)
    
    const getUser = async (e) =>{
        e.preventDefault();

        const emailTxt = emailText.toLowerCase();
        const passwordTxt = passText;

        try{
            await loginAction(emailTxt, passwordTxt);

            //Reset form
            setEmailText("");
            setPassText("");
        }catch(err){
            console.error(err);
        }
    }

    const handleKeyDown = (e) => {
        if (!isValid && e.key === 'Enter') {
            e.preventDefault();
        }
    }

    return(
        <Container className="login-container" fluid>
            <Col className="login-col">
                <Row className="login-row">
                    <Form onSubmit={getUser} onKeyDown={handleKeyDown}>
                        <Form.Label className="mt-2 mb-2">Login</Form.Label>
                        {notFoundError && (<Form.Label className="text-danger" style={{fontSize: '20px'}}>{notFoundError}</Form.Label>)}
                        <Form.Group controlId="loginForm.UserInput1" className="mb-2">
                            <Form.Label className="mb-0">Email</Form.Label>
                            <Form.Control required value={emailText} onChange={(e) => setEmailText(e.target.value)} as="textarea" rows={1}/>
                        </Form.Group>
                        <Form.Group controlId="loginForm.ControlPassword1" className="mb-3">
                            <Form.Label className="mb-0">Password</Form.Label>
                            <Form.Control required type="password" value={passText} onChange={(e) => setPassText(e.target.value)} rows={1}/>
                        </Form.Group>
                        <Button variant="outline-info" onClick={getUser} disabled={!isValid} className="mb-2">Login</Button>
                    </Form>
                </Row>
            </Col>
        </Container>
    )
}

export default Login