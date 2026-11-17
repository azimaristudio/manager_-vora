import React, { useState, useEffect } from 'react';
import {
  CornerDownRight,
  Pencil,
  CheckSquare,
  Trash2,
} from 'lucide-react';

export default function SettingsListConfig({
  title = '',
  initialItems = [],
  inputType = 'checkbox', // 'checkbox' | 'radio'
  defaultTagText = 'Padrão', // 'Padrão' | 'default'
  showInfoBanner = false,
  infoText = '..',
  selectionLabel = 'Seleção',
  showDefaultAction = true,
  placeholder = 'Declare uma nova categoria',
  saveButtonLabel = 'SALVAR',
}) {
  const [items, setItems] = useState(initialItems);
  const [selectedIds, setSelectedIds] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState('');

  // Sincroniza o estado local quando o utilizador alterna entre secções que partilham este componente base
  useEffect(() => {
    setItems(initialItems);
    setSelectedIds([]);
    setNewItemName('');
    setEditingId(null);
    setEditingValue('');
  }, [initialItems]);

  const handleToggleSelect = (id) => {
    if (inputType === 'radio') {
      setSelectedIds([id]);
      return;
    }
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    const trimmed = newItemName.trim();
    if (!trimmed) return;

    const newEntry = {
      id: `item-${Date.now()}`,
      name: trimmed,
      isDefault: false,
    };

    setItems((prev) => [...prev, newEntry]);
    setNewItemName('');
  };

  const handleStartEdit = () => {
    if (selectedIds.length === 0) return;
    const firstId = selectedIds[0];
    const target = items.find((item) => item.id === firstId);
    if (target) {
      setEditingId(target.id);
      setEditingValue(target.name);
    }
  };

  const handleConfirmEdit = (id) => {
    const trimmed = editingValue.trim();
    if (trimmed) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, name: trimmed } : item
        )
      );
    }
    setEditingId(null);
    setEditingValue('');
  };

  const handleToggleDefault = () => {
    if (selectedIds.length === 0) return;
    setItems((prev) =>
      prev.map((item) =>
        selectedIds.includes(item.id)
          ? { ...item, isDefault: !item.isDefault }
          : item
      )
    );
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    setItems((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
    setSelectedIds([]);
  };

  return (
    <div className="pt-2">
      {/* Título opcional da secção seguido de linha separadora fina (Imagens 88 e 89) */}
      {title && (
        <div className="pb-2.5 mb-5 border-b border-white/10">
          <h2 className="text-[19px] font-normal text-neutral-400">{title}</h2>
        </div>
      )}

      <div className="max-w-2xl">
        {/* Banner superior opcional com ícone azul de informação (i) */}
        {showInfoBanner && (
          <div className="pb-4 mb-4 border-b border-white/10 pl-6 flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-[#E8AC51] text-white flex items-center justify-center shrink-0 font-serif font-bold text-base leading-none shadow-2xs">
              i
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed pt-0.5">
              {infoText}
            </p>
          </div>
        )}

      {/* Lista de Itens (Checkboxes ou Radio Buttons) */}
      {items.length > 0 && (
        <div className="space-y-2.5 pl-6 mb-3.5">
          {items.map((item) => {
            const isChecked = selectedIds.includes(item.id);
            const isEditing = editingId === item.id;

            return (
              <div key={item.id} className="flex items-center gap-1.5 text-xs">
                <input
                  type={inputType === 'radio' ? 'radio' : 'checkbox'}
                  name="settings-list-selection"
                  checked={isChecked}
                  onChange={() => handleToggleSelect(item.id)}
                  className="w-3.5 h-3.5 border-white/10 text-[#E8AC51] focus:ring-[#880E1B] cursor-pointer"
                />

                {isEditing ? (
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={editingValue}
                      onChange={(e) => setEditingValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleConfirmEdit(item.id);
                        if (e.key === 'Escape') setEditingId(null);
                      }}
                      autoFocus
                      className="h-6 px-2 border border-[#880E1B] rounded-xs text-xs text-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleConfirmEdit(item.id)}
                      className="px-2 py-0.5 bg-[#880E1B] text-white text-[10px] rounded-xs cursor-pointer"
                    >
                      OK
                    </button>
                  </div>
                ) : (
                  <label
                    onClick={() => handleToggleSelect(item.id)}
                    className="text-neutral-400 cursor-pointer select-none"
                  >
                    <span>{item.name}</span>
                    {item.isDefault && (
                      <span className="italic text-neutral-400 ml-1">
                        {defaultTagText}
                      </span>
                    )}
                  </label>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Barra de Ações: Seleção / EDITAR / PADRÃO / EXCLUIR */}
      <div className="border-t border-b border-white/10 py-3 my-3.5 pl-8 flex flex-wrap items-center gap-5">
        <div className="flex items-center gap-1 text-neutral-400 text-xs">
          <CornerDownRight className="w-3.5 h-3.5 text-neutral-400 stroke-[1.8]" />
          <span>{selectionLabel}</span>
        </div>

        <button
          type="button"
          onClick={handleStartEdit}
          className="inline-flex items-center gap-1 text-[10px] text-[#E8AC51] hover:underline uppercase tracking-wide cursor-pointer"
        >
          <Pencil className="w-3 h-3 fill-[#E8AC51] text-[#E8AC51]" />
          <span>EDITAR</span>
        </button>

        {showDefaultAction && (
          <button
            type="button"
            onClick={handleToggleDefault}
            className="inline-flex items-center gap-1 text-[10px] text-[#E8AC51] hover:underline uppercase tracking-wide cursor-pointer"
          >
            <CheckSquare className="w-3 h-3 fill-[#E8AC51] text-white" />
            <span>PADRÃO</span>
          </button>
        )}

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
        onSubmit={handleAddItem}
        className="pt-4 pl-8 flex flex-wrap items-center gap-3"
      >
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder={placeholder}
          className="w-56 h-8 px-2.5 bg-[#1c1c1e] border border-white/10 rounded-xs text-xs text-white placeholder:text-neutral-400 focus:outline-none focus:border-[#880E1B]"
        />

        <button
          type="submit"
          className="px-3.5 h-8 bg-[#880E1B] hover:bg-[#a31121] text-white text-[10px] font-semibold uppercase tracking-wide rounded-xs shadow-2xs transition-colors cursor-pointer"
        >
          {saveButtonLabel}
        </button>
      </form>
      </div>
    </div>
  );
}

