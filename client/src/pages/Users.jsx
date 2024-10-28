import { Link } from "react-router-dom";
import "./Users.css"; // Import CSS for styling
import { useState } from "react";

const Users = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter users based on search input
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="users-container">
      <h1>Users ({filteredUsers.length})</h1>
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="user-grid">
        {filteredUsers.map((user) => (
          <div key={user.id} className="user-card">
            <Link to={`/users/${user.id}`} className="user-link">
              {user.username}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;