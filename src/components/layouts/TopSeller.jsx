import React from 'react';
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, A11y } from 'swiper';
import { t } from '../../utils'

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

const TopSeller = props => {
    const data = props.data;
    return (
        <section className="tf-section top-seller">
            <div className="themesflat-container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="heading-live-auctions">
                            <h2 className="tf-title">{t('homepage.models.mostVisited')}</h2>
                        </div>
                    </div>
                    <div className="col-md-12">
                    <Swiper
                        modules={[Navigation , Scrollbar, A11y]}
                        spaceBetween={30}
                        navigation
                        breakpoints={{
                            0: {
                                slidesPerView: 3,
                              },
                            767: {
                              slidesPerView: 5,
                            },
                            991: {
                              slidesPerView: 7,
                            },
                            1200: {
                                slidesPerView: 8,
                              },
                            1350: {
                            slidesPerView: 9,
                            },
                          }}
                        scrollbar={{ draggable: true }}                
                    >
                        {
                            data.map((item,index) => (
                                <SwiperSlide key={index}>
                                    <TopSellerItem item={item} />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
}

const TopSellerItem = props => (
    <div className="swiper-container seller style2 seller-slider2 button-arow-style">
        <div className="swiper-wrapper">
            <div className="swiper-slide">
                <div className="slider-item">										
                    <div className="sc-author-box style-2">
                        <div className="author-avatar" style={{ backgroundImage: `url(${props.item.img})` }}>
                          <div className="badge"></div>
                        </div>
                        <div className="author-infor">
                          <h5>{props.item.name}</h5>
                        </div>
                    </div>    	
                </div>
            </div>
        </div>
    </div>
)

export default TopSeller;
