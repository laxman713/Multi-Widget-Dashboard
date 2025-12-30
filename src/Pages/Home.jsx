function Home() {
  return (
    <div>
      <h2>Welcome to Your Dashboard</h2>
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Weather</h5>
              <p className="card-text">Check latest weather updates.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Crypto</h5>
              <p className="card-text">Track cryptocurrency prices.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">News</h5>
              <p className="card-text">Read top news headlines.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
