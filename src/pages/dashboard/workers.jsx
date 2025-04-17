
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

// Sample worker data
const workers = [
  { name: 'Usman Ghani', contact: '+923000000000', designation: 'Manager' },
  { name: 'Sabtain', contact: '+923000000001', designation: 'Sales Representative' },
  { name: 'Ayesha Khan', contact: '+923000000002', designation: 'Accountant' },
  { name: 'Ali Raza', contact: '+923000000003', designation: 'Customer Support' }
];

export default function WorkersTable() {
  const handleViewDetails = (workerName) => {
    // Implement the logic for viewing the details of the worker
    alert(`View details for ${workerName}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Contact No</TableCell>
            <TableCell>Designation</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workers.map((worker, index) => (
            <TableRow key={index}>
              <TableCell>{worker.name}</TableCell>
              <TableCell>{worker.contact}</TableCell>
              <TableCell>{worker.designation}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleViewDetails(worker.name)}
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
