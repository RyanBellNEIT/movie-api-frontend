import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/axiosConfig';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const [notFoundError, setNotFoundError] = useState('');
    const navigate = useNavigate();

    const loginAction = async (email, password) => {
        try{    
            const response = await api.post("/api/v1/users/login", {email: email.toLowerCase(), password: password});

            if(response.data){
                setUser(response.data.user);
                setToken(response.data.token);
                localStorage.setItem("site", response.data.token);
                setNotFoundError('');
                navigate('');
                return;
            }else{
                setNotFoundError('Email or password incorrect!');
            }
        }catch(err){
            console.log(err);
        }
    };

    const logOutAction = () =>{
        setUser(null);
        setToken("");
        localStorage.removeItem("site");
        navigate('/login');
    };

    return(
        <AuthContext.Provider value={{token, user, notFoundError, loginAction, logOutAction}}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
  };