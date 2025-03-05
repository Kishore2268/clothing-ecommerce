// ** MUI Imports
import Grid from "@mui/material/Grid";
import AdminPannel from "../../Styles/AdminPannelWrapper";
import Achivement from "../tables/Achivement";
import MonthlyOverview from "../tables/MonthlyOverView";
import WeeklyOverview from "../tables/WeeklyOverview";
import TotalEarning from "../tables/TotalEarning";
import CustomersTable from "../tables/CustomersTable";
import { ThemeProvider, createTheme } from "@mui/material";
import { customTheme } from "../them/customeThem";
import "./Admin.css";
import RecentlyAddeddProducts from "../tables/RecentlyAddeddProducts";
import SalesOverTime from "../tables/SalesOverTime";
import RecentOrders from "../tables/RecentOrders";

const darkTheme1 = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#312d4b',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});

// bg-[#28243d]
const Dashboard = () => {
  return (
    <div className="adminContainer">
      <ThemeProvider theme={customTheme}>
        <AdminPannel>
          <Grid container spacing={2}>
            {/* Top Row - Achievement and Monthly Overview */}
            <Grid item xs={12} md={4}>
              <Achivement />
            </Grid>
            <Grid item xs={12} md={8}>
              <MonthlyOverview />
            </Grid>
            {/* Second Row - Weekly Overview, Total Earning, and Sales Over Time */}
            <Grid item xs={12} md={4}>
              <WeeklyOverview />
            </Grid>
            <Grid item xs={12} md={4}>
              <TotalEarning />
            </Grid>
            <Grid item xs={12} md={4}>
              <SalesOverTime />
            </Grid>

            {/* Third Row - Recent Orders and Recent Products */}
            <Grid item xs={12} md={8}>
              <RecentOrders />
            </Grid>

            {/* Fourth Row - Recent Products and Customers */}
            <Grid item xs={12} md={8}>
              <RecentlyAddeddProducts />
            </Grid>
            <Grid item xs={12} md={4}>
              <CustomersTable />
            </Grid>
          </Grid>
        </AdminPannel>
      </ThemeProvider>
    </div>
  );
};

export default Dashboard;
