import React, { useState, useEffect } from 'react';

const Test = () => {
  const [userRoles, setUserRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  
  useEffect(() => {
    // Fetch user data from your API
    fetch('http://localhost:8080/user/searchAll')
      .then(response => response.json())
      .then(data => {
        // Extract job roles from the data
        const roles = data.map(user => user.jobRole);
        // Remove duplicates (if any)
        const uniqueRoles = Array.from(new Set(roles));
        setUserRoles(uniqueRoles);
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  return (
    <div>
      <label htmlFor="roleSelect">Select Job Role:</label>
      <select id="roleSelect" value={selectedRole} onChange={handleRoleChange}>
        <option value="">All</option>
        {userRoles.map((role, index) => (
          <option key={index} value={role}>
            {role}
          </option>
        ))}
      </select>

      {/* Display users based on the selected role */}
      <div>
        <h2>Users with selected role: {selectedRole || 'All'}</h2>
        {/* Fetch and display users based on the selected role */}
        {/* You should implement this part based on your API */}
      </div>
    </div>
  );
};

export default Test;

///////////////////////////////


