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
    <div
      className="absolute right-0 top-full mt-2.5 w-48 bg-[#1c1c1e] border border-white/10 rounded-xs shadow-lg py-2.5 z-50 text-xs text-neutral-400 select-none"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Seta superior apontando para o ícone de perfil */}
      <div className="absolute -top-1.5 right-4 w-3 h-3 bg-[#1c1c1e] border-t border-l border-white/10 rotate-45" />

      {/* Cabeçalho do Dropdown: Nome do utilizador e agência em negrito */}
      <div className="relative px-3.5 pb-2">
        <p className="text-[12px] text-neutral-400 leading-tight font-normal">
          Mozart de Marias
        </p>
        <p className="text-[11px] font-bold text-[#E8AC51] uppercase tracking-tight mt-0.5">
          ÉVORA MODELS
        </p>
      </div>

      {/* Primeira secção (links): Minha conta */}
      <div className="py-0.5">
        <button
          type="button"
          onClick={() => handleNavigate('/minha-conta')}
          className="w-full px-3.5 py-1.5 text-left hover:bg-[#880E1B] flex items-center gap-2.5 text-xs text-neutral-100 hover:text-white transition-colors cursor-pointer"
        >
          <User className="w-3.5 h-3.5 fill-[#E8AC51] text-[#E8AC51] shrink-0" />
          <span>Minha conta</span>
        </button>
      </div>

      {/* Separador */}
      <div className="border-t border-white/10 my-1.5" />

      {/* Segunda secção (links): Website, Tutoriais e Configurações */}
      <div className="space-y-0.5">
        <button
          type="button"
          onClick={() => handleNavigate('#')}
          className="w-full px-3.5 py-1.5 text-left hover:bg-[#880E1B] flex items-center gap-2.5 text-xs text-neutral-100 hover:text-white transition-colors cursor-pointer"
        >
          <Monitor className="w-3.5 h-3.5 text-[#E8AC51] stroke-[2.2] shrink-0" />
          <span>Website</span>
        </button>

        <button
          type="button"
          onClick={() => handleNavigate('#')}
          className="w-full px-3.5 py-1.5 text-left hover:bg-[#880E1B] flex items-center gap-2.5 text-xs text-neutral-100 hover:text-white transition-colors cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5 fill-[#E8AC51] text-[#E8AC51] shrink-0" />
          <span>Tutoriais</span>
        </button>

        <button
          type="button"
          onClick={() => handleNavigate('/configuracoes')}
          className="w-full px-3.5 py-1.5 text-left hover:bg-[#880E1B] flex items-center gap-2.5 text-xs text-neutral-100 hover:text-white transition-colors cursor-pointer"
        >
          <Settings className="w-3.5 h-3.5 fill-[#E8AC51] text-[#E8AC51] shrink-0" />
          <span>Configurações</span>
        </button>
      </div>

      {/* Separador */}
      <div className="border-t border-white/10 my-1.5" />

      {/* Rodapé do Dropdown: Sair */}
      <div className="pt-0.5">
        <button
          type="button"
          onClick={() => handleNavigate('/login')}
          className="w-full px-3.5 py-1.5 text-left hover:bg-[#880E1B] flex items-center gap-2.5 text-xs text-neutral-100 hover:text-white transition-colors cursor-pointer"
        >
          <Power className="w-3.5 h-3.5 text-[#E8AC51] stroke-[2.5] shrink-0" />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
}

