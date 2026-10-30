import React, { useState } from 'react';
import Login from './components/Login';
import AppLayout from './components/AppLayout';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('talents'); // 'login' | 'talents'

  return (
    <div className="relative min-h-screen">
      {currentScreen === 'login' ? (
        <Login onLoginSuccess={() => setCurrentScreen('talents')} />
      ) : (
        <AppLayout onLogout={() => setCurrentScreen('login')} />
      )}

      {/* Barra flutuante de protótipo para alternar rapidamente entre as telas 01 e 02 */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-xs text-white px-3 py-1.5 rounded-full shadow-lg border border-white/15 text-xs">
        <span className="text-slate-400 font-medium mr-1">Tela:</span>
        <button
          type="button"
          onClick={() => setCurrentScreen('login')}
          className={`px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer ${
            currentScreen === 'login'
              ? 'bg-[#0077b5] text-white'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          01. Login
        </button>
        <button
          type="button"
          onClick={() => setCurrentScreen('talents')}
          className={`px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer ${
            currentScreen === 'talents'
              ? 'bg-[#0077b5] text-white'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          02. Talentos (Layout)
        </button>
      </div>
    </div>
  );
}

