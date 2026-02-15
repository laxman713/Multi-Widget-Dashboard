import React, { useState, Suspense } from "react";
import Home from "./Pages/Home";
import Crypto from "./Pages/Crypto";
import News from "./Pages/News";
const Weather = React.lazy(() => import("./Pages/Weather"));

function App() {
  const [activeWidget, setActiveWidget] = useState("home");

  const renderWidget = () => {
    switch (activeWidget) {
      case "weather":
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <Weather />
          </Suspense>
        );
      case "crypto":
        return <Crypto />;
      case "news":
        return <News />;
      default:
        return <Home navigate={setActiveWidget} />;
    }
  };

  return (
    <div className="app-layout d-flex flex-column vh-100">

      {/* NAVBAR */}
      <nav className="navbar custom-navbar px-4">
        <span className="navbar-brand fw-semibold">
          Multi Widget Dashboard
        </span>
      </nav>

      <div className="d-flex flex-grow-1">

        {/* SIDEBAR */}
        <aside className="custom-sidebar p-4">
          <div className="sidebar-title mb-4">Widgets</div>

          {["home", "weather", "crypto", "news"].map((item) => (
            <button
              key={item}
              onClick={() => setActiveWidget(item)}
              className={`sidebar-btn ${
                activeWidget === item ? "active" : ""
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </aside>

        {/* CONTENT */}
        <main className="flex-grow-1 content-area p-4">
          {renderWidget()}
        </main>
      </div>
    </div>
  );
}

export default App;