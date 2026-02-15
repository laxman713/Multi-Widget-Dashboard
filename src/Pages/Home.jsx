function Home({ navigate }) {
  return (
    <div>
      <h2 className="mb-4">Welcome to Dashboard</h2>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow-sm p-4 text-center">
            <h5>Weather</h5>
            <button
              className="btn btn-primary mt-3"
              onClick={() => navigate("weather")}
            >
              Open
            </button>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm p-4 text-center">
            <h5>Crypto</h5>
            <button
              className="btn btn-primary mt-3"
              onClick={() => navigate("crypto")}
            >
              Open
            </button>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm p-4 text-center">
            <h5>News</h5>
            <button
              className="btn btn-primary mt-3"
              onClick={() => navigate("news")}
            >
              Open
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;