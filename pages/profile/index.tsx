import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { FiMapPin, FiClock, FiPhone, FiInstagram, FiFacebook, FiMessageCircle } from 'react-icons/fi';

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <Layout>
        <div className="min-h-screen bg-dark-900 py-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="glass-card p-8">
              <div className="text-center">Carregando...</div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!session?.user) {
    return null;
  }

  const user = session.user;

  return (
    <Layout>
      <div className="min-h-screen bg-dark-900 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="glass-card p-8">
            {/* Imagem de Capa */}
            <div className="relative w-full h-48 mb-8 rounded-lg overflow-hidden bg-gray-800">
              {user.coverImage ? (
                <Image
                  src={user.coverImage}
                  alt="Capa"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600">
                  Adicione uma foto de capa
                </div>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-8 mb-8">
              {/* Imagem de Perfil */}
              <div className="flex-shrink-0">
                <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-800">
                  {user.profileImage ? (
                    <Image
                      src={user.profileImage}
                      alt="Perfil"
                      fill
                      style={{ objectFit: 'cover' }}
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-4xl text-gray-600">
                        {user.name?.[0]?.toUpperCase() || '?'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Informações Principais */}
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold">
                      <span className="gradient-text">{user.establishmentName || user.name}</span>
                    </h1>
                    {user.description ? (
                      <p className="text-gray-300 mt-2">{user.description}</p>
                    ) : (
                      <p className="text-gray-500 mt-2 italic">Adicione uma descrição do seu estabelecimento</p>
                    )}
                  </div>
                  <Link 
                    href="/profile/edit" 
                    className="btn-secondary"
                  >
                    Editar Perfil
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {/* Informações de Contato */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-200">
                  Informações de Contato
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-2">
                    <FiPhone className="text-accent-purple" />
                    <div>
                      <label className="block text-gray-400 text-sm">Telefone</label>
                      <div className="text-gray-200">
                        {user.phone || <span className="text-gray-500 italic">Adicione um telefone</span>}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm">Email</label>
                    <div className="text-gray-200">{user.email}</div>
                  </div>
                </div>
              </div>

              {/* Endereço */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-200 flex items-center gap-2">
                  <FiMapPin />
                  Endereço
                </h2>
                <div className="text-gray-200">
                  {user.address && Object.values(user.address).some(value => value) ? (
                    <>
                      {user.address.street && (
                        <div>
                          {user.address.street}
                          {user.address.number && `, ${user.address.number}`}
                        </div>
                      )}
                      {user.address.complement && (
                        <div>{user.address.complement}</div>
                      )}
                      {user.address.neighborhood && (
                        <div>{user.address.neighborhood}</div>
                      )}
                      {(user.address.city || user.address.state) && (
                        <div>
                          {user.address.city}
                          {user.address.city && user.address.state && ' - '}
                          {user.address.state}
                        </div>
                      )}
                      {user.address.cep && (
                        <div>CEP: {user.address.cep}</div>
                      )}
                    </>
                  ) : (
                    <div className="text-gray-500 italic">
                      Adicione o endereço do estabelecimento
                    </div>
                  )}
                </div>
              </div>

              {/* Horário de Funcionamento */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-200 flex items-center gap-2">
                  <FiClock />
                  Horário de Funcionamento
                </h2>
                {user.openingHours && Object.values(user.openingHours).some(hours => hours.open || hours.close) ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(user.openingHours).map(([day, hours]) => (
                      <div key={day} className="flex items-center space-x-4">
                        <span className="w-24 text-gray-400 capitalize">{day}</span>
                        <div className="text-gray-200">
                          {hours.open && hours.close ? (
                            `${hours.open} às ${hours.close}`
                          ) : (
                            'Horário não definido'
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500 italic">
                    Adicione os horários de funcionamento
                  </div>
                )}
              </div>

              {/* Redes Sociais */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-200">
                  Redes Sociais
                </h2>
                {user.socialMedia && Object.values(user.socialMedia).some(value => value) ? (
                  <div className="flex flex-wrap gap-6">
                    {user.socialMedia.instagram && (
                      <a
                        href={`https://instagram.com/${user.socialMedia.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-accent-purple hover:text-accent-purple-light"
                      >
                        <FiInstagram size={20} />
                        <span>Instagram</span>
                      </a>
                    )}
                    {user.socialMedia.facebook && (
                      <a
                        href={user.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-accent-purple hover:text-accent-purple-light"
                      >
                        <FiFacebook size={20} />
                        <span>Facebook</span>
                      </a>
                    )}
                    {user.socialMedia.whatsapp && (
                      <a
                        href={`https://wa.me/${user.socialMedia.whatsapp.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-accent-purple hover:text-accent-purple-light"
                      >
                        <FiMessageCircle size={20} />
                        <span>WhatsApp</span>
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="text-gray-500 italic">
                    Adicione suas redes sociais
                  </div>
                )}
              </div>

              {/* Ações */}
              <div className="pt-6 border-t border-gray-700">
                <h2 className="text-xl font-semibold mb-4 text-gray-200">
                  Ações Rápidas
                </h2>
                <div className="flex flex-wrap gap-4">
                  {user.type === 'presenca_vip' ? (
                    <>
                      <Link href="/events" className="btn-primary">
                        Ver Eventos
                      </Link>
                      <Link href="/subscription" className="btn-secondary">
                        Gerenciar Assinatura
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href="/events/manage" className="btn-primary">
                        Gerenciar Eventos
                      </Link>
                      <Link href="/events/create" className="btn-secondary">
                        Criar Novo Evento
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
