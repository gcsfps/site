# AGENDA VIP

Plataforma exclusiva para gerenciamento de eventos e experiências VIP em casas noturnas. O sistema conecta usuários, promoters e estabelecimentos, oferecendo uma experiência premium para reservas e participação em eventos.

## Visão Geral

O Agenda VIP é uma plataforma que revoluciona a maneira como as pessoas interagem com a vida noturna. Nosso sistema oferece:

### Para Usuários
- Descoberta de eventos exclusivos
- Reservas garantidas em estabelecimentos premium
- Sistema de perfil personalizado
- Acesso a promoções exclusivas
- Histórico de eventos e avaliações

### Para Promoters
- Dashboard completo para gerenciamento de eventos
- Sistema de lista VIP automatizado
- Métricas e análises de desempenho
- Gestão de clientes e relacionamentos
- Ferramentas de marketing e promoção

### Para Estabelecimentos
- Perfil comercial personalizado
- Gestão de eventos e capacidade
- Sistema de avaliações e feedback
- Relatórios detalhados de performance
- Integração com redes sociais

## Estado Atual do Projeto

### Funcionalidades Implementadas

#### Sistema de Usuários
- [x] Autenticação completa com NextAuth
- [x] Perfis personalizados com foto e informações
- [x] Página de perfil com dados do usuário
- [x] Configurações de conta e segurança
- [x] Sistema de verificação em duas etapas

#### Gestão de Eventos
- [x] Criação e edição de eventos
- [x] Upload de flyers e imagens
- [x] Sistema de reservas
- [x] Listagem de eventos na página inicial
- [x] Filtros e busca de eventos

#### Área do Promoter
- [x] Dashboard com métricas
- [x] Gestão de eventos próprios
- [x] Sistema de lista VIP
- [x] Relatórios de performance

#### Sistema de Assinaturas
- [x] Planos Basic e Ultimate
- [x] Gestão de benefícios por plano
- [x] Sistema de pagamentos
- [x] Histórico de assinaturas

### Próximas Implementações

#### Prioridade Alta
1. Sistema de Notificações
   - Push notifications para eventos
   - Alertas de lista VIP
   - Notificações de promoções

2. Chat Interno
   - Comunicação entre usuários e promoters
   - Sistema de mensagens automáticas
   - Histórico de conversas

3. Sistema de Avaliações
   - Avaliação de eventos
   - Feedback de estabelecimentos
   - Ranking de promoters

#### Prioridade Média
1. Integração com Redes Sociais
   - Compartilhamento automático
   - Login social
   - Feed de atividades

2. Sistema de Gamificação
   - Pontos por participação
   - Níveis de usuário
   - Benefícios exclusivos

#### Prioridade Baixa
1. App Mobile
   - Versão nativa para iOS e Android
   - Funcionalidades offline
   - Geolocalização

## Tecnologias Utilizadas

### Frontend
- Next.js 13
- TypeScript
- Tailwind CSS
- Framer Motion
- React Query

### Backend
- Node.js
- MongoDB
- Prisma ORM
- NextAuth.js
- JWT

### Infraestrutura
- Vercel (Deploy)
- MongoDB Atlas
- AWS S3 (Armazenamento)
- Stripe (Pagamentos)

## Configuração do Ambiente

1. Clone o repositório:
```bash
git clone https://github.com/gcsfps/site.git
cd site
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

4. Configure as seguintes variáveis no .env.local:
```env
DATABASE_URL=sua_url_mongodb
NEXTAUTH_SECRET=seu_secret
NEXTAUTH_URL=http://localhost:3000
STRIPE_SECRET_KEY=sua_chave_stripe
AWS_ACCESS_KEY=sua_chave_aws
AWS_SECRET_KEY=seu_secret_aws
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## Estrutura do Projeto

```
site/
├── components/         # Componentes React reutilizáveis
├── contexts/          # Contextos React (auth, theme, etc)
├── lib/              # Utilitários e configurações
├── pages/            # Páginas e rotas da aplicação
│   ├── api/         # Endpoints da API
│   └── ...         # Outras páginas
├── prisma/          # Schema e migrações do banco
├── public/          # Arquivos estáticos
├── src/             # Código fonte principal
│   ├── middleware/  # Middlewares da aplicação
│   ├── types/      # Definições de tipos TypeScript
│   └── utils/      # Funções utilitárias
└── styles/          # Estilos globais e temas
```

## Contribuição

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
