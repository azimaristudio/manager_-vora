import React, { useState } from 'react';

const VIEW_OPTIONS = [
  { key: 'mes', label: 'Mês' },
  { key: 'semana', label: 'Semana' },
  { key: 'dia', label: 'Dia' },
];

export default function CalendarViewConfig() {
  const [defaultView, setDefaultView] = useState('mes'); // 'mes' | 'semana' | 'dia'
  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  return (
    <div className="pt-8">
      <form onSubmit={handleSave}>
        {/* Cabeçalho: Vista carregada padrão do calendário + linha horizontal separadora */}
        <div className="pb-3 border-b border-white/10">
          <h2 className="text-xs font-normal text-neutral-400">
            Vista carregada padrão do calendário
          </h2>
        </div>

        {/* Opções: Grupo de radio buttons alinhados horizontalmente */}
        <div className="py-4 border-b border-white/10 flex flex-wrap items-center gap-4 text-xs text-white">
          {VIEW_OPTIONS.map((opt) => (
            <label
              key={opt.key}
              className="inline-flex items-center gap-1.5 cursor-pointer select-none"
            >
              <input
                type="radio"
                name="calendarDefaultView"
                value={opt.key}
                checked={defaultView === opt.key}
                onChange={() => setDefaultView(opt.key)}
                className="w-3.5 h-3.5 text-[#E8AC51] accent-[#880E1B] cursor-pointer"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>

        {/* Rodapé: Botão verde SALVAR abaixo da linha separadora */}
        <div className="pt-4 flex items-center gap-3">
          <button
            type="submit"
            className="px-3.5 py-2 bg-[#E8AC51] hover:bg-[#d99b3f] text-white text-[10px] font-semibold uppercase tracking-wide rounded-xs shadow-2xs transition-colors cursor-pointer"
          >
            SALVAR
          </button>

          {savedFeedback && (
            <span className="text-xs text-[#E8AC51] font-medium">
              Visualização padrão salva!
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

