const swaggerJsDoc = require('swagger-jsdoc');

// Extended: http://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'My Profile Backend System',
      description: "My profile website backend system Api's infomation.",
      contact: {
        name: 'vaibhav katariya'
      },
      servers: ['http://localhost:5000']
    }
  },
  apis: ['./api/routes/*.js', './api/routes/*.yaml']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
