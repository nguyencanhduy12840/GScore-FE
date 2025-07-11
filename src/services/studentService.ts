import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_CONNECTION_URL;

if (!API_URL) {
  throw new Error("SERVER_URL is not defined in the environment variables.");
}

export const getStudentByRegistrationNumber = async (
  registrationNumber: string
) => {
  try {
    const url = `${API_URL}/api/v1/students/${registrationNumber}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching student data:", (error as Error)?.message);
    throw error;
  }
};

export const getTopScoreGroupA = async () => {
  try {
    const url = `${API_URL}/api/v1/students/top10-GroupA`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching top score group A:",
      (error as Error)?.message
    );
    throw error;
  }
};
