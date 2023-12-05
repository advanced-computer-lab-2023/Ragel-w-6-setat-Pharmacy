import React, { useState, useEffect, useContext } from 'react';

import axios from 'axios';
import { useNavigate } from "react-router-dom";
import AdminHeader from '../../components/Headers/AdminHeader';
import { Container } from 'reactstrap';

import { UserContext } from "../../contexts/UserContext";
const Cart = ({ }) => {
  const { user } = useContext(UserContext);
  const [cart, setCart] = useState(null);
  const [medicineId, setMedicineId] = useState('');
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

      await axios.patch(`/api/patient/changeQuantityInCart/${patientId}/${medicineId}`, { quantityChange: change });

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
          <h2 className="mb-4">Cart</h2>

          {cart ? (
            <div>
              <div className="row">
                <div className="col-md-6">
                  <h3>Total Quantity: {cart.totalQty}</h3>
                  <h3>Total Cost: {cart.totalCost}</h3>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/patient/checkout")}
                  >
                    Checkout
                  </button>
                </div>
              </div>
              <ul className="list-group mt-4">
                {cart && cart.cartItems ? (
                  cart.cartItems.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      {item.quantity} x {item.medicine.name} - ${item.price}

                      <button className="btn btn-danger mr-2" onClick={() => removeFromCart(item.medicine._id)}>
                        Remove
                      </button>
                      <input
                        type="number"
                        value={quantityChanges[item.medicine._id] || 0}
                        onChange={(e) => handleQuantityChange(item.medicine._id, parseInt(e.target.value))}
                        className="form-control d-inline-block mr-2"
                      />
                      <button
                        className="btn btn-primary"
                        onClick={() => updateQuantity(item.medicine._id)}
                      >
                        Update Quantity
                      </button>

                    </li>
                  ))
                ) : (
                  <p>No items in the cart</p>
                )}
              </ul>
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