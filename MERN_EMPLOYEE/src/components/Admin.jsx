import React, { useState } from 'react';
import { Button, Box, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');  // Added state for success message
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage(''); // Reset success message on form submission

    try {
      // Send login data to backend
      const response = await axios.post('http://localhost:5000/api/admin/login', {
        username,
        password,
      });

      // If login is successful, save the token to localStorage
      const { token } = response.data;
      localStorage.setItem('admin_token', token);

      console.log('Login successful!');
      setSuccessMessage('Login successful!'); // Set success message

      // Redirect to Home.jsx after successful login
      navigate('/home'); // Replace '/home' with the actual path to your Home component

    } catch (err) {
      setError('Invalid credentials or server error.');
      console.error('Login failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Box component="form" onSubmit={handleSubmit} sx={{ width: 400, padding: 4, boxShadow: 3, backgroundColor: 'white', borderRadius: 2 }}>
        <Typography variant="h5" align="center" gutterBottom style={{ color: 'red' }}>
          Admin Login
        </Typography>

        {/* Display error message */}
        {error && <Typography variant="body2" color="error" align="center">{error}</Typography>}

        {/* Display success message */}
        {successMessage && <Typography variant="body2" color="success.main" align="center">{successMessage}</Typography>}

        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </Box>
    </Box>
  );
};

export default Admin;
