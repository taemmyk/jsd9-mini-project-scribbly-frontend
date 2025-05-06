import Layout from "./components/layout";
import Splash from "./pages/splash";
import User from "./pages/user"
import Home from "./pages/home";
import Settings from "./pages/settings";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Splash /> },
      { path: "/user", element: <User /> },
      { path: "/settings", element: <Settings /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;