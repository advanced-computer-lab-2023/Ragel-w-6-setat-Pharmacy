import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Bar } from 'react-chartjs-2';
import AdminHeader from '../../components/Headers/AdminHeader';

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

    const chartData = {
        labels: medicines ? medicines.map(medicine => medicine.name) : [],
        datasets: [
            {
                label: 'Medicine Sales',
                data: medicines ? medicines.map(medicine => medicine.sales) : [],
                backgroundColor: 'rgba(75,192,192,0.6)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Medicine Name',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Sales Quantity',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <>
            <AdminHeader />
            <Container className="mt-5">
                <h2 className="mb-4">Medicine Sales</h2>
                <Row>
                    <Col md="12">
                        <div className="card">
                            <div className="card-body">
                                <Bar
                                    data={chartData}
                                    options={chartOptions}
                                    height={400}
                                    width={600}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default MedicineSales;
