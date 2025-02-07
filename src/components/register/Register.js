import React, { useRef, useState } from "react";
import api from '../../api/axiosConfig';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import bcrypt from "bcryptjs-react";
import { error } from "ajv/dist/vocabularies/applicator/dependencies";


const Register = ({username, password}) => {

    const userText = useRef();
    const passText = useRef();

    const [date, setDate] = useState(new Date());

    const hashPassword = async(password) =>{
        var salt = await bcrypt.genSaltSync(10);

        const hash = await bcrypt.hash(password, salt);

        return hash;
    }

    const addUser = async (e) =>{
        e.preventDefault();

        const usernameTxt = userText.current;
        let passwordTxt = passText.current;
        let dateOfBirth = date;

        //Converting date for use in Java backend.
        dateOfBirth = Date.parse(dateOfBirth);

        passwordTxt = hashPassword(passwordTxt.value);

        let passwordTxtValue = "";

        try{
            passwordTxtValue = await passwordTxt;
        }
        catch(err){
            console.error(error);
        }

        try{
            const response = await api.post("api/v1/users", {username:usernameTxt.value, password:passwordTxtValue, birthDate:dateOfBirth});

            usernameTxt.current = "";
            passwordTxt.current = "";
            dateOfBirth = new Date();
        }
        catch(err)
        {
            console.error(err);
        }
    }

    return(
        <Container>
            <Col>
                <Row>
                    <Form>
                        <Form.Label>Register Account</Form.Label>
                        <Form.Group controlId="registerForm.UserInput1">
                            <Form.Label>Username</Form.Label>
                            <Form.Control ref={userText} as="textarea" rows={1}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="registerForm.ControlPassword1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control ref={passText} as="textarea" rows={1}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="registerForm.DateBirth1">
                            <Form.Label>Date Of Birth</Form.Label>
                            <Form.Control type="date" name="dateOfBirth" value={date} onChange={(e) => setDate(e.target.value)}/>
                        </Form.Group>
                        <Button variant="outline-info" onClick={addUser}>Submit</Button>
                    </Form>
                </Row>
            </Col>
        </Container>
    )
}

export default Register