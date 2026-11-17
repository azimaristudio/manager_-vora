import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function PackagesStats() {
  const [byFilter, setByFilter] = useState('Usuário');
  const [sentByYou, setSentByYou] = useState('Você');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [clientQuery, setClientQuery] = useState('');
  const [talentQuery, setTalentQuery] = useState('');

  return (
    <div className="pt-2">
      {/* Barra de Filtro Horizontal Cinza Claro (Imagem 53) */}
      <div className="bg-[#1c1c1e] border border-white/10 rounded-xs px-3.5 py-3">
        <div className="flex flex-wrap items-end gap-3">
          {/* By */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-neutral-400">By</label>
            <div className="relative w-28">
              <select
                value={byFilter}
                onChange={(e) => setByFilter(e.target.value)}
                className="w-full h-8 px-2.5 pr-6 bg-[#1c1c1e] border border-white/10 rounded-xs text-xs font-bold text-white appearance-none focus:outline-none focus:border-[#880E1B]"
              >
                <option value="Usuário">Usuário</option>
                <option value="Cliente">Cliente</option>
                <option value="Talento">Talento</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Pacotes enviados por você */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-neutral-400">
              Pacotes enviados por você
            </label>
            <div className="relative w-44">
              <select
                value={sentByYou}
                onChange={(e) => setSentByYou(e.target.value)}
                className="w-full h-8 px-2.5 pr-6 bg-[#1c1c1e] border border-white/10 rounded-xs text-xs font-bold text-white appearance-none focus:outline-none focus:border-[#880E1B]"
              >
                <option value="Você">Você</option>
                <option value="Todos">Todos</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* De */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-neutral-400">De</label>
            <input
              type="text"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              placeholder="__/__/____"
              className="w-32 h-8 px-2.5 bg-[#1c1c1e] border border-white/10 rounded-xs text-xs text-white placeholder:text-neutral-400 focus:outline-none focus:border-[#880E1B]"
            />
          </div>

          {/* Até */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-neutral-400">Até</label>
            <input
              type="text"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              placeholder="__/__/____"
              className="w-32 h-8 px-2.5 bg-[#1c1c1e] border border-white/10 rounded-xs text-xs text-white placeholder:text-neutral-400 focus:outline-none focus:border-[#880E1B]"
            />
          </div>

          {/* Cliente */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-neutral-400">Cliente</label>
            <input
              type="text"
              value={clientQuery}
              onChange={(e) => setClientQuery(e.target.value)}
              placeholder="Pesquisa..."
              className="w-52 h-8 px-2.5 bg-[#1c1c1e] border border-white/10 rounded-xs text-xs text-white placeholder:text-neutral-400 focus:outline-none focus:border-[#880E1B]"
            />
          </div>

          {/* Talento */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-neutral-400">Talento</label>
            <input
              type="text"
              value={talentQuery}
              onChange={(e) => setTalentQuery(e.target.value)}
              placeholder="Pesquisa..."
              className="w-52 h-8 px-2.5 bg-[#1c1c1e] border border-white/10 rounded-xs text-xs text-white placeholder:text-neutral-400 focus:outline-none focus:border-[#880E1B]"
            />
          </div>

          {/* Botão azul PESQUISAR */}
          <div>
            <button
              type="button"
              className="h-8 px-3.5 bg-[#880E1B] hover:bg-[#a31121] text-white text-[11px] font-semibold uppercase rounded-xs transition-colors cursor-pointer"
            >
              PESQUISAR
            </button>
          </div>
        </div>
      </div>

      {/* Área abaixo em branco (Empty State) */}
      <div className="min-h-[80px] bg-[#1c1c1e]" />
    </div>
  );
}

