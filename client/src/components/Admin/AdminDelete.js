import {useState} from 'react';
const AdminDelete = () => {

const [username,setUsername]=useState("");
const [error,setError]=useState(null);

    const handleClick = async (e) => { 
        e.preventDefault(); //prevent default action of submitting
        const admin = {username}; //body of req
        console.log("admin to be deleted: "+ admin)
        const response = await fetch(`/api/admin/deleteAdminByUsername/${admin.username}`, // + admin._id?
        {
            method: 'DELETE'
        })
        const json = await response.json();
        console.log("deleted admin: "+ json)
        
        
    }
       



    return (
        <form className="delete" onSubmit={handleClick}>
            <h3> Delete an Admin</h3>
            <label>Username</label>
            <input 
              type="text"
              onChange={(e)=> setUsername(e.target.value)}
              value={username}
            />
            <button>Delete Admin</button>
            {error && <div className="error">{error}</div>}
        </form>
        
    ) 

}
export default AdminDelete