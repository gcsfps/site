import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { FiMapPin, FiClock, FiPhone, FiInstagram, FiFacebook, FiMessageCircle } from 'react-icons/fi';
import { IUser } from '../../src/types';

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState<IUser | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.id) {
        try {
          const response = await fetch(`/api/profile/${session.user.id}`);
          if (response.ok) {
            const data = await response.json();
            setUserData(data);
          } else {
            console.error('Erro ao buscar dados do usuário');
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        }
      }
    };

    fetchUserData();
  }, [session]);

  if (status === 'loading' || !userData) {
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

  return (
    <Layout>
      <div className="min-h-screen bg-dark-900 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="glass-card p-8">
            {/* Imagem de Capa */}
            <div className="relative w-full h-48 mb-8 rounded-lg overflow-hidden bg-gray-800">
              {userData.coverImage ? (
                <Image
                  src={userData.coverImage}
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
                  {userData.profileImage ? (
                    <Image
                      src={userData.profileImage}
                      alt="Perfil"
                      fill
                      style={{ objectFit: 'cover' }}
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-4xl text-gray-600">
                        {userData.name?.[0]?.toUpperCase() || '?'}
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
                      <span className="gradient-text">{userData.establishmentName || userData.name}</span>
                    </h1>
                    {userData.description ? (
                      <p className="text-gray-300 mt-2">{userData.description}</p>
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

                {/* Informações de Contato e Localização */}
                <div className="mt-6 space-y-4">
                  {userData.address && (userData.address.street || userData.address.city) && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <FiMapPin className="flex-shrink-0" />
                      <span>
                        {[
                          userData.address.street,
                          userData.address.number,
                          userData.address.neighborhood,
                          userData.address.city,
                          userData.address.state
                        ].filter(Boolean).join(', ')}
                      </span>
                    </div>
                  )}

                  {userData.phone && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <FiPhone className="flex-shrink-0" />
                      <span>{userData.phone}</span>
                    </div>
                  )}

                  {/* Redes Sociais */}
                  {userData.socialMedia && (
                    <div className="flex gap-4 mt-4">
                      {userData.socialMedia.instagram && (
                        <a
                          href={`https://instagram.com/${userData.socialMedia.instagram.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-300 hover:text-accent-purple transition-colors"
                        >
                          <FiInstagram size={20} />
                        </a>
                      )}
                      {userData.socialMedia.facebook && (
                        <a
                          href={userData.socialMedia.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-300 hover:text-accent-purple transition-colors"
                        >
                          <FiFacebook size={20} />
                        </a>
                      )}
                      {userData.socialMedia.whatsapp && (
                        <a
                          href={`https://wa.me/${userData.socialMedia.whatsapp.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-300 hover:text-accent-purple transition-colors"
                        >
                          <FiMessageCircle size={20} />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Horário de Funcionamento */}
            {userData.openingHours && Object.keys(userData.openingHours).length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Horário de Funcionamento</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(userData.openingHours).map(([day, hours]) => (
                    <div key={day} className="flex items-center gap-2 text-gray-300">
                      <FiClock className="flex-shrink-0" />
                      <span className="capitalize">{day}:</span>
                      <span>
                        {hours.open && hours.close
                          ? `${hours.open} - ${hours.close}`
                          : 'Fechado'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
