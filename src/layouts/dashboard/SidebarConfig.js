import { Icon } from '@iconify/react';
// import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
// import peopleFill from '@iconify/icons-eva/people-fill';
// import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
// import fileTextFill from '@iconify/icons-eva/file-text-fill';
// import lockFill from '@iconify/icons-eva/lock-fill';
import pinFill from '@iconify/icons-eva/pin-fill';
import cubeFill from '@iconify/icons-eva/cube-fill';
import flashFill from '@iconify/icons-eva/flash-fill';
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
    title: 'museum',
    path: '/dashboard/museums',
    icon: getIcon(pinFill)
  },
  {
    title: 'target-image',
    path: '/dashboard/target-images',
    icon: getIcon(flashFill)
  },
  {
    title: 'ar-model',
    path: '/dashboard/ar-models',
    icon: getIcon(cubeFill)
  }
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
