import React, { useEffect } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import heroSliderData from '../assets/fake-data/data-slider';
import Slider from '../components/slider/Slider';
import LiveAuction from '../components/layouts/LiveAuction';
import TopSeller from '../components/layouts/TopSeller';
import TodayPicks from '../components/layouts/TodayPicks';
import PopularCollection from '../components/layouts/PopularCollection';
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
            img: 'http://164.92.156.222' + item?.Galleries?.[0]?.image.replace('/root/hulula_backend/src/public', ''),
            imgCollection: 'http://164.92.156.222' + item?.Galleries?.[0]?.image.replace('/root/hulula_backend/src/public', ''),
            imgAuthor: 'http://164.92.156.222' + item?.Profile?.image.replace('/root/hulula_backend/src/public', ''),
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
            imgAuthor: 'http://164.92.156.222' + item?.Profile?.image.replace('/root/hulula_backend/src/public', ''),
            nationality: "Nationality",
            imgleft: 'http://164.92.156.222' + item?.Galleries?.[0]?.image.replace('/root/hulula_backend/src/public', ''),
            imgright1: 'http://164.92.156.222' + item?.Galleries?.[1]?.image.replace('/root/hulula_backend/src/public', ''),
            imgright2: 'http://164.92.156.222' + item?.Galleries?.[2]?.image.replace('/root/hulula_backend/src/public', ''),
            imgright3: 'http://164.92.156.222' + item?.Galleries?.[3]?.image.replace('/root/hulula_backend/src/public', ''),
            imgright4: 'http://164.92.156.222' + item?.Galleries?.[4]?.image.replace('/root/hulula_backend/src/public', ''),
            imgtop: 'http://164.92.156.222' + item?.Profile?.image.replace('/root/hulula_backend/src/public', ''),
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
