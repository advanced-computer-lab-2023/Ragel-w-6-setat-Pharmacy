import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MedicineSales = () => {
    const [medicines, setMedicine] = useState(null);

    useEffect(() => {
        const fetchMedicine = async () => {
            const response = await fetch('/api/pharmacist/getQuantityAndSalesOfMedicine');
            const json = await response.json();
            if (response.ok) {
                setMedicine(json);
            }
        };
        fetchMedicine();
    }, []);

    return (
        <div className="container mt-5">
            <h2>Medicine Details</h2>
            <div className="row">
                {medicines &&
                    medicines.map((medicine) => (
                        <div key={medicine.id} className="col-md-6 mb-4">
                            <MedDetails2 medicine={medicine} />
                        </div>
                    ))}
            </div>
        </div>
    );
};

const MedDetails2 = ({ medicine }) => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{medicine.name}</h5>
                <table className="table">
                    <tbody>
                        <tr>
                            <td>Medicine Quantity:</td>
                            <td>{medicine.quantity}</td>
                        </tr>
                        <tr>
                            <td>Medicine Sales:</td>
                            <td>{medicine.sales}</td>
                        </tr>
                    </tbody>
                </table>
               
            </div>
        </div>
    );
};

export default MedicineSales;
