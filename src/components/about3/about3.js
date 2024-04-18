import React from 'react'
import { Link } from 'react-router-dom'
import abimg from '../../images/about2.jpg'

const About3 = (props) => {

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <section className="wpo-about-section-s3 section-padding">
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
                                    <span>About Us</span>
                                    <h2>Explore All Corners Of The World With Us</h2>
                                </div>
                                <div className="wpo-about-content-inner">
                                    <p>FIND your place AT SHRI LEELA
Be a part of something bigger. Enjoy life every day. Make a difference in the lives of those around you. Love where you work. Join a company that values respect, integrity, humility, empathy, creativity, and fun. your perfect opportunity awaits.
</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default About3;