// This version integrates Appwrite for full CRUD (Create, Read, Update, Delete)
// It replaces the local state dummy data and functions

import * as React from 'react';
import {
  Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, Paper, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Grid, Select, MenuItem
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { ID, Query } from 'appwrite';
import { databases } from '../../utils/appwrite'; // Adjust this path as needed

const DATABASE_ID = '67fe47260000f251de8f';
const COLLECTION_ID = '67ff759700363e63d767';

const frameOptions = ['Full Rim', 'Half Rim', 'Rimless'];
const lensesOptions = ['Single Vision', 'Bifocal', 'Progressive'];

const initialForm = {
  customer_name: '',
  right_eye_sphere: '',
  right_eye_cylinder: '',
  right_eye_axis: '',
  left_eye_sphere: '',
  left_eye_cylinder: '',
  left_eye_axis: '',
  near_add: '',
  total_amount: '',
  remaining_amount: '',
  recieved_amount: '',
  frame_type: '',
  lense_type: '',
  entry_date: null,
  delivery_date: null,
  complete: false
};

export default function OrdersDetailedTable() {
  const [orders, setOrders] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState(initialForm);
  const [editId, setEditId] = React.useState(null);

  const fetchOrders = async () => {
    try {
      const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
      setOrders(res.documents);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  React.useEffect(() => {
    fetchOrders();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleDateChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    const order_no = `ORD${String(Date.now()).slice(-5)}`;
    const payload = {
      ...form,
      order_no,
      entry_date: dayjs(form.entry_date).format('YYYY-MM-DD'),
      delivery_date: dayjs(form.delivery_date).format('YYYY-MM-DD')
    };
    try {
      if (editId) {
        await databases.updateDocument(DATABASE_ID, COLLECTION_ID, editId, payload);
      } else {
        await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), payload);
      }
      fetchOrders();
      setOpen(false);
      setForm(initialForm);
      setEditId(null);
    } catch (err) {
      console.error('Error submitting order:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
      fetchOrders();
    } catch (err) {
      console.error('Error deleting order:', err);
    }
  };

  const handleEdit = (order) => {
    setForm({
      ...order,
      entry_date: dayjs(order.entry_date),
      delivery_date: dayjs(order.delivery_date)
    });
    setEditId(order.$id);
    setOpen(true);
  };

  const toggleComplete = async (order) => {
    try {
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, order.$id, {
        complete: !order.complete
      });
      fetchOrders();
    } catch (err) {
      console.error('Error toggling complete:', err);
    }
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Customer Orders</Typography>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Add</Button>
      </Box>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Order No</TableCell>
              <TableCell>Right Eye</TableCell>
              <TableCell>Left Eye</TableCell>
              <TableCell>Near Add</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Received</TableCell>
              <TableCell>Remaining</TableCell>
              <TableCell>Frame</TableCell>
              <TableCell>Lens</TableCell>
              <TableCell>Entry</TableCell>
              <TableCell>Delivery</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.$id}>
                <TableCell>{order.customer_name}</TableCell>
                <TableCell>{order.order_no}</TableCell>
                <TableCell>{order.right_eye_sphere}/{order.right_eye_cylinder}/{order.right_eye_axis}</TableCell>
                <TableCell>{order.left_eye_sphere}/{order.left_eye_cylinder}/{order.left_eye_axis}</TableCell>
                <TableCell>{order.near_add}</TableCell>
                <TableCell>{order.total_amount}</TableCell>
                <TableCell>{order.recieved_amount}</TableCell>
                <TableCell>{order.remaining_amount}</TableCell>
                <TableCell>{order.frame_type}</TableCell>
                <TableCell>{order.lense_type}</TableCell>
                <TableCell>{order.entry_date}</TableCell>
                <TableCell>{order.delivery_date}</TableCell>
                <TableCell>{order.complete ? '✅' : '❌'}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => handleEdit(order)}>Edit</Button>
                  <Button size="small" color="error" onClick={() => handleDelete(order.$id)}>Delete</Button>
                  <Button size="small" color="secondary" onClick={() => toggleComplete(order)}>
                    {order.complete ? 'Undo' : 'Complete'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editId ? 'Edit Order' : 'Add Order'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {Object.entries({
              customer_name: 'Customer Name',
              right_eye_sphere: 'Right Sphere',
              right_eye_cylinder: 'Right Cylinder',
              right_eye_axis: 'Right Axis',
              left_eye_sphere: 'Left Sphere',
              left_eye_cylinder: 'Left Cylinder',
              left_eye_axis: 'Left Axis',
              near_add: 'Near Add',
              total_amount: 'Total Amount',
              recieved_amount: 'Received Amount',
              remaining_amount: 'Remaining Amount'
            }).map(([key, label]) => (
              <Grid item xs={6} key={key}>
                <TextField label={label} name={key} fullWidth value={form[key]} onChange={handleChange} />
              </Grid>
            ))}

            <Grid item xs={6}>
              <Select fullWidth name="frame_type" value={form.frame_type} onChange={handleChange} displayEmpty>
                <MenuItem value="" disabled>Select Frame Type</MenuItem>
                {frameOptions.map((opt) => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
              </Select>
            </Grid>
            <Grid item xs={6}>
              <Select fullWidth name="lense_type" value={form.lense_type} onChange={handleChange} displayEmpty>
                <MenuItem value="" disabled>Select Lens Type</MenuItem>
                {lensesOptions.map((opt) => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
              </Select>
            </Grid>

            <Grid item xs={6}>
              <DatePicker label="Entry Date" value={form.entry_date} onChange={(val) => handleDateChange('entry_date', val)} renderInput={(params) => <TextField fullWidth {...params} />} />
            </Grid>
            <Grid item xs={6}>
              <DatePicker label="Delivery Date" value={form.delivery_date} onChange={(val) => handleDateChange('delivery_date', val)} renderInput={(params) => <TextField fullWidth {...params} />} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
