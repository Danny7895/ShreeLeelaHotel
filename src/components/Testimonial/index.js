import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import test1 from '../../images/testimonial/img-1.png'
import test2 from '../../images/testimonial/img-1.png'
import test3 from '../../images/testimonial/img-1.png'





const Testimonials = [
    {
        tstImg: test1,
        name: 'Rahul',
        title: 'Photographer',
        descriptoion: 'My recent stay at Shree Leela Hotel was absolutely fantastic! From the moment I arrived, I was greeted with warm smiles and impeccable service from the staff. The check-in process was smooth and efficient, and I was pleasantly surprised by the attention to detail throughout the hotel.',
    },
    {
        tstImg: test2,
        name: 'Mayank',
        title: 'Traveller',
        descriptoion: 'The room itself was spacious, clean, and beautifully decorated, providing a comfortable retreat after a long day of exploring the city. The bed was plush and inviting, ensuring a restful nights sleep. I also appreciated the modern amenities, including a flat-screen TV, complimentary Wi-Fi, and a well-stocked minibar',
    },
    {
        tstImg: test3,
        name: 'Sarita',
        title: 'Bussiness Women',
        descriptoion: 'One of the highlights of my stay was the dining experience at the hotels restaurant. The food was delicious and beautifully presented, with a diverse menu featuring both local and international cuisine. The breakfast buffet was particularly impressive, offering a wide selection of fresh fruits, pastries, and made-to-order dishes.',
    },
]



const Testimonial = () => {

    var settings = {
        dots: false,
        arrows: true,
        speed: 1200,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
    };

    return (
        <div className="wpo-testimonial-area">
            <div className="container">
                <div className="wpo-testimonial-wrap">
                    <div className="testimonial-slider">
                        <Slider {...settings}>
                            {Testimonials.map((tstml, tsm) => (
                                <div className="wpo-testimonial-item" key={tsm}>
                                    <div className="wpo-testimonial-img">
                                        <img src={tstml.tstImg} alt="" />
                                    </div>
                                    <div className="wpo-testimonial-content">
                                        <p>{tstml.descriptoion}</p>
                                        <h2>{tstml.name}</h2>
                                        <span>Previous Client</span>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonial;