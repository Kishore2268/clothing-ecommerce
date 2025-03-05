const mongoose = require('mongoose');
const Product = require('../models/product.model');

const mongoDbUrl = 'mongodb+srv://kishore:KishSabi%402268@anivarti.cp7lj.mongodb.net/clothing-store';

async function checkProduct(productId) {
  try {
    await mongoose.connect(mongoDbUrl);
    console.log('Connected to database');

    const product = await Product.findById(productId);
    if (product) {
      console.log('Product found:', product);
    } else {
      console.log('Product not found with ID:', productId);
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

checkProduct('67c7fad01815ac600587a79f'); 