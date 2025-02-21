import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`/api/getByEmail?email=${id}`).then((response) => {
      setUser(response.data);
    });
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="user-details">
      <img src={user.image} alt={`${user.firstName} ${user.lastName}`} />
      <h1>{`${user.firstName} ${user.lastName}`}</h1>
      <p>SSN: {user.ssn}</p>
      {/* Add other user attributes here */}
    </div>
  );
};

export default UserDetails;
