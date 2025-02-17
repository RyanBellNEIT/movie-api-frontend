import React, { useRef, useState } from "react";
import "./Register.css";
import api from '../../api/axiosConfig';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import bcrypt from "bcryptjs-react";
import { error } from "ajv/dist/vocabularies/applicator/dependencies";


const Register = () => {

    const [userText, setUserText] = useState('');
    const [passText, setPassText] = useState('');
    const [emailText, setEmailText] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());

    const checkValid = (userText, passText, emailText, birthDate) => {
        //Need to validate birth year as well.
        return !!userText && !!passText && checkEmail(emailText);
    }

    const checkEmail = (emailText) => {
        return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(emailText);
    }

    const isValid = checkValid(userText, passText, emailText, birthDate)
    
    const addUser = async (e) =>{
        e.preventDefault();

        let usernameTxt = userText;
        let passwordTxt = passText;
        let emailTxt = emailText.toLowerCase();
        let dateOfBirth = birthDate;

        //Password should be hashed at the backend.

        try{
            const response = await api.post("api/v1/users", {username:usernameTxt, password:passwordTxt, email:emailTxt, birthDate:dateOfBirth});

            //Reset form
            setUserText("");
            setPassText("");
            setEmailText("");
            setBirthDate(new Date());
        }
        catch(err)
        {
            console.error(err);
        }
    }

    return(
        <Container className="register-container" fluid>
            <Col className="register-col">
                <Row className="register-row">
                    <Form>
                        <Form.Label className="mt-2 mb-2">Sign Up</Form.Label>
                        <Form.Group controlId="registerForm.UserInput1" className="mb-2">
                            <Form.Label className="mb-0">Username</Form.Label>
                            <Form.Control value={userText} onChange={(e) => setUserText(e.target.value)} as="textarea" rows={1}/>
                        </Form.Group>
                        <Form.Group controlId="registerForm.ControlPassword1" className="mb-2">
                            <Form.Label className="mb-0">Password</Form.Label>
                            <Form.Control type="password" value={passText} onChange={(e) => setPassText(e.target.value)} rows={1}/>
                        </Form.Group>
                        <Form.Group controlId="registerForm.EmailInput1" className="mb-2">
                            <Form.Label className="mb-0">Email</Form.Label>
                            <Form.Control value={emailText} onChange={(e) => setEmailText(e.target.value)} as="textarea" rows={1}/>
                        </Form.Group>
                        <Form.Group controlId="registerForm.DateBirth1" className="mb-3">
                            <Form.Label className="mb-0">Date Of Birth</Form.Label>
                            <Form.Control type="date" name="dateOfBirth" value={birthDate} onChange={(e) => setBirthDate(e.target.value)}/>
                        </Form.Group>
                        <Button variant="outline-info" onClick={addUser} disabled={!isValid} className="mb-2">Sign Up</Button>
                    </Form>
                </Row>
            </Col>
        </Container>
    )
}

export default Register