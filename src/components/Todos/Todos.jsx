import React, { useState, useEffect } from 'react';
import { fetchData, postData, deleteData, updateData } from '../../services/api';
import { Container, List, ListItem, ListItemText, Checkbox, IconButton, TextField, Button, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TodoEdit from './ToDoEdit';

function Todos() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('serial');
  const [editTodo, setEditTodo] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await fetchData('todos');
      const filtered = data.filter(todo => parseInt(todo.userId, 10) === parseInt(user.id, 10));
      setTodos(filtered);
    };
    fetchTodos();
  }, [user.id]);

  const handleAddTodo = async () => {
    try {
      const newTodoItem = { userId: user.id, title: newTodo, completed: false };
      const data = await postData('todos', newTodoItem);
      setTodos([...todos, data]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteData('todos', id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleToggleTodo = async (id) => {
    try {
      const todo = todos.find(todo => todo.id === id);
      const updatedTodo = { ...todo, completed: !todo.completed };
      const data = await updateData('todos', id, updatedTodo);
      setTodos(todos.map(todo => (todo.id === id ? data : todo)));
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const filteredTodos = todos.filter(todo => {
    return (
      todo.title.toLowerCase().includes(search.toLowerCase()) ||
      todo.id.toString().includes(search) ||
      (search === 'completed' && todo.completed) ||
      (search === 'not completed' && !todo.completed)
    );
  });

  const sortedTodos = filteredTodos.sort((a, b) => {
    switch (filter) {
      case 'serial':
        return a.id - b.id;
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      case 'completed':
        return a.completed - b.completed;
      case 'random':
        return 0.5 - Math.random();
      default:
        return a.id - b.id;
    }
  });

  return (
    <Container>
      <Box mt={4}>
        <FormControl fullWidth>
          <InputLabel>Filter</InputLabel>
          <Select value={filter} onChange={handleFilter}>
            <MenuItem value="serial">Serial</MenuItem>
            <MenuItem value="alphabetical">Alphabetical</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="random">Random</MenuItem>
          </Select>
        </FormControl>
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
          label="New Todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddTodo}>
          Add Todo
        </Button>
        <List>
          {sortedTodos.map(todo => (
            <ListItem key={todo.id} dense button onDoubleClick={() => setEditTodo(todo)}>
              <ListItemText primary={`#${todo.id}: ${todo.title}`} />
              <Checkbox
                checked={todo.completed}
                tabIndex={-1}
                disableRipple
                onClick={() => handleToggleTodo(todo.id)}
              />
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTodo(todo.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
      {editTodo && (
        <TodoEdit
          open={Boolean(editTodo)}
          todo={editTodo}
          onClose={() => setEditTodo(null)}
          onUpdate={(updatedTodo) => setTodos(todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)))}
        />
      )}
    </Container>
  );
}

export default Todos;
