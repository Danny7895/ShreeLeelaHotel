import React, {Fragment, useState,useEffect} from 'react';
import PageTitle from '../../components/pagetitle/PageTitle';
import { connect } from "react-redux";
import Navbar from '../../components/Navbar';
import { addToCart } from "../../store/actions/action";
import SearchRooms from '../../components/SearchRooms/SearchRooms';
import api from "../../api";
import Scrollbar from '../../components/scrollbar';
import Logo from '../../images/logo2.png';
import Footer from '../../components/footer';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SearchResults =({ addToCart,searchData }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [nights, setNights]= useState(1);
    const { startDate, endDate, adult, child, room } = location.state || {};
   
 // Calculate the number of nights
 const calculateNights = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  useEffect(() => {
    if (startDate && endDate) {
        const nightsSpend = calculateNights(startDate, endDate);
        setNights(nightsSpend);
    }
}, [startDate, endDate]);
    const productsArray = api();
    
    const addToCartProduct = (product, qty = 1) => {
        addToCart(product, qty, startDate, endDate, adult, child, room, nights);
        // Redirect to cart with state
        navigate("/cart");
      };

    

    const products = productsArray;

    return(
        <Fragment>
            <Navbar hclass={'wpo-header-style-3'} Logo={Logo}/>
            <PageTitle pageTitle={'Hotel Booking Search'} pagesub={'Search'}/> 
              <section className="wpo-shop-page">
                  <div className="container">
                      <div className="row">
                          <div className="col-lg-12">
                              <SearchRooms
                                      addToCartProduct={addToCartProduct}
                                      products={products}
                                  />
                          </div>
                      </div>
                  </div>
              </section>
              <Footer/>
            <Scrollbar/>
        </Fragment>
    )
};

export default connect(null, { addToCart })(SearchResults);