import * as React from 'react';
import {
  Box, Tabs, Tab, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import { databases, ID, Query } from '../../utils/appwrite';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const databaseId = '67fe47260000f251de8f';
const collectionId = '67ff759e00337dcb0cff';

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
  const [inventoryData, setInventoryData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const [openModal, setOpenModal] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [editingItemId, setEditingItemId] = React.useState(null);

  const [formValues, setFormValues] = React.useState({
    name: '',
    unit_price: '',
    item_code: '',
    total_stock_remaining: '',
    inventory_type: tabLabels[0],
  });

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const res = await databases.listDocuments(databaseId, collectionId, [
        Query.equal('inventory_type', tabLabels[tabIndex])
      ]);
      setInventoryData(res.documents);
    } catch (err) {
      console.error('Error fetching inventory:', err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchInventory();
  }, [tabIndex]);

  const handleTabChange = (event, newValue) => setTabIndex(newValue);

  const handleOpenAddModal = () => {
    setEditMode(false);
    setFormValues({
      name: '',
      unit_price: '',
      item_code: '',
      total_stock_remaining: '',
      inventory_type: tabLabels[tabIndex],
    });
    setOpenModal(true);
  };

  const handleOpenEditModal = (item) => {
    setEditMode(true);
    setEditingItemId(item.$id);
    setFormValues({
      name: item.name,
      unit_price: item.unit_price,
      item_code: item.item_code,
      total_stock_remaining: item.total_stock_remaining,
      inventory_type: item.inventory_type,
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditMode(false);
    setEditingItemId(null);
    setFormValues({
      name: '',
      unit_price: '',
      item_code: '',
      total_stock_remaining: '',
      inventory_type: tabLabels[tabIndex],
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { name, unit_price, item_code, total_stock_remaining, inventory_type } = formValues;
    if (name && unit_price && item_code && total_stock_remaining && inventory_type) {
      try {
        if (editMode) {
          await databases.updateDocument(databaseId, collectionId, editingItemId, {
            name,
            unit_price,
            item_code,
            total_stock_remaining,
            inventory_type,
          });
        } else {
          await databases.createDocument(databaseId, collectionId, ID.unique(), {
            name,
            unit_price,
            item_code,
            total_stock_remaining,
            inventory_type,
          });
        }
        fetchInventory();
        handleCloseModal();
      } catch (err) {
        console.error('Error saving item:', err);
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await databases.deleteDocument(databaseId, collectionId, id);
      fetchInventory();
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  const handleExportToExcel = () => {
    if (inventoryData.length === 0) {
      alert("No data to export.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(inventoryData.map(item => ({
      Name: item.name,
      'Unit Price': item.unit_price,
      'Item Code': item.item_code,
      'Total Stock Remaining': item.total_stock_remaining,
      'Inventory Type': item.inventory_type,
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, tabLabels[tabIndex]);

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const fileName = `${tabLabels[tabIndex].replace(/\s+/g, '_')}_Inventory.xlsx`;

    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, fileName);
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Typography variant="h5" gutterBottom>Inventory</Typography>

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

      <TabPanel value={tabIndex} index={tabIndex}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2, gap: 2 }}>
          <Button variant="contained" color="primary" onClick={handleOpenAddModal}>
            Add
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleExportToExcel}>
            Export to Excel
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Unit Price</TableCell>
                <TableCell>Item Code</TableCell>
                <TableCell>Total Stock Remaining</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={5}>Loading...</TableCell></TableRow>
              ) : (
                inventoryData.map((item) => (
                  <TableRow key={item.$id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>₹{item.unit_price}</TableCell>
                    <TableCell>{item.item_code}</TableCell>
                    <TableCell>{item.total_stock_remaining}</TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => handleOpenEditModal(item)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          color="error"
                          onClick={() => handleDelete(item.$id)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* Add/Edit Modal */}
      <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="sm">
        <DialogTitle>{editMode ? 'Edit Item' : 'Add New Item'}</DialogTitle>
        <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Name"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Unit Price"
            name="unit_price"
            type="number"
            value={formValues.unit_price}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Item Code"
            name="item_code"
            value={formValues.item_code}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Total Stock Remaining"
            name="total_stock_remaining"
            type="number"
            value={formValues.total_stock_remaining}
            onChange={handleChange}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel id="inventory-type-label">Inventory Type</InputLabel>
            <Select
              labelId="inventory-type-label"
              name="inventory_type"
              value={formValues.inventory_type}
              onChange={handleChange}
              label="Inventory Type"
            >
              {tabLabels.map((label) => (
                <MenuItem key={label} value={label}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editMode ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
