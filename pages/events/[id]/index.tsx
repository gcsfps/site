import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Layout from '../../../components/Layout';
import { CalendarIcon, MapPinIcon, ClockIcon, UsersIcon, CurrencyDollarIcon, PencilIcon } from '../../../components/Icons';
import { formatDate, formatTime } from '../../../utils/format';

export default function EventDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hasApplied, setHasApplied] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('details');
  const [applications, setApplications] = useState([]);
  const [loadingApplications, setLoadingApplications] = useState(false);

  useEffect(() => {
    if (id) {
      fetchEventDetails();
      if (session?.user.type === 'presence') {
        checkApplication();
      }
      if (session?.user.type === 'organizer') {
        fetchApplications();
      }
    }
  }, [id, session]);

  const fetchEventDetails = async () => {
    try {
      const response = await fetch(`/api/events/${id}`);
      if (response.ok) {
        const data = await response.json();
        setEvent(data);
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes do evento:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkApplication = async () => {
    try {
      const response = await fetch(`/api/applications/check/${id}`);
      if (response.ok) {
        const data = await response.json();
        setHasApplied(data.hasApplied);
        setApplicationStatus(data.status);
      }
    } catch (error) {
      console.error('Erro ao verificar candidatura:', error);
    }
  };

  const fetchApplications = async () => {
    setLoadingApplications(true);
    try {
      const response = await fetch(`/api/applications/event/${id}`);
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      }
    } catch (error) {
      console.error('Erro ao buscar candidaturas:', error);
    } finally {
      setLoadingApplications(false);
    }
  };

  const handleApply = async () => {
    try {
      const response = await fetch('/api/applications/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventId: id }),
      });

      if (response.ok) {
        setHasApplied(true);
        setApplicationStatus('PENDING');
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (error) {
      console.error('Erro ao se candidatar:', error);
      alert('Erro ao se candidatar para o evento');
    }
  };

  const handleUpdateStatus = async (applicationId: string, status: string) => {
    try {
      const response = await fetch(`/api/applications/event/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ applicationId, status }),
      });

      if (response.ok) {
        fetchApplications();
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      alert('Erro ao atualizar status da candidatura');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-white">Carregando...</div>
        </div>
      </Layout>
    );
  }

  if (!event) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-white">Evento não encontrado</div>
        </div>
      </Layout>
    );
  }

  const isOrganizer = session?.user?.type === 'organizer';
  const isEventOwner = session?.user?.id === event.organizerId;
  const isPresence = session?.user?.type === 'presence';

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="glass-card overflow-hidden">
          {/* Cabeçalho do Evento */}
          <div className="relative aspect-[21/9]">
            {event.flyerUrl && (
              <Image
                src={event.flyerUrl}
                alt={event.name}
                fill
                className="object-cover"
              />
            )}
          </div>

          {/* Abas */}
          <div className="border-b border-gray-600">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('details')}
                className={`${
                  activeTab === 'details'
                    ? 'border-accent-purple text-accent-purple'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                } flex-1 py-4 px-1 text-center border-b-2 font-medium`}
              >
                Detalhes
              </button>
              {isOrganizer && isEventOwner && (
                <button
                  onClick={() => setActiveTab('applications')}
                  className={`${
                    activeTab === 'applications'
                      ? 'border-accent-purple text-accent-purple'
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                  } flex-1 py-4 px-1 text-center border-b-2 font-medium`}
                >
                  Candidaturas
                </button>
              )}
            </nav>
          </div>

          {/* Conteúdo */}
          <div className="p-6">
            {activeTab === 'details' ? (
              <>
                <div className="flex justify-between items-start mb-6">
                  <h1 className="text-3xl font-bold text-white">{event.name}</h1>
                  {isEventOwner && (
                    <button
                      onClick={() => router.push(`/events/${id}/edit`)}
                      className="flex items-center text-accent-purple hover:text-accent-pink"
                    >
                      <PencilIcon className="w-5 h-5 mr-1" />
                      Editar
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="space-y-4 text-gray-300">
                      <div className="flex items-center">
                        <CalendarIcon className="h-6 w-6 mr-3 text-accent-purple" />
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="h-6 w-6 mr-3 text-accent-pink" />
                        {formatTime(event.time)}
                      </div>
                      <div className="flex items-center">
                        <MapPinIcon className="h-6 w-6 mr-3 text-accent-blue" />
                        {event.location}
                      </div>
                      <div className="flex items-center">
                        <UsersIcon className="h-6 w-6 mr-3 text-accent-green" />
                        {event.totalSpots} vagas totais
                      </div>
                      {event.payment && (
                        <div className="flex items-center">
                          <CurrencyDollarIcon className="h-6 w-6 mr-3 text-accent-yellow" />
                          R$ {event.payment}
                        </div>
                      )}
                    </div>

                    <div className="mt-6">
                      <h3 className="text-xl font-semibold text-white mb-2">Sobre o Evento</h3>
                      <p className="text-gray-300">{event.description}</p>
                    </div>
                  </div>

                  <div>
                    <div className="glass-card-dark p-6">
                      {isPresence && (
                        <div className="mb-6">
                          {!hasApplied ? (
                            <button
                              onClick={handleApply}
                              className="w-full btn-primary"
                            >
                              Candidatar-se
                            </button>
                          ) : (
                            <div className="bg-dark-800 p-4 rounded-lg">
                              <p className="text-gray-300">
                                Status da sua candidatura:{' '}
                                <span className={`font-medium ${
                                  applicationStatus === 'APPROVED' ? 'text-green-400' :
                                  applicationStatus === 'REJECTED' ? 'text-red-400' :
                                  'text-yellow-400'
                                }`}>
                                  {applicationStatus === 'PENDING' && 'Pendente'}
                                  {applicationStatus === 'APPROVED' && 'Aprovada'}
                                  {applicationStatus === 'REJECTED' && 'Rejeitada'}
                                </span>
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="text-gray-300">
                        <h3 className="text-xl font-semibold text-white mb-4">Organizador</h3>
                        <p>{event.organizer?.establishmentName}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                {loadingApplications ? (
                  <p className="text-gray-300">Carregando candidaturas...</p>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold text-white mb-4">
                      Candidaturas ({applications.length})
                    </h2>
                    <div className="space-y-4">
                      {applications.map((application: any) => (
                        <div
                          key={application.id}
                          className="glass-card-dark p-4 flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-4">
                            {application.presencaVip.image && (
                              <Image
                                src={application.presencaVip.image}
                                alt={application.presencaVip.name}
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                            )}
                            <div>
                              <h3 className="font-medium text-white">
                                {application.presencaVip.name}
                              </h3>
                              <p className="text-sm text-gray-400">
                                {application.presencaVip.email}
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            {application.status === 'PENDING' ? (
                              <>
                                <button
                                  onClick={() => handleUpdateStatus(application.id, 'APPROVED')}
                                  className="btn-success text-sm"
                                >
                                  Aprovar
                                </button>
                                <button
                                  onClick={() => handleUpdateStatus(application.id, 'REJECTED')}
                                  className="btn-danger text-sm"
                                >
                                  Rejeitar
                                </button>
                              </>
                            ) : (
                              <span className={`px-3 py-1 rounded text-sm ${
                                application.status === 'APPROVED'
                                  ? 'bg-green-900 text-green-200'
                                  : 'bg-red-900 text-red-200'
                              }`}>
                                {application.status === 'APPROVED' ? 'Aprovada' : 'Rejeitada'}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
