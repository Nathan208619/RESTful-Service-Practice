import React, { useEffect, useState } from "react";

function App() {
  const [sortBy, setSortBy] = useState("salary");
  const [data, setData] = useState([]);

  const sortOptions = ["id", "name", "department", "role", "salary"];

  // Fetch data from backend
  useEffect(() => {
    fetch(`http://localhost:5000/api/employees?sort_by=${sortBy}`)
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error("Error fetching data:", err));
  }, [sortBy]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Employee Directory</h1>

      {/* Dropdown Menu */}
      <label>
        Sort by:&nbsp;
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          {sortOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </label>

      {/* Data Table */}
      <table style={{ marginTop: "1rem", borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Department</th><th>Role</th><th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {data.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.department}</td>
              <td>{emp.role}</td>
              <td>${emp.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
