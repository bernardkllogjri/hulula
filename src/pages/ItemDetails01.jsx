import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { Link } from 'react-router-dom';
import Countdown from "react-countdown";
import { Tab, Tabs, TabList, TabPanel  } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import liveAuctionData from '../assets/fake-data/data-live-auction';
import LiveAuction from '../components/layouts/LiveAuction';
import img1 from '../assets/images/avatar/avt-3.jpg'
import img2 from '../assets/images/avatar/avt-11.jpg'
import img3 from '../assets/images/avatar/avt-1.jpg'
import img4 from '../assets/images/avatar/avt-5.jpg'
import img5 from '../assets/images/avatar/avt-7.jpg'
import img6 from '../assets/images/avatar/avt-8.jpg'
import img7 from '../assets/images/avatar/avt-2.jpg'
import imgdetail1 from '../assets/images/box-item/images-item-details.jpg'
import client from '../client'
import { t } from '../utils';

const ItemDetails01 = () => {
    const location = useLocation()
    const { state } = location || {}
    const { id } = state || {}
    const [data, setData] = useState({})
    useEffect(() => {
      const fn = async () => {
        const result = await client.get('/profile')
        setData({
          user: result.data?.data?.users?.find(r => r.id === id),
          liveAuctionData: result.data?.data?.users.map(item => {
            return {
              id: item.id,
              img: item?.Galleries?.[0]?.image,
              imgCollection: item?.Galleries?.[0]?.image,
              imgAuthor: item?.Profile?.image,
              title: "Displayed Text",
              tags: t('global.contact'),
              nameAuthor: item?.firstName + item?.lastName,
              age: item?.Profile?.age,
              ethnicity: item?.Profile?.nationality,
            }
          })
        })
      }
      fn()
    }, [id])

    const [dataHistory] = useState(
        [
            {
                img: img1,
                name:"Mason Woodward",
                time: "8 hours ago",
                price: "4.89 ETH",
                priceChange: "$12.246"
            },
            {
                img: img2,
                name:"Mason Woodward",
                time: "at 06/10/2021, 3:20 AM",
                price: "4.89 ETH",
                priceChange: "$12.246"
            },
            {
                img: img3,
                name:"Mason Woodward",
                time: "8 hours ago",
                price: "4.89 ETH",
                priceChange: "$12.246"
            },
            {
                img: img4,
                name:"Mason Woodward",
                time: "8 hours ago",
                price: "4.89 ETH",
                priceChange: "$12.246"
            },
            {
                img: img5,
                name:"Mason Woodward",
                time: "8 hours ago",
                price: "4.89 ETH",
                priceChange: "$12.246"
            },
            {
                img: img6,
                name:"Mason Woodward",
                time: "8 hours ago",
                price: "4.89 ETH",
                priceChange: "$12.246"
            },
        ]
    )

    return (
        <div className='item-details'>
            <Header />
            <div className="tf-section tf-item-details">
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-xl-6 col-md-12">
                            <div className="content-left">
                                <div className="media">
                                    <img src={data?.user?.Galleries?.[0]?.image} alt="Hulula" />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-md-12">
                            <div className="content-right">
                                <div className="sc-item-details">
                                    <h2 className="style2">???{data?.user?.firstName} {data?.user?.lastName}???</h2>
                                    <div className="meta-item">
                                        <div className="left">
                                            <span className="viewed eye">225</span>
                                            {/* <span to="/login" className="liked heart wishlist-button mg-l-8"><span className="number-like">100</span></span> */}
                                        </div>
                                        {/* <div className="right">
                                            <Link to="#" className="share"></Link>
                                            <Link to="#" className="option"></Link>
                                        </div> */}
                                    </div>
                                    <p>{data?.user?.Profile?.description}</p>
                                    <div className="d-flex justify-content-between" style={{ marginTop: '10px' }}>
                                      <Link to="/wallet-connect" className="sc-button header-slider style style-1 wallet fl-button pri-1" style={{ width: '50%' }}>
                                        <span>Call her now</span>
                                      </Link>
                                      <Link to="/wallet-connect" className="sc-button header-slider style style-1 wallet fl-button pri-1" style={{ width: '50%', marginLeft: '10px' }}>
                                        <span>Message</span>
                                      </Link>
                                    </div>
                                    {/* <div className="client-infor sc-card-product">
                                        <div className="meta-info">
                                            <div className="author">
                                                <div className="avatar">
                                                    <img src={img6} alt="Hulula" />
                                                </div>
                                                <div className="info">
                                                    <span>Owned By</span>
                                                    <h6> <Link className='btn btn-primary-outline' to="/author-02">Call her now</Link> </h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="meta-info">
                                            <div className="author">
                                                <div className="avatar">
                                                    <img src={img7} alt="Hulula" />
                                                </div>
                                                <div className="info">
                                                    <span>Create By</span>
                                                    <h6> <Link to="/author-02">Freddie Carpenter</Link> </h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                    {/* <div className="meta-item-details style2">
                                        <div className="item meta-price">
                                            <span className="heading">Current Bid</span>
                                            <div className="price">
                                                <div className="price-box">
                                                    <h5> 4.89 ETH</h5>
                                                    <span>= $12.246</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item count-down">
                                            <span className="heading style-2">Countdown</span>
                                            <Countdown date={Date.now() + 500000000}>
                                                <span>You are good to go!</span>
                                            </Countdown>
                                        </div>
                                    </div> */}
                                    {/* <Link to="/wallet-connect" className="sc-button loadmore style bag fl-button pri-3"><span>Place a bid</span></Link> */}
                                    {/* <div className="flat-tabs themesflat-tabs">
                                    <Tabs>
                                        <TabList>
                                        <Tab>Bid History</Tab>
                                        <Tab>Info</Tab>
                                        <Tab>Provenance</Tab>
                                        </TabList>

                                        <TabPanel>
                                            <ul className="bid-history-list">
                                            {
                                                dataHistory.map((item, index) => (
                                                    <li key={index} item={item}>
                                                        <div className="content">
                                                            <div className="client">
                                                                <div className="sc-author-box style-2">
                                                                    <div className="author-avatar">
                                                                        <Link to="#">
                                                                            <img src={item.img} alt="Hulula" className="avatar" />
                                                                        </Link>
                                                                        <div className="badge"></div>
                                                                    </div>
                                                                    <div className="author-infor">
                                                                        <div className="name">
                                                                            <h6><Link to="/author-02">{item.name} </Link></h6> <span> place a bid</span>
                                                                        </div>
                                                                        <span className="time">{item.time}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="price">
                                                                <h5>{item.price}</h5>
                                                                <span>= {item.priceChange}</span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))
                                            }
                                            </ul>
                                        </TabPanel>
                                        <TabPanel>
                                            <ul className="bid-history-list">
                                                    <li>
                                                        <div className="content">
                                                            <div className="client">
                                                                <div className="sc-author-box style-2">
                                                                    <div className="author-avatar">
                                                                        <Link to="#">
                                                                            <img src={img1} alt="Hulula" className="avatar" />
                                                                        </Link>
                                                                        <div className="badge"></div>
                                                                    </div>
                                                                    <div className="author-infor">
                                                                        <div className="name">
                                                                            <h6> <Link to="/author-02">Mason Woodward </Link></h6> <span> place a bid</span>
                                                                        </div>
                                                                        <span className="time">8 hours ago</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                            </ul>
                                        </TabPanel>
                                        <TabPanel>
                                            <div className="provenance">
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                                    when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                                                    It has survived not only five centuries, but also the leap into electronic typesetting, 
                                                    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                                                    and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                            </div>
                                        </TabPanel>
                                    </Tabs>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <LiveAuction data={data.liveAuctionData || []} />
            <Footer />
        </div>
    );
}

export default ItemDetails01;
