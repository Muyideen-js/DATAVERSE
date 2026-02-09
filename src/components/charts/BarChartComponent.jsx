import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './ChartComponents.css';

function BarChartComponent({ data, query }) {
  // Process data for bar chart - aggregate by region
  const processedData = data.data.reduce((acc, row) => {
    const existing = acc.find(item => item.region === row.region);
    if (existing) {
      existing.revenue += row.revenue || 0;
    } else {
      acc.push({ region: row.region, revenue: row.revenue || 0 });
    }
    return acc;
  }, []).sort((a, b) => b.revenue - a.revenue);

  const topRegion = processedData[0];

  return (
    <div className="chart-wrapper">
      <div className="chart-header">
        <svg className="chart-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="20" x2="12" y2="10" />
          <line x1="18" y1="20" x2="18" y2="4" />
          <line x1="6" y1="20" x2="6" y2="16" />
        </svg>
        <h3 className="chart-title">Revenue by Region</h3>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={processedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="region" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip 
            contentStyle={{ 
              background: '#1a1a1a', 
              border: '1px solid #333',
              borderRadius: '8px',
              padding: '10px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
              color: '#fff'
            }}
            itemStyle={{ color: '#ccc' }}
            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
          />
          <Legend />
          <Bar dataKey="revenue" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#646cff" />
              <stop offset="100%" stopColor="#4a54c9" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
      <div className="chart-insight">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <span><strong>Insight:</strong> {topRegion?.region} leads with ${topRegion?.revenue.toLocaleString()} in revenue.</span>
      </div>
    </div>
  );
}

export default BarChartComponent;
