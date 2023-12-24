import swaggerJsDoc from 'swagger-jsdoc';

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API с Swagger',
      version: '1.0.0',
    },
  },
  apis: ['../controller/*.ts'], // путь к файлам API
};

const specs = swaggerJsDoc(options);

export default specs;
