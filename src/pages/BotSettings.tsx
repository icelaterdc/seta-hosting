import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

interface Bot {
  id: string;
  name: string;
  token: string;
  status: string;
  status_message: string;
}

export default function BotSettings() {
  const { id } = useParams<{ id: string }>();
  const [bot, setBot] = useState<Bot | null>(null);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('online');
  const [statusMessage, setStatusMessage] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchBot();
    }
  }, [id]);

  const fetchBot = async () => {
    try {
      const { data, error } = await supabase
        .from('bots')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      setBot(data);
      setName(data.name);
      setStatus(data.status);
      setStatusMessage(data.status_message || '');
    } catch (error: any) {
      toast.error('Bot bilgileri yüklenemedi');
      navigate('/panel');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('bots')
        .update({
          name,
          status,
          status_message: statusMessage
        })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      toast.success('Bot ayarları güncellendi!');
      navigate('/panel');
    } catch (error: any) {
      toast.error(error.message || 'Ayarlar güncellenirken bir hata oluştu');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Bu botu silmek istediğinizden emin misiniz?')) {
      try {
        const { error } = await supabase
          .from('bots')
          .delete()
          .eq('id', id)
          .eq('user_id', user.id);

        if (error) throw error;
        toast.success('Bot başarıyla silindi!');
        navigate('/panel');
      } catch (error: any) {
        toast.error(error.message || 'Bot silinirken bir hata oluştu');
      }
    }
  };

  if (!bot) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Bot Ayarları</h2>
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
        <div className="mb-4">
          <label htmlFor="status" className="block text-gray-700 mb-2">
            Durum
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="online">Çevrimiçi</option>
            <option value="idle">Boşta</option>
            <option value="dnd">Rahatsız Etmeyin</option>
            <option value="invisible">Görünmez</option>
          </select>
        </div>
        <div className="mb-6">
          <label htmlFor="statusMessage" className="block text-gray-700 mb-2">
            Durum Mesajı
          </label>
          <input
            type="text"
            id="statusMessage"
            value={statusMessage}
            onChange={(e) => setStatusMessage(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="space-y-4">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Değişiklikleri Kaydet
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
          >
            Botu Sil
          </button>
        </div>
      </form>
    </div>
  );
}