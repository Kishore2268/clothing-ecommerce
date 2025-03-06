// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { useEffect, useState } from 'react'

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Custom Components Imports
import ReactApexCharts from 'react-apexcharts'

const SalesOverTime = () => {
  const theme = useTheme()
  const [salesData, setSalesData] = useState({
    monthlySales: [],
    totalSales: 0,
    growthRate: 0
  });
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch('http://localhost:5454/api/admin/stats/sales-trend', {
          headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setSalesData({
          monthlySales: data.monthlySales || [],
          totalSales: data.totalSales || 0,
          growthRate: data.growthRate || 0
        });
      } catch (error) {
        console.error("Error fetching sales trend:", error);
      }
    };

    fetchSalesData();
  }, [jwt]);

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      area: {
        fillTo: 'end'
      }
    },
    stroke: {
      width: 4,
      curve: 'smooth'
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
    colors: [theme.palette.primary.main],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      tickPlacement: 'on',
      labels: { show: true },
      axisTicks: { show: true },
      axisBorder: { show: false }
    },
    yaxis: {
      show: true,
      tickAmount: 4,
      labels: {
        offsetX: -17,
        formatter: value => `$${value}k`
      }
    }
  }

  const series = [
    {
      name: 'Sales',
      data: salesData.monthlySales
    }
  ]

  return (
    <Card>
      <CardHeader
        title='Sales Over Time'
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
        }}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant='h5' sx={{ fontWeight: 600 }}>
              ${salesData.totalSales.toLocaleString()}
            </Typography>
            <Typography variant='body2'>Total Sales</Typography>
          </Box>
          <Box>
            <Typography variant='h5' sx={{ fontWeight: 600, color: salesData.growthRate >= 0 ? 'success.main' : 'error.main' }}>
              {salesData.growthRate >= 0 ? '+' : ''}{salesData.growthRate}%
            </Typography>
            <Typography variant='body2'>Growth Rate</Typography>
          </Box>
        </Box>
        <ReactApexCharts type='area' height={400} options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default SalesOverTime

