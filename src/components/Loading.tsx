import type React from "react";

interface LoadingSpinnerProps {
  message?: string;
}

const Loading: React.FC<LoadingSpinnerProps> = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] h-full">
      <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-medium text-gray-700">{message}</p>
    </div>
  );
};

export default Loading;
