import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthContextProvider(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    
  }, []);

  return <AuthContext.Provider>{props.children}</AuthContext.Provider>;
}
