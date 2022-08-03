const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().getFullYear() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});
const Product = require('../models/product');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product Management API(s)
 */

/**
 * @swagger
 * /products:
 *   get:
 *     tags:
 *       - Products
 *     name: Products
 *     summary: Get all products
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: Get Products successfully
 */
router.get('/', (req, res, next) => {
  Product.find()
    .select('name price productImage id')
    .exec()
    .then(products => {
      const len_of_products = products.length;
      const response = {
        count: len_of_products,
        products: products.map(product => {
          return {
            id: product._id,
            name: product.name,
            productImage: 'http://localhost:5000' + product.productImage,
            price: product.price,
            request: {
              type: 'GET',
              uri: 'http://localhost:3000/products/' + product._id
            }
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(error => res.status(500).json({ error }));
});

//create product
/**
 * @swagger
 * /products:
 *   post:
 *     tags:
 *       - Products
 *     name: Product create
 *     summary: create a product
 *     operationId: "createProduct"
 *     produces:
 *      - "application/json"
 *     parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "Created product object"
 *        required: true
 *        schema:
 *          $ref: "#/definitions/Product"
 *     responses:
 *       200:
 *         description: Product created successfully
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Product'
 */
router.post('/', upload.single('productImage'), (req, res, next) => {
  console.log('FILE DATA::', req.file);
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: '/uploads/' + req.file.filename
  });
  product
    .save()
    .then(result => {
      console.log(result);
      const product = {};
      if (result) {
        (product['_id'] = result._id),
          (product['name'] = result.name),
          (product['price'] = result.price);
      }
      res.status(201).json(product);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// GET Single Product
/**
 * @swagger
 * /products/{product_id}:
 *   get:
 *     tags:
 *       - Products
 *     name: Product details
 *     summary: Get all information about product pass product id
 *     operationId: "getProductById"
 *     parameters:
 *      - name: "product_id"
 *        in: "path"
 *        description: "UUID of product that needs to be fetched (_id of product in /products API) "
 *        required: true
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: Get Product details successfully
 */
router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select('name price _id')
    .exec()
    .then(product => {
      console.log('Product:id:', product);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ error: 'Id Not valid' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Update product
router.patch('/:productId', (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  Object.keys(req.body).forEach(key => {
    updateOps[key] = req.body[key];
  });
  // If Pass as an array
  // for (const ops of req.body) {
  //     updateOps[ops.propName] = ops.value;
  // }
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(product => res.status(200).json(product))
    .catch(error => res.status(500).json({ error }));
});

// Delete product
/**
 * @swagger
 * /products/{product_id}:
 *   delete:
 *     tags:
 *       - Products
 *     name: Product delete
 *     summary: Delete the product
 *     operationId: "deleteProductById"
 *     parameters:
 *      - name: "product_id"
 *        in: "path"
 *        description: "UUID of product that needs to be delete (_id of product in /products API) "
 *        required: true
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */
router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      if (result) {
        res.status(200).json({
          success: 'Product deleted successfully'
        });
      }
    })
    .catch(error => res.status(500).json({ error }));
});

module.exports = router;
