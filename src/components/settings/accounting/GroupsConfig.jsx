import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const INITIAL_UNGROUPED = {
  entradas: ['Test Shooting', 'Test Shooting'],
  saidas: ['Comissão Booker', 'Despesa Viagem'],
};

export default function GroupsConfig() {
  const [activeTab, setActiveTab] = useState('entradas'); // 'entradas' | 'saidas'
  const [groupName, setGroupName] = useState('');
  const [groupsByTab, setGroupsByTab] = useState({
    entradas: [],
    saidas: [],
  });

  const handleAddGroup = (e) => {
    e.preventDefault();
    const trimmed = groupName.trim();
    if (!trimmed) return;

    setGroupsByTab((prev) => ({
      ...prev,
      [activeTab]: [...(prev[activeTab] || []), trimmed],
    }));
    setGroupName('');
  };

  const ungroupedItems = INITIAL_UNGROUPED[activeTab] || [];
  const createdGroups = groupsByTab[activeTab] || [];

  return (
    <div className="pt-2">
      {/* Abas Pequenas no Topo: Entradas | Saídas */}
      <div className="border-b border-white/10 flex items-end mb-6">
        <button
          type="button"
          onClick={() => setActiveTab('entradas')}
          className={`px-3.5 py-2 text-xs transition-colors cursor-pointer ${
            activeTab === 'entradas'
              ? 'bg-[#1c1c1e] border-t border-l border-r border-white/10 rounded-t-xs -mb-px text-neutral-400'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Entradas
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('saidas')}
          className={`px-3.5 py-2 text-xs transition-colors cursor-pointer ${
            activeTab === 'saidas'
              ? 'bg-[#1c1c1e] border-t border-l border-r border-white/10 rounded-t-xs -mb-px text-neutral-400'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Saídas
        </button>
      </div>

      {/* Duas Caixas Abaixo: Categorias sem grupo e Nome do grupo */}
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-12 items-start">
        {/* Caixa Esquerda: Categorias sem grupo */}
        <div>
          <p className="text-xs text-neutral-400 mb-2">Categorias sem grupo</p>
          <div className="min-h-[380px] bg-[#1c1c1e] border border-white/10 rounded-xs p-2.5 space-y-1.5">
            {ungroupedItems.map((item, idx) => (
              <div
                key={`${item}-${idx}`}
                className="inline-block mr-1.5 px-2.5 py-1 bg-[#8c8c8c] text-white text-xs rounded-xs cursor-move select-none"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Caixa Direita: Input Nome do grupo + Botão '+' azul + Caixa abaixo */}
        <div className="max-w-md">
          <form onSubmit={handleAddGroup} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Nome do grupo"
              className="flex-1 h-8 px-2.5 bg-[#1c1c1e] border border-white/10 rounded-xs text-xs text-white placeholder:text-neutral-400 focus:outline-none focus:border-[#880E1B]"
            />
            <button
              type="submit"
              className="w-8 h-8 bg-[#880E1B] hover:bg-[#a31121] text-white rounded-xs flex items-center justify-center shadow-2xs transition-colors cursor-pointer shrink-0"
              title="Adicionar grupo"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </form>

          <div className="min-h-[380px] bg-[#1c1c1e] border border-white/10 rounded-xs p-3 space-y-2">
            {createdGroups.map((g, idx) => (
              <div
                key={`${g}-${idx}`}
                className="p-2 bg-[#161617] border border-white/10 rounded-xs text-xs font-medium text-white"
              >
                {g}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

