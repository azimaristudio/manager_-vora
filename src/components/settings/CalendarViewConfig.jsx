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
        <div className="pb-3 border-b border-slate-200/90">
          <h2 className="text-xs font-normal text-slate-500">
            Vista carregada padrão do calendário
          </h2>
        </div>

        {/* Opções: Grupo de radio buttons alinhados horizontalmente */}
        <div className="py-4 border-b border-slate-200/90 flex flex-wrap items-center gap-4 text-xs text-slate-700">
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
                className="w-3.5 h-3.5 text-[#0077b5] accent-[#0077b5] cursor-pointer"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>

        {/* Rodapé: Botão verde SALVAR abaixo da linha separadora */}
        <div className="pt-4 flex items-center gap-3">
          <button
            type="submit"
            className="px-3.5 py-2 bg-[#1e9d1e] hover:bg-[#178017] text-white text-[10px] font-semibold uppercase tracking-wide rounded-xs shadow-2xs transition-colors cursor-pointer"
          >
            SALVAR
          </button>

          {savedFeedback && (
            <span className="text-xs text-emerald-600 font-medium">
              Visualização padrão salva!
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

