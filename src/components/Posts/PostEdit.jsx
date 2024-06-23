import React, { useState } from 'react';
import { updateData } from '../../services/api';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

function PostEdit({ open, post, onClose, onUpdate }) {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  const handleSave = async () => {
    try {
      const updatedPost = { ...post, title, body };
      const data = await updateData('posts', post.id, updatedPost);
      onUpdate(data);
      onClose();
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Error updating post. Please try again.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Post</DialogTitle>
      <DialogContent>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Body"
          multiline
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={handleSave} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default PostEdit;
