import React, { useState, useEffect } from 'react';
import { fetchData, postData, deleteData, updateData } from '../../services/api';
import { Container, List, ListItem, ListItemText, IconButton, TextField, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PostEdit from './PostEdit';
import Comments from './Comments';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');
  const [search, setSearch] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [editPost, setEditPost] = useState(null);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  useEffect(() => {
    if (user && user.id) {
      const fetchPosts = async () => {
        try {
          const data = await fetchData('posts');
          const userPosts = data.filter(post => post.userId === parseInt(user.id));
          setPosts(userPosts);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      };
      fetchPosts();
    } else {
      console.error('User ID not found or user not set');
    }
  }, [user]);

  const handleAddPost = async () => {
    if (!user || !user.id) {
      alert('User not found');
      return;
    }

    const newPost = { userId: parseInt(user.id), title: newPostTitle, body: newPostBody };
    try {
      const data = await postData('posts', newPost);
      setPosts([...posts, data]);
      setNewPostTitle('');
      setNewPostBody('');
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await deleteData('posts', id);
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEditPost = async (id, title, body) => {
    const updatedPost = { title, body };
    try {
      const data = await updateData('posts', id, updatedPost);
      setPosts(posts.map(post => (post.id === id ? data : post)));
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredPosts = posts.filter(post => {
    return (
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.id.toString().includes(search)
    );
  });

  return (
    <Container>
      <Box mt={4}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Search"
          value={search}
          onChange={handleSearch}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Post Title"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Post Body"
          multiline
          rows={4}
          value={newPostBody}
          onChange={(e) => setNewPostBody(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddPost}>
          Add Post
        </Button>
        <List>
          {filteredPosts.map(post => (
            <ListItem key={post.id} dense button onClick={() => setSelectedPost(post)}>
              <ListItemText primary={`#${post.id}: ${post.title}`} />
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeletePost(post.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
      {selectedPost && (
        <Dialog open={Boolean(selectedPost)} onClose={() => setSelectedPost(null)} fullWidth maxWidth="md">
          <DialogTitle>Post Details</DialogTitle>
          <DialogContent>
            <Typography variant="h6">{selectedPost.title}</Typography>
            <Typography variant="body1">{selectedPost.body}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCommentsOpen(true)} color="primary">Comments</Button>
            <Button onClick={() => setEditPost(selectedPost)} color="primary">Edit</Button>
            <Button onClick={() => setSelectedPost(null)} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      )}
      {editPost && (
        <PostEdit
          open={Boolean(editPost)}
          post={editPost}
          onClose={() => setEditPost(null)}
          onUpdate={(updatedPost) => setPosts(posts.map(post => (post.id === updatedPost.id ? updatedPost : post)))}
        />
      )}
      {commentsOpen && selectedPost && (
        <Comments
          postId={selectedPost.id}
          open={commentsOpen}
          onClose={() => setCommentsOpen(false)}
        />
      )}
    </Container>
  );
}

export default Posts;
