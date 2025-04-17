import React, { useEffect, useState } from 'react';
import {
  Box, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography, Paper, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField
} from '@mui/material';
import { databases } from '../../utils/appwrite'; // your Appwrite instance
import { ID } from 'appwrite';

const DB_ID = '67fe47260000f251de8f';
const COLLECTION_ID = '67fe480d000e8ff9a46f';

export default function CustomerTable() {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [form, setForm] = useState({ name: '', phone_no: '', address: '' });

  // Load data
  const fetchCustomers = async () => {
    try {
      const res = await databases.listDocuments(DB_ID, COLLECTION_ID);
      setCustomers(res.documents);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleOpen = (customer = null) => {
    if (customer) {
      setForm({ name: customer.name, phone_no: customer.phone_no, address: customer.address });
      setCurrentId(customer.$id);
      setEditMode(true);
    } else {
      setForm({ name: '', phone_no: '', address: '' });
      setEditMode(false);
      setCurrentId(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForm({ name: '', phone_no: '', address: '' });
    setEditMode(false);
    setCurrentId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdate = async () => {
    const { name, phone_no, address } = form;
    if (!name || !phone_no || !address) {
      alert('Please fill all fields');
      return;
    }

    try {
      if (editMode) {
        await databases.updateDocument(DB_ID, COLLECTION_ID, currentId, { name, phone_no, address });
      } else {
        await databases.createDocument(DB_ID, COLLECTION_ID, ID.unique(), { name, phone_no, address });
      }
      fetchCustomers();
      handleClose();
    } catch (err) {
      console.error(editMode ? 'Update failed:' : 'Add failed:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this customer?')) return;
    try {
      await databases.deleteDocument(DB_ID, COLLECTION_ID, id);
      fetchCustomers();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Customer List</Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>Add</Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((cust) => (
              <TableRow key={cust.$id}>
                <TableCell>{cust.name}</TableCell>
                <TableCell>{cust.phone_no}</TableCell>
                <TableCell>{cust.address}</TableCell>
                <TableCell align="right">
                  <Button size="small" variant="outlined" onClick={() => handleOpen(cust)}>Edit</Button>
                  <Button size="small" variant="contained" color="error" onClick={() => handleDelete(cust.$id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Edit' : 'Add'} Customer</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="Full Name" name="name" value={form.name} onChange={handleChange} fullWidth />
          <TextField label="Phone" name="phone_no" value={form.phone_no} onChange={handleChange} fullWidth />
          <TextField label="Address" name="address" value={form.address} onChange={handleChange} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleAddOrUpdate} variant="contained" color="primary">
            {editMode ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
