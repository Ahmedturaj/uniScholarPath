import PropTypes from 'prop-types';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";


const CheckoutForm = ({ totalFees, paymentData }) => {
    const { _id } = paymentData
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const stripe = useStripe();
    const navigate = useNavigate();
    const elements = useElements();
    useEffect(() => {
        if (totalFees > 0) {
            const loader = async () => {
                const { data } = await axiosSecure.post('/create-payment-intent', { price: totalFees })
                console.log(data.clientSecret);
                setClientSecret(data.clientSecret)
            }
            loader();
        }
    }, [axiosSecure, totalFees])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement)
        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log('[error]', error);
            toast.error(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            toast.success('Payment successfully')
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || 'anonymous',
                    email: user?.email || 'anonymous@gmail.com'
                },
            }
        })
        if (confirmError) {
            toast.error(confirmError.message)
        } else {
            if (paymentIntent.status === "succeeded") {
                setTransactionId(paymentIntent.id)
                navigate(`/scholarship-application/${_id}`);
            }
        }
    }
    return (
        <div className="my-14 w-11/12 mx-auto border-t-2 rounded-es-xl rounded-se-xl border-blue-500 border-b-2 py-3 text-center  font-extrabold text-blue-500 bg-black bg-opacity-50 p-8">
            <form className="p-4" onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: 'blue',
                                '::placeholder': {
                                    color: 'white',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />

                <button className="btn my-5 btn-primary" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                <p className='text-2xl text-blue-400 text-center'>{transactionId}</p>
            </form>
        </div>
    );
};

CheckoutForm.propTypes = {
    totalFees: PropTypes.number,
    paymentData: PropTypes.object
};

export default CheckoutForm;