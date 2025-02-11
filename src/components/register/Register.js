import React, { useRef, useState } from "react";
import api from '../../api/axiosConfig';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import bcrypt from "bcryptjs-react";
import { error } from "ajv/dist/vocabularies/applicator/dependencies";


const Register = ({username, password}) => {

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

    const hashPassword = async(password) =>{
        var salt = await bcrypt.genSaltSync(10);

        const hash = await bcrypt.hash(password, salt);

        return hash;
    }
    
    const addUser = async (e) =>{
        e.preventDefault();

        const usernameTxt = userText;
        let passwordTxt = passText;
        let emailTxt = emailText;
        let dateOfBirth = birthDate;

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
            const response = await api.post("api/v1/users", {username:usernameTxt, password:passwordTxtValue, email:emailTxt, birthDate:dateOfBirth});

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
        <Container>
            <Col>
                <Row>
                    <Form>
                        <Form.Label>Register Account</Form.Label>
                        <Form.Group controlId="registerForm.UserInput1">
                            <Form.Label>Username</Form.Label>
                            <Form.Control placeholder="Username" value={userText} onChange={(e) => setUserText(e.target.value)} as="textarea" rows={1}/>
                        </Form.Group>
                        <Form.Group controlId="registerForm.ControlPassword1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={passText} onChange={(e) => setPassText(e.target.value)} rows={1}/>
                        </Form.Group>
                        <Form.Group controlId="registerForm.EmailInput1">
                            <Form.Label>Email</Form.Label>
                            <Form.Control placeholder="Email" value={emailText} onChange={(e) => setEmailText(e.target.value)} as="textarea" rows={1}/>
                        </Form.Group>
                        <Form.Group controlId="registerForm.DateBirth1">
                            <Form.Label>Date Of Birth</Form.Label>
                            <Form.Control type="date" name="dateOfBirth" value={birthDate} onChange={(e) => setBirthDate(e.target.value)}/>
                        </Form.Group>
                        <h5 id="submitError"></h5>
                        <Button variant="outline-info" onClick={addUser} disabled={!isValid}>Submit</Button>
                    </Form>
                </Row>
            </Col>
        </Container>
    )
}

export default Register