import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { CalendarIcon, MapPinIcon, ClockIcon, UsersIcon, CurrencyDollarIcon, PencilIcon } from '../../../components/Icons';
import { formatDate, formatTime } from '../../../utils/format';

interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  flyerUrl: string;
  totalSpots: number;
  availableSpots: number;
  payment: number;
  status: string;
  organizerId: string;
  organizer: {
    name: string;
    establishmentName: string;
  };
}

interface Application {
  id: string;
  status: string;
  createdAt: string;
}

export default function EventDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasApplied, setHasApplied] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('details');
  const [applications, setApplications] = useState([]);
  const [loadingApplications, setLoadingApplications] = useState(false);

  useEffect(() => {
    if (id) {
      fetchEventDetails();
      if (session?.user?.type === 'presence') {
        checkApplication();
      }
      if (session?.user?.type === 'organizer') {
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
      <div className="container mx-auto p-4">
        <div className="text-center text-white">Carregando evento...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center text-white">Evento não encontrado</div>
      </div>
    );
  }

  const isOrganizer = session?.user?.type === 'organizer';
  const isEventOwner = session?.user?.id === event.organizerId;
  const isPresence = session?.user?.type === 'presence';
  const canApply = isPresence && !hasApplied;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Cabeçalho do Evento */}
        <div className="relative h-64 w-full">
          {event.flyerUrl && (
            <Image
              src={event.flyerUrl}
              alt={event.name}
              fill
              style={{ objectFit: 'cover' }}
            />
          )}
        </div>

        {/* Abas */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab('details')}
              className={`${
                activeTab === 'details'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex-1 py-4 px-1 text-center border-b-2 font-medium`}
            >
              Detalhes
            </button>
            {isOrganizer && isEventOwner && (
              <button
                onClick={() => setActiveTab('applications')}
                className={`${
                  activeTab === 'applications'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex-1 py-4 px-1 text-center border-b-2 font-medium`}
              >
                Candidaturas
              </button>
            )}
          </nav>
        </div>

        {/* Conteúdo da Aba */}
        <div className="p-6">
          {activeTab === 'details' ? (
            <>
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-3xl font-bold text-gray-900">{event.name}</h1>
                {isEventOwner && (
                  <button
                    onClick={() => router.push(`/events/${id}/edit`)}
                    className="flex items-center text-blue-600 hover:text-blue-700"
                  >
                    <PencilIcon className="w-5 h-5 mr-1" />
                    Editar
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <p className="text-gray-600">{event.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center text-gray-600">
                    <CalendarIcon className="w-5 h-5 mr-2" />
                    <span>{formatDate(event.date)}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <ClockIcon className="w-5 h-5 mr-2" />
                    <span>{formatTime(event.time)}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <MapPinIcon className="w-5 h-5 mr-2" />
                    <span>{event.location}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <UsersIcon className="w-5 h-5 mr-2" />
                    <span>{event.totalSpots} vagas totais</span>
                  </div>

                  {event.payment && (
                    <div className="flex items-center text-gray-600">
                      <CurrencyDollarIcon className="w-5 h-5 mr-2" />
                      <span>R$ {event.payment}</span>
                    </div>
                  )}
                </div>

                {isPresence && (
                  <div className="mt-6">
                    {!hasApplied ? (
                      <button
                        onClick={handleApply}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                      >
                        Candidatar-se
                      </button>
                    ) : (
                      <div className="bg-gray-100 p-4 rounded">
                        <p className="text-gray-600">
                          Status da sua candidatura:{' '}
                          <span className="font-medium">
                            {applicationStatus === 'PENDING' && 'Pendente'}
                            {applicationStatus === 'APPROVED' && 'Aprovada'}
                            {applicationStatus === 'REJECTED' && 'Rejeitada'}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="space-y-4">
              {loadingApplications ? (
                <p>Carregando candidaturas...</p>
              ) : (
                <>
                  <h2 className="text-xl font-semibold">Candidaturas ({applications.length})</h2>
                  <div className="space-y-4">
                    {applications.map((application: any) => (
                      <div
                        key={application.id}
                        className="border rounded-lg p-4 flex items-center justify-between"
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
                            <h3 className="font-medium">{application.presencaVip.name}</h3>
                            <p className="text-sm text-gray-500">{application.presencaVip.email}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {application.status === 'PENDING' ? (
                            <>
                              <button
                                onClick={() => handleUpdateStatus(application.id, 'APPROVED')}
                                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                              >
                                Aprovar
                              </button>
                              <button
                                onClick={() => handleUpdateStatus(application.id, 'REJECTED')}
                                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                              >
                                Rejeitar
                              </button>
                            </>
                          ) : (
                            <span className={`px-3 py-1 rounded text-sm ${
                              application.status === 'APPROVED'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
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
  );
}
