// Tipos para Usuários
export interface IUser {
  id?: string;
  name: string;
  email: string;
  whatsapp: string;
  type: 'organizer' | 'presenca_vip';
  password: string;
  subscription?: ISubscription; // Apenas para organizadores
}

// Tipos para Perfis de Presença VIP
export interface IProfile {
  id?: string;
  userId: string;
  profilePhoto: string;
  coverPhoto?: string;
  age: number;
  region: string;
  description: string;
  instagram?: string;
  height?: string;
  weight?: string;
  interests?: string[];
  photos: string[]; // Array de URLs das fotos do perfil
  isPrivate: boolean; // Se true, apenas assinantes podem ver detalhes completos
  reputation: number;
}

// Tipos para Assinaturas
export interface ISubscription {
  id?: string;
  userId: string;
  plan: 'basic' | 'premium' | 'ultimate';
  status: 'active' | 'inactive' | 'cancelled';
  features: {
    maxEvents: number;
    maxPresencasPerEvent: number;
    analytics: boolean;
    prioritySupport: boolean;
    customBranding: boolean;
    profileAccess: boolean;
  };
  startDate: Date;
  endDate: Date;
  price: number;
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
  flyer: string;
  description: string;
}

// Tipos para Candidaturas
export interface IApplication {
  id?: string;
  eventId: string;
  presencaVipId: string;
  status: 'pending' | 'approved' | 'rejected';
  applicationDate: Date;
  presencaVipInfo: {
    name: string;
    whatsapp: string;
    photo?: string;
  };
}

// Tipo para Lista de Presenças
export interface IPresenceList {
  eventId: string;
  confirmedPresences: Array<{
    presencaVipId: string;
    name: string;
    whatsapp: string;
    status: 'confirmed' | 'cancelled' | 'no_show';
  }>;
}
