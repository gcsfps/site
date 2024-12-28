import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'gabrielcordeiromail@gmail.com';

  try {
    const user = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    console.log('Dados do usuário:', JSON.stringify(user, null, 2));
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
