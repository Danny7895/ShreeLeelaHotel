import React, { Fragment } from 'react';
import PageTitle from '../../components/pagetitle/PageTitle';
import { useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar';
import Scrollbar from '../../components/scrollbar'
import Destinations from '../../api/destination'
import Benefits from './benefits'
import DestinationSidebar from './sidebar'
import Footer from '../../components/footer';
import Logo from '../../images/logo2.png'

// import dimg1 from '../../images/destination-single/2.jpg'
// import dimg2 from '../../images/destination-single/3.jpg'
import Newslatter from '../../components/Newslatter/Newslatter';


const DestinationSinglePage = (props) => {
    const { id } = useParams()

    const destinationDetails = Destinations.find(item => item.id === id)


    return (
        <Fragment>
            <Navbar hclass={'wpo-header-style-3'} Logo={Logo} />
            <PageTitle pageTitle={destinationDetails.title} pagesub={'destination'} />
            <section className="wpo-destination-single-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="wpo-destination-single-wrap">
                                <div className="wpo-destination-single-content">
                                    <img src={destinationDetails.dSimg} alt="" />
                                    <div className="wpo-destination-single-content-des">
                                        <h2>{destinationDetails.title}</h2>
                                        <p>Shree leela Hotel is a luxury hotel that epitomizes opulence and comfort, offering an unforgettable experience to its guests. Situated in a prime location, Shreeleela Hotel combines modern amenities with traditional elegance, making it an ideal choice for both leisure and business travelers. </p>
                                        <h3>Accomadation</h3>
                                        <h3>Dining</h3>
                                        <h3>Events and Conferences</h3>
                                        <h3>Personalized Services</h3>
                                        <h3>Sustainability</h3>
                                         {/* <div className="wpo-destination-single-sub-img">
                                            <ul>
                                                <li><img src={dimg1} alt="" /></li>
                                                <li><img src={dimg2} alt="" /></li>
                                            </ul>

                                        </div> */}
                                    </div>
                                </div>
                                {/* <p>but because those who do not know how to pursue
                                    pleasure rationally encounter consequences that are extremely painful. </p>
                                <p>Nor again is there anyone who loves or pursues or desires to obtain pain of
                                    itself, because it is pain, but because occasionally circumstances occur in
                                    which toil and pain can procure him some great pleasure. To take a trivial
                                    example, which of us ever undertakes laborious physical exercise</p> */}

                                <Benefits />

                            </div>
                        </div>
                        <DestinationSidebar />
                    </div>
                </div>
            </section>
            <Newslatter nClass={'section-bg'}/>
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};
export default DestinationSinglePage;
