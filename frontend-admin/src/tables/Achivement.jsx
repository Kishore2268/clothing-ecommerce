// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { ThemeProvider, createTheme, styled, useTheme } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Styled component for the triangle shaped background image
const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})

// Styled component for the trophy image
const TrophyImg = styled('img')({
  right: 36,
  bottom: 20,
  height: 98,
  position: 'absolute'
})

const Achivement = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const [achievementData, setAchievementData] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    totalProducts: 0,
    achievementLevel: 0
  });

  useEffect(() => {
    const fetchAchievementData = async () => {
      try {
        const jwt = localStorage.getItem("jwt");
        const response = await fetch('http://localhost:5454/api/admin/stats/achievements', {
          headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setAchievementData(data);
      } catch (error) {
        console.error("Error fetching achievement stats:", error);
      }
    };

    fetchAchievementData();
  }, []);

  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h6' sx={{ letterSpacing: '0.25px' }}>
          Shop With Zosh
        </Typography>
        <Typography variant='body2'>
          {achievementData.achievementLevel >= 80 ? 'Outstanding Achievement! 🎉' :
           achievementData.achievementLevel >= 50 ? 'Great Progress! 🌟' :
           'Keep Growing! 🚀'}
        </Typography>
        
        <Typography variant='h5' sx={{ my: 3.1, color: 'primary.main' }}>
          ${(achievementData.totalRevenue || 0).toLocaleString()}
        </Typography>

        <Typography variant='body2' sx={{ mb: 2 }}>
          {achievementData.totalOrders} Orders • {achievementData.totalCustomers} Customers
        </Typography>

        <Button size='small' variant='contained' onClick={() => navigate("/admin/orders")}>
          View Sales
        </Button>
        <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
        <TrophyImg alt='trophy' src='/images/misc/trophy.png' />
      </CardContent>
    </Card>
  )
}

export default Achivement;
