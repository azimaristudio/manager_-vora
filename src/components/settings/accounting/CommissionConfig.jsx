import React, { useState } from 'react';

const COMMISSION_VALUES = Array.from({ length: 51 }, (_, i) => String(i));

export default function CommissionConfig() {
  const [commission, setCommission] = useState('20');
  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  return (
    <div className="pt-2">
      {/* Título Comissão da agência */}
      <div className="pb-2.5 mb-8 border-b border-slate-200/90">
        <h2 className="text-[19px] font-normal text-slate-600">
          Comissão da agência
        </h2>
      </div>

      {/* Dropdown de seleção de número + símbolo '%' + botão azul SALVAR */}
      <form
        onSubmit={handleSave}
        className="pl-16 flex flex-wrap items-center gap-3"
      >
        <select
          value={commission}
          onChange={(e) => setCommission(e.target.value)}
          className="w-36 h-8 px-2 bg-white border border-slate-200 rounded-xs text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#0f82b3]"
        >
          {COMMISSION_VALUES.map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </select>

        <span className="text-xs text-slate-500">%</span>

        <button
          type="submit"
          className="px-3.5 h-8 bg-[#0f82b3] hover:bg-[#006399] text-white text-[10px] font-semibold uppercase tracking-wide rounded-xs shadow-2xs transition-colors cursor-pointer"
        >
          SALVAR
        </button>

        {savedFeedback && (
          <span className="text-xs text-emerald-600 font-medium">
            Comissão salva!
          </span>
        )}
      </form>
    </div>
  );
}

