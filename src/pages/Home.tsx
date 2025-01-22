import React from 'react';
import { Bot } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <Bot className="w-16 h-16 text-indigo-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Discord Bot Hosting Platformu
        </h1>
        <p className="text-xl text-gray-600">
          Discord botlarınızı kolayca yönetin ve 7/24 çalışır durumda tutun
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Kolay Kurulum</h3>
          <p className="text-gray-600">Bot tokeninizi girin ve hemen başlayın</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">7/24 Çalışma</h3>
          <p className="text-gray-600">Botlarınız kesintisiz çalışsın</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Kolay Yönetim</h3>
          <p className="text-gray-600">Bot durumunu ve ayarlarını kolayca değiştirin</p>
        </div>
      </div>
    </div>
  );
}