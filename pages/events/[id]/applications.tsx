import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import { useAuth } from '../../../contexts/AuthContext';
import { IApplication, IEvent, IPresenceList } from '../../../src/types';
import Image from 'next/image';

export default function EventApplications() {
  const router = useRouter();
  const { id } = router.query;
  const { user, isAuthenticated } = useAuth();
  const [event, setEvent] = useState<IEvent | null>(null);
  const [applications, setApplications] = useState<IApplication[]>([]);
  const [presenceList, setPresenceList] = useState<IPresenceList['confirmedPresences']>([]);

  useEffect(() => {
    if (!isAuthenticated || user?.type !== 'organizer') {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  const handleStatusChange = async (applicationId: string, newStatus: 'approved' | 'rejected') => {
    try {
      // Implementar atualização do status
      // Atualizar lista de candidaturas
      alert('Status atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      alert('Erro ao atualizar status. Tente novamente.');
    }
  };

  const handleWhatsAppClick = (whatsapp: string) => {
    const formattedNumber = whatsapp.replace(/\D/g, '');
    window.open(`https://wa.me/55${formattedNumber}`, '_blank');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <button onClick={() => router.back()} className="btn-secondary mb-4">
            Voltar
          </button>
          <h1 className="text-3xl font-bold gradient-text">
            Gerenciar Presenças - {event?.name}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Lista de Candidaturas */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">Solicitações de Presença</h2>
            <div className="space-y-4">
              {applications.map((application) => (
                <div
                  key={application.id}
                  className="p-4 bg-dark-800 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    {application.presencaVipInfo.photo && (
                      <Image
                        src={application.presencaVipInfo.photo}
                        alt={application.presencaVipInfo.name}
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold">{application.presencaVipInfo.name}</h3>
                      <button
                        onClick={() => handleWhatsAppClick(application.presencaVipInfo.whatsapp)}
                        className="text-sm text-accent-purple hover:text-accent-pink"
                      >
                        WhatsApp: {application.presencaVipInfo.whatsapp}
                      </button>
                      <p className="text-sm text-gray-400">
                        Enviado em: {new Date(application.applicationDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleStatusChange(application.id!, 'approved')}
                        className={`btn-sm ${
                          application.status === 'approved'
                            ? 'btn-success'
                            : 'btn-secondary'
                        }`}
                        disabled={application.status === 'approved'}
                      >
                        Aprovar
                      </button>
                      <button
                        onClick={() => handleStatusChange(application.id!, 'rejected')}
                        className={`btn-sm ${
                          application.status === 'rejected'
                            ? 'btn-danger'
                            : 'btn-secondary'
                        }`}
                        disabled={application.status === 'rejected'}
                      >
                        Rejeitar
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {applications.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-400">Nenhuma solicitação de presença recebida.</p>
                </div>
              )}
            </div>
          </div>

          {/* Lista de Presenças Confirmadas */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">Lista de Presenças</h2>
            <div className="space-y-4">
              {presenceList.map((presence) => (
                <div
                  key={presence.presencaVipId}
                  className="p-4 bg-dark-800 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold">{presence.name}</h3>
                    <button
                      onClick={() => handleWhatsAppClick(presence.whatsapp)}
                      className="text-sm text-accent-purple hover:text-accent-pink"
                    >
                      WhatsApp: {presence.whatsapp}
                    </button>
                  </div>
                  <div>
                    <select
                      value={presence.status}
                      onChange={(e) => {
                        // Implementar atualização do status de presença
                      }}
                      className="input-field text-sm"
                    >
                      <option value="confirmed">Confirmado</option>
                      <option value="cancelled">Cancelado</option>
                      <option value="no_show">Não Compareceu</option>
                    </select>
                  </div>
                </div>
              ))}

              {presenceList.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-400">Nenhuma presença confirmada ainda.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
