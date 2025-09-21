import { lazy } from 'react';

// project import
import CommonLayout from 'layout/CommonLayout';
import Loadable from 'components/Loadable';

// render - landing page
const LandingPage = Loadable(lazy(() => import('pages/extra-pages/LandingPage')));

// ==============================|| LANDING PAGE ROUTING ||============================== //

const LandingPageRoute = {
  path: '/',
  children: [
    {
      path: '',
      element: <CommonLayout />,
      children: [
        {
          path: '',
          element: <LandingPage />
        }
      ]
    }
  ]
};

export default LandingPageRoute;
