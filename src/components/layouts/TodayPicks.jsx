import React , { useState , Fragment } from 'react';
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import CardModal from './CardModal';
import { t } from '../../utils'

const TodayPicks = props => {
    const data = props.data;

    const [visible , setVisible] = useState(8);
    const showMoreItems = () => {
        setVisible((prevValue) => prevValue + 4);
    }
    const [modalShow, setModalShow] = useState(false);
    const navigate = useNavigate()

    return (
        <Fragment>
        <section className="tf-section today-pick">
            <div className="themesflat-container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="heading-live-auctions mg-bt-21">
                            <h2 className="tf-title pad-l-7">
                                {t('homepage.models.todaysPicks')}
                            </h2>
                            <Link to="/explore" className="exp style2">{t('homepage.exploreMore.uppercase')}</Link>
                        </div>
                    </div>
                    {
                        data.slice(0,visible).map((item,index) => (
                            <div key={index} className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6" style={{ paddingRight: '4px', paddingLeft: '4px' }}>
                                <div className={`sc-card-product ${item.feature ? 'comingsoon' : '' } `}>
                                    <div
                                      onClick={() => { navigate('/item-details-01', { state: { id: item.id }})  }}
                                      className="card-media"
                                      style={{ 
                                        backgroundImage: `url(${item.img})`
                                      }}
                                    >
                                      <div className="coming-soon">{item.feature}</div>
                                    </div>
                                    <div className="card-title">
                                        <h5 className="style2"><Link to="/item-details-01">{item.nameAuthor}</Link></h5>
                                        <div className="contacts">
                                          <a href={`https://wa.me/${item.phoneNumber}`} className="contact-email">
                                            <i class="fab fa-whatsapp"></i>
                                          </a>
                                          <a href='' className="contact-phone">
                                            <i class="fab fa-telegram"></i>
                                          </a>
                                        </div>
                                        {/* <div className="tags">{item.tags}</div> */}
                                    </div>
                                    <div className="meta-info">
                                        <div className="author">
                                            <div className="avatar" style={{ backgroundImage: `url(${item.imgAuthor})`}} />
                                            <div className="info">
                                                {/* <span>{item.ethnicity}</span> */}
                                                <h6>{item.ethnicity}</h6>
                                            </div>
                                        </div>
                                        <div className="price">
                                            {/* <span>Current Bid</span> */}
                                            <h5> {item.age} Years Old</h5>
                                        </div>
                                    </div>
                                    <div className="card-bottom">
                                        {/* <button className="sc-button style bag fl-button pri-3 no-bg" onClick={() => setModalShow(true)}><span>Place Bid</span></button> */}
                                        {/* <Link to="/activity-01" className="view-history reload">View History</Link> */}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    {
                        visible < data.length && 
                        <div className="col-md-12 wrap-inner load-more text-center"> 
                            <Link to="#" id="load-more" className="sc-button loadmore fl-button pri-3" onClick={showMoreItems}><span>Load More</span></Link>
                        </div>
                    }
                </div>
            </div>
        </section>
        <CardModal
        show={modalShow}
        onHide={() => setModalShow(false)}
         />
        </Fragment>
    );
}



TodayPicks.propTypes = {
    data: PropTypes.array.isRequired,
}


export default TodayPicks;
