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
import Checkbox from "@material-ui/core/Checkbox";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {Link, useNavigate,useLocation} from 'react-router-dom'
import {totalPrice} from "../../utils";
import axios from 'axios';
import { toast } from 'react-toastify';

// images
import visa from '../../images/icon/visa.png';
import mastercard from '../../images/icon/mastercard.png';
import skrill from '../../images/icon/skrill.png';
import paypal from '../../images/icon/paypal.png';

import CheckWrap from '../CheckWrap'


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

    const location = useLocation();
    const { startDate, endDate, adult, child, room ,nights} = location.state || {};

    const navigate = useNavigate();
    const [tabs, setExpanded] = React.useState({
        cupon: false,
        billing_adress: false,
        payment: true
    });
    const [forms, setForms] = React.useState({
        cupon_key: '',
        fname: '',
        lname: '',
        country: '',
        dristrict: '',
        address: '',
        post_code: '',
        email: '',
        phone: '',
        note: '',

        payment_method: 'cash',
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

    const [dif_ship, setDif_ship] = React.useState(false);

    // tabs handler
    function faqHandler(name) {
        setExpanded({
            cupon: false,
            billing_adress: false,
            payment: true, [name]: !tabs[name]
        });
    }
    const total_price= nights*totalPrice(cartList)*100;
    
    // forms handler
    const changeHandler = e => {
        setForms({ ...forms, [e.target.name]: e.target.value });
    };

    // Payment handler
    const handlePayment = async (event) => {
        event.preventDefault();
        console.log(";handle payment invoke")
        if (cartList.length === 0) {
            toast.error('Cart is empty.');
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
    };


    return (
        <Fragment>
            <Grid className="checkoutWrapper section-padding">
                <Grid className="container" container spacing={3}>
                    <Grid item md={6} xs={12}>
                        <div className="check-form-area">
                            {/* <Grid className="cuponWrap checkoutCard">
                                <Button className="collapseBtn" fullWidth onClick={() => faqHandler('cupon')}>
                                    Have a coupon ? Click here to enter your code.
                                    <FontAwesome name={tabs.cupon ? 'minus' : 'plus'}/>
                                </Button>
                                <Collapse in={tabs.cupon} timeout="auto"
                                        unmountOnExit>
                                    <Grid className="chCardBody">
                                        <p>If you have coupon code,please apply it</p>
                                        <form className="cuponForm">
                                            <TextField
                                                fullWidth
                                                type="text"
                                                className="formInput radiusNone"
                                                value={forms.cupon_key}
                                                name="cupon_key"
                                                onChange={(e) => changeHandler(e)}
                                            />
                                            <Button className="cBtn cBtnBlack">Apply</Button>
                                        </form>
                                    </Grid>
                                </Collapse>
                            </Grid> */}
                            <Grid className="cuponWrap checkoutCard">
                                <Button className="collapseBtn" fullWidth onClick={() => faqHandler('billing_adress')}>
                                    Billing Address
                                    <FontAwesome name={tabs.billing_adress ? 'minus' : 'plus'}/>
                                </Button>
                                <Collapse in={tabs.billing_adress} timeout="auto" unmountOnExit>
                                    <Grid className="chCardBody">
                                        <form className="cuponForm">
                                            <Grid container spacing={3}>
                                                <Grid item sm={6} xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="First Name"
                                                        name="fname"
                                                        value={forms.fname}
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
                                                        label="Last Name"
                                                        name="lname"
                                                        value={forms.lname}
                                                        onChange={(e) => changeHandler(e)}
                                                        type="text"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        className="formInput radiusNone"
                                                    />
                                                </Grid>
                                                <Grid item sm={6} xs={12}>
                                                    <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>
                                                    <FormControl className="formSelect" fullWidth variant="filled">
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"
                                                            value={forms.country}
                                                            name="country"
                                                            onChange={(e) => changeHandler(e)}
                                                        >
                                                            <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>
                                                            <MenuItem value={10}>Ten</MenuItem>
                                                            <MenuItem value={20}>Twenty</MenuItem>
                                                            <MenuItem value={30}>Thirty</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item sm={6} xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="Dristrict"
                                                        name="dristrict"
                                                        value={forms.dristrict}
                                                        onChange={(e) => changeHandler(e)}
                                                        type="text"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        className="formInput radiusNone"
                                                    />
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
                                                    />
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
                                                    />
                                                </Grid>
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
                                                    />
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
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
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
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Collapse in={dif_ship} timeout="auto" unmountOnExit>
                                                        <Grid container spacing={3}>
                                                            <Grid item sm={6} xs={12}>
                                                                <TextField
                                                                    fullWidth
                                                                    label="First Name"
                                                                    name="fname2"
                                                                    value={forms.fname2}
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
                                                                    label="Last Name"
                                                                    name="lname2"
                                                                    value={forms.lname2}
                                                                    onChange={(e) => changeHandler(e)}
                                                                    type="text"
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }}
                                                                    className="formInput radiusNone"
                                                                />
                                                            </Grid>
                                                            <Grid item sm={6} xs={12}>
                                                                <InputLabel
                                                                    id="demo-simple-select-filled-label">Age</InputLabel>
                                                                <FormControl className="formSelect" fullWidth
                                                                            variant="filled">
                                                                    <Select
                                                                        labelId="demo-simple-select-filled-label"
                                                                        id="demo-simple-select-filled"
                                                                        value={forms.country2}
                                                                        name="country2"
                                                                        onChange={(e) => changeHandler(e)}
                                                                    >
                                                                        <MenuItem value="">
                                                                            <em>None</em>
                                                                        </MenuItem>
                                                                        <MenuItem value={10}>Ten</MenuItem>
                                                                        <MenuItem value={20}>Twenty</MenuItem>
                                                                        <MenuItem value={30}>Thirty</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                            </Grid>
                                                            <Grid item sm={6} xs={12}>
                                                                <TextField
                                                                    fullWidth
                                                                    label="Dristrict"
                                                                    name="dristrict2"
                                                                    value={forms.dristrict2}
                                                                    onChange={(e) => changeHandler(e)}
                                                                    type="text"
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }}
                                                                    className="formInput radiusNone"
                                                                />
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
                                            <FormControlLabel value="cash" control={<Radio color="primary"/>}
                                                    label="Payment By Card "/>
                                            {/* <FormControlLabel value="card" control={<Radio color="primary"/>}
                                                            label="Cash On Hotel Visit"/>
                                             */}
                                        </RadioGroup>
                                        <Collapse in={forms.payment_method === 'cash'} timeout="auto">
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
                                                <CheckWrap cartList={cartList} nights={nights}/>
                                            </Grid>
                                        </Collapse>
                                        <Collapse in={forms.payment_method === 'card'} timeout="auto">
                                            <Grid className="cardType">
                                                <Link onClick={handlePayment} className="cBtn cBtnLarge cBtnTheme mt-20 ml-15" >Proceed to Checkout</Link>
                                                {/* <p>procedd to checkout</p> */}
                                            </Grid>
                                        </Collapse>
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
                                                        <TableCell>{item.title} Rs {item.price} x {item.qty}</TableCell>
                                                        <TableCell
                                                            align="right">Rs {nights * item.price.split('+')[0]}</TableCell>
                                                    </TableRow>
                                                ))}
                                                <TableRow className="totalProduct">
                                                    <TableCell>Total Room</TableCell>
                                                    <TableCell align="right">{cartList.length}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Sub Price</TableCell>
                                                    <TableCell align="right">Rs {nights*totalPrice(cartList)}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>SGST</TableCell>
                                                    <TableCell align="right">Rs {0.06*nights*totalPrice(cartList)}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>CGST</TableCell>
                                                    <TableCell align="right">Rs {0.06*nights*totalPrice(cartList)}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Total Price</TableCell>
                                                    <TableCell
                                                        align="right">Rs {nights*totalPrice(cartList)+nights*0.12*totalPrice(cartList)}</TableCell>
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