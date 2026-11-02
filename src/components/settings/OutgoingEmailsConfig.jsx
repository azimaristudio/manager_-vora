import React, { useState } from 'react';

export default function OutgoingEmailsConfig() {
  const [serverMode, setServerMode] = useState('internal'); // 'internal' | 'smtp'
  const [username, setUsername] = useState('mozartdemarias@gmail.com');
  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  return (
    <div className="pt-2">
      {/* Cabeçalho: Título 'Emails de Saída' + linha horizontal fina */}
      <div className="pb-2.5 mb-5 border-b border-slate-200/90">
        <h2 className="text-[19px] font-normal text-slate-600">
          Emails de Saída
        </h2>
      </div>

      {/* Formulário */}
      <form onSubmit={handleSave}>
        <div className="pl-4 space-y-3 text-xs text-slate-500">
          {/* Opção 1: Emails enviados por nossos próprios servidores */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="radio"
              name="outgoingServerMode"
              value="internal"
              checked={serverMode === 'internal'}
              onChange={() => setServerMode('internal')}
              className="w-3.5 h-3.5 text-[#0077b5] accent-[#0077b5] cursor-pointer"
            />
            <span>Emails enviados por nossos próprios servidores</span>
          </label>

          {/* Campo indentado: Nome de Usuário */}
          <div className="pl-5 flex items-center gap-4">
            <label className="w-16 text-[11px] text-slate-500 leading-tight">
              Nome de
              <br />
              Usuário
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              readOnly
              className="w-60 h-8 px-2.5 bg-white border border-slate-200 rounded-xs text-xs text-slate-600 focus:outline-none"
            />
          </div>

          {/* Opção 2: Emails enviados por seus próprios servidores SMTP */}
          <label className="flex items-center gap-2 pt-0.5 cursor-pointer select-none">
            <input
              type="radio"
              name="outgoingServerMode"
              value="smtp"
              checked={serverMode === 'smtp'}
              onChange={() => setServerMode('smtp')}
              className="w-3.5 h-3.5 text-[#0077b5] accent-[#0077b5] cursor-pointer"
            />
            <span>Emails enviados por seus próprios servidores SMTP</span>
          </label>
        </div>

        {/* Rodapé com linha horizontal fina e botão azul SALVAR alinhado à direita */}
        <div className="mt-14 pt-3 border-t border-slate-200/90 flex items-center justify-end gap-3">
          {savedFeedback && (
            <span className="text-xs text-emerald-600 font-medium">
              Configurações salvas!
            </span>
          )}
          <button
            type="submit"
            className="px-3.5 h-8 bg-[#0f82b3] hover:bg-[#006399] text-white text-[10px] font-semibold uppercase tracking-wide rounded-xs shadow-2xs transition-colors cursor-pointer"
          >
            SALVAR
          </button>
        </div>
      </form>
    </div>
  );
}

