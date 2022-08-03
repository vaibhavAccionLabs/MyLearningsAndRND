const express = require('express');

const router = express.Router();

// Inside routes can also create middlewares
// router.use('/api', function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET request to /products'
  });
});

router.post('/', (req, res, next) => {
  res.status(201).json({
    message: 'Handling POST request to /products'
  });
});

router.get('/:productID', (req, res, next) => {
  const id = req.params.productID;

  if (id === 'special') {
    res.status(200).json({
      message: 'You discovered the special ID',
      id
    });
  } else {
    res.status(200).json({
      message: 'You passed the ID',
      id
    });
  }
});

router.patch('/:productID', (req, res, next) => {
  res.status(200).json({
    message: 'Updated product'
  });
});

router.delete('/:productID', (req, res, next) => {
  res.status(200).json({
    message: 'Product deleted'
  });
});

module.exports = router;
