import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: 'Não autorizado' });
    }

    // Criar diretório de uploads se não existir
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const form = formidable({
      uploadDir,
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Erro no upload:', err);
        return res.status(500).json({ message: 'Erro no upload do arquivo' });
      }

      const file = files.file?.[0];
      if (!file) {
        return res.status(400).json({ message: 'Nenhum arquivo enviado' });
      }

      // Validar tipo do arquivo
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.mimetype || '')) {
        fs.unlinkSync(file.filepath); // Remove o arquivo inválido
        return res.status(400).json({ message: 'Tipo de arquivo não permitido' });
      }

      // Gerar nome único para o arquivo
      const fileName = `${Date.now()}-${file.originalFilename}`;
      const newPath = path.join(uploadDir, fileName);

      // Mover arquivo para localização final
      fs.renameSync(file.filepath, newPath);

      // Retornar URL do arquivo
      const fileUrl = `/uploads/${fileName}`;
      return res.status(200).json({ fileUrl });
    });
  } catch (error) {
    console.error('Erro no upload:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}
