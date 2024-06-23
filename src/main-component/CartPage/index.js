import React, { Fragment } from "react";
import PageTitle from '../../components/pagetitle/PageTitle';
import Navbar from '../../components/Navbar';
import Footer from "../../components/footer";
import Scrollbar from "../../components/scrollbar";
// import { Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {  totalPrice,totalRooms } from "../../utils";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../../store/actions/action";
import { useLocation ,useNavigate} from 'react-router-dom';

import Logo from '../../images/logo2.png'
import { toast } from "react-toastify";

const CartPage = (props,state) => {

  const navigate = useNavigate();
  const { carts } = props;

  const location = useLocation();
    const { startDate, endDate, adult, child, room } = location.state || {};
  
 // Calculate the number of nights
 const calculateNights = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = Math.abs(endDate - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const nights = calculateNights(startDate, endDate);

const ClickHandler = () => {
  if(!carts.length)
  {
    toast.error("Cart is empty.");
    return false;
  }
  else {
    navigate("/checkout", {
      state: {
          carts
      }
  });
  }
  window.scrollTo(10, 0);
};

  return (
    <Fragment>
      <Navbar hclass={'wpo-header-style-3'} Logo={Logo} />
      <PageTitle pageTitle={"Cart"} pagesub={"Cart"} />
      <div className="cart-area section-padding">
        <div className="container">
          <div className="form">
            <div className="cart-wrapper">
              <div className="row">
                <div className="col-12">
                  <form action="cart">
                    <table className="table-responsive cart-wrap">
                      <thead>
                        <tr>
                          <th className="product-2">Room type</th>
                          <th className="stock">Price</th>
                          <th className="pr">Guests</th>
                          <th className="ptice">Rooms</th>
                          <th className="stock">Check - in</th>
                          <th className="stock">Check - out</th>
                          <th className="stock">Nights</th>
                          <th className="stock">Gross Total</th>
                          <th className="remove remove-b">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {carts &&
                          carts.length > 0 &&
                          carts.map((catItem, crt) => (
                            <tr key={crt}>
                              <td className="product">
                                <ul>
                                  <li className="first-cart">{catItem.title}</li>
                                </ul>
                              </td>
                              {/* <td className="ptice">{adult} adult + {child} child</td>
                              {/* <td className="ptice">{catItem.qty}</td> */}
                              {/* <td className="ptice">{room}</td>
                              <td className="stock">{formattedStartDate} </td>
                              <td className="stock">{formattedEndDate} </td>
                              <td className="stock">{nights}</td>  */}
                              <td className="ptice">Rs {catItem.basePrice}</td>
                              <td className="ptice">adult {catItem.adult} + child {catItem.child}</td>
                              <td className="ptice">{catItem.room}</td>
                              
                              <td className="stock">{new Date(catItem.startDate).toLocaleDateString()}</td> {/* Format start date */}
                              <td className="stock">{new Date(catItem.endDate).toLocaleDateString()}</td> {/* Format end date */}
                             
                              <td className="stock">{catItem.nights}</td>
                              <td className="stock">Rs {catItem.sum}</td>
                                {/* <Grid className="quantity cart-plus-minus">
                                  <Button
                                    className="dec qtybutton"
                                    onClick={() =>
                                      props.decrementQuantity(catItem.id)
                                    }
                                  >
                                    -
                                  </Button>
                                  <input value={nights} type="text" 
                                  />
                                  <Button
                                    className="inc qtybutton"
                                    onClick={() =>
                                      props.incrementQuantity(catItem.id)
                                    }
                                  >
                                    +
                                  </Button>
                                </Grid> */}
                              
                              {/* <td className="stock">Rs {nights * room * catItem.price.split('+')[0]}</td> */}
                              <td className="action">
                                <ul>
                                  <li
                                    className="w-btn"
                                    onClick={() =>
                                      props.removeFromCart(catItem.id)
                                    }
                                  >
                                    <i className="fi ti-trash"></i>
                                  </li>
                                </ul>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </form>
                  <div className="submit-btn-area">
                    <ul>
                      <li>
                        <Link
                          onClick={ClickHandler}
                          className="theme-btn"
                          to="/"
                          // to="/search-result"
                        >
                          Add Another{" "}
                        </Link>
                      </li>
                      <li>
                        <button type="submit">Update Cart</button>
                      </li>
                    </ul>
                  </div>
                  <div className="cart-product-list">
                    <ul>
                      <li>
                        Total Room<span>{totalRooms(carts)} </span>
                      </li>
                      <li>
                        Sub Price<span>Rs {totalPrice(carts) }</span>
                      </li>
                      <li>
                        CGST<span>Rs {0.06*totalPrice(carts)} </span>
                      </li>
                      <li>
                        SGST<span>Rs {0.06*totalPrice(carts)}</span>
                      </li>
                      <li>
                        Other Charge<span>Rs 0</span>
                      </li>
                      <li className="cart-b">
                        Total Price<span>Rs {totalPrice(carts)+0.12*totalPrice(carts)}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="submit-btn-area">
                    <ul>
                      <li>
                        <button
                          onClick={ClickHandler}
                          className="theme-btn"
                          // to="/checkout"
                        >
                          Proceed to Checkout{" "}
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Scrollbar />
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    carts: state.cartList.cart,
  };
};
export default connect(mapStateToProps, {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
})(CartPage);
