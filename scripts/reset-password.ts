import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function resetPassword() {
  try {
    const email = 'gabrielcordeiromail@gmail.com';
    const newPassword = '123456'; // Senha temporária
    
    // Hash a nova senha
    const hashedPassword = await hash(newPassword, 8);
    
    // Atualiza a senha no banco
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword }
    });
    
    console.log(`Senha resetada com sucesso para ${email}`);
    console.log(`Nova senha: ${newPassword}`);
  } catch (error) {
    console.error('Erro ao resetar senha:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetPassword();
