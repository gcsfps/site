import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

// Usuários de teste
const TEST_USERS = {
  basic: {
    id: '1',
    email: 'basic@test.com',
    password: 'basic123',
    type: 'organizer',
    name: 'Promoter Basic',
    subscription: {
      plan: 'basic',
      status: 'active',
      features: {
        maxEvents: 5,
        maxPresencasPerEvent: 50,
        analytics: false,
        prioritySupport: false,
        customBranding: false,
        profileAccess: true,
      }
    }
  },
  premium: {
    id: '2',
    email: 'premium@test.com',
    password: 'premium123',
    type: 'organizer',
    name: 'Promoter Premium',
    subscription: {
      plan: 'premium',
      status: 'active',
      features: {
        maxEvents: 15,
        maxPresencasPerEvent: 150,
        analytics: true,
        prioritySupport: true,
        customBranding: false,
        profileAccess: true,
      }
    }
  },
  ultimate: {
    id: '3',
    email: 'ultimate@test.com',
    password: 'ultimate123',
    type: 'organizer',
    name: 'Promoter Ultimate',
    subscription: {
      plan: 'ultimate',
      status: 'active',
      features: {
        maxEvents: -1,
        maxPresencasPerEvent: -1,
        analytics: true,
        prioritySupport: true,
        customBranding: true,
        profileAccess: true,
      }
    }
  },
  presencaVip: {
    id: '4',
    email: 'presenca@test.com',
    password: 'presenca123',
    type: 'presenca_vip',
    name: 'Presença VIP Test',
    whatsapp: '11999999999'
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    // Encontrar usuário
    const user = Object.values(TEST_USERS).find(u => u.email === email);
    
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { userId: user.id, type: user.type },
      'your-secret-key', // Em produção, use uma chave secreta do ambiente
      { expiresIn: '24h' }
    );

    // Retornar usuário e token (sem a senha)
    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}
