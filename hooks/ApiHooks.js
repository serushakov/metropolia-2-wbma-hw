import AsyncStorage from "@react-native-community/async-storage";
import { useCallback } from "react";
import { useContext, useEffect, useState } from "react";
import { postLogin } from "../api/auth";

import { fetchAllMedia, fetchMediaById } from "../api/media";
import { AuthContext } from "../contexts/AuthContext";

const useAllMedia = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { files } = await fetchAllMedia();

        files.length = 100;

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
  const { setIsLoggedIn, setUser } = useContext(AuthContext);
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
        setIsLoggedIn(true);
        setUser(user);

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
