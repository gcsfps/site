import { useState } from 'react';

interface AddressFormProps {
  onAddressChange?: (address: AddressData) => void;
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Para CEP, remove caracteres não numéricos
    if (name === 'cep') {
      const cleanValue = value.replace(/\D/g, '').slice(0, 8);
      const newAddress = { ...address, [name]: cleanValue };
      setAddress(newAddress);
      if (onAddressChange) onAddressChange(newAddress);
      return;
    }

    // Para outros campos, atualiza normalmente
    const newAddress = { ...address, [name]: value };
    setAddress(newAddress);
    if (onAddressChange) onAddressChange(newAddress);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="cep" className="block text-gray-300 mb-2">
            CEP *
          </label>
          <input
            type="text"
            id="cep"
            name="cep"
            value={address.cep}
            onChange={handleChange}
            className="input-field"
            placeholder="00000000"
            maxLength={8}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="street" className="block text-gray-300 mb-2">
            Rua *
          </label>
          <input
            type="text"
            id="street"
            name="street"
            value={address.street}
            onChange={handleChange}
            className="input-field"
            placeholder="Nome da rua"
            required
          />
        </div>

        <div>
          <label htmlFor="number" className="block text-gray-300 mb-2">
            Número *
          </label>
          <input
            type="text"
            id="number"
            name="number"
            value={address.number}
            onChange={handleChange}
            className="input-field"
            placeholder="123"
            required
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
      
      <p className="text-sm text-gray-400">* Campos obrigatórios</p>
    </div>
  );
}
