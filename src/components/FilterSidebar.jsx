import React, { useState } from 'react';
import {
  RotateCcw,
  Minimize2,
  Maximize2,
  Filter,
  Plus,
  Minus,
} from 'lucide-react';
import { INITIAL_NORMALIZED_FILTERS } from '../data/mockFilters';

export default function FilterSidebar() {
  const [filters, setFilters] = useState(INITIAL_NORMALIZED_FILTERS);
  const [talentNameSearch, setTalentNameSearch] = useState('');
  const [expandedMap, setExpandedMap] = useState(() => {
    const initial = {};
    INITIAL_NORMALIZED_FILTERS.forEach((f) => {
      initial[f.id] = f.defaultExpanded;
    });
    return initial;
  });

  const toggleExpand = (id) => {
    setExpandedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const next = {};
    filters.forEach((f) => {
      next[f.id] = true;
    });
    setExpandedMap(next);
  };

  const collapseAll = () => {
    const next = {};
    filters.forEach((f) => {
      next[f.id] = false;
    });
    setExpandedMap(next);
  };

  const resetFilters = () => {
    setFilters(INITIAL_NORMALIZED_FILTERS);
    setTalentNameSearch('');
  };

  const handleToggleOption = (categoryId, componentName, optionValue) => {
    setFilters((prev) =>
      prev.map((cat) => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          components: cat.components.map((comp) => {
            if (comp.name !== componentName) return comp;
            return {
              ...comp,
              options: comp.options.map((opt) =>
                opt.value === optionValue
                  ? { ...opt, selected: !opt.selected }
                  : opt
              ),
            };
          }),
        };
      })
    );
  };

  const handleToggleSelectAll = (categoryId, componentName, targetChecked) => {
    setFilters((prev) =>
      prev.map((cat) => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          components: cat.components.map((comp) => {
            if (comp.name !== componentName) return comp;
            return {
              ...comp,
              options: comp.options.map((opt) => ({
                ...opt,
                selected: targetChecked,
              })),
            };
          }),
        };
      })
    );
  };

  const hasActiveSelection = (category) =>
    category.components.some((comp) =>
      comp.options.some((opt) => opt.selected && opt.value !== '')
    );

  return (
    <aside className="w-full lg:w-[235px] shrink-0 select-none">
      <div className="bg-[#161617] border border-white/10 rounded-sm shadow-xs overflow-hidden">
        {/* Cabeçalho "FILTROS" com ações rápidas */}
        <div className="bg-[#880E1B] text-white px-3 py-2 flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wider uppercase">
            FILTROS
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={resetFilters}
              title="Limpar / Restaurar Filtros"
              className="p-1 bg-[#1c1c1e] hover:bg-[#161617] text-neutral-100 rounded-xs transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={collapseAll}
              title="Recolher todos os filtros"
              className="p-1 bg-[#1c1c1e] hover:bg-[#161617] text-neutral-100 rounded-xs transition-colors cursor-pointer"
            >
              <Minimize2 className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={expandAll}
              title="Expandir todos os filtros"
              className="p-1 bg-[#1c1c1e] hover:bg-[#161617] text-neutral-100 rounded-xs transition-colors cursor-pointer"
            >
              <Maximize2 className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Input rápido "Filtrar pelo nome do talento" */}
        <div className="p-2 bg-[#161617] border-b border-white/10">
          <input
            type="text"
            value={talentNameSearch}
            onChange={(e) => setTalentNameSearch(e.target.value)}
            placeholder="Filtrar pelo nome do talento"
            className="w-full px-2.5 py-1.5 bg-[#1c1c1e] text-xs text-white placeholder:text-neutral-400 border border-white/10 rounded-xs focus:border-[#880E1B] outline-none transition-colors"
          />
        </div>

        {/* Lista de Categorias de Filtro (Acordeão baseado no JSON) */}
        <div className="divide-y divide-white/10">
          {filters.map((category) => {
            const isExpanded = Boolean(expandedMap[category.id]);
            const isFiltered = hasActiveSelection(category);

            return (
              <div key={category.id} className="bg-[#161617]">
                {/* Barra de Título da Categoria */}
                <button
                  type="button"
                  onClick={() => toggleExpand(category.id)}
                  className="w-full px-3 py-2 flex items-center justify-between text-left hover:bg-[#1c1c1e] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    {isFiltered && (
                      <Filter className="w-3 h-3 text-[#E8AC51] fill-[#E8AC51] shrink-0" />
                    )}
                    <span className="text-xs font-bold text-white truncate">
                      {category.title}
                    </span>
                  </div>
                  <span className="w-4 h-4 rounded-xs bg-[#1c1c1e] border border-white/10 text-neutral-100 flex items-center justify-center shrink-0">
                    {isExpanded ? (
                      <Minus className="w-2.5 h-2.5 stroke-[3]" />
                    ) : (
                      <Plus className="w-2.5 h-2.5 stroke-[3]" />
                    )}
                  </span>
                </button>

                {/* Corpo de Opções da Categoria */}
                {isExpanded && (
                  <div className="bg-[#1c1c1e] px-3 py-2.5 space-y-2.5 border-t border-white/10">
                    {category.components.map((comp) => {
                      const allSelected =
                        comp.options.length > 0 &&
                        comp.options.every((opt) => opt.selected);

                      if (
                        comp.type === 'multiselect' ||
                        comp.type === 'abbreviatedMultiselect'
                      ) {
                        return (
                          <div key={comp.name} className="space-y-1.5">
                            {/* Opção "Selecionar Tudo" */}
                            {comp.allowSelectAll && (
                              <label className="flex items-center gap-2 text-xs font-semibold text-white cursor-pointer pb-1 border-b border-white/10">
                                <input
                                  type="checkbox"
                                  checked={allSelected}
                                  onChange={(e) =>
                                    handleToggleSelectAll(
                                      category.id,
                                      comp.name,
                                      e.target.checked
                                    )
                                  }
                                  className="w-3.5 h-3.5 rounded-xs accent-[#880E1B] cursor-pointer"
                                />
                                <span>{comp.label || 'Selecionar Tudo'}</span>
                              </label>
                            )}

                            {/* Lista de Checkboxes das Opções */}
                            <div className="space-y-1.5 pt-0.5 max-h-44 overflow-y-auto pr-1">
                              {comp.options.map((opt) => (
                                <label
                                  key={opt.value}
                                  className="flex items-center gap-2 text-xs text-neutral-400 hover:text-white cursor-pointer"
                                >
                                  <input
                                    type="checkbox"
                                    checked={opt.selected}
                                    onChange={() =>
                                      handleToggleOption(
                                        category.id,
                                        comp.name,
                                        opt.value
                                      )
                                    }
                                    className="w-3.5 h-3.5 rounded-xs accent-[#880E1B] cursor-pointer"
                                  />
                                  <span className="truncate">{opt.label}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        );
                      }

                      // Componentes tipo `select` ou `gallery_status` (ex: Gênero, Idade De/Até, Altura)
                      return (
                        <div key={comp.name} className="space-y-1">
                          {comp.label && (
                            <label className="block text-[11px] font-medium text-neutral-400">
                              {comp.label}
                            </label>
                          )}
                          <select
                            className="w-full px-2 py-1.5 bg-[#161617] border border-white/10 rounded-xs text-xs text-white focus:border-[#880E1B] outline-none"
                            defaultValue=""
                          >
                            <option value="">Selecionar...</option>
                            {comp.options.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

