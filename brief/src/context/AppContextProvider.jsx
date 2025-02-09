import React, { createContext, useState, useContext } from "react";

// Créer le contexte
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    Budget: 100,
    GES: 50,
    Satisfaction: 50,
    Nucleaire: 17,
    Fossiles: 60,
    Renouvelables:23,
    history: [],
    stepper: 0,
  });

  const updateStepper = (newStep) => {
    setGlobalState((prevState) => ({
      ...prevState,
      stepper: newStep,
    }));
  };

  return (
    <AppContext.Provider value={{ globalState, setGlobalState, updateStepper }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useAppContext = () => useContext(AppContext);