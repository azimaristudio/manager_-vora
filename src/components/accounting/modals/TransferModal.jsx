import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

export default function TransferModal({ isOpen, onClose }) {
  const [sourceAccount, setSourceAccount] = useState('');
  const [amount, setAmount] = useState('0.00');
  const [targetAccount, setTargetAccount] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [date, setDate] = useState('30/10/2026');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

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
        className="bg-white w-full max-w-[500px] rounded-xs shadow-2xl border border-slate-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho (Imagem 57) */}
        <div className="relative flex items-center justify-center px-6 py-4 border-b border-slate-100">
          <h2 className="text-[15px] text-slate-700 font-normal">
            Transferência entre contas
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

        {/* Corpo do Modal */}
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-6 space-y-3 text-[11px] text-slate-600">
            {/* Conta Origem + Input de Valor abaixo */}
            <div className="grid grid-cols-12 items-start gap-3">
              <label className="col-span-4 text-right text-slate-700 pt-1.5">
                Conta Origem
              </label>
              <div className="col-span-8 space-y-2">
                <div className="relative w-56">
                  <select
                    value={sourceAccount}
                    onChange={(e) => setSourceAccount(e.target.value)}
                    className="w-full h-8 px-2.5 pr-7 bg-white border border-slate-200 rounded-xs text-[11px] text-slate-400 appearance-none focus:outline-none focus:border-[#0077b5]"
                  >
                    <option value="">Selecionar an Conta</option>
                    <option value="DEFAULT ACCOUNT -">DEFAULT ACCOUNT -</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-36 h-8 px-2.5 bg-white border border-slate-200 rounded-xs text-right text-[11px] text-slate-400 focus:outline-none focus:border-[#0077b5]"
                />
              </div>
            </div>

            {/* Conta Destino */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-4 text-right text-slate-700">
                Conta Destino
              </label>
              <div className="col-span-8">
                <div className="relative w-56">
                  <select
                    value={targetAccount}
                    onChange={(e) => setTargetAccount(e.target.value)}
                    className="w-full h-8 px-2.5 pr-7 bg-white border border-slate-200 rounded-xs text-[11px] text-slate-400 appearance-none focus:outline-none focus:border-[#0077b5]"
                  >
                    <option value="">Selecionar an Conta</option>
                    <option value="DEFAULT ACCOUNT -">DEFAULT ACCOUNT -</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Categoria */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-4 text-right text-slate-700">
                Categoria
              </label>
              <div className="col-span-8">
                <div className="relative w-56">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-8 px-2.5 pr-7 bg-white border border-slate-200 rounded-xs text-[11px] text-slate-400 appearance-none focus:outline-none focus:border-[#0077b5]"
                  >
                    <option value="">Selecionar a Categoria</option>
                    <option value="Transferência">Transferência</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Sub categoria */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-4 text-right text-slate-700">
                Sub categoria
              </label>
              <div className="col-span-8">
                <div className="relative w-56">
                  <select
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    className="w-full h-8 px-2.5 pr-7 bg-white border border-slate-200 rounded-xs text-[11px] text-slate-400 appearance-none focus:outline-none focus:border-[#0077b5]"
                  >
                    <option value="">Selecionar a Sub categoria</option>
                    <option value="Padrão">Padrão</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Data */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-4 text-right text-slate-700">
                Data
              </label>
              <div className="col-span-8">
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-36 h-8 px-2.5 bg-white border border-slate-200 rounded-xs text-[11px] text-slate-400 focus:outline-none focus:border-[#0077b5]"
                />
              </div>
            </div>

            {/* Descrição */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-4 text-right text-slate-700">
                Descrição
              </label>
              <div className="col-span-8">
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-56 h-8 px-2.5 bg-white border border-slate-200 rounded-xs text-[11px] text-slate-700 focus:outline-none focus:border-[#0077b5]"
                />
              </div>
            </div>

            {/* Notas */}
            <div className="grid grid-cols-12 items-start gap-3">
              <label className="col-span-4 text-right text-slate-700 pt-1.5">
                Notas
              </label>
              <div className="col-span-8">
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-56 p-2 bg-white border border-slate-200 rounded-xs text-[11px] text-slate-700 focus:outline-none focus:border-[#0077b5]"
                />
              </div>
            </div>
          </div>

          {/* Rodapé: FECHAR e SALVAR MUDANÇAS */}
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
              SALVAR MUDANÇAS
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

