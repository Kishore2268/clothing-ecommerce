// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { useEffect, useState } from 'react'

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Custom Components Imports
import ReactApexCharts from 'react-apexcharts';

// import ReactApexcharts from 'src/@core/components/react-apexcharts'

const WeeklyOverview = () => {
  // ** Hook
  const theme = useTheme()
  const [weeklyData, setWeeklyData] = useState({
    sales: [],
    performance: 0
  });
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    const fetchWeeklyData = async () => {
      try {
        const response = await fetch('http://localhost:5454/api/admin/stats/weekly', {
          headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setWeeklyData({
          sales: data.weeklySales || [],
          performance: data.weeklyPerformance || 0
        });
      } catch (error) {
        console.error("Error fetching weekly stats:", error);
      }
    };

    fetchWeeklyData();
  }, [jwt]);

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 9,
        distributed: true,
        columnWidth: '40%',
        endingShape: 'rounded',
        startingShape: 'rounded'
      }
    },
    stroke: {
      width: 2,
      colors: [theme.palette.background.paper]
    },
    legend: { show: false },
    grid: {
      strokeDashArray: 7,
      padding: {
        top: -1,
        right: 0,
        left: -12,
        bottom: 5
      }
    },
    dataLabels: { enabled: false },
    colors: [
      theme.palette.background.default,
      theme.palette.background.default,
      theme.palette.background.default,
      theme.palette.primary.main,
      theme.palette.background.default,
      theme.palette.background.default
    ],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    xaxis: {
      categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      tickPlacement: 'on',
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      show: true,
      tickAmount: 4,
      labels: {
        offsetX: -17,
        formatter: value => `${value > 999 ? `${(value / 1000).toFixed(0)}` : value}k`
      }
    }
  }

  return (
    <Card>
      <CardHeader
        title='Weekly Overview'
        titleTypographyProps={{
          sx: { lineHeight: '0rem !important', letterSpacing: '0.15px !important' }
        }}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
        <ReactApexCharts type='bar' height={201} options={options} series={[{ data: weeklyData.sales }]} />
        <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
          <Typography variant='h5' sx={{ mr: 4 }}>
            {weeklyData.performance}%
          </Typography>
          <Typography variant='body2'>Your sales performance is {weeklyData.performance}% 😎 better compared to last week</Typography>
        </Box>
        <Button fullWidth variant='contained'>
          Details
        </Button>
      </CardContent>
    </Card>
  )
}

export default WeeklyOverview
