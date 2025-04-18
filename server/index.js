const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');
const paymentRoutes = require('./routes/payment');
const contactRoutes = require('./routes/contact');

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:3001', 
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://host.docker.internal:3000',
    'http://frontend:3000',
    // Allow all origins in development (comment this out in production)
    (origin, callback) => {
      callback(null, true);
    }
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  credentials: true,
  optionsSuccessStatus: 200,
  preflightContinue: false,
  maxAge: 86400
};

// Enable CORS with the above configuration
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Parse JSON bodies
app.use(express.json());

// Mount auth routes
app.use('/api/auth', authRoutes);

// Mount user routes with /api/users prefix
app.use('/api/users', userRoutes);

// Mount admin routes with /api/admin prefix
app.use('/api/admin', adminRoutes);

// Mount payment routes with /api/payment prefix
app.use('/api/payment', paymentRoutes);

// Mount contact routes with /api/contact prefix
app.use('/api/contact', contactRoutes);

// Handle 404s
app.use((req, res) => {
  console.log('404 Not Found:', req.method, req.url);
  res.status(404).json({ error: `Route ${req.url} not found` });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
