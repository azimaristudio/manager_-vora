import React, { useState } from 'react';
import {
  CornerDownRight,
  Pencil,
  CheckSquare,
  Trash2,
} from 'lucide-react';

export default function TransfersConfig() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [newName, setNewName] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('Categoria');

  const handleSaveTransferCategory = (e) => {
    e.preventDefault();
    const trimmed = newName.trim();
    if (!trimmed) return;

    const item = { id: `tr-${Date.now()}`, name: trimmed };
    if (selectedLevel === 'Categoria') {
      setCategories((prev) => [...prev, item]);
    } else {
      setSubCategories((prev) => [...prev, item]);
    }
    setNewName('');
  };

  return (
    <div className="pt-2">
      {/* Título Transferências */}
      <div className="pb-2.5 mb-6 border-b border-slate-200/90">
        <h2 className="text-[19px] font-normal text-slate-600">
          Transferências
        </h2>
      </div>

      {/* Duas Colunas: Categoria: e Sub categoria : */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-3">
        <div>
          <h3 className="text-[17px] font-normal text-slate-600 mb-2">
            Categoria:
          </h3>
          {categories.length > 0 && (
            <div className="space-y-1.5 text-xs text-slate-600">
              {categories.map((c) => (
                <div key={c.id} className="flex items-center gap-1.5">
                  <input type="checkbox" className="w-3.5 h-3.5" />
                  <span>{c.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-[17px] font-normal text-slate-600 mb-2">
            Sub categoria :
          </h3>
          {subCategories.length > 0 && (
            <div className="space-y-1.5 text-xs text-slate-600">
              {subCategories.map((sc) => (
                <div key={sc.id} className="flex items-center gap-1.5">
                  <input type="checkbox" className="w-3.5 h-3.5" />
                  <span>{sc.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Barra de Ações */}
      <div className="border-t border-b border-slate-200/90 py-3 my-4 flex flex-wrap items-center justify-center gap-5">
        <div className="flex items-center gap-1 text-slate-600 text-xs">
          <CornerDownRight className="w-3.5 h-3.5 text-slate-500 stroke-[1.8]" />
          <span>Seleção</span>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1 text-[10px] text-[#0088cc] hover:underline uppercase tracking-wide cursor-pointer"
        >
          <Pencil className="w-3 h-3 fill-[#0088cc] text-[#0088cc]" />
          <span>EDITAR</span>
        </button>

        <button
          type="button"
          className="inline-flex items-center gap-1 text-[10px] text-[#0088cc] hover:underline uppercase tracking-wide cursor-pointer"
        >
          <CheckSquare className="w-3 h-3 fill-[#0088cc] text-white" />
          <span>PADRÃO</span>
        </button>

        <button
          type="button"
          className="inline-flex items-center gap-1 text-[10px] text-[#0088cc] hover:underline uppercase tracking-wide cursor-pointer"
        >
          <Trash2 className="w-3 h-3 text-[#0088cc]" />
          <span>EXCLUIR</span>
        </button>
      </div>

      {/* Formulário Inferior */}
      <form
        onSubmit={handleSaveTransferCategory}
        className="pt-3 max-w-xs mx-auto space-y-3"
      >
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Insira uma nova categoria"
          className="w-60 h-8 px-2.5 bg-white border border-slate-200 rounded-xs text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#0f82b3]"
        />

        <div className="flex items-center gap-3">
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="w-48 h-8 px-2 bg-white border border-slate-200 rounded-xs text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#0f82b3]"
          >
            <option value="Categoria">Categoria</option>
            <option value="Sub categoria">Sub categoria</option>
          </select>

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

