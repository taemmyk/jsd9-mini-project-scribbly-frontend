import React, { useContext, useState, useEffect } from "react";
import UserContext from "./components/contexts/user-context";
import Layout from "./components/layout";
import Splash from "./pages/splash";
import User from "./pages/user";
import Home from "./pages/home";
import NoteNew from "./pages/note-new";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import api from "@/services/api";

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
      { path: "/tags/me/:tag", element: <ProtectedRoute element={<Home />} /> },
      { path: "/note/new", element: <ProtectedRoute element={<NoteNew />} /> },
    ],
  },
]);

function App() {
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await api.get("/mongo/check-auth");
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkLogin();
  }, [setUser]);

  if (loading) return <div>Loading...</div>;

  return <RouterProvider router={router} />;
}

export default App;
