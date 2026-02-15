// src/Pages/News.jsx
import { useState, useEffect } from "react";

function News({ isDarkMode }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "912b7503aacfa04e75fe8c5b47fd81a2"; // Your GNews API key
  const fetchNews = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://gnews.io/api/v4/top-headlines?lang=en&country=us&max=5&apikey=${API_KEY}`
      );
      const data = await res.json();

      if (res.ok || data.articles) {
        setArticles(data.articles || []);
      } else {
        setError(data.message || "Failed to fetch news");
      }
    } catch {
      setError("Failed to fetch news");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []); // ✅ ESLint-safe, no missing dependencies

  return (
    <div>
      <h2>News</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="row">
        {articles.map((article, idx) => (
          <div key={idx} className="col-md-6 mb-3">
            <div
              className={`card h-100 ${
                isDarkMode ? "bg-secondary text-light" : "bg-light text-dark"
              }`}
            >
              {article.image && (
                <img
                  src={article.image}
                  className="card-img-top"
                  alt={article.title}
                  style={{ height: "180px", objectFit: "cover" }}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text flex-grow-1">{article.description}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary mt-2"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;