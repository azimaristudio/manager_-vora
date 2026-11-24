import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Users,
  UserCheck,
  Clock,
  Sparkles,
  CheckSquare,
  Search,
  Plus,
  LayoutGrid,
  List,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  X,
  Package,
  Download,
  Trash2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import FilterSidebar, { cloneFilters } from '../components/FilterSidebar';
import TalentCard, { formatTitleCase } from '../components/talents/TalentCard';
import TalentList from '../components/talents/TalentList';
import TalentOverviewModal from '../components/talents/TalentOverviewModal';
import { TalentCardSkeleton } from '../components/ui/Skeleton';
import { INITIAL_NORMALIZED_FILTERS } from '../data/mockFilters';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const PAGE_SIZE = 12;

const normalizeText = (value) =>
  String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

const STATUS_MAP_BY_OPTION = {
  '1': 'Ativo',
  '-1': 'Stand by',
  '0': 'Inativo',
};

const CATEGORY_MAP_BY_OPTION = {
  '1': 'Modelo',
  '2': 'Ator',
  '3': 'Celebridade',
};

function createDefaultTalentosFilters() {
  return INITIAL_NORMALIZED_FILTERS.map((cat) => {
    const clearDefaults = cat.id === 'status';
    return {
      ...cat,
      components: cat.components.map((comp) => ({
        ...comp,
        options: comp.options.map((opt) => ({
          ...opt,
          selected: clearDefaults ? false : Boolean(opt.selected),
        })),
      })),
    };
  });
}

