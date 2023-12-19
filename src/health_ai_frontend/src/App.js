import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import Chat from "./components/Chat";
import Home from "./components/Home";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";

const App = function AppWrapper() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/chat" element={<Chat />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <Toaster />
    </Router>
  );
};

export default App;