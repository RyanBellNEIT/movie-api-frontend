import React, { useRef, useState } from "react";
import "./Login.css";
import api from '../../api/axiosConfig';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import bcrypt from "bcryptjs-react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../api/AuthProvider";

const Login = () => {

    const auth = useAuth();

    const [emailText, setEmailText] = useState('');
    const [passText, setPassText] = useState('');
    const [notFoundError, setNotFoundError] = useState('');

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
            
            auth.loginAction(emailTxt, passwordTxt);

            //const response = await api.get(`api/v1/users/${emailTxt}`);

            ////If found user
            //if(response.data != null){
            //    //Checking if passwords match found user.
            //    const match = bcrypt.compareSync(passwordTxt, response.data.password);

            //    if(match){
            //        setNotFoundError('')
            //        //Can login
            //        console.log("Login Success!!")
            //        //Handle User Authorization login request.

            //    }else{
            //        //Password does not match.
            //        setNotFoundError('Email or password incorrect!');
            //    }
            //}else{
            //    setNotFoundError('Email or password incorrect!');
            //}

            //Reset form
            setEmailText("");
            setPassText("");
        }
        catch(err)
        {
            console.error(err);
        }
    }

    return(
        <Container className="login-container" fluid>
            <Col className="login-col">
                <Row className="login-row">
                    <Form>
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