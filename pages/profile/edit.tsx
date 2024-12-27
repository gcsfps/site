import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useAuth } from '../../contexts/AuthContext';
import Image from 'next/image';
import { CameraIcon } from '@heroicons/react/24/outline';

export default function EditProfile() {
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    // Campos específicos para Presença VIP
    age: '',
    region: '',
    description: '',
    instagram: '',
    height: '',
    weight: '',
    interests: '',
    // Campos específicos para Promoter
    companyName: '',
    eventTypes: '',
    experience: '',
    website: '',
  });
  const [profilePhoto, setProfilePhoto] = useState('/images/profile-placeholder.jpg');
  const [coverPhoto, setCoverPhoto] = useState('/images/cover-placeholder.jpg');

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    // Simular carregamento dos dados do perfil
    if (user.type === 'presenca_vip') {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        whatsapp: user.whatsapp || '',
        age: '25',
        region: 'São Paulo, SP',
        description: 'Amo festas e eventos exclusivos!',
        instagram: '@presencavip',
        height: '1.70',
        weight: '60',
        interests: 'Festas, Música Eletrônica, Networking',
        companyName: '',
        eventTypes: '',
        experience: '',
        website: '',
      });
    } else {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        whatsapp: user.whatsapp || '',
        companyName: 'Eventos Premium',
        eventTypes: 'Festas, Shows, Eventos Corporativos',
        experience: '5 anos no mercado de eventos',
        website: 'www.eventospremium.com.br',
        age: '',
        region: '',
        description: '',
        instagram: '',
        height: '',
        weight: '',
        interests: '',
      });
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simular atualização do perfil
    alert('Perfil atualizado com sucesso!');
  };

  const handlePhotoChange = (type: 'profile' | 'cover') => {
    // Simular upload de foto
    alert('Funcionalidade de upload será implementada em breve');
  };

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen bg-dark-900 py-20">
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-center text-gray-400">Carregando...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-dark-900 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="glass-card overflow-hidden">
            {/* Capa */}
            <div className="relative h-64">
              <Image
                src={coverPhoto}
                alt="Capa"
                layout="fill"
                objectFit="cover"
                className="brightness-75"
              />
              <button
                onClick={() => handlePhotoChange('cover')}
                className="absolute bottom-4 right-4 bg-dark-800 bg-opacity-70 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <CameraIcon className="h-5 w-5 mr-2" />
                Alterar Capa
              </button>
            </div>

            {/* Foto de Perfil */}
            <div className="relative -mt-20 ml-8">
              <div className="relative h-40 w-40">
                <Image
                  src={profilePhoto}
                  alt="Foto de perfil"
                  width={160}
                  height={160}
                  className="rounded-full border-4 border-dark-900"
                />
                <button
                  onClick={() => handlePhotoChange('profile')}
                  className="absolute bottom-0 right-0 bg-accent-purple rounded-full p-2"
                >
                  <CameraIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Formulário */}
            <div className="p-8">
              <h1 className="text-3xl font-bold mb-8">Editar Perfil</h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Campos comuns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nome
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent-purple"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      WhatsApp
                    </label>
                    <input
                      type="text"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent-purple"
                    />
                  </div>
                </div>

                {user.type === 'presenca_vip' ? (
                  // Campos específicos para Presença VIP
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Idade
                        </label>
                        <input
                          type="number"
                          value={formData.age}
                          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                          className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent-purple"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Altura (m)
                        </label>
                        <input
                          type="text"
                          value={formData.height}
                          onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                          className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent-purple"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Peso (kg)
                        </label>
                        <input
                          type="text"
                          value={formData.weight}
                          onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                          className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent-purple"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Região
                      </label>
                      <input
                        type="text"
                        value={formData.region}
                        onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                        className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent-purple"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Instagram
                      </label>
                      <input
                        type="text"
                        value={formData.instagram}
                        onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                        className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent-purple"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Interesses
                      </label>
                      <input
                        type="text"
                        value={formData.interests}
                        onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                        placeholder="Separe os interesses por vírgula"
                        className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent-purple"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Sobre mim
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                        className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent-purple"
                      />
                    </div>
                  </>
                ) : (
                  // Campos específicos para Promoter
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Nome da Empresa/Marca
                      </label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent-purple"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Tipos de Eventos
                      </label>
                      <input
                        type="text"
                        value={formData.eventTypes}
                        onChange={(e) => setFormData({ ...formData, eventTypes: e.target.value })}
                        placeholder="Separe os tipos por vírgula"
                        className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent-purple"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Experiência
                      </label>
                      <textarea
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        rows={4}
                        className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent-purple"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Website
                      </label>
                      <input
                        type="text"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent-purple"
                      />
                    </div>
                  </>
                )}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-accent-purple hover:bg-accent-pink text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Salvar Alterações
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
