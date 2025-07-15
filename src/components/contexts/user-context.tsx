import { createContext } from "react";

const initialUser = {
  userId: "68182ae5b2645f657ba2d5e6",
  name: "Tester tester1",
  username: "tester1@example.com",
};

const UserContext = createContext({ user: initialUser });
// const UserContext = createContext({ user: null });

export default UserContext;
