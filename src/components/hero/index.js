import React from 'react'
import { Navigation, Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import hero1 from '../../images/slider/slider-1.jpeg'
import hero2 from '../../images/slider/slider-2.jpeg'
import hero3 from '../../images/slider/slider-3.jpeg'

const Hero = (props) => {
    return (
        <section className="wpo-hero-slider">
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    <Swiper
                        // install Swiper modules
                        modules={[Navigation, Pagination, A11y]}
                        spaceBetween={0}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        loop={true}
                        speed= {1800}
                        parallax= {true}
                        navigation
                    >
                        <SwiperSlide>
                            <div className="swiper-slide" style={{ backgroundImage: `url(${hero1})` }}>
                                <div className="slide-inner slide-bg-image">
                                    <div className="container-fluid">
                                        <div className="slide-content">
                                            <div data-swiper-parallax="300" className="slide-title">
                                                <h2>Find Your Perfect Place To Stay</h2>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div data-swiper-parallax="500" className="slide-btns">
                                                <a href="/room" className="theme-btn">Book Now</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="swiper-slide" style={{ backgroundImage: `url(${hero2})` }}>
                                <div className="slide-inner slide-bg-image">
                                    <div className="container-fluid">
                                        <div className="slide-content">
                                            <div data-swiper-parallax="300" className="slide-title">
                                                <h2>Crafting Love Stories.
                                                </h2>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div data-swiper-parallax="500" className="slide-btns">
                                                <a href="/room" className="theme-btn">Book Now</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="swiper-slide" style={{ backgroundImage: `url(${hero3})` }}>
                                <div className="slide-inner slide-bg-image">
                                    <div className="container-fluid">
                                        <div className="slide-content">
                                            <div data-swiper-parallax="300" className="slide-title">
                                                <h2>Begin Your Fairytale Life Here.</h2>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div data-swiper-parallax="500" className="slide-btns">
                                                <a href="/room" className="theme-btn">Book Now</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        ...
                    </Swiper>
                </div>
            </div>
        </section>
    )
}

export default Hero;