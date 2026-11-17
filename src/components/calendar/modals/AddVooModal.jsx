import React, { useState, useRef } from 'react';
import { X, Clock, Folder, ChevronDown } from 'lucide-react';

export default function AddVooModal({ isOpen, onClose, onSave }) {
  const [flightType, setFlightType] = useState('Ida e volta');
  const [talent, setTalent] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [returnTime, setReturnTime] = useState('');
  const [departureFrom, setDepartureFrom] = useState('');
  const [destination, setDestination] = useState('');
  const [createFora, setCreateFora] = useState(false);
  const [eTicketFileName, setETicketFileName] = useState('');

  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave({
        type: 'Vôo',
        color: 'bg-[#512da8]',
        title: destination ? `Vôo -> ${destination}` : 'Vôo',
        date: departureDate || '30/10/2026',
        flightType,
        talent,
        departureDate,
        departureTime,
        returnDate,
        returnTime,
        departureFrom,
        destination,
        createFora,
        eTicketFileName,
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
        className="bg-[#1c1c1e] w-full max-w-[460px] rounded-xs shadow-2xl border border-white/10 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho do Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="text-[17px] text-white font-bold tracking-tight">
            Vôo <span className="font-normal text-neutral-400">/ Novo</span>
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

        {/* Corpo do Modal (Imagem 45) */}
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-6 space-y-3 text-[11px] text-neutral-400">
            {/* Tipo de voo * */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-4 text-right text-neutral-400">
                Tipo de voo <span className="text-red-500">*</span>
              </label>
              <div className="col-span-8">
                <div className="relative w-32">
                  <select
                    value={flightType}
                    onChange={(e) => setFlightType(e.target.value)}
                    className="w-full h-8 px-2.5 pr-6 border border-white/10 rounded-xs bg-[#1c1c1e] text-white font-semibold text-xs appearance-none focus:outline-none focus:border-[#880E1B]"
                  >
                    <option value="Ida e volta">Ida e volta</option>
                    <option value="Somente ida">Somente ida</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Talento* */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-4 text-right text-neutral-400">
                Talento<span className="text-red-500">*</span>
              </label>
              <div className="col-span-8">
                <input
                  type="text"
                  value={talent}
                  onChange={(e) => setTalent(e.target.value)}
                  placeholder="Pesquisar Talento..."
                  className="w-full h-8 px-2.5 border border-white/10 rounded-xs text-white placeholder:text-neutral-400 text-xs focus:outline-none focus:border-[#880E1B]"
                />
              </div>
            </div>

            {/* Data de partida * */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-4 text-right text-neutral-400">
                Data de partida <span className="text-red-500">*</span>
              </label>
              <div className="col-span-8 flex items-center gap-2">
                <input
                  type="text"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  placeholder="__/__/____"
                  className="w-24 h-8 px-2 border border-white/10 rounded-xs text-center text-white placeholder:text-neutral-400 text-xs focus:outline-none focus:border-[#880E1B]"
                />
                <Clock className="w-4 h-4 text-[#E8AC51] shrink-0" />
                <input
                  type="text"
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value)}
                  placeholder="__:__"
                  className="w-12 h-8 px-1.5 border border-white/10 rounded-xs text-center text-white placeholder:text-neutral-400 text-xs focus:outline-none focus:border-[#880E1B]"
                />
              </div>
            </div>

            {/* Data de retorno * */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-4 text-right text-neutral-400">
                Data de retorno <span className="text-red-500">*</span>
              </label>
              <div className="col-span-8 flex items-center gap-2">
                <input
                  type="text"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  placeholder="__/__/____"
                  className="w-24 h-8 px-2 border border-white/10 rounded-xs text-center text-white placeholder:text-neutral-400 text-xs focus:outline-none focus:border-[#880E1B]"
                />
                <Clock className="w-4 h-4 text-[#E8AC51] shrink-0" />
                <input
                  type="text"
                  value={returnTime}
                  onChange={(e) => setReturnTime(e.target.value)}
                  placeholder="__:__"
                  className="w-12 h-8 px-1.5 border border-white/10 rounded-xs text-center text-white placeholder:text-neutral-400 text-xs focus:outline-none focus:border-[#880E1B]"
                />
              </div>
            </div>

            {/* Partida de * */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-4 text-right text-neutral-400">
                Partida de <span className="text-red-500">*</span>
              </label>
              <div className="col-span-8">
                <input
                  type="text"
                  value={departureFrom}
                  onChange={(e) => setDepartureFrom(e.target.value)}
                  className="w-full h-8 px-2.5 border border-white/10 rounded-xs text-white text-xs focus:outline-none focus:border-[#880E1B]"
                />
              </div>
            </div>

            {/* Destino * */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-4 text-right text-neutral-400">
                Destino <span className="text-red-500">*</span>
              </label>
              <div className="col-span-8">
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full h-8 px-2.5 border border-white/10 rounded-xs text-white text-xs focus:outline-none focus:border-[#880E1B]"
                />
              </div>
            </div>

            {/* Criar Fora */}
            <div className="grid grid-cols-12 items-center gap-3 pt-1">
              <label className="col-span-4 text-right text-neutral-400">
                Criar Fora
              </label>
              <div className="col-span-8">
                <label className="inline-flex items-center gap-2 cursor-pointer text-[11px] text-neutral-400">
                  <input
                    type="checkbox"
                    checked={createFora}
                    onChange={(e) => setCreateFora(e.target.checked)}
                    className="w-3.5 h-3.5 rounded-xs border-white/10 text-[#E8AC51] focus:ring-[#880E1B]"
                  />
                  <span>
                    Marque para cirar um evento Fora no mesmo período do vôo
                  </span>
                </label>
              </div>
            </div>

            {/* Secção Documentos */}
            <div className="pt-3">
              <h3 className="text-[13px] font-bold text-white border-b border-white/10 pb-1.5 mb-4">
                Documentos
              </h3>

              <div className="grid grid-cols-12 items-center gap-3">
                <label className="col-span-4 text-right text-neutral-400">
                  E-Ticket
                </label>
                <div className="col-span-8 flex items-center gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setETicketFileName(file.name);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 text-[11px] text-[#E8AC51] hover:underline uppercase cursor-pointer"
                  >
                    <Folder className="w-3.5 h-3.5 fill-[#E8AC51] text-[#E8AC51]" />
                    <span>ADICIONAR</span>
                  </button>
                  {eTicketFileName && (
                    <span className="text-[10px] text-neutral-400 truncate max-w-[140px]">
                      {eTicketFileName}
                    </span>
                  )}
                </div>
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

