import { useState, createContext, ReactNode, useEffect } from "react";
import { getToken, storeToken, removeToken } from "../utils/manageAccessToken";
import { decodeJwt } from "jose";
import { showToast } from "../components/layout/ToastComponent/Toastcomponent";
import { TOAST } from "../constants/toast";

type AuthProvider = {
  children: ReactNode;
};

interface JwtPayload {
  UserData: string;
  typeId: string;
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
  typeId: string | null;
  isLoggedIn: boolean;
  userData: Candidate | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<Auth>({
  token: "",
  typeId: "",
  isLoggedIn: false,
  userData: null,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props: AuthProvider) => {
  const intialToken = getToken();
  const [token, setToken] = useState<string | null>(intialToken);
  const [typeId, setTypeId] = useState<string | null>(
    intialToken ? JSON.parse(decodeJwt<JwtPayload>(intialToken).typeId) : null
  );
  const [userData, setUserData] = useState<Candidate | null>(
    intialToken ? JSON.parse(decodeJwt<JwtPayload>(intialToken).UserData) : null
  );

  useEffect(() => {
    const decoded = intialToken
      ? JSON.parse(decodeJwt<any>(intialToken).exp)
      : 0;
    const expirationTime = decoded * 1000; // convert to milliseconds
    const currentTime = Date.now();

    if (expirationTime < currentTime && token != null) {
      autoLogoutHandler();
    }

    const timeoutId = setTimeout(() => {
      if (token != null) {
        autoLogoutHandler();
      }

      // Call your logout function here
    }, expirationTime - currentTime);

    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line
  }, [token]);

  const userIsLoggedIn = !!token;

  const loginHandler = (token: string) => {
    setToken(token);
    const claims = decodeJwt<JwtPayload>(token);
    setUserData(JSON.parse(claims.UserData));
    setTypeId(JSON.parse(claims.typeId));
    token && storeToken(token);
  };

  const logoutHandler = () => {
    setToken(null);
    setUserData(null);
    removeToken();
  };

  const autoLogoutHandler = async () => {
    setToken(null);
    setUserData(null);
    removeToken();
    setTimeout(
      () =>
        showToast(
          TOAST.AUTO_LOGGED_OUT.title,
          TOAST.AUTO_LOGGED_OUT.description,
          TOAST.AUTO_LOGGED_OUT.type
        ),
      100
    );
  };

  const contextValue: Auth = {
    typeId: typeId,
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
