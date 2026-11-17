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
        className="bg-[#1c1c1e] w-full max-w-[540px] rounded-xs shadow-2xl border border-white/10 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="text-[17px] text-white font-bold tracking-tight">
            Visita <span className="font-normal text-neutral-400">/ Novo</span>
          </h2>
          <button
            type="button"
            onClick={onClose}
            title="Fechar"
            className="text-neutral-400 hover:text-white p-1 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Corpo do Modal (Imagem 44) */}
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-6 space-y-3.5 text-[11px] text-neutral-400">
            {/* Título */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-2 text-right text-neutral-400">
                Título
              </label>
              <div className="col-span-10">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full h-8 px-2.5 border border-white/10 rounded-xs text-white text-xs focus:outline-none focus:border-[#880E1B]"
                />
              </div>
            </div>

            {/* Cliente* */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-2 text-right text-neutral-400">
                Cliente<span className="text-red-500">*</span>
              </label>
              <div className="col-span-10">
                <input
                  type="text"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  className="w-full h-8 px-2.5 border border-white/10 rounded-xs text-white text-xs focus:outline-none focus:border-[#880E1B]"
                />
              </div>
            </div>

            {/* Endereço * */}
            <div className="grid grid-cols-12 items-start gap-3">
              <label className="col-span-2 text-right text-neutral-400 pt-1">
                Endereço <span className="text-red-500">*</span>
              </label>
              <div className="col-span-10">
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2 border border-white/10 rounded-xs text-white text-xs focus:outline-none focus:border-[#880E1B]"
                />
              </div>
            </div>

            {/* Data * */}
            <div className="grid grid-cols-12 items-start gap-3">
              <label className="col-span-2 text-right text-neutral-400 pt-1.5">
                Data <span className="text-red-500">*</span>
              </label>
              <div className="col-span-10 space-y-2">
                {dates.map((row, idx) => (
                  <div
                    key={idx}
                    className="flex flex-wrap items-center gap-1.5"
                  >
                    <Calendar className="w-4 h-4 text-[#E8AC51] shrink-0" />
                    <input
                      type="text"
                      value={row.date}
                      onChange={(e) =>
                        handleDateChange(idx, 'date', e.target.value)
                      }
                      className="w-24 h-8 px-2 border border-white/10 rounded-xs text-center font-semibold text-xs text-white focus:outline-none focus:border-[#880E1B]"
                    />
                    <Clock className="w-4 h-4 text-[#E8AC51] ml-4 shrink-0" />
                    <input
                      type="text"
                      value={row.startTime}
                      onChange={(e) =>
                        handleDateChange(idx, 'startTime', e.target.value)
                      }
                      placeholder="__:__"
                      className="w-12 h-8 px-1 border border-white/10 rounded-xs text-center font-semibold text-xs text-white focus:outline-none focus:border-[#880E1B]"
                    />
                    <span className="text-neutral-400">-</span>
                    <input
                      type="text"
                      value={row.endTime}
                      onChange={(e) =>
                        handleDateChange(idx, 'endTime', e.target.value)
                      }
                      placeholder="__:__"
                      className="w-12 h-8 px-1 border border-white/10 rounded-xs text-center text-xs text-white placeholder:text-neutral-400 focus:outline-none focus:border-[#880E1B]"
                    />
                    <button
                      type="button"
                      onClick={handleAddDateRow}
                      className="text-[#E8AC51] hover:text-[#E8AC51] cursor-pointer"
                    >
                      <PlusCircle className="w-4 h-4 fill-[#E8AC51] text-white" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddDateRow}
                  className="inline-flex items-center gap-1 bg-[#880E1B] hover:bg-[#a31121] text-white text-[10px] font-semibold px-2.5 py-1.5 rounded-xs cursor-pointer"
                >
                  <Plus className="w-3 h-3 stroke-[3]" />
                  <span>DATA</span>
                </button>
              </div>
            </div>

            {/* Notas */}
            <div className="grid grid-cols-12 items-start gap-3">
              <label className="col-span-2 text-right text-neutral-400 pt-1.5">
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
              <label className="col-span-2 text-right text-neutral-400">
                Talento
              </label>
              <div className="col-span-10">
                <input
                  type="text"
                  value={talent}
                  onChange={(e) => setTalent(e.target.value)}
                  placeholder="Pesquisar Talento..."
                  className="w-full h-8 px-2.5 border border-white/10 rounded-xs text-white placeholder:text-neutral-400 text-xs focus:outline-none focus:border-[#880E1B]"
                />
              </div>
            </div>
          </div>

          {/* Rodapé com botão SAVE (conforme Imagem 44) */}
          <div className="px-6 py-4 border-t border-white/10 flex items-center justify-end gap-4 bg-[#1c1c1e]">
            <button
              type="button"
              onClick={onClose}
              className="text-[11px] text-[#E8AC51] hover:underline uppercase font-medium px-2 py-1.5 cursor-pointer"
            >
              CANCELAR
            </button>
            <button
              type="submit"
              className="bg-[#880E1B] hover:bg-[#a31121] text-white text-[11px] font-semibold uppercase px-4 py-2 rounded-xs transition-colors cursor-pointer"
            >
              SAVE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

