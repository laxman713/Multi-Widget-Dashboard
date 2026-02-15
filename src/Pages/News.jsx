import { useState, useEffect } from "react";

function News({ isDarkMode }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);

      try {
        const API_KEY = process.env.REACT_APP_NEWS_KEY;

        const res = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&category=general&pageSize=5&apiKey=${API_KEY}`
        );

        const data = await res.json();

        if (res.ok) {
          setArticles(data.articles);
        } else {
          setError(data.message || "Failed to fetch news");
        }
      } catch {
        setError("Failed to fetch news");
      }

      setLoading(false);
    };

    fetchNews();
  }, []); // ✅ No missing dependencies now

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
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  className="card-img-top"
                  alt={article.title}
                  style={{ height: "180px", objectFit: "cover" }}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text flex-grow-1">
                  {article.description}
                </p>
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