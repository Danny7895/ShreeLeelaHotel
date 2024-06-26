import React from 'react';
import ContactForm from '../ContactFrom'


const ContactpageSec = () => {

    return(
        <section className="wpo-contact-pg-section section-padding">
            <div className="container">
                <div className="row">
                    <div className="col col-lg-10 offset-lg-1">
                        <div className="office-info">
                            <div className="row">
                                <div className="col col-xl-4 col-lg-6 col-md-6 col-12">
                                    <div className="office-info-item">
                                        <div className="office-info-icon">
                                            <div className="icon">
                                                <i className="fi flaticon-maps-and-flags"></i>
                                            </div>
                                        </div>
                                        <div className="office-info-text">
                                            <h2>Address</h2>
                                            <h4>Shree Leela Hotel & Resort </h4>
                                            <p>Rajmarg, BAS STAND CHOURAHA, LOLARI, <br></br>RAJMARGH, Lolri, Madhya Pradesh 487330</p>
                                        </div>
                                    </div>
                                </div> 
                                <div className="col col-xl-4 col-lg-6 col-md-6 col-12">
                                    <div className="office-info-item">
                                        <div className="office-info-icon">
                                            <div className="icon">
                                                <i className="fi flaticon-email"></i>
                                            </div>
                                        </div>
                                        <div className="office-info-text">
                                            <h2>Email Us</h2>
                                            <p>shrileelahotelresorts@gmail.com</p>
                                            {/* <p>helloyou@gmail.com</p> */}
                                        </div>
                                    </div>
                                </div> 
                                <div className="col col-xl-4 col-lg-6 col-md-6 col-12">
                                    <div className="office-info-item">
                                        <div className="office-info-icon">
                                            <div className="icon">
                                                <i className="fi flaticon-phone-call"></i>
                                            </div>
                                        </div>
                                        <div className="office-info-text">
                                            <h2>Call Now</h2>
                                            <p>+91 8001234567</p>
                                            {/* <p>+1 800 123 654 987</p> */}
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </div>
                        <div className="wpo-contact-title">
                            <h2>Have Any Question?</h2>
                            <p>It is a long established fact that a reader will be distracted
                                content of a page when looking.</p>
                        </div>
                        <div className="wpo-contact-form-area">
                            <ContactForm/>
                        </div>
                    </div>                
                </div>
            </div> 
            <section className="wpo-contact-map-section">
                <div className="wpo-contact-map">
                <iframe id="gmap_canvas" src="https://maps.google.com/maps?q=SHREE+LEELA+HOTEL+%26+RESORT%2C+RAJMARGH%2C+BAS+STAND+CHOURAHA%2C+LOLARI%2C+RAJMARGH%2C+Lolri%2C+Madhya+Pradesh+487330&t=&z=14&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                </div>
            </section>
        </section>
     )
        
}

export default ContactpageSec;
