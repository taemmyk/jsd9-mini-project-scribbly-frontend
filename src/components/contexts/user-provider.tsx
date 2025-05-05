import React, { useContext, ReactNode } from "react";
import UserContext from "./user-context";

function UserProvider({ children }: { children: ReactNode }) {
  const userContextValue = useContext(UserContext);

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
