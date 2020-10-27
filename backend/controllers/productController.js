import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc   Fetch all products
// @route  GET /api/products
// @access Public

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc   Fetch single products
// @route  GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc   Delete single products
// @route  DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc   Create product
// @route  POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Guitar',
    price: 0,
    user: req.user._id,
    image: '/images/guitar.jpg',
    brand: "VES62 '62 Strat Style SSS Electric Guitar",
    countInStock: 0,
    numReviews: 0,
    description:
      "The VES62 '62 style Custom Handmade Electric Guitar features a genuine Basswood body and bolt on Maple neck with a 21 fret engineered Rosewood fretboard.The double offset cutaway body is comfortable and it's classic shape is instantly recognisable. The 21 Nickel Silver semi-jumbo Frets and the beautifully tinted neck adds to the vintage look.The multi-ply pickguard looks the part and continues the vintage touch complimenting the luxurious gloss finish perfectly.",
    category: 'Guitar',
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc   Update product
// @route  PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
