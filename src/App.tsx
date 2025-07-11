import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes/Route";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Sidebar />
      <div className="pt-16 pl-16 sm:pl-60 transition-all duration-300 bg-gray-50 min-h-screen">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
