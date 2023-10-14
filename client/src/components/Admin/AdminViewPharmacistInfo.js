const AdminViewPharmacistInfo = ({pharmacist}) => {


// i think class name just for the sake of css

    return(
        <div className="pharmacists-details"> 
            <h4>{pharmacist.username}</h4>
            <p><strong>Name: </strong>{pharmacist.name}</p>
            <p><strong>Username: </strong>{pharmacist.username}</p>
            <p><strong>Password: </strong>{pharmacist.password}</p>
            <p><strong>Email: </strong>{pharmacist.email}</p>
            <p><strong>Date of Birth: </strong>{pharmacist.dateOfBirth}</p>
            <p><strong>Hourly Rate: </strong>{pharmacist.hourlyRate}</p>
            <p><strong>Affiliation: </strong>{pharmacist.affiliation}</p>
            <p><strong>Educational Background: </strong>{pharmacist.educationalBackground}</p>
            <p>{pharmacist.timeStamp}</p>
       
        </div>
    
    ) 
    }
    export default AdminViewPharmacistInfo
    
      /*  //<span onClick={handleClick}>Delete</span> */