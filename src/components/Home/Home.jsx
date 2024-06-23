import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Typography, Box, AppBar, Toolbar } from '@mui/material';
import Info from './Info';

function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [showInfo, setShowInfo] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleToggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Welcome, {user.name}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Box mt={4}>
          <Button variant="contained" color="primary" onClick={() => navigate('/todos')}>
            Todos
          </Button>
          <Button variant="contained" color="primary" onClick={() => navigate('/posts')}>
            Posts
          </Button>
          <Button variant="contained" color="primary" onClick={() => navigate('/albums')}>
            Albums
          </Button>
          <Button variant="contained" color="primary" onClick={handleToggleInfo}>
            Info
          </Button>
        </Box>
        {showInfo && <Info user={user} />}
      </Container>
    </div>
  );
}

export default Home;
