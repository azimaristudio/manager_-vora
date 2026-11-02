import React, { useState } from 'react';

export default function CalendarNotificationsConfig() {
  const [activeChannel, setActiveChannel] = useState('email'); // 'email' | 'whatsapp'

  return (
    <div className="pt-3">
      {/* Duas pequenas abas no topo: Email e Whatsapp + Linha separadora horizontal subtil */}
      <div className="border-b border-slate-200/90 flex items-end gap-0.5">
        <button
          type="button"
          onClick={() => setActiveChannel('email')}
          className={`px-3 py-2 text-[11px] transition-colors cursor-pointer ${
            activeChannel === 'email'
              ? 'bg-white border-t border-l border-r border-slate-200 rounded-t-xs -mb-px text-slate-600'
              : 'bg-[#fafafa] hover:bg-white border-t border-l border-r border-slate-200/80 rounded-t-xs text-slate-500'
          }`}
        >
          Email
        </button>

        <button
          type="button"
          onClick={() => setActiveChannel('whatsapp')}
          className={`px-3 py-2 text-[11px] transition-colors cursor-pointer ${
            activeChannel === 'whatsapp'
              ? 'bg-white border-t border-l border-r border-slate-200 rounded-t-xs -mb-px text-slate-600'
              : 'bg-[#fafafa] hover:bg-white border-t border-l border-r border-slate-200/80 rounded-t-xs text-slate-500'
          }`}
        >
          Whatsapp
        </button>
      </div>

      {/* Área de conteúdo vazia abaixo da linha separadora (Imagem 103) */}
      <div className="min-h-[80px]" />
    </div>
  );
}

