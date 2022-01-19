import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import DashboardApp from './pages/DashboardApp';
import Agendas from './pages/Agendas';
import Polls from './pages/Polls';
import Attendees from './pages/Attendees';
import NotFound from './pages/Page404';
import Notification from './pages/Notification';
import BulkMail from './pages/Bulkmail';
import Pressroom from './pages/Pressroom';
import Epcvideos from './pages/Epcvideo';
import Agendadocs from './pages/Agendadocs';
import Mediapartners from './pages/Mediapartners';
import Guestspeechdocs from './pages/Guestspeechdocs';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: 'dashboard', element: <DashboardApp /> },
        { path: 'attendees', element: <Attendees /> },
        { path: 'agendas', element: <Agendas /> },
        { path: 'polls', element: <Polls /> },
        { path: 'notification', element: <Notification /> },
        { path: 'bulkmail', element: <BulkMail /> },
        { path: 'pressroom', element: <Pressroom /> },
        { path: '404', element: <NotFound /> }
      ]
    },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: 'aboutadsd', element: <DashboardApp /> },
        { path: 'aboutus', element: <Attendees /> },
        { path: 'epccontact', element: <Agendas /> },
        { path: 'eventregistration', element: <Polls /> },
        { path: 'dinner', element: <Notification /> },
        { path: 'map', element: <BulkMail /> },
        { path: 'abudhabiattractions', element: <Pressroom /> },
        { path: 'adsdheldesk', element: <Pressroom /> },
        { path: 'wificredentials', element: <NotFound /> },
        { path: 'howtousethemic', element: <NotFound /> },
        { path: 'socialmedialinks', element: <NotFound /> },
        { path: 'codeofconduct', element: <NotFound /> },
        { path: 'partners', element: <NotFound /> },
        { path: 'appversion', element: <NotFound /> }
      ]
    },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: 'epcvideo', element: <Epcvideos /> },
        { path: 'agendadocs', element: <Agendadocs /> },
        { path: 'mediapartners', element: <Mediapartners /> },
        { path: 'guestspeechdocs', element: <Guestspeechdocs /> }
      ]
    },
    {
      path: '*',
      element: <DashboardLayout />
    }
    // {
    //   path: '/',
    //   element: <LogoOnlyLayout />,
    //   children: [
    //     { path: 'login', element: <Login /> },
    //     { path: 'register', element: <Register /> },
    //     { path: '404', element: <NotFound /> },
    //     { path: '/', element: <Navigate to="/dashboard" /> },
    //     { path: '*', element: <Navigate to="/404" /> }
    //   ]
    // },
  ]);
}
