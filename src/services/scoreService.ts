import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_CONNECTION_URL;

if (!API_URL) {
  throw new Error("SERVER_URL is not defined in the environment variables.");
}

export const getStatistics = async () => {
  try {
    const url = `${API_URL}/api/v1/scores`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching statistics:", (error as Error)?.message);
    throw error;
  }
};
