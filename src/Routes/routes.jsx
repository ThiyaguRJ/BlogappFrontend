import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "../pages/auth/register";
import Dashboard from "../pages/dashboard";
import Login from "../pages/auth/login";
import Layout from "../Components/layout";
import ProtectedRoute from "../Components/ProtectedRoute";
import Managerole from "../pages/managerole/managerole";
import PasswordReset from "../pages/resetpassword/passwordreset";
import BlogCreateContainer from "../pages/Blog/blogCreatecontainer";
import BlogViewPage from "../Components/BlogViewPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manageuser" element={<Managerole />} />
        <Route path="/passwordreset" element={<PasswordReset />} />
        <Route path="/createpost" element={<BlogCreateContainer />} />
        <Route path="/blog/:id" element={<BlogViewPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
