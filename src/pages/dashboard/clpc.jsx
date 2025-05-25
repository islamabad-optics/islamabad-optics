import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
  Paper,
} from '@mui/material';

const isValidNumber = (value) => !isNaN(parseFloat(value)) && isFinite(value);
const isValidAxis = (value) => {
  const axis = parseInt(value, 10);
  return axis >= 0 && axis <= 180;
};

const calculateContactLensPower = (spectaclePower, bvdMm) => {
  const bvdMeters = parseFloat(bvdMm) / 1000;
  const power = parseFloat(spectaclePower);
  const denom = 1 - (bvdMeters * power);
  return (power / denom).toFixed(2);
};

const CLPC = () => {
  const [values, setValues] = useState({
    rightSphere: '',
    rightCylinder: '',
    rightAxis: '',
    leftSphere: '',
    leftCylinder: '',
    leftAxis: '',
    bvd: '',
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setError('');
  };

  const handleCalculate = () => {
    const {
      rightSphere,
      rightCylinder,
      rightAxis,
      leftSphere,
      leftCylinder,
      leftAxis,
      bvd,
    } = values;

    if (
      !isValidNumber(rightSphere) ||
      !isValidNumber(rightCylinder) ||
      !isValidAxis(rightAxis) ||
      !isValidNumber(leftSphere) ||
      !isValidNumber(leftCylinder) ||
      !isValidAxis(leftAxis) ||
      !isValidNumber(bvd)
    ) {
      setError('Please enter valid Sphere, Cylinder, Axis (0-180°), and BVD values.');
      return;
    }

    const rightSpectaclePower = parseFloat(rightSphere) + parseFloat(rightCylinder);
    const leftSpectaclePower = parseFloat(leftSphere) + parseFloat(leftCylinder);

    const rightCLP = calculateContactLensPower(rightSpectaclePower, bvd);
    const leftCLP = calculateContactLensPower(leftSpectaclePower, bvd);

    setResult({
      rightCLP,
      leftCLP,
      rightAxis,
      leftAxis,
    });
  };

  return (
    <Card sx={{ maxWidth: 1000, mx: 'auto', mt: 5, p: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Contact Lens Power Calculator (With Axis)
        </Typography>

        {/* BVD Input */}
        <Box mt={2} mb={3}>
          <TextField
            fullWidth
            label="Back Vertex Distance (mm)"
            name="bvd"
            value={values.bvd}
            onChange={handleChange}
            type="number"
            placeholder="e.g., 12"
          />
        </Box>

        <Grid container spacing={4}>
          {/* Right Eye */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" mb={1}>Right Eye</Typography>
            <Grid container spacing={2}>
              {['Sphere', 'Cylinder', 'Axis'].map((label) => (
                <Grid item xs={12} sm={4} key={label}>
                  <Paper elevation={2} sx={{ p: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>{label}</Typography>
                    <TextField
                      fullWidth
                      type="number"
                      size="small"
                      variant="outlined"
                      name={`right${label}`}
                      value={values[`right${label}`]}
                      onChange={handleChange}
                      placeholder={label}
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Left Eye */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" mb={1}>Left Eye</Typography>
            <Grid container spacing={2}>
              {['Sphere', 'Cylinder', 'Axis'].map((label) => (
                <Grid item xs={12} sm={4} key={label}>
                  <Paper elevation={2} sx={{ p: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>{label}</Typography>
                    <TextField
                      fullWidth
                      type="number"
                      size="small"
                      variant="outlined"
                      name={`left${label}`}
                      value={values[`left${label}`]}
                      onChange={handleChange}
                      placeholder={label}
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        {/* Calculate Button */}
        <Box mt={4} display="flex" justifyContent="center">
          <Button variant="contained" color="primary" onClick={handleCalculate}>
            Calculate Contact Lens Power
          </Button>
        </Box>

        {/* Error Display */}
        {error && (
          <Box mt={2}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}

        {/* Result Display */}
        {result && (
          <Box mt={4}>
            <Typography variant="h6">Results</Typography>
            <Typography color="primary">
              <strong>Right Eye:</strong> {result.rightCLP} D @ {result.rightAxis}°
            </Typography>
            <Typography color="primary">
              <strong>Left Eye:</strong> {result.leftCLP} D @ {result.leftAxis}°
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default CLPC;
