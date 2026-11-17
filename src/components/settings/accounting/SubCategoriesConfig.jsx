import React, { useState } from 'react';
import {
  CornerDownRight,
  Pencil,
  CheckSquare,
  Trash2,
} from 'lucide-react';

export default function SubCategoriesConfig() {
  const [incomeSubCategories, setIncomeSubCategories] = useState([]);
  const [expenseSubCategories, setExpenseSubCategories] = useState([]);
  const [newSubName, setNewSubName] = useState('');
  const [entryType, setEntryType] = useState('ENTRADAS');
  const [parentCategory, setParentCategory] = useState('TODAS AS CATEGORIAS');

  const handleSaveSubCategory = (e) => {
    e.preventDefault();
    const trimmed = newSubName.trim();
    if (!trimmed) return;

    const newItem = {
      id: `sub-${Date.now()}`,
      name: trimmed,
      category: parentCategory,
    };

    if (entryType === 'ENTRADAS') {
      setIncomeSubCategories((prev) => [...prev, newItem]);
    } else {
      setExpenseSubCategories((prev) => [...prev, newItem]);
    }
    setNewSubName('');
  };

  return (
    <div className="pt-2">
      {/* Título SubCategorias */}
      <div className="pb-2.5 mb-8 border-b border-white/10">
        <h2 className="text-[19px] font-normal text-neutral-400">
          SubCategorias
        </h2>
      </div>

      {/* Duas Colunas: Entradas: e Saídas : */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6 pl-10">
        <div>
          <h3 className="text-[17px] font-normal text-neutral-400 mb-2">
            Entradas:
          </h3>
          {incomeSubCategories.length > 0 && (
            <div className="space-y-1.5 text-xs text-neutral-400">
              {incomeSubCategories.map((sub) => (
                <div key={sub.id} className="flex items-center gap-1.5">
                  <input type="checkbox" className="w-3.5 h-3.5" />
                  <span>{sub.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-[17px] font-normal text-neutral-400 mb-2">
            Saídas :
          </h3>
          {expenseSubCategories.length > 0 && (
            <div className="space-y-1.5 text-xs text-neutral-400">
              {expenseSubCategories.map((sub) => (
                <div key={sub.id} className="flex items-center gap-1.5">
                  <input type="checkbox" className="w-3.5 h-3.5" />
                  <span>{sub.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Barra de Ações: Seleção, EDITAR, + NOVO, EXCLUIR */}
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
          <span>NOVO</span>
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
        onSubmit={handleSaveSubCategory}
        className="pt-3 max-w-xs mx-auto space-y-3"
      >
        <input
          type="text"
          value={newSubName}
          onChange={(e) => setNewSubName(e.target.value)}
          placeholder="Digite uma nova subcategoria"
          className="w-60 h-8 px-2.5 bg-[#1c1c1e] border border-white/10 rounded-xs text-xs text-white placeholder:text-neutral-400 focus:outline-none focus:border-[#880E1B]"
        />

        <select
          value={entryType}
          onChange={(e) => setEntryType(e.target.value)}
          className="w-60 h-8 px-2 bg-[#1c1c1e] border border-white/10 rounded-xs text-[10px] text-neutral-400 uppercase focus:outline-none focus:border-[#880E1B]"
        >
          <option value="ENTRADAS">ENTRADAS</option>
          <option value="SAÍDAS">SAÍDAS</option>
        </select>

        <div className="flex items-center gap-3">
          <select
            value={parentCategory}
            onChange={(e) => setParentCategory(e.target.value)}
            className="w-48 h-8 px-2 bg-[#1c1c1e] border border-white/10 rounded-xs text-[10px] text-neutral-400 uppercase focus:outline-none focus:border-[#880E1B]"
          >
            <option value="TODAS AS CATEGORIAS">TODAS AS CATEGORIAS</option>
            <option value="Test Shooting">Test Shooting</option>
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

