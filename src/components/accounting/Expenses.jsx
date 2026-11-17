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
  { label: 'Pago', color: 'bg-[#E8AC51]', hasExclamation: false },
  { label: 'Cancelado', color: 'bg-[#8e8e8e]', hasExclamation: false },
];

export default function Expenses() {
  const [activeModal, setActiveModal] = useState(null); // 'direct' | 'new' | 'transfer' | 'columns' | null

  return (
    <div className="pt-2">
      {/* Barra de Ferramentas de Saídas (Imagem 59) */}
      <div className="bg-[#161617] border border-white/10 rounded-xs px-3 py-2 flex flex-wrap items-center justify-between gap-3 mb-2">
        {/* Esquerda: Legenda de Status com Círculos Coloridos */}
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-neutral-400">
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
          <button
            type="button"
            title="Atualizar"
            className="p-1.5 text-[#E8AC51] hover:text-[#d99b3f] cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={() => setActiveModal('columns')}
            title="Configurar Colunas"
            className="p-1.5 text-white hover:text-white cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5 fill-[#E8AC51]" />
          </button>

          <button
            type="button"
            className="h-8 px-2.5 bg-[#E8AC51] hover:bg-[#d99b3f] text-white text-[10px] font-semibold uppercase rounded-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3 h-3 stroke-[2.5]" />
            <span>EXPORTAÇÃO EXCEL</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveModal('transfer')}
            className="h-8 px-2.5 bg-[#f38315] hover:bg-[#d9710c] text-white text-[10px] font-semibold uppercase rounded-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeftRight className="w-3 h-3 stroke-[2.5]" />
            <span>TRANSFERÊNCIA</span>
          </button>

          {/* NOVA SAÍDA (na aba de Saídas) */}
          <button
            type="button"
            onClick={() => setActiveModal('new')}
            className="h-8 px-3 bg-[#880E1B] hover:bg-[#a31121] text-white text-[10px] font-semibold uppercase rounded-xs transition-colors cursor-pointer"
          >
            NOVA SAÍDA
          </button>

          <button
            type="button"
            onClick={() => setActiveModal('direct')}
            className="h-8 px-3 bg-[#880E1B] hover:bg-[#a31121] text-white text-[10px] font-semibold uppercase rounded-xs transition-colors cursor-pointer"
          >
            LANÇAMENTO DIRETO
          </button>
        </div>
      </div>

      {/* Tabela de Saídas */}
      <div className="border border-white/10 rounded-xs overflow-hidden bg-[#1c1c1e]">
        <div className="overflow-x-auto whitespace-nowrap">
          <table className="w-full min-w-[1050px] border-collapse">
            <thead>
              <tr className="bg-[#880E1B] text-white text-[10px] font-normal">
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
                  className="bg-[#161617] border-b border-white/10 py-3.5 text-center text-[11px] text-neutral-400"
                >
                  Nenhum resultado encontrado
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="min-h-[380px] bg-[#1c1c1e]" />
      </div>

      {/* Modais sobrepostos */}
      <DirectEntryModal
        isOpen={activeModal === 'direct'}
        onClose={() => setActiveModal(null)}
      />

      <NewEntryModal
        isOpen={activeModal === 'new'}
        onClose={() => setActiveModal(null)}
        mode="saida"
        onOpenDirectPayment={() => setActiveModal('direct')}
      />

      <TransferModal
        isOpen={activeModal === 'transfer'}
        onClose={() => setActiveModal(null)}
      />

      <ColumnsConfigModal
        isOpen={activeModal === 'columns'}
        onClose={() => setActiveModal(null)}
        titleLabel="Colunas de Saídas"
      />
    </div>
  );
}

