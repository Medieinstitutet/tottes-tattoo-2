import dotenv from 'dotenv';
import bookingRouter from './routes/booking-routes.mjs';

dotenv.config({ path: './src/config/config.env' });

const config = {
	port: process.env.PORT || 3000,
	nodeEnv: process.env.NODE_ENV || 'development',
	mongoUri: process.env.MONGO_URI,
	uploadPath: 'uploads/',
	corsOptions: {
		origin: process.env.CORS_ORIGIN || '*',
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	},
};

export default config;
