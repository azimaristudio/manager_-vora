import React, { useState } from 'react';

export default function OnlineFormConfig() {
  const [notifyNewOrder, setNotifyNewOrder] = useState(true);
  const [notifyUpdateOrder, setNotifyUpdateOrder] = useState(true);
  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleSave = () => {
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  return (
    <div className="max-w-3xl pt-3">
      {/* Bloco 1: Novo pedido */}
      <div className="pb-6 border-b border-slate-200/90">
        <h3 className="text-[15px] font-normal text-slate-600 mb-3">
          Novo pedido
        </h3>
        <label className="inline-flex items-center gap-2 text-xs text-slate-600 pl-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={notifyNewOrder}
            onChange={(e) => setNotifyNewOrder(e.target.checked)}
            className="w-3.5 h-3.5 rounded-xs border-slate-300 text-[#0077b5] accent-[#0077b5] cursor-pointer"
          />
          <span>Notificar quando o talento preencher a ficha de cadastro</span>
        </label>
      </div>

      {/* Bloco 2: Pedido de atualização */}
      <div className="py-6 border-b border-slate-200/90">
        <h3 className="text-[15px] font-normal text-slate-600 mb-3">
          Pedido de atualização
        </h3>
        <label className="inline-flex items-center gap-2 text-xs text-slate-600 pl-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={notifyUpdateOrder}
            onChange={(e) => setNotifyUpdateOrder(e.target.checked)}
            className="w-3.5 h-3.5 rounded-xs border-slate-300 text-[#0077b5] accent-[#0077b5] cursor-pointer"
          />
          <span>Notificar quando o talento preencher a ficha de cadastro</span>
        </label>
      </div>

      {/* Rodapé com botão verde SALVAR */}
      <div className="pt-4 pl-3 flex items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          className="px-3.5 py-2 bg-[#1e9d1e] hover:bg-[#178017] text-white text-[10px] font-semibold uppercase tracking-wide rounded-xs shadow-2xs transition-colors cursor-pointer"
        >
          SALVAR
        </button>

        {savedFeedback && (
          <span className="text-xs text-emerald-600 font-medium">
            Configurações salvas!
          </span>
        )}
      </div>
    </div>
  );
}

