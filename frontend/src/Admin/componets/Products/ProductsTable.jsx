import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import React from "react";
import { dressPage1 } from "../../../Data/dress/page1";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, findProducts } from "../../../Redux/Customers/Product/Action";

const ProductsTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customersProduct } = useSelector((store) => store);
  const [filterValue, setFilterValue] = useState({
    availability: "All",
    category: "",
    sort: "price_low"
  });

  // query 
  const searchParams = new URLSearchParams(location.search);
  const availability = searchParams.get("availability") || "All";
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "price_low";
  const page = searchParams.get("page") || "0";

  useEffect(() => {
    // Set initial URL parameters if not present
    if (!location.search) {
      navigate({ search: `?availability=All&sort=price_low&page=0` }, { replace: true });
    }
  }, []);

  useEffect(() => {
    console.log("Fetching products with params:", { availability, category, sort, page });
    const data = {
      category: category,
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 100000,
      minDiscount: 0,
      sort: sort,
      pageNumber: parseInt(page),
      pageSize: 10,
      stock: availability
    };
    dispatch(findProducts(data));
  }, [availability, category, sort, page, customersProduct.deleteProduct]);

  const handlePaginationChange = (event, value) => {
    searchParams.set("page", value-1);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const handleFilterChange = (e, sectionId) => {
    console.log(e.target.value, sectionId);
    setFilterValue((values) => ({ ...values, [sectionId]: e.target.value }));
    searchParams.set(sectionId, e.target.value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const handleDeleteProduct=(productId)=>{
    console.log("delete product ",productId)
    dispatch(deleteProduct(productId))
  }

  const getStockStatus = (quantity) => {
    if (quantity > 0) return "in_stock";
    return "out_of_stock";
  };

  return (
    <Box width={"100%"}>
      <Card className="p-3">
        <CardHeader
          title="Sort"
          sx={{
            pt: 0,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterValue.category}
                label="Category"
                onChange={(e) => handleFilterChange(e, "category")}
              >
                {/* Top Level Categories */}
                <MenuItem value="men">Men</MenuItem>
                <MenuItem value="women">Women</MenuItem>
                <MenuItem value="kids">Kids</MenuItem>

                {/* Second Level Categories */}
                <MenuItem value="clothing">Clothing</MenuItem>
                <MenuItem value="accessories">Accessories</MenuItem>
                <MenuItem value="brands">Brands</MenuItem>

                {/* Women's Categories */}
                <MenuItem value="women_dress">Women's Dresses</MenuItem>
                <MenuItem value="women_tops">Women's Tops</MenuItem>
                <MenuItem value="women_t-shirts">Women's T-Shirts</MenuItem>
                <MenuItem value="women_saree">Women's Saree</MenuItem>
                <MenuItem value="women_lengha_choli">Women's Lengha Choli</MenuItem>
                <MenuItem value="women_gowns">Women's Gowns</MenuItem>
                <MenuItem value="women_kurtas">Women's Kurtas</MenuItem>
                <MenuItem value="women_jeans">Women's Jeans</MenuItem>
                <MenuItem value="women_shoes">Women's Shoes</MenuItem>
                <MenuItem value="women_bags">Women's Bags</MenuItem>
                <MenuItem value="women_watches">Women's Watches</MenuItem>
                <MenuItem value="women_sunglasses">Women's Sunglasses</MenuItem>
                <MenuItem value="women_hats">Women's Hats</MenuItem>
                <MenuItem value="women_socks">Women's Socks</MenuItem>
                  
                {/* Men's Categories */}
                <MenuItem value="men_shirt">Men's Shirts</MenuItem>
                <MenuItem value="men_t-shirts">Men's T-Shirts</MenuItem>
                <MenuItem value="men_kurtas">Men's Kurtas</MenuItem>
                <MenuItem value="men_jeans">Men's Jeans</MenuItem>
                <MenuItem value="men_trouser">Men's Trousers</MenuItem>
                <MenuItem value="men_shoes">Men's Shoes</MenuItem>
                <MenuItem value="men_bags">Men's Bags</MenuItem>
                <MenuItem value="men_watches">Men's Watches</MenuItem>
                <MenuItem value="men_sunglasses">Men's Sunglasses</MenuItem>
                <MenuItem value="men_hats">Men's Hats</MenuItem>
                <MenuItem value="men_socks">Men's Socks</MenuItem>

                {/* Kids Categories */}
                <MenuItem value="kids_dress">Kids' Dresses</MenuItem>
                <MenuItem value="kids_t-shirts">Kids' T-Shirts</MenuItem>
                <MenuItem value="kids_jeans">Kids' Jeans</MenuItem>
                <MenuItem value="kids_shoes">Kids' Shoes</MenuItem>
                <MenuItem value="kids_bags">Kids' Bags</MenuItem>
                <MenuItem value="kids_watches">Kids' Watches</MenuItem>
                <MenuItem value="kids_sunglasses">Kids' Sunglasses</MenuItem>
                <MenuItem value="kids_hats">Kids' Hats</MenuItem>
                <MenuItem value="kids_socks">Kids' Socks</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Availability
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterValue.availability}
                label="Availability"
                onChange={(e) => handleFilterChange(e, "availability")}
              >
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"in_stock"}>Instock</MenuItem>
                <MenuItem value={"out_of_stock"}>Out Of Stock</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Sort By Price
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterValue.sort}
                label="Sort By Price"
                onChange={(e) => handleFilterChange(e, "sort")}
              >
                <MenuItem value={"price_high"}>Heigh - Low</MenuItem>
                <MenuItem value={"price_low"}>Low - Heigh</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>
      <Card className="mt-2">
        <CardHeader
          title={`All Products (${customersProduct?.products?.totalElements || 0} items)`}
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Category</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Price</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Quantity</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Status</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Delete</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customersProduct?.products?.content?.map((item) => (
                <TableRow
                  hover
                  key={item._id}
                  sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                >
                  <TableCell>
                    {" "}
                    <Avatar alt={item.title} src={item.imageUrl} />{" "}
                  </TableCell>

                  <TableCell
                    sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "0.875rem !important",
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography variant="caption">{item.brand}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {item.thirdLevelCategory}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography variant="body2" sx={{ textDecoration: "line-through", color: "text.secondary" }}>
                        ₹{item.price}
                      </Typography>
                      <Typography variant="body1">₹{item.discountedPrice}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{item.quantity}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: item.quantity > 0 ? "success.main" : "error.main",
                        fontWeight: "medium"
                      }}
                    >
                      {item.quantity > 0 ? "In Stock" : "Out of Stock"}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }} className="text-white">
                    <Button onClick={() => handleDeleteProduct(item._id)} variant="text" color="error">
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }} className="text-white">
                    <Button 
                      onClick={() => navigate(`/admin/product/update/${item._id}`)} 
                      variant="text" 
                      color="primary"
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {(!customersProduct?.products?.content || customersProduct?.products?.content.length === 0) && (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <Typography variant="body1" sx={{ py: 2 }}>
                      No products found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Card className="mt-2 border">
        <div className="mx-auto px-4 py-5 flex justify-center shadow-lg rounded-md">
          <Pagination
            count={customersProduct.products?.totalPages || 1}
            color="primary"
            onChange={handlePaginationChange}
            page={(parseInt(page) || 0) + 1}
          />
        </div>
      </Card>
    </Box>
  );
};

export default ProductsTable;
