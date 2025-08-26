// import React from "react";
// import EmployeeDashboard from "./components/EmployeeDashboard";
// import PartsDashboard from "./components/PartsDashboard"

// function App() {
//   return <PartsDashboard />;
// }

// export default App;

// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
// } from "@mui/material";

// function App() {
//   const [cutPlan, setCutPlan] = useState([]);
//   const [unfulfilled, setUnfulfilled] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/cut-plan")
//       .then((res) => res.json())
//       .then((data) => {
//         setCutPlan(data.cut_plan || []);
//         setUnfulfilled(data.unfulfilled || []);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <Box sx={{ p: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Rod Cutting Plan
//       </Typography>

//       <TableContainer component={Paper} sx={{ mb: 4 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Stock Rod Length</TableCell>
//               <TableCell>Used Cuts</TableCell>
//               <TableCell>Waste</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {cutPlan.map((item, index) => (
//               <TableRow key={index}>
//                 <TableCell>{item.stock_length}</TableCell>
//                 <TableCell>{item.cuts.join(", ")}</TableCell>
//                 <TableCell>{item.waste}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {unfulfilled.length > 0 && (
//         <Box>
//           <Typography variant="h6" color="error">
//             Unfulfilled Demand
//           </Typography>
//           <Typography>{unfulfilled.join(", ")}</Typography>
//         </Box>
//       )}
//     </Box>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, Box
} from "@mui/material";

function App() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/job-assignments")
      .then(res => res.json())
      .then(setAssignments)
      .catch(err => console.error(err));
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Job Assignments</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Job ID</TableCell>
              <TableCell>Length</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Assigned Machine</TableCell>
              <TableCell>Note</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.job_id}</TableCell>
                <TableCell>{row.length}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.assigned_machine || "—"}</TableCell>
                <TableCell>{row.note || ""}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default App;

