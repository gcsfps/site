import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useAuth } from '../../contexts/AuthContext';
import { IProfile, IUser } from '../../src/types';
import Image from 'next/image';

export default function Profile() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [canViewFullProfile, setCanViewFullProfile] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/profile/${id}`);
          if (response.ok) {
            const data = await response.json();
            setProfile(data);
            setIsOwner(user?.id === id);
            setCanViewFullProfile(
              isOwner || (user?.type === 'organizer' && user?.subscription?.status === 'active')
            );
          } else {
            console.error('Erro ao buscar perfil');
          }
        } catch (error) {
          console.error('Erro ao buscar perfil:', error);
        }
      }
    };

    fetchProfile();
  }, [id, user, isOwner]);

  if (!profile) {
    return (
      <Layout>
        <div className="min-h-screen bg-dark-900 py-20">
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-center text-gray-400">Carregando perfil...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-dark-900">
        {/* Capa do Perfil */}
        <div className="relative h-64 md:h-80">
          <Image
            src={profile.coverPhoto || '/images/cover-placeholder.jpg'}
            alt="Capa"
            layout="fill"
            objectFit="cover"
            className="brightness-50"
          />
          {isOwner && (
            <button className="absolute top-4 right-4 bg-dark-800 bg-opacity-70 text-white px-4 py-2 rounded-lg">
              Editar Capa
            </button>
          )}
        </div>

        {/* Foto de Perfil e Informações Básicas */}
        <div className="max-w-4xl mx-auto px-4 -mt-20 relative z-10">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="relative">
              <Image
                src={profile.profilePhoto}
                alt="Foto de perfil"
                width={150}
                height={150}
                className="rounded-full border-4 border-dark-900"
              />
              {isOwner && (
                <button className="absolute bottom-0 right-0 bg-accent-purple rounded-full p-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </button>
              )}
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
              <p className="text-gray-400 mb-4">{profile.region}</p>
              <div className="flex items-center space-x-4">
                {profile.instagram && (
                  <a
                    href={`https://instagram.com/${profile.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-purple hover:text-accent-pink"
                  >
                    {profile.instagram}
                  </a>
                )}
                <span className="text-accent-purple">
                  ★ {profile.reputation.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Informações Detalhadas */}
          <div className="mt-8 glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">Sobre</h2>
            <p className="text-gray-300 mb-6">{profile.description}</p>

            {canViewFullProfile ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <span className="text-gray-400">Idade</span>
                    <p className="text-white">{profile.age} anos</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Altura</span>
                    <p className="text-white">{profile.height}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Peso</span>
                    <p className="text-white">{profile.weight}</p>
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-3">Interesses</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {profile.interests?.map((interest, index) => (
                    <span
                      key={index}
                      className="bg-dark-800 text-gray-300 px-3 py-1 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>

                <h3 className="text-lg font-semibold mb-3">Galeria</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {profile.photos.map((photo, index) => (
                    <div key={index} className="relative aspect-square">
                      <Image
                        src={photo}
                        alt={`Foto ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    </div>
                  ))}
                  {isOwner && (
                    <button className="aspect-square flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg hover:border-accent-purple transition-colors">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">
                  Este perfil é privado. Apenas promoters com assinatura ativa podem ver todos os detalhes.
                </p>
                {user?.type === 'organizer' && (
                  <button
                    onClick={() => router.push('/subscription/plans')}
                    className="btn-primary"
                  >
                    Ver Planos de Assinatura
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
