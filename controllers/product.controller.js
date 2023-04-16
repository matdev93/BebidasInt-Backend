const Product = require('../models/Product');

// Clientes

const getProducts = async(req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, msg: 'Lista de productos', info: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getProductById = async(req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);

    res.json({ success: true, message: 'Producto obtenido', info: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin

const createProduct = async (req, res) => {
  try {
    const user = await User.findById(req.auth.id);
    if (!user.isAdmin){
      throw new Error('No tienes acceso')
    }
    const newProduct = new Product(req.body);
    await newProduct.save();

    res.json({ success: true, message: 'Producto Creado', info: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const editProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findByIdAndUpdate(productId, req.body, {new: true});

    res.json({
      success: true,
      message: 'Producto editado',
      updateInfo: product
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findByIdAndDelete(productId);

    res.json({
      success: true,
      message: "Producto eliminado",
      deleteProduct: product
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = {
  getProducts,
  createProduct,
  getProductById,
  editProduct,
  deleteProduct,
};
