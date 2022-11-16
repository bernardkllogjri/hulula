import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import TodayPicks from '../components/layouts/explore-01/TodayPicks'
import todayPickData from '../assets/fake-data/data-today-pick';
import client from '../client'

const Explore01 = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    const fn = async () => {
      const result = await client.get('/profile')
      setData(result.data?.data?.users?.map(item => {
          return {
            img: item?.Galleries?.[0]?.image,
            imgCollection: item?.Galleries?.[0]?.image,
            imgAuthor: item?.Profile?.image,
            title: "Displayed Text",
            tags: "Contact",
            nameAuthor: item?.firstName + item?.lastName,
            age: item?.age,
            ethnicity: item?.Profile?.nationality,
          }
        }))
    }
    fn()
  }, [])

    return (
        <div>
            <Header />
            <section className="flat-title-page inner">
                <div className="overlay"></div>
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title-heading mg-bt-12">
                                <h1 className="heading text-center">Explore Match</h1>
                            </div>
                            <div className="breadcrumbs style2">
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="#">Explore</Link></li>
                                    <li>Explore</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>                    
            </section>
            <TodayPicks data={data} />
            <Footer />
        </div>
    );
}


export default Explore01;
