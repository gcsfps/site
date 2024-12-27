import { Router } from 'express';
import { IApplication } from '../types';

const router = Router();

// Armazenamento temporário
let applications: IApplication[] = [];

// Criar candidatura
router.post('/', (req, res) => {
  const application: IApplication = {
    ...req.body,
    id: Date.now().toString(),
    status: 'pending',
    applicationDate: new Date()
  };
  
  applications.push(application);
  res.status(201).json({ message: 'Candidatura enviada com sucesso', application });
});

// Listar candidaturas por evento
router.get('/event/:eventId', (req, res) => {
  const eventApplications = applications.filter(a => a.eventId === req.params.eventId);
  res.json(eventApplications);
});

// Listar candidaturas por VIP
router.get('/vip/:vipId', (req, res) => {
  const vipApplications = applications.filter(a => a.vipId === req.params.vipId);
  res.json(vipApplications);
});

// Atualizar status da candidatura
router.put('/:id/status', (req, res) => {
  const { status } = req.body;
  const index = applications.findIndex(a => a.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Candidatura não encontrada' });
  }
  
  applications[index].status = status;
  res.json({ message: 'Status atualizado com sucesso', application: applications[index] });
});

export default router;