function matchesFilterCategory(talent, category) {
  const attrs = talent.attributes || {};
  const info = talent.overview?.info || {};
  const overview = talent.overview || {};

  if (category.id === 'age') {
    const fromComp = category.components.find((c) => c.name === 'from');
    const toComp = category.components.find((c) => c.name === 'to');
    const fromOpt = fromComp?.options.find((o) => o.selected && o.value !== '');
    const toOpt = toComp?.options.find((o) => o.selected && o.value !== '');
    if (!fromOpt && !toOpt) return true;
    const age = Number(attrs.age);
    if (!Number.isFinite(age)) return false;
    if (fromOpt && age < Number(fromOpt.value)) return false;
    if (toOpt && age > Number(toOpt.value)) return false;
    return true;
  }

  if (category.id === 'height') {
    const fromComp = category.components.find((c) => c.name === 'from');
    const toComp = category.components.find((c) => c.name === 'to');
    const fromOpt = fromComp?.options.find((o) => o.selected && o.value !== '');
    const toOpt = toComp?.options.find((o) => o.selected && o.value !== '');
    if (!fromOpt && !toOpt) return true;
    const height = Number(attrs.height);
    if (!Number.isFinite(height)) return false;
    if (fromOpt && height < Number(fromOpt.value)) return false;
    if (toOpt && height > Number(toOpt.value)) return false;
    return true;
  }

  for (const comp of category.components) {
    const selectedValues = comp.options
      .filter((opt) => opt.selected && opt.value !== '')
      .map((opt) => String(opt.value));

    if (selectedValues.length === 0) continue;

    switch (category.id) {
      case 'office': {
        const officeId = String(talent.officeId || '2848');
        if (!selectedValues.includes(officeId)) return false;
        break;
      }
      case 'status': {
        const allowed = selectedValues.map((v) => STATUS_MAP_BY_OPTION[v]);
        if (!allowed.includes(talent.status || 'Ativo')) return false;
        break;
      }
      case 'category': {
        const allowed = selectedValues.map((v) =>
          normalizeText(CATEGORY_MAP_BY_OPTION[v])
        );
        const talentCats =
          Array.isArray(talent.categories) && talent.categories.length > 0
            ? talent.categories
            : [talent.category || 'Modelo'];
        const hasMatch = talentCats.some((c) =>
          allowed.includes(normalizeText(c))
        );
        if (!hasMatch) return false;
        break;
      }
      case 'tags': {
        const talentTags = Array.isArray(attrs.tags) ? attrs.tags : [];
        const hasMatch = selectedValues.some((val) =>
          val === '0'
            ? talentTags.length === 0
            : talentTags.some((t) => normalizeText(t) === normalizeText(val))
        );
        if (!hasMatch) return false;
        break;
      }
      case 'gender': {
        if (!selectedValues.includes(String(attrs.gender || ''))) return false;
        break;
      }
      case 'gender_identity': {
        if (!selectedValues.includes(String(attrs.genderIdentity || ''))) {
          return false;
        }
        break;
      }
      case 'ethnicity': {
        if (!selectedValues.includes(String(attrs.ethnicity || ''))) return false;
        break;
      }
      case 'skin_tone': {
        if (!selectedValues.includes(String(attrs.skinTone || ''))) return false;
        break;
      }
      case 'eyes': {
        const val = normalizeText(attrs.eyes || info.olhos);
        if (!selectedValues.some((s) => normalizeText(s) === val)) return false;
        break;
      }
      case 'hair': {
        const val = normalizeText(attrs.hair || info.cabelo);
        if (!selectedValues.some((s) => normalizeText(s) === val)) return false;
        break;
      }
      case 'hair_kind': {
        if (!selectedValues.includes(String(attrs.hairKind || ''))) return false;
        break;
      }
      case 'shirt': {
        if (!selectedValues.includes(String(attrs.shirt || ''))) return false;
        break;
      }
      case 'shoes': {
        const shoesVal = Number(attrs.sapato);
        if (!Number.isFinite(shoesVal) || shoesVal < Number(selectedValues[0])) {
          return false;
        }
        break;
      }
      case 'jeans': {
        const manequimVal = Number(attrs.manequim);
        if (
          !Number.isFinite(manequimVal) ||
          manequimVal < Number(selectedValues[0])
        ) {
          return false;
        }
        break;
      }
      case 'talent_gallery': {
        const galleryItems = Array.isArray(overview[comp.name])
          ? overview[comp.name]
          : [];
        const target = selectedValues[0];
        if (target === '1' && galleryItems.length === 0) return false;
        if (target === '0' && galleryItems.length > 0) return false;
        break;
      }
      case 'skills': {
        const skills = Array.isArray(attrs.skills) ? attrs.skills : [];
        if (!selectedValues.some((val) => skills.includes(val))) return false;
        break;
      }
      case 'languages': {
        const langs = Array.isArray(attrs.languages) ? attrs.languages : [];
        if (
          !selectedValues.some((val) =>
            langs.some((l) => normalizeText(l) === normalizeText(val))
          )
        ) {
          return false;
        }
        break;
      }
      case 'cities': {
        if (comp.name === 'country' && !selectedValues.includes(String(attrs.country || '30'))) {
          return false;
        }
        if (comp.name === 'state' && !selectedValues.includes(String(attrs.state || ''))) {
          return false;
        }
        break;
      }
      case 'licensing': {
        if (!selectedValues.includes(String(attrs.licensing ?? ''))) return false;
        break;
      }
      case 'infosheet': {
        if (!selectedValues.includes(String(attrs.infosheet ?? ''))) return false;
        break;
      }
      default:
        break;
    }
  }

  return true;
}

