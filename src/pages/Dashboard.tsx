import { useState, useEffect } from "react";
import type { TopStudentResponse } from "../types/TopStudentResponse";
import { getTopScoreGroupA } from "../services/studentService";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const Dashboard = () => {
  const [topStudents, setTopStudents] = useState<TopStudentResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getTopScoreGroupA();
        setTopStudents(data);
      } catch (err) {
        toast.error("Failed to fetch top students data.");
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const subjectMap: { [key: string]: string } = {
    toan: "Mathematics",
    vat_li: "Physics",
    hoa_hoc: "Chemistry",
  };

  if (loading) {
    return <Loading message="Loading top students data..." />;
  }

  if (error) {
    return (
      <div className="flex justify-center w-full px-4">
        <div className="bg-red-100 text-red-700 px-4 py-3 rounded shadow max-w-xl w-full">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-2 sm:px-4 py-4 sm:py-6">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 max-w-full sm:max-w-5xl lg:max-w-6xl mx-auto">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-gray-800 text-center sm:text-left">
          Top 10 Students - Group A
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm sm:text-base divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 text-left font-medium text-gray-700 whitespace-nowrap">
                  Rank
                </th>
                <th className="px-3 py-2 text-left font-medium text-gray-700 whitespace-nowrap">
                  Registration Number
                </th>
                {Object.values(subjectMap).map((subject) => (
                  <th
                    key={subject}
                    className="px-3 py-2 text-right font-medium text-gray-700 whitespace-nowrap"
                  >
                    {subject}
                  </th>
                ))}
                <th className="px-3 py-2 text-right font-medium text-gray-700 whitespace-nowrap">
                  Total Score
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {topStudents.map((student, index) => (
                <tr key={student.studentId} className="hover:bg-gray-50">
                  <td className="px-3 py-2">{index + 1}</td>
                  <td className="px-3 py-2">{student.studentId}</td>
                  {Object.keys(subjectMap).map((key) => {
                    const score = student.scores.find(
                      (s) => s.code === key
                    )?.score;
                    return (
                      <td key={key} className="px-3 py-2 text-right">
                        {score !== undefined ? score.toFixed(2) : "-"}
                      </td>
                    );
                  })}
                  <td className="px-3 py-2 text-right">
                    {student.totalScore.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
