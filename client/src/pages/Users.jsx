// Users.jsx
import { Link } from "react-router-dom";

const Users = ({ users }) => {
  return (
    <div>
      <h1>Users ({users.length})</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.username}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;