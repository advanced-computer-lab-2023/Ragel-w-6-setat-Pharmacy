import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const [cartData, setCartData] = useState(null);
    const [addresses, setAddresses] = useState([]);
   // const [quantity, setQuanity] = useState(null);

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

    const patientId='654beffcf9d0ca04d098b0e3'

    const handleCheckout = async () => {
        try {
            const response = await fetch(
                "/api/patient/checkoutOrder/654beffcf9d0ca04d098b0e3"
            );
            const data = await response.json();
            setCartData(data);
        } catch (error) {
            console.error("Error during checkout:", error);
        }
    };

    const getAddresses = async () => {
        try {
            const response = await fetch(
                "/api/patient/getPatientAddresses/654beffcf9d0ca04d098b0e3"
            );
            const data = await response.json();
            setAddresses(data.addresses);
        } catch (error) {
            console.error("Error fetching addresses:", error);
        }
    };

    const getWalletBalance = async () => {
        try {
            const response = await fetch(
                "/api/patient/getWalletBalance/654beffcf9d0ca04d098b0e3"
            );
            const data = await response.json();
            setWalletBalance(data.walletBalance);
        } catch (error) {
            console.error("Error fetching wallet balance:", error);
        }
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
            const response = await fetch(
                "/api/patient/addAddressToPatient/654beffcf9d0ca04d098b0e3",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ addresses: [newAddress] }), // Send the new address as an array
                }
            );

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
            if (
                !selectedPaymentMethod ||
                !selectedAddress ||
                cartData.cartItems.length === 0
            ) {
                console.error(
                    "Please select both address and payment method, and ensure the cart is not empty"
                );
                return;
            }

            const response = await fetch(
                `/api/patient/processPayment/654beffcf9d0ca04d098b0e3`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        paymentType: selectedPaymentMethod,
                        paymentAmount: cartData.totalCost,
                    }),
                }
            );

            if (response.ok) {
                const data = await response.json();
                setCartData(data);

                navigate("/patient/orders");
            } else if (response.status === 400) {
                const errorData = await response.json();
                alert(errorData.error); // Display an alert with the error message
            } else {
                console.error("Error during checkout:", response.statusText);
            }

            const data = await response.json();
        } catch (error) {
            console.error("Error confirming order:", error);
        }
    };

    // const handleChangeQuantity = async (itemId, newQuantity) => {
    //     try {
    //       const response = await fetch(`/api/patient/changeQuantityInCart/${patientId}/${itemId}`, {
    //         method: 'PUT',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ quantityChange: newQuantity }),
    //       });
      
    //       if (response.ok) {
    //         const data = await response.json();
    //         cartData.quantity=data.quantity
    //         setCartData(data.quantity);
    //         // Update the state in your frontend based on the response data
    //         // Your logic to update the state based on the response data goes here
    //       } else if (response.status === 400) {
    //         const errorData = await response.json();
    //         // Handle the error response accordingly
    //         console.error('Error:', errorData.message);
    //       } else {
    //         console.error('Error changing quantity:', response.statusText);
    //       }
    //     } catch (error) {
    //       console.error('Error changing quantity:', error.message);
    //     }
    //   };
      
    
    
    // const handleRemoveFromCart = async (medicineId) => {
    //     try {
    //         const response = await fetch(`/api/patient/removeFromCart/${patientId}/${medicineId}`, {
    //             method: 'DELETE',
    //         });
    
    //         if (response.ok) {
    //             const data = await response.json();
    //             setCartData(data);
    //         } else if (response.status === 404) {
    //             const errorData = await response.json();
    //             alert(errorData.message);
    //         } else {
    //             console.error('Error removing item from the cart:', response.statusText);
    //         }
    //     } catch (error) {
    //         console.error('Error removing item from the cart:', error);
    //     }
    // };
    
    useEffect(() => {
        handleCheckout();
        getAddresses();
        getWalletBalance();
        setConfirmOrderDisabled(
            !selectedPaymentMethod ||
            !selectedAddress ||
            (cartData && cartData.cartItems && cartData.cartItems.length === 0)
        );
    }, [selectedPaymentMethod, selectedAddress, cartData]);

    return (
        <>
            <AdminHeader />
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
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
                                                    {item.quantity} x {item.medicine.name} - ${item.total}
                                                 
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
                                {addresses && addresses.length > 0 && (
                                    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                                        <DropdownToggle caret>
                                            {selectedAddress
                                                ? `Deliver to: ${selectedAddress.street}, ${selectedAddress.city}`
                                                : "Select Delivery Address"}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {addresses.map((address, index) => (
                                                <DropdownItem
                                                    key={index}
                                                    onClick={() => handleAddressSelect(address)}
                                                >
                                                    {`${address.street}, ${address.city}`}
                                                </DropdownItem>
                                            ))}
                                            <DropdownItem divider />
                                            <DropdownItem onClick={toggleModal}>
                                                Add New Address
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                )}

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
            <div style={{ position: 'fixed', top: '10%', right: '5%', padding: '20px', backgroundColor: '#3498db', color: '#fff', textAlign: 'center', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <h4 style={{ margin: 0, marginBottom: '10px' }}>Wallet Balance</h4>
                <p style={{ fontSize: '1.5em', fontWeight: 'bold' }}>${walletBalance.toFixed(2)}</p>
            </div>
        </>
    );
};

export default Checkout;