import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Login from './components/Auth/Login.jsx';
import Register from './components/Auth/Register.jsx';
import Home from './components/Home/Home.jsx';
import Todos from './components/Todos/Todos.jsx';
import Posts from './components/Posts/Posts.jsx';
import Albums from './components/Albums/Albums.jsx';
import './App.css';

console.log('App.jsx loaded');

function App() {
  console.log('App component rendered');
  return (
    <div className="App">
      <nav>
        <Link to="/">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/home">Home</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/albums" element={<Albums />} />
      </Routes>
    </div>
  );
}

export default App;
