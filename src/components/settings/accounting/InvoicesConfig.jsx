import React, { useState } from 'react';

export default function InvoicesConfig() {
  const [whereShowTax, setWhereShowTax] = useState('line'); // 'line' | 'footer'
  const [whenCalcTax, setWhenCalcTax] = useState('before'); // 'after' | 'before'
  const [howCalcTax, setHowCalcTax] = useState('exclusive'); // 'exclusive' | 'inclusive' | 'inclusive_total'
  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleSave = () => {
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  return (
    <div className="pt-2">
      {/* Título Opções Fiscais */}
      <div className="pb-2.5 mb-6 border-b border-white/10">
        <h2 className="text-[19px] font-normal text-neutral-400">
          Opções Fiscais
        </h2>
      </div>

      <div className="pl-5 space-y-8 text-xs text-neutral-400">
        {/* Grupo 1: Onde mostrar a opção de imposto? */}
        <div>
          <h3 className="text-xs font-bold text-white mb-3">
            Onde mostrar a opção de imposto?
          </h3>
          <div className="space-y-2.5">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="radio"
                name="whereShowTax"
                checked={whereShowTax === 'line'}
                onChange={() => setWhereShowTax('line')}
                className="w-3.5 h-3.5 text-[#E8AC51] accent-[#880E1B] cursor-pointer"
              />
              <span>Em cada linha</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="radio"
                name="whereShowTax"
                checked={whereShowTax === 'footer'}
                onChange={() => setWhereShowTax('footer')}
                className="w-3.5 h-3.5 text-[#E8AC51] accent-[#880E1B] cursor-pointer"
              />
              <span>No final da fatura</span>
            </label>
          </div>
        </div>

        {/* Grupo 2: Quando você quer calcular o imposto? */}
        <div>
          <h3 className="text-xs font-bold text-white mb-3">
            Quando você quer calcular o imposto?
          </h3>
          <div className="space-y-2.5">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="radio"
                name="whenCalcTax"
                checked={whenCalcTax === 'after'}
                onChange={() => setWhenCalcTax('after')}
                className="w-3.5 h-3.5 text-[#E8AC51] accent-[#880E1B] cursor-pointer"
              />
              <span>Depois da Comissão Extra</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="radio"
                name="whenCalcTax"
                checked={whenCalcTax === 'before'}
                onChange={() => setWhenCalcTax('before')}
                className="w-3.5 h-3.5 text-[#E8AC51] accent-[#880E1B] cursor-pointer"
              />
              <span>Antes da Comissão Extra</span>
            </label>
          </div>
        </div>

        {/* Grupo 3: Como são calculados os impostos? */}
        <div>
          <h3 className="text-xs font-bold text-white mb-3">
            Como são calculados os impostos?
          </h3>
          <div className="space-y-2.5">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="radio"
                name="howCalcTax"
                checked={howCalcTax === 'exclusive'}
                onChange={() => setHowCalcTax('exclusive')}
                className="w-3.5 h-3.5 text-[#E8AC51] accent-[#880E1B] cursor-pointer"
              />
              <span>Imposto exclusivo</span>
              <span
                title="Imposto calculado de forma exclusiva sobre a base"
                className="w-3.5 h-3.5 rounded-full bg-[#1c1c1e] text-white text-[9px] font-serif font-bold inline-flex items-center justify-center leading-none"
              >
                i
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="radio"
                name="howCalcTax"
                checked={howCalcTax === 'inclusive'}
                onChange={() => setHowCalcTax('inclusive')}
                className="w-3.5 h-3.5 text-[#E8AC51] accent-[#880E1B] cursor-pointer"
              />
              <span>Imposto incluso</span>
              <span
                title="Imposto incluído no valor"
                className="w-3.5 h-3.5 rounded-full bg-[#1c1c1e] text-white text-[9px] font-serif font-bold inline-flex items-center justify-center leading-none"
              >
                i
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="radio"
                name="howCalcTax"
                checked={howCalcTax === 'inclusive_total'}
                onChange={() => setHowCalcTax('inclusive_total')}
                className="w-3.5 h-3.5 text-[#E8AC51] accent-[#880E1B] cursor-pointer"
              />
              <span>Imposto incluso aplicado ao valor total</span>
              <span
                title="Imposto incluído aplicado ao valor total da fatura"
                className="w-3.5 h-3.5 rounded-full bg-[#1c1c1e] text-white text-[9px] font-serif font-bold inline-flex items-center justify-center leading-none"
              >
                i
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Rodapé com botão SALVAR ALTERAÇÕES */}
      <div className="mt-10 pt-4 border-t border-white/10 flex items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          className="px-3.5 py-2 bg-[#880E1B] hover:bg-[#a31121] text-white text-[10px] font-semibold uppercase tracking-wide rounded-xs shadow-2xs transition-colors cursor-pointer"
        >
          SALVAR ALTERAÇÕES
        </button>

        {savedFeedback && (
          <span className="text-xs text-[#E8AC51] font-medium">
            Opções fiscais salvas!
          </span>
        )}
      </div>
    </div>
  );
}

