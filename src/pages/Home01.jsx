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
import { parsePhoneNumber } from 'react-phone-number-input';
import { t } from '../utils';

const Home01 = () => {
  const [data, setData] = useState({})
  useEffect(() => {
    const fn = async () => {
      const result = await client.get('/profile')
 
      setData({
        liveAuctionData: result?.data?.data?.users?.map(item => {
          const phoneNumber = item.phoneNumber ? parsePhoneNumber(item.phoneNumber) : {}
          console.warn({ op: item?.Galleries?.[0]?.image });
          return {
            id: item.id,
            phoneNumber: phoneNumber?.nationalNumber ? phoneNumber?.countryCallingCode + phoneNumber?.nationalNumber : undefined,
            img: item?.Galleries?.[0]?.image,
            imgCollection: item?.Galleries?.[0]?.image,
            imgAuthor: item?.Profile?.image,
            title: "Displayed Text",
            tags: t('global.contact'),
            nameAuthor: item?.firstName + " " + item?.lastName,
            age: item?.Profile?.age,
            ethnicity: item?.Profile?.nationality,
          }
        }),
        topSellerData: result?.data?.data?.users?.map(item => {
          return {
            img: item?.Profile?.image,
            name: item?.firstName + " " + item?.lastName,
            classPadding: ""
          }
        }),
        popularCollectionData: result?.data?.data?.users?.map(item => {
          return {
            id: item.id,
            title: item.firstName + ' ' + item.lastName,
            imgAuthor: item?.Profile?.image,
            nationality: t('global.nationality'),
            imgleft: item?.Galleries?.[0]?.image,
            imgright1: item?.Galleries?.[1]?.image,
            imgright2: item?.Galleries?.[2]?.image,
            imgright3: item?.Galleries?.[3]?.image,
            imgright4: item?.Galleries?.[4]?.image,
            imgtop: item?.Profile?.image,
            wishlist: "100",
            count: '12 item products',
            tags: t('global.contact'),
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
