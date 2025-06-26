import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full p-4">
        <Outlet /> 
      </main>
      <footer className="bg-gray-900 text-white text-center py-2">
        © 2025 BlogApp
      </footer>
    </div>
  );
};

export default Layout;
