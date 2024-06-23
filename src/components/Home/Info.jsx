import React from 'react';
import { Box, Typography } from '@mui/material';

function Info({ user }) {
  return (
    <Box mt={4}>
      <Typography variant="h6">User Information</Typography>
      <Typography>Name: {user.name}</Typography>
      <Typography>Username: {user.username}</Typography>
      <Typography>Email: {user.email}</Typography>
      {user.address && (
        <Typography>
          Address: {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}
        </Typography>
      )}
      <Typography>Phone: {user.phone}</Typography>
      <Typography>Website: {user.website}</Typography>
      {user.company && (
        <>
          <Typography>Company: {user.company.name}</Typography>
          <Typography>Catch Phrase: {user.company.catchPhrase}</Typography>
          <Typography>BS: {user.company.bs}</Typography>
        </>
      )}
    </Box>
  );
}

export default Info;
