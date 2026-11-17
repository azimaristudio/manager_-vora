import React, { useState } from 'react';
import {
  Plus,
  CornerDownRight,
  Pencil,
  CheckSquare,
  Trash2,
} from 'lucide-react';

const INITIAL_INCOME_CATEGORIES = [
  {
    id: 'inc-1',
    name: 'Test Shooting',
    isDefault: true,
    subcategories: ['Fotografia Studio'],
  },
  {
    id: 'inc-2',
    name: 'Test Shooting',
    isDefault: false,
    subcategories: [],
  },
];

export default function CategoriesAccConfig() {
  const [incomeCategories, setIncomeCategories] = useState(
    INITIAL_INCOME_CATEGORIES
  );
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [targetType, setTargetType] = useState('Entradas');

  const handleToggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    const trimmed = newCategoryName.trim();
    if (!trimmed) return;

    const newItem = {
      id: `cat-${Date.now()}`,
      name: trimmed,
      isDefault: false,
      subcategories: [],
    };

    if (targetType === 'Entradas') {
      setIncomeCategories((prev) => [...prev, newItem]);
    } else {
      setExpenseCategories((prev) => [...prev, newItem]);
    }
    setNewCategoryName('');
  };

  const handleToggleDefault = () => {
    if (selectedIds.length === 0) return;
    setIncomeCategories((prev) =>
      prev.map((c) =>
        selectedIds.includes(c.id) ? { ...c, isDefault: !c.isDefault } : c
      )
    );
    setExpenseCategories((prev) =>
      prev.map((c) =>
        selectedIds.includes(c.id) ? { ...c, isDefault: !c.isDefault } : c
      )
    );
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    setIncomeCategories((prev) =>
      prev.filter((c) => !selectedIds.includes(c.id))
    );
    setExpenseCategories((prev) =>
      prev.filter((c) => !selectedIds.includes(c.id))
    );
    setSelectedIds([]);
  };

  const renderCategoryItem = (item) => {
    const isChecked = selectedIds.includes(item.id);
    const isExpanded = expandedIds.includes(item.id);

    return (
      <div key={item.id} className="space-y-1">
        <div className="bg-[#161617] border border-white/10 rounded-xs px-2.5 py-2 flex items-center justify-between">
          <label className="flex items-center gap-1.5 text-xs text-neutral-400 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => handleToggleSelect(item.id)}
              className="w-3.5 h-3.5 rounded-xs border-white/10 text-[#E8AC51] cursor-pointer"
            />
            <span>{item.name}</span>
            {item.isDefault && (
              <span className="ml-1 px-2 py-0.5 bg-[#E8AC51] text-white text-[10px] italic rounded-xs">
                default
              </span>
            )}
          </label>

          <button
            type="button"
            onClick={() => handleToggleExpand(item.id)}
            className="text-[#E8AC51] hover:text-[#E8AC51] p-0.5 cursor-pointer"
            title="Expandir subcategorias"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
          </button>
        </div>

        {isExpanded && (
          <div className="pl-6 py-1 text-[11px] text-neutral-400 italic">
            {item.subcategories.length > 0
              ? item.subcategories.join(', ')
              : 'Nenhuma subcategoria associada'}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="pt-2">
      {/* Título Categorias */}
      <div className="pb-2.5 mb-6 border-b border-white/10">
        <h2 className="text-[19px] font-normal text-neutral-400">Categorias</h2>
      </div>

      {/* Duas Colunas: Entradas: e Saídas : */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        <div>
          <h3 className="text-[17px] font-normal text-neutral-400 mb-3">
            Entradas:
          </h3>
          <div className="space-y-2">
            {incomeCategories.map(renderCategoryItem)}
          </div>
        </div>

        <div>
          <h3 className="text-[17px] font-normal text-neutral-400 mb-3">
            Saídas :
          </h3>
          <div className="space-y-2">
            {expenseCategories.map(renderCategoryItem)}
          </div>
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
          onClick={handleToggleDefault}
          className="inline-flex items-center gap-1 text-[10px] text-[#E8AC51] hover:underline uppercase tracking-wide cursor-pointer"
        >
          <CheckSquare className="w-3 h-3 fill-[#E8AC51] text-white" />
          <span>PADRÃO</span>
        </button>

        <button
          type="button"
          onClick={handleDeleteSelected}
          className="inline-flex items-center gap-1 text-[10px] text-[#E8AC51] hover:underline uppercase tracking-wide cursor-pointer"
        >
          <Trash2 className="w-3 h-3 text-[#E8AC51]" />
          <span>EXCLUIR</span>
        </button>
      </div>

      {/* Formulário de Inserção no Fundo */}
      <form
        onSubmit={handleAddCategory}
        className="pt-3 max-w-xs mx-auto space-y-3"
      >
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Insira uma nova categoria"
          className="w-60 h-8 px-2.5 bg-[#1c1c1e] border border-white/10 rounded-xs text-xs text-white placeholder:text-neutral-400 focus:outline-none focus:border-[#880E1B]"
        />

        <div className="flex items-center gap-3">
          <select
            value={targetType}
            onChange={(e) => setTargetType(e.target.value)}
            className="w-48 h-8 px-2 bg-[#1c1c1e] border border-white/10 rounded-xs text-xs font-semibold text-white focus:outline-none focus:border-[#880E1B]"
          >
            <option value="Entradas">Entradas</option>
            <option value="Saídas">Saídas</option>
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

