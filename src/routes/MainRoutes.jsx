import { lazy } from 'react';
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import ProtectedRoute from './ProtectedRoute'; // ✅ Import this

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));
const Customers = Loadable(lazy(() => import('pages/dashboard/customers')));
const Sales = Loadable(lazy(() => import('pages/dashboard/sales')));
const Inventory = Loadable(lazy(() => import('pages/dashboard/inventory')));
const CLPC=Loadable(lazy(() => import('pages/dashboard/clpc')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <ProtectedRoute />,
  children: [
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <DashboardDefault /> },
        {
          path: 'dashboard',
          children: [{ path: 'default', element: <DashboardDefault /> }]
        },
        { path: 'customers', element: <Customers /> },
        { path: 'sales', element: <Sales /> },
        { path: 'inventory', element: <Inventory /> },
        { path: 'clpc', element: <CLPC /> },

      ]
    }
  ]
};

export default MainRoutes;
