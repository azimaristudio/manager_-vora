import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function ActivitiesStats() {
  const [filterBy, setFilterBy] = useState('Talento');
  const [talentQuery, setTalentQuery] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [resultsMode, setResultsMode] = useState('Gráfico');
  const [showSentPackages, setShowSentPackages] = useState(false);

  return (
    <div className="pt-2">
      {/* Barra de Filtro Horizontal Cinza Claro (Imagem 52) */}
      <div className="bg-[#1c1c1e] border border-white/10 rounded-xs px-3.5 py-3">
        <div className="flex flex-wrap items-start gap-3">
          {/* Filtrar por */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-neutral-400">Filtrar por</label>
            <div className="relative w-32">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="w-full h-8 px-2.5 pr-6 bg-[#1c1c1e] border border-white/10 rounded-xs text-xs font-bold text-white appearance-none focus:outline-none focus:border-[#880E1B]"
              >
                <option value="Talento">Talento</option>
                <option value="Booker">Booker</option>
                <option value="Departamento">Departamento</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Talento */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-neutral-400">Talento</label>
            <input
              type="text"
              value={talentQuery}
              onChange={(e) => setTalentQuery(e.target.value)}
              placeholder="Pesquisa..."
              className="w-60 sm:w-72 h-8 px-2.5 bg-[#1c1c1e] border border-white/10 rounded-xs text-xs text-white placeholder:text-neutral-400 focus:outline-none focus:border-[#880E1B]"
            />
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

          {/* Resultados + Checkbox 'Mostrar pacotes enviados' */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-neutral-400">Resultados</label>
            <div className="relative w-32">
              <select
                value={resultsMode}
                onChange={(e) => setResultsMode(e.target.value)}
                className="w-full h-8 px-2.5 pr-6 bg-[#1c1c1e] border border-white/10 rounded-xs text-xs font-bold text-white appearance-none focus:outline-none focus:border-[#880E1B]"
              >
                <option value="Gráfico">Gráfico</option>
                <option value="Tabela">Tabela</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <label className="inline-flex items-center gap-1.5 text-[10px] text-neutral-400 mt-1 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showSentPackages}
                onChange={(e) => setShowSentPackages(e.target.checked)}
                className="w-3.5 h-3.5 rounded-xs border-white/10 text-[#E8AC51]"
              />
              <span>Mostrar pacotes enviados</span>
            </label>
          </div>

          {/* Botão azul PESQUISAR */}
          <div className="pt-4">
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

