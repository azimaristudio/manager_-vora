import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowUp,
  Scale,
  FileText,
  ChevronDown,
  Globe,
} from 'lucide-react';
import Incomes from './Incomes';
import Expenses from './Expenses';
import CashFlow from './CashFlow';
import BankStatements from './BankStatements';
import TalentStatements from './TalentStatements';

const LEFT_TABS = [
  { key: 'entradas', label: 'Entradas', Icon: ArrowDown },
  { key: 'saidas', label: 'Saídas', Icon: ArrowUp },
  { key: 'fluxo', label: 'Fluxo de Caixa', Icon: Scale },
];

const RIGHT_TABS = [
  { key: 'extratos-bancarios', label: 'Extratos Bancários', Icon: FileText },
  { key: 'extratos-talentos', label: 'Extratos Talentos', Icon: FileText },
];

const ALL_TABS = [...LEFT_TABS, ...RIGHT_TABS];

export default function AccountingLayout() {
  // Estado local da secção ativa ('entradas' | 'saidas' | 'fluxo' | 'extratos-bancarios' | 'extratos-talentos')
  const [activeTab, setActiveTab] = useState('entradas');

  const currentTabInfo =
    ALL_TABS.find((t) => t.key === activeTab) || LEFT_TABS[0];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white flex flex-col justify-between py-4 px-4 sm:px-8">
      <div className="max-w-[1160px] w-full mx-auto">
        {/* Topo: Breadcrumb dinâmico ('Início > Contabilidade > Entradas') e Indicador de Saldo ('0.00 BRL') */}
        <div className="bg-[#f5f5f5] border border-slate-200/80 rounded-xs px-4 py-2.5 flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-1.5 text-xs">
            <Link
              to="/"
              className="text-[#0077b5] hover:underline font-normal"
            >
              Início
            </Link>
            <span className="text-slate-400">&gt;</span>
            <button
              type="button"
              onClick={() => setActiveTab('entradas')}
              className="text-[#0077b5] hover:underline font-normal cursor-pointer"
            >
              Contabilidade
            </button>
            <span className="text-slate-400">&gt;</span>
            <span className="text-slate-500 font-normal">
              {currentTabInfo.label}
            </span>
          </div>

          {/* Indicador de Saldo no canto superior direito */}
          <div className="flex items-center gap-2 text-xs">
            <span>
              <strong className="text-[#28a745] font-bold">0.00</strong>{' '}
              <span className="text-slate-700 font-semibold">BRL</span>
            </span>
            <button
              type="button"
              title="Detalhes do Saldo"
              className="w-4 h-4 rounded-full bg-slate-600 text-white flex items-center justify-center hover:bg-slate-800 cursor-pointer"
            >
              <ChevronDown className="w-2.5 h-2.5 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* Barra de Navegação com 3 Botões à Esquerda e 2 Botões à Direita */}
        <div className="border-b border-slate-200 flex flex-wrap items-end justify-between gap-2 mb-3">
          {/* Esquerda: Entradas | Saídas | Fluxo de Caixa */}
          <div className="flex flex-wrap items-end gap-1.5">
            {LEFT_TABS.map(({ key, label, Icon }) => {
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveTab(key)}
                  className={`px-3.5 py-2.5 rounded-t-xs flex items-center gap-2 text-xs transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-white border border-b-white border-slate-300 -mb-px text-slate-900 font-medium shadow-[0_-1px_0_0_rgba(0,0,0,0.02)]'
                      : 'bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 font-normal'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                      isActive
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-700 text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                  <span>{label}</span>
                </button>
              );
            })}
          </div>

          {/* Direita: Extratos Bancários | Extratos Talentos */}
          <div className="flex flex-wrap items-end gap-1.5">
            {RIGHT_TABS.map(({ key, label, Icon }) => {
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveTab(key)}
                  className={`px-3.5 py-2.5 rounded-t-xs flex items-center gap-2 text-xs transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-white border border-b-white border-slate-300 -mb-px text-slate-900 font-medium shadow-[0_-1px_0_0_rgba(0,0,0,0.02)]'
                      : 'bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 font-normal'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                      isActive
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-700 text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 stroke-[2.2]" />
                  </span>
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Conteúdo da Secção Selecionada */}
        {activeTab === 'entradas' && <Incomes />}
        {activeTab === 'saidas' && <Expenses />}
        {activeTab === 'fluxo' && <CashFlow />}
        {activeTab === 'extratos-bancarios' && <BankStatements />}
        {activeTab === 'extratos-talentos' && <TalentStatements />}
      </div>

      {/* Rodapé Padrão ManagerFashion */}
      <footer className="mt-8 pb-6 text-center space-y-2 text-xs text-slate-500">
        <div className="flex items-center justify-center gap-4">
          <span className="inline-flex items-center gap-1.5 text-slate-500">
            <Globe className="w-3.5 h-3.5" />
            <span>Idiomas</span>
          </span>
          <button
            type="button"
            className="text-[#0077b5] underline font-normal text-[11px] uppercase cursor-pointer"
          >
            ENGLISH
          </button>
          <button
            type="button"
            className="text-[#0077b5] hover:underline font-normal text-[11px] uppercase cursor-pointer"
          >
            ESPAÑOL
          </button>
          <button
            type="button"
            className="text-[#0077b5] hover:underline font-normal text-[11px] uppercase cursor-pointer"
          >
            PORTUGUÊS
          </button>
        </div>
        <p className="text-slate-500 text-xs">© ManagerFashion.com</p>
      </footer>
    </div>
  );
}

