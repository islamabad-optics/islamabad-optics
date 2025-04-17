// assets
import { AreaChartOutlined, DashboardOutlined, StockOutlined, UsergroupAddOutlined, UserOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  UsergroupAddOutlined,
  AreaChartOutlined,
  StockOutlined,
  UserOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'customers',
      title: 'Customers',
      type: 'item',
      url: '/customers',
      icon: icons.UsergroupAddOutlined,
      breadcrumbs: false
    },
    {
      id: 'sales',
      title: 'Sales',
      type: 'item',
      url: '/sales',
      icon: icons.AreaChartOutlined,
      breadcrumbs: false
    },
    {
      id: 'inventory',
      title: 'Inventory',
      type: 'item',
      url: '/inventory',
      icon: icons.StockOutlined,
      breadcrumbs: false
    },
    {
      id: 'workers',
      title: 'Workers',
      type: 'item',
      url: '/workers',
      icon: icons.UserOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
