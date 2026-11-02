import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Monitor, BookOpen, Settings, Power } from 'lucide-react';

export default function UserDropdown({ onClose }) {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    if (onClose) onClose();
    if (path && path !== '#') {
      navigate(path);
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-xs shadow-xl py-2.5 z-50 text-xs text-slate-600 select-none">
      {/* Cabeçalho do Dropdown: Nome do utilizador e agência em negrito */}
      <div className="px-3.5 pb-2">
        <p className="text-[12px] text-slate-600 leading-tight font-normal">
          Mozart de Marias
        </p>
        <p className="text-[11px] font-bold text-slate-800 uppercase tracking-tight mt-0.5">
          ÉVORA MODELS
        </p>
      </div>

      {/* Primeira secção (links): Minha conta */}
      <div className="py-0.5">
        <button
          type="button"
          onClick={() => handleNavigate('/minha-conta')}
          className="w-full px-3.5 py-1.5 text-left hover:bg-sky-50 flex items-center gap-2.5 text-xs text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <User className="w-3.5 h-3.5 fill-slate-700 text-slate-700 shrink-0" />
          <span>Minha conta</span>
        </button>
      </div>

      {/* Separador */}
      <div className="border-t border-slate-100 my-1.5" />

      {/* Segunda secção (links): Website, Tutoriais e Configurações */}
      <div className="space-y-0.5">
        <button
          type="button"
          onClick={() => handleNavigate('#')}
          className="w-full px-3.5 py-1.5 text-left hover:bg-sky-50 flex items-center gap-2.5 text-xs text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <Monitor className="w-3.5 h-3.5 text-slate-700 stroke-[2.2] shrink-0" />
          <span>Website</span>
        </button>

        <button
          type="button"
          onClick={() => handleNavigate('#')}
          className="w-full px-3.5 py-1.5 text-left hover:bg-sky-50 flex items-center gap-2.5 text-xs text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5 fill-slate-700 text-slate-700 shrink-0" />
          <span>Tutoriais</span>
        </button>

        <button
          type="button"
          onClick={() => handleNavigate('#')}
          className="w-full px-3.5 py-1.5 text-left hover:bg-sky-50 flex items-center gap-2.5 text-xs text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <Settings className="w-3.5 h-3.5 fill-slate-700 text-slate-700 shrink-0" />
          <span>Configurações</span>
        </button>
      </div>

      {/* Separador */}
      <div className="border-t border-slate-100 my-1.5" />

      {/* Rodapé do Dropdown: Sair */}
      <div className="pt-0.5">
        <button
          type="button"
          onClick={() => handleNavigate('/login')}
          className="w-full px-3.5 py-1.5 text-left hover:bg-sky-50 flex items-center gap-2.5 text-xs text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <Power className="w-3.5 h-3.5 text-slate-700 stroke-[2.5] shrink-0" />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
}

