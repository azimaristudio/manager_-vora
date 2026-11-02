import React, { useState } from 'react';
import {
  CornerDownRight,
  Pencil,
  CheckSquare,
  Trash2,
} from 'lucide-react';

const INITIAL_CATEGORIES = [
  { id: 'cat-ator', name: 'Ator', isDefault: true },
  { id: 'cat-celebridade', name: 'Celebridade', isDefault: true },
  { id: 'cat-modelo', name: 'Modelo', isDefault: true },
];

export default function CategoriesConfig() {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [selectedIds, setSelectedIds] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState('');

  const handleToggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    const trimmed = newCategoryName.trim();
    if (!trimmed) return;

    const newCat = {
      id: `cat-${Date.now()}`,
      name: trimmed,
      isDefault: false,
    };

    setCategories((prev) => [...prev, newCat]);
    setNewCategoryName('');
  };

  const handleStartEdit = () => {
    if (selectedIds.length === 0) return;
    const firstId = selectedIds[0];
    const target = categories.find((c) => c.id === firstId);
    if (target) {
      setEditingId(target.id);
      setEditingValue(target.name);
    }
  };

  const handleConfirmEdit = (id) => {
    const trimmed = editingValue.trim();
    if (trimmed) {
      setCategories((prev) =>
        prev.map((c) => (c.id === id ? { ...c, name: trimmed } : c))
      );
    }
    setEditingId(null);
    setEditingValue('');
  };

  const handleToggleDefault = () => {
    if (selectedIds.length === 0) return;
    setCategories((prev) =>
      prev.map((c) =>
        selectedIds.includes(c.id) ? { ...c, isDefault: !c.isDefault } : c
      )
    );
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    setCategories((prev) => prev.filter((c) => !selectedIds.includes(c.id)));
    setSelectedIds([]);
  };

  return (
    <div className="max-w-xl pt-3">
      {/* Lista de Itens com Checkboxes */}
      <div className="space-y-2.5 pl-6">
        {categories.map((category) => {
          const isChecked = selectedIds.includes(category.id);
          const isEditing = editingId === category.id;

          return (
            <div key={category.id} className="flex items-center gap-1.5 text-xs">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleToggleSelect(category.id)}
                className="w-3.5 h-3.5 rounded-xs border-slate-300 text-[#0077b5] focus:ring-[#0077b5] cursor-pointer"
              />

              {isEditing ? (
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={editingValue}
                    onChange={(e) => setEditingValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleConfirmEdit(category.id);
                      if (e.key === 'Escape') setEditingId(null);
                    }}
                    autoFocus
                    className="h-6 px-2 border border-[#0077b5] rounded-xs text-xs text-slate-700 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleConfirmEdit(category.id)}
                    className="px-2 py-0.5 bg-[#0077b5] text-white text-[10px] rounded-xs cursor-pointer"
                  >
                    OK
                  </button>
                </div>
              ) : (
                <label
                  onClick={() => handleToggleSelect(category.id)}
                  className="text-slate-600 cursor-pointer select-none"
                >
                  <span>{category.name}</span>
                  {category.isDefault && (
                    <span className="italic text-slate-400 ml-1">Padrão</span>
                  )}
                </label>
              )}
            </div>
          );
        })}
      </div>

      {/* Barra de Ações */}
      <div className="border-t border-b border-slate-200/90 py-3 my-3.5 pl-8 flex flex-wrap items-center gap-5">
        <div className="flex items-center gap-1 text-slate-600 text-xs">
          <CornerDownRight className="w-3.5 h-3.5 text-slate-500 stroke-[1.8]" />
          <span>Seleção</span>
        </div>

        <button
          type="button"
          onClick={handleStartEdit}
          className="inline-flex items-center gap-1 text-[10px] text-[#0088cc] hover:underline uppercase tracking-wide cursor-pointer"
        >
          <Pencil className="w-3 h-3 fill-[#0088cc] text-[#0088cc]" />
          <span>EDITAR</span>
        </button>

        <button
          type="button"
          onClick={handleToggleDefault}
          className="inline-flex items-center gap-1 text-[10px] text-[#0088cc] hover:underline uppercase tracking-wide cursor-pointer"
        >
          <CheckSquare className="w-3 h-3 fill-[#0088cc] text-white" />
          <span>PADRÃO</span>
        </button>

        <button
          type="button"
          onClick={handleDeleteSelected}
          className="inline-flex items-center gap-1 text-[10px] text-[#0088cc] hover:underline uppercase tracking-wide cursor-pointer"
        >
          <Trash2 className="w-3 h-3 text-[#0088cc]" />
          <span>EXCLUIR</span>
        </button>
      </div>

      {/* Inserção de Nova Categoria (Fundo da página) */}
      <form
        onSubmit={handleAddCategory}
        className="pt-4 pl-8 flex flex-wrap items-center gap-3"
      >
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Inserir uma nova categoria"
          className="w-56 h-8 px-2.5 bg-white border border-slate-200 rounded-xs text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#0077b5]"
        />

        <button
          type="submit"
          className="px-3.5 h-8 bg-[#0077b5] hover:bg-[#006399] text-white text-[10px] font-semibold uppercase tracking-wide rounded-xs shadow-2xs transition-colors cursor-pointer"
        >
          SALVAR CATEGORIA
        </button>
      </form>
    </div>
  );
}

