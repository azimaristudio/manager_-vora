import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  LayoutList,
  Filter,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Search,
  Globe,
  X,
} from 'lucide-react';
import AddForaModal from './modals/AddForaModal';
import AddFeriasModal from './modals/AddFeriasModal';
import AddVooModal from './modals/AddVooModal';
import AddOpcaoModal from './modals/AddOpcaoModal';
import AddPRoupaModal from './modals/AddPRoupaModal';
import AddTrabalhoModal from './modals/AddTrabalhoModal';
import AddVisitaModal from './modals/AddVisitaModal';

const EVENT_LEGEND_ROW_1 = [
  { label: 'Casting', color: 'bg-[#f8b400]', modalKey: null },
  { label: 'Callback', color: 'bg-[#c5299b]', modalKey: null },
  { label: 'Opção', color: 'bg-[#f06711]', modalKey: 'opcao' },
  { label: 'P. Roupa', color: 'bg-[#3ab565]', modalKey: 'proupa' },
  { label: 'Trabalho', color: 'bg-[#2aa9d2]', modalKey: 'trabalho' },
  { label: 'Ensaio fotográfico', color: 'bg-[#9265cc]', modalKey: null },
  { label: 'Fora', color: 'bg-[#f38252]', modalKey: 'fora' },
  { label: 'Férias', color: 'bg-[#7699d4]', modalKey: 'ferias' },
  { label: 'Compromisso', color: 'bg-[#284b8c]', modalKey: null },
  { label: 'Visita', color: 'bg-[#107c10]', modalKey: 'visita' },
  { label: 'Evento', color: 'bg-[#a82400]', modalKey: null },
  { label: 'Vôo', color: 'bg-[#512da8]', modalKey: 'voo' },
  { label: 'Contratos Internacionais', color: 'bg-[#1b5e57]', modalKey: null },
];

const EVENT_LEGEND_ROW_2 = [
  { label: 'Aniversário', color: 'bg-[#222222]', modalKey: null },
  { label: 'Aniversário do Contato', color: 'bg-[#8997a7]', modalKey: null },
];

const EVENT_MODAL_OPTIONS = [
  { key: 'fora', label: 'Fora', color: 'bg-[#f38252]' },
  { key: 'ferias', label: 'Férias', color: 'bg-[#7699d4]' },
  { key: 'voo', label: 'Vôo', color: 'bg-[#512da8]' },
  { key: 'opcao', label: 'Opção', color: 'bg-[#f06711]' },
  { key: 'proupa', label: 'P. Roupa', color: 'bg-[#3ab565]' },
  { key: 'trabalho', label: 'Trabalho', color: 'bg-[#2aa9d2]' },
  { key: 'visita', label: 'Visita', color: 'bg-[#107c10]' },
];

const WEEKDAY_HEADERS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

// Grelha do mês de Outubro de 2026 (conforme Imagem 31)
const OCTOBER_2026_GRID = [
  [
    { day: 28, isCurrentMonth: false },
    { day: 29, isCurrentMonth: false },
    { day: 30, isCurrentMonth: false },
    { day: 1, isCurrentMonth: true },
    { day: 2, isCurrentMonth: true },
    { day: 3, isCurrentMonth: true },
    { day: 4, isCurrentMonth: true },
  ],
  [
    { day: 5, isCurrentMonth: true },
    { day: 6, isCurrentMonth: true },
    { day: 7, isCurrentMonth: true },
    { day: 8, isCurrentMonth: true },
    { day: 9, isCurrentMonth: true },
    { day: 10, isCurrentMonth: true },
    { day: 11, isCurrentMonth: true },
  ],
  [
    { day: 12, isCurrentMonth: true },
    { day: 13, isCurrentMonth: true },
    { day: 14, isCurrentMonth: true },
    { day: 15, isCurrentMonth: true },
    { day: 16, isCurrentMonth: true },
    { day: 17, isCurrentMonth: true },
    { day: 18, isCurrentMonth: true },
  ],
  [
    { day: 19, isCurrentMonth: true },
    { day: 20, isCurrentMonth: true },
    { day: 21, isCurrentMonth: true },
    { day: 22, isCurrentMonth: true },
    { day: 23, isCurrentMonth: true },
    { day: 24, isCurrentMonth: true },
    { day: 25, isCurrentMonth: true },
  ],
  [
    { day: 26, isCurrentMonth: true },
    { day: 27, isCurrentMonth: true },
    { day: 28, isCurrentMonth: true },
    { day: 29, isCurrentMonth: true },
    { day: 30, isCurrentMonth: true, isHighlighted: true },
    { day: 31, isCurrentMonth: true },
    { day: 1, isCurrentMonth: false },
  ],
  [
    { day: 2, isCurrentMonth: false },
    { day: 3, isCurrentMonth: false },
    { day: 4, isCurrentMonth: false },
    { day: 5, isCurrentMonth: false },
    { day: 6, isCurrentMonth: false },
    { day: 7, isCurrentMonth: false },
    { day: 8, isCurrentMonth: false },
  ],
];

