import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
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
import Eventregistration from './pages/Eventregistration';
import Dinner from './pages/Dinner';
import Maps from './pages/Map';
import Attractions from './pages/Attractions';
import Helpdesks from './pages/Helpdesk';
import Wifis from './pages/Wifi';
import Partners from './pages/Partners';
import Aboutadsd from './pages/Aboutadsd';
import Aboutus from './pages/Aboutus';
import Contacts from './pages/Contact';
import Mic from './pages/Mic';
import Socialmedia from './pages/Socialmedia';
import Code from './pages/Code';
import Appversion from './pages/Appversion';
import Myprofile from './pages/Myprofile';
import Changepassword from './pages/Changepassword';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Users from './pages/Users';

// ----------------------------------------------------------------------

export default function Router({ setLogin, login, tokenRequest, token, userName, setToken }) {
  return useRoutes([
    {
      path: '/',
      element:
        token === '' ? (
          <Navigate to="/login" />
        ) : (
          <DashboardLayout userName={userName} setToken={setToken} />
        ),
      children: [
        { path: '/', element: <Navigate to="/login" /> },
        { path: 'dashboard', element: <DashboardApp /> },
        { path: 'attendees/*', element: <Attendees token={token} /> },
        { path: 'agendas/*', element: <Agendas /> },
        { path: 'polls/*', element: <Polls /> },
        { path: 'notification/*', element: <Notification /> },
        { path: 'bulkmail/*', element: <BulkMail /> },
        { path: 'pressroom/*', element: <Pressroom /> },
        { path: '404', element: <NotFound /> }
      ]
    },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: 'aboutadsd/*', element: <Aboutadsd /> },
        { path: 'aboutus/*', element: <Aboutus /> },
        { path: 'epccontact/*', element: <Contacts /> },
        { path: 'eventregistration/*', element: <Eventregistration /> },
        { path: 'dinner/*', element: <Dinner /> },
        { path: 'map/*', element: <Maps /> },
        { path: 'abudhabiattractions/*', element: <Attractions /> },
        { path: 'adsdheldesk/*', element: <Helpdesks /> },
        { path: 'wificredentials/*', element: <Wifis /> },
        { path: 'howtousethemic/*', element: <Mic /> },
        { path: 'socialmedialinks/*', element: <Socialmedia /> },
        { path: 'codeofconduct/*', element: <Code /> },
        { path: 'partners/*', element: <Partners /> },
        { path: 'appversion/*', element: <Appversion /> }
      ]
    },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: 'epcvideo/*', element: <Epcvideos /> },
        { path: 'agendadocs/*', element: <Agendadocs /> },
        { path: 'mediapartners/*', element: <Mediapartners /> },
        { path: 'guestspeechdocs/*', element: <Guestspeechdocs /> }
      ]
    },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [{ path: 'users/*', element: <Users /> }]
    },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: 'myprofile', element: <Myprofile /> },
        { path: 'changepassword', element: <Changepassword /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        {
          path: 'login',
          element: token ? (
            <Navigate to="/dashboard" />
          ) : (
            <Login setLogin={setLogin} login={login} tokenRequest={tokenRequest} />
          )
        },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/login" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    }
  ]);
}
