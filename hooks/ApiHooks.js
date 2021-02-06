import AsyncStorage from "@react-native-community/async-storage";
import { useCallback } from "react";
import { useContext, useEffect, useState } from "react";
import { postLogin } from "../api/auth";
import { fetchMediaById, fetchMediaByTag } from "../api/media";
import { AuthContext } from "../contexts/AuthContext";
import { appIdentifier } from "../utils";

const useAllMedia = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const files = await fetchMediaByTag(appIdentifier);

        const results = await Promise.all(
          files.map(({ file_id: fileId }) => fetchMediaById(fileId))
        );

        setData(results);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchData();
  }, []);

  return { loading, error, data };
};

export const useHandleLogin = () => {
  const { setIsLoggedIn, setUser, setToken } = useContext(AuthContext);
  const [error, setError] = useState();

  const doLogin = useCallback(
    async (username, password) => {
      setError(null);

      const response = await postLogin(username, password);

      const { token, user, message } = await response.json();

      if (response.status !== 200) {
        setError(message);
      }

      if (token && user) {
        setUser(user);
        setToken(token);

        await AsyncStorage.setItem("userToken", token);
      }
    },
    [setIsLoggedIn, setUser]
  );

  return {
    error,
    doLogin,
  };
};

export { useAllMedia };
