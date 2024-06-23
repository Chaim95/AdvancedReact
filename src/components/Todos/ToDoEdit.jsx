import React, { useState } from 'react';
import { updateData } from '../../services/api';
import { Container, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

function TodoEdit({ open, todo, onClose, onUpdate }) {
  const [title, setTitle] = useState(todo.title);
  const [completed, setCompleted] = useState(todo.completed);

  const handleSave = async () => {
    const updatedTodo = { ...todo, title, completed };
    const data = await updateData('todos', todo.id, updatedTodo);
    onUpdate(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Todo</DialogTitle>
      <DialogContent>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          Completed
        </label>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={handleSave} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default TodoEdit;
