import React, { useState } from 'react';
import {
  ArrowLeftRight,
  Download,
  Search,
  ChevronDown,
} from 'lucide-react';
import TransferModal from './modals/TransferModal';

const STATEMENT_COLUMNS = [
  'Categoria',
  'Sub categoria',
  'Descrição',
  'Cliente/Fornecedor',
  'Método',
  'Notas',
  'Crédito',
  'Débito',
  'Saldo',
];

export default function BankStatements() {
  const [account, setAccount] = useState('DEFAULT ACCOUNT -');
  const [dateFrom, setDateFrom] = useState('01/10/2026');
  const [dateTo, setDateTo] = useState('31/10/2026');
  const [currency, setCurrency] = useState('Todos');
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  return (
    <div className="pt-2">
      {/* Container Principal de Extratos Bancários (Imagem 61) */}
      <div className="border border-slate-200 rounded-xs overflow-hidden bg-white">
        {/* Painel de Filtro Cinzento */}
        <div className="bg-[#f4f4f4] border-b border-slate-200 p-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-start gap-4">
            {/* Título 'Filtro' à esquerda */}
            <div className="lg:col-span-1 pt-5">
              <span className="text-sm text-slate-700 font-normal">Filtro</span>
            </div>

            {/* Campos Conta, De, Até, Moeda e Botões */}
            <div className="lg:col-span-11 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {/* Conta */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-400">Conta</label>
                  <div className="relative">
                    <select
                      value={account}
                      onChange={(e) => setAccount(e.target.value)}
                      className="w-full h-8 px-2.5 pr-6 bg-white border border-slate-200 rounded-xs text-[11px] text-slate-400 appearance-none focus:outline-none focus:border-[#0077b5]"
                    >
                      <option value="DEFAULT ACCOUNT -">
                        DEFAULT ACCOUNT -
                      </option>
                      <option value="Todas as contas">Todas as contas</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* De */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-400">De</label>
                  <input
                    type="text"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-xs text-[11px] text-slate-400 focus:outline-none focus:border-[#0077b5]"
                  />
                </div>

                {/* Até */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-400">Até</label>
                  <input
                    type="text"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-xs text-[11px] text-slate-400 focus:outline-none focus:border-[#0077b5]"
                  />
                </div>

                {/* Moeda */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-400">Moeda</label>
                  <div className="relative">
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full h-8 px-2.5 pr-6 bg-white border border-slate-200 rounded-xs text-[11px] text-slate-400 appearance-none focus:outline-none focus:border-[#0077b5]"
                    >
                      <option value="Todos">Todos</option>
                      <option value="BRL">BRL</option>
                      <option value="USD">USD</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Botões: TRANSFERÊNCIA, EXPORTAÇÃO EXCEL e PESQUISA */}
              <div className="flex flex-wrap items-center justify-end gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsTransferModalOpen(true)}
                  className="h-8 px-3 bg-[#f38315] hover:bg-[#d9710c] text-white text-[10px] font-semibold uppercase rounded-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeftRight className="w-3 h-3 stroke-[2.5]" />
                  <span>TRANSFERÊNCIA</span>
                </button>

                <button
                  type="button"
                  className="h-8 px-3 bg-[#5fa2dd] hover:bg-[#4b8fc9] text-white text-[10px] font-semibold uppercase rounded-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3 h-3 stroke-[2.5]" />
                  <span>EXPORTAÇÃO EXCEL</span>
                </button>

                <button
                  type="button"
                  className="h-8 px-3 bg-[#0077b5] hover:bg-[#006399] text-white text-[10px] font-semibold uppercase rounded-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Search className="w-3 h-3 stroke-[2.5]" />
                  <span>PESQUISA</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabela Vazia com Cabeçalhos Simples e Totais */}
        <div className="px-4 py-5">
          <div className="pl-0 lg:pl-20">
            <div className="grid grid-cols-9 border-b border-slate-200 pb-2 text-[10px] text-slate-500">
              {STATEMENT_COLUMNS.map((col) => (
                <span key={col}>{col}</span>
              ))}
            </div>
          </div>

          {/* Nota à esquerda + Totais Saldo do Período e Balanço Geral */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-12 items-start gap-4 text-[10px]">
            <div className="sm:col-span-6 text-slate-400">
              * registros gerados desde a ficha de Talento
            </div>

            <div className="sm:col-span-3 text-right space-y-3 font-bold text-slate-800">
              <p>Saldo do Período</p>
              <p>Balanço Geral</p>
            </div>
            <div className="sm:col-span-3" />
          </div>

          {/* Secção Arquivos Anexados */}
          <div className="pt-12 pb-2">
            <h3 className="text-xs font-bold text-slate-800 border-b border-slate-500 pb-1.5">
              Arquivos Anexados
            </h3>
          </div>
        </div>
      </div>

      {/* Modal de Transferência */}
      <TransferModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
      />
    </div>
  );
}

