import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";

function App() {
    const [sortBy, setSortBy] = useState("model_id");
    const [data, setData] = useState([]);
    const [category, setCategory] = useState("");
    const [preloadClass, setPreloadClass] = useState("");

    const sortOptions = ["model_id", "category", "shaft_diameter_mm", "load_capacity_kgf", "preload_class", "accuracy_class", "length_mm", "price_usd"];

    // Fetch data from backend

    const fetchData = () => {
        const params = new URLSearchParams();
        if (sortBy) params.append("sort_by", sortBy);
        if (category) params.append("category", category);
        if (preloadClass) params.append("preload_class", preloadClass);

        fetch(`http://localhost:5000/api/parts?${params.toString()}`)
            .then(res => res.json())
            .then(setData)
            .catch(err => console.error("Error:", err));
    };

    useEffect(() => {
        fetchData();
    }, [sortBy, category, preloadClass]);

  return (
    <Box sx={{ p: 4 }}>
      <h1>Parts Directory</h1>

      {/* Filters */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <FormControl sx={{ minWidth: 140 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            label="Sort By"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="model_id">Model</MenuItem>
            <MenuItem value="shaft_diameter_mm">Shaft Diameter</MenuItem>
            <MenuItem value="load_capacity_kgf">Load Capacity</MenuItem>
            <MenuItem value="price_usd">Price</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 140 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="LM Guide">LM Guide</MenuItem>
            <MenuItem value="Ball Screw">Ball Screw</MenuItem>
            <MenuItem value="Ball Spline">Ball Spline</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 140 }}>
          <InputLabel>Preload</InputLabel>
          <Select
            value={preloadClass}
            label="Preload"
            onChange={(e) => setPreloadClass(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="C">C</MenuItem>
            <MenuItem value="CC">CC</MenuItem>
            <MenuItem value="CL">CL</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Model</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Shaft (mm)</TableCell>
              <TableCell>Load (kgf)</TableCell>
              <TableCell>Preload</TableCell>
              <TableCell>Accuracy</TableCell>
              <TableCell>Length (mm)</TableCell>
              <TableCell>Price ($)</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No results found.
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <TableRow key={item.model_id}>
                  <TableCell>{item.model_id}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.shaft_diameter_mm}</TableCell>
                  <TableCell>{item.load_capacity_kgf}</TableCell>
                  <TableCell>{item.preload_class}</TableCell>
                  <TableCell>{item.accuracy_class}</TableCell>
                  <TableCell>{item.length_mm}</TableCell>
                  <TableCell>{item.price_usd.toFixed(2)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default App;
