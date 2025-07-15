import React, { useContext } from "react";
import UserContext from "./components/contexts/user-context";
import Layout from "./components/layout";
import Splash from "./pages/splash";
import User from "./pages/user";
import Home from "./pages/home";
import Settings from "./pages/settings";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

function ProtectedRoute({ element }: { element: React.ReactElement }) {
  const { user } = useContext(UserContext);
  return user ? element : <Navigate to="/user" replace />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Splash /> },
      { path: "/user", element: <User /> },
      { path: "/home", element: <ProtectedRoute element={<Home />} /> },
      { path: "/settings", element: <ProtectedRoute element={<Settings />} /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
