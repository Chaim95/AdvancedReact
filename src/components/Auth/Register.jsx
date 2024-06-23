import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    if (password !== passwordVerify) {
      alert('Passwords do not match');
      return;
    }
    localStorage.setItem(username, password);
    alert('Registration successful');
    navigate('/login');
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <form>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Verify Password"
            type="password"
            value={passwordVerify}
            onChange={(e) => setPasswordVerify(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleRegister}
          >
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Register;
