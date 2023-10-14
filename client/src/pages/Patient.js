import { Link } from 'react-router-dom';
const Patient = () => {
    return (
        <div className="patient">

            <Link to="/viewAllMedicines" className="registration-button">
                Go to view all medicines/Filter/Search
            </Link>
        </div>
    )
}

export default Patient