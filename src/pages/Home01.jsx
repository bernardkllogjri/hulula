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

      console.warn({ result })

      setData({
        liveAuctionData: result?.data?.data?.users?.map(item => {
          return {
            id: item.id,
            img: 'https://huladtla.com' + item?.Galleries?.[0]?.image?.replace('/root/hulula_backend/src/public', ''),
            imgCollection: 'https://huladtla.com' + item?.Galleries?.[0]?.image?.replace('/root/hulula_backend/src/public', ''),
            imgAuthor: 'https://huladtla.com' + item?.Profile?.image?.replace('/root/hulula_backend/src/public', ''),
            title: "Displayed Text",
            tags: "Contact",
            nameAuthor: item?.firstName + " " + item?.lastName,
            age: item?.age,
            ethnicity: item?.Profile?.nationality,
          }
        }),
        topSellerData: result?.data?.data?.users?.map(item => {
          return {
            img: item?.Profile?.image?.replace('/root/hulula_backend/src/public', ''),
            name: item?.firstName + " " + item?.lastName,
            classPadding: ""
          }
        }),
        popularCollectionData: result?.data?.data?.users?.map(item => {
          return {
            title: item.firstName + item.lastName,
            imgAuthor: 'https://huladtla.com' + item?.Profile?.image?.replace('/root/hulula_backend/src/public', ''),
            nationality: "Nationality",
            imgleft: 'https://huladtla.com' + item?.Galleries?.[0]?.image?.replace('/root/hulula_backend/src/public', ''),
            imgright1: 'https://huladtla.com' + item?.Galleries?.[1]?.image?.replace('/root/hulula_backend/src/public', ''),
            imgright2: 'https://huladtla.com' + item?.Galleries?.[2]?.image?.replace('/root/hulula_backend/src/public', ''),
            imgright3: 'https://huladtla.com' + item?.Galleries?.[3]?.image?.replace('/root/hulula_backend/src/public', ''),
            imgright4: 'https://huladtla.com' + item?.Galleries?.[4]?.image?.replace('/root/hulula_backend/src/public', ''),
            imgtop: 'https://huladtla.com' + item?.Profile?.image?.replace('/root/hulula_backend/src/public', ''),
            wishlist: "100",
            count: '12 item products',
            tags: 'Contact',
          }
        })
      })

      console.warn({
        liveAuctionData: result.data.data.users.map(item => {
          return {
            id: item.id,
            img: 'https://huladtla.com' + item?.Galleries?.[0]?.image?.replace('/root/hulula_backend/src/public', ''),
            imgCollection: 'https://huladtla.com' + item?.Galleries?.[0]?.image?.replace('/root/hulula_backend/src/public', ''),
            imgAuthor: 'https://huladtla.com' + item?.Profile?.image?.replace('/root/hulula_backend/src/public', ''),
            title: "Displayed Text",
            tags: "Contact",
            nameAuthor: item?.firstName + " " + item?.lastName,
            age: item?.age,
            ethnicity: item?.Profile?.nationality,
          }
        }),
        topSellerData: result.data.data.users.map(item => {
          return {
            img: item?.Profile?.image?.replace('/root/hulula_backend/src/public', ''),
            name: item?.firstName + " " + item?.lastName,
            classPadding: ""
          }
        }),
        popularCollectionData: result.data.data.users.map(item => {
          return {
            title: item.firstName + item.lastName,
            imgAuthor: 'https://huladtla.com' + item?.Profile?.image?.replace('/root/hulula_backend/src/public', ''),
            nationality: "Nationality",
            imgleft: 'https://huladtla.com' + item?.Galleries?.[0]?.image?.replace('/root/hulula_backend/src/public', ''),
            imgright1: 'https://huladtla.com' + item?.Galleries?.[1]?.image?.replace('/root/hulula_backend/src/public', ''),
            imgright2: 'https://huladtla.com' + item?.Galleries?.[2]?.image?.replace('/root/hulula_backend/src/public', ''),
            imgright3: 'https://huladtla.com' + item?.Galleries?.[3]?.image?.replace('/root/hulula_backend/src/public', ''),
            imgright4: 'https://huladtla.com' + item?.Galleries?.[4]?.image?.replace('/root/hulula_backend/src/public', ''),
            imgtop: 'https://huladtla.com' + item?.Profile?.image?.replace('/root/hulula_backend/src/public', ''),
            wishlist: "100",
            count: '12 item products',
            tags: 'Contact',
          }
        })
      });
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
