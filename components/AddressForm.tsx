import { useState } from 'react';
import { FiLoader } from 'react-icons/fi';

interface AddressFormProps {
  onAddressChange: (address: AddressData) => void;
  initialData?: AddressData;
}

export interface AddressData {
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

export default function AddressForm({ onAddressChange, initialData }: AddressFormProps) {
  const [address, setAddress] = useState<AddressData>(initialData || {
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCepChange = async (cep: string) => {
    setAddress(prev => ({ ...prev, cep }));
    
    if (cep.length === 8) {
      setLoading(true);
      setError('');
      
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        
        if (data.erro) {
          setError('CEP não encontrado');
          return;
        }

        setAddress(prev => ({
          ...prev,
          street: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf
        }));

        onAddressChange({
          ...address,
          street: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf
        });
      } catch (err) {
        setError('Erro ao buscar CEP');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'cep') {
      const numbers = value.replace(/\D/g, '');
      handleCepChange(numbers);
    } else {
      setAddress(prev => ({ ...prev, [name]: value }));
      onAddressChange({ ...address, [name]: value });
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <label htmlFor="cep" className="block text-gray-300 mb-2">
            CEP
          </label>
          <input
            type="text"
            id="cep"
            name="cep"
            value={address.cep}
            onChange={handleChange}
            className="input-field"
            placeholder="00000-000"
            maxLength={8}
          />
          {loading && (
            <FiLoader className="absolute right-3 top-10 animate-spin text-accent-purple" />
          )}
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="street" className="block text-gray-300 mb-2">
            Rua
          </label>
          <input
            type="text"
            id="street"
            name="street"
            value={address.street}
            onChange={handleChange}
            className="input-field"
            placeholder="Nome da rua"
          />
        </div>

        <div>
          <label htmlFor="number" className="block text-gray-300 mb-2">
            Número
          </label>
          <input
            type="text"
            id="number"
            name="number"
            value={address.number}
            onChange={handleChange}
            className="input-field"
            placeholder="123"
          />
        </div>
      </div>

      <div>
        <label htmlFor="complement" className="block text-gray-300 mb-2">
          Complemento
        </label>
        <input
          type="text"
          id="complement"
          name="complement"
          value={address.complement}
          onChange={handleChange}
          className="input-field"
          placeholder="Apto 123, Bloco B"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="neighborhood" className="block text-gray-300 mb-2">
            Bairro
          </label>
          <input
            type="text"
            id="neighborhood"
            name="neighborhood"
            value={address.neighborhood}
            onChange={handleChange}
            className="input-field"
            placeholder="Nome do bairro"
          />
        </div>

        <div>
          <label htmlFor="city" className="block text-gray-300 mb-2">
            Cidade
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={address.city}
            onChange={handleChange}
            className="input-field"
            placeholder="Nome da cidade"
          />
        </div>

        <div>
          <label htmlFor="state" className="block text-gray-300 mb-2">
            Estado
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={address.state}
            onChange={handleChange}
            className="input-field"
            placeholder="UF"
            maxLength={2}
          />
        </div>
      </div>
    </div>
  );
}
