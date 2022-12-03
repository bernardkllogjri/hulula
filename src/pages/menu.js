import { t } from '../utils'

const menus = [
    {
        id: 1,
        name: t('global.home'),
        links: '/',
        // namesub: [
        //     {
        //         id: 1,
        //         sub: 'Home 01',
        //         links: '/'
        //     },
        //     {
        //         id: 2,
        //         sub: 'Home 02',
        //         links: '/home-02'
        //     },
        //     {
        //         id: 3,
        //         sub: 'Home 03',
        //         links: '/home-03'
        //     },
        //     {
        //         id: 4,
        //         sub: 'Home 04',
        //         links: '/home-04'
        //     },
        //     {
        //         id: 5,
        //         sub: 'Home 05',
        //         links: '/home-05'
        //     },
        //     {
        //         id: 6,
        //         sub: 'Home 06',
        //         links: '/home-06'
        //     },
        //     {
        //         id: 7,
        //         sub: 'Home 07',
        //         links: '/home-07'
        //     },
        //     {
        //         id: 8,
        //         sub: 'Home 08 (Special)',
        //         links: '/home-08'
        //     },
        // ]
    },
    {
      id: 2,
      name: t('global.info'),
      namesub: [
        {
            id: 1,
            sub: t('global.termsConditions'),
            links: '/'
        },
        // {
        //     id: 2,
        //     sub: 'Explore 02',
        //     links: '/'
        // },
        {
            id: 3,
            sub: t('global.privacy'),
            links: '/'
        },
        {
            id: 4,
            sub: t('global.workingTicino'),
            links: '/'
        },
      ]
    },
    // {
    //     id: 3,
    //     name: 'Explore',
    //     links: '/explore',
    //     // namesub: [
    //         // {
    //         //     id: 1,
    //         //     sub: 'Explore 01',
    //         //     links: '/explore'
    //         // },
    //         // {
    //         //     id: 2,
    //         //     sub: 'Explore 02',
    //         //     links: '/explore-02'
    //         // },
    //         // {
    //         //     id: 3,
    //         //     sub: 'Explore 03',
    //         //     links: '/explore-03'
    //         // },
    //         // {
    //         //     id: 4,
    //         //     sub: 'Explore 04',
    //         //     links: '/explore-04'
    //         // },
    //         // {
    //         //     id: 5,
    //         //     sub: 'Live Auctions',
    //         //     links: '/live-auctions'
    //         // },
    //         // {
    //         //     id: 6,
    //         //     sub: 'Item Details 01',
    //         //     links: '/item-details-01'
    //         // },
    //         // {
    //         //     id: 7,
    //         //     sub: 'Item Details 02',
    //         //     links: '/item-details-02'
    //         // }
    //     // ],
    // },
    {
      id: 4,
      name: t('global.girls'),
      links: '/explore',
    },
    {
      id: 5,
      name: t('global.filters'),
      // links: '/activity-01',
      links: '/explore',
      // namesub: [
          // {
          //     id: 1,
          //     sub: 'Activity 01',
          //     links: '/activity-01'
          // },
          // {
          //     id: 2,
          //     sub: 'Activity 02',
          //     links: '/activity-02'
          // }
      // ],
    },
    {
      id: 6,
      name: t('global.reviews'),
      links: '/',
    },
    {
      id: 7,
      name: t('global.login'),
      links: '/login',
    },
    {
      id: 8,
      name: t('global.signUp'),
      links: '/sign-up',
    },
    {
      id: 9,
      name: t('global.logout'),
      links: '#',
    },
    // {
    //     id: 5,
    //     name: 'About',
    //     links: '#'
    // },
    // {
    //     id: 7,
    //     name: 'Contact',
    //     links: '/contact-01'
    // },
    
]

export default menus;