import React, {Fragment} from 'react';
import PageTitle from '../../components/pagetitle/PageTitle';
import { connect } from "react-redux";
import Navbar from '../../components/Navbar';
import { addToCart } from "../../store/actions/action";
import SearchRooms from '../../components/SearchRooms/SearchRooms';
import api from "../../api";
import Scrollbar from '../../components/scrollbar';
import Logo from '../../images/logo2.png'
import Footer from '../../components/footer';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SearchResults =({ addToCart,searchData }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { startDate, endDate, adult, child, room } = location.state || {};

    // console.log(startDate,endDate,adult,child,room);

    const productsArray = api();
    
    const addToCartProduct = (product, qty = 1) => {
        addToCart(product, qty);
          // Redirect to cart with state
      navigate("/cart", {
        state: {
            startDate,
            endDate,
            adult,
            child,
            room,
        }
    });

      };

    const products = productsArray

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