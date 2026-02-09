import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './ChartComponents.css';

function LineChartComponent({ data, query }) {
  // Process data for line chart - group by date and sum revenue
  const processedData = data.data.reduce((acc, row) => {
    const existing = acc.find(item => item.date === row.date);
    if (existing) {
      existing.revenue += row.revenue || 0;
    } else {
      acc.push({ date: row.date, revenue: row.revenue || 0 });
    }
    return acc;
  }, []);

  return (
    <div className="chart-wrapper">
      <div className="chart-header">
        <svg className="chart-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
        <h3 className="chart-title">Revenue Trends Over Time</h3>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={processedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="date" stroke="#888" />
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
            labelStyle={{ color: '#fff', fontWeight: 600 }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="#646cff" 
            strokeWidth={3}
            dot={{ fill: '#646cff', r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: '#fff' }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="chart-insight">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <span><strong>Insight:</strong> The data shows revenue patterns across different dates.</span>
      </div>
    </div>
  );
}

export default LineChartComponent;
