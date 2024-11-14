const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const { keyword, minPrice, maxPrice, sort } = req.query;

    const query = {};
    if (keyword) query.name = { $regex: keyword, $options: 'i' };
    if (minPrice) query.price = { $gte: parseFloat(minPrice) };
    if (maxPrice) query.price = { $lte: parseFloat(maxPrice) };

    const sortOrder = sort === 'price_asc' ? { price: 1 } : { price: -1 };

    const products = await Product.find(query).sort(sortOrder);
    res.json(products);
  } catch (err) {
    next(err);
  }
};
