import React, { useState } from 'react';
import { updateData } from '../../services/api';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

function AlbumEdit({ open, album, onClose, onUpdate }) {
  const [title, setTitle] = useState(album.title);

  const handleSave = async () => {
    try {
      const updatedAlbum = { ...album, title };
      const data = await updateData('albums', album.id, updatedAlbum);
      onUpdate(data);
      onClose();
    } catch (error) {
      console.error('Error updating album:', error);
      alert('Error updating album. Please try again.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Album</DialogTitle>
      <DialogContent>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={handleSave} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AlbumEdit;
