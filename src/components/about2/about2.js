import React from 'react'
import { Link } from 'react-router-dom'
import abimg from '../../images/about.jpg'

const About2 = (props) => {

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <section className="wpo-about-section section-padding">
            <div className="container">
                <div className="wpo-about-section-wrapper">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-12 col-12">
                            <div className="wpo-about-img">
                                <img src={abimg} alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-12">
                            <div className="wpo-about-content">
                                <div className="about-title">
                                    <span>Exclusive Offer</span>
                                    <h2>Enjoy Your Luxurious Vacation In ShreeLeela Hotel</h2>
                                </div>
                                <div className="wpo-about-content-inner">
                                    <h3>FIND your place AT SHRI LEELA</h3>
<p>Be a part of something bigger. Enjoy life every day. Make a difference in the lives of those around you. Love where you work. Join a company that values respect, integrity, humility, empathy, creativity, and fun. your perfect opportunity awaits.
</p>
                                    <div className="about-info-wrap">
                                        <div className="about-info-left">
                                            <p>2 Days / 3 Night</p>
                                            <ul>
                                                <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                <li><span><i className="fa fa-star" aria-hidden="true"></i></span></li>
                                            </ul>
                                        </div>
                                        <div className="about-info-right">
                                            <p>Only</p>
                                            <h3>Rs 5000</h3>
                                        </div>
                                    </div>
                                    <Link className="theme-btn" onClick={ClickHandler} to='/room'>Book Now</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About2;