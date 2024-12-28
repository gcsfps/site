import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkSubscriptions() {
  try {
    // Busca todas as assinaturas ativas que não são permanentes e já venceram
    const expiredSubscriptions = await prisma.subscription.findMany({
      where: {
        status: 'active',
        isPermanent: false,
        endDate: {
          lt: new Date(), // menor que a data atual
        },
      },
    });

    // Atualiza o status para inativo
    for (const subscription of expiredSubscriptions) {
      await prisma.subscription.update({
        where: { id: subscription.id },
        data: { status: 'inactive' },
      });

      console.log(`Assinatura ${subscription.id} desativada por vencimento`);
    }

    console.log(`${expiredSubscriptions.length} assinaturas verificadas e atualizadas`);
  } catch (error) {
    console.error('Erro ao verificar assinaturas:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Executa a verificação
checkSubscriptions();
