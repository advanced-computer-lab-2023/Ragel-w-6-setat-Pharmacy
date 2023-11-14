import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
//import './AdminDelete.css'; // Import your custom CSS file for additional styling if needed

const AdminDelete = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();

    const admin = { username };
    console.log("admin to be deleted: " + admin.username);

    const response = await fetch(`/api/admin/deleteAdminByUsername/${admin.username}`, {
      method: 'DELETE',
    });

    const json = await response.json();
    console.log("deleted admin: " + json);

    if (!response.ok) {
      setError(json.error);
      setSuccess(false);
    } else {
      setUsername('');
      setError(null);
      setSuccess(true);
      
    }
  };

  return (
    <div className="container">
      <form className="delete" onSubmit={handleClick}>
        <h3>Delete an Admin</h3>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <button type="submit" className="btn btn-danger">
          Delete Admin
        </button>
        {error && <div className="text-danger mt-3">{error}</div>}
        {success && (
          <div className="text-success mt-3">Admin deleted successfully!</div>
        )}
      </form>
    </div>
  );
};

export default AdminDelete;
