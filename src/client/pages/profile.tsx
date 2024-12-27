import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { StarIcon, CalendarIcon } from '@heroicons/react/24/solid';

export default function Profile() {
  const router = useRouter();
  const [profile, setProfile] = useState({
    name: 'Carregando...',
    type: '',
    email: '',
    age: '',
    region: '',
    reputation: 5,
    photo: '/placeholder.jpg',
    events: [],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    age: '',
    region: '',
    photo: '',
  });

  useEffect(() => {
    // Aqui virá a integração com a API
    // Por enquanto, usando dados mockados
    setProfile({
      name: 'Ana Silva',
      type: 'vip',
      email: 'ana@example.com',
      age: '23',
      region: 'São Paulo, SP',
      reputation: 4.8,
      photo: '/placeholder.jpg',
      events: [
        {
          id: 1,
          name: 'Festa de Verão',
          date: '2024-01-15',
          status: 'approved'
        },
        {
          id: 2,
          name: 'Night Club Special',
          date: '2024-01-20',
          status: 'pending'
        }
      ]
    });
  }, []);

  const handleEdit = () => {
    setEditForm({
      name: profile.name,
      age: profile.age,
      region: profile.region,
      photo: profile.photo,
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    // Aqui virá a integração com a API
    setProfile({ ...profile, ...editForm });
    setIsEditing(false);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          {/* Perfil Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden">
                  <Image
                    src={profile.photo}
                    alt={profile.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <h2 className="mt-4 text-xl font-bold text-gray-900">{profile.name}</h2>
                <p className="text-sm text-gray-500">{profile.type === 'vip' ? 'Presença VIP' : 'Organizador'}</p>
                
                <div className="mt-4 flex items-center justify-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(profile.reputation)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {profile.reputation.toFixed(1)}
                  </span>
                </div>

                {!isEditing && (
                  <button
                    onClick={handleEdit}
                    className="mt-4 btn-secondary w-full"
                  >
                    Editar Perfil
                  </button>
                )}
              </div>

              <div className="mt-6 border-t border-gray-200 pt-6">
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900">{profile.email}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Idade</dt>
                    <dd className="mt-1 text-sm text-gray-900">{profile.age} anos</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Região</dt>
                    <dd className="mt-1 text-sm text-gray-900">{profile.region}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* Conteúdo Principal */}
          <div className="mt-5 md:mt-0 md:col-span-2">
            {isEditing ? (
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900">Editar Perfil</h3>
                <div className="mt-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Nome
                    </label>
                    <input
                      type="text"
                      className="input-field mt-1"
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Idade
                    </label>
                    <input
                      type="text"
                      className="input-field mt-1"
                      value={editForm.age}
                      onChange={(e) =>
                        setEditForm({ ...editForm, age: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Região
                    </label>
                    <input
                      type="text"
                      className="input-field mt-1"
                      value={editForm.region}
                      onChange={(e) =>
                        setEditForm({ ...editForm, region: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="btn-secondary"
                    >
                      Cancelar
                    </button>
                    <button onClick={handleSave} className="btn-primary">
                      Salvar
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Próximos Eventos */}
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Próximos Eventos
                  </h3>
                  <div className="mt-6 space-y-4">
                    {profile.events.map((event) => (
                      <div
                        key={event.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center">
                          <CalendarIcon className="h-8 w-8 text-primary-500" />
                          <div className="ml-4">
                            <h4 className="text-sm font-medium text-gray-900">
                              {event.name}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {new Date(event.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            event.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {event.status === 'approved' ? 'Aprovado' : 'Pendente'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
