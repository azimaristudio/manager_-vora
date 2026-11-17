import React, { useState } from 'react';
import { X, Clock } from 'lucide-react';
import RichTextField from './RichTextField';

export default function AddForaModal({ isOpen, onClose, onSave }) {
  const [startDate, setStartDate] = useState('30/10/2026');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('30/10/2026');
  const [endTime, setEndTime] = useState('');
  const [notes, setNotes] = useState('');
  const [talent, setTalent] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave({
        type: 'Fora',
        color: 'bg-[#f38252]',
        title: talent ? `Fora - ${talent}` : 'Fora',
        date: startDate,
        startDate,
        startTime,
        endDate,
        endTime,
        notes,
        talent,
        country,
        city,
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
        className="bg-[#1c1c1e] w-full max-w-[560px] rounded-xs shadow-2xl border border-white/10 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho do Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="text-[17px] text-white font-bold tracking-tight">
            Fora <span className="font-normal text-neutral-400">/ Novo</span>
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

        {/* Corpo do Modal (Imagem 39) */}
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-6 space-y-3.5 text-[12px] text-neutral-400">
            {/* Linha De* e Até* */}
            <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2">
              <label className="sm:col-span-2 text-neutral-400 font-normal">
                De<span className="text-red-500">*</span>
              </label>
              <div className="sm:col-span-10 flex flex-wrap items-center gap-2">
                <input
                  type="text"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-24 h-8 px-2 border border-white/10 rounded-xs text-center font-semibold text-white focus:outline-none focus:border-[#880E1B]"
                />
                <Clock className="w-4 h-4 text-[#E8AC51] shrink-0" />
                <input
                  type="text"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  placeholder="__:__"
                  className="w-12 h-8 px-1.5 border border-white/10 rounded-xs text-center text-white placeholder:text-neutral-400 focus:outline-none focus:border-[#880E1B]"
                />

                <span className="ml-3 mr-1 text-neutral-400">
                  Até<span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-24 h-8 px-2 border border-white/10 rounded-xs text-center font-semibold text-white focus:outline-none focus:border-[#880E1B]"
                />
                <Clock className="w-4 h-4 text-[#E8AC51] shrink-0" />
                <input
                  type="text"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  placeholder="__:__"
                  className="w-12 h-8 px-1.5 border border-white/10 rounded-xs text-center text-white placeholder:text-neutral-400 focus:outline-none focus:border-[#880E1B]"
                />
              </div>
            </div>

            {/* Notas (Rich Text) */}
            <div className="grid grid-cols-1 sm:grid-cols-12 items-start gap-2">
              <label className="sm:col-span-2 text-neutral-400 font-normal pt-1.5">
                Notas
              </label>
              <div className="sm:col-span-10">
                <RichTextField value={notes} onChange={setNotes} rows={6} />
              </div>
            </div>

            {/* Talento* */}
            <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2">
              <label className="sm:col-span-2 text-neutral-400 font-normal">
                Talento<span className="text-red-500">*</span>
              </label>
              <div className="sm:col-span-10">
                <input
                  type="text"
                  value={talent}
                  onChange={(e) => setTalent(e.target.value)}
                  placeholder="Pesquisar Talento..."
                  className="w-full h-8 px-2.5 border border-white/10 rounded-xs text-white placeholder:text-neutral-400 focus:outline-none focus:border-[#880E1B]"
                />
              </div>
            </div>

            {/* País */}
            <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2">
              <label className="sm:col-span-2 text-neutral-400 font-normal">
                País
              </label>
              <div className="sm:col-span-10">
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Pesquisa..."
                  className="w-56 h-8 px-2.5 border border-white/10 rounded-xs text-white placeholder:text-neutral-400 focus:outline-none focus:border-[#880E1B]"
                />
              </div>
            </div>

            {/* Cidade */}
            <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2">
              <label className="sm:col-span-2 text-neutral-400 font-normal">
                Cidade
              </label>
              <div className="sm:col-span-10">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Pesquisa..."
                  className="w-56 h-8 px-2.5 border border-white/10 rounded-xs bg-[#1c1c1e] text-white placeholder:text-neutral-400 focus:outline-none focus:border-[#880E1B]"
                />
              </div>
            </div>
          </div>

          {/* Rodapé */}
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
              SALVAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

