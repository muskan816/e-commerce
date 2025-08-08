const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');      // new
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const { errorHandler } = require('./middlewares/errorHandler');

dotenv.config();

const startServer = async () => {
  try {
    await connectDB();

    const app = express();
    // Use cookie-parser so we can access req.cookies
    app.use(cookieParser());                          // added:contentReference[oaicite:2]{index=2}

    // Enable CORS with credentials (so cookies are sent cross-site)
    app.use(cors({
      origin: 'https://e-commerce-mern-frontend.netlify.app',              // frontend origin
      credentials: true
    }));                                              // modified

    app.use(express.json());

    app.use('/api/auth', authRoutes);
    app.use('/api/products', productRoutes);
    app.use('/api/cart', cartRoutes);

    app.use(errorHandler);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

