import React , { useRef , useState , useEffect } from 'react';
import { Link , useLocation } from "react-router-dom";
import menus from "../../pages/menu";
import DarkMode from './DarkMode';
import logoheader from '../../assets/images/logo/logo.png'
import logoheader2x from '../../assets/images/logo/logo@2x.png'
import logodark from '../../assets/images/logo/logo_dark.png'
import logodark2x from '../../assets/images/logo/logo_dark@2x.png'
import imgsun from '../../assets/images/icon/sun.png'
import avt from '../../assets/images/avatar/avt-2.jpg'
import us from '../../assets/images/flags/US.svg'
import fr from '../../assets/images/flags/FR.svg'


const Header = () => {
    const { pathname } = useLocation();
    const appLanguage = localStorage.getItem('APP_LANGUAGE') || 'EN'

    const headerRef = useRef (null)
    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });
    const isSticky = (e) => {
        const header = document.querySelector('.js-header');
        const scrollTop = window.scrollY;
        scrollTop >= 300 ? header.classList.add('is-fixed') : header.classList.remove('is-fixed');
        scrollTop >= 400 ? header.classList.add('is-small') : header.classList.remove('is-small');
    };

    const menuLeft = useRef(null)
    const btnToggle = useRef(null)
    const btnSearch = useRef(null)

    const menuToggle = () => {
        menuLeft.current.classList.toggle('active');
        btnToggle.current.classList.toggle('active');
    }

    const searchBtn = () => {
        btnSearch.current.classList.toggle('active');
    }

    const [activeIndex, setActiveIndex] = useState(null);
    const handleOnClick = index => {
        setActiveIndex(index); 
    };

    return (
        <header id="header_main" className="header_1 js-header" ref={headerRef}>
            <div className="themesflat-container">
                <div className="row">
                    <div className="col-md-12">                              
                        <div id="site-header-inner"> 
                            <div className="wrap-box flex">
                                <div id="site-logo" className="clearfix">
                                    <div id="site-logo-inner">
                                        <Link to="/" rel="home" className="main-logo">
                                            <img className='logo-dark'  id="logo_header" src={logodark} srcSet={`${logodark2x}`} alt="nft-gaming" />
                                            <img className='logo-light'  id="logo_header" src={logoheader} srcSet={`${logoheader2x}`} alt="nft-gaming" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="mobile-button" ref={btnToggle} onClick={menuToggle}><span></span></div>
                                <nav id="main-nav" className="main-nav" ref={menuLeft} >
                                    <ul id="menu-primary-menu" className="menu">
                                        {
                                            menus.map((data,index) => (
                                                <li key={index} onClick={()=> handleOnClick(index)} className={`menu-item ${data.namesub ? 'menu-item-has-children' : '' } ${activeIndex === index ? 'active' : ''} ` }   >
                                                    <Link to={data.links}>{data.name}</Link>
                                                    {
                                                         data.namesub &&
                                                         <ul className="sub-menu" >
                                                            {
                                                                data.namesub.map((submenu) => (
                                                                    <li key={submenu.id} className={
                                                                        pathname === submenu.links
                                                                        ? "menu-item current-item"
                                                                        : "menu-item"
                                                                    }><Link to={submenu.links}>{submenu.sub}</Link></li>
                                                                ))
                                                            }
                                                        </ul>
                                                    }
                                                    
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </nav>
                                <div className="flat-search-btn flex">
                                    <div className="header-search flat-show-search" id="s1">
                                        <Link to="#" className="show-search header-search-trigger" onClick={searchBtn}>
                                            <i className="far fa-search"></i>
                                        </Link>
                                        <div className="top-search" ref={btnSearch}>
                                            <form action="#" method="get" role="search" className="search-form">
                                                <input type="search" id="s" className="search-field" placeholder="Search..." name="s" title="Search for" required="" />
                                                <button className="search search-submit" type="submit" title="Search">
                                                    <i className="icon-fl-search-filled"></i>
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="sc-btn-top mg-r-12" id="site-header">
                                        <Link to="/" className="sc-button header-slider style style-1 wallet fl-button pri-1"><span>Search
                                        </span></Link>
                                    </div>
                                    <Link to="#" className="show-search header-search-trigger" style={{ fontSize: '16px', fontWeight: 'bold', marginLeft: '8px' }} onClick={() => localStorage.setItem('APP_LANGUAGE', appLanguage === 'EN' ? 'FR' : 'EN')}>
                                      <img src={appLanguage === 'EN' ? fr : us} width='20' /> {appLanguage === 'EN' ? 'FR' : 'EN'} 
                                    </Link>
                                    <Link to="#" className="show-search header-search-trigger" style={{ fontSize: '16px', fontWeight: 'bold', marginLeft: '8px' }}>
                                      <i class="fas fa-phone"></i>
                                    </Link>
                                </div>
                                {/* <nav className="secondary-nav" style={{ position: 'absolute', right: '15px', left: 'initial' }} ref={menuLeft} >
                                  <ul id="menu-primary-menu" className="menu">
                                    <li className="menu-item-has-children active">
                                        <Link to="#">{appLanguage}</Link>
                                        <ul className="sub-menu" >
                                          <li className={"menu-item"}><Link onClick={() => localStorage.setItem('APP_LANGUAGE', appLanguage === 'EN' ? 'FR' : 'EN')} to="#">{appLanguage === 'EN' ? 'FR' : 'EN'}</Link></li>
                                      </ul>
                                    </li>
                                  </ul>
                                </nav> */}
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
            <DarkMode />
        </header>
    );
}

export default Header;
