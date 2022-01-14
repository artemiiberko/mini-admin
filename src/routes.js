import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Agendas from './pages/Agendas';
import Polls from './pages/Polls';
import Attendees from './pages/Attendees';
import NotFound from './pages/Page404';
import Notification from './pages/Notification';
import BulkMail from './pages/Bulkmail';
import Pressroom from './pages/Pressroom';
import Informations from './pages/Informations';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'attendees', element: <Attendees /> },
        { path: 'agendas', element: <Agendas /> },
        { path: 'polls', element: <Polls /> },
        { path: 'notification', element: <Notification /> },
        { path: 'bulkmail', element: <BulkMail /> },
        { path: 'pressroom', element: <Pressroom /> },
        { path: 'informations', element: <Informations /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
