import React, { useRef, useState } from "react";
import "./Login.css";
import api from '../../api/axiosConfig';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import bcrypt from "bcryptjs-react";
import { error } from "ajv/dist/vocabularies/applicator/dependencies";
import { red } from "@mui/material/colors";


const Login = ({username, password}) => {

    const [userText, setUserText] = useState('');
    const [passText, setPassText] = useState('');

    const checkValid = (userText, passText) => {
        //Need to validate birth year as well.
        return !!userText && !!passText;
    }

    const isValid = checkValid(userText, passText)

    const hashPassword = async(password) =>{
        var salt = await bcrypt.genSaltSync(10);

        const hash = await bcrypt.hash(password, salt);

        return hash;
    }
    
    const getUser = async (e, username) =>{
        e.preventDefault();

        const usernameTxt = userText;
        let passwordTxt = passText;

        //Hashing password and then storing hashed password into database.
        passwordTxt = hashPassword(passwordTxt);

        let passwordTxtValue = "";

        try{
            passwordTxtValue = await passwordTxt;
        }
        catch(err){
            console.error(err);
        }

        try{
            const response = await api.get(`api/v1/users/${username}`);

            //Reset form
            setUserText("");
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
                        <Form.Group controlId="loginForm.UserInput1" className="mb-2">
                            <Form.Label className="mb-0">Username</Form.Label>
                            <Form.Control value={userText} onChange={(e) => setUserText(e.target.value)} as="textarea" rows={1} maxLength={30}/>
                        </Form.Group>
                        <Form.Group controlId="loginForm.ControlPassword1" className="mb-3">
                            <Form.Label className="mb-0">Password</Form.Label>
                            <Form.Control type="password" value={passText} onChange={(e) => setPassText(e.target.value)} rows={1}/>
                        </Form.Group>
                        <Button variant="outline-info" onClick={getUser} disabled={!isValid} className="mb-2">Login</Button>
                    </Form>
                </Row>
            </Col>
        </Container>
    )
}

export default Login