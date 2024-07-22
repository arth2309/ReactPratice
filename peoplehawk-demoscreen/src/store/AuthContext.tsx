import React, {useState,createContext, ReactNode} from 'react';

type AuthProvider = {
    children : ReactNode
}

interface Auth {
    token : string | null,
    isLoggedIn: boolean,
    login : (token:string) => void,
    logout : () => void
}

const AuthContext  = createContext<Auth>({
    token : '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {}
});

export const AuthContextProvider = (props : AuthProvider) => {
     const intialToken = localStorage.getItem("token");
      const[token,setToken] = useState<string | null>(intialToken)
      const userIsLoggedIn = !!token

      const loginHandler = (token : string) => {
        setToken(token);
        token  && console.log(token,userIsLoggedIn);
        token && localStorage.setItem("token",token);
      };

      const logoutHandler = () => {
        setToken(null);
        localStorage.clear();
      }

      const contextValue : Auth = {
        token : token,
        isLoggedIn : userIsLoggedIn,
        login : loginHandler,
        logout : logoutHandler
      }

      return(
        <AuthContext.Provider value = {contextValue}>
            {props.children}
        </AuthContext.Provider>
      );
}

export default AuthContext;