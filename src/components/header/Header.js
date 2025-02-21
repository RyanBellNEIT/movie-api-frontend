import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClapperboard, faFilm, faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {Link, NavLink, useNavigate} from "react-router-dom";
import { useAuth } from "../../api/AuthProvider";

const Header = () => {

    const navigate = useNavigate();
    const { user, logOutAction } = useAuth();
 
    return (
    <>
        <style type="text/css">
        {`
            .btn-outline-info {
            border-color: #66FCF1;
            color: #66FCF1;
            }

            .btn-outline-info:hover{
                /*Disables built in hover effect on outline-info button type*/
                background-color: var(--bs-btn-bg);
                border-color: #54c4bc;
                color: #54c4bc;
            }
        `}
        </style>

        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/" style={{"color":'#66FCF1'}}>
                    <FontAwesomeIcon icon ={faClapperboard}/> Blue
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{maxHeight: '100px'}} navbarScroll>
                        <NavLink className ="nav-link" to="/">Home</NavLink>
                        <NavLink className ="nav-link" to="/watchList">Watch List</NavLink>
                    </Nav>
                    {user ? (
                            <>
                                <Button variant="outline-info" className="me-2" onClick={() => navigate('/profile')}>Profile</Button>
                                <Button variant="outline-info" onClick={logOutAction}>Logout</Button>
                            </>
                        ) : (
                            <>
                                <Button variant="outline-info" className="me-2" onClick={() => navigate('/login')}>Login</Button>
                                <Button variant="outline-info" onClick={() => navigate('/register')}>Register</Button>
                            </>
                        )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
  )
}

export default Header