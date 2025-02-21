import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
       <Routes>
          <Route path="/search" element={<UserList />} />
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
