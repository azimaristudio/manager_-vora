import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Folder,
  Flag,
  Hourglass,
  LifeBuoy,
  UserCircle2,
  ChevronDown,
  User,
  Menu,
  X,
  SlidersHorizontal,
} from 'lucide-react';
import ContractsDropdown from './ContractsDropdown';
import TasksDropdown from './TasksDropdown';
import UserDropdown from './UserDropdown';

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Talentos', path: '/talentos' },
  { label: 'Contatos', path: '/contatos' },
  { label: 'Webmail', path: '/webmail/inbox' },
  { label: 'Projetos', path: '/projetos' },
  { label: 'Calendário', path: '/calendario' },
  { label: 'Pacotes', path: '/pacotes' },
  { label: 'Estatísticas', path: '/estatisticas' },
  { label: 'Contabilidade', path: '/contabilidade' },
];

export default function Header({ onOpenCompoMake, onToggleMobileFilters }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Estados para controlar a visibilidade dos dropdowns de Contratos, Tarefas, Perfil e Menu Mobile
  const [isContractsOpen, setIsContractsOpen] = useState(false);
  const [isTasksOpen, setIsTasksOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const contractsContainerRef = useRef(null);
  const tasksContainerRef = useRef(null);
  const userMenuContainerRef = useRef(null);

  // Fecha automaticamente os dropdowns ao clicar fora deles
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        contractsContainerRef.current &&
        !contractsContainerRef.current.contains(event.target)
      ) {
        setIsContractsOpen(false);
      }
      if (
        tasksContainerRef.current &&
        !tasksContainerRef.current.contains(event.target)
      ) {
        setIsTasksOpen(false);
      }
      if (
        userMenuContainerRef.current &&
        !userMenuContainerRef.current.contains(event.target)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggleContracts = () => {
    setIsContractsOpen((prev) => !prev);
    setIsTasksOpen(false);
    setIsUserMenuOpen(false);
  };

  const handleToggleTasks = () => {
    setIsTasksOpen((prev) => !prev);
    setIsContractsOpen(false);
    setIsUserMenuOpen(false);
  };

  const handleToggleUserMenu = () => {
    setIsUserMenuOpen((prev) => !prev);
    setIsContractsOpen(false);
    setIsTasksOpen(false);
  };

  const handleOpenBackgroundJobs = () => {
    setIsContractsOpen(false);
    setIsTasksOpen(false);
    setIsUserMenuOpen(false);
    navigate('/background-jobs');
  };

  return (
    <div className="sticky top-0 z-30 w-full bg-[#161617]">
      <header className="flex justify-between items-center w-full bg-[#161617] border-b border-neutral-800 px-4 md:px-8 h-16">
        <div className="flex items-center gap-3 md:gap-6 lg:gap-10 min-w-0">
          {/* Logótipo Pose Manager com Link para o Dashboard (/dashboard) */}
          <Link
            to="/dashboard"
            title="Ir para o Dashboard"
            className="flex items-center shrink-0 group"
          >
            <img
              src="/pose manager.png"
              alt="Pose Manager"
              className="h-12 md:h-16 w-auto object-contain transition-opacity group-hover:opacity-90"
            />
          </Link>

          {/* Menu Superior de Navegação (Desktop: hidden md:flex) */}
          <nav className="hidden md:flex items-center gap-1 overflow-x-auto">
            {NAV_ITEMS.map((item) => {
              const isItemActive =
                (item.label === 'Dashboard' &&
                  (location.pathname === '/' ||
                    location.pathname.startsWith('/dashboard'))) ||
                (item.label === 'Talentos' &&
                  location.pathname.startsWith('/talentos')) ||
                (item.label === 'Contatos' &&
                  location.pathname.startsWith('/contatos')) ||
                (item.label === 'Webmail' &&
                  location.pathname.startsWith('/webmail')) ||
                (item.label === 'Projetos' &&
                  location.pathname.startsWith('/projetos')) ||
                (item.label === 'Calendário' &&
                  location.pathname.startsWith('/calendario')) ||
                (item.label === 'Pacotes' &&
                  location.pathname.startsWith('/pacotes')) ||
                (item.label === 'Estatísticas' &&
                  location.pathname.startsWith('/estatisticas')) ||
                (item.label === 'Contabilidade' &&
                  location.pathname.startsWith('/contabilidade'));

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    if (item.path && item.path !== '#') {
                      navigate(item.path);
                    }
                  }}
                  className={`px-2.5 lg:px-3 py-1.5 rounded-xs text-xs lg:text-[13px] whitespace-nowrap transition-colors cursor-pointer ${
                    isItemActive
                      ? 'bg-[#880E1B] hover:bg-[#a31121] text-white font-medium shadow-2xs'
                      : 'text-[#E8AC51] hover:bg-[#1c1c1e] font-normal'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Grupo Superior Direito */}
        <div className="flex items-center gap-2 md:gap-4 text-[#E8AC51] shrink-0">
          {/* Ícones Secundários: ocultos no mobile (hidden md:flex) para evitar sobreposição */}
          <div className="hidden md:flex items-center gap-3 md:gap-4">
            {/* 1º Ícone: CompoMake */}
            <button
              type="button"
              onClick={() => {
                setIsContractsOpen(false);
                setIsTasksOpen(false);
                setIsUserMenuOpen(false);
                if (onOpenCompoMake) onOpenCompoMake();
              }}
              title="Abrir CompoMake (Criar Composite)"
              className="p-1 hover:bg-[#1c1c1e] rounded-xs transition-all cursor-pointer group"
            >
              <div className="w-7 h-5 border-2 border-[#880E1B] bg-[#880E1B] rounded-[2px] p-0.5 flex items-center gap-0.5 group-hover:scale-105 transition-transform">
                <div className="w-1/2 h-full bg-[#161617] flex items-end justify-center overflow-hidden">
                  <User className="w-3 h-3 text-[#E8AC51] fill-[#E8AC51] translate-y-0.5" />
                </div>
                <div className="w-1/2 h-full grid grid-cols-2 grid-rows-2 gap-[1.5px]">
                  <div className="bg-[#E8AC51]" />
                  <div className="bg-[#E8AC51]" />
                  <div className="bg-[#E8AC51]" />
                  <div className="bg-[#E8AC51]" />
                </div>
              </div>
            </button>

            {/* 2º Ícone: Pasta (Contratos) */}
            <div ref={contractsContainerRef} className="relative">
              <button
                type="button"
                onClick={handleToggleContracts}
                title="Contratos"
                className={`relative flex items-center p-1.5 rounded-xs transition-colors cursor-pointer ${
                  isContractsOpen ? 'bg-[#1c1c1e]' : 'hover:bg-[#1c1c1e]'
                }`}
              >
                <Folder className="w-5 h-5 fill-[#E8AC51] text-[#E8AC51]" />
                <span className="ml-0.5 px-1.5 py-0.2 bg-[#E8AC51] text-[#161617] text-[10px] font-bold rounded-xs leading-tight">
                  1
                </span>
              </button>

              {isContractsOpen && <ContractsDropdown />}
            </div>

            {/* 3º Ícone: Bandeira (Tarefas) */}
            <div ref={tasksContainerRef} className="relative">
              <button
                type="button"
                onClick={handleToggleTasks}
                title="Tarefas"
                className={`relative flex items-center p-1.5 rounded-xs transition-colors cursor-pointer ${
                  isTasksOpen ? 'bg-[#1c1c1e]' : 'hover:bg-[#1c1c1e]'
                }`}
              >
                <Flag className="w-5 h-5 fill-[#E8AC51] text-[#E8AC51]" />
                <span className="ml-0.5 px-1.5 py-0.2 bg-[#E8AC51] text-[#161617] text-[10px] font-bold rounded-xs leading-tight">
                  0
                </span>
              </button>

              {isTasksOpen && <TasksDropdown />}
            </div>

            {/* 4º Ícone: Ampulheta (Background Trabalhos) */}
            <button
              type="button"
              onClick={handleOpenBackgroundJobs}
              title="Background Trabalhos"
              className={`relative flex items-center p-1.5 rounded-xs transition-colors cursor-pointer ${
                location.pathname === '/background-jobs'
                  ? 'bg-[#1c1c1e]'
                  : 'hover:bg-[#1c1c1e]'
              }`}
            >
              <Hourglass className="w-5 h-5 text-[#E8AC51]" />
              <span className="ml-0.5 px-1.5 py-0.2 bg-[#E8AC51] text-[#161617] text-[10px] font-bold rounded-xs leading-tight">
                0
              </span>
            </button>

            {/* Suporte */}
            <button
              type="button"
              title="Suporte e Tutoriais"
              className="p-1.5 hover:bg-[#1c1c1e] rounded-xs transition-colors cursor-pointer"
            >
              <LifeBuoy className="w-5 h-5" />
            </button>
          </div>

          {/* Menu do Usuário / Avatar */}
          <div
            ref={userMenuContainerRef}
            className="relative md:pl-2.5 md:border-l md:border-neutral-800 flex items-center gap-2"
          >
            <img
              src="/mini_posemanager.png"
              alt="Pose Manager"
              className="hidden md:block h-8 w-8 object-contain rounded-md border border-white/10 shrink-0"
            />
            <button
              type="button"
              onClick={handleToggleUserMenu}
              title="Menu do Usuário"
              className={`flex items-center gap-1 text-[#E8AC51] hover:text-[#a31121] p-1 rounded-xs transition-colors cursor-pointer ${
                isUserMenuOpen ? 'bg-[#1c1c1e]' : 'hover:bg-[#1c1c1e]'
              }`}
            >
              <UserCircle2 className="w-7 h-7 stroke-[1.5]" />
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {isUserMenuOpen && (
              <UserDropdown onClose={() => setIsUserMenuOpen(false)} />
            )}
          </div>

          {/* Botão Hamburger (visível apenas no mobile: block md:hidden) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Alternar menu mobile"
            className="block md:hidden p-2 text-[#E8AC51] hover:bg-[#1c1c1e] rounded-xs transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {/* Menu Mobile Dropdown / Slide-out (renderizado quando isMobileMenuOpen é true) */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-[#161617] border-b border-neutral-800 px-4 py-3 flex flex-col gap-1 shadow-2xl">
          {NAV_ITEMS.map((item) => {
            const isItemActive =
              (item.label === 'Dashboard' &&
                (location.pathname === '/' ||
                  location.pathname.startsWith('/dashboard'))) ||
              (item.label === 'Talentos' &&
                location.pathname.startsWith('/talentos')) ||
              (item.label === 'Contatos' &&
                location.pathname.startsWith('/contatos')) ||
              (item.label === 'Webmail' &&
                location.pathname.startsWith('/webmail')) ||
              (item.label === 'Projetos' &&
                location.pathname.startsWith('/projetos')) ||
              (item.label === 'Calendário' &&
                location.pathname.startsWith('/calendario')) ||
              (item.label === 'Pacotes' &&
                location.pathname.startsWith('/pacotes')) ||
              (item.label === 'Estatísticas' &&
                location.pathname.startsWith('/estatisticas')) ||
              (item.label === 'Contabilidade' &&
                location.pathname.startsWith('/contabilidade'));

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (item.path && item.path !== '#') {
                    navigate(item.path);
                  }
                }}
                className={`w-full px-3.5 py-2.5 rounded-xs text-left text-sm transition-colors cursor-pointer ${
                  isItemActive
                    ? 'bg-[#880E1B] hover:bg-[#a31121] text-white font-semibold'
                    : 'text-[#E8AC51] hover:bg-[#1c1c1e] font-normal'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          {onToggleMobileFilters && (
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onToggleMobileFilters();
              }}
              className="mt-2 pt-2 border-t border-neutral-800 w-full px-3.5 py-2.5 rounded-xs text-left text-xs font-semibold text-neutral-300 hover:bg-[#1c1c1e] hover:text-white flex items-center justify-between cursor-pointer"
            >
              <span>Abrir Filtros de Talentos</span>
              <SlidersHorizontal className="w-4 h-4 text-[#E8AC51]" />
            </button>
          )}
        </nav>
      )}
    </div>
  );
}
