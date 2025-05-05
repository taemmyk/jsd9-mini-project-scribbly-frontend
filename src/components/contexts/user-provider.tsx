import React, { useContext } from "react";
import UserContext from "./user-context";

function UserProvider({ children }) {
  const userContextValue = useContext(UserContext);

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
