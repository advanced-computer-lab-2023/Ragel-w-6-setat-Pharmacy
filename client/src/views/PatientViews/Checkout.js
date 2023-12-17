    import React, { useEffect, useState, useContext } from "react";
    import {
        Badge,
        Button,
        Card,
        CardHeader,
        CardBody,
        CardTitle,
        CardText,
        Dropdown,
        DropdownToggle,
        DropdownMenu,
        DropdownItem,
        Container,
        Row,
        Modal,
        ModalHeader,
        ModalBody,
        ModalFooter,
        Form,
        FormGroup,
        Label,
        Input,
    } from "reactstrap";

    import AdminHeader from "components/Headers/AdminHeader.js";
    import Timeline from "components/PatientComponents/TimeLine.js";
    import { useNavigate } from "react-router-dom";
    import { UserContext } from "../../contexts/UserContext";

    const Checkout = () => {
        const { user } = useContext(UserContext);

        const [cartData, setCartData] = useState(null);
        const [addresses, setAddresses] = useState([]);
        const [selectedAddress, setSelectedAddress] = useState(null);
        const [dropdownOpen, setDropdownOpen] = useState(false);
        const [modalOpen, setModalOpen] = useState(false);
        const [newAddress, setNewAddress] = useState({
            street: "",
            city: "",
            buildingNumber: "",
            apartmentNumber: "",
        });
        const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
        const [paymentDropdownOpen, setPaymentDropdownOpen] = useState(false);
        const [confirmOrderDisabled, setConfirmOrderDisabled] = useState(true);
        const [walletBalance, setWalletBalance] = useState(0);

        const navigate = useNavigate();
        const patientId = user._id;

        const handleCheckout = async () => {
            try {
                const response = await fetch(`/api/patient/checkoutOrder/${patientId}`);
                const data = await response.json();
                setCartData(data);
            } catch (error) {
                console.error("Error during checkout:", error);
            }
        };

        const getAddresses = async () => {
            try {
                const response = await fetch(`/api/patient/getPatientAddresses/${patientId}`);
                const data = await response.json();
                setAddresses(data.addresses);
            } catch (error) {
                console.error("Error fetching addresses:", error);
            }
        };

        const getWalletBalance = async () => {
            try {
                const response = await fetch(`/api/patient/getWalletBalance/${patientId}`);
                if (response.ok) {
                    const data = await response.json();
                    return data.walletBalance;
                } else {
                    console.error("Error fetching wallet balance:", response.statusText);
                    return 0; // Return a default value in case of an error
                }
            } catch (error) {
                console.error("Error fetching wallet balance:", error);
                return 0; // Return a default value in case of an error
            }
        };

        const saveWalletBalanceToLocalStorage = (balance) => {
            localStorage.setItem("walletBalance", balance);
        };

        const getWalletBalanceFromLocalStorage = () => {
            const balance = localStorage.getItem("walletBalance");
            return balance ? parseFloat(balance) : 0;
        };

        const toggleDropdown = () => {
            setDropdownOpen(!dropdownOpen);
        };

        const handleAddressSelect = (address) => {
            setSelectedAddress(address);
            setDropdownOpen(false);
        };

        const toggleModal = () => {
            setModalOpen(!modalOpen);
        };

        const handleNewAddressChange = (e) => {
            const { name, value } = e.target;
            setNewAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
        };

        const handleAddAddress = async () => {
            try {
                const response = await fetch(`/api/patient/addAddressToPatient/${patientId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ addresses: [newAddress] }),
                });

                const data = await response.json();
                console.log("Response from backend:", data);

                setAddresses(data.addresses);
                setNewAddress({
                    street: "",
                    city: "",
                    buildingNumber: "",
                    apartmentNumber: "",
                });
                toggleModal();
            } catch (error) {
                console.error("Error adding new address:", error);
            }
        };

        const togglePaymentDropdown = () => {
            setPaymentDropdownOpen(!paymentDropdownOpen);
        };

        const handleConfirmOrder = async () => {
            try {
                if (!selectedPaymentMethod || !selectedAddress || cartData.cartItems.length === 0) {
                    console.error("Please select both address and payment method, and ensure the cart is not empty");
                    return;
                }

                // Extracting relevant information from cartData
                const items = cartData.cartItems.map(item => ({
                    name: item.medicine.name,
                    price: item.medicine.price,
                    quantity: item.quantity
                }));

                const paymentData = {
                    paymentType: selectedPaymentMethod,
                    items: items,
                    paymentMethodId: 'pm_card_visa'
                };

                const response = await fetch(`/api/patient/processPayment/${patientId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(paymentData),
                });

                if (selectedPaymentMethod === 'creditCard') {
                    if (response.ok) {
                        const data = await response.json();
                        // Redirect to Stripe Checkout
                        window.location.href = data.url; // Make sure `data.url` is the correct property containing the Stripe Checkout URL
                    } else {
                        const errorData = await response.json();
                        console.error("Error during credit card payment:", errorData);
                        alert(errorData.error); // Display an alert with the error message
                    }
                } else {
                    if (response.ok) {
                        const data = await response.json();
                        setCartData(data);
                        navigate("/patient/orders");

                        // Update the wallet balance after successful order
                        const updatedBalance = await getWalletBalance();
                        if (!isNaN(updatedBalance)) {
                            setWalletBalance(updatedBalance);
                            saveWalletBalanceToLocalStorage(updatedBalance);
                        } else {
                            console.error("Invalid wallet balance received:", updatedBalance);
                        }
                    } else if (response.status === 400) {
                        const errorData = await response.json();
                        console.error("Error during checkout:", errorData);
                        alert(errorData.error); // Display an alert with the error message
                    } else {
                        console.error("Error during checkout:", response.statusText);
                    }
                }
            } catch (error) {
                console.error("Error confirming order:", error);
            }
        };

        useEffect(() => {
            // Get wallet balance from local storage
            const savedBalance = getWalletBalanceFromLocalStorage();
            setWalletBalance(savedBalance);

            handleCheckout();
            getAddresses();


            // Set the wallet balance in local storage after fetching it from the API
            getWalletBalance().then((balance) => {
                setWalletBalance(balance);
                saveWalletBalanceToLocalStorage(balance);
            });

            setConfirmOrderDisabled(
                !selectedPaymentMethod ||
                !selectedAddress ||
                (cartData && cartData.cartItems && cartData.cartItems.length === 0)
            );
        }, [selectedPaymentMethod, selectedAddress, cartData]);

        return (
            <>
                <AdminHeader />
                <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '65vh' }}>
                    <Container fluid>
                    <Timeline />
                        <Row>
                     
                            {/* Cart Details */}
                            <div className="col-md-4">
                                <Card className="shadow">
                                    {/* <CardHeader className="border-0">
                                        <h3 className="mb-0">Cart Information</h3>
                                    </CardHeader> */}
                                    <CardBody>
                                        {cartData ? (
                                            <>
                                                <CardTitle tag="h5">
                                                    Total Quantity: {cartData.totalQty}
                                                </CardTitle>
                                                <CardTitle tag="h5">
                                                    Total Cost: {cartData.totalCost}
                                                </CardTitle>
                                                <CardText>
                                                    <strong>Items:</strong>
                                                    <ul>
                                                        {cartData && cartData.cartItems ? (
                                                            cartData.cartItems.map((item, index) => (
                                                                <li key={index}>
                                                                    {item.quantity} x {item.medicine ? item.medicine.name : 'Unknown Medicine'} - ${item.total}
                                                                </li>
                                                            ))
                                                        ) : (
                                                            <li>No items in the cart</li>
                                                        )}
                                                    </ul>
                                                </CardText>
                                            </>
                                        ) : (
                                            <p>Loading cart data...</p>
                                        )}
                                    </CardBody>
                                </Card>
                            </div>
        
                            {/* Delivery Address */}
                            <div className="col-md-4">
                                <Card className="shadow">
                                    {/* <CardHeader className="border-0">
                                        <h3 className="mb-0">Delivery Address</h3>
                                    </CardHeader> */}
                                    <CardBody>
                                        <h6>Please select a delivery address:</h6>
                                        {addresses && addresses.length > 0 && (
                                            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} >
                                                <DropdownToggle style={{ backgroundColor: "#009688" }}>
                                                    {selectedAddress
                                                        ? `Deliver to: ${selectedAddress.street}, ${selectedAddress.city}`
                                                        : "Select Delivery Address"}
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    {addresses && addresses.length > 0 && (
                                                        <>
                                                            {addresses.map((address, index) => (
                                                                <DropdownItem
                                                                    key={index}
                                                                    onClick={() => handleAddressSelect(address)}
                                                                    
                                                                >
                                                                    {`${address.street}, ${address.city}`}
                                                                </DropdownItem>
                                                            ))}
                                                            <DropdownItem divider />
                                                        </>
                                                    )}
                                                    <DropdownItem onClick={toggleModal}>
                                                        Add New Address
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        )}
                                    </CardBody>
                                </Card>
                            </div>
        
                            {/* Payment Method */}
                            <div className="col-md-4">
                                <Card className="shadow">
                                    {/* <CardHeader className="border-0">
                                        <h3 className="mb-0">Payment Method</h3>
                                    </CardHeader> */}
                                    <CardBody>
                                        {/* Payment dropdown */}
                                        <h6>My Wallet:</h6>
                                        <h7>Balance: ${walletBalance}</h7>
                                        <h6>Please select a payment method:</h6>
                                        <Dropdown
                                            isOpen={paymentDropdownOpen}
                                            toggle={togglePaymentDropdown}
                                          
                                        >
                                            <DropdownToggle style={{ backgroundColor: "#009688" }} >
                                                {selectedPaymentMethod
                                                    ? `Pay with: ${selectedPaymentMethod}`
                                                    : "Select Payment Method"}
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem onClick={() => setSelectedPaymentMethod("wallet")}>
                                                    Wallet
                                                </DropdownItem>
                                                <DropdownItem onClick={() => setSelectedPaymentMethod("creditCard")}>
                                                    Credit Card
                                                </DropdownItem>
                                                <DropdownItem onClick={() => setSelectedPaymentMethod("cashOnDelivery")}>
                                                    Cash On Delivery
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
        
                                        {/* Confirm Order button */}
                                       
                                    </CardBody>
                             </Card>
                                <Row className="justify-content-end mt-4">
                                    <div className="col-md-6 text-right">
                                        <Button
                                            color="success"
                                            onClick={handleConfirmOrder}
                                            disabled={confirmOrderDisabled}
                                            style={{ backgroundColor: "#009688" }}
                                        >
                                            Confirm Order
                                        </Button>
                                    </div>
                                </Row>
                            </div>
                        </Row>
                    </Container>
        
                    {/* Add New Address Modal */}
                    <Modal isOpen={modalOpen} toggle={toggleModal}>
                        <ModalHeader toggle={toggleModal}>Add New Address</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for="street">Street</Label>
                                    <Input
                                        type="text"
                                        name="street"
                                        id="street"
                                        value={newAddress.street}
                                        onChange={handleNewAddressChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="city">City</Label>
                                    <Input
                                        type="text"
                                        name="city"
                                        id="city"
                                        value={newAddress.city}
                                        onChange={handleNewAddressChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="buildingNumber">Building Number</Label>
                                    <Input
                                        type="text"
                                        name="buildingNumber"
                                        id="buildingNumber"
                                        value={newAddress.buildingNumber}
                                        onChange={handleNewAddressChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="apartmentNumber">Apartment Number</Label>
                                    <Input
                                        type="text"
                                        name="apartmentNumber"
                                        id="apartmentNumber"
                                        value={newAddress.apartmentNumber}
                                        onChange={handleNewAddressChange}
                                    />
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button 
                            style={{ backgroundColor: "#009688" }}
                            onClick={handleAddAddress}>
                                Add Address
                            </Button>{" "}
                            <Button                   
                             style={{background:"#C41E3A"}}
                             onClick={toggleModal}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
        
                    {/* Display wallet balance on the right side */}
                
                </div>
            </>
        );
    };
=======
        // Set the wallet balance in local storage after fetching it from the API
        getWalletBalance().then((balance) => {
            setWalletBalance(balance);
            saveWalletBalanceToLocalStorage(balance);
        });

        setConfirmOrderDisabled(
            !selectedPaymentMethod ||
            !selectedAddress ||
            (cartData && cartData.cartItems && cartData.cartItems.length === 0)
        );
    }, [selectedPaymentMethod, selectedAddress, cartData]);

    return (
        <>
            <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>

                <Container className="mt--7" fluid>
                    <Row>
                        <div className="col-md-8">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <h3 className="mb-0">Cart Information</h3>
                                </CardHeader>
                                <CardBody>
                                    {cartData ? (
                                        <>
                                            <CardTitle tag="h5">
                                                Total Quantity: {cartData.totalQty}
                                            </CardTitle>
                                            <CardTitle tag="h5">
                                                Total Cost: {cartData.totalCost}
                                            </CardTitle>
                                            <CardText>
                                                <strong>Items:</strong>
                                                <ul>
                                                    {cartData && cartData.cartItems ? (
                                                        cartData.cartItems.map((item, index) => (
                                                            <li key={index}>
                                                                {item.quantity} x {item.medicine ? item.medicine.name : 'Unknown Medicine'} - ${item.total}
                                                            </li>
                                                        ))
                                                    ) : (
                                                        <li>No items in the cart</li>
                                                    )}
                                                </ul>
                                            </CardText>

                                        </>
                                    ) : (
                                        <p>Loading cart data...</p>
                                    )}
                                    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                                        <DropdownToggle caret>
                                            {selectedAddress
                                                ? `Deliver to: ${selectedAddress.street}, ${selectedAddress.city}`
                                                : "Select Delivery Address"}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {addresses && addresses.length > 0 && (
                                                <>
                                                    {addresses.map((address, index) => (
                                                        <DropdownItem
                                                            key={index}
                                                            onClick={() => handleAddressSelect(address)}
                                                        >
                                                            {`${address.street}, ${address.city}`}
                                                        </DropdownItem>
                                                    ))}
                                                    <DropdownItem divider />
                                                </>
                                            )}
                                            <DropdownItem onClick={toggleModal}>
                                                Add New Address
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>


                                    {/* Payment dropdown */}
                                    <Dropdown
                                        isOpen={paymentDropdownOpen}
                                        toggle={togglePaymentDropdown}
                                    >
                                        <DropdownToggle caret>
                                            {selectedPaymentMethod
                                                ? `Pay with: ${selectedPaymentMethod}`
                                                : "Select Payment Method"}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem onClick={() => setSelectedPaymentMethod("wallet")}>
                                                Wallet
                                            </DropdownItem>
                                            <DropdownItem onClick={() => setSelectedPaymentMethod("creditCard")}>
                                                Credit Card
                                            </DropdownItem>
                                            <DropdownItem onClick={() => setSelectedPaymentMethod("cashOnDelivery")}>
                                                Cash On Delivery
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>

                                    {/* Confirm Order button */}
                                    <Button
                                        color="success"
                                        onClick={handleConfirmOrder}
                                        disabled={confirmOrderDisabled}
                                    >
                                        Confirm Order
                                    </Button>
                                </CardBody>
                            </Card>
                        </div>
                    </Row>
                </Container>

                {/* Add New Address Modal */}
                <Modal isOpen={modalOpen} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal}>Add New Address</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="street">Street</Label>
                                <Input
                                    type="text"
                                    name="street"
                                    id="street"
                                    value={newAddress.street}
                                    onChange={handleNewAddressChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="city">City</Label>
                                <Input
                                    type="text"
                                    name="city"
                                    id="city"
                                    value={newAddress.city}
                                    onChange={handleNewAddressChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="buildingNumber">Building Number</Label>
                                <Input
                                    type="text"
                                    name="buildingNumber"
                                    id="buildingNumber"
                                    value={newAddress.buildingNumber}
                                    onChange={handleNewAddressChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="apartmentNumber">Apartment Number</Label>
                                <Input
                                    type="text"
                                    name="apartmentNumber"
                                    id="apartmentNumber"
                                    value={newAddress.apartmentNumber}
                                    onChange={handleNewAddressChange}
                                />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={handleAddAddress}>
                            Add Address
                        </Button>{" "}
                        <Button color="secondary" onClick={toggleModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
                {/* Display wallet balance on the right side */}
                <div style={{ position: 'fixed', top: '15%', right: '10%', padding: '20px', backgroundColor: '#009688', color: '#fff', textAlign: 'center', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                    <h4 style={{ margin: 0, marginBottom: '10px', color: '#fff' }}>Wallet Balance</h4>
                    <p style={{ fontSize: '1.5em', fontWeight: 'bold' }}>${walletBalance}</p>
                </div>
            </div>
        </>
    );
};


    export default Checkout;