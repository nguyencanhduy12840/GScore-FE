import React, { useState } from "react";
import type { StudentScoreResponse } from "../types/StudentScoreResponse";
import { toast } from "react-toastify";
import { getStudentByRegistrationNumber } from "../services/studentService";

const subjectMap: Record<string, string> = {
  toan: "Math",
  ngu_van: "Literature",
  ngoai_ngu: "Foreign Language",
  vat_li: "Physics",
  hoa_hoc: "Chemistry",
  sinh_hoc: "Biology",
  lich_su: "History",
  dia_li: "Geography",
  gdcd: "Civics",
};

const SearchScore = () => {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [result, setResult] = useState<StudentScoreResponse | null>(null);

  const handleSearch = async () => {
    if (!/^\d{8}$/.test(registrationNumber.trim())) {
      toast.error("Registration number must be 8 digits.");
      return;
    }

    try {
      const score = await getStudentByRegistrationNumber(
        registrationNumber.trim()
      );
      setResult(score || null);
    } catch (error) {
      console.log("Error fetching student data:", error);
      setResult(null);
      toast.error("Registration number not found or invalid.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-2 sm:px-4 py-6">
      {/* Search Section */}
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">
          User Registration
        </h2>
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Registration Number:
        </label>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <input
            type="text"
            placeholder="Enter registration number"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            className="w-full sm:w-auto flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="bg-white shadow rounded-lg p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800">
            Registration Number: {result.studentId}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Foreign ID: {result.foreignId}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {result.scores.map((subjectScore, index) => (
              <div
                key={index}
                className="flex justify-between items-center border p-3 rounded-md hover:shadow transition"
              >
                <span className="font-medium text-gray-700">
                  {subjectMap[subjectScore.code] ?? subjectScore.code}
                </span>
                <span className="text-blue-600 font-semibold text-right">
                  {subjectScore.score}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchScore;
