import { Router } from 'express';
import { IEvent } from '../types';

const router = Router();

// Armazenamento temporário
let events: IEvent[] = [];

// Criar evento
router.post('/', (req, res) => {
  const event: IEvent = {
    ...req.body,
    id: Date.now().toString(),
    status: 'available',
    availableSpots: req.body.totalSpots
  };
  
  events.push(event);
  res.status(201).json({ message: 'Evento criado com sucesso', event });
});

// Listar todos os eventos
router.get('/', (req, res) => {
  res.json(events);
});

// Obter evento específico
router.get('/:id', (req, res) => {
  const event = events.find(e => e.id === req.params.id);
  
  if (!event) {
    return res.status(404).json({ message: 'Evento não encontrado' });
  }
  
  res.json(event);
});

// Atualizar evento
router.put('/:id', (req, res) => {
  const index = events.findIndex(e => e.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Evento não encontrado' });
  }
  
  events[index] = { ...events[index], ...req.body };
  res.json({ message: 'Evento atualizado com sucesso', event: events[index] });
});

// Deletar evento
router.delete('/:id', (req, res) => {
  const index = events.findIndex(e => e.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Evento não encontrado' });
  }
  
  events.splice(index, 1);
  res.json({ message: 'Evento removido com sucesso' });
});

export default router;
