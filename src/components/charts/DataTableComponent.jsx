import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './ChartComponents.css';

function DataTableComponent({ data }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Filter data based on search term
  const filteredData = data.data.filter(row => {
    return data.columns.some(col => {
      const value = row[col];
      return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const displayData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="chart-wrapper">
      <div className="chart-header">
        <svg className="chart-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
          <path d="M3 9V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2" />
        </svg>
        <h3 className="chart-title">Data Table</h3>
      </div>

      {/* Search Bar */}
      <div className="table-search">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search across all fields..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        {searchTerm && (
          <button 
            className="clear-search" 
            onClick={() => {
              setSearchTerm('');
              setCurrentPage(1);
            }}
          >
            ✕
          </button>
        )}
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              {data.columns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayData.length > 0 ? (
              displayData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {data.columns.map((col, colIndex) => (
                    <td key={colIndex}>{row[col]}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={data.columns.length} style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                  No results found for "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="table-pagination">
        <div className="pagination-info">
          Showing {startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredData.length)} of {filteredData.length} 
          {searchTerm && ` (filtered from ${data.data.length} total)`}
        </div>
        
        {totalPages > 1 && (
          <div className="pagination-controls">
            <button 
              onClick={() => goToPage(currentPage - 1)} 
              disabled={currentPage === 1}
              className="page-btn"
            >
              ‹ Prev
            </button>
            
            <span className="page-indicator">
              Page {currentPage} of {totalPages}
            </span>
            
            <button 
              onClick={() => goToPage(currentPage + 1)} 
              disabled={currentPage === totalPages}
              className="page-btn"
            >
              Next ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DataTableComponent;
