import { createContext } from "react";
import { UserType } from "@/types/user";

interface UserContextType {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export default UserContext;
