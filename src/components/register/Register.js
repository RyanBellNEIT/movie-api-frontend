import React, { useRef, useState } from "react";
import "./Register.css";
import api from '../../api/axiosConfig';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import bcrypt from "bcryptjs-react";
import { HttpStatusCode } from "axios";
import PasswordChecklist from "react-password-checklist";


const Register = () => {
    const [emailText, setEmailText] = useState('');
    const [passText, setPassText] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [birthDate, setBirthDate] = useState();

    const checkValid = (emailText, birthDate) => {
        console.log(birthDate);
        return checkEmail(emailText) && isPasswordValid && (new Date(birthDate) <= new Date()) && (new Date(birthDate).getFullYear() >= 1900);
    }

    const handlePasswordValidity = (valid) =>{
        setIsPasswordValid(valid);
    }

    const checkEmail = (emailText) => {
        return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(emailText);
    }

    const isValid = checkValid(emailText, birthDate);

    const hashPassword = async(password) =>{
        var salt = await bcrypt.genSaltSync(10);

        const hash = await bcrypt.hashSync(password, salt);

        return hash;
    }
    
    const addUser = async (e) =>{
        e.preventDefault();

        console.log(birthDate);

        let emailTxt = emailText.toLowerCase();
        let passwordTxt = passText;
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
            const response = await api.post("api/v1/users", {email:emailTxt, password:passwordTxtValue, birthDate:dateOfBirth});

            if(response.status = HttpStatusCode.Ok){
                console.log("Successfully registered");
                document.getElementById("error-text").innerHTML = "";

                //Reset form
                setEmailText("");
                setPassText("");
                setBirthDate(new Date());
            }
        }
        catch(err)
        {
            if(err.status == HttpStatusCode.Conflict){
                console.error("Account already exists");
                document.getElementById("error-text").innerHTML = "An account with the specified email already exists!";
            }
        }
    }

    return(
        <Container className="register-container" fluid>
            <Col className="register-col">
                <Row className="register-row">
                    <Form>
                        <Form.Label className="mt-2 mb-2">Sign Up</Form.Label>
                        <Form.Group controlId="registerForm.EmailInput1" className="mb-2">
                            <h5 id="error-text" style={{color: "#d60000"}}></h5>
                            <Form.Label className="mb-0">Email</Form.Label>
                            <Form.Control value={emailText} onChange={(e) => setEmailText(e.target.value)} as="textarea" rows={1}/>
                        </Form.Group>
                        <Form.Group controlId="registerForm.ControlPassword1" className="mb-2">
                            <Form.Label className="mb-0">Password</Form.Label>
                            <Form.Control type="password" value={passText} onChange={(e) => setPassText(e.target.value)} rows={1}/>
                            <PasswordChecklist rules={["minLength","specialChar","number","capital"]}
                            minLength={5} value={passText} onChange={handlePasswordValidity}/>
                        </Form.Group>
                        <Form.Group controlId="registerForm.DateBirth1" className="mb-3">
                            <Form.Label className="mb-0">Date Of Birth</Form.Label>
                            <Form.Control min={"1900-01-01"} type="date" onChange={(e) => setBirthDate(e.target.value)}/>
                        </Form.Group>
                        <Button variant="outline-info" onClick={addUser} disabled={!isValid} className="mb-2">Sign Up</Button>
                    </Form>
                </Row>
            </Col>
        </Container>
    )
}

export default Register