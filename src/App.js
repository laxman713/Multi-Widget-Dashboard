import React, { useState, Suspense } from "react";
import Home from "./Pages/Home";
import Crypto from "./Pages/Crypto";
import News from "./Pages/News";
const Weather  = React.lazy(()=>import("./Pages/Weather"))

function App() {
  // Track each widget type individually
  const [activeWidgets, setActiveWidgets] = useState({
    home: true,
    weather: false,
    crypto: false,
    news: false,
  });

  const [isDarkMode, setIsDarkMode] = useState(false);

  const openWidget = (type) => {
    setActiveWidgets({
      home: false,
      weather: false,
      crypto: false,
      news: false,
      [type]: true, // overwrite current widget with the selected one
    });
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    localStorage.setItem("darkMode", !isDarkMode);
  };

  return (
   <div className={isDarkMode ? "bg-primary text-light min-vh-100" : "bg-light text-dark min-vh-100"}>
  {/* Navbar */}
  <nav
  className={`navbar sticky-top ${
    isDarkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
  }`}
>
  <span
    className={`navbar-brand mb-0 h1 ${
      isDarkMode ? "text-light" : "text-dark"
    }`}
  >
   Multi Widget Dashboard
  </span>
  <button
    className="btn btn-outline-secondary ms-auto"
    onClick={toggleDarkMode}
  >
    {isDarkMode ? "Light Mode" : "Dark Mode"}
  </button>
</nav>


  {/* Main Layout */}
  <div className="d-flex">
    {/* Sidebar */}
    <div className={`p-3 ${isDarkMode ? "bg-dark text-light" : "bg-light text-dark"}`}
         style={{ width: "250px", minHeight: "100vh" }}>
      <button className="btn btn-outline-primary w-100 mb-2" onClick={() => openWidget("home")}>Home</button>
      <button className="btn btn-outline-primary w-100 mb-2" onClick={() => openWidget("weather")}>Weather</button>
      <button className="btn btn-outline-primary w-100 mb-2" onClick={() => openWidget("crypto")}>Crypto</button>
      <button className="btn btn-outline-primary w-100 mb-2" onClick={() => openWidget("news")}>News</button>
    </div>

    {/* Main Content */}
    <div className="flex-grow-1 p-4">
      {activeWidgets.home && <Home />}
      <Suspense fallback={<div>Loading...</div>}>
      {activeWidgets.weather && <Weather isDarkMode={isDarkMode} />}
      </Suspense>
      {activeWidgets.crypto && <Crypto isDarkMode={isDarkMode} />}
      {activeWidgets.news && <News isDarkMode={isDarkMode} />}
    </div>
  </div>
</div>
  );
}

export default App;
