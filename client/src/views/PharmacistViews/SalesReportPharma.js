import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const SalesReport = () => {
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [salesReport, setSalesReport] = useState(null);

    const handleGenerateReport = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/pharmacist/getTotalSalesReport', {
                params: { month, year },
                headers: { 'Content-Type': 'application/json' }
            });

            setSalesReport(response.data);
        } catch (error) {
            console.error('Error fetching sales report:', error);
        }
    };

    const isGenerateReportDisabled = !month || !year;

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const years = Array.from({ length: 10 }, (_, index) => new Date().getFullYear() - index); // Adjust the range as needed

    return (
        <Container>
            <div className="container mt-5">
                <h2 className="mb-4">Sales Report</h2>

                <Form>
                    <FormGroup>
                        <Label for="month">Select Month:</Label>
                        <Input
                            type="select"
                            id="month"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                        >
                            <option value="">Select Month</option>
                            {months.map((m, index) => (
                                <option key={index} value={m}>{m}</option>
                            ))}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="year">Select Year:</Label>
                        <Input
                            type="select"
                            id="year"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        >
                            <option value="">Select Year</option>
                            {years.map((y, index) => (
                                <option key={index} value={y}>{y}</option>
                            ))}
                        </Input>
                    </FormGroup>
                    <Button
                        color="primary"
                        onClick={handleGenerateReport}
                        disabled={isGenerateReportDisabled}
                    >
                        Generate Report
                    </Button>
                </Form>

                {salesReport ? (
                    <div>
                        {salesReport.totalSales !== undefined ? (
                            <>
                                <h3>Total Sales: {salesReport.totalSales}</h3>
                                <ul className="list-group mt-4">
                                    {salesReport.medicines.map((medicine, index) => (
                                        <li key={index} className="list-group-item">
                                            {medicine.medicineName} - Total Sales: {medicine.totalSales}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <p>No sales found for the specified month.</p>
                        )}
                    </div>
                ) : (
                    <p>No sales report available. Please generate a report.</p>
                )}
            </div>
        </Container>
    );
};

export default SalesReport;