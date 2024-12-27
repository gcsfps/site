import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import { useAuth } from '../../../contexts/AuthContext';
import { IEvent } from '../../../src/types';

export default function EditEvent() {
  const router = useRouter();
  const { id } = router.query;
  const { user, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    totalSpots: '',
    payment: '',
    description: '',
  });

  useEffect(() => {
    if (!isAuthenticated || user?.type !== 'organizer') {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  useEffect(() => {
    if (id) {
      // Carregar dados do evento
      // Implementar chamada à API
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Implementar atualização do evento
      router.push('/events/manage');
    } catch (error) {
      console.error('Erro ao atualizar evento:', error);
      alert('Erro ao atualizar evento. Tente novamente.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <button onClick={() => router.back()} className="btn-secondary mb-4">
              Voltar
            </button>
            <h1 className="text-3xl font-bold gradient-text">Editar Evento</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="glass-card p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-300 mb-2">
                    Nome do Evento
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-gray-300 mb-2">
                      Data
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-gray-300 mb-2">
                      Horário
                    </label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="location" className="block text-gray-300 mb-2">
                    Local
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="totalSpots" className="block text-gray-300 mb-2">
                      Número de Vagas
                    </label>
                    <input
                      type="number"
                      id="totalSpots"
                      name="totalSpots"
                      value={formData.totalSpots}
                      onChange={handleChange}
                      className="input-field"
                      min="1"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="payment" className="block text-gray-300 mb-2">
                      Valor do Cachê (R$)
                    </label>
                    <input
                      type="number"
                      id="payment"
                      name="payment"
                      value={formData.payment}
                      onChange={handleChange}
                      className="input-field"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-gray-300 mb-2">
                    Descrição
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="input-field min-h-[100px]"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="btn-secondary"
              >
                Cancelar
              </button>
              <button type="submit" className="btn-primary">
                Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