export default function Talentos({
  talents = [],
  onOpenAddTalent,
  isLoading: externalLoading,
  error: loadError,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [filters, setFilters] = useState(createDefaultTalentosFilters);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('CARDS');
  const [activeLetter, setActiveLetter] = useState('ALL');
  const [sortBy, setSortBy] = useState('updated_desc');
  const [selectedIds, setSelectedIds] = useState([]);
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [overviewState, setOverviewState] = useState({
    talent: null,
    tab: 'Info',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState(
    () => location.state?.toast || null
  );
  const actionsRef = useRef(null);

  const isLoading = Boolean(externalLoading);

  useEffect(() => {
    if (location.state?.toast) {
      setToastMessage(location.state.toast);
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.pathname, location.state, navigate]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 6000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  useEffect(() => {
    if (!isActionsOpen) return;
    const handleOutside = (event) => {
      if (actionsRef.current && !actionsRef.current.contains(event.target)) {
        setIsActionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [isActionsOpen]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeLetter, filters, sortBy]);

  const kpiStats = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    let ativos = 0;
    let standby = 0;
    let novosMes = 0;

    talents.forEach((t) => {
      if (t.status === 'Ativo') ativos += 1;
      else if (t.status === 'Stand by') standby += 1;

      if (t.isNewThisMonth) {
        novosMes += 1;
      } else if (t.createdAt) {
        const d = new Date(t.createdAt);
        if (
          !Number.isNaN(d.getTime()) &&
          d.getMonth() === currentMonth &&
          d.getFullYear() === currentYear
        ) {
          novosMes += 1;
        }
      }
    });

    return {
      total: talents.length,
      ativos,
      standby,
      novosMes,
      selecionados: selectedIds.length,
    };
  }, [talents, selectedIds.length]);

  const filteredTalents = useMemo(() => {
    const query = normalizeText(searchQuery);

    const list = talents.filter((talent) => {
      if (!filters.every((cat) => matchesFilterCategory(talent, cat))) {
        return false;
      }

      const stage = normalizeText(talent.stageName || talent.fullName);
      const firstChar = stage.charAt(0).toUpperCase();

      if (activeLetter === '#') {
        if (/^[A-Z]$/.test(firstChar)) return false;
      } else if (activeLetter !== 'ALL') {
        if (firstChar !== activeLetter) return false;
      }

      if (query) {
        const searchable = [
          talent.stageName,
          talent.fullName,
          talent.code,
          talent.category,
          ...(Array.isArray(talent.categories) ? talent.categories : []),
          talent.officeName,
          talent.officeSubtitle,
          talent.attributes?.city,
          ...(Array.isArray(talent.attributes?.tags) ? talent.attributes.tags : []),
        ]
          .map(normalizeText)
          .join(' ');
        if (!searchable.includes(query)) return false;
      }

      return true;
    });

    const sorted = [...list];
    sorted.sort((a, b) => {
      const nameA = normalizeText(a.stageName || a.fullName);
      const nameB = normalizeText(b.stageName || b.fullName);
      if (sortBy === 'name_asc') return nameA.localeCompare(nameB);
      if (sortBy === 'name_desc') return nameB.localeCompare(nameA);
      if (sortBy === 'status') {
        return String(a.status || '').localeCompare(String(b.status || ''));
      }
      if (sortBy === 'newest') {
        return (
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime()
        );
      }
      return (
        new Date(b.updatedAt || b.createdAt || 0).getTime() -
        new Date(a.updatedAt || a.createdAt || 0).getTime()
      );
    });

    return sorted;
  }, [talents, filters, activeLetter, searchQuery, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredTalents.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedTalents = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filteredTalents.slice(start, start + PAGE_SIZE);
  }, [filteredTalents, safePage]);

  const allFilteredSelected =
    filteredTalents.length > 0 &&
    filteredTalents.every((t) => selectedIds.includes(t.id));

  const toggleSelectTalent = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (allFilteredSelected) {
      const visibleSet = new Set(filteredTalents.map((t) => t.id));
      setSelectedIds((prev) => prev.filter((id) => !visibleSet.has(id)));
    } else {
      const merged = new Set([
        ...selectedIds,
        ...filteredTalents.map((t) => t.id),
      ]);
      setSelectedIds(Array.from(merged));
    }
  };

  const handleResetAllFilters = () => {
    setFilters(cloneFilters(INITIAL_NORMALIZED_FILTERS, true));
    setSearchQuery('');
    setActiveLetter('ALL');
  };

  const handleQuickStatusFilter = (statusValue) => {
    setFilters((prev) =>
      prev.map((cat) => {
        if (cat.id !== 'status') return cat;
        return {
          ...cat,
          components: cat.components.map((comp) => ({
            ...comp,
            options: comp.options.map((opt) => ({
              ...opt,
              selected: statusValue ? String(opt.value) === String(statusValue) : false,
            })),
          })),
        };
      })
    );
  };

  const handleAddTalent = () => {
    if (onOpenAddTalent) {
      onOpenAddTalent();
    } else {
      navigate('/talentos/novo');
    }
  };

  const handleExportCsv = () => {
    const targets =
      selectedIds.length > 0
        ? talents.filter((t) => selectedIds.includes(t.id))
        : filteredTalents;
    const rows = [
      ['Codigo', 'Nome Artistico', 'Nome Completo', 'Status', 'Categorias', 'Unidade'],
      ...targets.map((t) => [
        t.code || '',
        formatTitleCase(t.stageName),
        formatTitleCase(t.fullName),
        t.status || 'Ativo',
        (t.categories || [t.category || 'Modelo']).join(' / '),
        `${t.officeName || 'ÉVORA'} ${t.officeSubtitle || 'MODELS'}`,
      ]),
    ];
    const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'talentos-evora.csv';
    link.click();
    URL.revokeObjectURL(url);
    setIsActionsOpen(false);
  };

  const startCount =
    filteredTalents.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const endCount = Math.min(safePage * PAGE_SIZE, filteredTalents.length);

  return (
    <div className="min-h-screen bg-[#161617] text-white">
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 max-w-md bg-[#1c1c1e] text-white px-4 py-3.5 rounded-xl shadow-2xl border border-white/10 border-l-4 border-l-[#E8AC51] flex items-start gap-3 animate-content-fade">
          <CheckCircle2 className="w-5 h-5 text-[#E8AC51] shrink-0 mt-0.5" />
          <div className="flex-1 text-xs">
            <p className="font-semibold text-white">{toastMessage.title}</p>
            {toastMessage.subtitle && (
              <p className="text-neutral-400 mt-0.5 leading-relaxed">
                {toastMessage.subtitle}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-neutral-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-6 space-y-5">
        {/* 1. Header & KPI Strip */}
        <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-1 self-stretch min-h-[48px] bg-[#E8AC51] rounded-full shrink-0" />
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                Talentos
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
                Gestão de talentos da Évora Models
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            <button
              type="button"
              onClick={() => handleQuickStatusFilter(null)}
              className="bg-[#1c1c1e] border border-white/10 hover:border-[#E8AC51]/45 rounded-xl px-3.5 py-2.5 flex items-center gap-3 text-left transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-[#E8AC51]/10 border border-[#E8AC51]/25 flex items-center justify-center text-[#E8AC51] shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-lg font-bold text-white leading-none tabular-nums">
                  {kpiStats.total}
                </div>
                <div className="text-[11px] text-neutral-400 truncate mt-1">
                  Total de talentos
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickStatusFilter('1')}
              className="bg-[#1c1c1e] border border-white/10 hover:border-[#E8AC51]/45 rounded-xl px-3.5 py-2.5 flex items-center gap-3 text-left transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-[#E8AC51]/10 border border-[#E8AC51]/25 flex items-center justify-center text-[#E8AC51] shrink-0">
                <UserCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-lg font-bold text-white leading-none tabular-nums">
                  {kpiStats.ativos}
                </div>
                <div className="text-[11px] text-neutral-400 truncate mt-1">
                  Ativos
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickStatusFilter('-1')}
              className="bg-[#1c1c1e] border border-white/10 hover:border-[#E8AC51]/45 rounded-xl px-3.5 py-2.5 flex items-center gap-3 text-left transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-[#E8AC51]/10 border border-[#E8AC51]/25 flex items-center justify-center text-[#E8AC51] shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-lg font-bold text-white leading-none tabular-nums">
                  {kpiStats.standby}
                </div>
                <div className="text-[11px] text-neutral-400 truncate mt-1">
                  Stand by
                </div>
              </div>
            </button>

            <div className="bg-[#1c1c1e] border border-white/10 rounded-xl px-3.5 py-2.5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#E8AC51]/10 border border-[#E8AC51]/25 flex items-center justify-center text-[#E8AC51] shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-lg font-bold text-white leading-none tabular-nums">
                  {kpiStats.novosMes}
                </div>
                <div className="text-[11px] text-neutral-400 truncate mt-1">
                  Novos no mês
                </div>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 bg-[#1c1c1e] border border-white/10 rounded-xl px-3.5 py-2.5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#E8AC51]/10 border border-[#E8AC51]/25 flex items-center justify-center text-[#E8AC51] shrink-0">
                <CheckSquare className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-lg font-bold text-[#E8AC51] leading-none tabular-nums">
                  {kpiStats.selecionados}
                </div>
                <div className="text-[11px] text-neutral-400 truncate mt-1">
                  Selecionados
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* 2. Busca + Ação Primária */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex-1 relative flex items-center bg-[#1c1c1e] border border-white/10 rounded-xl focus-within:border-[#E8AC51]/60 transition-colors">
            <Search className="w-4 h-4 text-neutral-400 ml-3.5 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar talento por nome, apelido, código ou palavra-chave..."
              className="w-full px-3 py-2.5 text-sm text-white placeholder:text-neutral-500 bg-transparent outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Limpar busca"
                className="mr-3 p-1 text-neutral-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1c1c1e] border border-white/10 hover:border-[#E8AC51]/50 rounded-xl text-sm font-medium text-[#E8AC51] transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filtros</span>
            </button>

            <button
              type="button"
              onClick={handleAddTalent}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#E8AC51] hover:bg-[#d99b3f] text-[#161617] text-sm font-semibold shadow-md transition-colors cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Adicionar talento</span>
            </button>
          </div>
        </div>

        {/* 3. Barra de Visualização (Cartões / Lista) & Filtro Alfabético */}
        <div className="bg-[#1c1c1e] border border-white/10 rounded-xl px-3 py-2.5 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="bg-[#161617] p-1 rounded-lg border border-white/10 inline-flex items-center gap-1 self-start">
            <button
              type="button"
              onClick={() => setViewMode('CARDS')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                viewMode === 'CARDS'
                  ? 'bg-[#880E1B] text-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cartões</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('LIST')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                viewMode === 'LIST'
                  ? 'bg-[#880E1B] text-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Lista</span>
            </button>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-0.5 lg:pb-0">
            <button
              type="button"
              onClick={() => setActiveLetter('ALL')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
                activeLetter === 'ALL'
                  ? 'bg-[#E8AC51] text-[#161617]'
                  : 'bg-[#E8AC51]/15 text-[#E8AC51] border border-[#E8AC51]/35 hover:bg-[#E8AC51]/25'
              }`}
            >
              Todos
            </button>
            <button
              type="button"
              onClick={() => setActiveLetter('#')}
              className={`w-7 h-7 rounded-md text-xs font-medium transition-colors cursor-pointer shrink-0 flex items-center justify-center ${
                activeLetter === '#'
                  ? 'bg-[#880E1B] text-white font-semibold'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              #
            </button>
            {ALPHABET.map((letter) => (
              <button
                key={letter}
                type="button"
                onClick={() => setActiveLetter(letter)}
                className={`w-7 h-7 rounded-md text-xs font-medium transition-colors cursor-pointer shrink-0 flex items-center justify-center ${
                  activeLetter === letter
                    ? 'bg-[#880E1B] text-white font-semibold'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Barra de Seleção em Massa & Ordenação */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-1">
          <div className="flex flex-wrap items-center gap-3">
            <label className="inline-flex items-center gap-2 text-xs text-neutral-200 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={allFilteredSelected}
                onChange={toggleSelectAll}
                className="w-4 h-4 rounded-xs accent-[#880E1B] cursor-pointer"
              />
              <span>Selecionar tudo</span>
            </label>

            <span className="text-xs text-neutral-400 tabular-nums">
              <strong className="text-[#E8AC51] font-semibold">
                {selectedIds.length}
              </strong>{' '}
              {selectedIds.length === 1 ? 'selecionado' : 'selecionados'}
            </span>

            <div ref={actionsRef} className="relative">
              <button
                type="button"
                onClick={() => setIsActionsOpen((prev) => !prev)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E8AC51]/60 text-[#E8AC51] hover:bg-[#E8AC51]/10 text-xs font-medium transition-colors cursor-pointer"
              >
                <span>Ações</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {isActionsOpen && (
                <div className="absolute left-0 top-9 z-30 w-56 bg-[#1c1c1e] border border-white/15 rounded-xl shadow-2xl py-1.5 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setIsActionsOpen(false);
                      navigate('/pacotes/novo');
                    }}
                    className="w-full px-3.5 py-2 text-left text-neutral-200 hover:bg-white/5 hover:text-[#E8AC51] flex items-center gap-2 cursor-pointer"
                  >
                    <Package className="w-3.5 h-3.5" />
                    <span>Criar pacote com seleção</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsActionsOpen(false);
                      navigate('/compomake');
                    }}
                    className="w-full px-3.5 py-2 text-left text-neutral-200 hover:bg-white/5 hover:text-[#E8AC51] flex items-center gap-2 cursor-pointer"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>Abrir no CompoMake</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleExportCsv}
                    className="w-full px-3.5 py-2 text-left text-neutral-200 hover:bg-white/5 hover:text-[#E8AC51] flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Exportar CSV</span>
                  </button>
                  {selectedIds.length > 0 && (
                    <>
                      <div className="my-1 border-t border-white/10" />
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedIds([]);
                          setIsActionsOpen(false);
                        }}
                        className="w-full px-3.5 py-2 text-left text-red-400 hover:bg-white/5 flex items-center gap-2 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Limpar seleção</span>
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="talentos-sort"
              className="text-xs text-neutral-400 whitespace-nowrap"
            >
              Ordenar por:
            </label>
            <select
              id="talentos-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#1c1c1e] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:border-[#E8AC51]/60 outline-none cursor-pointer"
            >
              <option value="updated_desc">Última atualização</option>
              <option value="name_asc">Nome (A–Z)</option>
              <option value="name_desc">Nome (Z–A)</option>
              <option value="status">Status</option>
              <option value="newest">Mais recentes</option>
            </select>
          </div>
        </div>

        {/* 5. Área Principal: Filtros (Esquerda) + Grid/Lista (Direita) */}
        <div className="flex flex-col lg:flex-row items-start gap-5">
          {/* Sidebar Desktop */}
          <div className="hidden lg:block w-[260px] shrink-0 sticky top-4">
            <FilterSidebar
              filters={filters}
              onChangeFilters={setFilters}
              onResetFilters={handleResetAllFilters}
              talents={talents}
            />
          </div>

          {/* Drawer Mobile */}
          {isMobileFiltersOpen && (
            <div
              onClick={() => setIsMobileFiltersOpen(false)}
              className="fixed inset-0 z-50 lg:hidden bg-black/75 backdrop-blur-xs flex justify-start animate-content-fade"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-[300px] max-w-[88vw] h-full bg-[#161617] p-3 overflow-y-auto border-r border-white/10"
              >
                <FilterSidebar
                  filters={filters}
                  onChangeFilters={setFilters}
                  onResetFilters={handleResetAllFilters}
                  talents={talents}
                  onCloseMobile={() => setIsMobileFiltersOpen(false)}
                />
              </div>
            </div>
          )}

          {/* Conteúdo de Talentos */}
          <div className="flex-1 min-w-0 w-full space-y-5">
            {loadError && (
              <div className="bg-[#1c1c1e] border border-red-500/40 rounded-xl px-4 py-3 flex items-center gap-3 text-xs text-red-300">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>
                  Não foi possível carregar os talentos do Firestore.{' '}
                  {loadError?.message || ''}
                </span>
              </div>
            )}

            {isLoading ? (
              viewMode === 'CARDS' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                  {Array.from({ length: 8 }).map((_, idx) => (
                    <TalentCardSkeleton key={idx} />
                  ))}
                </div>
              ) : (
                <TalentList
                  isLoading={true}
                  allSelected={false}
                  onToggleSelectAll={toggleSelectAll}
                />
              )
            ) : talents.length === 0 ? (
              <div className="bg-[#1c1c1e] border border-white/10 rounded-xl p-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#E8AC51]/10 border border-[#E8AC51]/30 flex items-center justify-center mx-auto text-[#E8AC51]">
                  <Users className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-serif text-lg font-semibold text-white">
                    Nenhum talento cadastrado ainda
                  </h3>
                  <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
                    Sua base no Firestore está vazia. Adicione o primeiro talento
                    com fotos, medidas e informações para começar.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddTalent}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E8AC51] hover:bg-[#d99b3f] text-[#161617] text-xs font-bold uppercase tracking-wider shadow-md transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Adicionar talento</span>
                </button>
              </div>
            ) : filteredTalents.length === 0 ? (
              <div className="bg-[#1c1c1e] border border-white/10 rounded-xl p-10 text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#E8AC51]/10 border border-[#E8AC51]/25 flex items-center justify-center mx-auto text-[#E8AC51]">
                  <Users className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-white">
                    Nenhum talento encontrado
                  </h3>
                  <p className="text-xs text-neutral-400 max-w-md mx-auto">
                    Ajuste os filtros aplicados, a letra selecionada ou o termo de
                    busca para visualizar o elenco cadastrado.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleResetAllFilters}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#880E1B] hover:bg-[#a31121] text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Limpar filtros
                </button>
              </div>
            ) : viewMode === 'CARDS' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 animate-content-fade">
                {paginatedTalents.map((talent) => (
                  <TalentCard
                    key={talent.id}
                    talent={talent}
                    isSelected={selectedIds.includes(talent.id)}
                    onToggleSelect={toggleSelectTalent}
                    onOpenOverview={(t, tab = 'Info') =>
                      setOverviewState({ talent: t, tab })
                    }
                    onOpenCompoMake={() => navigate('/compomake')}
                  />
                ))}
              </div>
            ) : (
              <TalentList
                talents={paginatedTalents}
                selectedIds={selectedIds}
                allSelected={allFilteredSelected}
                onToggleSelectAll={toggleSelectAll}
                onToggleSelect={toggleSelectTalent}
                onOpenOverview={(t, tab = 'Info') =>
                  setOverviewState({ talent: t, tab })
                }
                onOpenCompoMake={() => navigate('/compomake')}
              />
            )}

            {/* 6. Rodapé de Paginação */}
            <footer className="bg-[#1c1c1e] border border-white/10 rounded-xl px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-neutral-400 tabular-nums">
                Exibindo{' '}
                <span className="text-white font-semibold">
                  {startCount} - {endCount}
                </span>{' '}
                de{' '}
                <span className="text-white font-semibold">
                  {filteredTalents.length}
                </span>{' '}
                {filteredTalents.length === 1 ? 'talento' : 'talentos'}
              </p>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={safePage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  aria-label="Página anterior"
                  className="w-8 h-8 rounded-lg bg-[#161617] border border-white/10 text-neutral-400 hover:text-white hover:border-[#E8AC51]/40 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pageNumber = idx + 1;
                  const isActive = pageNumber === safePage;
                  return (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`w-8 h-8 rounded-lg text-xs font-semibold border transition-colors cursor-pointer tabular-nums ${
                        isActive
                          ? 'bg-[#880E1B] border-[#880E1B] text-white'
                          : 'bg-[#161617] border-white/10 text-neutral-400 hover:text-white hover:border-[#E8AC51]/40'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                <button
                  type="button"
                  disabled={safePage >= totalPages}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  aria-label="Próxima página"
                  className="w-8 h-8 rounded-lg bg-[#161617] border border-white/10 text-neutral-400 hover:text-white hover:border-[#E8AC51]/40 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </footer>
          </div>
        </div>
      </div>

      {/* Painel Panorama do Talento (10 Seções) */}
      <TalentOverviewModal
        talent={overviewState.talent}
        initialTab={overviewState.tab}
        onClose={() => setOverviewState({ talent: null, tab: 'Info' })}
        onOpenCompoMake={() => navigate('/compomake')}
      />
    </div>
  );
}
