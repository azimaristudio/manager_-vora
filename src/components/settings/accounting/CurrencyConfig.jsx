import React, { useState } from 'react';

const INITIAL_MY_CURRENCIES = [
  { code: 'BRL', label: 'BRL - Brazil Real', isDefault: true },
  { code: 'EUR', label: 'EUR - Euro Member Countries', isDefault: false },
  { code: 'USD', label: 'USD - United States Dollar', isDefault: false },
];

const INITIAL_WORLD_CURRENCIES = [
  { code: 'AED', label: 'AED - United Arab Emirates Dirham' },
  { code: 'AFN', label: 'AFN - Afghanistan Afghani' },
  { code: 'ALL', label: 'ALL - Albania Lek' },
  { code: 'AMD', label: 'AMD - Armenia Dram' },
  { code: 'ANG', label: 'ANG - Netherlands Antilles Guilder' },
  { code: 'AOA', label: 'AOA - Angola Kwanza' },
  { code: 'ARS', label: 'ARS - Argentina Peso' },
  { code: 'AUD', label: 'AUD - Australia Dollar' },
  { code: 'AWG', label: 'AWG - Aruba Guilder' },
  { code: 'AZN', label: 'AZN - Azerbaijan New Manat' },
];

export default function CurrencyConfig() {
  const [myCurrencies, setMyCurrencies] = useState(INITIAL_MY_CURRENCIES);
  const [worldCurrencies, setWorldCurrencies] = useState(
    INITIAL_WORLD_CURRENCIES
  );
  const [selectedMyCode, setSelectedMyCode] = useState(null);
  const [selectedWorldCode, setSelectedWorldCode] = useState(null);

  const handleSetDefault = () => {
    if (!selectedMyCode) return;
    setMyCurrencies((prev) =>
      prev.map((c) => ({
        ...c,
        isDefault: c.code === selectedMyCode,
      }))
    );
  };

  const handleAddCurrency = () => {
    const target =
      worldCurrencies.find((c) => c.code === selectedWorldCode) ||
      worldCurrencies[0];
    if (!target) return;

    setWorldCurrencies((prev) => prev.filter((c) => c.code !== target.code));
    setMyCurrencies((prev) => [...prev, { ...target, isDefault: false }]);
    setSelectedWorldCode(null);
  };

  const handleRemoveCurrency = () => {
    const target =
      myCurrencies.find((c) => c.code === selectedMyCode) ||
      myCurrencies[myCurrencies.length - 1];
    if (!target || target.isDefault) return;

    setMyCurrencies((prev) => prev.filter((c) => c.code !== target.code));
    setWorldCurrencies((prev) => [
      { code: target.code, label: target.label },
      ...prev,
    ]);
    setSelectedMyCode(null);
  };

  return (
    <div className="max-w-3xl pt-4">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
        {/* Coluna Esquerda: Minhas Moedas */}
        <div>
          <h3 className="text-sm font-bold text-slate-700 mb-1.5">
            Minhas Moedas
          </h3>
          <div className="h-52 bg-white border border-slate-200 rounded-xs p-2.5 overflow-y-auto space-y-1.5">
            {myCurrencies.map((curr) => {
              const isSelected = selectedMyCode === curr.code;
              return (
                <button
                  key={curr.code}
                  type="button"
                  onClick={() => setSelectedMyCode(curr.code)}
                  className={`w-full text-left px-1.5 py-0.5 rounded-xs text-[11px] font-bold transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-sky-100 text-[#0077b5]'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {curr.label}
                  {curr.isDefault ? ' - DEFAULT' : ''}
                </button>
              );
            })}
          </div>
        </div>

        {/* Botões Centrais: PADRÃO, <-- ADICIONAR, REMOVER --> */}
        <div className="flex flex-col items-center justify-center gap-3 pt-5 px-2">
          <button
            type="button"
            onClick={handleSetDefault}
            className="px-4 py-1.5 bg-[#e6e6e6] hover:bg-slate-300 text-slate-700 text-[10px] font-semibold uppercase rounded-full transition-colors cursor-pointer"
          >
            PADRÃO
          </button>

          <button
            type="button"
            onClick={handleAddCurrency}
            className="px-3.5 py-1.5 bg-[#e6e6e6] hover:bg-slate-300 text-slate-700 text-[10px] font-semibold uppercase rounded-full transition-colors cursor-pointer"
          >
            &larr; ADICIONAR
          </button>

          <button
            type="button"
            onClick={handleRemoveCurrency}
            className="px-4 py-1.5 bg-[#e6e6e6] hover:bg-slate-300 text-slate-700 text-[10px] font-semibold uppercase rounded-full transition-colors cursor-pointer"
          >
            REMOVER &rarr;
          </button>
        </div>

        {/* Coluna Direita: Moedas do Mundo */}
        <div>
          <h3 className="text-sm font-bold text-slate-700 mb-1.5">
            Moedas do Mundo
          </h3>
          <div className="h-52 bg-white border border-slate-200 rounded-xs p-2.5 overflow-y-auto space-y-1.5">
            {worldCurrencies.map((curr) => {
              const isSelected = selectedWorldCode === curr.code;
              return (
                <button
                  key={curr.code}
                  type="button"
                  onClick={() => setSelectedWorldCode(curr.code)}
                  className={`w-full text-left px-1.5 py-0.5 rounded-xs text-[11px] font-bold transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-sky-100 text-[#0077b5]'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {curr.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

