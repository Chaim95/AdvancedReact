import React, { useState, useEffect } from 'react';
import { fetchData, postData, deleteData } from '../../services/api';
import { Container, List, ListItem, ListItemText, IconButton, TextField, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AlbumEdit from './AlbumEdit';

function Albums() {
  const [albums, setAlbums] = useState([]);
  const [newAlbumTitle, setNewAlbumTitle] = useState('');
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [editAlbum, setEditAlbum] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  useEffect(() => {
    if (user && user.id) {
      const fetchAlbums = async () => {
        try {
          const data = await fetchData('albums');
          const userAlbums = data.filter(album => album.userId === parseInt(user.id));
          setAlbums(userAlbums);
        } catch (error) {
          console.error('Error fetching albums:', error);
        }
      };
      fetchAlbums();
    } else {
      console.error('User ID not found or user not set');
    }
  }, [user]);

  const handleAddAlbum = async () => {
    if (!user || !user.id) {
      alert('User not found');
      return;
    }

    const newAlbumItem = { userId: parseInt(user.id), title: newAlbumTitle };
    try {
      const data = await postData('albums', newAlbumItem);
      setAlbums([...albums, data]);
      setNewAlbumTitle('');
    } catch (error) {
      console.error('Error adding album:', error);
    }
  };

  const handleDeleteAlbum = async (id) => {
    try {
      await deleteData('albums', id);
      setAlbums(albums.filter(album => album.id !== id));
    } catch (error) {
      console.error('Error deleting album:', error);
    }
  };

  const handleEditAlbum = async (id, title) => {
    const updatedAlbum = { title };
    try {
      const data = await updateData('albums', id, updatedAlbum);
      setAlbums(albums.map(album => (album.id === id ? data : album)));
    } catch (error) {
      console.error('Error updating album:', error);
    }
  };

  const handleAlbumClick = async (album) => {
    setSelectedAlbum(album);
    try {
      const data = await fetchData(`photos?albumId=${album.id}`);
      setPhotos(data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  return (
    <Container>
      <Box mt={4}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="New Album Title"
          value={newAlbumTitle}
          onChange={(e) => setNewAlbumTitle(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddAlbum}>
          Add Album
        </Button>
        <List>
          {albums.map(album => (
            <ListItem key={album.id} dense button onClick={() => handleAlbumClick(album)}>
              <ListItemText primary={`#${album.id}: ${album.title}`} />
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteAlbum(album.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
      {selectedAlbum && (
        <Dialog open={Boolean(selectedAlbum)} onClose={() => setSelectedAlbum(null)} fullWidth maxWidth="md">
          <DialogTitle>Album Details</DialogTitle>
          <DialogContent>
            <Typography variant="h6">{selectedAlbum.title}</Typography>
            <Box mt={2} style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {photos.map(photo => (
                <Box key={photo.id} mb={2}>
                  <img src={photo.thumbnailUrl} alt={photo.title} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
                  <Typography>{photo.title}</Typography>
                </Box>
              ))}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditAlbum(selectedAlbum)} color="primary">Edit</Button>
            <Button onClick={() => setSelectedAlbum(null)} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      )}
      {editAlbum && (
        <AlbumEdit
          open={Boolean(editAlbum)}
          album={editAlbum}
          onClose={() => setEditAlbum(null)}
          onUpdate={(updatedAlbum) => setAlbums(albums.map(album => (album.id === updatedAlbum.id ? updatedAlbum : album)))}
        />
      )}
    </Container>
  );
}

export default Albums;
