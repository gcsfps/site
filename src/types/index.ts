git push origin maingit push origin main// Tipos para Usuários
export interface IUser {
  id?: string;
  name: string;
  email: string;
  type: 'organizer' | 'vip';
  password: string;
}

// Tipos para Perfis
export interface IProfile {
  id?: string;
  userId: string;
  photo?: string;
  age: number;
  region: string;
  description: string;
  reputation: number;
}

// Tipos para Eventos
export interface IEvent {
  id?: string;
  name: string;
  date: Date;
  location: string;
  payment: number;
  organizerId: string;
  totalSpots: number;
  availableSpots: number;
  status: 'available' | 'full';
}

// Tipos para Candidaturas
export interface IApplication {
  id?: string;
  eventId: string;
  vipId: string;
  status: 'pending' | 'approved' | 'rejected';
  applicationDate: Date;
}
