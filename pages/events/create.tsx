import { useState } from 'react';
import Layout from '../../components/Layout';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';
import { IEvent } from '../../src/types';

export default function CreateEvent() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    totalSpots: '',
    payment: '',
    description: '',
  });
  const [flyer, setFlyer] = useState<File | null>(null);
  const [flyerPreview, setFlyerPreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFlyerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFlyer(file);
      setFlyerPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Primeiro fazer upload do flyer
      if (!flyer) {
        alert('Por favor, selecione um flyer para o evento');
        setIsSubmitting(false);
        return;
      }

      // Upload do flyer
      const formDataFlyer = new FormData();
      formDataFlyer.append('file', flyer);
      
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formDataFlyer
      });

      if (!uploadResponse.ok) {
        throw new Error('Erro ao fazer upload do flyer');
      }

      const { fileUrl } = await uploadResponse.json();

      // Criar o evento
      const eventData = {
        ...formData,
        flyerUrl: fileUrl
      };

      const createEventResponse = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData)
      });

      if (!createEventResponse.ok) {
        throw new Error('Erro ao criar evento');
      }

      router.push('/events/manage');
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      alert('Erro ao criar evento. Tente novamente.');
    } finally {
      setIsSubmitting(false);
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
          <h1 className="text-3xl font-bold gradient-text mb-8">Criar Novo Evento</h1>

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

                <div>
                  <label className="block text-gray-300 mb-2">
                    Flyer do Evento
                  </label>
                  <div className="flex flex-col items-center p-4 border-2 border-dashed border-gray-600 rounded-lg hover:border-accent-purple transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFlyerChange}
                      className="hidden"
                      id="flyer-upload"
                      required
                    />
                    <label
                      htmlFor="flyer-upload"
                      className="cursor-pointer text-center"
                    >
                      {flyerPreview ? (
                        <div className="relative w-full max-w-md mx-auto">
                          <img
                            src={flyerPreview}
                            alt="Prévia do flyer"
                            className="max-h-96 w-auto mx-auto rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setFlyer(null);
                              setFlyerPreview('');
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <div className="text-gray-400">
                          <svg
                            className="mx-auto h-12 w-12 mb-2"
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
                          <p>Clique para fazer upload do flyer</p>
                          <p className="text-sm">
                            (PNG, JPG, GIF até 5MB)
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
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
              <button type="submit" className="btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Criando...' : 'Criar Evento'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
