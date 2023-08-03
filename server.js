import express, { json } from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import dbConnection from './src/config/database.config.js';
import CustomError from './src/utils/custom-error.js';
import globalErrorHandler from './src/middlewares/error.middleware.js';
import subCategoryRouter from './src/routes/sub-category.route.js';
import brandRouter from './src/routes/brand.route.js';
import categoryRouter from './src/routes/category.route.js';
import productRouter from './src/routes/product.route.js';

config({ path: 'config.env' });

// Database Connection
dbConnection();

const app = express();

// Middlewares
app.use(json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

//Routes
app.get('/', (req, res) => {
  res.send('Hello Bitch');
});

//Mount Routes
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/subcategories', subCategoryRouter);
app.use('/api/v1/brands', brandRouter);
app.use('/api/v1/products', productRouter);
app.all('*', (req, res, next) => {
  next(new CustomError(`Can't find this endpoint: ${req.originalUrl}`, 400));
});

// Global Error Handler Middleware
app.use(globalErrorHandler);

// Server
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App listenning on http://localhost:${PORT}`);
});

// handling  Rejection outside express
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection Error: ${err}`);
  server.close(() => {
    console.log('Shutting Server down....');
    process.exit(1);
  });
});
