import React, { useState } from 'react';
import {
  RefreshCw,
  Settings,
  Download,
  ArrowLeftRight,
  Search,
  Printer,
} from 'lucide-react';
import DirectEntryModal from './modals/DirectEntryModal';
import NewEntryModal from './modals/NewEntryModal';
import TransferModal from './modals/TransferModal';
import ColumnsConfigModal from './modals/ColumnsConfigModal';

const STATUS_LEGEND = [
  { label: 'Pendente', color: 'bg-black', hasExclamation: false },
  {
    label: 'Pendente - Na Hora',
    color: 'bg-[#e53935]',
    hasExclamation: false,
  },
  {
    label: 'Pendente - Atrasado',
    color: 'bg-[#e53935]',
    hasExclamation: true,
  },
  {
    label: 'Parcial - Na Hora',
    color: 'bg-[#f57c00]',
    hasExclamation: false,
  },
  {
    label: 'Parcial - Atrasado',
    color: 'bg-[#f57c00]',
    hasExclamation: true,
  },
  { label: 'Pago', color: 'bg-[#43a047]', hasExclamation: false },
  { label: 'Cancelado', color: 'bg-[#8e8e8e]', hasExclamation: false },
];

export default function Incomes() {
  const [activeModal, setActiveModal] = useState(null); // 'direct' | 'new' | 'transfer' | 'columns' | null

  return (
    <div className="pt-2">
      {/* Barra de Ferramentas (Imagem 54) */}
      <div className="bg-[#f4f4f4] border border-slate-200 rounded-xs px-3 py-2 flex flex-wrap items-center justify-between gap-3 mb-2">
        {/* Esquerda: Legenda de Status com Círculos Coloridos */}
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
          {STATUS_LEGEND.map((st) => (
            <div key={st.label} className="flex items-center gap-1.5">
              <span
                className={`w-3.5 h-3.5 rounded-full inline-flex items-center justify-center text-white text-[9px] font-bold leading-none ${st.color}`}
              >
                {st.hasExclamation ? '!' : ''}
              </span>
              <span>{st.label}</span>
            </div>
          ))}
        </div>

        {/* Direita: Botões de Ação */}
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Ícone de Refresh (Verde) */}
          <button
            type="button"
            title="Atualizar"
            className="p-1.5 text-[#28a745] hover:text-emerald-700 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>

          {/* Ícone de Engrenagem (Preto) -> Abre ColumnsConfigModal */}
          <button
            type="button"
            onClick={() => setActiveModal('columns')}
            title="Configurar Colunas"
            className="p-1.5 text-slate-800 hover:text-black cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5 fill-slate-800" />
          </button>

          {/* EXPORTAÇÃO EXCEL (Azul Claro) */}
          <button
            type="button"
            className="h-8 px-2.5 bg-[#5fa2dd] hover:bg-[#4b8fc9] text-white text-[10px] font-semibold uppercase rounded-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3 h-3 stroke-[2.5]" />
            <span>EXPORTAÇÃO EXCEL</span>
          </button>

          {/* TRANSFERÊNCIA (Laranja) -> Abre TransferModal */}
          <button
            type="button"
            onClick={() => setActiveModal('transfer')}
            className="h-8 px-2.5 bg-[#f38315] hover:bg-[#d9710c] text-white text-[10px] font-semibold uppercase rounded-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeftRight className="w-3 h-3 stroke-[2.5]" />
            <span>TRANSFERÊNCIA</span>
          </button>

          {/* NOVA ENTRADA (Azul) -> Abre NewEntryModal */}
          <button
            type="button"
            onClick={() => setActiveModal('new')}
            className="h-8 px-3 bg-[#0077b5] hover:bg-[#006399] text-white text-[10px] font-semibold uppercase rounded-xs transition-colors cursor-pointer"
          >
            NOVA ENTRADA
          </button>

          {/* LANÇAMENTO DIRETO (Azul Escuro) -> Abre DirectEntryModal */}
          <button
            type="button"
            onClick={() => setActiveModal('direct')}
            className="h-8 px-3 bg-[#006299] hover:bg-[#004f7c] text-white text-[10px] font-semibold uppercase rounded-xs transition-colors cursor-pointer"
          >
            LANÇAMENTO DIRETO
          </button>
        </div>
      </div>

      {/* Tabela de Entradas */}
      <div className="border border-slate-200 rounded-xs overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] border-collapse">
            <thead>
              <tr className="bg-[#0077b5] text-white text-[10px] font-normal">
                <th className="py-2 px-1.5 text-center align-bottom w-11">
                  <div className="flex flex-col items-center gap-1">
                    <span>Status</span>
                    <Search className="w-3 h-3 stroke-[2.5]" />
                  </div>
                </th>
                <th className="py-2 px-2 text-center align-bottom bg-[#222222] w-16">
                  <div className="flex flex-col items-center gap-1">
                    <span>2026/Out</span>
                    <Search className="w-3 h-3 stroke-[2.5]" />
                  </div>
                </th>
                <th className="py-2 px-2 text-left align-bottom">
                  <div className="inline-flex items-center gap-1">
                    <span>Tipo</span>
                    <Search className="w-3 h-3 stroke-[2.5]" />
                  </div>
                </th>
                <th className="py-2 px-2 text-left align-bottom">
                  <div className="inline-flex items-center gap-1">
                    <span>Categoria</span>
                    <Search className="w-3 h-3 stroke-[2.5]" />
                  </div>
                </th>
                <th className="py-2 px-2 text-left align-bottom">
                  <div className="inline-flex items-center gap-1">
                    <span>SubCategoria</span>
                    <Search className="w-3 h-3 stroke-[2.5]" />
                  </div>
                </th>
                <th className="py-2 px-2 text-left align-bottom">
                  <div className="inline-flex items-center gap-1">
                    <span>Descrição</span>
                    <Search className="w-3 h-3 stroke-[2.5]" />
                  </div>
                </th>
                <th className="py-2 px-2 text-left align-bottom">
                  <div className="inline-flex items-center gap-1">
                    <span>Cliente</span>
                    <Search className="w-3 h-3 stroke-[2.5]" />
                  </div>
                </th>
                <th className="py-2 px-2 text-center align-bottom">
                  <div className="flex flex-col items-center gap-1">
                    <span>Usuário</span>
                    <Search className="w-3 h-3 stroke-[2.5]" />
                  </div>
                </th>
                <th className="py-2 px-2 text-left align-bottom">
                  <div className="inline-flex items-center gap-1">
                    <span>Talento</span>
                    <Search className="w-3 h-3 stroke-[2.5]" />
                  </div>
                </th>
                <th className="py-2 px-1.5 text-center align-bottom">
                  <div className="flex flex-col items-center gap-1">
                    <Printer className="w-3.5 h-3.5" />
                    <Search className="w-3 h-3 stroke-[2.5]" />
                  </div>
                </th>
                <th className="py-2 px-2 text-center align-bottom">
                  <span>Bruto / Extra</span>
                </th>
                <th className="py-2 px-2 text-center align-bottom">
                  <div className="inline-flex items-center gap-1">
                    <span>invoice</span>
                    <Search className="w-3 h-3 stroke-[2.5]" />
                  </div>
                </th>
                <th className="py-2 px-2 text-center align-bottom">
                  <span>Valor Faturado</span>
                </th>
                <th className="py-2 px-2 text-center align-bottom">
                  <div className="flex flex-col items-center gap-0.5 leading-tight">
                    <span>Data</span>
                    <span>Vencimento</span>
                    <Search className="w-3 h-3 stroke-[2.5] mt-0.5" />
                  </div>
                </th>
                <th className="py-2 px-2 text-center align-bottom">
                  <div className="flex flex-col items-center gap-0.5 leading-tight">
                    <span>Pagamento</span>
                    <span>Recebido</span>
                    <Search className="w-3 h-3 stroke-[2.5] mt-0.5" />
                  </div>
                </th>
                <th className="py-2 px-2 text-center align-bottom">
                  <div className="flex flex-col items-center gap-0.5 leading-tight">
                    <span>Métodos de</span>
                    <span>Pagamento</span>
                    <Search className="w-3 h-3 stroke-[2.5] mt-0.5" />
                  </div>
                </th>
                <th className="py-2 px-2 text-center align-bottom">
                  <div className="flex flex-col items-center gap-0.5 leading-tight">
                    <span>Data de</span>
                    <span>Pagamento</span>
                    <Search className="w-3 h-3 stroke-[2.5] mt-0.5" />
                  </div>
                </th>
                <th className="py-2 px-2 text-left align-bottom">
                  <div className="flex flex-col items-start gap-0.5 leading-tight">
                    <span>Conta</span>
                    <span>Bancária</span>
                    <Search className="w-3 h-3 stroke-[2.5] mt-0.5" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  colSpan={18}
                  className="bg-[#f5f5f5] border-b border-slate-200 py-3.5 text-center text-[11px] text-slate-600"
                >
                  Nenhum resultado encontrado
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Área vazia abaixo da linha de empty state */}
        <div className="min-h-[380px] bg-white" />
      </div>

      {/* Modais sobrepostos */}
      <DirectEntryModal
        isOpen={activeModal === 'direct'}
        onClose={() => setActiveModal(null)}
      />

      <NewEntryModal
        isOpen={activeModal === 'new'}
        onClose={() => setActiveModal(null)}
        mode="entrada"
        onOpenDirectPayment={() => setActiveModal('direct')}
      />

      <TransferModal
        isOpen={activeModal === 'transfer'}
        onClose={() => setActiveModal(null)}
      />

      <ColumnsConfigModal
        isOpen={activeModal === 'columns'}
        onClose={() => setActiveModal(null)}
        titleLabel="Colunas de Entradas"
      />
    </div>
  );
}

