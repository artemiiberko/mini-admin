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
    icon: getIcon(peopleFill),
    children: [
      { title: 'EPC Video', path: 'epcvideo' },
      { title: 'Agenda Docs', path: 'agendadocs' },
      { title: 'Media Partners', path: 'mediapartners' },
      { title: 'Guest Speech Docs', path: 'guestspeechdocs' }
    ]
  },
  {
    title: 'informations',
    path: '/informations',
    icon: getIcon(infoFill),
    children: [
      { title: 'About ADSD', path: 'aboutadsd' },
      { title: 'About Us', path: 'aboutus' },
      { title: 'EPC Contact', path: 'epccontact' },
      { title: 'Event Registration', path: 'eventregistration' },
      { title: 'Dinner', path: 'dinner' },
      { title: 'Map', path: 'map' },
      { title: 'Abu Dhabi Attractions', path: 'abudhabiattractions' },
      { title: 'ADSD Helpdesk', path: 'adsdheldesk' },
      { title: 'WIFI Credentials', path: 'wificredentials' },
      { title: 'How to use the Mic', path: 'howtousethemic' },
      { title: 'Social Media Links', path: 'socialmedialinks' },
      { title: 'Code of Conduct', path: 'codeofconduct' },
      { title: 'Partners', path: 'partners' },
      { title: 'App Version', path: 'appversion' }
    ]
  }
];

export default sidebarConfig;
