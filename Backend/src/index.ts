import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import { authenticate } from './middleware/authMiddleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/api/protected', authenticate, (req, res) => {
  res.json({ message: 'You have access to this protected route', user: (req as any).user });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
