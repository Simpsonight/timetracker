// assets
// import { IconDashboard, IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';
// // constant
// const icons = {
//     IconTypography,
//     IconPalette,
//     IconShadow,
//     IconWindmill,
// };

const menuItems = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'group',
        children: [
            {
                id: 'default',
                title: 'Dashboard',
                type: 'item',
                url: '/',
                icon: '',
                breadcrumbs: false,
            },
        ],
    },
    {
        id: 'analyses',
        title: 'Analyses',
        type: 'group',
        children: [
            {
                id: 'default',
                title: 'Timesheet',
                type: 'item',
                url: '/timesheet',
                icon: '',
                breadcrumbs: false,
            },
        ],
    },
    {
        id: 'admin',
        title: 'Admin',
        caption: 'Settings',
        type: 'group',
        children: [
            {
                id: 'customers',
                title: 'Customers',
                type: 'item',
                url: '/customers',
                icon: '',
                breadcrumbs: false,
            },
            {
                id: 'jobs',
                title: 'Jobs',
                type: 'item',
                url: '/jobs',
                icon: '',
                breadcrumbs: false,
            },
        ],
    },
];

export default menuItems;
