import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import eventRoutes from './routes/eventRoutes';
import applicationRoutes from './routes/applicationRoutes';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/applications', applicationRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'Bem-vindo à API da Agenda VIP!' });
});

// Middleware de erro
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo deu errado!' });
});

// Porta do servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
