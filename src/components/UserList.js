import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



const UserList = () => {
  const [query, setQuery] = useState('');
  
    
  const [users, setUsers] = useState([]);

  const handleSearch = () => {
    console.log(query);
    axios.get(`http://localhost:8080/user/searchByNameOrSsnPrefix?prefix=${query}`).then((response) => {
      console.log(response.data);
      setUsers(response.data);
    });
  };
  console.log(users, query);
  return (
    <div>
      <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search users by name or SSN"
      />
      <button onClick={handleSearch}>Search</button>
    
    </div>
    <div className="user-list">
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>SSN</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.ssn}</td>
              <td>
                <Link to={`/userdetails/${user.email}`}>View Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default UserList;
