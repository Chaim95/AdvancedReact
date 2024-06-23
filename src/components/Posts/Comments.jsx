import React, { useState, useEffect } from 'react';
import { fetchData, postData, deleteData, updateData } from '../../services/api';
import { Container, TextField, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function Comments({ postId, open, onClose }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      const data = await fetchData(`comments?postId=${postId}`);
      setComments(data);
    };
    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    const newCommentItem = { postId, body: newComment };
    const data = await postData('comments', newCommentItem);
    setComments([...comments, data]);
    setNewComment('');
  };

  const handleDeleteComment = async (id) => {
    await deleteData('comments', id);
    setComments(comments.filter(comment => comment.id !== id));
  };

  const handleUpdateComment = async (id, body) => {
    const updatedComment = { body };
    const data = await updateData('comments', id, updatedComment);
    setComments(comments.map(comment => (comment.id === id ? data : comment)));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Comments</DialogTitle>
      <DialogContent>
        <Box>
          {comments.map(comment => (
            <Box key={comment.id} mb={2}>
              <TextField
                fullWidth
                multiline
                rows={2}
                value={comment.body}
                onChange={(e) => handleUpdateComment(comment.id, e.target.value)}
              />
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteComment(comment.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="New Comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddComment}>
          Add Comment
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default Comments;
