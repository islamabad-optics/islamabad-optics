import React, { useEffect } from 'react';
import logo from '../../assets/images/users/logo-main.png';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Grid,
  Button
} from '@mui/material';

const PrintModal = ({ data, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        body * {
          visibility: hidden;
        }
        #print-area, #print-area * {
          visibility: visible;
        }
        #print-area {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          border: none !important;
          box-shadow: none !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (!data) return null;

  return (
    <Dialog open={Boolean(data)} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Print Sales Card
        <Button variant="outlined" onClick={handlePrint}>Print</Button>
      </DialogTitle>

      <DialogContent>
        <Box
          id="print-area"
          sx={{
            p: 2,
            border: '1px solid #000',
            borderRadius: 2,
            backgroundColor: '#fff',
            fontFamily: 'Arial, sans-serif',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          {/* Header */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <Typography><strong>Name:</strong> {data.customer_name}</Typography>
              <Typography><strong>Date:</strong> {data.entry_date}</Typography>
              <Typography>
                <strong>Age:</strong> {data.age || '____'} &nbsp;&nbsp;
                <strong>Sex:</strong> {data.sex || '____'}
              </Typography>
              <Typography><strong>IPD:</strong> {data.ipd || '____'}</Typography>
            </Grid>
            <Grid item xs={12} sm={4} textAlign="center">
              <Box>
                <Box
                  component="img"
                  src={logo}
                  alt="Islamabad Optics Logo"
                  sx={{
                    maxWidth: 200,
                    width: '100%',
                    height: 'auto',
                    mb: 1,
                    mx: 'auto',
                    display: 'block'
                  }}
                />
                <Typography variant="body2">Sharper Sight, Better Life</Typography>
                <Typography variant="body2">📞 +92 329 9112277</Typography>
                <Typography variant="body2">📧 islamabadoptics@gmail.com</Typography>
                <Typography variant="body2">
                  📍 Shops 1-3 (Basement), Faisal Plaza,<br />
                  Near ZAH Medical Centre, H-13 Islamabad
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Eye Prescription Table */}
          <Box mt={2}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }} border="1">
              <thead>
                <tr>
                  <th rowSpan="2"> </th>
                  <th colSpan="4">RIGHT EYE</th>
                  <th colSpan="4">LEFT EYE</th>
                </tr>
                <tr>
                  <th>SPH</th>
                  <th>CYL</th>
                  <th>AXIS</th>
                  <th>VA</th>
                  <th>SPH</th>
                  <th>CYL</th>
                  <th>AXIS</th>
                  <th>VA</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>D.V.</td>
                  <td>{data.right_eye_sphere}</td>
                  <td>{data.right_eye_cylinder}</td>
                  <td>{data.right_eye_axis}</td>
                  <td>{data.right_eye_va || '-'}</td>
                  <td>{data.left_eye_sphere}</td>
                  <td>{data.left_eye_cylinder}</td>
                  <td>{data.left_eye_axis}</td>
                  <td>{data.left_eye_va || '-'}</td>
                </tr>
                <tr>
                  <td>N.V.</td>
                  <td colSpan="4">{data.near_add || '-'}</td>
                  <td colSpan="4">{data.near_add || '-'}</td>
                </tr>
              </tbody>
            </table>
          </Box>

          {/* Signature and Order No */}
          <Box display="flex" justifyContent="space-between" mt={4}>
            <Typography><strong>Sign:</strong> ____________________</Typography>
            <Typography><strong>Order No:</strong> {data.order_no}</Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PrintModal;
