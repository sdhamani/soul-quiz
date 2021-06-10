import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import Quiz from "./components/Quiz/Quiz";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/quiz/:cateogory" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
