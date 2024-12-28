import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../lib/prisma';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ message: 'Não autorizado' });
  }

  if (req.method === 'POST') {
    try {
      // Verificar se é um promoter
      if (session.user.type !== 'promoter') {
        return res.status(403).json({ message: 'Apenas promoters podem criar eventos' });
      }

      // Configurar o formidable para processar o upload
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const form = formidable({
        uploadDir,
        keepExtensions: true,
        maxFileSize: 5 * 1024 * 1024, // 5MB
      });

      // Processar o formulário
      const [fields, files] = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          resolve([fields, files]);
        });
      });

      // Validar campos obrigatórios
      const requiredFields = ['name', 'date', 'time', 'location', 'totalSpots', 'payment', 'description'];
      const missingFields = requiredFields.filter(field => !fields[field]);

      if (missingFields.length > 0) {
        return res.status(400).json({
          message: `Campos obrigatórios faltando: ${missingFields.join(', ')}`,
          missingFields
        });
      }

      // Processar o flyer
      const flyer = files.flyer?.[0];
      if (!flyer) {
        return res.status(400).json({ message: 'Por favor, selecione um flyer para o evento' });
      }

      // Validar tipo do arquivo
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(flyer.mimetype || '')) {
        fs.unlinkSync(flyer.filepath);
        return res.status(400).json({ message: 'Tipo de arquivo não permitido' });
      }

      // Gerar nome único para o arquivo
      const fileName = `${Date.now()}-${flyer.originalFilename}`;
      const newPath = path.join(uploadDir, fileName);

      // Mover arquivo para localização final
      fs.renameSync(flyer.filepath, newPath);
      const flyerUrl = `/uploads/${fileName}`;

      // Criar o evento
      const event = await prisma.event.create({
        data: {
          name: fields.name.toString(),
          date: new Date(`${fields.date}T${fields.time}`),
          time: fields.time.toString(),
          location: fields.location.toString(),
          totalSpots: parseInt(fields.totalSpots.toString()),
          payment: parseFloat(fields.payment.toString()),
          description: fields.description.toString(),
          flyerUrl,
          organizerId: session.user.id,
          status: 'active',
          availableSpots: parseInt(fields.totalSpots.toString())
        }
      });

      return res.status(201).json(event);
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      return res.status(500).json({ message: 'Erro ao criar evento', error: error.message });
    }
  } else if (req.method === 'GET') {
    try {
      const events = await prisma.event.findMany({
        orderBy: {
          date: 'asc'
        }
      });
      return res.status(200).json(events);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
      return res.status(500).json({ message: 'Erro ao buscar eventos' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
