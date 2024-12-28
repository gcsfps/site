import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useAuth } from '../../contexts/AuthContext';
import ImageUpload from '../../components/ImageUpload';
import AddressForm, { AddressData } from '../../components/AddressForm';

export default function EditProfile() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [previewProfile, setPreviewProfile] = useState('');
  const [previewCover, setPreviewCover] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    establishmentName: '',
    address: {
      cep: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: ''
    },
    description: '',
    openingHours: {
      segunda: { open: '', close: '' },
      terca: { open: '', close: '' },
      quarta: { open: '', close: '' },
      quinta: { open: '', close: '' },
      sexta: { open: '', close: '' },
      sabado: { open: '', close: '' },
      domingo: { open: '', close: '' },
    },
    socialMedia: {
      instagram: '',
      facebook: '',
      whatsapp: '',
    }
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        establishmentName: user.establishmentName || '',
        address: user.address || prev.address,
        description: user.description || '',
        openingHours: user.openingHours || prev.openingHours,
        socialMedia: user.socialMedia || prev.socialMedia,
      }));
      if (user.profileImage) setPreviewProfile(user.profileImage);
      if (user.coverImage) setPreviewCover(user.coverImage);
    }
  }, [user, isAuthenticated, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [name]: value
      }
    }));
  };

  const handleHoursChange = (day: string, type: 'open' | 'close', value: string) => {
    setFormData(prev => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [day]: {
          ...prev.openingHours[day as keyof typeof prev.openingHours],
          [type]: value
        }
      }
    }));
  };

  const handleImageChange = (file: File, type: 'profile' | 'cover') => {
    if (type === 'profile') {
      setProfileImage(file);
      setPreviewProfile(URL.createObjectURL(file));
    } else {
      setCoverImage(file);
      setPreviewCover(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validação básica
      if (!formData.name || !formData.establishmentName) {
        setError('Nome e nome do estabelecimento são obrigatórios');
        return;
      }

      // Upload das imagens primeiro (se houver)
      let profileImageUrl = previewProfile;
      let coverImageUrl = previewCover;

      if (profileImage) {
        const formData = new FormData();
        formData.append('file', profileImage);
        try {
          const uploadRes = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
            credentials: 'include'
          });
          if (uploadRes.ok) {
            const uploadData = await uploadRes.json();
            profileImageUrl = uploadData.url;
          } else {
            throw new Error('Erro ao fazer upload da imagem de perfil');
          }
        } catch (error) {
          console.error('Erro no upload da imagem de perfil:', error);
          setError('Erro ao fazer upload da imagem de perfil');
          return;
        }
      }

      if (coverImage) {
        const formData = new FormData();
        formData.append('file', coverImage);
        try {
          const uploadRes = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
            credentials: 'include'
          });
          if (uploadRes.ok) {
            const uploadData = await uploadRes.json();
            coverImageUrl = uploadData.url;
          } else {
            throw new Error('Erro ao fazer upload da imagem de capa');
          }
        } catch (error) {
          console.error('Erro no upload da imagem de capa:', error);
          setError('Erro ao fazer upload da imagem de capa');
          return;
        }
      }

      // Prepara os dados para atualização
      const updateData = {
        name: formData.name.trim(),
        establishmentName: formData.establishmentName.trim(),
        phone: formData.phone?.trim() || '',
        description: formData.description?.trim() || '',
        address: {
          cep: formData.address.cep?.trim() || '',
          street: formData.address.street?.trim() || '',
          number: formData.address.number?.trim() || '',
          complement: formData.address.complement?.trim() || '',
          neighborhood: formData.address.neighborhood?.trim() || '',
          city: formData.address.city?.trim() || '',
          state: formData.address.state?.trim() || '',
        },
        openingHours: {
          segunda: {
            open: formData.openingHours.segunda.open?.trim() || '',
            close: formData.openingHours.segunda.close?.trim() || '',
          },
          terca: {
            open: formData.openingHours.terca.open?.trim() || '',
            close: formData.openingHours.terca.close?.trim() || '',
          },
          quarta: {
            open: formData.openingHours.quarta.open?.trim() || '',
            close: formData.openingHours.quarta.close?.trim() || '',
          },
          quinta: {
            open: formData.openingHours.quinta.open?.trim() || '',
            close: formData.openingHours.quinta.close?.trim() || '',
          },
          sexta: {
            open: formData.openingHours.sexta.open?.trim() || '',
            close: formData.openingHours.sexta.close?.trim() || '',
          },
          sabado: {
            open: formData.openingHours.sabado.open?.trim() || '',
            close: formData.openingHours.sabado.close?.trim() || '',
          },
          domingo: {
            open: formData.openingHours.domingo.open?.trim() || '',
            close: formData.openingHours.domingo.close?.trim() || '',
          },
        },
        socialMedia: {
          instagram: formData.socialMedia.instagram?.trim() || '',
          facebook: formData.socialMedia.facebook?.trim() || '',
          whatsapp: formData.socialMedia.whatsapp?.trim() || '',
        },
        profileImage: profileImageUrl,
        coverImage: coverImageUrl,
      };

      console.log('Enviando dados:', JSON.stringify(updateData, null, 2));

      const response = await fetch('/api/profile/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(updateData),
      });

      const data = await response.json();
      console.log('Resposta:', data);

      if (response.ok && data.success) {
        setSuccess('Perfil atualizado com sucesso!');
        // Atualiza a sessão antes de redirecionar
        try {
          await fetch('/api/auth/session', { method: 'GET' });
          // Aguarda 2 segundos antes de redirecionar
          setTimeout(() => {
            router.push('/profile');
          }, 2000);
        } catch (error) {
          console.error('Erro ao atualizar sessão:', error);
          setError('Erro ao atualizar sessão. Por favor, faça login novamente.');
        }
      } else {
        setError(data.message || 'Erro ao atualizar perfil');
        console.error('Erro na resposta:', data);
      }
    } catch (error: any) {
      console.error('Erro ao atualizar perfil:', error);
      setError(error.message || 'Erro ao atualizar perfil. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.type !== 'organizer') {
    return null;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-dark-900 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="glass-card p-8">
            <h1 className="text-3xl font-bold mb-8">
              <span className="gradient-text">Editar Perfil do Estabelecimento</span>
            </h1>

            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-500">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Imagens */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ImageUpload
                  currentImage={previewProfile}
                  onImageChange={(file) => handleImageChange(file, 'profile')}
                  aspectRatio={1}
                  label="Foto de Perfil"
                  height="h-64"
                />

                <ImageUpload
                  currentImage={previewCover}
                  onImageChange={(file) => handleImageChange(file, 'cover')}
                  aspectRatio={16/9}
                  label="Foto de Capa"
                  height="h-64"
                />
              </div>

              {/* Informações Básicas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="establishmentName" className="block text-gray-300 mb-2">
                    Nome do Estabelecimento
                  </label>
                  <input
                    type="text"
                    id="establishmentName"
                    name="establishmentName"
                    value={formData.establishmentName}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-300 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              </div>

              {/* Endereço */}
              <AddressForm
                initialData={formData.address}
                onAddressChange={(address: AddressData) => setFormData(prev => ({ ...prev, address }))}
              />

              {/* Descrição */}
              <div>
                <label htmlFor="description" className="block text-gray-300 mb-2">
                  Descrição
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="input-field h-32"
                />
              </div>

              {/* Horário de Funcionamento */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Horário de Funcionamento</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(formData.openingHours).map(([day, hours]) => (
                    <div key={day} className="flex items-center space-x-4">
                      <span className="w-24 text-gray-300 capitalize">{day}</span>
                      <input
                        type="time"
                        value={hours.open}
                        onChange={(e) => handleHoursChange(day, 'open', e.target.value)}
                        className="input-field"
                      />
                      <span>às</span>
                      <input
                        type="time"
                        value={hours.close}
                        onChange={(e) => handleHoursChange(day, 'close', e.target.value)}
                        className="input-field"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Redes Sociais */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Redes Sociais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="instagram" className="block text-gray-300 mb-2">
                      Instagram
                    </label>
                    <input
                      type="text"
                      id="instagram"
                      name="instagram"
                      value={formData.socialMedia.instagram}
                      onChange={handleSocialMediaChange}
                      className="input-field"
                      placeholder="@seu.instagram"
                    />
                  </div>

                  <div>
                    <label htmlFor="facebook" className="block text-gray-300 mb-2">
                      Facebook
                    </label>
                    <input
                      type="text"
                      id="facebook"
                      name="facebook"
                      value={formData.socialMedia.facebook}
                      onChange={handleSocialMediaChange}
                      className="input-field"
                      placeholder="facebook.com/sua.pagina"
                    />
                  </div>

                  <div>
                    <label htmlFor="whatsapp" className="block text-gray-300 mb-2">
                      WhatsApp
                    </label>
                    <input
                      type="tel"
                      id="whatsapp"
                      name="whatsapp"
                      value={formData.socialMedia.whatsapp}
                      onChange={handleSocialMediaChange}
                      className="input-field"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => router.push('/profile')}
                  className="btn-secondary"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Salvando...' : 'Salvar Alterações'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
