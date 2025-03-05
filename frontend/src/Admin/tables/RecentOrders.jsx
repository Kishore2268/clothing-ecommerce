import { Avatar, Box, Card, CardHeader, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RecentOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const jwt = localStorage.getItem("jwt");
        const response = await fetch('http://localhost:5454/api/admin/stats/recent-orders', {
          headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching recent orders:", error);
      }
    };

    fetchRecentOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'success';
      case 'processing':
        return 'info';
      case 'cancelled':
        return 'error';
      case 'placed':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Card>
      <CardHeader
        title='Recent Orders'
        sx={{ pt: 2, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
        action={<Typography onClick={() => navigate("/admin/orders")} variant='caption' sx={{ color: "blue", cursor: "pointer", paddingRight: ".8rem" }}>View All</Typography>}
        titleTypographyProps={{
          variant: 'h5',
          sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
        }}
      />
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Order Details</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Order Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow hover key={order._id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell>
                  <Avatar alt={order.items[0]?.product?.title} src={order.items[0]?.product?.imageUrl} />
                </TableCell>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                      {order.items[0]?.product?.title}
                    </Typography>
                    <Typography variant='caption'>
                      {order.items.length > 1 ? `+${order.items.length - 1} more items` : ''}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>₹{order.totalPrice}</TableCell>
                <TableCell>{order._id.slice(-6).toUpperCase()}</TableCell>
                <TableCell>
                  <Chip
                    label={order.orderStatus}
                    color={getStatusColor(order.orderStatus)}
                    sx={{ color: 'white' }}
                    size='small'
                  />
                </TableCell>
                <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default RecentOrders;