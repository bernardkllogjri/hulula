import React, { useEffect } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import heroSliderData from '../assets/fake-data/data-slider';
import Slider from '../components/slider/Slider';
import liveAuctionData from '../assets/fake-data/data-live-auction';
import LiveAuction from '../components/layouts/LiveAuction';
import TopSeller from '../components/layouts/TopSeller';
import topSellerData from '../assets/fake-data/data-top-seller'
import TodayPicks from '../components/layouts/TodayPicks';
import todayPickData from '../assets/fake-data/data-today-pick';
import PopularCollection from '../components/layouts/PopularCollection';
import popularCollectionData from '../assets/fake-data/data-popular-collection';
import Create from '../components/layouts/Create';
import { useState } from 'react';
import client from '../client';

const Home01 = () => {
  const [data, setData] = useState({})
  useEffect(() => {
    const fn = async () => {
      const result = await client.get('/profile')
      setData({
        liveAuctionData: result.data.data.users.map(item => {
          return {
            id: item.id,
            img: 'https://164.92.156.222' + item?.Galleries?.[0]?.image.replace('/root/hulula_backend/src/public', ''),
            imgCollection: 'https://164.92.156.222' + item?.Galleries?.[0]?.image.replace('/root/hulula_backend/src/public', ''),
            imgAuthor: 'https://164.92.156.222' + item?.Profile?.image.replace('/root/hulula_backend/src/public', ''),
            title: "Displayed Text",
            tags: "Contact",
            nameAuthor: item?.firstName + " " + item?.lastName,
            age: item?.age,
            ethnicity: item?.Profile?.nationality,
          }
        }),
        topSellerData: result.data.data.users.map(item => {
          return {
            img: item?.Profile?.image.replace('/root/hulula_backend/src/public', ''),
            name: item?.firstName + " " + item?.lastName,
            classPadding: ""
          }
        }),
        popularCollectionData: result.data.data.users.map(item => {
          return {
            title: item.firstName + item.lastName,
            imgAuthor: 'https://164.92.156.222' + item?.Profile?.image.replace('/root/hulula_backend/src/public', ''),
            nationality: "Nationality",
            imgleft: 'https://164.92.156.222' + item?.Galleries?.[0]?.image.replace('/root/hulula_backend/src/public', ''),
            imgright1: 'https://164.92.156.222' + item?.Galleries?.[1]?.image.replace('/root/hulula_backend/src/public', ''),
            imgright2: 'https://164.92.156.222' + item?.Galleries?.[2]?.image.replace('/root/hulula_backend/src/public', ''),
            imgright3: 'https://164.92.156.222' + item?.Galleries?.[3]?.image.replace('/root/hulula_backend/src/public', ''),
            imgright4: 'https://164.92.156.222' + item?.Galleries?.[4]?.image.replace('/root/hulula_backend/src/public', ''),
            imgtop: 'https://164.92.156.222' + item?.Profile?.image.replace('/root/hulula_backend/src/public', ''),
            wishlist: "100",
            count: '12 item products',
            tags: 'Contact',
          }
        })
      })
    }
    fn()
  }, [])


    return (
        <div className='home-1'>
            <Header />
            <Slider data={heroSliderData} />
            <LiveAuction data={data.liveAuctionData || []} />
            <TopSeller data={data.topSellerData || []} />
            <TodayPicks data={data.liveAuctionData || []} />
            <PopularCollection data={data.popularCollectionData || []} />
            {/* <Create /> */}
            <Footer />
        </div>
    );
}

export default Home01;
