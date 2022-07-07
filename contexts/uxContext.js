import { useState, useEffect } from "react";
import { createContext, useContext } from "react";
import { me } from "../directus/utils";

const uxContext = createContext();

export const UxWrapper = ({ children }) => {
  const [flash, setFlash] = useState("");
  const [flashType, setFlashType] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [redirect, setRedirect] = useState("");
  const [initialize, setInitialize] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      me()
        .then((response) => setCurrentUser(response))
        .catch((err) => console.log(err));
    }
  }, [isAuthenticated, setCurrentUser]);

  const deleteMessage = () => {
    setFlash("");
  };

  const handleFlash = (type, text, duration) => {
    setFlashType(type);
    setFlash(text);
    setTimeout(deleteMessage, duration);
  };

  return (
    <uxContext.Provider
      value={{
        flash,
        flashType,
        handleFlash,
        isAuthenticated,
        setIsAuthenticated,
        currentUser,
        setCurrentUser,
        redirect,
        setRedirect,
        initialize,
        setInitialize,
      }}
    >
      {children}
    </uxContext.Provider>
  );
};

export const useUxContext = () => {
  return useContext(uxContext);
};
