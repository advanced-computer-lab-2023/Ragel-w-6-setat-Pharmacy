import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const CheckoutForm = ({ isOpen, toggleCreditCardModal, handlePaymentMethodChange }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { token, error } = await stripe.createToken(cardElement);

        if (error) {
            setError(error.message);
        } else {
            handlePaymentMethodChange("creditCard");
            toggleCreditCardModal(false);
        }
    };

    return (
        <Modal isOpen={isOpen} toggle={() => toggleCreditCardModal(false)}>
            <ModalHeader toggle={() => toggleCreditCardModal(false)}>
                Credit Card Payment
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit}>
                    <CardElement />
                    {error && <div className="text-danger">{error}</div>}
                    <Button type="submit" color="primary" className="mt-3">
                        Confirm Payment
                    </Button>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => toggleCreditCardModal(false)}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default CheckoutForm;
