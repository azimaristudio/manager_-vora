import React, { useState } from 'react';

const INITIAL_TAXES = [
  { id: 'tax-new', label: 'New', name: '', value: '', unit: '%' },
  { id: 'tax-isr', label: 'ISR - 20.00%', name: 'ISR', value: '20.00', unit: '%' },
  { id: 'tax-iva', label: 'IVA - 16.00%', name: 'IVA', value: '16.00', unit: '%' },
  { id: 'tax-vat', label: 'VAT - 10.00%', name: 'VAT', value: '10.00', unit: '%' },
];

export default function TaxConfig() {
  const [taxes, setTaxes] = useState(INITIAL_TAXES);
  const [selectedId, setSelectedId] = useState('tax-new');
  const [taxName, setTaxName] = useState('');
  const [taxValue, setTaxValue] = useState('');
  const [taxUnit, setTaxUnit] = useState('%');

  const handleSelectOption = (item) => {
    setSelectedId(item.id);
    setTaxName(item.name);
    setTaxValue(item.value);
    setTaxUnit(item.unit || '%');
  };

  const handleSaveTax = (e) => {
    e.preventDefault();
    const trimmedName = taxName.trim();
    const trimmedVal = taxValue.trim() || '0.00';
    if (!trimmedName) return;

    if (selectedId === 'tax-new') {
      const newEntry = {
        id: `tax-${Date.now()}`,
        label: `${trimmedName} - ${trimmedVal}${taxUnit}`,
        name: trimmedName,
        value: trimmedVal,
        unit: taxUnit,
      };
      setTaxes((prev) => [...prev, newEntry]);
      setTaxName('');
      setTaxValue('');
    } else {
      setTaxes((prev) =>
        prev.map((t) =>
          t.id === selectedId
            ? {
                ...t,
                name: trimmedName,
                value: trimmedVal,
                unit: taxUnit,
                label: `${trimmedName} - ${trimmedVal}${taxUnit}`,
              }
            : t
        )
      );
    }
  };

  return (
    <div className="pt-2">
      {/* Título Imposto */}
      <div className="pb-2.5 mb-6 border-b border-slate-200/90">
        <h2 className="text-[19px] font-normal text-slate-600">Imposto</h2>
      </div>

      <div className="max-w-lg pl-14">
        {/* Lista de Radio Buttons */}
        <div className="space-y-3 pb-4 border-b border-slate-200/90 text-xs text-slate-500">
          {taxes.map((item) => (
            <label
              key={item.id}
              className="flex items-center gap-1.5 cursor-pointer select-none"
            >
              <input
                type="radio"
                name="taxOption"
                checked={selectedId === item.id}
                onChange={() => handleSelectOption(item)}
                className="w-3.5 h-3.5 text-[#0f82b3] accent-[#0f82b3] cursor-pointer"
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>

        {/* Formulário de Nome e Valor do Imposto */}
        <form onSubmit={handleSaveTax} className="pt-6 w-48 mx-auto space-y-2.5">
          <input
            type="text"
            value={taxName}
            onChange={(e) => setTaxName(e.target.value)}
            placeholder="Nome do imposto"
            className="w-full h-8 px-2.5 bg-white border border-slate-200 rounded-xs text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#0f82b3]"
          />

          <div className="flex items-center">
            <input
              type="text"
              value={taxValue}
              onChange={(e) => setTaxValue(e.target.value)}
              placeholder="Valor do imposto"
              className="flex-1 min-w-0 h-8 px-2.5 bg-white border border-slate-200 rounded-l-xs text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#0f82b3]"
            />
            <select
              value={taxUnit}
              onChange={(e) => setTaxUnit(e.target.value)}
              className="w-12 h-8 px-1 bg-white border-t border-r border-b border-slate-200 rounded-r-xs text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="%">%</option>
              <option value="$">$</option>
            </select>
          </div>

          <div className="flex justify-end pt-0.5">
            <button
              type="submit"
              className="px-3.5 h-8 bg-[#0f82b3] hover:bg-[#006399] text-white text-[10px] font-semibold uppercase tracking-wide rounded-xs shadow-2xs transition-colors cursor-pointer"
            >
              SALVAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

