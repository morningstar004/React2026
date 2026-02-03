import React from "react";
import UserContext from "./userContext";

const UserContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

// This component acts as the manager of the global bucket.
// 1.) It creates a piece of state (user, setUser) using useState.
// 2.) It uses UserContext.Provider to "provide" (send) both the data (user) and the function to change that data (setUser) to any component wrapped inside it.