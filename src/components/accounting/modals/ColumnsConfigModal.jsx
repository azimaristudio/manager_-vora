import React, { useState } from 'react';
import { X } from 'lucide-react';

const INITIAL_COLUMNS = {
  // Coluna 1
  tipo: true,
  categoria: true,
  subCategoria: true,
  descricao: true,
  talento: true,
  print: true,
  // Coluna 2
  brutoExtra: true,
  fatura: true,
  clienteFaturado: false,
  valorFaturado: true,
  emissaoFatura: false,
  dataVencimento: true,
  // Coluna 3
  pagamentoRecebido: true,
  dataPagamento: true,
  contasBancarias: true,
  metodosPagamento: true,
  liquidoTalento: false,
};

export default function ColumnsConfigModal({ isOpen, onClose, titleLabel }) {
  const [cols, setCols] = useState(INITIAL_COLUMNS);

  if (!isOpen) return null;

  const toggleCol = (key) => {
    setCols((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center overflow-y-auto py-8 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-[650px] rounded-xs shadow-2xl border border-slate-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho (Imagem 58) */}
        <div className="relative flex items-center justify-center px-6 py-4 border-b border-slate-100">
          <h2 className="text-[14px] text-slate-800 font-bold">
            {titleLabel || 'Colunas de Entradas'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            title="Fechar"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Corpo: Grelha de 3 Colunas com Checkboxes */}
        <form onSubmit={handleSubmit}>
          <div className="px-8 py-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-700">
            {/* Coluna 1 */}
            <div className="space-y-2.5">
              {[
                { key: 'tipo', label: 'Tipo' },
                { key: 'categoria', label: 'Categoria' },
                { key: 'subCategoria', label: 'SubCategoria' },
                { key: 'descricao', label: 'Descrição' },
                { key: 'talento', label: 'Talento' },
                { key: 'print', label: 'Print' },
              ].map((item) => (
                <label
                  key={item.key}
                  className="flex items-center gap-2 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={cols[item.key]}
                    onChange={() => toggleCol(item.key)}
                    className="w-3.5 h-3.5 rounded-xs border-slate-300 text-[#0077b5]"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>

            {/* Coluna 2 */}
            <div className="space-y-2.5">
              {[
                { key: 'brutoExtra', label: 'Bruto + Extra' },
                { key: 'fatura', label: 'Fatura' },
                { key: 'clienteFaturado', label: 'Cliente Faturado' },
                { key: 'valorFaturado', label: 'Valor Faturado' },
                { key: 'emissaoFatura', label: 'Emissão Fatura' },
                { key: 'dataVencimento', label: 'Data Vencimento' },
              ].map((item) => (
                <label
                  key={item.key}
                  className="flex items-center gap-2 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={cols[item.key]}
                    onChange={() => toggleCol(item.key)}
                    className="w-3.5 h-3.5 rounded-xs border-slate-300 text-[#0077b5]"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>

            {/* Coluna 3 */}
            <div className="space-y-2.5">
              {[
                { key: 'pagamentoRecebido', label: 'Pagamento Recebido' },
                { key: 'dataPagamento', label: 'Data de Pagamento' },
                { key: 'contasBancarias', label: 'Contas Bancárias' },
                { key: 'metodosPagamento', label: 'Métodos de Pagamento' },
                { key: 'liquidoTalento', label: 'Líquido do Talento' },
              ].map((item) => (
                <label
                  key={item.key}
                  className="flex items-center gap-2 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={cols[item.key]}
                    onChange={() => toggleCol(item.key)}
                    className="w-3.5 h-3.5 rounded-xs border-slate-300 text-[#0077b5]"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Rodapé: FECHAR e SALVAR */}
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-2 bg-white">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 bg-[#f2f2f2] hover:bg-slate-200 border border-slate-200 rounded-xs text-[10px] text-slate-500 uppercase font-medium cursor-pointer"
            >
              FECHAR
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#0077b5] hover:bg-[#006399] text-white text-[10px] font-semibold uppercase rounded-xs transition-colors cursor-pointer"
            >
              SALVAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

