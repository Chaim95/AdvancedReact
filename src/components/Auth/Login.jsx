import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../services/api';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const storedPassword = localStorage.getItem(username);
    if (storedPassword === password) {
      const users = await fetchData('users');
      const user = users.find(user => user.username === username);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/home');
      } else {
        alert('User not found in the database');
      }
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8}>
        <Typography variant="h4" gutterBottom>
          Login
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
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Login;
