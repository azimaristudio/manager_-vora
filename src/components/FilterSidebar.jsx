import React, { useMemo, useState } from 'react';
import {
  SlidersHorizontal,
  Search,
  ChevronDown,
  ChevronRight,
  X,
  Building2,
  CircleDot,
  Tag,
  Bookmark,
  User,
  Users,
  Calendar,
  Ruler,
  Globe,
  Palette,
  Eye,
  Sparkles,
  Waves,
  Shirt,
  Footprints,
  Image,
  Star,
  Languages,
  MapPin,
  BadgeCheck,
  FileText,
  Filter,
} from 'lucide-react';
import { INITIAL_NORMALIZED_FILTERS } from '../data/mockFilters';

const CATEGORY_ICONS = {
  office: Building2,
  status: CircleDot,
  category: Tag,
  tags: Bookmark,
  gender: User,
  gender_identity: Users,
  age: Calendar,
  height: Ruler,
  ethnicity: Globe,
  skin_tone: Palette,
  eyes: Eye,
  hair: Sparkles,
  hair_kind: Waves,
  shirt: Shirt,
  shoes: Footprints,
  jeans: SlidersHorizontal,
  talent_gallery: Image,
  skills: Star,
  languages: Languages,
  cities: MapPin,
  licensing: BadgeCheck,
  infosheet: FileText,
};

const normalizeText = (value) =>
  String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

export function cloneFilters(source = INITIAL_NORMALIZED_FILTERS, clearAll = false) {
  return source.map((cat) => ({
    ...cat,
    components: cat.components.map((comp) => ({
      ...comp,
      options: comp.options.map((opt) => ({
        ...opt,
        selected: clearAll ? false : Boolean(opt.selected),
      })),
    })),
  }));
}

function countMatchingTalents(talents, categoryId, optionValue) {
  if (!Array.isArray(talents) || talents.length === 0) return 0;

  return talents.filter((talent) => {
    const attrs = talent.attributes || {};
    const info = talent.overview?.info || {};

    switch (categoryId) {
      case 'office': {
        const officeId = String(talent.officeId || '2848');
        return officeId === String(optionValue);
      }
      case 'status': {
        const map = { '1': 'Ativo', '-1': 'Stand by', '0': 'Inativo' };
        return talent.status === map[String(optionValue)];
      }
      case 'category': {
        const map = { '1': 'Modelo', '2': 'Ator', '3': 'Celebridade' };
        const target = map[String(optionValue)];
        const cats = Array.isArray(talent.categories) && talent.categories.length > 0
          ? talent.categories
          : [talent.category].filter(Boolean);
        return cats.some((c) => normalizeText(c) === normalizeText(target));
      }
      case 'tags': {
        const tags = Array.isArray(attrs.tags) ? attrs.tags : [];
        if (String(optionValue) === '0') return tags.length === 0;
        return tags.some((t) => normalizeText(t) === normalizeText(optionValue));
      }
      case 'ethnicity':
        return normalizeText(attrs.ethnicity) === normalizeText(optionValue);
      case 'skin_tone':
        return String(attrs.skinTone || '') === String(optionValue);
      case 'eyes':
        return normalizeText(attrs.eyes || info.olhos) === normalizeText(optionValue);
      case 'hair':
        return normalizeText(attrs.hair || info.cabelo) === normalizeText(optionValue);
      case 'hair_kind':
        return normalizeText(attrs.hairKind) === normalizeText(optionValue);
      case 'skills': {
        const skills = Array.isArray(attrs.skills) ? attrs.skills : [];
        return skills.some((s) => String(s) === String(optionValue));
      }
      case 'languages': {
        const langs = Array.isArray(attrs.languages) ? attrs.languages : [];
        return langs.some((l) => normalizeText(l) === normalizeText(optionValue));
      }
      case 'licensing':
        return String(attrs.licensing ?? '') === String(optionValue);
      default:
        return false;
    }
  }).length;
}

