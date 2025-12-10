import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import categoryRoutes from './routes/categories';
import todoRoutes from './routes/todos';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/category', categoryRoutes);
app.use('/api/todo', todoRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
