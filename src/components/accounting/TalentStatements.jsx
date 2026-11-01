import React, { useState } from 'react';
import {
  RefreshCw,
  Plus,
  Download,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';

export default function TalentStatements() {
  const [talentStatus, setTalentStatus] = useState('Ativo');
  const [currency, setCurrency] = useState('BRL');

  return (
    <div className="pt-2">
      {/* Barra Superior de Extratos Talentos (Imagem 62) */}
      <div className="bg-[#f4f4f4] border border-slate-200 rounded-xs px-3 py-2.5 flex flex-wrap items-center justify-between gap-3 mb-2">
        {/* Botões à Esquerda */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            className="h-8 px-3 bg-[#0077b5] hover:bg-[#006399] text-white text-[10px] font-semibold uppercase rounded-xs transition-colors cursor-pointer"
          >
            NOVO EXTRATO
          </button>

          <button
            type="button"
            className="h-8 px-3 bg-[#0077b5] hover:bg-[#006399] text-white text-[10px] font-semibold uppercase rounded-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3 h-3 stroke-[2.5]" />
            <span>ATUALIZAR SALDOS</span>
          </button>

          <button
            type="button"
            className="h-8 px-3 bg-[#5fa2dd] hover:bg-[#4b8fc9] text-white text-[10px] font-semibold uppercase rounded-xs inline-flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Plus className="w-3 h-3 stroke-[3]" />
            <span>ADICIONAR ENTRADAS/SAÍDAS</span>
          </button>

          <button
            type="button"
            className="h-8 px-3 bg-[#5fa2dd] hover:bg-[#4b8fc9] text-white text-[10px] font-semibold uppercase rounded-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3 h-3 stroke-[2.5]" />
            <span>EXPORTAÇÃO EXCEL</span>
          </button>
        </div>

        {/* Filtros à Direita: Status do talento, Currency e Paginação */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
          <button
            type="button"
            title="Atualizar"
            className="text-[#28a745] hover:text-emerald-700 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>

          <span>Status do talento</span>
          <div className="relative w-24">
            <select
              value={talentStatus}
              onChange={(e) => setTalentStatus(e.target.value)}
              className="w-full h-8 px-2.5 pr-6 bg-white border border-slate-200 rounded-xs text-[11px] font-bold text-slate-700 appearance-none focus:outline-none focus:border-[#0077b5]"
            >
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
              <option value="Todos">Todos</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <span className="ml-1">Currency</span>
          <div className="relative w-20">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full h-8 px-2.5 pr-6 bg-white border border-slate-200 rounded-xs text-[11px] font-bold text-slate-700 appearance-none focus:outline-none focus:border-[#0077b5]"
            >
              <option value="BRL">BRL</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <span className="px-2 text-xs text-slate-700">
            <strong>1</strong> - <strong>10</strong> de <strong>1</strong>
          </span>

          <div className="flex items-center gap-1">
            <button
              type="button"
              className="w-6 h-7 bg-[#e9e9e9] hover:bg-slate-300 text-slate-600 rounded-xs flex items-center justify-center cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              className="w-6 h-7 bg-[#e9e9e9] hover:bg-slate-300 text-slate-600 rounded-xs flex items-center justify-center cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Tabela Azul com Dados do Talento Simulado: sophia évora */}
      <div className="border border-slate-200 rounded-xs overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] border-collapse">
            <thead>
              <tr className="bg-[#0077b5] text-white text-[10px] font-normal">
                <th className="py-2.5 px-3 text-left w-56">
                  <div className="inline-flex items-center gap-1">
                    <span>Talento</span>
                    <Search className="w-3 h-3 stroke-[2.5]" />
                  </div>
                </th>
                <th className="py-2.5 px-2 text-left">Contas Bancárias</th>
                <th className="py-2.5 px-2 text-left">Período</th>
                <th className="py-2.5 px-2 text-left">Saldo Inicial</th>
                <th className="py-2.5 px-2 text-left">Líquido</th>
                <th className="py-2.5 px-2 text-left">Outras Entradas</th>
                <th className="py-2.5 px-2 text-left">Imposto</th>
                <th className="py-2.5 px-2 text-left">Saídas</th>
                <th className="py-2.5 px-2 text-left">Direct Talent</th>
                <th className="py-2.5 px-2 text-left">Recebido</th>
                <th className="py-2.5 px-3 text-right">
                  <div className="inline-flex items-center justify-end gap-1">
                    <span>Pendente</span>
                    <Search className="w-3 h-3 stroke-[2.5]" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-200 text-[11px] text-slate-700 hover:bg-slate-50/70">
                {/* Coluna Talento: avatar ÉVORA + sophia évora */}
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full border border-slate-200 bg-white flex flex-col items-center justify-center shrink-0">
                      <span className="text-[5px] font-serif tracking-widest text-slate-700">
                        ÉVORA
                      </span>
                    </div>
                    <span className="font-bold text-slate-800">
                      sophia évora
                    </span>
                  </div>
                </td>
                <td className="py-3 px-2" />
                <td className="py-3 px-2 text-[10px] text-slate-400 leading-tight">
                  30/Oct/26 - 30/
                  <br />
                  Oct/31
                </td>
                <td className="py-3 px-2 text-[10px] text-slate-500">
                  0.00 <span className="text-slate-300">BRL</span>
                </td>
                <td className="py-3 px-2" />
                <td className="py-3 px-2" />
                <td className="py-3 px-2" />
                <td className="py-3 px-2" />
                <td className="py-3 px-2" />
                <td className="py-3 px-2" />
                <td className="py-3 px-3 text-right font-bold text-slate-800 text-[11px]">
                  0.00 <span className="font-normal text-slate-500">BRL</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Notas em rodapé com asteriscos explicando os valores */}
        <div className="px-3 pt-3 pb-36 text-right text-[10px] text-slate-400 space-y-1 bg-white">
          <p>* Valor disponível a receber</p>
          <p>**Valor pago diretamente ao talento pelo cliente</p>
        </div>
      </div>
    </div>
  );
}

