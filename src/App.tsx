import React, { useContext, useEffect } from "react";
import UserContext from "./components/contexts/user-context";
import Layout from "./components/layout";
import Splash from "./pages/splash";
import User from "./pages/user";
import Home from "./pages/home";
import Settings from "./pages/settings";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />, // Use AuthCheck as the root element
      children: [
        { path: "/", element: <Splash /> },
        { path: "/user", element: <User /> },
        { path: "/home", element: <Home /> },
        { path: "/settings", element: <Settings /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

function AuthCheck() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  return <Layout />;
}

export default App;
