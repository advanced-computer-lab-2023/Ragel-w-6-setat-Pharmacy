const AdminDetails = ({admin}) => {




return(
    <div className="admin-details"> 
        <h4>{admin.username}</h4>
        <p><strong>Username: </strong>{admin.username}</p>
        <p><strong>Password: </strong>{admin.password}</p>
        <p>{admin.timeStamp}</p>
   
    </div>

) 
}
export default AdminDetails

  /*  //<span onClick={handleClick}>Delete</span> */