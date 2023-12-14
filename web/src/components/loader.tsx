const Loader = () => (
  <div style={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
    <div className="spinner-border" style={{ width: 50, height: 50, fontSize: 30 }}>
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default Loader;
