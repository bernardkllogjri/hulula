import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import logodark from '../../assets/images/logo/logo_dark.png'
import logofooter from '../../assets/images/logo/logo2.png'
import { t } from '../../utils';

const Footer = () => {
  const accountList = [
    {
      title: t('global.girls'),
      link: "/explore"
    },
    {
      title: t('global.trans'),
      link: "/explore"
    },
    {
      title: t('global.filters'),
      link: "/explore"
    }
  ]
  const resourcesList = [
    {
      title: t('global.workingTicino'),
      link: "#"
    },
    {
      title: t('global.termsConditions'),
      link: "/Terms-and-conditions_IT.html"
    },
    {
      title: t('global.privacy'),
      link: "#"
    }
  ]
  const companyList = [
    {
      title: t('global.faq'),
      link: "#"
    },
    {
      title: t('global.helpSupport'),
      link: "#"
    },
    {
      title: t('global.discover'),
      link: "#"
    }
  ]
  const socialList = [
    {
      icon: "fab fa-twitter",
      link: "#"
    },
    {
      icon: "fab fa-facebook",
      link: "#"
    },
    {
      icon: "fab fa-telegram-plane",
      link: "#"
    },
    {
      icon: "fab fa-youtube",
      link: "#"
    },
    {
      icon: "icon-fl-tik-tok-2",
      link: "#"
    },
    {
      icon: "icon-fl-vt",
      link: "#"
    },


  ]

  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);


  return (
    <div>
      <footer id="footer" className="footer-light-style clearfix bg-style">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-lg-3 col-md-12 col-12">
              <div className="widget widget-logo">
                <div className="logo-footer" id="logo-footer">
                  <Link to="/">
                    <img className='logo-dark' id="logo_footer" src={logodark} alt="nft-gaming" />
                    <img className='logo-light' id="logo_footer" src={logofooter} alt="nft-gaming" />

                  </Link>
                </div>
                <p className="sub-widget-logo">Lorem ipsum dolor sit amet,consectetur adipisicing elit. Quis non, fugit totam vel laboriosam vitae.</p>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-5 col-5">
              <div className="widget widget-menu style-1">
                <h5 className="title-widget">{t('global.myAccount')}</h5>
                <ul>
                  {
                    accountList.map((item, index) => (
                      <li key={index}><Link to={item.link}>{item.title}</Link></li>
                    ))
                  }
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-7 col-7">
              <div className="widget widget-menu style-2">
                <h5 className="title-widget">{t('global.resources')}</h5>
                <ul>
                  {
                    resourcesList.map((item, index) => (
                      <li key={index}>{index === 1 ? <a href={item.link}>{item.title}</a> : <Link to={item.link}>{item.title}</Link>}</li>
                    ))
                  }
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-5 col-5">
              <div className="widget widget-menu fl-st-3">
                <h5 className="title-widget">{t('global.company')}</h5>
                <ul>
                  {
                    companyList.map((item, index) => (
                      <li key={index}><Link to={item.link}>{item.title}</Link></li>
                    ))
                  }
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-7 col-12">
              <div className="widget widget-subcribe">
                <a href='#'>
                  <h5 className="title-widget">{t('global.subscribeUs')}</h5>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {
        isVisible &&
        <Link onClick={scrollToTop} to='#' id="scroll-top"></Link>
      }

      <div className="modal fade popup" id="popup_bid" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <div className="modal-body space-y-20 pd-40">
              <h3>Place a Bid</h3>
              <p className="text-center">You must bid at least <span className="price color-popup">4.89 ETH</span>
              </p>
              <input type="text" className="form-control"
                placeholder="00.00 ETH" />
              <p>Enter quantity. <span className="color-popup">5 available</span>
              </p>
              <input type="number" className="form-control" placeholder="1" />
              <div className="hr"></div>
              <div className="d-flex justify-content-between">
                <p> You must bid at least:</p>
                <p className="text-right price color-popup"> 4.89 ETH </p>
              </div>
              <div className="d-flex justify-content-between">
                <p> Service free:</p>
                <p className="text-right price color-popup"> 0,89 ETH </p>
              </div>
              <div className="d-flex justify-content-between">
                <p> Total bid amount:</p>
                <p className="text-right price color-popup"> 4 ETH </p>
              </div>
              <Link to="#" className="btn btn-primary" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close"> Place a bid</Link>
            </div>
          </div>
        </div>
      </div>

    </div>

  );
}

export default Footer;
