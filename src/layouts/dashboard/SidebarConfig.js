import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import bellFill from '@iconify/icons-eva/bell-fill';
import bellOutline from '@iconify/icons-eva/bell-outline';
import infoFill from '@iconify/icons-eva/info-fill';
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'attendees',
    path: '/attendees',
    icon: getIcon(peopleFill)
  },
  {
    title: 'agendas',
    path: '/agendas',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'polls',
    path: '/polls',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'notification',
    path: '/notification',
    icon: getIcon(bellFill)
  },
  {
    title: 'bulkmail',
    path: '/bulkmail',
    icon: getIcon(bellOutline)
  },
  {
    title: 'pressroom',
    path: '/pressroom',
    icon: getIcon(peopleFill)
  },
  {
    title: 'informations',
    path: '/informations',
    icon: getIcon(infoFill)
  }
];

export default sidebarConfig;
