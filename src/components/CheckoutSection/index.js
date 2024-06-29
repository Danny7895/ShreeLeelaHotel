import React, {Fragment} from 'react';
import Grid from "@material-ui/core/Grid";
import Collapse from "@material-ui/core/Collapse";
import FontAwesome from "../../components/UiStyle/FontAwesome";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {Link, useNavigate} from 'react-router-dom';
import {totalPrice,totalRooms} from "../../utils";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';

// images
import visa from '../../images/icon/visa.png';
import mastercard from '../../images/icon/mastercard.png';
import skrill from '../../images/icon/skrill.png';
import paypal from '../../images/icon/paypal.png';

import CheckWrap from '../CheckWrap';

import SimpleReactValidator from "simple-react-validator";


import './style.scss';

const cardType = [
    {
        title: 'visa',
        img: visa
    },
    {
        title: 'mastercard',
        img: mastercard
    },
    {
        title: 'skrill',
        img: skrill
    },
    {
        title: 'paypal',
        img: paypal
    },
];


const CheckoutSection = ({ cartList }) => {
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

    const [tabs, setExpanded] = useState({
        cupon: false,
        billing_adress: true,
        payment: false
    });

    const [validator] = useState(new SimpleReactValidator({
        className: 'errorMessage'
    }));

    const changepaymentHandler = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
        validator.showMessages();
    };

    const [errors, setErrors] = useState({});

    const [forms, setForms] = useState({
        cupon_key: '',
        fname: '',
        country: '',
        dristrict: '',
        address: '',
        post_code: '',
        email: '',
        phone: '',
        note: '',
        payment_method: 'online',
        card_type: '',
        fname2: '',
        lname2: '',
        country2: '',
        dristrict2: '',
        address2: '',
        post_code2: '',
        email2: '',
        phone2: '',
        card_holder: '',
        card_number: '',
        cvv: '',
        expire_date: '',
    });

    const [dif_ship, setDif_ship] = useState(false);
    const total_price = (0.12 * totalPrice(cartList) + totalPrice(cartList)) * 100;

    function faqHandler(name) {
        setExpanded({
            cupon: false,
            billing_adress: true,
            payment: false,
            [name]: !tabs[name]
        });
    }


    const changeHandler = (e) => {
        setForms({ ...forms, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validateForm = () => {
        let formIsValid = true;
        let errors = {};

        const requiredFields = ['fname', 'district', 'address', 'post_code', 'email', 'phone'];

        requiredFields.forEach((field) => {
            if (!forms[field]) {
                formIsValid = false;
                errors[field] = 'This field is required';
            }
        });

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (forms.email && !emailPattern.test(forms.email)) {
            formIsValid = false;
            errors.email = 'Email is invalid';
        }
    
        const phonePattern = /^[0-9]{10,15}$/; // Adjust the range as needed
        if (forms.phone && !phonePattern.test(forms.phone)) {
            formIsValid = false;
            errors.phone = 'Phone number is invalid';
        }

        setErrors(errors);
        return formIsValid;
    };

    const handlePayment = async (event) => {
        event.preventDefault();
        if (cartList.length === 0) {
            toast.error('Cart is empty.');
            return;
        }
        if (!validateForm()) {
            toast.error('Please fill necessary details.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/api/checkout', {
                amount: total_price, // Amount in paise (e.g., 50000 paise = 500 INR)
                currency: 'INR', // Preferred currency
                receipt: 'order_rcptid_11', // Generate a unique receipt ID for each transaction
                notes: {
                    address: '123, example street',
                    country: 'India',
                },
            }, { withCredentials: true });

            if (response.data.success) {
                const options = {
                    key: 'rzp_live_XpW6z0n8yi0mQX', // Replace with your Razorpay API Key
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
                        name: 'Shree Leela',
                        email: 'info@shreeleelahotel.com',
                        contact: '+91 9999111111',

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
            // console.error('Payment error:', error);
            toast.error('Failed to process payment');
        }
    };

    //  Function to get error style
  
    const getFieldError = (fieldName) => {
        return errors[fieldName] ? { border: '0px 0px 5px 0px solid red', border:'2px' } : {};
    };

    const hasBillingErrors = () => {
        const requiredFields = ['fname', 'district', 'address', 'post_code', 'email', 'phone'];
        return requiredFields.some(field => errors[field]);
    };

    return (
        <Fragment>
            <Grid className="checkoutWrapper section-padding">
                <Grid className="container" container spacing={3}>
                    <Grid item md={6} xs={12}>
                        <div className="check-form-area">
                            <Grid className={`cuponWrap checkoutCard ${hasBillingErrors() ? 'error-border' : ''}`}>
                                <Button className="collapseBtn" fullWidth onClick={() => faqHandler('billing_adress')}>
                                    Billing Address
                                    <FontAwesome name={tabs.billing_adress ? 'minus' : 'plus'} />
                                </Button>
                                <Collapse in={tabs.billing_adress} timeout="auto" unmountOnExit>
                                    <Grid className="chCardBody">
                                        <form className="cuponForm">
                                            <Grid container spacing={3}>
                                                <Grid item sm={6} xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="Name"
                                                        name="fname"
                                                        value={forms.fname}
                                                        onChange={(e) => changeHandler(e)}
                                                        type="text"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        className="formInput radiusNone"
                                                        style={getFieldError('fname')}
                                                    />
                                                    {errors.fname && <p style={{ color: 'red' }}>{errors.fname}</p>}

                                                </Grid>
                                               
                                                <Grid item sm={6} xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="District"
                                                        name="district"
                                                        value={forms.district}
                                                        onChange={(e) => changeHandler(e)}
                                                        type="text"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        className="formInput radiusNone"
                                                        style={getFieldError('district')}
                                                    />
                                                    {errors.district && <p style={{ color: 'red' }}>{errors.district}</p>}
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        multiline
                                                        rows="3"
                                                        label="Address"
                                                        name="address"
                                                        value={forms.address}
                                                        onChange={(e) => changeHandler(e)}
                                                        type="text"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        className="formInput radiusNone"
                                                        style={getFieldError('address')}
                                                    />
                                                    {errors.address && <p style={{ color: 'red' }}>{errors.address}</p>}
                                                </Grid>
                                                <Grid item sm={6} xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="Post Code"
                                                        name="post_code"
                                                        value={forms.post_code}
                                                        onChange={(e) => changeHandler(e)}
                                                        type="text"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        className="formInput radiusNone"
                                                        style={getFieldError('post_code')}
                                                    />
                                                </Grid>
                                                {errors.post_code && <p style={{ color: 'red' }}>{errors.post_code}</p>}
                                                <Grid item sm={6} xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="Email Adress"
                                                        name="email"
                                                        value={forms.email}
                                                        onChange={(e) => changeHandler(e)}
                                                        type="email"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        className="formInput radiusNone"
                                                        style={getFieldError('email')}
                                                    />
                                                    {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="Phone No"
                                                        name="phone"
                                                        value={forms.phone}
                                                        onChange={(e) => changeHandler(e)}
                                                        type="text"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        className="formInput radiusNone"
                                                        style={getFieldError('phone')}
                                                    />
                                                    {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}

                                                </Grid>
                                                {/* <Grid item xs={12}>
                                                    <FormControlLabel
                                                        className="checkBox"
                                                        control={
                                                            <Checkbox
                                                                checked={dif_ship}
                                                                onChange={() => setDif_ship(!dif_ship)}
                                                                value={dif_ship}
                                                                color="primary"
                                                            />
                                                        }
                                                        label="Ship to a different address?"
                                                    />
                                                </Grid> */}
                                                <Grid item xs={12}>
                                                    <Collapse in={dif_ship} timeout="auto" unmountOnExit>
                                                        <Grid container spacing={3}>
                                                            <Grid item sm={6} xs={12}>
                                                                <TextField
                                                                    fullWidth
                                                                    label="Name"
                                                                    name="fname2"
                                                                    value={forms.fname2}
                                                                    onChange={(e) => changeHandler(e)}
                                                                    type="text"
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }}
                                                                    className="formInput radiusNone"
                                                                    style={getFieldError('fname2')}
                                                                    />
                                                                    {errors.fname && <p style={{ color: 'red' }}>{errors.fname}</p>}
                                                            </Grid>
                                                           
                                                            <Grid item sm={6} xs={12}>
                                                                <TextField
                                                                    fullWidth
                                                                    label="District"
                                                                    name="district2"
                                                                    value={forms.dristrict2}
                                                                    onChange={(e) => changeHandler(e)}
                                                                    type="text"
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }}
                                                                    className="formInput radiusNone"
                                                                    style={getFieldError('district2')}
                                                    />
                                                    {errors.fname && <p style={{ color: 'red' }}>{errors.fname}</p>}
                                                                
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <TextField
                                                                    fullWidth
                                                                    multiline
                                                                    rows="3"
                                                                    label="Address"
                                                                    name="address2"
                                                                    value={forms.address2}
                                                                    onChange={(e) => changeHandler(e)}
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
                                                                    label="Post Code"
                                                                    name="post_code2"
                                                                    value={forms.post_code2}
                                                                    onChange={(e) => changeHandler(e)}
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
                                                                    label="Email Adress"
                                                                    name="email2"
                                                                    value={forms.email2}
                                                                    onChange={(e) => changeHandler(e)}
                                                                    type="email"
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }}
                                                                    className="formInput radiusNone"
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <TextField
                                                                    fullWidth
                                                                    label="Phone No"
                                                                    name="phone2"
                                                                    value={forms.phone2}
                                                                    onChange={(e) => changeHandler(e)}
                                                                    type="text"
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }}
                                                                    className="formInput radiusNone"
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </Collapse>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        multiline
                                                        label="Order Notes"
                                                        placeholder="Note about your order"
                                                        name="note"
                                                        value={forms.note}
                                                        onChange={(e) => changeHandler(e)}
                                                        type="text"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        className="formInput radiusNone note"
                                                    />
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </Grid>
                                </Collapse>
                            </Grid>
                            <Grid className="cuponWrap checkoutCard">
                                <Button className="collapseBtn" fullWidth onClick={() => faqHandler('payment')}>
                                    Payment Method
                                    <FontAwesome name={tabs.payment ? 'minus' : 'plus'}/>
                                </Button>
                                <Grid className="chCardBody">
                                    <Collapse in={tabs.payment} timeout="auto">
                                        <RadioGroup className="paymentMethod" aria-label="Payment Method"
                                                    name="payment_method"
                                                    value={forms.payment_method}
                                                    onChange={(e) => changeHandler(e)}>
                                            <FormControlLabel value="online" control={<Radio color="primary"/>}
                                                    label="Pay Online (Proceed to checkout for UPI and other Option) "/>
                                            {/* <FormControlLabel value="card" control={<Radio color="primary"/>}
                                                            label="Cash On Hotel Visit"/>
                                             */}
                                        </RadioGroup>
                                        <Collapse in={forms.payment_method === 'online'} timeout="auto">
                                            <Grid className="cardType">
                                                {cardType.map((item, i) => (
                                                    <Grid
                                                        key={i}
                                                        className={`cardItem ${forms.card_type === item.title ? 'active' : null}`}
                                                        onClick={() => setForms({...forms, card_type: item.title})}>
                                                        <img src={item.img} alt={item.title}/>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                            <Grid>
                                            <Grid className="cardbp mt-20">
        <Grid> 
                <form onSubmit={handlePayment}>
                    <Grid container spacing={3}>
                        <Grid item sm={6} xs={12}>
                            <TextField
                                fullWidth
                                label="Card holder Name"
                                name="card_holder"
                                value={value.card_holder}
                                onChange={changepaymentHandler}
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
                                onChange={changepaymentHandler}
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
                                onChange={changepaymentHandler}
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
                                onChange={changepaymentHandler}
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
                                            </Grid>
                                        </Collapse>
                                        {/* <Collapse in={forms.payment_method === 'card'} timeout="auto">
                                            <Grid className="cardType">
                                                <Link onClick={handlePayment} className="cBtn cBtnLarge cBtnTheme mt-20 ml-15" >Proceed to Checkout</Link>
                                            </Grid>
                                        </Collapse> */}
                                    </Collapse>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Grid className="cartStatus">
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Grid className="cartTotals">
                                        <h4>Cart Total</h4>
                                        <Table>
                                            <TableBody>
                                                {cartList.map(item => (
                                                    <TableRow key={item.id}>
                                                        <TableCell>{item.title} Rs {item.basePrice} x Rooms {item.room} x Nights {item.nights}</TableCell>
                                                        <TableCell
                                                            align="right">Rs {item.sum}</TableCell>
                                                    </TableRow>
                                                ))}
                                                <TableRow className="totalProduct">
                                                    <TableCell>Total Room</TableCell>
                                                    <TableCell align="right">{totalRooms(cartList)}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Sub Price</TableCell>
                                                    <TableCell align="right">Rs {totalPrice(cartList)}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>SGST 6%</TableCell>
                                                    <TableCell align="right">Rs {0.06*totalPrice(cartList)}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>CGST 6%</TableCell>
                                                    <TableCell align="right">Rs {0.06*totalPrice(cartList)}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Total Price</TableCell>
                                                    <TableCell align="right">Rs {totalPrice(cartList)+0.12*totalPrice(cartList)}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
    )
};


export default CheckoutSection;



//chat gpt section



// import React, { Fragment } from 'react';
// import Grid from "@material-ui/core/Grid";
// import Collapse from "@material-ui/core/Collapse";
// import FontAwesome from "../../components/UiStyle/FontAwesome";
// import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
// import FormControl from "@material-ui/core/FormControl";
// import InputLabel from "@material-ui/core/InputLabel";
// import Select from "@material-ui/core/Select";
// import MenuItem from "@material-ui/core/MenuItem";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// // import Checkbox from "@material-ui/core/Checkbox";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import Radio from "@material-ui/core/Radio";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableRow from "@material-ui/core/TableRow";
// import TableCell from "@material-ui/core/TableCell";
// import { Link, useNavigate } from 'react-router-dom';
// import { totalPrice, totalRooms } from "../../utils";
// import axios from 'axios';
// import { toast } from 'react-toastify';

// // images
// import visa from '../../images/icon/visa.png';
// import mastercard from '../../images/icon/mastercard.png';
// import skrill from '../../images/icon/skrill.png';
// import paypal from '../../images/icon/paypal.png';

// import CheckWrap from '../CheckWrap';

// import './style.scss';

// const cardType = [
//     {
//         title: 'visa',
//         img: visa
//     },
//     {
//         title: 'mastercard',
//         img: mastercard
//     },
//     {
//         title: 'skrill',
//         img: skrill
//     },
//     {
//         title: 'paypal',
//         img: paypal
//     },
// ];

// const CheckoutSection = ({ cartList }) => {
//     const navigate = useNavigate();
//     const [tabs, setExpanded] = React.useState({
//         cupon: false,
//         billing_adress: true,
//         payment: false
//     });
//     const [forms, setForms] = React.useState({
//         cupon_key: '',
//         fname: '',
//         lname: '',
//         country: '',
//         dristrict: '',
//         address: '',
//         post_code: '',
//         email: '',
//         phone: '',
//         note: '',

//         payment_method: 'cash',
//         card_type: '',

//         fname2: '',
//         lname2: '',
//         country2: '',
//         dristrict2: '',
//         address2: '',
//         post_code2: '',
//         email2: '',
//         phone2: '',

//         card_holder: '',
//         card_number: '',
//         cvv: '',
//         expire_date: '',
//     });

//     const [errors, setErrors] = React.useState({});

//     const [dif_ship, setDif_ship] = React.useState(false);

//     // tabs handler
//     function faqHandler(name) {
//         setExpanded(prevTabs => ({
//             cupon: name === 'cupon' ? !prevTabs.cupon : false,
//             billing_adress: name === 'billing_adress' ? !prevTabs.billing_adress : false,
//             payment: name === 'payment' ? !prevTabs.payment : false,
//         }));
//     }

//     const total_price = 0.12 * totalPrice(cartList) + totalPrice(cartList) * 100;

//     // forms handler
//     const changeHandler = e => {
//         setForms({ ...forms, [e.target.name]: e.target.value });
//         setErrors({ ...errors, [e.target.name]: '' });
//     };

//     // Validation function
//     const validateForm = () => {
//         let formIsValid = true;
//         let errors = {};

//         const requiredFields = ['fname', 'dristrict', 'address', 'post_code', 'email', 'phone'];

//         requiredFields.forEach(field => {
//             if (!forms[field]) {
//                 formIsValid = false;
//                 errors[field] = 'This field is required';
//             }
//         });

//         if (forms.email && !/\S+@\S+\.\S+/.test(forms.email)) {
//             formIsValid = false;
//             errors.email = 'Email is invalid';
//         }

//         if (forms.phone && !/^\d+$/.test(forms.phone)) {
//             formIsValid = false;
//             errors.phone = 'Phone number is invalid';
//         }

//         setErrors(errors);
//         return formIsValid;
//     };

//     // Payment handler
//     const handlePayment = async (event) => {
//         event.preventDefault();

//         if (!validateForm()) {
//             toast.error('Please fix the errors in the form.');
//             return;
//         }

//         if (cartList.length === 0) {
//             toast.error('Cart is empty.');
//             return;
//         }

//         try {
//             const response = await axios.post('http://localhost:8080/api/checkout', {
//                 amount: total_price, // Amount in paise (e.g., 50000 paise = 500 INR)
//                 currency: 'INR', // Preferred currency
//                 receipt: 'order_rcptid_11', // Generate a unique receipt ID for each transaction
//                 notes: {
//                     address: '123, example street',
//                     country: 'India',
//                 },
//             }, { withCredentials: true });

//             if (response.data.success) {
//                 const options = {
//                     key: 'rzp_test_psYceEdF2V0TcX', // Replace with your Razorpay API Key
//                     amount: response.data.order.amount,
//                     currency: response.data.order.currency,
//                     name: 'Shree Leela Hotel',
//                     description: 'Payment for booking',
//                     order_id: response.data.order.id,
//                     handler: function (response) {
//                         toast.success('Payment successful');
//                         navigate('/order_received', {
//                             state: {
//                                 razorpayPaymentId: response.razorpay_payment_id,
//                                 razorpayOrderId: response.razorpay_order_id,
//                                 razorpaySignature: response.razorpay_signature,
//                             },
//                         });
//                     },
//                     prefill: {
//                         name: 'Shree Leela',
//                         email: 'info@shreeleelahotel.com',
//                         contact: '+91 9999111111',

//                     },
//                     theme: {
//                         color: '#F37254',
//                     },
//                 };

//                 const rzp = new window.Razorpay(options);
//                 rzp.open();
//             } else {
//                 toast.error('Error creating order');
//             }
//         } catch (error) {
//             toast.error('Failed to process payment');
//         }
//     };

//     // Function to get error style
//     const getFieldError = fieldName => {
//         return errors[fieldName] ? { border: '1px solid red' } : {};
//     };

//     return (
//         <Fragment>
//             <Grid className="checkoutWrapper section-padding">
//                 <Grid className="container" container spacing={3}>
//                     <Grid item md={6} xs={12}>
//                         <div className="check-form-area">
//                             <Grid className="cuponWrap checkoutCard">
//                                 <Button className="collapseBtn" fullWidth onClick={() => faqHandler('billing_adress')}>
//                                     Billing Address
//                                     <FontAwesome name={tabs.billing_adress ? 'minus' : 'plus'} />
//                                 </Button>
//                                 <Collapse in={tabs.billing_adress} timeout="auto" unmountOnExit>
//                                     <Grid className="chCardBody">
//                                         <form className="cuponForm">
//                                             <Grid container spacing={3}>
//                                                 <Grid item sm={6} xs={12}>
//                                                     <TextField
//                                                         fullWidth
//                                                         label="First Name"
//                                                         name="fname"
//                                                         value={forms.fname}
//                                                         onChange={changeHandler}
//                                                         type="text"
//                                                         InputLabelProps={{
//                                                             shrink: true,
//                                                         }}
//                                                         className="formInput radiusNone"
//                                                         style={getFieldError('fname')}
//                                                     />
//                                                     {errors.fname && <p style={{ color: 'red' }}>{errors.fname}</p>}
//                                                 </Grid>
//                                                 <Grid item sm={6} xs={12}>
//                                                     <TextField
//                                                         fullWidth
//                                                         label="District"
//                                                         name="dristrict"
//                                                         value={forms.dristrict}
//                                                         onChange={changeHandler}
//                                                         type="text"
//                                                         InputLabelProps={{
//                                                             shrink: true,
//                                                         }}
//                                                         className="formInput radiusNone"
//                                                         style={getFieldError('dristrict')}
//                                                     />
//                                                     {errors.dristrict && <p style={{ color: 'red' }}>{errors.dristrict}</p>}
//                                                 </Grid>
//                                                 <Grid item xs={12}>
//                                                     <TextField
//                                                         fullWidth
//                                                         multiline
//                                                         rows="3"
//                                                         label="Address"
//                                                         name="address"
//                                                         value={forms.address}
//                                                         onChange={changeHandler}
//                                                         type="text"
//                                                         InputLabelProps={{
//                                                             shrink: true,
//                                                         }}
//                                                         className="formInput radiusNone"
//                                                         style={getFieldError('address')}
//                                                     />
//                                                     {errors.address && <p style={{ color: 'red' }}>{errors.address}</p>}
//                                                 </Grid>
//                                                 <Grid item sm={6} xs={12}>
//                                                     <TextField
//                                                         fullWidth
//                                                         label="Post Code"
//                                                         name="post_code"
//                                                         value={forms.post_code}
//                                                         onChange={changeHandler}
//                                                         type="text"
//                                                         InputLabelProps={{
//                                                             shrink: true,
//                                                         }}
//                                                         className="formInput radiusNone"
//                                                         style={getFieldError('post_code')}
//                                                     />
//                                                     {errors.post_code && <p style={{ color: 'red' }}>{errors.post_code}</p>}
//                                                 </Grid>
//                                                 <Grid item sm={6} xs={12}>
//                                                     <TextField
//                                                         fullWidth
//                                                         label="Email Address"
//                                                         name="email"
//                                                         value={forms.email}
//                                                         onChange={changeHandler}
//                                                         type="email"
//                                                         InputLabelProps={{
//                                                             shrink: true,
//                                                         }}
//                                                         className="formInput radiusNone"
//                                                         style={getFieldError('email')}
//                                                     />
//                                                     {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
//                                                 </Grid>
//                                                 <Grid item sm={6} xs={12}>
//                                                     <TextField
//                                                         fullWidth
//                                                         label="Phone No."
//                                                         name="phone"
//                                                         value={forms.phone}
//                                                         onChange={changeHandler}
//                                                         type="text"
//                                                         InputLabelProps={{
//                                                             shrink: true,
//                                                         }}
//                                                         className="formInput radiusNone"
//                                                         style={getFieldError('phone')}
//                                                     />
//                                                     {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}
//                                                 </Grid>
//                                                 <Grid item xs={12}>
//                                                     <TextField
//                                                         fullWidth
//                                                         multiline
//                                                         rows="3"
//                                                         label="Order Notes"
//                                                         name="note"
//                                                         value={forms.note}
//                                                         onChange={changeHandler}
//                                                         type="text"
//                                                         InputLabelProps={{
//                                                             shrink: true,
//                                                         }}
//                                                         className="formInput radiusNone"
//                                                     />
//                                                 </Grid>
//                                             </Grid>
//                                         </form>
//                                     </Grid>
//                                 </Collapse>
//                             </Grid>

//                             {/* Other sections here... */}
                            
//                             <Button variant="contained" color="primary" onClick={handlePayment}>
//                                 Place Order
//                             </Button>
//                         </div>
//                     </Grid>
//                 </Grid>
//             </Grid>
//         </Fragment>
//     );
// };

// export default CheckoutSection;



