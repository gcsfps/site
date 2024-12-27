import { Router } from 'express';
import { IUser } from '../types';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Armazenamento temporário
let users: (IUser & { id: string })[] = [];

// Registro de usuário
router.post('/register', async (req, res) => {
  try {
    const { email, password, ...rest } = req.body;

    // Verificar se o usuário já existe
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar novo usuário
    const newUser = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      ...rest
    };

    users.push(newUser);

    // Gerar token
    const token = jwt.sign(
      { id: newUser.id, type: newUser.type },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Usuário criado com sucesso',
      token,
      user: { id: newUser.id, email: newUser.email, type: newUser.type }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar usuário' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);

    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { id: user.id, type: user.type },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login realizado com sucesso',
      token,
      user: { id: user.id, email: user.email, type: user.type }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
});

// Obter perfil do usuário (protegido)
router.get('/profile', authMiddleware, (req: AuthRequest, res) => {
  const user = users.find(u => u.id === req.user?.id);

  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

// Atualizar perfil (protegido)
router.put('/profile', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const index = users.findIndex(u => u.id === req.user?.id);

    if (index === -1) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const { password, email, ...updateData } = req.body;
    users[index] = { ...users[index], ...updateData };

    const { password: _, ...userWithoutPassword } = users[index];
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar perfil' });
  }
});

export default router;
