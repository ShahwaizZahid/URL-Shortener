import { createContext, useContext, useState, useEffect } from "react";
import { default as axios, AxiosError } from "axios";
import { API_URL_USER } from "../config";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

export type SignupData = {
  name: string;
  password: string;
  email: string;
};

export type LoginData = {
  password: string;
  email: string;
};

export type AuthContextType = {
  signUp: (data: SignupData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  user: any;
  signUpMessage: { message: string };
  loginMessage: { message: string };
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>();
  const [signUpMessage, setSignUpMessage] = useState({ message: "" });
  const [loginMessage, setloginMessage] = useState({ message: "" });
  const [hasSession, setHasSession] = useLocalStorage("has-session", false);

  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      try {
        setUser(
          (
            await axios.get(`${API_URL_USER}/me`, {
              withCredentials: true,
            })
          ).data
        );
        setHasSession(true);
      } catch (e) {
        if (e instanceof AxiosError) {
          if (e.response?.data.message) {
            console.log(e.response.data.message);
          } else {
            e.cause?.message && console.log(e.cause.message);
          }
        }
      }
    };
    if (hasSession && !user) {
      getSession();
    }
  }, []);

  const signUp = async (data: SignupData) => {
    const url = API_URL_USER;
    try {
      const res = await axios.post(
        `${url}`,
        { ...data },
        {
          withCredentials: true,
        }
      );
      setSignUpMessage({ message: res.data.message });
      navigate("/login");
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.data.message) {
          setSignUpMessage({ message: e.response.data.message });
        } else {
          e.cause?.message && setSignUpMessage({ message: e.cause.message });
        }
      }
    } finally {
      setTimeout(() => {
        setSignUpMessage({ message: "" });
      }, 2000);
    }
  };

  const login = async (data: LoginData) => {
    const url = API_URL_USER;
    try {
      const res = await axios.post(
        `${url}/login`,
        { ...data },
        {
          withCredentials: true,
        }
      );
      setUser(res.data.user);
      setloginMessage({ message: res.data.message });
      setHasSession(true);
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.data.message) {
          setloginMessage({ message: e.response.data.message });
        } else {
          e.cause?.message && setloginMessage({ message: e.cause.message });
        }
      }
    } finally {
      setTimeout(() => {
        setloginMessage({ message: "" });
      }, 2000);
    }
  };

  const logout = async () => {
    const url = API_URL_USER;
    try {
      if (user) {
        await axios.post(
          `${url}/logout`,
          {},
          {
            withCredentials: true,
          }
        );
        setHasSession(false);
        setUser(null);
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.data.message) {
          console.log(e.response.data.message);
        } else {
          e.cause?.message && console.log(e.cause.message);
        }
      }
    }
  };

  const value = {
    signUp,
    login,
    user,
    signUpMessage,
    loginMessage,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
