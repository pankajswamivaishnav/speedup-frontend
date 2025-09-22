import { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import CommonLayout from 'layout/CommonLayout';
import Loadable from 'components/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';
import Vendor from 'pages/vendor/Vendor';
import ProfilePage from 'pages/Profile/ProfilePage';
// import LandingPage from 'pages/extra-pages/LandingPage';

// pages routing
const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/404')));
const MaintenanceError500 = Loadable(lazy(() => import('pages/maintenance/500')));
const MaintenanceUnderConstruction = Loadable(lazy(() => import('pages/maintenance/under-construction')));
const MaintenanceComingSoon = Loadable(lazy(() => import('pages/maintenance/coming-soon')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/dashboard')));
const TransportPage = Loadable(lazy(() => import('pages/transporter/Transporter')));
const DriversPage = Loadable(lazy(() => import('pages/driver/Drivers')));
const BiltyPage = Loadable(lazy(() => import('pages/Bilty/Bilty')));
const TransportCardPage = Loadable(lazy(() => import('pages/transporter/TransportCardsPage')));
const DriverCardPage = Loadable(lazy(() => import('pages/driver/DriverCardPage')));
const VendorCardPage = Loadable(lazy(() => import('pages/vendor/VendorCardPage')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: 'dashboard',
          element: <SamplePage />
        },
        {
          path: 'transporters',
          element: <TransportPage />
        },
        {
          path: 'drivers',
          element: <DriversPage />
        },
        {
          path: 'bilties',
          element: <BiltyPage />
        },
        {
          path: 'vendors',
          element: <Vendor />
        },
        {
          path: 'profile',
          element: <ProfilePage />
        },
        {
          path: 'transport-cards',
          element: <TransportCardPage />
        },
        {
          path: 'driver-cards',
          element: <DriverCardPage />
        },
        {
          path: 'vendor-cards',
          element: <VendorCardPage />
        }
      ]
    },
    {
      path: '/maintenance',
      element: <CommonLayout />,
      children: [
        {
          path: '404',
          element: <MaintenanceError />
        },
        {
          path: '500',
          element: <MaintenanceError500 />
        },
        {
          path: 'under-construction',
          element: <MaintenanceUnderConstruction />
        },
        {
          path: 'coming-soon',
          element: <MaintenanceComingSoon />
        }
      ]
    }
  ]
};

export default MainRoutes;
