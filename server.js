import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';
import usersRouter from './routes/users.routes.js';

const app = express();

// Middlewares
app.use(cors());           // permitir CORS desde frontend
app.use(express.json());   // parsear JSON
app.use(morgan('dev'));    // logs en consola

// Rutas
app.use('/api/users', usersRouter);

// Arranque
const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB conectado');
    app.listen(PORT, () => console.log(`🚀 API http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('❌ Error MongoDB:', err.message);
    process.exit(1);
  });
