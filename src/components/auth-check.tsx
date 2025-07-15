import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./contexts/user-context";

export default function AuthCheck() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  return null;
}
