import './ChartComponents.css';

function AlertCard({ data }) {
  const revenues = data.data.map(row => row.revenue || 0);
  const avgRevenue = revenues.reduce((a, b) => a + b, 0) / revenues.length;
  const stdDev = Math.sqrt(revenues.reduce((sq, n) => sq + Math.pow(n - avgRevenue, 2), 0) / revenues.length);
  
  const outliers = data.data.filter(row => {
    const revenue = row.revenue || 0;
    return Math.abs(revenue - avgRevenue) > 2 * stdDev;
  });

  return (
    <div className="chart-wrapper">
      <div className="chart-header">
        <svg className="chart-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <h3 className="chart-title">Anomaly Detection</h3>
      </div>
      <div className="alert-container">
        {outliers.length > 0 ? (
          <>
            <div className="alert-box warning">
              <div className="alert-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <div className="alert-content">
                <h4>Found {outliers.length} unusual data point(s)</h4>
                <p>These values are significantly different from the average.</p>
              </div>
            </div>
            <div className="outliers-list">
              {outliers.slice(0, 5).map((outlier, index) => (
                <div key={index} className="outlier-item stagger-item">
                  <span className="outlier-badge">OUTLIER {index + 1}</span>
                  <div className="outlier-details">
                    <strong>{outlier.product}</strong> in {outlier.region} on {outlier.date}
                    <br />
                    Revenue: ${outlier.revenue?.toLocaleString()} 
                    (Avg: ${avgRevenue.toFixed(2)})
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="alert-box success">
            <div className="alert-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div className="alert-content">
              <h4>No anomalies detected</h4>
              <p>All data points appear to be within normal ranges.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AlertCard;
