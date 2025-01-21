'use client';

import Head from 'next/head';
import Image from 'next/image';
import { useRouter} from 'next/navigation';  
import { useState } from 'react';
import axios from 'axios';


export default function Login() {

  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', senha: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3004/login', {
        email: formData.email,
        senha: formData.senha,
      });

      if (response.status === 200) {
        const redirectUrl  = response.data.redirectUrl;
        localStorage.setItem('access_token', response.data.access_token);

        router.push(redirectUrl);
      }

    } catch (error) {
      console.error('Erro ao fazer login', error);
      alert('Credenciais inválidas ou erro no login');
  };
};

  return (
    <>
      <Head>
        <title>Wayne Industries - Login</title>
      </Head>
      <div className="relative text-white min-h-screen flex items-center justify-center">
        <Image
          src="/bat-background-2.jpg"
          alt="Batman-themed background"
          fill
          className="object-cover"
          sizes="100vw"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <div className="relative z-20 w-full max-w-md bg-gray-800/95 rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-6">Wayne Industries</h1>
          <form id="loginForm" className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email:</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={formData.email}
                onChange={handleChange} 
                className="w-full bg-gray-700/80 text-white rounded-lg p-2 focus:outline-none focus:ring focus:ring-yellow-500" 
                placeholder="Digite seu email" 
                required 
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">Senha:</label>
              <input 
                type="password" 
                id="senha" 
                name="senha"
                value={formData.senha}
                onChange={handleChange} 
                className="w-full bg-gray-700/80 text-white rounded-lg p-2 focus:outline-none focus:ring focus:ring-yellow-500" 
                placeholder="Digite sua senha" 
                required 
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-yellow-500 text-gray-900 font-bold rounded-lg p-2 hover:bg-yellow-600 transition"
            >
              Login
            </button>
          </form>
          
        </div>
      </div>
    </>
  );
}

