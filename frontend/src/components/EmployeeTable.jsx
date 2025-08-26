// src/components/EmployeeTable.jsx
import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper
} from "@mui/material";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/data")
      .then(res => res.json())
      .then(data => setEmployees(data))
      .catch(err => console.error("API error:", err));
  }, []);

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Department</strong></TableCell>
            <TableCell><strong>Role</strong></TableCell>
            <TableCell><strong>Salary</strong></TableCell>
            <TableCell><strong>Start Date</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((emp) => (
            <TableRow key={emp.id}>
              <TableCell>{emp.id}</TableCell>
              <TableCell>{emp.name}</TableCell>
              <TableCell>{emp.department}</TableCell>
              <TableCell>{emp.role}</TableCell>
              <TableCell>${emp.salary.toLocaleString()}</TableCell>
              <TableCell>{emp.start_date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;
