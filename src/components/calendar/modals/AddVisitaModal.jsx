import React, { useState } from 'react';
import { X, Calendar, Clock, PlusCircle, Plus } from 'lucide-react';
import RichTextField from './RichTextField';

export default function AddVisitaModal({ isOpen, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [address, setAddress] = useState('');
  const [dates, setDates] = useState([
    { date: '30/10/2026', startTime: '08:00', endTime: '' },
  ]);
  const [notes, setNotes] = useState('');
  const [talent, setTalent] = useState('');

  if (!isOpen) return null;

  const handleDateChange = (idx, field, val) => {
    setDates((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: val };
      return next;
    });
  };

  const handleAddDateRow = () => {
    setDates((prev) => [
      ...prev,
      { date: '31/10/2026', startTime: '08:00', endTime: '' },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave({
        type: 'Visita',
        color: 'bg-[#107c10]',
        title: title || client ? `Visita - ${title || client}` : 'Visita',
        date: dates[0]?.date || '30/10/2026',
        visitTitle: title,
        client,
        address,
        dates,
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
        className="bg-white w-full max-w-[540px] rounded-xs shadow-2xl border border-slate-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-[17px] text-slate-800 font-bold tracking-tight">
            Visita <span className="font-normal text-slate-500">/ Novo</span>
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

        {/* Corpo do Modal (Imagem 44) */}
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-6 space-y-3.5 text-[11px] text-slate-600">
            {/* Título */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-2 text-right text-slate-600">
                Título
              </label>
              <div className="col-span-10">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full h-8 px-2.5 border border-slate-200 rounded-xs text-slate-700 text-xs focus:outline-none focus:border-[#0077b5]"
                />
              </div>
            </div>

            {/* Cliente* */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-2 text-right text-slate-600">
                Cliente<span className="text-red-500">*</span>
              </label>
              <div className="col-span-10">
                <input
                  type="text"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  className="w-full h-8 px-2.5 border border-slate-200 rounded-xs text-slate-700 text-xs focus:outline-none focus:border-[#0077b5]"
                />
              </div>
            </div>

            {/* Endereço * */}
            <div className="grid grid-cols-12 items-start gap-3">
              <label className="col-span-2 text-right text-slate-600 pt-1">
                Endereço <span className="text-red-500">*</span>
              </label>
              <div className="col-span-10">
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-xs text-slate-700 text-xs focus:outline-none focus:border-[#0077b5]"
                />
              </div>
            </div>

            {/* Data * */}
            <div className="grid grid-cols-12 items-start gap-3">
              <label className="col-span-2 text-right text-slate-600 pt-1.5">
                Data <span className="text-red-500">*</span>
              </label>
              <div className="col-span-10 space-y-2">
                {dates.map((row, idx) => (
                  <div
                    key={idx}
                    className="flex flex-wrap items-center gap-1.5"
                  >
                    <Calendar className="w-4 h-4 text-[#0077b5] shrink-0" />
                    <input
                      type="text"
                      value={row.date}
                      onChange={(e) =>
                        handleDateChange(idx, 'date', e.target.value)
                      }
                      className="w-24 h-8 px-2 border border-slate-200 rounded-xs text-center font-semibold text-xs text-slate-700 focus:outline-none focus:border-[#0077b5]"
                    />
                    <Clock className="w-4 h-4 text-[#0077b5] ml-4 shrink-0" />
                    <input
                      type="text"
                      value={row.startTime}
                      onChange={(e) =>
                        handleDateChange(idx, 'startTime', e.target.value)
                      }
                      placeholder="__:__"
                      className="w-12 h-8 px-1 border border-slate-200 rounded-xs text-center font-semibold text-xs text-slate-700 focus:outline-none focus:border-[#0077b5]"
                    />
                    <span className="text-slate-400">-</span>
                    <input
                      type="text"
                      value={row.endTime}
                      onChange={(e) =>
                        handleDateChange(idx, 'endTime', e.target.value)
                      }
                      placeholder="__:__"
                      className="w-12 h-8 px-1 border border-slate-200 rounded-xs text-center text-xs text-slate-700 placeholder:text-slate-500 focus:outline-none focus:border-[#0077b5]"
                    />
                    <button
                      type="button"
                      onClick={handleAddDateRow}
                      className="text-[#0077b5] hover:text-[#005f92] cursor-pointer"
                    >
                      <PlusCircle className="w-4 h-4 fill-[#0077b5] text-white" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddDateRow}
                  className="inline-flex items-center gap-1 bg-[#0077b5] hover:bg-[#006399] text-white text-[10px] font-semibold px-2.5 py-1.5 rounded-xs cursor-pointer"
                >
                  <Plus className="w-3 h-3 stroke-[3]" />
                  <span>DATA</span>
                </button>
              </div>
            </div>

            {/* Notas */}
            <div className="grid grid-cols-12 items-start gap-3">
              <label className="col-span-2 text-right text-slate-600 pt-1.5">
                Notas
              </label>
              <div className="col-span-10">
                <RichTextField
                  value={notes}
                  onChange={setNotes}
                  rows={6}
                  compactToolbar={true}
                />
              </div>
            </div>

            {/* Talento */}
            <div className="grid grid-cols-12 items-center gap-3 pt-2">
              <label className="col-span-2 text-right text-slate-600">
                Talento
              </label>
              <div className="col-span-10">
                <input
                  type="text"
                  value={talent}
                  onChange={(e) => setTalent(e.target.value)}
                  placeholder="Pesquisar Talento..."
                  className="w-full h-8 px-2.5 border border-slate-200 rounded-xs text-slate-700 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#0077b5]"
                />
              </div>
            </div>
          </div>

          {/* Rodapé com botão SAVE (conforme Imagem 44) */}
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
              SAVE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

