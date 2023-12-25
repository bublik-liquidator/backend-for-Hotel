import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import dotenv from 'dotenv';
dotenv.config();

const swaggerDefinition = {
  openapi: '3.0.1',
  info: {
    title: 'API Documentation',
    version: '1.2.0',
    description: 'API Documentation',
  },
  servers: [
    {
      url: `http://${process.env.POSTGRESQL_HOST}:${process.env.INDEX_APP_PORT}/api`,
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  }
};


const options = {
  swaggerDefinition,
  apis: ['./src/controller/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default (app: any) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
