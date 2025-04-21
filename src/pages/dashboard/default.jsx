import { useEffect, useState } from 'react';
import { Grid, Typography, List, ListItem, ListItemText } from '@mui/material';
import { databases } from '../../utils/appwrite';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import MonthlyBarChart from 'sections/dashboard/default/MonthlyBarChart';
import ReportAreaChart from 'sections/dashboard/default/ReportAreaChart';
import UniqueVisitorCard from 'sections/dashboard/default/UniqueVisitorCard';
import SaleReportCard from 'sections/dashboard/default/SaleReportCard';
import OrdersTable from 'sections/dashboard/default/OrdersTable';
import { ID } from 'appwrite';

const DATABASE_ID = '67fe47260000f251de8f';

export default function DashboardDefault() {
  const [customers, setCustomers] = useState(0);
  const [sales, setSales] = useState({ total: 0, completed: 0 });
  const [inventory, setInventory] = useState(0);
  const [workers, setWorkers] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const [monthlySalesData, setMonthlySalesData] = useState([]);
  const [todaysOrders, setTodaysOrders] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const customersData = await databases.listDocuments(DATABASE_ID, '67fe480d000e8ff9a46f');
        const salesData = await databases.listDocuments(DATABASE_ID, '67ff759700363e63d767');
        const inventoryData = await databases.listDocuments(DATABASE_ID, '67ff759e00337dcb0cff');
        const workersData = await databases.listDocuments(DATABASE_ID, '67ff751d003937e653a2');

        const completedSales = salesData.documents.filter((doc) => doc.complete === true).length;
        const today = new Date().toISOString().split('T')[0];
        const todaysOrdersCount = salesData.documents.filter((doc) => doc.entry_date.startsWith(today)).length;

        setCustomers(customersData.documents.length);
        setSales({ total: salesData.documents.length, completed: completedSales });
        setInventory(inventoryData.documents.length);
        setWorkers(workersData.documents.length);
        setTodaysOrders(todaysOrdersCount);

        const recent = [...salesData.documents]
          .sort((a, b) => new Date(b.entry_date) - new Date(a.entry_date))
          .slice(0, 5);

        setRecentOrders(recent);

        // Monthly sales chart data
        const months = [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];

        const salesPerMonth = {};
        months.forEach((m) => (salesPerMonth[m] = 0));

        salesData.documents.forEach((doc) => {
          const date = new Date(doc.entry_date);
          const month = date.toLocaleString('default', { month: 'short' });
          if (salesPerMonth[month] !== undefined) {
            salesPerMonth[month] += 1;
          }
        });

        const chartData = months.map((month) => ({
          name: month,
          sales: salesPerMonth[month]
        }));

        setMonthlySalesData(chartData);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Customers" count={customers.toString()} percentage={100} extra="+" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title="Sales (Completed)"
          count={sales.completed.toString()}
          percentage={(sales.completed / (sales.total || 1)) * 100}
          extra={`of ${sales.total}`}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Inventory Items" count={inventory.toString()} percentage={100} extra="+" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Workers" count={workers.toString()} percentage={100} extra="+" />
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Today's Orders" count={todaysOrders.toString()} percentage={100} extra="Today" />
      </Grid>

      <Grid item xs={12} md={8}>
        <MainCard title="Monthly Sales">
          <MonthlyBarChart data={monthlySalesData} />
        </MainCard>
      </Grid>

      <Grid item xs={12} md={4}>
        <MainCard title="Recent Orders" content={false}>
          <List>
            {recentOrders.map((order) => (
              <ListItem key={order.$id} divider>
                <ListItemText
                  primary={`Order #${order.order_no} - ${order.customer_name}`}
                  secondary={`Entered: ${new Date(order.entry_date).toLocaleDateString()} | Delivery: ${new Date(order.delivery_date).toLocaleDateString()}`}
                />
                <Typography variant="body2" color={order.complete ? 'green' : 'orange'}>
                  {order.complete ? 'Completed' : 'Pending'}
                </Typography>
              </ListItem>
            ))}
          </List>
        </MainCard>
      </Grid>
    </Grid>
  );
}