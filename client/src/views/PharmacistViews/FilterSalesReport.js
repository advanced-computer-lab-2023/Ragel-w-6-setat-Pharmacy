import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const FilterSalesReport = () => {
    const [medicineName, setMedicineName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filteredMedicines, setFilteredMedicines] = useState(null);
    const [allMedicines, setAllMedicines] = useState([]);

    useEffect(() => {
        const fetchAllMedicines = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/pharmacist/getAllMedicines');
                setAllMedicines(response.data);
            } catch (error) {
                console.error('Error fetching all medicines:', error);
            }
        };

        fetchAllMedicines(); // Call the function to fetch all medicines
    }, []); // The empty dependency array ensures this runs only once when the component mounts

    const handleFilterMedicines = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/pharmacist/getFilteredSalesReport', {
                params: {
                    medicine: medicineName,
                    startDate,
                    endDate,
                },
            });

            setFilteredMedicines(response.data.sales);
        } catch (error) {
            console.error('Error filtering medicines:', error);
        }
    };

    const handleClearFilter = () => {
        setMedicineName('');
        setStartDate('');
        setEndDate('');
        setFilteredMedicines(null);
    };

    return (
        <Container>
            <div className="container mt-5">
                <h2 className="mb-4">Medicine Filter</h2>

                <Form>
                    <FormGroup>
                        <Label for="medicineName">Medicine Name:</Label>
                        <Input
                            type="select"
                            id="medicineName"
                            value={medicineName}
                            onChange={(e) => setMedicineName(e.target.value)}
                        >
                            <option value="">Select Medicine</option>
                            {allMedicines.map((medicine, index) => (
                                <option key={index} value={medicine.name}>{medicine.name}</option>
                            ))}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="startDate">Start Date:</Label>
                        <Input
                            type="date"
                            id="startDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="endDate">End Date:</Label>
                        <Input
                            type="date"
                            id="endDate"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </FormGroup>
                    <div className="mb-3">
                        <Button color="primary"   style={{ backgroundColor: "#009688"}}
                        onClick={handleFilterMedicines}>Filter Medicines</Button>{' '}
                        <Button color="secondary" 
                        
                        onClick={handleClearFilter}>Clear Filter</Button>
                    </div>
                </Form>

                {filteredMedicines ? (
                    <div>
                        <h3>Filtered Medicines</h3>
                        <ul className="list-group mt-4">
                            {filteredMedicines.map((medicine, index) => (
                                <li key={index} className="list-group-item">
                                    {medicine.medicineName} - Total Sales: {medicine.totalSales}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>No filtered medicines. Please apply a filter.</p>
                )}
            </div>
        </Container>
    );
};

export default FilterSalesReport;