import swaggerJsDoc from 'swagger-jsdoc';
import dotenv from 'dotenv';

dotenv.config();

const swaggerDefinition = {
  info: {
    title: 'API BUI-PHAN-SERVICE',
    version: '1.0.0',
    description: 'This is the REST API for project BUI-PHAN-SERVICE',
  },
  host: process.env.API_HOST,
  basePath: '/api',
  tags: [
    {
      name: '[Admin]: Admin',
      description: 'Quản lý admin',
    },
    {
      name: '[Admin]: Sessions',
      description: 'Quản lý phiên đăng nhập người dùng',
    },
    {
      name: '[Admin]: Uploaders',
      description: 'Quản lý upload',
    },
    {
      name: '[User]: Users',
      description: 'Quản lý khách hàng',
    },
    {
      name: '[User]: Sessions',
      description: 'Quản lý phiên đăng nhập',
    },
    {
      name: '[User]: Passwords',
      description: 'Quản lý mật khẩu',
    },
    {
      name: '[User]: Uploaders',
      description: 'Quản lý upload',
    },
  ],
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      schema: 'bearer',
      name: 'Authorization',
      in: 'header',
      prefix: 'Bearer ',
    },
  },
  definitions: {},
};

const options = {
  swaggerDefinition,
  explorer: true,
  apis: ['**/*.ts'],
};
export default swaggerJsDoc(options);
