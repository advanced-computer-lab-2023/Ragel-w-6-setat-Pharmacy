import {useState} from 'react';
const AdminDeletePatient = () => {

const [username,setUsername]=useState("");
const [error,setError]=useState(null);

    const handleClick = async (e) => { 
        e.preventDefault(); //prevent default action of submitting
        const patient = {username}; //body of req
        console.log("patient to be deleted: "+ patient)
        const response = await fetch(`/api/admin/deletePatientByUsername/${patient.username}`, // + admin._id?
        {
            method: 'DELETE'
        })
        const json = await response.json();
        console.log("deleted patient: "+ json)
        
        
    }
       



    return (
        <form className="delete" onSubmit={handleClick}>
            <h3> Delete a Patient</h3>
            <label>Username</label>
            <input 
              type="text"
              onChange={(e)=> setUsername(e.target.value)}
              value={username}
            />
            <button>Delete Patient</button>
            {error && <div className="error">{error}</div>}
        </form>
        
    ) 

}
export default AdminDeletePatient