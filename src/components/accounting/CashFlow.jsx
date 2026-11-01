import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function CashFlow() {
  const [year, setYear] = useState('2026');
  const [month, setMonth] = useState('Out');
  const [flowType, setFlowType] = useState('Realizado');
  const [currency, setCurrency] = useState('BRL');
  const [bankAccount, setBankAccount] = useState('DEFAULT ACCOUNT -');
  const [showGroups, setShowGroups] = useState(false);

  return (
    <div className="pt-2">
      {/* Container Principal de Fluxo de Caixa (Imagem 60) */}
      <div className="border border-slate-200 rounded-xs overflow-hidden bg-white">
        {/* Barra de Filtros */}
        <div className="bg-[#f4f4f4] border-b border-slate-200 px-3.5 py-2.5 flex flex-wrap items-center gap-2 text-xs text-slate-600">
          <span>Período</span>

          {/* Ano */}
          <div className="relative w-24">
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full h-8 px-2.5 pr-6 bg-white border border-slate-200 rounded-xs text-[11px] text-slate-400 appearance-none focus:outline-none focus:border-[#0077b5]"
            >
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Mês */}
          <div className="relative w-24">
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full h-8 px-2.5 pr-6 bg-white border border-slate-200 rounded-xs text-[11px] text-slate-400 appearance-none focus:outline-none focus:border-[#0077b5]"
            >
              <option value="Out">Out</option>
              <option value="Nov">Nov</option>
              <option value="Dez">Dez</option>
              <option value="Jan">Jan</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <span className="ml-1">Tipo</span>

          {/* Tipo */}
          <div className="relative w-28">
            <select
              value={flowType}
              onChange={(e) => setFlowType(e.target.value)}
              className="w-full h-8 px-2.5 pr-6 bg-white border border-slate-200 rounded-xs text-[11px] text-slate-400 appearance-none focus:outline-none focus:border-[#0077b5]"
            >
              <option value="Realizado">Realizado</option>
              <option value="Previsto">Previsto</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <span className="ml-1">Moeda</span>

          {/* Moeda */}
          <div className="relative w-20">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full h-8 px-2.5 pr-6 bg-white border border-slate-200 rounded-xs text-[11px] text-slate-400 appearance-none focus:outline-none focus:border-[#0077b5]"
            >
              <option value="BRL">BRL</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <span className="ml-1">Contas Bancárias</span>

          {/* Contas Bancárias */}
          <div className="relative w-56">
            <select
              value={bankAccount}
              onChange={(e) => setBankAccount(e.target.value)}
              className="w-full h-8 px-2.5 pr-6 bg-white border border-slate-200 rounded-xs text-[10px] font-bold text-slate-700 appearance-none focus:outline-none focus:border-[#0077b5]"
            >
              <option value="DEFAULT ACCOUNT -">DEFAULT ACCOUNT -</option>
              <option value="Todas as contas">Todas as contas</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Checkbox Mostrar grupos */}
          <label className="inline-flex items-center gap-1.5 ml-2 text-xs text-slate-800 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showGroups}
              onChange={(e) => setShowGroups(e.target.checked)}
              className="w-3.5 h-3.5 rounded-xs border-slate-300 text-[#0077b5]"
            />
            <span>Mostrar grupos</span>
          </label>

          {/* Botão PESQUISAR */}
          <button
            type="button"
            className="h-8 px-3 bg-[#0077b5] hover:bg-[#006399] text-white text-[10px] font-semibold uppercase rounded-xs ml-2 transition-colors cursor-pointer"
          >
            PESQUISAR
          </button>
        </div>

        {/* Área em branco abaixo dos filtros (Empty State) */}
        <div className="min-h-[440px] bg-white" />
      </div>
    </div>
  );
}

