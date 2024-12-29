"use client";

import Layout from '../components/Layout';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    password: '',
    confirmPassword: '',
    type: 'vip',
    establishmentName: '',
    address: '',
    phone: '',
    description: ''
  });

  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          type: formData.type,
          whatsapp: formData.whatsapp,
          ...(formData.type === 'promoter' ? {
            establishmentName: formData.establishmentName,
            address: formData.address,
            phone: formData.phone,
            description: formData.description
          } : {})
        }),
      });

      if (response.ok) {
        // Redireciona com base no tipo de usuário
        if (formData.type === 'promoter') {
          router.push('/subscription'); // Promoters precisam escolher um plano
        } else {
          router.push('/events'); // VIPs vão direto para eventos
        }
      } else {
        const data = await response.json();
        setError(data.message || 'Erro ao criar conta');
      }
    } catch (error) {
      setError('Erro ao criar conta. Tente novamente.');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-dark-900 py-20">
        <div className="max-w-md mx-auto px-4">
          <div className="glass-card p-8">
            <h1 className="text-3xl font-bold mb-8 text-center">
              <span className="gradient-text">Criar Conta</span>
            </h1>

            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2">Tipo de Conta</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="vip">Presença VIP</option>
                  <option value="promoter">Promoter/Estabelecimento</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Nome</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>

              {formData.type === 'vip' && (
                <div>
                  <label className="block text-gray-300 mb-2">WhatsApp</label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
              )}

              {formData.type === 'promoter' && (
                <>
                  <div>
                    <label className="block text-gray-300 mb-2">Nome do Estabelecimento</label>
                    <input
                      type="text"
                      name="establishmentName"
                      value={formData.establishmentName}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Endereço</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Telefone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Descrição do Estabelecimento</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="input-field h-24"
                      required
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-gray-300 mb-2">Senha</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Confirmar Senha</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                Criar Conta
              </button>

              <div className="text-center text-gray-400">
                Já tem uma conta?{' '}
                <Link href="/login" className="text-accent-purple hover:text-accent-pink">
                  Fazer Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
