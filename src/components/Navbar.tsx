import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Bot className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-bold">Discord Bot Hosting</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/panel" className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600">
                  <User className="w-5 h-5" />
                  <span>Panel</span>
                </Link>
                <button
                  onClick={signOut}
                  className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Çıkış Yap</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/giris"
                  className="px-4 py-2 text-indigo-600 hover:text-indigo-700"
                >
                  Giriş Yap
                </Link>
                <Link
                  to="/kayit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Kayıt Ol
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}