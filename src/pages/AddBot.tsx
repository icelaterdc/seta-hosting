import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function AddBot() {
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('bots').insert([
        {
          user_id: user.id,
          name,
          token,
          status: 'online'
        }
      ]);

      if (error) throw error;
      toast.success('Bot başarıyla eklendi!');
      navigate('/panel');
    } catch (error: any) {
      toast.error(error.message || 'Bot eklenirken bir hata oluştu');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Bot Ekle</h2>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">
            Bot Adı
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="token" className="block text-gray-700 mb-2">
            Bot Token
          </label>
          <input
            type="password"
            id="token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
          <p className="mt-2 text-sm text-gray-500">
            Bot tokeninizi Discord Developer Portal'dan alabilirsiniz
          </p>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Bot Ekle
        </button>
      </form>
    </div>
  );
}