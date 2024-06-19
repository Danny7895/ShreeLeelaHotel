import React, { useState } from 'react';
import Grid from "@material-ui/core/Grid";
import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { totalPrice } from '../../utils';
import './style.scss';

const CheckWrap = ({ cartList, nights }) => {
    const navigate = useNavigate();

    const [value, setValue] = useState({
        email: 'user@gmail.com',
        password: '123456',
        card_holder: 'Jhon Doe',
        card_number: '589622144',
        cvv: '856226',
        expire_date: '',
        remember: false,
    });

    const [validator] = useState(new SimpleReactValidator({
        className: 'errorMessage'
    }));

    const changeHandler = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
        validator.showMessages();
    };

    const submitForm = async (e) => {
        e.preventDefault();

        if (cartList.length === 0) {
            toast.error('Cart is empty.');
            return;
        }

        const total_price =(0.12*nights*totalPrice(cartList)  +nights * totalPrice(cartList) )* 100;

        console.log('Calculated total_price:', total_price); // Add log

        const payload = {
            amount: total_price, // Amount in paise
            currency: 'INR',
            receipt: 'order_rcptid_11',
            notes: {
                address: '123, example street',
                country: 'India',
            },
        };

        console.log('Payload:', payload); // Add log

        if (validator.allValid()) {
            try {
                const response = await axios.post('http://localhost:8080/api/checkout', payload, { withCredentials: true });

                console.log('Server response:', response.data); // Add log

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
                console.error('Payment error:', error);
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
