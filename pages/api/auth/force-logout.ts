import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Configura cookies de autenticação para expirar
    res.setHeader('Set-Cookie', [
      'next-auth.session-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
      'next-auth.csrf-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
      'next-auth.callback-url=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
      '__Secure-next-auth.session-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure',
      '__Host-next-auth.csrf-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure'
    ]);
    
    // Retorna sucesso
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
