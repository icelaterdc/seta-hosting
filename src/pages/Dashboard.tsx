import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Settings } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

interface Bot {
  id: string;
  name: string;
  status: string;
  status_message: string;
}

export default function Dashboard() {
  const [bots, setBots] = useState<Bot[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchBots();
    }
  }, [user]);

  const fetchBots = async () => {
    try {
      const { data, error } = await supabase
        .from('bots')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setBots(data || []);
    } catch (error: any) {
      toast.error('Botlar yüklenirken bir hata oluştu');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Botlarım</h2>
        {bots.length < 3 && (
          <Link
            to="/bot-ekle"
            className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Bot Ekle
          </Link>
        )}
      </div>

      {bots.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-600 mb-4">Henüz bot eklemediniz</p>
          <Link
            to="/bot-ekle"
            className="inline-flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            İlk Botunu Ekle
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {bots.map((bot) => (
            <div key={bot.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{bot.name}</h3>
                  <p className="text-gray-600">Durum: {bot.status}</p>
                  {bot.status_message && (
                    <p className="text-gray-600">Mesaj: {bot.status_message}</p>
                  )}
                </div>
                <Link
                  to={`/bot-ayarlari/${bot.id}`}
                  className="flex items-center text-gray-600 hover:text-indigo-600"
                >
                  <Settings className="w-5 h-5 mr-1" />
                  Ayarlar
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}