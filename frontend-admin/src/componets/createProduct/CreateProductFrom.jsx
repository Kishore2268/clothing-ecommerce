import { useState } from "react";
import { Typography } from "@mui/material";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { Fragment } from "react";
import "./CreateProductForm.css";
import { useDispatch } from "react-redux";
import { createProduct } from "../../Redux/Customers/Product/Action";


const initialSizes = [
  { name: "S", quantity: 0 },
  { name: "M", quantity: 0 },
  { name: "L", quantity: 0 },
];

const CreateProductForm = () => {
  
  const [productData, setProductData] = useState({
    imageUrl: "",
    brand: "",
    title: "",
    color: "",
    discountedPrice: "",
    price: "",
    discountPercent: "",
    sizes: initialSizes,
    quantity: "",
    topLevelCategory: "",
    secondLevelCategory: "",
    thirdLevelCategory: "",
    description: "",
  });
const dispatch=useDispatch();
const jwt=localStorage.getItem("jwt")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSizeChange = (e, index) => {
    let { name, value } = e.target;
    name==="size_quantity"?name="quantity":name=e.target.name;

    const sizes = [...productData.sizes];
    sizes[index][name] = value;
    setProductData((prevState) => ({
      ...prevState,
      sizes: sizes,
    }));
  };

  const handleAddSize = () => {
    const sizes = [...productData.sizes];
    sizes.push({ name: "", quantity: "" });
    setProductData((prevState) => ({
      ...prevState,
      sizes: sizes,
    }));
  };

  // const handleRemoveSize = (index) => {
  //   const sizes = [...productData.size];
  //   sizes.splice(index, 1);
  //   setProductData((prevState) => ({
  //     ...prevState,
  //     size: sizes,
  //   }));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Format the data before sending
    const formattedData = {
      ...productData,
      price: Number(productData.price),
      discountedPrice: Number(productData.discountedPrice),
      discountPercent: Number(productData.discountPercent),
      quantity: Number(productData.quantity),
      sizes: productData.sizes.map(size => ({
        name: size.name,
        quantity: Number(size.quantity) || 0
      })).filter(size => size.name && size.quantity > 0),
      topLevelCategory: productData.topLevelCategory?.toLowerCase(),
      secondLevelCategory: productData.secondLevelCategory?.toLowerCase(),
      thirdLevelCategory: productData.thirdLevelCategory?.toLowerCase()
    };

    // Remove empty strings and undefined values
    Object.keys(formattedData).forEach(key => {
      if (formattedData[key] === '' || formattedData[key] === undefined || formattedData[key] === null) {
        delete formattedData[key];
      }
    });

    dispatch(createProduct({data: formattedData, jwt}));
    console.log('Formatted data being sent:', formattedData);
  };

  // const handleAddProducts=(data)=>{
  //   for(let item of data){
  //     const productsData={
  //       data:item,
  //       jwt,
  //     }
  //     dispatch(createProduct(productsData))
  //   }
  // }

  return (
    <div className="createProductContainer">
      <Fragment>
        <Typography
          variant="h3"
          sx={{ textAlign: "center" }}
          className="py-10 text-center "
        >
          Add New Product
        </Typography>
        <form
          onSubmit={handleSubmit}
          className="createProductContainer min-h-screen"
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL"
                name="imageUrl"
                value={productData.imageUrl}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Brand"
                name="brand"
                value={productData.brand}
                onChange={handleChange}
              />
            </Grid>
          
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={productData.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Color"
                name="color"
                value={productData.color}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                value={productData.quantity}
                onChange={handleChange}
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                value={productData.price}
                onChange={handleChange}
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Discounted Price"
                name="discountedPrice"
                value={productData.discountedPrice}
                onChange={handleChange}
                type="number"
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Discount Percentage"
                name="discountPercent"
                value={productData.discountPercent}
                onChange={handleChange}
                type="number"
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Top Level Category</InputLabel>
                <Select
                  name="topLevelCategory"
                  value={productData.topLevelCategory || ""}
                  onChange={handleChange}
                  label="Top Level Category"
                >
                  <MenuItem value="men">Men</MenuItem>
                  <MenuItem value="women">Women</MenuItem>
                  <MenuItem value="kids">Kids</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Second Level Category</InputLabel>
                <Select
                  name="secondLevelCategory"
                  value={productData.secondLevelCategory || ""}
                  onChange={handleChange}
                  label="Second Level Category"
                >
                  <MenuItem value="clothing">Clothing</MenuItem>
                  <MenuItem value="accessories">Accessories</MenuItem>
                  <MenuItem value="brands">Brands</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Third Level Category</InputLabel>
                <Select
                  name="thirdLevelCategory"
                  value={productData.thirdLevelCategory || ""}
                  onChange={handleChange}
                  label="Third Level Category"
                >
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
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-multiline-static"
                label="Description"
                multiline
                name="description"
                rows={3}
                onChange={handleChange}
                value={productData.description}
              />
            </Grid>
            {productData.sizes.map((size, index) => (
              <Grid container item spacing={3} key={`size-${index}`}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Size Name"
                    name="name"
                    value={size.name}
                    onChange={(event) => handleSizeChange(event, index)}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Quantity"
                    name="size_quantity"
                    type="number"
                    onChange={(event) => handleSizeChange(event, index)}
                    required
                    fullWidth
                  />
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12} >
              <Button
                variant="contained"
                sx={{ p: 1.8 }}
                className="py-20"
                size="large"
                type="submit"
              >
                Add New Product
              </Button>
              {/* <Button
                variant="contained"
                sx={{ p: 1.8 }}
                className="py-20 ml-10"
                size="large"
                onClick={()=>handleAddProducts(dressPage1)}
              >
                Add Products By Loop
              </Button> */}
            </Grid>
          </Grid>
        </form>
      </Fragment>
    </div>
  );
};

export default CreateProductForm;
