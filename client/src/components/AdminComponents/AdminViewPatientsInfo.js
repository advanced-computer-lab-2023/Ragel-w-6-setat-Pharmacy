import React from 'react';


const AdminViewPatientsInfo = ({ patient }) => {

  return (
    <tr>
      <td>{patient.name}</td>
      <td>{patient.username}</td>
      <td>{patient.email}</td>
      <td>{patient.password}</td>
      <td>{patient.dateOfBirth}</td>
      <td>{patient.gender}</td>
      <td>{patient.mobileNumber}</td>
      <td>{patient.emergencyContact?.name}</td>
      <td>{patient.emergencyContact?.mobileNumber}</td>
      <td>{patient.emergencyContact?.relationTo}</td>







      <td className="text-center">
        
      </td>
    </tr>
  );
};


export default AdminViewPatientsInfo;
