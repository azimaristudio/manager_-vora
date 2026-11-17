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
} from 'lucide-react';
import ContractsDropdown from './ContractsDropdown';
import TasksDropdown from './TasksDropdown';
import UserDropdown from './UserDropdown';

const NAV_ITEMS = [
  { label: 'Talentos', path: '/talentos' },
  { label: 'Contatos', path: '/contatos' },
  { label: 'Webmail', path: '/webmail/inbox' },
  { label: 'Projetos', path: '/projetos' },
  { label: 'Calendário', path: '/calendario' },
  { label: 'Pacotes', path: '/pacotes' },
  { label: 'Estatísticas', path: '/estatisticas' },
  { label: 'Contabilidade', path: '/contabilidade' },
];

export default function Header({ onOpenCompoMake }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Estados para controlar a visibilidade dos dropdowns de Contratos, Tarefas e Perfil
  const [isContractsOpen, setIsContractsOpen] = useState(false);
  const [isTasksOpen, setIsTasksOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

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
    <header className="w-full bg-[#161617] border-b border-white/10 px-4 lg:px-8 h-16 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-6 lg:gap-10">
        {/* Logótipo Pose Manager com Link para a rota de Talentos (/talentos) */}
        <Link
          to="/talentos"
          title="Ir para o Início (Talentos)"
          className="flex items-center shrink-0 group"
        >
          <img
            src="/pose manager.png"
            alt="Pose Manager"
            className="h-8 w-auto object-contain transition-opacity group-hover:opacity-90"
          />
        </Link>

        {/* Menu Superior de Navegação */}
        <nav className="hidden xl:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isItemActive =
              (item.label === 'Talentos' &&
                (location.pathname === '/' ||
                  location.pathname.startsWith('/talentos'))) ||
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
                className={`px-3 py-1.5 rounded-xs text-[13px] transition-colors cursor-pointer ${
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

      {/* Grupo Superior Direito: CompoMake + Contratos + Tarefas + Background Jobs + Suporte + Perfil */}
      <div className="flex items-center gap-3 sm:gap-4 text-[#E8AC51]">
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

        {/* 2º Ícone: Pasta (Contratos - 11_contratos.png) */}
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

        {/* 3º Ícone: Bandeira (Tarefas - 12_tarefas.png) */}
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

        {/* 4º Ícone: Ampulheta (Background Trabalhos - 13_background_trabalhos.png) */}
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

        {/* Menu do Usuário / Perfil (Imagem 64) */}
        <div
          ref={userMenuContainerRef}
          className="relative pl-1 border-l border-white/10"
        >
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
      </div>
    </header>
  );
}
