import { Avatar, Box, Card, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RecentlyAddeddProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchRecentProducts = async () => {
      try {
        const jwt = localStorage.getItem("jwt");
        const response = await fetch('http://localhost:5454/api/admin/stats/recent-products', {
          headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching recent products:", error);
      }
    };

    fetchRecentProducts();
  }, []);

  return (
    <Card>
      <CardHeader
        title='Recently Added Products'
        sx={{ pt: 2, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
        action={<Typography onClick={() => navigate("/admin/products")} variant='caption' sx={{ color: "blue", cursor: "pointer", paddingRight: ".8rem" }}>View All</Typography>}
        titleTypographyProps={{
          variant: 'h5',
          sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
        }}
      />
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Date Added</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(product => (
              <TableRow hover key={product._id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell>
                  <Avatar alt={product.title} src={product.imageUrl} />
                </TableCell>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                      {product.title}
                    </Typography>
                    <Typography variant='caption'>{product.brand}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>₹{product.discountedPrice}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{new Date(product.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default RecentlyAddeddProducts;