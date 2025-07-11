/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import type { StatisticItem } from "../types/StatisticResponse";
import { getStatistics } from "../services/scoreService";
import CustomTooltip from "../components/CustomTooltip";

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

const Report = () => {
  const [stats, setStats] = useState<StatisticItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getStatistics();
        const formattedStats = res.statisticsList.map((item: any) => ({
          ...item,
          subject: subjectMap[item.subject] || item.subject,
        }));
        setStats(formattedStats);
      } catch (error) {
        toast.error("Failed to fetch score statistics");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <Loading message="Loading report data..." />;

  return (
    <div className="px-2 sm:px-4 py-4 max-w-7xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-gray-800">
        Score Distribution by Subject
      </h2>

      {/* Biểu đồ */}
      <div className="w-full h-[300px] sm:h-[400px] bg-white p-4 rounded shadow">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={stats}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="excellent" fill="#4ade80" name="Excellent" />
            <Bar dataKey="good" fill="#60a5fa" name="Good" />
            <Bar dataKey="average" fill="#facc15" name="Average" />
            <Bar dataKey="weak" fill="#f87171" name="Weak" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Bảng */}
      <div className="mt-8 bg-white p-4 rounded shadow overflow-x-auto">
        <h3 className="text-lg sm:text-xl font-semibold mb-4">
          Detailed Counts
        </h3>
        <table className="min-w-full text-xs sm:text-sm text-left text-gray-600">
          <thead className="bg-gray-100 text-[0.65rem] sm:text-xs uppercase text-gray-700">
            <tr>
              <th className="px-4 py-2 whitespace-nowrap">Subject</th>
              <th className="px-4 py-2 whitespace-nowrap">Excellent (≥ 8)</th>
              <th className="px-4 py-2 whitespace-nowrap">
                Good (6 ≤ x &lt; 8)
              </th>
              <th className="px-4 py-2 whitespace-nowrap">
                Average (4 ≤ x &lt; 6)
              </th>
              <th className="px-4 py-2 whitespace-nowrap">Weak (&lt; 4)</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((item) => (
              <tr key={item.subject} className="border-b">
                <td className="px-4 py-2 font-medium whitespace-nowrap">
                  {item.subject}
                </td>
                <td className="px-4 py-2">{item.excellent}</td>
                <td className="px-4 py-2">{item.good}</td>
                <td className="px-4 py-2">{item.average}</td>
                <td className="px-4 py-2">{item.weak}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
