const express = require('express');
const router = express.Router();


// Generate default models:: 

/**
 * @swagger
 * tags:
 *   - name: Login
 *     description: Login
 */

/**
 * @swagger
 * /login:
 *   post:
 *     description: Login to the application
 *     tags: [Users, Login]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/username'
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Login'
 */
router.post('/login', (req, res) => {
    res.json(req.body);
});

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and login
 */

/**
 * @swagger
 * /users:
 *   get:
 *     description: Returns users
 *     tags:
 *      - Users
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: users
 */
router.get('/users', (req, res) => {
    res.json({
        username: 'jsmith',
    });
});

/**
 * @swagger
 * /users:
 *   post:
 *     description: Returns users
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/username'
 *     responses:
 *       200:
 *         description: users
 */
router.post('/users', (req, res) => {
    res.json(req.body);
});

module.exports = router;