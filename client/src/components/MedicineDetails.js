

const MedicineDetails = ({ medicines }) => {
    return (
        <div className="medicine-details">
            <p>
                <strong>Name: </strong>
                {medicines.name}
            </p>
            <p>
                <strong>Price: </strong>
                {medicines.price}
            </p>
            <p>
                <strong>Description: </strong>
                {medicines.description}
            </p>
            <div>
                <strong>Image: </strong>
                {medicines.image && <img src={`data:image/png;base64,${medicines.image}`} alt={medicines.name} />}

            </div>
        </div>

    );
};

export default MedicineDetails

// const MedicineDetails = ({ medicines }) => {
//     return (
//         <div className="medicine-table">
//             <table>
//                 <tbody>
//                     <tr>
//                         <td>{medicines.name}</td>
//                         <td>{medicines.price}</td>
//                         <td>{medicines.description}</td>
//                     </tr>
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default MedicineDetails