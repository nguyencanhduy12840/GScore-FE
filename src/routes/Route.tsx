import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import SearchScore from "../pages/SearchScore";
import Setting from "../pages/Setting";
import Reports from "../pages/Report";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/search" element={<SearchScore />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/settings" element={<Setting />} />
    </Routes>
  );
};

export default AppRoutes;
