import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Profile() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    phone: '',
    establishment: '',
    address: '',
    instagram: '',
    facebook: '',
    openingHours: ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (user) {
      setFormData({
        name: user.name || '',
        whatsapp: user.whatsapp || '',
        phone: user.phone || '',
        establishment: user.establishment || '',
        address: user.address || '',
        instagram: user.instagram || '',
        facebook: user.facebook || '',
        openingHours: user.openingHours || ''
      });
    }
  }, [user, isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar perfil');
      }

      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      alert('Erro ao atualizar perfil. Tente novamente.');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-dark-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-dark-800/50 rounded-xl p-8 border border-white/5">
            <div className="text-center mb-8">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <Image
                  src={user?.image || '/images/default-avatar.png'}
                  alt="Profile"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {user?.name || 'Usuário'}
              </h1>
              <p className="text-gray-400">{user?.email}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Informações Básicas */}
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">Informações Básicas</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Nome
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={!isEditing}
                        className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent-purple disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        WhatsApp
                      </label>
                      <input
                        type="text"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        disabled={!isEditing}
                        className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent-purple disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Telefone
                      </label>
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={!isEditing}
                        className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent-purple disabled:opacity-50"
                      />
                    </div>
                  </div>
                </div>

                {/* Informações do Estabelecimento */}
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">Informações do Estabelecimento</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Nome do Estabelecimento
                      </label>
                      <input
                        type="text"
                        value={formData.establishment}
                        onChange={(e) => setFormData({ ...formData, establishment: e.target.value })}
                        disabled={!isEditing}
                        className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent-purple disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Endereço
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        disabled={!isEditing}
                        className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent-purple disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Horário de Funcionamento
                      </label>
                      <input
                        type="text"
                        value={formData.openingHours}
                        onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                        disabled={!isEditing}
                        className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent-purple disabled:opacity-50"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Redes Sociais */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">Redes Sociais</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Instagram
                    </label>
                    <input
                      type="text"
                      value={formData.instagram}
                      onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                      disabled={!isEditing}
                      className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent-purple disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Facebook
                    </label>
                    <input
                      type="text"
                      value={formData.facebook}
                      onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                      disabled={!isEditing}
                      className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent-purple disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              {/* Botões */}
              <div className="flex justify-end space-x-4">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-2 bg-dark-700 text-white rounded-lg hover:bg-dark-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-500"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-gradient-to-r from-accent-purple to-accent-pink text-white rounded-lg hover:from-accent-purple/90 hover:to-accent-pink/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-purple"
                    >
                      Salvar
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2 bg-gradient-to-r from-accent-purple to-accent-pink text-white rounded-lg hover:from-accent-purple/90 hover:to-accent-pink/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-purple"
                  >
                    Editar
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
