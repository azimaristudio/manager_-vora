import React, { useState } from 'react';
import { X } from 'lucide-react';
import RichTextField from './RichTextField';

export default function AddFeriasModal({ isOpen, onClose, onSave }) {
  const [startDate, setStartDate] = useState('30/10/2026');
  const [endDate, setEndDate] = useState('30/10/2026');
  const [notes, setNotes] = useState('');
  const [talent, setTalent] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave({
        type: 'Férias',
        color: 'bg-[#7699d4]',
        title: talent ? `Férias - ${talent}` : 'Férias',
        date: startDate,
        startDate,
        endDate,
        notes,
        talent,
      });
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center overflow-y-auto py-8 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-[600px] rounded-xs shadow-2xl border border-slate-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho do Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-[17px] text-slate-800 font-bold tracking-tight">
            Férias <span className="font-normal text-slate-500">/ Novo</span>
          </h2>
          <button
            type="button"
            onClick={onClose}
            title="Fechar"
            className="text-slate-400 hover:text-slate-600 p-1 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Corpo do Modal (Imagem 40) */}
        <form onSubmit={handleSubmit}>
          <div className="px-6 sm:px-10 py-6 space-y-4 text-[12px] text-slate-600">
            {/* Linha De * e Até * */}
            <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-3">
              <label className="sm:col-span-3 sm:text-right text-slate-600 font-normal">
                De <span className="text-red-500">*</span>
              </label>
              <div className="sm:col-span-9 flex flex-wrap items-center gap-3">
                <input
                  type="text"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-28 h-8 px-2.5 border border-slate-200 rounded-xs text-center font-semibold text-slate-700 focus:outline-none focus:border-[#0077b5]"
                />
                <span className="ml-2 text-slate-600">
                  Até <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-28 h-8 px-2.5 border border-slate-200 rounded-xs text-center font-semibold text-slate-700 focus:outline-none focus:border-[#0077b5]"
                />
              </div>
            </div>

            {/* Notas (Rich Text) */}
            <div className="grid grid-cols-1 sm:grid-cols-12 items-start gap-3">
              <label className="sm:col-span-3 sm:text-right text-slate-600 font-normal pt-1.5">
                Notas
              </label>
              <div className="sm:col-span-9">
                <RichTextField value={notes} onChange={setNotes} rows={6} />
              </div>
            </div>

            {/* Talento * */}
            <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-3 pt-2">
              <label className="sm:col-span-3 sm:text-right text-slate-600 font-normal">
                Talento <span className="text-red-500">*</span>
              </label>
              <div className="sm:col-span-9">
                <input
                  type="text"
                  value={talent}
                  onChange={(e) => setTalent(e.target.value)}
                  placeholder="Pesquisar Talento..."
                  className="w-full h-8 px-2.5 border border-slate-200 rounded-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#0077b5]"
                />
              </div>
            </div>
          </div>

          {/* Rodapé */}
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-4 bg-white">
            <button
              type="button"
              onClick={onClose}
              className="text-[11px] text-[#0077b5] hover:underline uppercase font-medium px-2 py-1.5 cursor-pointer"
            >
              CANCELAR
            </button>
            <button
              type="submit"
              className="bg-[#0077b5] hover:bg-[#006399] text-white text-[11px] font-semibold uppercase px-4 py-2 rounded-xs transition-colors cursor-pointer"
            >
              SALVAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

