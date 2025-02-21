import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);

  const handleSearch = (query) => {
    axios.get(`/user/searchByNamePrefix?prefix=${query}`).then((response) => {
      setUsers(response.data);
    });
  };

  return (
    <Router>
      <div className="app">
        <SearchBar onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<UserList users={users} />} />
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
