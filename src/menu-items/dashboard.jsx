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
      id: 'clpc',
      title: 'Clpc',
      type: 'item',
      url: '/clpc',
      icon: icons.PieChartOutlined,
      breadcrumbs: false
    },
  ]
};

export default dashboard;