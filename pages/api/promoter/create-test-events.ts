import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.DATABASE_URL || '';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    const client = await MongoClient.connect(uri);
    const db = client.db();

    // Encontrar o usuário
    const user = await db.collection('User').findOne({ email });

    if (!user) {
      await client.close();
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Criar eventos de teste
    const testEvents = [
      {
        _id: new ObjectId(),
        name: 'Festa de Ano Novo',
        date: new Date('2024-12-31'),
        time: '22:00',
        location: 'Clube Test, São Paulo',
        totalSpots: 100,
        availableSpots: 100,
        payment: 50.0,
        description: 'Venha celebrar a virada do ano conosco! Open bar, música ao vivo e muito mais.',
        organizerId: user._id.toString(),
        status: 'active',
        flyerUrl: '/images/events/newyear.jpg',
        featured: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: 'Pool Party de Verão',
        date: new Date('2024-01-15'),
        time: '14:00',
        location: 'Mansão Test, São Paulo',
        totalSpots: 50,
        availableSpots: 50,
        payment: 80.0,
        description: 'A melhor pool party do verão! DJs internacionais, drinks especiais e muita diversão.',
        organizerId: user._id.toString(),
        status: 'active',
        flyerUrl: '/images/events/pool.jpg',
        featured: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: 'Baile de Carnaval',
        date: new Date('2024-02-10'),
        time: '20:00',
        location: 'Test Club, São Paulo',
        totalSpots: 200,
        availableSpots: 200,
        payment: 40.0,
        description: 'O melhor carnaval da cidade! Venha fantasiado e aproveite as marchinhas e muito axé.',
        organizerId: user._id.toString(),
        status: 'active',
        flyerUrl: '/images/events/carnival.jpg',
        featured: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Primeiro, excluir eventos existentes do usuário
    await db.collection('Event').deleteMany({ organizerId: user._id.toString() });

    // Depois criar os novos eventos
    const result = await db.collection('Event').insertMany(testEvents);

    await client.close();

    return res.status(200).json({ 
      message: 'Eventos criados com sucesso',
      events: result.insertedIds
    });
  } catch (error) {
    console.error('Erro ao criar eventos:', error);
    return res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
  }
}
