import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Limpar o banco de dados
  await prisma.review.deleteMany();
  await prisma.application.deleteMany();
  await prisma.event.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Banco de dados limpo');

  // Criar conta promoter Ultimate
  const promoterPassword = await hash('teste123', 12);
  const promoter = await prisma.user.create({
    data: {
      email: 'promoter@teste.com',
      password: promoterPassword,
      name: 'Promoter Teste',
      type: 'promoter',
      whatsapp: '11999999999',
      establishmentName: 'Balada Test Club',
      address: {
        street: 'Rua Teste',
        number: '123',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567'
      },
      phone: '11999999999',
      description: 'A melhor balada de teste de São Paulo!',
      openingHours: {
        monday: 'Fechado',
        tuesday: 'Fechado',
        wednesday: '22:00 - 05:00',
        thursday: '22:00 - 05:00',
        friday: '22:00 - 06:00',
        saturday: '22:00 - 06:00',
        sunday: 'Fechado'
      },
      socialMedia: {
        instagram: '@baladatestclub',
        facebook: 'baladatestclub',
        twitter: '@baladatestclub'
      }
    }
  });

  // Criar assinatura Ultimate para o promoter
  await prisma.subscription.create({
    data: {
      userId: promoter.id,
      plan: 'Ultimate',
      status: 'active',
      startDate: new Date(),
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 ano
      isPermanent: true
    }
  });

  console.log('👔 Conta promoter Ultimate criada');

  // Criar conta VIP
  const vipPassword = await hash('teste123', 12);
  const vip = await prisma.user.create({
    data: {
      email: 'vip@teste.com',
      password: vipPassword,
      name: 'VIP Teste',
      type: 'presenca_vip',
      whatsapp: '11988888888'
    }
  });

  console.log('🎭 Conta VIP criada');

  console.log('\nContas de teste criadas com sucesso!');
  console.log('\nCredenciais Promoter:');
  console.log('Email: promoter@teste.com');
  console.log('Senha: teste123');
  console.log('\nCredenciais VIP:');
  console.log('Email: vip@teste.com');
  console.log('Senha: teste123');
}

main()
  .catch((e) => {
    console.error('Erro:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
