import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LifeBuoy,
  UserCircle2,
  ChevronDown,
  ArrowDownWideNarrow,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  X,
} from 'lucide-react';

const TOP_MENU = [
  { label: 'TALENTOS', path: '/' },
  { label: 'CONTATOS', path: '/contatos' },
  { label: 'WEBMAIL', path: '/webmail/inbox' },
  { label: 'PROJETOS', path: '#' },
  { label: 'CALENDÁRIO', path: '#' },
  { label: 'PACOTES', path: '/pacotes' },
  { label: 'ESTATÍSTICAS', path: '#' },
  { label: 'CONTABILIDADE', path: '#' },
];

export default function PackagesLayout() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('criados'); // 'criados' | 'enviados'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedDateMode, setSelectedDateMode] = useState('Datas');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [pageSize, setPageSize] = useState('30');
  const [toast, setToast] = useState(null);

  const handleCreatePackage = () => {
    console.log('📦 [PackagesLayout] Ação CRIAR PACOTE acionada.');
    setToast({
      title: 'Criar Pacote (Simulado)',
      subtitle: 'O assistente de criação de pacote de talentos foi simulado.',
    });
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <div className="min-h-screen bg-[#e6e7e9] text-slate-700 flex flex-col font-sans select-none">
      {/* Toast Flutuante */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 max-w-md bg-slate-900 text-white px-4 py-3.5 rounded-md shadow-2xl border-l-4 border-[#3eb5e6] flex items-start gap-3 animate-in fade-in slide-in-from-top-3 duration-150">
          <CheckCircle2 className="w-5 h-5 text-[#3eb5e6] shrink-0 mt-0.5" />
          <div className="flex-1 text-xs">
            <p className="font-bold">{toast.title}</p>
            <p className="text-slate-300 mt-0.5">{toast.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 1. Cabeçalho Superior Específico do Módulo de Pacotes (Fiel à Imagem 23) */}
      <header className="w-full bg-white border-b border-slate-200 px-6 lg:px-10 h-14 flex items-center justify-between sticky top-0 z-30">
        <nav className="flex flex-wrap items-center gap-4 sm:gap-6">
          {TOP_MENU.map((item) => {
            const isCurrent = item.label === 'PACOTES';
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  if (item.path !== '#') {
                    navigate(item.path);
                  }
                }}
                className={`text-[11px] tracking-wider uppercase transition-colors cursor-pointer ${
                  isCurrent
                    ? 'text-slate-900 font-bold'
                    : 'text-slate-600 hover:text-[#0077b5] font-medium'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-4 text-slate-600">
          <button
            type="button"
            className="inline-flex items-center gap-1 text-[11px] font-medium uppercase hover:text-slate-900 cursor-pointer"
          >
            <LifeBuoy className="w-3.5 h-3.5" />
            <span>AJUDA</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/')}
            title="Voltar ao Início"
            className="flex items-center gap-1 text-[#0077b5] cursor-pointer"
          >
            <UserCircle2 className="w-7 h-7 stroke-[1.5]" />
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* 2. Container Branco Central (Fiel à Imagem 23) */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 pt-8 pb-6 flex flex-col">
        <div className="flex-1 bg-white rounded-xs shadow-xs border border-slate-200/80 px-6 sm:px-10 py-8 flex flex-col justify-between">
          <div>
            {/* Abas: PACOTES CRIADOS | PACOTES ENVIADOS */}
            <div className="border-b border-slate-200 flex items-center gap-6 mb-4">
              <button
                type="button"
                onClick={() => setActiveTab('criados')}
                className={`pb-2.5 text-xs tracking-wide uppercase transition-colors cursor-pointer ${
                  activeTab === 'criados'
                    ? 'text-slate-800 font-bold border-b-2 border-slate-800 -mb-px'
                    : 'text-slate-500 hover:text-slate-800 font-medium'
                }`}
              >
                PACOTES CRIADOS
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('enviados')}
                className={`pb-2.5 text-xs tracking-wide uppercase transition-colors cursor-pointer ${
                  activeTab === 'enviados'
                    ? 'text-slate-800 font-bold border-b-2 border-slate-800 -mb-px'
                    : 'text-slate-500 hover:text-slate-800 font-medium'
                }`}
              >
                PACOTES ENVIADOS
              </button>
            </div>

            {/* Barra de Filtros: PESQUISAR PACOTE, Usuário, Datas, Ano, Mês e Botão CRIAR PACOTE */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3">
              <div className="flex flex-wrap items-center gap-2">
                {/* Input PESQUISAR PACOTE */}
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="PESQUISAR  PACOTE"
                  className="w-56 px-3 py-1.5 bg-[#e6e7e9] text-xs text-slate-700 placeholder:text-slate-400 rounded-xs outline-none focus:ring-1 focus:ring-[#3eb5e6]"
                />

                {/* Dropdown Usuário */}
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="px-3 py-1.5 bg-[#4a4f55] text-white text-xs rounded-xs outline-none cursor-pointer"
                >
                  <option value="">Usuário</option>
                  <option value="evora">Évora Models</option>
                  <option value="sophia">Sophia Booker</option>
                </select>

                {/* Dropdown Datas */}
                <select
                  value={selectedDateMode}
                  onChange={(e) => setSelectedDateMode(e.target.value)}
                  className="w-36 px-3 py-1.5 bg-[#4a4f55] text-white text-xs rounded-xs outline-none cursor-pointer"
                >
                  <option value="Datas">Datas</option>
                  <option value="Criado em">Data de Criação</option>
                  <option value="Enviado em">Data de Envio</option>
                </select>

                {/* Ícone de Ordenação */}
                <button
                  type="button"
                  title="Ordenar por data"
                  className="p-1.5 text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  <ArrowDownWideNarrow className="w-4 h-4" />
                </button>

                {/* Selectores Ano e Mês */}
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-2.5 py-1.5 bg-[#4a4f55] text-white text-xs rounded-xs outline-none cursor-pointer"
                >
                  <option value="">Ano</option>
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                </select>

                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="px-2.5 py-1.5 bg-[#4a4f55] text-white text-xs rounded-xs outline-none cursor-pointer"
                >
                  <option value="">Mês</option>
                  <option value="01">Janeiro</option>
                  <option value="02">Fevereiro</option>
                  <option value="03">Março</option>
                  <option value="10">Outubro</option>
                  <option value="11">Novembro</option>
                </select>
              </div>

              {/* Botão Azul Claro "CRIAR PACOTE" */}
              <button
                type="button"
                onClick={handleCreatePackage}
                className="px-4 py-1.5 bg-[#3eb5e6] hover:bg-[#2da3d4] active:scale-[0.99] text-white text-[11px] font-semibold uppercase tracking-wider rounded-xs shadow-2xs transition-all cursor-pointer"
              >
                CRIAR PACOTE
              </button>
            </div>

            {/* Sub-barra: TOTAL DE PACOTES: 0 | Paginação 30 ▾ 1 - 1 < | > */}
            <div className="py-2.5 border-b border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
              <div>
                <span>TOTAL DE PACOTES: </span>
                <strong className="font-bold text-slate-900">0</strong>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(e.target.value)}
                  className="px-2 py-1 bg-[#e6e7e9] text-slate-700 text-[11px] rounded-xs outline-none cursor-pointer"
                >
                  <option value="30">30</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>

                <div className="flex items-center gap-1.5 text-slate-500">
                  <span>
                    <strong className="text-slate-800">1</strong> - 1
                  </span>
                  <button
                    type="button"
                    className="p-0.5 hover:text-slate-800 cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-slate-300">|</span>
                  <button
                    type="button"
                    className="p-0.5 hover:text-slate-800 cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Corpo Central: Empty State ("Nenhum resultado encontrado" + Ilustração de Caixa Aberta) */}
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <p className="text-xs font-bold text-slate-700 mb-6">
                Nenhum resultado encontrado
              </p>

              {/* Ilustração Vetorial da Caixa Aberta com Linha Tracejada (Fiel à Imagem 23) */}
              <svg
                viewBox="0 0 280 260"
                className="w-64 h-60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Abas Superiores Traseiras */}
                <polygon
                  points="140,95 65,130 35,108 110,73"
                  fill="#f3f4f6"
                />
                <polygon
                  points="140,95 215,130 245,108 170,73"
                  fill="#f3f4f6"
                />

                {/* Interior da Caixa */}
                <polygon
                  points="140,95 215,130 140,165 65,130"
                  fill="#cfd4dc"
                />

                {/* Lateral Esquerda da Caixa */}
                <polygon
                  points="65,130 140,165 140,242 65,207"
                  fill="#c5cbd4"
                />

                {/* Lateral Direita da Caixa */}
                <polygon
                  points="215,130 140,165 140,242 215,207"
                  fill="#dcdfe5"
                />

                {/* Abas Frontais Abertas */}
                <polygon
                  points="65,130 140,165 112,188 37,153"
                  fill="#f3f4f6"
                />
                <polygon
                  points="215,130 140,165 168,188 243,153"
                  fill="#f3f4f6"
                />

                {/* Linha Tracejada saindo de dentro da caixa */}
                <path
                  d="M140 145 C 110 115, 195 95, 185 52 C 180 32, 150 28, 142 25"
                  stroke="#8b9098"
                  strokeWidth="2.5"
                  strokeDasharray="5 5"
                  strokeLinecap="round"
                />

                {/* Laço / Mosca estilizada no topo da linha tracejada */}
                <circle
                  cx="132"
                  cy="21"
                  r="9"
                  stroke="#8b9098"
                  strokeWidth="2.2"
                  fill="white"
                />
                <circle
                  cx="148"
                  cy="19"
                  r="7"
                  stroke="#8b9098"
                  strokeWidth="2.2"
                  fill="white"
                />
                <circle cx="141" cy="25" r="3.5" fill="#8b9098" />
              </svg>
            </div>
          </div>

          {/* Linha Divisória Inferior + Barra "/" Centralizada */}
          <div className="pt-4">
            <div className="border-t border-slate-300" />
            <div className="pt-2 text-center text-xs text-slate-600 font-medium">
              /
            </div>
          </div>
        </div>
      </main>

      {/* Rodapé "© Évora Models" */}
      <footer className="py-3 text-center text-[10px] tracking-wider uppercase text-slate-500">
        © Évora Models
      </footer>
    </div>
  );
}

