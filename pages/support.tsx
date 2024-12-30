import { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: 'Como criar um evento?',
    answer: 'Para criar um evento, acesse seu dashboard, clique em "Criar Evento" e preencha todas as informações necessárias como nome, data, local e descrição do evento.'
  },
  {
    question: 'Como gerenciar as inscrições?',
    answer: 'Você pode gerenciar todas as inscrições do seu evento na seção "Meus Eventos". Lá você pode ver quem se inscreveu, aprovar ou recusar inscrições.'
  },
  {
    question: 'Como funciona o sistema de presença?',
    answer: 'No dia do evento, você pode confirmar a presença dos VIPs através da página do evento, na seção "Confirmar Presenças".'
  },
  {
    question: 'Como atualizar meu plano?',
    answer: 'Acesse a página "Minha Assinatura" no menu do usuário para ver os planos disponíveis e fazer um upgrade.'
  }
];

export default function Support() {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketMessage) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/support/ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: ticketSubject,
          message: ticketMessage,
        }),
      });

      if (response.ok) {
        setTicketSubject('');
        setTicketMessage('');
        // Mostrar mensagem de sucesso
      }
    } catch (error) {
      console.error('Erro ao enviar ticket:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-white mb-8">Suporte</h1>

        {/* Seção de FAQ */}
        <div className="bg-dark-800/50 rounded-xl p-6 border border-white/5 mb-8">
          <h2 className="text-xl font-semibold text-white mb-6">Perguntas Frequentes</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/5 last:border-0 pb-4 last:pb-0">
                <button
                  onClick={() => setSelectedFaq(selectedFaq === index ? null : index)}
                  className="w-full flex justify-between items-center text-left"
                >
                  <span className="text-white hover:text-accent-purple transition-colors">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-400 transform transition-transform ${
                      selectedFaq === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {selectedFaq === index && (
                  <p className="mt-2 text-gray-400">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Formulário de Contato */}
        <div className="bg-dark-800/50 rounded-xl p-6 border border-white/5">
          <h2 className="text-xl font-semibold text-white mb-6">Enviar Ticket</h2>
          <form onSubmit={handleTicketSubmit} className="space-y-6">
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                Assunto
              </label>
              <input
                type="text"
                id="subject"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                className="block w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:ring-accent-purple focus:border-accent-purple"
                placeholder="Ex: Problema com criação de evento"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                Mensagem
              </label>
              <textarea
                id="message"
                value={ticketMessage}
                onChange={(e) => setTicketMessage(e.target.value)}
                rows={4}
                className="block w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:ring-accent-purple focus:border-accent-purple"
                placeholder="Descreva seu problema ou dúvida em detalhes..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-2 bg-gradient-to-r from-accent-purple to-accent-pink text-white rounded-lg hover:from-accent-purple/90 hover:to-accent-pink/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-purple disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Ticket'}
            </button>
          </form>
        </div>

        {/* Contato Direto */}
        <div className="mt-8 text-center">
          <p className="text-gray-400">
            Precisa de ajuda urgente? Entre em contato direto:
          </p>
          <div className="mt-2 space-x-4">
            <a
              href="mailto:suporte@seusite.com"
              className="text-accent-purple hover:text-accent-pink transition-colors"
            >
              suporte@seusite.com
            </a>
            <span className="text-gray-600">|</span>
            <a
              href="tel:+551199999999"
              className="text-accent-purple hover:text-accent-pink transition-colors"
            >
              (11) 9999-9999
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
