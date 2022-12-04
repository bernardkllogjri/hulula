import React from 'react';
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, A11y } from 'swiper';
import { t } from '../../utils';

const PopularCollection = props => {
    const data = props.data;
    return (
        <section className="tf-section popular-collection" style={{ cursor: 'pointer' }}>
            <div className="themesflat-container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="heading-live-auctions">
                            <h2 className="tf-title pb-22 text-left">{t('homepage.popularCollection')}</h2>
                            <Link to="/explore" className="exp style2">{t('homepage.exploreMore.uppercase')}</Link>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="collection">
                        <Swiper
                            modules={[Navigation, Scrollbar, A11y]}
                            spaceBetween={30}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                  },
    
                                767: {
                                  slidesPerView: 2,
                                },

                                991: {
                                  slidesPerView: 3,
                                },
                              }}
                            scrollbar={{ draggable: true }}
                        >
                            {
                                data.map((item,index) => (
                                    <SwiperSlide key={index}>
                                        <PopularCollectionItem item={item} />
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                        </div>    
                    </div>
                </div>
            </div>
        </section>
    );
}
PopularCollection.propTypes = {
    data: PropTypes.array.isRequired,
}

const PopularCollectionItem = props => {
    const navigate = useNavigate()
    return (
        <div className="swiper-container show-shadow carousel4 button-arow-style"  onClick={() => { navigate('/item-details-01', { state: { id: props.item.id } })  }}>
            <div className="swiper-wrapper">
                <div className="swiper-slide">
                    <div className="slider-item">										
                        <div className="sc-card-collection style-2 home2">
                            <div className="card-bottom">
                                <div className="author">
                                    <div className="sc-author-box style-2">
                                        <div className="author-avatar">
                                            {props.item.imgAuthor && <img src={props.item.imgAuthor} alt="" className="avatar" />}
                                            <div className="badge"><i className="ripple"></i></div>
                                        </div>
                                    </div>
                                    <div className="content">
                                        <h4>{props.item.title}</h4>
                                        <div className="infor">
                                            <span>{props.item.nationality}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="tags">{props.item.tags}</div>
                                {/* <Link to="/login" className="wishlist-button public heart"><span className="number-like"> 100</span></Link> */}
                            </div>
                            <div className="media-images-collection">
                                <div className="box-left">
                                    {props.item.imgleft && <img src={props.item.imgleft} alt="hulula" />}
                                </div>
                                <div className="box-right">
                                    <div className="top-img">
                                        {props.item.imgright1 && <img src={props.item.imgright1} alt="hulula" />}
                                        {props.item.imgright2 && <img src={props.item.imgright2} alt="hulula" />}
                                    </div>
                                    <div className="bottom-img">
                                        {props.item.imgright3 && <img src={props.item.imgright3} alt="hulula" />}
                                    </div>
                                </div>
                            </div>
                        </div> 	
                    </div>
                </div>
            </div>                            
        </div>
    )
}

export default PopularCollection;
