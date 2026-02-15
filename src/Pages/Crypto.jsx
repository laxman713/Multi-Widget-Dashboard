
//crypto.js
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function Crypto({ isDarkMode }) {
  const [coins, setCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCrypto = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true"
        );
        const data = await res.json();
        setCoins(data);
      } catch {
        setError("Failed to fetch crypto data");
      }
      setLoading(false);
    };

    fetchCrypto();
  }, []);

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Crypto</h2>

      {/* Search */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search coin"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && filteredCoins.map((coin) => (
        <div key={coin.id} className={`card p-3 mb-3 ${isDarkMode ? "bg-secondary text-light" : "bg-light text-dark"}`}>
          <h5>{coin.name} ({coin.symbol.toUpperCase()})</h5>
          <p>Price: ${coin.current_price} | 24h Change: {coin.price_change_percentage_24h.toFixed(2)}%</p>

          <h6>Price Trend (last 7 days)</h6>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={coin.sparkline_in_7d.price.map((p, i) => ({ index: i, price: p }))}>
              <XAxis dataKey="index" stroke={isDarkMode ? "#fff" : "#000"} />
              <YAxis stroke={isDarkMode ? "#fff" : "#000"} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="price"
                stroke={isDarkMode ? "#0d6efd" : "#28a745"}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
}

export default Crypto;
