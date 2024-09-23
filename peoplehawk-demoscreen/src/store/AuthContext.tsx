import { useState, createContext, ReactNode } from "react";
import { getToken, storeToken, removeToken } from "../utils/manageAccessToken";
import { decodeJwt } from "jose";

type AuthProvider = {
  children: ReactNode;
};

interface JwtPayload {
  UserData: string;
}

interface Candidate {
  Id: number;
  FirstName: string;
  LastName: string;
  MemberType: string;
  RoleId: number;
}

interface Auth {
  token: string | null;
  isLoggedIn: boolean;
  userData: Candidate | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<Auth>({
  token: "",
  isLoggedIn: false,
  userData: null,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props: AuthProvider) => {
  const intialToken = getToken();
  const [token, setToken] = useState<string | null>(intialToken);
  const [userData, setUserData] = useState<Candidate | null>(
    intialToken ? JSON.parse(decodeJwt<JwtPayload>(intialToken).UserData) : null
  );
  const userIsLoggedIn = !!token;

  const loginHandler = (token: string) => {
    setToken(token);
    const claims = decodeJwt<JwtPayload>(token);
    setUserData(JSON.parse(claims.UserData));
    token && storeToken(token);
  };

  const logoutHandler = () => {
    setToken(null);
    setUserData(null);
    removeToken();
  };

  const contextValue: Auth = {
    token: token,
    userData: userData,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
