// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useEffect, useState } from 'react'

// ** Icons Imports
import MenuUp from 'mdi-material-ui/MenuUp'
import DotsVertical from 'mdi-material-ui/DotsVertical'

const TotalEarning = () => {
  const [earningData, setEarningData] = useState({
    totalEarning: 0,
    yearlyComparison: 0,
    categoryData: []
  });
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    const fetchEarningData = async () => {
      try {
        const response = await fetch('http://localhost:5454/api/admin/stats/earnings', {
          headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setEarningData({
          totalEarning: data.totalEarning || 0,
          yearlyComparison: data.yearlyComparison || 0,
          categoryData: data.categoryEarnings || []
        });
      } catch (error) {
        console.error("Error fetching earning stats:", error);
      }
    };

    fetchEarningData();
  }, [jwt]);

  return (
    <Card>
      <CardHeader
        title='Total Earning'
        titleTypographyProps={{ sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' } }}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(1.5)} !important` }}>
        <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
          <Typography variant='h4' sx={{ fontWeight: 600, fontSize: '2.125rem !important' }}>
            ${earningData.totalEarning.toLocaleString()}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main' }}>
            <MenuUp sx={{ fontSize: '1.875rem', verticalAlign: 'middle' }} />
            <Typography variant='body2' sx={{ fontWeight: 600, color: 'success.main' }}>
              {earningData.yearlyComparison}%
            </Typography>
          </Box>
        </Box>

        <Typography component='p' variant='caption' sx={{ mb: 5 }}>
          Compared to ${(earningData.totalEarning * (1 - earningData.yearlyComparison/100)).toLocaleString()} last year
        </Typography>

        {earningData.categoryData.map((item, index) => {
          return (
            <Box
              key={item.category}
              sx={{
                display: 'flex',
                alignItems: 'center',
                ...(index !== earningData.categoryData.length - 1 ? { mb: 4 } : {})
              }}
            >
              <Avatar
                variant='rounded'
                sx={{
                  mr: 3,
                  width: 40,
                  height: 40
                }}
              >
                <img src={item.imageUrl} alt={item.category} height={item.imageHeight || 20} />
              </Avatar>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                    {item.category}
                  </Typography>
                  <Typography variant='caption'>{item.description}</Typography>
                </Box>

                <Box sx={{ minWidth: 85, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='body2' sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                    ${item.earnings.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default TotalEarning
