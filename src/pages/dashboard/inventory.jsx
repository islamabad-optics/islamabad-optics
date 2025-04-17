import * as React from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';

const tabLabels = [
  'Frame',
  'Lense',
  'Contact Lense',
  'Contact Lense Kit',
  'Cleaner',
  'Sunglasses',
  'Reading Glasses',
];

function TabPanel({ value, index, children }) {
  return value === index ? <Box sx={{ p: 2 }}>{children}</Box> : null;
}

export default function InventoryPage() {
  const [tabIndex, setTabIndex] = React.useState(0);

  // Track inventory per tab
  const [inventoryData, setInventoryData] = React.useState(() =>
    tabLabels.map(() => [
      { name: 'Item A', price: 100, code: 'FRM001', stock: 20 },
      { name: 'Item B', price: 150, code: 'FRM002', stock: 12 },
      { name: 'Item C', price: 200, code: 'FRM003', stock: 5 },
    ])
  );

  // Modal state
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [formValues, setFormValues] = React.useState({
    name: '',
    price: '',
    code: '',
    stock: '',
  });

  const handleTabChange = (event, newValue) => setTabIndex(newValue);

  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    setFormValues({ name: '', price: '', code: '', stock: '' }); // reset
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleAddItem = () => {
    const { name, price, code, stock } = formValues;
    if (name && price && code && stock) {
      const updatedInventory = [...inventoryData];
      updatedInventory[tabIndex].push({
        name,
        price: parseFloat(price),
        code,
        stock: parseInt(stock),
      });
      setInventoryData(updatedInventory);
      handleCloseAddModal();
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Typography variant="h5" gutterBottom>Inventory</Typography>

      {/* Tabs */}
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        {tabLabels.map((label, index) => (
          <Tab key={index} label={label} />
        ))}
      </Tabs>

      {/* Tab Panels */}
      {tabLabels.map((label, index) => (
        <TabPanel key={index} value={tabIndex} index={index}>
          {/* Add button */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
            <Button variant="contained" color="primary" onClick={handleOpenAddModal}>
              Add
            </Button>
          </Box>

          {/* Table */}
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Code</TableCell>
                  <TableCell>Total Stock Remaining</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inventoryData[index].map((item, idx) => (
                  <TableRow
                    key={idx}
                    sx={{ backgroundColor: idx % 2 === 0 ? 'white' : 'rgba(0,0,0,0.04)' }}
                  >
                    <TableCell>{item.name}</TableCell>
                    <TableCell>₹{item.price}</TableCell>
                    <TableCell>{item.code}</TableCell>
                    <TableCell>{item.stock}</TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        <Button size="small" variant="outlined">Edit</Button>
                        <Button size="small" variant="contained" color="error">Delete</Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      ))}

      {/* Add Modal */}
      <Dialog open={openAddModal} onClose={handleCloseAddModal} fullWidth maxWidth="sm">
        <DialogTitle>Add New Item</DialogTitle>
        <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Name"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={formValues.price}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Code"
            name="code"
            value={formValues.code}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Total Stock"
            name="stock"
            type="number"
            value={formValues.stock}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddModal}>Cancel</Button>
          <Button variant="contained" onClick={handleAddItem}>Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
