import React, { useState } from 'react';
import { Plus, SquarePen } from 'lucide-react';

const DEFAULT_AVAILABLE = [
  'Peso',
  'Cabelo',
  'Coloração',
  'Tipo de cabelo',
  'Bojo',
  'Soutien',
  'Blusa',
  'Camisa',
  'Vestido',
  'Sapato',
  'Manequim',
];

const DEFAULT_SELECTED = [
  'Altura',
  'Busto',
  'Nacionalidade',
  'Cintura',
  'Tórax',
  'Gola',
  'Jaqueta',
  'Olhos',
  'Quadril',
];

export default function CompoConfig() {
  const [measureSets, setMeasureSets] = useState(['default']);
  const [currentMeasureSet, setCurrentMeasureSet] = useState('default');
  const [availableList, setAvailableList] = useState(DEFAULT_AVAILABLE);
  const [selectedList, setSelectedList] = useState(DEFAULT_SELECTED);
  const [pickedAvailable, setPickedAvailable] = useState(null);
  const [pickedSelected, setPickedSelected] = useState(null);
  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleAddToSelected = () => {
    const itemToMove = pickedAvailable || availableList[0];
    if (!itemToMove) return;

    setAvailableList((prev) => prev.filter((item) => item !== itemToMove));
    setSelectedList((prev) => [...prev, itemToMove]);
    setPickedAvailable(null);
  };

  const handleRemoveFromSelected = () => {
    const itemToMove = pickedSelected || selectedList[selectedList.length - 1];
    if (!itemToMove) return;

    setSelectedList((prev) => prev.filter((item) => item !== itemToMove));
    setAvailableList((prev) => [...prev, itemToMove]);
    setPickedSelected(null);
  };

  const handleRestoreDefaults = () => {
    setAvailableList(DEFAULT_AVAILABLE);
    setSelectedList(DEFAULT_SELECTED);
    setPickedAvailable(null);
    setPickedSelected(null);
  };

  const handleAddNewMeasureSet = () => {
    const nextName = `custom-${measureSets.length}`;
    setMeasureSets((prev) => [...prev, nextName]);
    setCurrentMeasureSet(nextName);
  };

  const handleSave = () => {
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  return (
    <div className="max-w-3xl pt-1">
      {/* Texto Explicativo no Topo */}
      <div className="pb-4 mb-4 border-b border-slate-200/90 text-slate-500">
        <p className="text-xs font-normal text-slate-600">
          Selecionar the default measures for Compomaker
        </p>
        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
          Adicionar the measures para the{' '}
          <strong className="text-slate-700 font-semibold">selected</strong>{' '}
          box, then drag and drop the measure para the position you want. Você
          can remove a selected measure Ou restore the default either.
        </p>
      </div>

      {/* Painel de Measure Set */}
      <div className="space-y-3 mb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">
            Adicionar novo measure set
          </span>
          <button
            type="button"
            onClick={handleAddNewMeasureSet}
            className="w-6 h-5 bg-[#1e9d1e] hover:bg-[#178017] text-white rounded-xs flex items-center justify-center shadow-2xs cursor-pointer"
            title="Adicionar novo measure set"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-xs text-slate-500">Current measure set:</span>
          <select
            value={currentMeasureSet}
            onChange={(e) => setCurrentMeasureSet(e.target.value)}
            className="w-40 h-7 px-2 bg-white border border-slate-200 rounded-xs text-xs text-slate-600 focus:outline-none focus:border-[#0077b5]"
          >
            {measureSets.map((setKey) => (
              <option key={setKey} value={setKey}>
                {setKey}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="w-7 h-6 bg-[#f58220] hover:bg-[#df7114] text-white rounded-xs flex items-center justify-center shadow-2xs cursor-pointer"
            title="Editar measure set"
          >
            <SquarePen className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Corpo: Duas Caixas (Disponibilidade e Selecionado) + Botões Centrais */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
        {/* Caixa Esquerda: Disponibilidade */}
        <div>
          <h4 className="text-sm font-bold text-slate-700 mb-1.5">
            Disponibilidade
          </h4>
          <div className="h-52 bg-white border border-slate-200 rounded-xs p-2.5 overflow-y-auto space-y-1.5">
            {availableList.map((item) => {
              const isPicked = pickedAvailable === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setPickedAvailable(item)}
                  onDoubleClick={() => {
                    setAvailableList((prev) =>
                      prev.filter((entry) => entry !== item)
                    );
                    setSelectedList((prev) => [...prev, item]);
                  }}
                  className={`w-full text-left px-1.5 py-0.5 rounded-xs text-[11px] font-bold transition-colors cursor-pointer ${
                    isPicked
                      ? 'bg-sky-100 text-[#0077b5]'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        {/* Botões Centrais: PADRÃO, <-- REMOVER, ADICIONAR NOVO --> */}
        <div className="flex flex-col items-center justify-center gap-3 pt-5 px-2">
          <button
            type="button"
            onClick={handleRestoreDefaults}
            className="px-4 py-1.5 bg-[#e6e6e6] hover:bg-slate-300 text-slate-700 text-[10px] font-semibold uppercase rounded-full transition-colors cursor-pointer"
          >
            PADRÃO
          </button>

          <button
            type="button"
            onClick={handleRemoveFromSelected}
            className="px-3.5 py-1.5 bg-[#e6e6e6] hover:bg-slate-300 text-slate-700 text-[10px] font-semibold uppercase rounded-full transition-colors cursor-pointer"
          >
            &larr; REMOVER
          </button>

          <button
            type="button"
            onClick={handleAddToSelected}
            className="px-4 py-2 bg-[#e6e6e6] hover:bg-slate-300 text-slate-700 text-[10px] font-semibold uppercase rounded-xl leading-tight text-center transition-colors cursor-pointer"
          >
            ADICIONAR NOVO
            <br />
            &rarr;
          </button>
        </div>

        {/* Caixa Direita: Selecionado */}
        <div>
          <h4 className="text-sm font-bold text-slate-700 mb-1.5">
            Selecionado
          </h4>
          <div className="h-52 bg-white border border-slate-200 rounded-xs p-2.5 overflow-y-auto space-y-1.5">
            {selectedList.map((item) => {
              const isPicked = pickedSelected === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setPickedSelected(item)}
                  onDoubleClick={() => {
                    setSelectedList((prev) =>
                      prev.filter((entry) => entry !== item)
                    );
                    setAvailableList((prev) => [...prev, item]);
                  }}
                  className={`w-full text-left px-1.5 py-0.5 rounded-xs text-[11px] transition-colors cursor-pointer ${
                    isPicked
                      ? 'bg-sky-100 text-[#0077b5] font-semibold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Botão Verde SALVAR na base da coluna esquerda */}
      <div className="pt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          className="px-4 py-2 bg-[#1e9d1e] hover:bg-[#178017] text-white text-[10px] font-semibold uppercase tracking-wide rounded-xs shadow-2xs transition-colors cursor-pointer"
        >
          SALVAR
        </button>

        {savedFeedback && (
          <span className="text-xs text-emerald-600 font-medium">
            Medidas do Compo salvas!
          </span>
        )}
      </div>
    </div>
  );
}

