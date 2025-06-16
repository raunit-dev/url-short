import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import urlRoutes from './routes/url.routes';
import connectDB from './config/db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


app.use('/', urlRoutes);


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error(' Failed to start server due to DB error:', err);
});
