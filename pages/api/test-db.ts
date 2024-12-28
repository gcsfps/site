import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../src/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Buscar todos os usuários (exceto as senhas)
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        type: true,
        subscription: true,
        createdAt: true,
        updatedAt: true,
        // não incluímos password aqui por segurança
      }
    })
    
    res.status(200).json({ 
      success: true, 
      message: `${users.length} usuários encontrados`,
      users
    })
  } catch (error) {
    console.error('Database test error:', error)
    res.status(500).json({ 
      success: false, 
      error: 'Erro na operação do banco de dados',
      details: error instanceof Error ? error.message : String(error)
    })
  }
}
