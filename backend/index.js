import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import expenseRoutes from './routes/expenses.js';

const app = express();
app.use(express.json());
app.use(cors());

//Connect MONGODB
mongoose
  .connect('', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
