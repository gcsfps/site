import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function fixAllPasswords() {
  try {
    // Busca todos os usuários
    const users = await prisma.user.findMany();
    console.log(`Encontrados ${users.length} usuários para atualizar`);
    
    // Para cada usuário
    for (const user of users) {
      try {
        // Define a senha padrão como 123456
        const newPassword = '123456';
        const hashedPassword = await hash(newPassword, 8);
        
        // Atualiza a senha no banco
        await prisma.user.update({
          where: { id: user.id },
          data: { 
            password: hashedPassword,
            // Garante que o tipo está correto
            type: user.type === 'vip' ? 'vip' : user.type
          }
        });
        
        console.log(`✅ Atualizado usuário: ${user.email}`);
        console.log(`   Nova senha: ${newPassword}`);
        console.log(`   Tipo: ${user.type === 'vip' ? 'vip' : user.type}`);
      } catch (error) {
        console.error(`❌ Erro ao atualizar usuário ${user.email}:`, error);
      }
    }
    
    console.log('\n✨ Processo finalizado!');
    console.log('Todas as senhas foram redefinidas para: 123456');
  } catch (error) {
    console.error('Erro ao atualizar senhas:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixAllPasswords();
