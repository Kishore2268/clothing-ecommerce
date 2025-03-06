const Category = require("../models/category.model");
const Product = require("../models/product.model");

// Create a new product
async function createProduct(reqData) {
  const product = new Product({
    title: reqData.title,
    color: reqData.color,
    description: reqData.description,
    discountedPrice: reqData.discountedPrice,
    discountPercent: reqData.discountPercent,
    imageUrl: reqData.imageUrl,
    brand: reqData.brand,
    price: reqData.price,
    sizes: reqData.sizes,
    quantity: reqData.quantity,
    topLevelCategory: reqData.topLevelCategory,
    secondLevelCategory: reqData.secondLevelCategory,
    thirdLevelCategory: reqData.thirdLevelCategory
  });

  const savedProduct = await product.save();
  return savedProduct;
}

// Delete a product by ID
async function deleteProduct(productId) {
  const product = await findProductById(productId);

  if (!product) {
    throw new Error("product not found with id - : ", productId);
  }

  await Product.findByIdAndDelete(productId);

  return "Product deleted Successfully";
}

// Update a product by ID
async function updateProduct(productId, reqData) {
  const updatedProduct = await Product.findByIdAndUpdate(productId, reqData);
  return updatedProduct;
}

// Find a product by ID
async function findProductById(id) {
  try {
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Error("Invalid product ID format");
    }

    const product = await Product.findById(id);

    if (!product) {
      throw new Error("Product not found with id " + id);
    }
    return product;
  } catch (error) {
    if (error.name === 'CastError') {
      throw new Error("Invalid product ID format");
    }
    throw error;
  }
}

async function getAllProducts(reqQuery = {}) {
  // Get all products with filtering and pagination
  let {
    category,
    color,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    sort,
    stock,
    pageNumber,
    pageSize,
  } = reqQuery;

  // Convert pagination parameters to numbers with defaults
  pageSize = Number(pageSize) || 10;
  pageNumber = Number(pageNumber) || 0;

  let query = Product.find();

  // Category filter
  if (category && category !== 'undefined' && category !== 'null') {
    query = query.or([
      { topLevelCategory: category },
      { secondLevelCategory: category },
      { thirdLevelCategory: category }
    ]);
  }

  // Color filter
  if (color && color !== 'undefined' && color !== 'null') {
    const colors = color.split(",").map(c => c.trim()).filter(c => c && c !== 'undefined' && c !== 'null');
    if (colors.length > 0) {
      query = query.where("color").in(colors);
    }
  }

  // Size filter
  if (sizes && sizes !== 'undefined' && sizes !== 'null') {
    const sizeArray = sizes.split(",").map(s => s.trim()).filter(s => s && s !== 'undefined' && s !== 'null');
    if (sizeArray.length > 0) {
      query = query.where("sizes.name").in(sizeArray);
    }
  }

  // Price filter
  if (minPrice && minPrice !== 'undefined' && minPrice !== 'null') {
    query = query.where("discountedPrice").gte(Number(minPrice));
  }
  if (maxPrice && maxPrice !== 'undefined' && maxPrice !== 'null') {
    query = query.where("discountedPrice").lte(Number(maxPrice));
  }

  // Discount filter
  if (minDiscount && minDiscount !== 'undefined' && minDiscount !== 'null') {
    query = query.where("discountPercent").gte(Number(minDiscount));
  }

  // Stock filter
  if (stock && stock !== 'undefined' && stock !== 'null' && stock !== "All") {
    if (stock === "in_stock") {
      query = query.where("quantity").gt(0);
    } else if (stock === "out_of_stock") {
      query = query.where("quantity").lte(0);
    }
  }

  // Sorting
  if (sort && sort !== 'undefined' && sort !== 'null') {
    const sortDirection = sort === "price_high" ? -1 : 1;
    query = query.sort({ discountedPrice: sortDirection });
  }

  // Count total products before pagination
  const totalProducts = await Product.countDocuments(query);

  // Apply pagination
  const skip = pageNumber * pageSize;
  query = query.skip(skip).limit(pageSize);

  // Execute query
  const products = await query.exec();
  const totalPages = Math.ceil(totalProducts / pageSize);

  return {
    content: products,
    currentPage: pageNumber,
    totalPages: totalPages,
    totalElements: totalProducts
  };
}

// Search products by query
async function searchProduct(query) {
  const regex = new RegExp(query, 'i'); // Case-insensitive search
  const products = await Product.find({
    $or: [
      { title: { $regex: regex } },
      { description: { $regex: regex } },
      { brand: { $regex: regex } }
    ]
  });
  return products;
}

async function createMultipleProduct(products) {
  for (let product of products) {
    await createProduct(product);
  }
}

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  findProductById,
  searchProduct,
  createMultipleProduct,
};