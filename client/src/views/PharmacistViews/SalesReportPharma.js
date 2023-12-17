import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Bar } from 'react-chartjs-2';

const SalesReport = () => {
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [salesReport, setSalesReport] = useState(null);

    const handleGenerateReport = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/admin/getTotalSalesReport', {
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

    const years = Array.from({ length: 10 }, (_, index) => new Date().getFullYear() - index);

    const getChartData = () => {
        const labels = salesReport.medicines.map((medicine) => medicine.medicineName);
        const data = salesReport.medicines.map((medicine) => medicine.totalSales);

        return {
            labels,
            datasets: [
                {
                    label: 'Total Sales',
                    backgroundColor: 'rgba(75,192,192,0.2)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                    hoverBorderColor: 'rgba(75,192,192,1)',
                    data,
                },
            ],
        };
    };

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
                        style={{ backgroundColor: "#009688"}}
                        onClick={handleGenerateReport}
                        disabled={isGenerateReportDisabled}
                    >
                        Generate Report
                    </Button>
                </Form>

                {salesReport ? (
                    <div>
                        {salesReport.totalSales !== undefined ? (
                            <div>
                                <Bar
                                    data={getChartData()}
                                    options={{
                                        scales: {
                                            yAxes: [{
                                                ticks: {
                                                    beginAtZero: true,
                                                    stepSize: 1,
                                                },
                                            }],
                                        },
                                    }}
                                />
                                <p>Total Sales: {salesReport.totalSales}</p>
                            </div>
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