export default function FilterSidebar({
  filters: controlledFilters,
  onChangeFilters,
  onResetFilters,
  talents = [],
  className = '',
  onCloseMobile,
}) {
  const [internalFilters, setInternalFilters] = useState(() =>
    cloneFilters(INITIAL_NORMALIZED_FILTERS)
  );
  const [filterSearch, setFilterSearch] = useState('');
  const [expandedMap, setExpandedMap] = useState(() => {
    const initial = {};
    INITIAL_NORMALIZED_FILTERS.forEach((f) => {
      initial[f.id] = f.defaultExpanded;
    });
    return initial;
  });

  const filters = controlledFilters || internalFilters;

  const updateFilters = (updater) => {
    const next = typeof updater === 'function' ? updater(filters) : updater;
    if (onChangeFilters) {
      onChangeFilters(next);
    } else {
      setInternalFilters(next);
    }
  };

  const toggleExpand = (id) => {
    setExpandedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const resetFilters = () => {
    setFilterSearch('');
    if (onResetFilters) {
      onResetFilters();
    } else {
      setInternalFilters(cloneFilters(INITIAL_NORMALIZED_FILTERS, true));
    }
  };

  const handleToggleOption = (categoryId, componentName, optionValue) => {
    updateFilters((prev) =>
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
    updateFilters((prev) =>
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

  const handleSelectChange = (categoryId, componentName, selectedValue) => {
    updateFilters((prev) =>
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
                selected: selectedValue !== '' && opt.value === selectedValue,
              })),
            };
          }),
        };
      })
    );
  };

  const countCategoryActive = (category) =>
    category.components.reduce(
      (acc, comp) =>
        acc + comp.options.filter((opt) => opt.selected && opt.value !== '').length,
      0
    );

  const totalActiveCount = useMemo(
    () => filters.reduce((sum, cat) => sum + countCategoryActive(cat), 0),
    [filters]
  );

  const normalizedQuery = normalizeText(filterSearch);

  const visibleCategories = useMemo(() => {
    if (!normalizedQuery) return filters;
    return filters.filter((cat) => {
      if (normalizeText(cat.title).includes(normalizedQuery)) return true;
      return cat.components.some((comp) =>
        comp.options.some((opt) => normalizeText(opt.label).includes(normalizedQuery))
      );
    });
  }, [filters, normalizedQuery]);

  return (
    <aside className={`w-full select-none ${className}`}>
      <div className="bg-[#1c1c1e] border border-white/10 rounded-xl shadow-md overflow-hidden">
        {/* Cabeçalho Filtros */}
        <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between gap-2 bg-[#161617]/60">
          <div className="flex items-center gap-2 min-w-0">
            <SlidersHorizontal className="w-4 h-4 text-[#E8AC51] shrink-0" />
            <span className="text-sm font-semibold text-white tracking-tight">
              Filtros
            </span>
            {totalActiveCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-[#880E1B] text-white text-[10px] font-semibold tabular-nums">
                {totalActiveCount}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={resetFilters}
              className="text-[11px] font-medium text-[#E8AC51] hover:text-[#f3c474] transition-colors cursor-pointer"
            >
              Limpar filtros
            </button>
            {onCloseMobile && (
              <button
                type="button"
                onClick={onCloseMobile}
                aria-label="Fechar filtros"
                className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Busca interna nas categorias/opções */}
        <div className="p-3 border-b border-white/10">
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 pointer-events-none" />
            <input
              type="text"
              value={filterSearch}
              onChange={(e) => setFilterSearch(e.target.value)}
              placeholder="Buscar filtro ou opção..."
              className="w-full pl-8 pr-7 py-1.5 bg-[#161617] text-xs text-white placeholder:text-neutral-500 border border-white/10 rounded-lg focus:border-[#E8AC51]/60 outline-none transition-colors"
            />
            {filterSearch && (
              <button
                type="button"
                onClick={() => setFilterSearch('')}
                aria-label="Limpar busca de filtros"
                className="absolute right-2 text-neutral-500 hover:text-white cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Lista Acordeão com todas as 22 categorias */}
        <div className="divide-y divide-white/10 max-h-[calc(100vh-250px)] overflow-y-auto">
          {visibleCategories.length === 0 ? (
            <div className="px-4 py-6 text-center text-xs text-neutral-400">
              Nenhuma categoria encontrada.
            </div>
          ) : (
            visibleCategories.map((category) => {
              const isExpanded =
                normalizedQuery.length > 0 || Boolean(expandedMap[category.id]);
              const activeCount = countCategoryActive(category);
              const Icon = CATEGORY_ICONS[category.id] || Filter;

              return (
                <div key={category.id} className="bg-[#1c1c1e]">
                  <button
                    type="button"
                    onClick={() => toggleExpand(category.id)}
                    className="w-full px-3.5 py-2.5 flex items-center justify-between gap-2 text-left hover:bg-white/[0.03] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon
                        className={`w-3.5 h-3.5 shrink-0 ${
                          activeCount > 0 ? 'text-[#E8AC51]' : 'text-neutral-400'
                        }`}
                      />
                      <span className="text-xs font-medium text-neutral-100 truncate">
                        {category.title}
                      </span>
                      {activeCount > 0 && (
                        <span className="px-1.5 py-0.2 rounded-full bg-[#880E1B]/25 border border-[#880E1B]/50 text-[10px] font-semibold text-[#E8AC51] tabular-nums">
                          {activeCount}
                        </span>
                      )}
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="bg-[#161617]/60 px-3.5 py-2.5 space-y-2.5 border-t border-white/10">
                      {category.components.map((comp) => {
                        const allSelected =
                          comp.options.length > 0 &&
                          comp.options.every((opt) => opt.selected);

                        if (
                          comp.type === 'multiselect' ||
                          comp.type === 'abbreviatedMultiselect'
                        ) {
                          const filteredOptions = normalizedQuery
                            ? comp.options.filter(
                                (opt) =>
                                  normalizeText(category.title).includes(
                                    normalizedQuery
                                  ) ||
                                  normalizeText(opt.label).includes(normalizedQuery)
                              )
                            : comp.options;

                          return (
                            <div key={comp.name} className="space-y-1.5">
                              {comp.allowSelectAll && (
                                <label className="flex items-center gap-2 text-xs font-medium text-neutral-200 cursor-pointer pb-1.5 border-b border-white/10">
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

                              <div className="space-y-1.5 pt-0.5 max-h-44 overflow-y-auto pr-1">
                                {filteredOptions.map((opt) => {
                                  const matchCount = countMatchingTalents(
                                    talents,
                                    category.id,
                                    opt.value
                                  );

                                  return (
                                    <label
                                      key={opt.value}
                                      className="flex items-center justify-between gap-2 text-xs text-neutral-400 hover:text-white cursor-pointer py-0.5"
                                    >
                                      <span className="flex items-center gap-2 min-w-0">
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
                                          className="w-3.5 h-3.5 rounded-xs accent-[#880E1B] cursor-pointer shrink-0"
                                        />
                                        <span className="truncate">{opt.label}</span>
                                      </span>
                                      {talents.length > 0 && (
                                        <span className="text-[10px] text-neutral-500 tabular-nums shrink-0">
                                          {matchCount}
                                        </span>
                                      )}
                                    </label>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        }

                        const currentSelected = comp.options.find(
                          (opt) => opt.selected && opt.value !== ''
                        );

                        return (
                          <div key={comp.name} className="space-y-1">
                            {comp.label && (
                              <label className="block text-[11px] font-medium text-neutral-400">
                                {comp.label}
                              </label>
                            )}
                            <select
                              value={currentSelected?.value || ''}
                              onChange={(e) =>
                                handleSelectChange(
                                  category.id,
                                  comp.name,
                                  e.target.value
                                )
                              }
                              className="w-full px-2.5 py-1.5 bg-[#161617] border border-white/10 rounded-lg text-xs text-white focus:border-[#880E1B] outline-none cursor-pointer"
                            >
                              <option value="">Selecionar...</option>
                              {comp.options
                                .filter((opt) => opt.value !== '')
                                .map((opt) => (
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
            })
          )}
        </div>
      </div>
    </aside>
  );
}
