'use client'

import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';


export default function Register() {

  const [formData, setFormData] = useState(
    { nome: '', email: '', senha: '', confirmaSenha: '' }
  );  // Inicializa o estado do formulário} 

  const  router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

  }; // Função para atualizar o estado do formulário 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nome, email, senha, confirmaSenha } = formData;

    if (senha !== confirmaSenha) {
      alert('Senhas não conferem');
      return;
    }

    try{
      const response = await axios.post('http://localhost:3004/cadastrar', {
        nome,
        email,
        senha,
      });
      
      if(response.status === 201){
        alert('Usuário cadastrado com sucesso');
        router.push('/');
      }

    }catch(error){
      console.error(error);
    }

  }


  return (
    <>
      <Head>
        <title>Wayne Industries - Register</title>
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
          <form id="registerForm" className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Name:</label>
              <input
                type="text"
                id="name"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">Password:</label>
              <input
                type="password"
                id="password"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmaSenha"
                value={formData.confirmaSenha}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-gray-900 font-bold rounded-lg p-2 hover:bg-yellow-600 transition"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}