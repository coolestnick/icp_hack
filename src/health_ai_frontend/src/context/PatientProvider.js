import React, { useContext, createContext, useEffect, useState } from "react";
import { getPatientName } from "../utils/healthAiCanister"; // Updated utility function name

const PatientContext = createContext();
export const usePatient = () => useContext(PatientContext);

const PatientProvider = ({ children }) => {
  const [patientName, setPatientName] = useState(""); // Renamed state variables

  const retrievePatientName = async () => {
    if (window.auth.principalText && window.auth.isAuthenticated) {
      const name = await getPatientName(window.auth.principalText); // Updated function call
      console.log(name);
      setPatientName(name);
    }
  };

  useEffect(() => {
    retrievePatientName();
  }, [window.auth.principalText, window.auth.isAuthenticated]);

  return (
    <PatientContext.Provider value={{ patientName, setPatientName }}> // Updated context values
      {children}
    </PatientContext.Provider>
  );
};

export default PatientProvider;
