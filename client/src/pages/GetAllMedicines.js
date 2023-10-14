import React, { useEffect, useState } from 'react';
import MedicineDetails from '../components/Medicine/MedicineDetails';
import '../css/GetAllMedicine.css';

const GetAllMedicines = () => {
    const [medicine, setMedicine] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMedicinalUse, setSelectedMedicinalUse] = useState('');

    useEffect(() => {
        const fetchMedicines = async () => {
            const response = await fetch('/api/patient/getAllMedicines');
            const json = await response.json();

            if (response.ok) {
                setMedicine(json);
            }
        };

        fetchMedicines();
    }, []);

    const handleSearch = async () => {
        if (searchTerm.trim() !== '') {
            const response = await fetch(`/api/patient/getMedicineByName?name=${searchTerm}`);
            const json = await response.json();

            if (response.ok) {
                setMedicine(json);
            }
        } else {
            // If the search term is empty, fetch all medicines
            const response = await fetch('/api/patient/getAllMedicines');
            const json = await response.json();

            if (response.ok) {
                setMedicine(json);
            }
        }
    };

    const handleFilter = async () => {
        if (selectedMedicinalUse.trim() === '') {
            const response = await fetch('/api/patient/getAllMedicines');
            const json = await response.json();

            if (response.ok) {
                setMedicine(json);
            }
        } else {
            const filteredMedicines = medicine.filter((med) => {
                if (Array.isArray(med.medicinalUse)) {
                    return med.medicinalUse.some(use => use.trim() === selectedMedicinalUse.trim());
                } else if (typeof med.medicinalUse === 'string') {
                    return med.medicinalUse.trim() === selectedMedicinalUse.trim();
                }
                return false;
            });
            setMedicine(filteredMedicines);
        }
    };

    return (
        <div className="medicine">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search medicine..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="filter-container">
                <select
                    value={selectedMedicinalUse}
                    onChange={(e) => setSelectedMedicinalUse(e.target.value)}
                >
                    <option value="">No filter</option>
                    {medicine &&
                        Array.from(new Set(medicine.flatMap((med) => med.medicinalUse))).map((use) => (
                            <option key={use} value={use}>
                                {use}
                            </option>
                        ))}
                </select>
                <button onClick={handleFilter}>Filter</button>
            </div>

            <div className="medicines">
                {medicine &&
                    medicine.map((medicines) => (
                        <MedicineDetails key={medicines.name} medicines={medicines} />
                    ))}
            </div>
        </div>
    );
};

export default GetAllMedicines;