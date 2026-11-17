import React, { useState } from 'react';

export default function OptionsAccConfig() {
  const [onlyClosedJobsInIncomes, setOnlyClosedJobsInIncomes] = useState(false);
  const [onlyClosedInStatements, setOnlyClosedInStatements] = useState(false);
  const [ignoreCanceledProjects, setIgnoreCanceledProjects] = useState(true);
  const [onlyGeneratedInvoicesInStatements, setOnlyGeneratedInvoicesInStatements] =
    useState(false);
  const [autoShowTalentQuantity, setAutoShowTalentQuantity] = useState(true);
  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleSave = () => {
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  return (
    <div className="pt-2">
      {/* Título Opções */}
      <div className="pb-2.5 mb-6 border-b border-white/10">
        <h2 className="text-[19px] font-normal text-neutral-400">Opções</h2>
      </div>

      {/* Secção Entradas */}
      <div className="mb-8">
        <h3 className="text-[17px] font-normal text-neutral-400 mb-3">
          Entradas
        </h3>
        <label className="flex items-center gap-2 text-xs text-neutral-400 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={onlyClosedJobsInIncomes}
            onChange={(e) => setOnlyClosedJobsInIncomes(e.target.checked)}
            className="w-3.5 h-3.5 rounded-xs border-white/10 text-[#E8AC51] accent-[#880E1B] cursor-pointer"
          />
          <span>
            Os trabalhos devem aparecer nas Entradas só quando estiverem
            fechados.
          </span>
        </label>
      </div>

      {/* Secção Extratos */}
      <div className="mb-8">
        <h3 className="text-[17px] font-normal text-neutral-400 mb-3">
          Extratos
        </h3>
        <div className="space-y-3 text-xs text-neutral-400">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyClosedInStatements}
              onChange={(e) => setOnlyClosedInStatements(e.target.checked)}
              className="w-3.5 h-3.5 rounded-xs border-white/10 text-[#E8AC51] accent-[#880E1B] cursor-pointer"
            />
            <span>Mostrar apenas trabalhos fechados</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={ignoreCanceledProjects}
              onChange={(e) => setIgnoreCanceledProjects(e.target.checked)}
              className="w-3.5 h-3.5 rounded-xs border-white/10 text-[#E8AC51] accent-[#880E1B] cursor-pointer"
            />
            <span>Desconsiderar projetos cancelados</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyGeneratedInvoicesInStatements}
              onChange={(e) =>
                setOnlyGeneratedInvoicesInStatements(e.target.checked)
              }
              className="w-3.5 h-3.5 rounded-xs border-white/10 text-[#E8AC51] accent-[#880E1B] cursor-pointer"
            />
            <span>
              Os trabalhos devem aparecer em Extrato somente se a fatura
              correspondente tiver sido gerada..
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={autoShowTalentQuantity}
              onChange={(e) => setAutoShowTalentQuantity(e.target.checked)}
              className="w-3.5 h-3.5 rounded-xs border-white/10 text-[#E8AC51] accent-[#880E1B] cursor-pointer"
            />
            <span>
              Mostrar automaticamente a excelente quantidade de talentos em seu
              extrato
            </span>
          </label>
        </div>
      </div>

      {/* Rodapé com botão azul SALVAR ALTERAÇÕES à direita */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
        {savedFeedback && (
          <span className="text-xs text-[#E8AC51] font-medium">
            Opções salvas!
          </span>
        )}
        <button
          type="button"
          onClick={handleSave}
          className="px-3.5 py-2 bg-[#880E1B] hover:bg-[#a31121] text-white text-[10px] font-semibold uppercase tracking-wide rounded-xs shadow-2xs transition-colors cursor-pointer"
        >
          SALVAR ALTERAÇÕES
        </button>
      </div>
    </div>
  );
}