export default function CalendarView() {
  // Estados da Barra Lateral Esquerda
  const [talentSearch, setTalentSearch] = useState('');
  const [userFilter, setUserFilter] = useState('Você');
  const [activityFilter, setActivityFilter] = useState('11 de 15 selecionados');
  const [divisionFilter, setDivisionFilter] = useState('Todos selecionados');

  // Estados da Barra de Topo do Calendário
  const [activeViewMode, setActiveViewMode] = useState('MÊS');
  const [searchDateInput, setSearchDateInput] = useState('');

  // Estados de controlo do menu dropdown '+' e dos modais de criação de eventos
  const [isAddDropdownOpen, setIsAddDropdownOpen] = useState(false);
  const [isCategoryPopupOpen, setIsCategoryPopupOpen] = useState(false);
  const [activeModalKey, setActiveModalKey] = useState(null);

  // Lista local (mockada) de eventos criados pelo utilizador na sessão
  const [eventsList, setEventsList] = useState([]);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAddDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectEventModal = (modalKey) => {
    setIsAddDropdownOpen(false);
    setIsCategoryPopupOpen(false);
    setActiveModalKey(modalKey);
  };

  const handleSaveNewEvent = (eventPayload) => {
    const dayStr = (eventPayload.date || '30/10/2026').split('/')[0];
    const parsedDay = parseInt(dayStr, 10) || 30;
    setEventsList((prev) => [
      ...prev,
      {
        id: `evt-${Date.now()}`,
        day: parsedDay,
        ...eventPayload,
      },
    ]);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white flex flex-col justify-between py-4 px-4 sm:px-8">
      <div className="max-w-[1160px] w-full mx-auto">
        {/* Sub-cabeçalho Superior: Breadcrumb 'Início > Calendário' e Botão '+' */}
        <div className="bg-[#f5f5f5] border border-slate-200/80 rounded-xs px-4 py-2.5 flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-1.5 text-xs">
            <Link
              to="/"
              className="text-[#0077b5] hover:underline font-normal"
            >
              Início
            </Link>
            <span className="text-slate-400">&gt;</span>
            <span className="text-slate-500 font-normal">Calendário</span>
          </div>

          {/* Botão '+' com Menu Dropdown de Seleção do Tipo de Evento */}
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setIsAddDropdownOpen((prev) => !prev)}
              title="Adicionar Evento"
              className="w-8 h-8 bg-[#0077b5] hover:bg-[#006399] text-white rounded-xs flex items-center justify-center transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.8]" />
            </button>

            {isAddDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-52 bg-white border border-slate-200 rounded-xs shadow-xl z-40 py-1.5">
                <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-semibold text-slate-700">
                  Selecione o tipo de evento
                </div>
                {EVENT_MODAL_OPTIONS.map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => handleSelectEventModal(opt.key)}
                    className="w-full px-3 py-1.5 text-left text-xs text-slate-700 hover:bg-sky-50 flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-xs shrink-0 ${opt.color}`}
                    />
                    <span>{opt.label}</span>
                  </button>
                ))}
                <div className="border-t border-slate-100 mt-1 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddDropdownOpen(false);
                      setIsCategoryPopupOpen(true);
                    }}
                    className="w-full px-3 py-1.5 text-left text-[11px] text-[#0077b5] hover:bg-sky-50 font-medium cursor-pointer"
                  >
                    Abrir seletor de categoria...
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Layout Principal de Duas Colunas: Barra Lateral Esquerda + Área do Calendário à Direita */}
        <div className="flex flex-col lg:flex-row items-start gap-6">
          {/* Barra Lateral Esquerda */}
          <aside className="w-full lg:w-[205px] shrink-0 space-y-5">
            {/* Secção Multi Horário */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-[#0077b5]">
                <LayoutList className="w-4 h-4 stroke-[2.2]" />
                <h2 className="text-[15px] font-normal">Multi Horário</h2>
              </div>

              <input
                type="text"
                value={talentSearch}
                onChange={(e) => setTalentSearch(e.target.value)}
                placeholder="Pesquisar Talento..."
                className="w-full h-8 px-2.5 border border-slate-200 rounded-xs text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#0077b5]"
              />

              <button
                type="button"
                className="h-8 px-3.5 bg-[#0077b5] hover:bg-[#006399] text-white text-[11px] font-semibold uppercase rounded-xs transition-colors cursor-pointer"
              >
                PESQUISAR
              </button>
            </div>

            <hr className="border-slate-200" />

            {/* Secção Filtros */}
            <div className="space-y-3.5">
              <div className="flex items-center gap-2 text-[#0077b5]">
                <Filter className="w-3.5 h-3.5 fill-[#0077b5]" />
                <h2 className="text-[15px] font-normal">Filtros</h2>
              </div>

              {/* POR USUÁRIO */}
              <div className="space-y-1">
                <label className="block text-[9px] text-slate-500 uppercase tracking-wide">
                  POR USUÁRIO
                </label>
                <div className="relative">
                  <select
                    value={userFilter}
                    onChange={(e) => setUserFilter(e.target.value)}
                    className="w-full h-8 px-2.5 pr-6 border border-slate-200 rounded-xs bg-[#f2f2f2] text-xs font-semibold text-slate-700 appearance-none focus:outline-none focus:border-[#0077b5]"
                  >
                    <option value="Você">Você</option>
                    <option value="Todos">Todos</option>
                    <option value="Mozart de Marias">Mozart de Marias</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* POR ATIVIDADE */}
              <div className="space-y-1">
                <label className="block text-[9px] text-slate-500 uppercase tracking-wide">
                  POR ATIVIDADE
                </label>
                <div className="relative">
                  <select
                    value={activityFilter}
                    onChange={(e) => setActivityFilter(e.target.value)}
                    className="w-full h-8 px-2.5 pr-6 border border-slate-200 rounded-xs bg-[#f2f2f2] text-xs font-semibold text-slate-700 appearance-none focus:outline-none focus:border-[#0077b5]"
                  >
                    <option value="11 de 15 selecionados">
                      11 de 15 selecionados
                    </option>
                    <option value="Todas as atividades">
                      Todas as atividades
                    </option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Por Divisão */}
              <div className="space-y-1">
                <label className="block text-[10px] text-slate-500">
                  Por Divisão
                </label>
                <div className="relative">
                  <select
                    value={divisionFilter}
                    onChange={(e) => setDivisionFilter(e.target.value)}
                    className="w-full h-8 px-2.5 pr-6 border border-slate-200 rounded-xs bg-[#f2f2f2] text-xs font-semibold text-slate-700 appearance-none focus:outline-none focus:border-[#0077b5]"
                  >
                    <option value="Todos selecionados">
                      Todos selecionados
                    </option>
                    <option value="Fashion">Fashion</option>
                    <option value="Comercial">Comercial</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Botão EXPORTAR CALENDÁRIO */}
              <div className="pt-1">
                <button
                  type="button"
                  className="h-8 px-3 bg-[#0077b5] hover:bg-[#006399] text-white text-[10px] font-semibold uppercase rounded-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <CalendarIcon className="w-3.5 h-3.5" />
                  <span>EXPORTAR CALENDÁRIO</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Área Principal do Calendário à Direita */}
          <main className="flex-1 min-w-0 w-full">
            {/* Barra de Topo do Calendário */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              {/* Navegação '<', '>', 'HOJE' e Mês/Ano */}
              <div className="flex items-center gap-2">
                <div className="inline-flex rounded-xs border border-slate-200 overflow-hidden bg-[#f2f2f2]">
                  <button
                    type="button"
                    title="Mês anterior"
                    className="w-7 h-8 flex items-center justify-center text-slate-700 hover:bg-slate-200 border-r border-slate-200 cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                  <button
                    type="button"
                    title="Próximo mês"
                    className="w-7 h-8 flex items-center justify-center text-slate-700 hover:bg-slate-200 cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>

                <button
                  type="button"
                  className="h-8 px-2.5 bg-[#f5f5f5] hover:bg-slate-200 border border-slate-200 rounded-xs text-[10px] text-slate-400 uppercase font-medium cursor-pointer"
                >
                  HOJE
                </button>

                <h1 className="text-[22px] text-slate-600 font-normal ml-2 tracking-tight">
                  Outubro 2026
                </h1>
              </div>

              {/* Botões de Vista ('MÊS', 'SEMANA', 'DIA') e 'BUSCAR DATA' */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex rounded-xs border border-slate-200 overflow-hidden bg-[#f2f2f2]">
                  {[
                    'LISTA MÊS',
                    'LISTA SEMANA',
                    'LISTA DIA',
                    'MÊS',
                    'SEMANA',
                    'DIA',
                  ].map((mode) => {
                    const isActive = activeViewMode === mode;
                    return (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setActiveViewMode(mode)}
                        className={`h-8 px-2.5 text-[10px] font-medium uppercase border-r last:border-r-0 border-slate-200 transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-[#0077b5] text-white font-semibold'
                            : 'text-slate-600 hover:bg-slate-200/70'
                        }`}
                      >
                        {mode}
                      </button>
                    );
                  })}
                </div>

                {/* Input BUSCAR DATA */}
                <div className="inline-flex items-center border border-slate-200 rounded-xs overflow-hidden bg-[#f2f2f2] h-8">
                  <span className="px-2.5 text-[10px] font-semibold text-slate-600 uppercase border-r border-slate-200 h-full flex items-center">
                    BUSCAR DATA
                  </span>
                  <input
                    type="text"
                    value={searchDateInput}
                    onChange={(e) => setSearchDateInput(e.target.value)}
                    placeholder="__/__/____"
                    className="w-24 h-full px-2 bg-white text-center text-xs text-slate-700 placeholder:text-slate-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    title="Buscar data"
                    className="w-7 h-full bg-[#eaeaea] hover:bg-slate-300 border-l border-slate-200 flex items-center justify-center text-slate-700 cursor-pointer"
                  >
                    <Search className="w-3 h-3 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Legenda de Cores de Eventos */}
            <div className="mb-3 space-y-1 flex flex-col items-center">
              <div className="flex flex-wrap items-center justify-center gap-1">
                {EVENT_LEGEND_ROW_1.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      if (item.modalKey) {
                        handleSelectEventModal(item.modalKey);
                      }
                    }}
                    title={
                      item.modalKey
                        ? `Clique para criar ${item.label}`
                        : item.label
                    }
                    className={`${item.color} text-white text-[10px] font-medium px-2 py-0.5 rounded-xs leading-tight transition-opacity ${
                      item.modalKey
                        ? 'hover:opacity-90 cursor-pointer'
                        : 'cursor-default'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-1">
                {EVENT_LEGEND_ROW_2.map((item) => (
                  <span
                    key={item.label}
                    className={`${item.color} text-white text-[10px] font-medium px-2 py-0.5 rounded-xs leading-tight`}
                  >
                    {item.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Grelha Mensal do Calendário (Seg a Dom) */}
            <div className="border border-slate-200 rounded-xs overflow-hidden bg-white">
              {/* Cabeçalho dos Dias da Semana */}
              <div className="grid grid-cols-7 border-b border-slate-200 bg-white">
                {WEEKDAY_HEADERS.map((weekday) => (
                  <div
                    key={weekday}
                    className="py-1 text-center text-xs font-bold text-slate-700 border-r last:border-r-0 border-slate-200"
                  >
                    {weekday}
                  </div>
                ))}
              </div>

              {/* Semanas / Células Numeradas */}
              <div className="divide-y divide-slate-200">
                {OCTOBER_2026_GRID.map((week, weekIdx) => (
                  <div key={weekIdx} className="grid grid-cols-7">
                    {week.map((cell, dayIdx) => {
                      const dayEvents = cell.isCurrentMonth
                        ? eventsList.filter((ev) => ev.day === cell.day)
                        : [];

                      return (
                        <div
                          key={dayIdx}
                          onClick={() => setIsCategoryPopupOpen(true)}
                          className={`min-h-[104px] p-1.5 border-r last:border-r-0 border-slate-200 flex flex-col justify-between transition-colors cursor-pointer ${
                            cell.isHighlighted
                              ? 'bg-[#fcf8e3]'
                              : 'bg-white hover:bg-slate-50/70'
                          }`}
                        >
                          <div className="flex justify-end">
                            <span
                              className={`text-xs leading-none ${
                                cell.isCurrentMonth
                                  ? 'text-slate-600 font-normal'
                                  : 'text-slate-300 font-normal'
                              }`}
                            >
                              {cell.day}
                            </span>
                          </div>

                          {/* Eventos mockados criados na célula */}
                          {dayEvents.length > 0 && (
                            <div
                              className="mt-1 space-y-1"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {dayEvents.map((ev) => (
                                <div
                                  key={ev.id}
                                  className={`${ev.color} text-white text-[10px] px-1.5 py-0.5 rounded-xs truncate font-medium`}
                                >
                                  {ev.title}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Rodapé Padrão ManagerFashion */}
      <footer className="mt-10 pb-6 text-center space-y-2 text-xs text-slate-500">
        <div className="flex items-center justify-center gap-4">
          <span className="inline-flex items-center gap-1.5 text-slate-500">
            <Globe className="w-3.5 h-3.5" />
            <span>Idiomas</span>
          </span>
          <button
            type="button"
            className="text-[#0077b5] underline font-normal text-[11px] uppercase cursor-pointer"
          >
            ENGLISH
          </button>
          <button
            type="button"
            className="text-[#0077b5] hover:underline font-normal text-[11px] uppercase cursor-pointer"
          >
            ESPAÑOL
          </button>
          <button
            type="button"
            className="text-[#0077b5] hover:underline font-normal text-[11px] uppercase cursor-pointer"
          >
            PORTUGUÊS
          </button>
        </div>
        <p className="text-slate-500 text-xs">© ManagerFashion.com</p>
      </footer>

      {/* Modal de Seleção de Categoria ("O que você gostaria fazer?" - Imagem 32) */}
      {isCategoryPopupOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-10 px-4"
          onClick={() => setIsCategoryPopupOpen(false)}
        >
          <div
            className="bg-white w-full max-w-[380px] rounded-xs shadow-2xl border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
              <h3 className="text-[15px] font-bold text-slate-800">
                O que você gostaria fazer?
              </h3>
              <button
                type="button"
                onClick={() => setIsCategoryPopupOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
            <div className="p-8 flex justify-center">
              <div className="relative w-full max-w-[290px]">
                <select
                  defaultValue=""
                  onChange={(e) => {
                    if (e.target.value) {
                      handleSelectEventModal(e.target.value);
                    }
                  }}
                  className="w-full h-9 px-3 pr-8 border border-[#0077b5] rounded-xs bg-white text-xs font-bold text-slate-700 appearance-none focus:outline-none cursor-pointer"
                >
                  <option value="" disabled>
                    Selecione a categoria
                  </option>
                  {EVENT_MODAL_OPTIONS.map((opt) => (
                    <option key={opt.key} value={opt.key}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modais Individuais de Criação de Eventos (Imagens 39 a 45) */}
      <AddForaModal
        isOpen={activeModalKey === 'fora'}
        onClose={() => setActiveModalKey(null)}
        onSave={handleSaveNewEvent}
      />

      <AddFeriasModal
        isOpen={activeModalKey === 'ferias'}
        onClose={() => setActiveModalKey(null)}
        onSave={handleSaveNewEvent}
      />

      <AddVooModal
        isOpen={activeModalKey === 'voo'}
        onClose={() => setActiveModalKey(null)}
        onSave={handleSaveNewEvent}
      />

      <AddOpcaoModal
        isOpen={activeModalKey === 'opcao'}
        onClose={() => setActiveModalKey(null)}
        onSave={handleSaveNewEvent}
      />

      <AddPRoupaModal
        isOpen={activeModalKey === 'proupa'}
        onClose={() => setActiveModalKey(null)}
        onSave={handleSaveNewEvent}
      />

      <AddTrabalhoModal
        isOpen={activeModalKey === 'trabalho'}
        onClose={() => setActiveModalKey(null)}
        onSave={handleSaveNewEvent}
      />

      <AddVisitaModal
        isOpen={activeModalKey === 'visita'}
        onClose={() => setActiveModalKey(null)}
        onSave={handleSaveNewEvent}
      />
    </div>
  );
}

