import React, { useState } from 'react';

const AddAdmin = ({ onAddAdmin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleAddAdmin = () => {
        if (username.trim() === '' || password.trim() === '') {
            alert('Please enter both username and password.');
            return;
        }

        onAddAdmin({ username, password });
        setUsername('');
        setPassword('');
    };

    return (
        <div className="card mb-3">
            <div className="card-header">
                <h5 className="card-title">Add Admin</h5>
            </div>
            <div className="card-body">
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary"
                        style={{ backgroundColor: '#009688' }} // Add this inline style
                        onClick={handleAddAdmin}
                    >
                        Add Admin
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddAdmin;