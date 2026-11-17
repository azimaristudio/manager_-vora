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
      <div className="pb-2.5 mb-6 border-b border-white/10">
        <h2 className="text-[19px] font-normal text-neutral-400">
          Transferências
        </h2>
      </div>

      {/* Duas Colunas: Categoria: e Sub categoria : */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-3">
        <div>
          <h3 className="text-[17px] font-normal text-neutral-400 mb-2">
            Categoria:
          </h3>
          {categories.length > 0 && (
            <div className="space-y-1.5 text-xs text-neutral-400">
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
          <h3 className="text-[17px] font-normal text-neutral-400 mb-2">
            Sub categoria :
          </h3>
          {subCategories.length > 0 && (
            <div className="space-y-1.5 text-xs text-neutral-400">
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
      <div className="border-t border-b border-white/10 py-3 my-4 flex flex-wrap items-center justify-center gap-5">
        <div className="flex items-center gap-1 text-neutral-400 text-xs">
          <CornerDownRight className="w-3.5 h-3.5 text-neutral-400 stroke-[1.8]" />
          <span>Seleção</span>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1 text-[10px] text-[#E8AC51] hover:underline uppercase tracking-wide cursor-pointer"
        >
          <Pencil className="w-3 h-3 fill-[#E8AC51] text-[#E8AC51]" />
          <span>EDITAR</span>
        </button>

        <button
          type="button"
          className="inline-flex items-center gap-1 text-[10px] text-[#E8AC51] hover:underline uppercase tracking-wide cursor-pointer"
        >
          <CheckSquare className="w-3 h-3 fill-[#E8AC51] text-white" />
          <span>PADRÃO</span>
        </button>

        <button
          type="button"
          className="inline-flex items-center gap-1 text-[10px] text-[#E8AC51] hover:underline uppercase tracking-wide cursor-pointer"
        >
          <Trash2 className="w-3 h-3 text-[#E8AC51]" />
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
          className="w-60 h-8 px-2.5 bg-[#1c1c1e] border border-white/10 rounded-xs text-xs text-white placeholder:text-neutral-400 focus:outline-none focus:border-[#880E1B]"
        />

        <div className="flex items-center gap-3">
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="w-48 h-8 px-2 bg-[#1c1c1e] border border-white/10 rounded-xs text-xs font-semibold text-white focus:outline-none focus:border-[#880E1B]"
          >
            <option value="Categoria">Categoria</option>
            <option value="Sub categoria">Sub categoria</option>
          </select>

          <button
            type="submit"
            className="px-3.5 h-8 bg-[#880E1B] hover:bg-[#a31121] text-white text-[10px] font-semibold uppercase tracking-wide rounded-xs shadow-2xs transition-colors cursor-pointer"
          >
            SALVAR
          </button>
        </div>
      </form>
    </div>
  );
}

