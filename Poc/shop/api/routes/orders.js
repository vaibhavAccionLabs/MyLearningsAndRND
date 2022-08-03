const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Orders fetched'
  });
});

router.post('/', (req, res, next) => {
  res.status(201).json({
    message: 'Order Created'
  });
});

router.get('/:orderID', (req, res, next) => {
  res.status(200).json({
    message: 'Orders fetched by id',
    order_id: req.params.orderID
  });
});

router.delete('/:orderID', (req, res, next) => {
  res.status(200).json({
    message: 'Orders deleted',
    order_id: req.params.orderID
  });
});

module.exports = router;
