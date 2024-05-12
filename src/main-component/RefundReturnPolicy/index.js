
import { Link } from 'react-router-dom'
import React from 'react';

const RefundReturnPolicy = () => {
    return (

        <section className="error-404-section section-padding">
            <div className="container">
                <div className="row">
                    <div className="col col-xs-12">
                        <div className="content clearfix">
                            <div className="error-message">
                                <h1>Refund and Return Policy</h1>
                                <p>
                                    At ShreeLeelaHotel, we strive to provide our customers with the best possible experience. If you are not entirely satisfied with your booking, we're here to help.
                                </p>
                                <h2>Cancellation Policy</h2>
                                <p>
                                    You may cancel your reservation up to 24 hours before your scheduled arrival date without any penalty. Cancellations made within 24 hours of the scheduled arrival date will incur a cancellation fee equivalent to one night's stay.
                                </p>
                                <h2>Refund Policy</h2>
                                <p>
                                    Refunds for cancelled reservations will be processed within 7-10 business days. Please note that it may take additional time for the refund to reflect in your account depending on your bank or credit card provider.
                                </p>
                                <h2>No-Show Policy</h2>
                                <p>
                                    Guests who fail to check-in on the scheduled arrival date (no-show) will be charged a penalty equivalent to one night's stay, and the remaining reservation will be cancelled.
                                </p>
                                <h2>Modification Policy</h2>
                                <p>
                                    Changes to your reservation, including modifications to the check-in or check-out dates, room type, or any other details, are subject to availability and may incur additional charges.
                                </p>
                                <h2>Contact Us</h2>
                                <p>
                                    If you have any questions or concerns about our Refund and Return Policy, please feel free to contact us at <a href="mailto:info@shreeleelahotel.com">info@shreeleelahotel.com</a> or call us at <a href="tel:+918839437280">+91 (883) 9437280</a>. Our customer service team will be happy to assist you.
                                </p>
                                <Link to="/home" className="theme-btn">Back to home</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


    );
}

export default RefundReturnPolicy;
