import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import './ChartComponents.css';

const COLORS = ['#646cff', '#535bf2', '#4a54c9', '#424bb2', '#3a429c'];

function PieChartComponent({ data, query }) {
  // Process data for pie chart - aggregate by product
  const processedData = data.data.reduce((acc, row) => {
    const existing = acc.find(item => item.name === row.product);
    if (existing) {
      existing.value += row.revenue || 0;
    } else {
      acc.push({ name: row.product, value: row.revenue || 0 });
    }
    return acc;
  }, []);

  const total = processedData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="chart-wrapper">
      <div className="chart-header">
        <svg className="chart-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
          <path d="M22 12A10 10 0 0 0 12 2v10z" />
        </svg>
        <h3 className="chart-title">Revenue Distribution by Product</h3>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={processedData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {processedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
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
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <div className="chart-insight">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <span><strong>Insight:</strong> Total revenue of ${total.toLocaleString()} distributed across {processedData.length} products.</span>
      </div>
    </div>
  );
}

export default PieChartComponent;
