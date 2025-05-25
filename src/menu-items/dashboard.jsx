// assets
import { 
  AreaChartOutlined, 
  DashboardOutlined, 
  StockOutlined, 
  UsergroupAddOutlined, 
  UserOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  PieChartOutlined
} from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  UsergroupAddOutlined,
  AreaChartOutlined,
  StockOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  PieChartOutlined
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
      id: 'analytics',
      title: 'Analytics',
      type: 'item',
      url: '/dashboard/analytics',
      icon: icons.BarChartOutlined,
      breadcrumbs: false
    },
    {
      id: 'sales',
      title: 'Sales',
      type: 'item',
      url: '/sales',
      icon: icons.ShoppingCartOutlined,
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
      id: 'inventory',
      title: 'Inventory',
      type: 'item',
      url: '/inventory',
      icon: icons.StockOutlined,
      breadcrumbs: false
    },
    {
      id: 'reports',
      title: 'Reports',
      type: 'item',
      url: '/reports',
      icon: icons.PieChartOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;