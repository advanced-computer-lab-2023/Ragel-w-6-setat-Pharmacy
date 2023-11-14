import React from 'react';

const AdminViewPharmacistInfo = ({ pharmacist }) => {
  return (
    <tr>
      <td>{pharmacist.name}</td>
      <td>{pharmacist.username}</td>
      <td>{pharmacist.password}</td>
      <td>{pharmacist.email}</td>
      <td>{pharmacist.dateOfBirth}</td>
      <td>{pharmacist.hourlyRate}</td>
      <td>{pharmacist.affiliation}</td>
      <td>{pharmacist.educationalBackground}</td>
      <td>{pharmacist.timeStamp}</td>
     
      <td className="text-center">
       
      </td>
    </tr>
  );
};

export default AdminViewPharmacistInfo;
