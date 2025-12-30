import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function Weather({ isDarkMode }) {
  const [city, setCity] = useState("Hyderabad");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "526f1551ed20e9def53041607c953b81"; // 🔴 Replace with your real OpenWeatherMap API key

  const fetchWeather = async (searchCity) => {
    setLoading(true);
    setError(null);
    setChartData([]);
    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&units=metric&appid=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to fetch weather");
        setLoading(false);
        return;
      }

      // Take first 8 intervals (~24 hours)
      const todayData = data.list.slice(0, 8).map((item) => ({
        time: new Date(item.dt * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        temp: item.main.temp,
        humidity: item.main.humidity,
        wind: item.wind.speed,
      }));

      setChartData(todayData);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch weather");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = () => {
    if (city.trim() !== "") fetchWeather(city);
  };

  return (
    <div className={`p-3 ${isDarkMode ? "bg-secondary text-light" : "bg-light text-dark"}`}>
      <h2 className="mb-3">Weather Forecast</h2>

      {/* Search */}
      <div className="d-flex mb-3">
        <input
          type="text"
          className="form-control me-2"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      {chartData.length > 0 && (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              stroke={isDarkMode ? "#fff" : "#000"}
              interval={0}
              angle={-30}
              textAnchor="end"
              height={60}
            />
            <YAxis stroke={isDarkMode ? "#fff" : "#000"} unit="°C" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="temp" stroke="#ff7300" name="Temp (°C)" />
            <Line type="monotone" dataKey="humidity" stroke="#0077ff" name="Humidity (%)" />
            <Line type="monotone" dataKey="wind" stroke="#00cc66" name="Wind (m/s)" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default Weather;
