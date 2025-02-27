// Tipos para Usuários
export interface IUser {
  id: string;
  email: string;
  name: string;
  type: 'promoter' | 'vip';
  whatsapp?: string;
  subscription?: any;
  establishmentName?: string;
  address?: {
    cep: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
  };
  phone?: string;
  description?: string;
  profileImage?: string;
  coverImage?: string;
  openingHours?: {
    [key: string]: {
      open: string;
      close: string;
    };
  };
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

// Tipos para NextAuth
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      type: 'promoter' | 'vip';
      establishmentName?: string;
      phone?: string;
      description?: string;
      profileImage?: string;
      coverImage?: string;
      address?: {
        cep: string;
        street: string;
        number: string;
        complement?: string;
        neighborhood: string;
        city: string;
        state: string;
      };
      openingHours?: {
        [key: string]: {
          open: string;
          close: string;
        };
      };
      socialMedia?: {
        instagram?: string;
        facebook?: string;
        twitter?: string;
      };
    };
  }
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
  plan: 'Basic' | 'Premium' | 'Ultimate';
  status: 'active' | 'inactive';
  isAdmin?: boolean;
  isPermanent?: boolean;
  features: {
    maxEvents: number;
    maxPresencasPerEvent: number;
    maxFlyersPerMonth: number;
    analytics: boolean;
    prioritySupport: boolean;
    customBranding: boolean;
    profileAccess: boolean;
  };
  startDate: string;
  endDate?: string;
}

// Tipos para Eventos
export interface IEvent {
  id?: string;
  organizerId: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  maxPresences: number;
  currentPresences: number;
  status: 'draft' | 'published' | 'cancelled' | 'finished';
  requirements?: string[];
  benefits?: string[];
  photos?: string[];
  categories?: string[];
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

// Tipos para Revisões
export type Review = {
  id: string;
  eventId: string;
  userId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
  user?: IUser;
  event?: IEvent;
};

// Tipos para Toast
export type ToastMessage = {
  type: 'success' | 'error';
  message: string;
};
