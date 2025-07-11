/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

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

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    const order = ["excellent", "good", "average", "weak"];
    const sortedPayload = [...payload].sort(
      (a, b) => order.indexOf(a.dataKey) - order.indexOf(b.dataKey)
    );

    return (
      <div className="bg-white border border-gray-300 rounded p-3 shadow text-sm">
        <p className="font-bold mb-1">{subjectMap[label ?? ""] ?? label}</p>
        {sortedPayload.map((entry, index) => (
          <p key={index} className="text-gray-700">
            <span className="capitalize">{entry.name}</span>: {entry.value}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
