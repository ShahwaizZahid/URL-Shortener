import { createContext, useContext, useState, useEffect } from "react";
import { default as axios } from "axios";
import { API_URL } from "../config";
import { useAuth } from "./AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";

type DataType = {
  createdAt: string;
  redirectURL: string;
  shortId: string;
  updatedAt: string;
  visitHistory: string[];
  id: string;
};

type UrlContextType = {
  checked: boolean;
  listLoading: boolean;
  loading: boolean;
  correct: string;
  handleCopyText: (textToCopy: string) => void;
  themeSwitch: () => void;
  generateShortUrl: (url: string) => Promise<any>;
  // AllShortUrls: () => Promise<any>;

  shortUrls: DataType[];
};

const UrlContext = createContext<UrlContextType | null>(null);

export function useUrl() {
  return useContext(UrlContext);
}

export default function UrlProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [checked, setChecked] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [listLoading, setListLoading] = useState<boolean>(false);

  const [correct, setCorrect] = useState<string>("");

  const [shortUrls, setShortUrls] = useState<DataType[]>([]);

  const { user } = useAuth()!;
  const navigate = useNavigate();

  const AllShortUrls = async () => {
    try {
      if (user) {
        console.log("ha user", user);
        setListLoading(true);
        const URL = `${API_URL}/analytics`;
        const response = await axios.get(`${URL}`, {
          withCredentials: true,
        });
        console.log(response.data);
        setShortUrls(response.data);
      } else {
        navigate("/login");
      }
    } catch {
    } finally {
      setListLoading(false);
    }
  };
  useEffect(() => {
    AllShortUrls();
  }, [user]);

  const themeSwitch = () => {
    setChecked(checked ? false : true);
  };

  const handleCopyText = (textToCopy: string) => {
    try {
      navigator.clipboard.writeText(textToCopy);
    } catch (error) {
      console.error("Error copying text:", error);
    }
  };

  const generateShortUrl = async (url: string) => {
    try {
      if (!user) {
        navigate("/signup");
        return `tou first want to login`;
      } else {
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        const test = urlRegex.test(url);
        if (test) {
          const URL = API_URL;
          const response = await axios.post(
            `${URL}`,
            { url },
            {
              withCredentials: true,
            }
          );
          AllShortUrls();
          return `${API_URL}/${response.data.id}`;
        } else {
          return `Error`;
        }
      }
    } catch (error) {
      console.error("Error generating short URL:", error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setCorrect("");
      }, 3000);
    }
  };

  const value = {
    checked,
    themeSwitch,
    generateShortUrl,
    loading,
    correct,
    handleCopyText,
    shortUrls,
    listLoading,
    // AllShortUrls,
  };

  return <UrlContext.Provider value={value}>{children}</UrlContext.Provider>;
}
