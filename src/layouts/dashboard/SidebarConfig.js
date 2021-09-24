import { Icon } from '@iconify/react';
// import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
// import peopleFill from '@iconify/icons-eva/people-fill';
// import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
// import fileTextFill from '@iconify/icons-eva/file-text-fill';
// import lockFill from '@iconify/icons-eva/lock-fill';
// import pinFill from '@iconify/icons-eva/pin-fill';
// import gridFill from '@iconify/icons-eva/grid-fill';
import homeFill from '@iconify/icons-eva/home-fill';
// import cubeFill from '@iconify/icons-eva/cube-fill';
// import flashFill from '@iconify/icons-eva/flash-fill';
// import personAddFill from '@iconify/icons-eva/person-add-fill';
// import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  // {
  //   title: 'dashboard',
  //   path: '/dashboard/app',
  //   icon: getIcon(pieChart2Fill)
  // },
  // {
  //   title: 'user',
  //   path: '/dashboard/user',
  //   icon: getIcon(peopleFill)
  // },
  {
    title: 'home',
    path: '/dashboard/app',
    icon: getIcon(homeFill)
  },
  // {
  //   title: 'country',
  //   path: '/dashboard/country',
  //   icon: getIcon(pinFill)
  // },
  // {
  //   title: 'region',
  //   path: '/dashboard/region',
  //   icon: getIcon(pinFill)
  // },
  // {
  //   title: 'city',
  //   path: '/dashboard/city',
  //   icon: getIcon(pinFill)
  // },
  // {
  //   title: 'user',
  //   path: '/dashboard/user',
  //   icon: getIcon(peopleFill)
  // },
  // {
  //   title: 'forms',
  //   path: '/dashboard/forms',
  //   icon: getIcon(gridFill)
  // },
  // {
  //   title: 'categories',
  //   path: '/dashboard/category',
  //   icon: getIcon(gridFill)
  // }
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: getIcon(fileTextFill)
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon(lockFill)
  // },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon(personAddFill)
  // }
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon(alertTriangleFill)
  // }
];

export default sidebarConfig;
