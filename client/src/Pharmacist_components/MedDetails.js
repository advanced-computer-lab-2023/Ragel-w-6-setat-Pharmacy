import { Link } from 'react-router-dom'; // If you're using React Router for navigation

const MedDetails = ({ medicine }) => {
    return (
      <div className="Medicine-details">
       
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{medicine.name}</td>
              {/* <td><Link to="/EditMedicine"><button type="submit">Edit</button></Link></td> */}
            </tr>
            <tr>
              <td>Medicine quantity </td>
              <td>{medicine.quantity}</td>
            </tr>
            <tr>
              <td>Medicine Sales </td>
              <td>{medicine.sales}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  
  export default MedDetails;
  