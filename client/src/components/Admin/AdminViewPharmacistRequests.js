const AdminViewPharmacistRequests = ({pharmacistRequest}) => {


    // i think class name just for the sake of css
    
        return(
            <div className="pharmacist-requests-details"> 
                <h4>{pharmacistRequest.username}</h4>
                <p><strong>Name: </strong>{pharmacistRequest.name}</p>
                <p><strong>Username: </strong>{pharmacistRequest.username}</p>
                <p><strong>Password: </strong>{pharmacistRequest.password}</p>
                <p><strong>Email: </strong>{pharmacistRequest.email}</p>
                <p><strong>Date of Birth: </strong>{pharmacistRequest.dateOfBirth}</p>
                <p><strong>Hourly Rate: </strong>{pharmacistRequest.hourlyRate}</p>
                <p><strong>Affiliation: </strong>{pharmacistRequest.affiliation}</p>
                <p><strong>Educational Background: </strong>{pharmacistRequest.educationalBackground}</p>
                <p><strong>Status: </strong>{pharmacistRequest.status}</p>
                <p>{pharmacistRequest.timeStamp}</p>
           
            </div>
        
        ) 
        }
        export default AdminViewPharmacistRequests
        
          /*  //<span onClick={handleClick}>Delete</span> */