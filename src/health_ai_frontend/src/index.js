import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeContract } from "./utils/icp";
import HealthAiProvider from "./context/HealthAiProvider";
import PatientProvider from "./context/PatientProvider";

window.renderICPromise = initializeContract()
  .then(() => {
    ReactDOM.render(
      <React.StrictMode>
        <HealthAiProvider>
          <PatientProvider>
            <App />
          </PatientProvider>
        </HealthAiProvider>
      </React.StrictMode>,
      document.getElementById("root")
    );
  })
  .catch(console.error);

reportWebVitals();
