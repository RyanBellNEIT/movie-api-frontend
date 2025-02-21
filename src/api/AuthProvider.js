import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/axiosConfig';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const [notFoundError, setNotFoundError] = useState('');
    const navigate = useNavigate();

    const loginAction = async (emailTxt, passwordTxt) =>{
        try {
            const response = await api.post("api/v1/users/login", 
                { email: emailTxt.toLowerCase(), password: passwordTxt },
                { headers: { "Content-Type": "application/json" }});

            if (response.data) {

                const authToken = response.headers['authorization'].substring(7);
                setToken(authToken);
                setUser(response.data);
                
                localStorage.setItem("site", authToken);

                setNotFoundError('');
                console.log("Successful login");
                navigate('/');
                return;
            } else {
                setNotFoundError('Email or password incorrect!');
            }
        } catch (err) {
            if (err.response) {
                if (err.response.status === 401) {
                    setNotFoundError('Email or password incorrect!');
                } else {
                    setNotFoundError('An error occurred. Please try again later.');
                }
            } else if (err.request) {
                setNotFoundError('No response from server. Please check your network connection.');
            } else {
                setNotFoundError('An error occurred. Please try again later.');
            }
            console.error(err);
        }
    };

    const logOutAction = () =>{
        setUser(null);
        setToken("");
        localStorage.removeItem("site");
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ token, user, notFoundError, loginAction, logOutAction}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};