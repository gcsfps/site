import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'gabrielcordeiromail@gmail.com';

  try {
    const updatedUser = await prisma.user.update({
      where: { email: adminEmail },
      data: {
        type: 'organizer',
        subscription: {
          plan: 'Ultimate',
          status: 'active',
          isAdmin: true,
          isPermanent: true,
          features: {
            maxEvents: -1,
            maxPresencasPerEvent: -1,
            maxFlyersPerMonth: -1,
            analytics: true,
            prioritySupport: true,
            customBranding: true,
            profileAccess: true,
          },
          startDate: new Date().toISOString(),
        },
      },
    });

    console.log('Conta atualizada com sucesso:', updatedUser);
  } catch (error) {
    console.error('Erro ao atualizar conta:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
