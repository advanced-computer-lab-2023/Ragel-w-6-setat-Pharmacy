import React from 'react';


const AdminDetails  = ({ admin }) => {

  return (
    <tr>
      <td>{admin.username}</td>
      <td>{admin.password}</td>

      <td className="text-center">
        
      </td>
    </tr>
  );
};


export default AdminDetails;
