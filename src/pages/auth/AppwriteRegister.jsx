import { useState } from 'react';
import { databases, ID } from '../../utils/appwrite';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Stack, MenuItem } from '@mui/material';

const databaseId = 'YOUR_DATABASE_ID';
const workersCollectionId = 'YOUR_WORKERS_COLLECTION_ID';

export default function AppwriteRegister() {
  const [form, setForm] = useState({
    name: '',
    phone_no: '',
    password: '',
    role: 'worker'
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async () => {
    try {
      await databases.createDocument(databaseId, workersCollectionId, ID.unique(), form);
      alert('Registration successful');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Error registering user');
    }
  };

  return (
    <Stack spacing={2}>
      <TextField label="Name" name="name" fullWidth onChange={handleChange} />
      <TextField label="Phone Number" name="phone_no" fullWidth onChange={handleChange} />
      <TextField label="Password" name="password" type="password" fullWidth onChange={handleChange} />
      <TextField
        label="Role"
        name="role"
        fullWidth
        select
        value={form.role}
        onChange={handleChange}
      >
        <MenuItem value="worker">Worker</MenuItem>
        <MenuItem value="manager">Manager</MenuItem>
      </TextField>
      <Button variant="contained" onClick={handleRegister}>Register</Button>
    </Stack>
  );
}
