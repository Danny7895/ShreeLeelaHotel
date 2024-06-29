import React, { useState, useEffect } from 'react';
import Grid from "@material-ui/core/Grid";
import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { totalPrice } from '../../utils';
import './style.scss';

const CheckWrap = ({ cartList, handlePayment }) => {
    const navigate = useNavigate();

    const [value, setValue] = useState({
        email: 'user@gmail.com',
        password: '123456',
        card_holder: 'Shree Leela Card',
        card_number: '589622144123',
        cvv: '123',
        expire_date: '',
        remember: false,
    });

    useEffect(() => {
        // Set expire date to the next day
        const nextDay = new Date();
        nextDay.setDate(nextDay.getDate() + 1);
        const formattedNextDay = nextDay.toISOString().split('T')[0]; // Format as YYYY-MM-DD
        setValue((prevData) => ({
            ...prevData,
            expire_date: formattedNextDay,
        }));
    }, []);

    const [validator] = useState(new SimpleReactValidator({
        className: 'errorMessage'
    }));

    const changeHandler = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
        validator.showMessages();
    };

    const submitForm = async (e) => {
        e.preventDefault();
        handlePayment();

        if (cartList.length === 0) {
            toast.error('Cart is empty.');
            return;
        }

        const total_price = (0.12 * totalPrice(cartList) + totalPrice(cartList)) * 100;

        const payload = {
            amount: total_price, // Amount in paise
            currency: 'INR',
            receipt: 'order_rcptid_11',
            notes: {
                address: '123, example street',
                country: 'India',
            },
        };

        if (validator.allValid()) {
            try {
                const response = await axios.post('http://localhost:8080/api/checkout', payload, { withCredentials: true });

                if (response.data.success) {
                    const options = {
                        key: 'rzp_test_psYceEdF2V0TcX', // Replace with your Razorpay API Key
                        amount: response.data.order.amount,
                        currency: response.data.order.currency,
                        name: 'Shree Leela Hotel',
                        description: 'Payment for booking',
                        order_id: response.data.order.id,
                        handler: function (response) {
                            toast.success('Payment successful');
                            navigate('/order_received', {
                                state: {
                                    razorpayPaymentId: response.razorpay_payment_id,
                                    razorpayOrderId: response.razorpay_order_id,
                                    razorpaySignature: response.razorpay_signature,
                                },
                            });
                        },
                        prefill: {
                            name: 'John Doe',
                            email: 'john.doe@example.com',
                            contact: '+919876543210',
                        },
                        theme: {
                            color: '#F37254',
                        },
                    };

                    const rzp = new window.Razorpay(options);
                    rzp.open();
                } else {
                    toast.error('Error creating order');
                }
            } catch (error) {
               
                toast.error('Failed to process payment');
            }
        } else {
            validator.showMessages();
            toast.error('Empty field is not allowed!');
        }
    };

    return (
        <Grid className="cardbp mt-20">
            <Grid>
                <form onSubmit={submitForm}>
                    <Grid container spacing={3}>
                        <Grid item sm={6} xs={12}>
                            <TextField
                                fullWidth
                                label="Card holder Name"
                                name="card_holder"
                                value={value.card_holder}
                                onChange={changeHandler}
                                type="text"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                className="formInput radiusNone"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <TextField
                                fullWidth
                                label="Card Number"
                                name="card_number"
                                value={value.card_number}
                                onChange={changeHandler}
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                className="formInput radiusNone"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <TextField
                                fullWidth
                                label="CVV"
                                name="cvv"
                                value={value.cvv}
                                onChange={changeHandler}
                                type="text"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                className="formInput radiusNone"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <TextField
                                fullWidth
                                label="Expire Date"
                                name="expire_date"
                                value={value.expire_date}
                                onChange={changeHandler}
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                className="formInput radiusNone"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid className="formFooter mt-20">
                                <Button fullWidth className="cBtn cBtnLarge cBtnTheme mt-20 ml-15" type="submit">Proceed to Checkout</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
};

export default CheckWrap;
