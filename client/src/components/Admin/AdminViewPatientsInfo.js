const AdminViewPatientsInfo = ({ patient }) => {
    return (
      <div className="patient-details">
        <h4>{patient.username}</h4>
        <p><strong>Name: </strong>{patient.name}</p>
        <p><strong>Username: </strong>{patient.username}</p>
        <p><strong>Password: </strong>{patient.password}</p>
        <p><strong>Email: </strong>{patient.email}</p>
        <p><strong>Date of Birth: </strong>{patient.dateOfBirth}</p>
        <p><strong>Gender: </strong>{patient.gender}</p>
        <p><strong>Mobile Number: </strong>{patient.mobileNumber}</p>
        <p><strong>Emergency Contact Name: </strong>{patient.emergencyContact?.name}</p>
        <p><strong>Emergency Contact Mobile Number: </strong>{patient.emergencyContact?.mobileNumber}</p>
        <p><strong>Emergency Relation To: </strong>{patient.emergencyContact?.relationTo}</p>
        <p>{patient.timeStamp}</p>
      </div>
    );
  };
  
  export default AdminViewPatientsInfo;
  