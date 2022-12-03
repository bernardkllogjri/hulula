import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import CardModal from "../CardModal";
import { Dropdown } from "react-bootstrap";
import { t } from "../../../utils";

const TodayPicks = (props) => {
  const data = props.data;

  const [visible, setVisible] = useState(8);
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 4);
  };

  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate()

  return (
    <Fragment>
      <section className="tf-section sc-explore-1">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="wrap-box explore-1 flex">
                <div className="seclect-box style-1">
                  <div id="item_category" className="dropdown">
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-basic">
                        {t('global.girls')}
                      </Dropdown.Toggle>

                      <Dropdown.Menu style={{ margin: 0 }}>
                        <Dropdown.Item href="#">{t('global.bio')}</Dropdown.Item>
                        <Dropdown.Item href="#">New joiners</Dropdown.Item>
                        <Dropdown.Item href="#">{t('homepage.models.mostVisited')}</Dropdown.Item>
                        <Dropdown.Item href="#">Superstar models ( Best rated )</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  {/* <div id="buy" className="dropdown">
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-basic">
                        Buy Now
                      </Dropdown.Toggle>

                      <Dropdown.Menu style={{ margin: 0 }}>
                        <Dropdown.Item href="#">On Auction</Dropdown.Item>
                        <Dropdown.Item href="#">Has Offers</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div> */}
                  <div id="all-items" className="dropdown">
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-basic">
                        {t('global.trans')}:
                      </Dropdown.Toggle>

                      <Dropdown.Menu style={{ margin: 0 }}>
                        <Dropdown.Item href="#">New joiners</Dropdown.Item>
                        <Dropdown.Item href="#">{t('homepage.models.mostVisited')}</Dropdown.Item>
                        <Dropdown.Item href="#">Superstar models ( Best rated )</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                {/* <div className="seclect-box style-2 box-right">
                  <div id="artworks" className="dropdown">
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-basic">
                        All Artworks
                      </Dropdown.Toggle>

                      <Dropdown.Menu style={{ margin: 0 }}>
                        <Dropdown.Item href="#">Abstraction</Dropdown.Item>
                        <Dropdown.Item href="#">Skecthify</Dropdown.Item>
                        <Dropdown.Item href="#">Patternlicious</Dropdown.Item>
                        <Dropdown.Item href="#">Virtuland</Dropdown.Item>
                        <Dropdown.Item href="#">Papercut</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div id="sort-by" className="dropdown">
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-basic">
                        Sort by
                      </Dropdown.Toggle>

                      <Dropdown.Menu style={{ margin: 0 }}>
                        <Dropdown.Item href="#">Top rate</Dropdown.Item>
                        <Dropdown.Item href="#">Mid rate</Dropdown.Item>
                        <Dropdown.Item href="#">Low rate</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div> */}
              </div>
            </div>
            {data.slice(0, visible)?.map((item, index) => (
              <div
                key={index}
                className="fl-item col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6"
                style={{
                  paddingLeft: '4px',
                  paddingRight: '4px'
                }}
              >
                <div
                  className={`sc-card-product ${
                    item.feature ? "comingsoon" : ""
                  } `}
                >
                  {/* <Link to="/login" className="wishlist-button heart">
                    <span className="number-like">{item.wishlist}</span>
                  </Link> */}
                  <div
                    onClick={() => {
                      navigate('/item-details-01', { state: { id: item.id } })  
                    }}
                    className="card-media"
                    style={{ 
                      backgroundImage: `url(${item.img})`
                    }}
                  >
                    <div className="coming-soon">{item.feature}</div>
                  </div>
                  <div className="card-title">
                    <h5 className="style2">
                      <Link to="/item-details-01">{item.nameAuthor}</Link>
                    </h5>
                    <div className="contacts">
                      <div className="contact-email">
                        <i class="far fa-envelope"></i>
                      </div>
                      <div className="contact-phone">
                        <i class="fas fa-phone-alt"></i>
                      </div>
                    </div>
                  </div>
                  <div className="meta-info">
                    <div className="author">
                      <div className="avatar" style={{ backgroundImage: `url(${item.imgAuthor})` }} />
                      <div className="info">
                        <h6>
                          {" "}
                          <Link to="/authors-02">{item.ethnicity}</Link>{" "}
                        </h6>
                      </div>
                    </div>
                    <div className="price">
                      <span></span>
                      <h5> {item.age} Years Old</h5>
                    </div>
                  </div>
                  <div className="card-bottom">
                    {/* <button
                      onClick={() => setModalShow(true)}
                      className="sc-button style bag fl-button pri-3 no-bg"
                    >
                      <span>Place Bid</span>
                    </button>
                    <Link to="/activity-01" className="view-history reload">
                      View History
                    </Link> */}
                  </div>
                </div>
              </div>
            ))}
            {visible < data.length && (
              <div className="col-md-12 wrap-inner load-more text-center">
                <Link
                  to="#"
                  id="load-more"
                  className="sc-button loadmore fl-button pri-3"
                  onClick={showMoreItems}
                >
                  <span>Load More</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
      <CardModal show={modalShow} onHide={() => setModalShow(false)} />
    </Fragment>
  );
};

TodayPicks.propTypes = {
  data: PropTypes.array.isRequired,
};

export default TodayPicks;
