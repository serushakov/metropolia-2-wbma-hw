import { useEffect, useState } from "react";

import { fetchAllMedia, fetchMediaById } from "../api/media";

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

export { useAllMedia };
