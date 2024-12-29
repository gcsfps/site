import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function updatePasswords() {
  try {
    // Busca todos os usuários
    const users = await prisma.user.findMany();
    
    // Para cada usuário
    for (const user of users) {
      // Hash a senha atual
      const hashedPassword = await hash(user.password, 8);
      
      // Atualiza a senha no banco
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword }
      });
      
      console.log(`Senha atualizada para o usuário: ${user.email}`);
    }
    
    console.log('Todas as senhas foram atualizadas com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar senhas:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updatePasswords();
