import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../components/Headers/AdminHeader';
import { Container, Table, Button } from 'reactstrap';
import { UserContext } from '../../contexts/UserContext';

const Cart = ({}) => {
  const { user } = useContext(UserContext);
  const [cart, setCart] = useState(null);
  const [quantityChanges, setQuantityChanges] = useState({}); // State to track quantity changes for each item
  const patientId = user._id;
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cart details when the component mounts
    const fetchCart = async () => {
      try {
        const response = await axios.get(`/api/patient/checkoutOrder/${patientId}`);
        console.log('Cart Response:', response.data);
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []);

  const removeFromCart = async (medicineId) => {
    try {
      await axios.delete(`/api/patient/removeFromCart/${patientId}/${medicineId}`);
      // Refresh cart after removing an item
      const response = await axios.get(`/api/patient/checkoutOrder/${patientId}`);
      setCart(response.data);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const handleQuantityChange = (itemMedicineId, newQuantityChange) => {
    setQuantityChanges((prevChanges) => ({
      ...prevChanges,
      [itemMedicineId]: newQuantityChange,
    }));
  };

  const updateQuantity = async (medicineId) => {
    try {
      const change = quantityChanges[medicineId] || 0;
      console.log('Updating quantity:', change);

      await axios.patch(`/api/patient/changeQuantityInCart/${patientId}/${medicineId}`, {
        quantityChange: change,
      });

      // Reset the quantity change state for this item
      setQuantityChanges((prevChanges) => ({
        ...prevChanges,
        [medicineId]: undefined,
      }));

      // Refresh cart after updating quantity
      const response = await axios.get(`/api/patient/checkoutOrder/${patientId}`);
      setCart(response.data);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  return (
    <>
      <AdminHeader />
      {/* Page content */}
      <Container>
        <div className="container mt-5">
          <h2 className="mb-4"> My Cart</h2>

          {cart ? (
            <div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Update Item</th>
                    <th>remove Item</th>
                  </tr>
                </thead>
                <tbody>
                  {cart && cart.cartItems ? (
                    cart.cartItems.map((item, index) => (
                      <tr key={index}>
                        <td>
                          {item.medicine.name}
                        </td>
                        <td>
                         {item.quantity}
                        </td>
                        <td>
                          ${item.price}
                        </td>
                        <td>
                            <div className="d-flex align-items-center">
                              <input
                                type="number"
                                value={quantityChanges[item.medicine._id] || 0}
                                onChange={(e) => handleQuantityChange(item.medicine._id, parseInt(e.target.value))}
                                className="form-control mr-2"
                                style={{ width: "70px" }}
                              />
                              <button
                                className="btn btn-success"
                                style={{ background: "#009688" }}
                                onClick={() => updateQuantity(item.medicine._id)}
                              >
                                Update
                              </button>
                            </div>
                          </td>
                    <td>
                           <button className="btn btn-danger mr-2"
                           style={{background:"#C41E3A"}} onClick={() => removeFromCart(item.medicine._id)}>
                      Remove
                    </button>
                    </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">No items in the cart</td>
                    </tr>
                  )}
                </tbody>
              </Table>
              <div className="text-right">
                <h3>Total Quantity: {cart.totalQty}</h3>
                <h3>Total Cost: ${cart.totalCost.toFixed(1)}</h3>
                <Button  style={{ background: "#009688" }} onClick={() => navigate('/patient/checkout')}>
                  Checkout
                </Button>
              </div>
            </div>
          ) : (
            <p>Loading cart...</p>
          )}
        </div>
        
      </Container>
    </>
  );
};

export default Cart;
