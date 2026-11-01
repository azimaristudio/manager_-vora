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
  LogOut,
} from 'lucide-react';
import ContractsDropdown from './ContractsDropdown';
import TasksDropdown from './TasksDropdown';

const NAV_ITEMS = [
  { label: 'Talentos', path: '/' },
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

  // Estados para controlar a visibilidade dos dropdowns de Contratos e Tarefas
  const [isContractsOpen, setIsContractsOpen] = useState(false);
  const [isTasksOpen, setIsTasksOpen] = useState(false);

  const contractsContainerRef = useRef(null);
  const tasksContainerRef = useRef(null);

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
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggleContracts = () => {
    setIsContractsOpen((prev) => !prev);
    setIsTasksOpen(false);
  };

  const handleToggleTasks = () => {
    setIsTasksOpen((prev) => !prev);
    setIsContractsOpen(false);
  };

  const handleOpenBackgroundJobs = () => {
    setIsContractsOpen(false);
    setIsTasksOpen(false);
    navigate('/background-jobs');
  };

  return (
    <header className="w-full bg-white border-b border-slate-200 px-4 lg:px-8 h-16 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-6 lg:gap-10">
        {/* Logotipo 'MF ManagerFashion' com Link para a rota inicial (/) */}
        <Link
          to="/"
          title="Ir para o Início (Talentos)"
          className="flex items-center gap-1.5 shrink-0 group"
        >
          <span className="bg-[#0077b5] group-hover:bg-[#006399] text-white font-extrabold text-sm px-1.5 py-1 rounded-xs tracking-tighter leading-none transition-colors">
            MF
          </span>
          <span className="text-[#0077b5] group-hover:text-[#006399] font-normal text-lg tracking-tight transition-colors">
            Manager<span className="font-semibold">Fashion</span>
          </span>
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
                    ? 'bg-[#0077b5] text-white font-medium shadow-2xs'
                    : 'text-[#0077b5] hover:bg-sky-50 font-normal'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Grupo Superior Direito: CompoMake + Contratos + Tarefas + Background Jobs + Suporte + Perfil */}
      <div className="flex items-center gap-3 sm:gap-4 text-[#0077b5]">
        {/* 1º Ícone: CompoMake */}
        <button
          type="button"
          onClick={() => {
            setIsContractsOpen(false);
            setIsTasksOpen(false);
            if (onOpenCompoMake) onOpenCompoMake();
          }}
          title="Abrir CompoMake (Criar Composite)"
          className="p-1 hover:bg-sky-50 rounded-xs transition-all cursor-pointer group"
        >
          <div className="w-7 h-5 border-2 border-[#0077b5] bg-[#0077b5] rounded-[2px] p-0.5 flex items-center gap-0.5 group-hover:scale-105 transition-transform">
            <div className="w-1/2 h-full bg-white flex items-end justify-center overflow-hidden">
              <User className="w-3 h-3 text-[#0077b5] fill-[#0077b5] translate-y-0.5" />
            </div>
            <div className="w-1/2 h-full grid grid-cols-2 grid-rows-2 gap-[1.5px]">
              <div className="bg-white" />
              <div className="bg-white" />
              <div className="bg-white" />
              <div className="bg-white" />
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
              isContractsOpen ? 'bg-sky-100/80' : 'hover:bg-sky-50'
            }`}
          >
            <Folder className="w-5 h-5 fill-[#0077b5] text-[#0077b5]" />
            <span className="ml-0.5 px-1.5 py-0.2 bg-emerald-600 text-white text-[10px] font-bold rounded-xs leading-tight">
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
              isTasksOpen ? 'bg-sky-100/80' : 'hover:bg-sky-50'
            }`}
          >
            <Flag className="w-5 h-5 fill-[#0077b5] text-[#0077b5]" />
            <span className="ml-0.5 px-1.5 py-0.2 bg-emerald-600 text-white text-[10px] font-bold rounded-xs leading-tight">
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
              ? 'bg-sky-100/80'
              : 'hover:bg-sky-50'
          }`}
        >
          <Hourglass className="w-5 h-5 text-[#0077b5]" />
          <span className="ml-0.5 px-1.5 py-0.2 bg-emerald-600 text-white text-[10px] font-bold rounded-xs leading-tight">
            0
          </span>
        </button>

        {/* Suporte */}
        <button
          type="button"
          title="Suporte e Tutoriais"
          className="p-1.5 hover:bg-sky-50 rounded-xs transition-colors cursor-pointer"
        >
          <LifeBuoy className="w-5 h-5" />
        </button>

        {/* Menu do Usuário / Login */}
        <div className="flex items-center gap-1 pl-1 border-l border-slate-200">
          <button
            type="button"
            onClick={() => navigate('/login')}
            title="Ir para a tela de Login"
            className="flex items-center gap-1 text-[#0077b5] hover:text-[#005a8c] p-1 rounded-xs transition-colors cursor-pointer"
          >
            <UserCircle2 className="w-7 h-7 stroke-[1.5]" />
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => navigate('/login')}
            title="Tela de Login"
            className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-[#0077b5] px-2 py-1 rounded hover:bg-sky-50 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Login</span>
          </button>
        </div>
      </div>
    </header>
  );
}
