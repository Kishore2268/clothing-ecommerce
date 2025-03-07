import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import ProductReviewCard from "./ProductReviewCard";
import { Box, Button, Grid, LinearProgress, Rating, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@mui/material";
import HomeProductCard from "../../Home/HomeProductCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findProductById } from "../../../../Redux/Customers/Product/Action";
import { addItemToCart } from "../../../../Redux/Customers/Cart/Action";
import { getAllReviews,createReview,createRating } from "../../../../Redux/Customers/Review/Action";
import CloseIcon from '@mui/icons-material/Close';

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState();
  const [activeImage, setActiveImage] = useState(null);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [reviewText, setReviewText] = useState(""); // State for review text
  const [selectedRating, setSelectedRating] = useState(0); // State for selected rating

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!jwt) {
      setOpenLoginDialog(true);
      return;
    }
    const reviewData = { productId, review: reviewText, rating: selectedRating }; // Prepare review data with rating
    dispatch(createReview(reviewData)); // Dispatch createReview action
    setReviewText(""); // Clear the review input
    setSelectedRating(0); // Reset the selected rating
  };


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customersProduct, review } = useSelector((store) => store);
  const { productId } = useParams();
  const jwt = localStorage.getItem("jwt");

  const handleSetActiveImage = (image) => {
    setActiveImage(image);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!jwt) {
      setOpenLoginDialog(true);
      return;
    }
    const data = { productId, size: selectedSize.name };
    dispatch(addItemToCart({ data, jwt }));
    navigate("/cart");
  };

  const handleCloseDialog = () => {
    setOpenLoginDialog(false);
  };


  useEffect(() => {
    const data = { productId: productId, jwt };
    dispatch(findProductById(data));
    dispatch(getAllReviews(productId));
  }, [productId, dispatch, jwt]);

  if (!customersProduct.product) {
    return <div>Loading...</div>;
  }

  const product = customersProduct.product;
  const images = [
    { src: product.imageUrl, alt: product.title },
    ...(product.images || []).map(img => ({ src: img, alt: product.title }))
  ];

  const breadcrumbs = [
    { 
      id: 1, 
      name: product.topLevelCategory || 'Category', 
      href: `/${(product.topLevelCategory || '').toLowerCase()}`
    },
    { 
      id: 2, 
      name: product.secondLevelCategory || 'Subcategory', 
      href: `/${(product.topLevelCategory || '').toLowerCase()}/${(product.secondLevelCategory || '').toLowerCase()}`
    },
    { 
      id: 3, 
      name: product.thirdLevelCategory || 'Products', 
      href: '#'
    }
  ];

  return (
    <div className="bg-white lg:px-20">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {breadcrumbs.map((breadcrumb, index) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a 
                    href={breadcrumb.href} 
                    className={`mr-2 text-sm font-medium ${index === breadcrumbs.length - 1 ? 'text-gray-500' : 'text-gray-900'}`}
                  >
                    {breadcrumb.name}
                  </a>
                  {index < breadcrumbs.length - 1 && (
                    <svg
                      width={16}
                      height={20}
                      viewBox="0 0 16 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-4 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </nav>

        <section className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 px-4 pt-10">
          {/* Image gallery */}
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
              <img
                src={activeImage?.src || product.imageUrl}
                alt={product.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="flex flex-wrap space-x-5 justify-center">
              {images.map((image, index) => (
                <div
                  key={index}
                  onClick={() => handleSetActiveImage(image)}
                  className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] mt-4 cursor-pointer"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="lg:col-span-1 mx-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
            <div className="lg:col-span-2">
              <h1 className="text-lg lg:text-xl font-semibold tracking-tight text-gray-900">
                {product.brand}
              </h1>
              <h1 className="text-lg lg:text-xl tracking-tight text-gray-900 opacity-60 pt-1">
                {product.title}
              </h1>
            </div>

            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <div className="flex space-x-5 items-center text-lg lg:text-xl tracking-tight text-gray-900 mt-6">
                <p className="font-semibold">₹{product.discountedPrice}</p>
                <p className="opacity-50 line-through">₹{product.price}</p>
                <p className="text-green-600 font-semibold">{product.discountPersent}% Off</p>
              </div>

              <div className="mt-6">
                <div className="flex items-center space-x-3">
                  <Rating
                    name="read-only"
                    value={review.averageRating || 0}
                    precision={0.5}
                    readOnly
                  />
                  <p className="opacity-60 text-sm">{review.totalReviews || 0} Ratings</p>
                  <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    {review.reviews?.length || 0} reviews
                  </p>
                </div>
              </div>

              <form className="mt-10" onSubmit={handleSubmit}>
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  </div>

                  <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                    <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-10">
                      {product.sizes?.map((size, index) => (
                        <RadioGroup.Option
                          key={`size-${index}-${size.name}`}
                          value={size}
                          className={({ active }) =>
                            classNames(
                              size.quantity > 0
                                ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                : "cursor-not-allowed bg-gray-50 text-gray-200",
                              active ? "ring-1 ring-indigo-500" : "",
                              "group relative flex items-center justify-center rounded-md border py-1 px-1 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                            )
                          }
                          disabled={size.quantity === 0}
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                              <span
                                className={classNames(
                                  active ? "border" : "border-2",
                                  checked ? "border-indigo-500" : "border-transparent",
                                  "pointer-events-none absolute -inset-px rounded-md"
                                )}
                                aria-hidden="true"
                              />
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <form onSubmit={handleReviewSubmit} className="mt-10">
                  <Rating
                    name="simple-controlled"
                    value={selectedRating}
                    onChange={(event, newValue) => {
                      setSelectedRating(newValue);
                    }}
                  />

                  <Rating
                    name="simple-controlled"
                    value={selectedRating}
                    onChange={(event, newValue) => {
                      setSelectedRating(newValue);
                    }}
                  />

                  <Rating
                    name="simple-controlled"
                    value={selectedRating}
                    onChange={(event, newValue) => {
                      setSelectedRating(newValue);
                    }}
                  />

                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Write your review here..."
                    className="border rounded p-2 w-full"
                    rows="4"
                    required
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ padding: ".8rem 2rem", marginTop: "1rem" }}
                  >
                    Submit Review
                  </Button>
                </form>
                <Button

                  variant="contained"
                  type="submit"
                  sx={{ padding: ".8rem 2rem", marginTop: "2rem" }}
                  disabled={!selectedSize}
                >
                  Add To Cart
                </Button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:pb-16 lg:pr-8 lg:pt-6">
              <div>
                <h3 className="sr-only">Description</h3>
                <div className="space-y-6">
                  <p className="text-base text-gray-900">{product.description}</p>
                </div>
              </div>

              {product.highlights && (
                <div className="mt-10">
                  <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
                  <div className="mt-4">
                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                      {product.highlights.map((highlight, index) => (
                        <li key={index} className="text-gray-400">
                          <span className="text-gray-600">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {product.details && (
                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">Details</h2>
                  <div className="mt-4 space-y-6">
                    <p className="text-sm text-gray-600">{product.details}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* rating and review section */}
        <section className="px-4">
          <h1 className="font-semibold text-lg pb-4">Recent Reviews & Ratings</h1>

          <div className="border p-5">
            <Grid container spacing={7}>
              <Grid item xs={7}>
                <div className="space-y-5">
                  {(Array.isArray(review.reviews) ? review.reviews : []).map((item) => (

                    <ProductReviewCard key={item._id} item={item} />
                  ))}
                  {(!review.reviews || review.reviews.length === 0) && (
                    <p className="text-center text-gray-500">No reviews yet</p>
                  )}
                </div>
              </Grid>

              <Grid item xs={5}>
                <h1 className="text-xl font-semibold pb-1">Product Ratings</h1>
                <div className="flex items-center space-x-3 pb-10">
                  <Rating
                    name="read-only"
                    value={review.averageRating || 0}
                    precision={0.5}
                    readOnly
                  />
                  <p className="opacity-60">{review.totalReviews || 0} Ratings</p>
                </div>

                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = review.ratings?.filter(r => r === rating).length || 0;
                  const percentage = review.ratings?.length ? (count / review.ratings.length) * 100 : 0;
                  
                  return (
                    <Box key={rating}>
                      <Grid container justifyContent="center" alignItems="center" gap={2}>
                        <Grid xs={2}>
                          <p className="p-0">{rating} Star</p>
                        </Grid>
                        <Grid xs={7}>
                          <LinearProgress
                            sx={{
                              bgcolor: "#d0d0d0",
                              borderRadius: 4,
                              height: 7,
                              '& .MuiLinearProgress-bar': {
                                bgcolor: rating > 3 ? 'success.main' :
                                        rating > 2 ? 'warning.main' : 'error.main'
                              }
                            }}
                            variant="determinate"
                            value={percentage}
                          />
                        </Grid>
                        <Grid xs={2}>
                          <p className="opacity-50 p-2">{count}</p>
                        </Grid>
                      </Grid>
                    </Box>
                  );
                })}
              </Grid>
            </Grid>
          </div>
        </section>
      </div>

      <Dialog
        open={openLoginDialog}
        onClose={handleCloseDialog}
        aria-labelledby="login-dialog-title"
        aria-describedby="login-dialog-description"
      >
        <div className="relative">
          <DialogTitle id="login-dialog-title" className="pr-12">
            Login Required
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <DialogContent>
          <p id="login-dialog-description" className="py-4">
            You need to login to add products to cart.
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
