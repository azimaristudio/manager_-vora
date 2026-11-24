import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCountUp } from '../hooks/useCountUp';
import {
  Plus,
  Calendar,
  Users,
  FileSignature,
  Mail,
  Clock,
  TrendingUp,
  Cake,
  AlertTriangle,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Package,
  Briefcase,
  Send,
  Eye,
  EyeOff,
} from 'lucide-react';

const UPCOMING_EVENTS_48H = [
  {
    id: 'evt-1',
    dayLabel: 'Hoje',
    time: '09:30',
    type: 'Casting',
    badgeBg: 'bg-[#f8b400] text-[#161617]',
    talent: 'Sophia Évora',
    client: 'Vogue Brasil • Editorial Resort',
    location: 'Estúdio Bob Wolfenson (SP)',
  },
  {
    id: 'evt-2',
    dayLabel: 'Hoje',
    time: '11:00',
    type: 'P. Roupa',
    badgeBg: 'bg-[#3ab565] text-white',
    talent: 'Helena Valente',
    client: 'Animale • Coleção Inverno',
    location: 'Showroom Jardins',
  },
  {
    id: 'evt-3',
    dayLabel: 'Hoje',
    time: '14:30',
    type: 'Trabalho',
    badgeBg: 'bg-[#2aa9d2] text-white',
    talent: 'Lucas Montenegro',
    client: 'Natura Homem • Campanha TV',
    location: 'O2 Filmes • Cotia',
  },
  {
    id: 'evt-4',
    dayLabel: 'Hoje',
    time: '17:00',
    type: 'Callback',
    badgeBg: 'bg-[#c5299b] text-white',
    talent: 'Valentina Costa',
    client: 'Arezzo • Campanha Digital',
    location: 'Online / Zoom Casting',
  },
  {
    id: 'evt-5',
    dayLabel: 'Amanhã',
    time: '08:15',
    type: 'Vôo',
    badgeBg: 'bg-[#512da8] text-white',
    talent: 'Gabriel Albuquerque',
    client: 'LATAM LA3412 (REC → GRU)',
    location: 'Aeroporto Internacional do Recife',
  },
  {
    id: 'evt-6',
    dayLabel: 'Amanhã',
    time: '13:00',
    type: 'Ensaio fotográfico',
    badgeBg: 'bg-[#9265cc] text-white',
    talent: 'Amber Rodrigues',
    client: 'Atualização de Book & Polaroids',
    location: 'Azimari Studio • Recife',
  },
];

const SIX_MONTH_PERFORMANCE = [
  { month: 'Jun', revenue: 94, jobs: 11, label: 'R$ 94k' },
  { month: 'Jul', revenue: 112, jobs: 14, label: 'R$ 112k' },
  { month: 'Ago', revenue: 105, jobs: 12, label: 'R$ 105k' },
  { month: 'Set', revenue: 138, jobs: 16, label: 'R$ 138k' },
  { month: 'Out', revenue: 156, jobs: 19, label: 'R$ 156k' },
  { month: 'Nov', revenue: 148.5, jobs: 18, label: 'R$ 148,5k', isCurrent: true },
];

const BIRTHDAYS_TODAY = [
  {
    id: 'bday-1',
    name: 'Helena Valente',
    role: 'Talento • Modelo Fashion',
    ageOrNote: 'Completa 24 anos hoje',
    email: 'helena.valente@evoramodels.com.br',
    category: 'Talento',
  },
  {
    id: 'bday-2',
    name: 'Ricardo Vasconcelos',
    role: 'Cliente • Diretor de Casting (O2 Filmes)',
    ageOrNote: 'Contato VIP • São Paulo',
    email: 'ricardo.casting@o2filmes.com.br',
    category: 'Cliente',
  },
  {
    id: 'bday-3',
    name: 'Camila Queiroz',
    role: 'Cliente • Produtora Executiva (Conspiração)',
    ageOrNote: 'Parceira Comercial • Rio de Janeiro',
    email: 'camila@conspiracao.com.br',
    category: 'Cliente',
  },
];

const INCOMPLETE_PROFILES = [
  {
    id: 'inc-1',
    talentName: 'Sophia Évora',
    status: 'Ativo',
    missing: ['Snaps', 'Docs'],
    note: 'Aguardando upload de Polaroids atuais e RG/CPF digitalizado',
  },
  {
    id: 'inc-2',
    talentName: 'Gabriel Albuquerque',
    status: 'Ativo',
    missing: ['Book'],
    note: 'CompoMake possui apenas 2 de 5 fotos obrigatórias',
  },
  {
    id: 'inc-3',
    talentName: 'Amber Rodrigues',
    status: 'Ativo',
    missing: ['Docs'],
    note: 'Autorização de Direito de Imagem (Kids & Teens) pendente',
  },
  {
    id: 'inc-4',
    talentName: 'Lucas Montenegro',
    status: 'Ativo',
    missing: ['Snaps', 'Book'],
    note: 'Atualizar medidas de manequim e vídeo de apresentação',
  },
];

const MINI_CALENDAR_WEEKDAYS = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];

// Dias de Novembro 2026 com eventos marcados (pontinhos dourados)
const EVENT_DAYS_NOV = new Set([2, 4, 6, 9, 11, 14, 17, 18, 20, 23, 24, 26, 28, 30]);

function FinancialBarColumn({ item, index, maxRevenue, showFinancials }) {
  const heightPercent = Math.round((item.revenue / maxRevenue) * 100);
  const animatedRevenue = useCountUp(item.revenue, showFinancials, 850, index * 50);
  const animatedJobs = useCountUp(item.jobs, showFinancials, 850, index * 50);

  const hasDecimal = item.revenue % 1 !== 0;
  const formattedLabel = showFinancials
    ? `R$ ${
        hasDecimal
          ? animatedRevenue.toFixed(1).replace('.', ',')
          : Math.round(animatedRevenue)
      }k`
    : 'R$ 0';

  return (
    <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
      <span
        className={`text-[10px] font-semibold transition-opacity duration-300 ${
          showFinancials
            ? 'text-[#E8AC51] opacity-85 group-hover:opacity-100'
            : 'text-neutral-500 opacity-60'
        }`}
      >
        {formattedLabel}
      </span>
      <div className="w-full max-w-[38px] bg-white/5 rounded-t-md h-24 flex items-end overflow-hidden p-0.5 border border-white/5">
        <div
          style={{
            height: showFinancials ? `${heightPercent}%` : '0%',
            transitionDelay: showFinancials ? `${index * 50}ms` : '0ms',
          }}
          className={`w-full rounded-t-sm ${
            showFinancials ? 'transition-all duration-700 ease-out' : 'transition-none'
          } ${
            item.isCurrent
              ? 'bg-gradient-to-t from-[#880E1B] to-[#E8AC51]'
              : 'bg-[#880E1B] group-hover:bg-[#a31121]'
          }`}
        />
      </div>
      <div className="text-center">
        <span
          className={`block text-[11px] font-semibold ${
            item.isCurrent ? 'text-[#E8AC51]' : 'text-neutral-300'
          }`}
        >
          {item.month}
        </span>
        <span className="block text-[9px] text-neutral-400">
          {Math.round(animatedJobs)} jobs
        </span>
      </div>
    </div>
  );
}

export default function Dashboard({ talents = [], projectsMap = {} }) {
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);
  const [selectedCalDay, setSelectedCalDay] = useState(23);
  const [eventFilter, setEventFilter] = useState('TODOS');
  const [showFinancials, setShowFinancials] = useState(false);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      setIsMounted(true);
    });
    return () => cancelAnimationFrame(rafId);
  }, []);

  const activeTalentsCount = Math.max(
    28,
    talents.filter((t) => t.status === 'Ativo').length + 27
  );
  const standbyTalentsCount = Math.max(
    4,
    talents.filter((t) => t.status === 'Stand by').length + 4
  );
  const activeProjectsCount = Math.max(12, Object.keys(projectsMap).length + 11);

  const animatedTodayEvents = useCountUp(6, isMounted, 800, 60);
  const animatedActiveTalents = useCountUp(activeTalentsCount, isMounted, 900, 120);
  const animatedStandbyTalents = useCountUp(standbyTalentsCount, isMounted, 900, 120);
  const animatedPendingCount = useCountUp(4, isMounted, 800, 180);
  const animatedActiveProjects = useCountUp(activeProjectsCount, isMounted, 900, 180);
  const animatedWebmailPackages = useCountUp(9, isMounted, 850, 240);

  const animatedSemestralTotal = useCountUp(753500, showFinancials, 950);
  const animatedSemestralGrowth = useCountUp(18.4, showFinancials, 900);
  const animatedMonthlyRev = useCountUp(148500, showFinancials, 950);
  const animatedMonthlyGoal = useCountUp(180000, showFinancials, 950);
  const animatedMonthlyPct = useCountUp(82.5, showFinancials, 950);
  const animatedConvPct = useCountUp(34, showFinancials, 950);
  const animatedClosedJobs = useCountUp(18, showFinancials, 950);
  const animatedTotalCastings = useCountUp(53, showFinancials, 950);
  const animatedPkgPct = useCountUp(68, showFinancials, 950);
  const animatedSelectedPkgs = useCountUp(15, showFinancials, 950);
  const animatedSentPkgs = useCountUp(22, showFinancials, 950);
  const animatedCommissions = useCountUp(29700, showFinancials, 950);

  const filteredEvents =
    eventFilter === 'TODOS'
      ? UPCOMING_EVENTS_48H
      : UPCOMING_EVENTS_48H.filter((e) => e.dayLabel === eventFilter);

  const maxRevenue = Math.max(...SIX_MONTH_PERFORMANCE.map((m) => m.revenue));

  // Novembro 2026 começa num Domingo (offset 6 na grade Seg..Dom) e tem 30 dias
  const novOffset = 6;
  const novDays = Array.from({ length: 30 }, (_, i) => i + 1);

  const entranceClass = isMounted
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 translate-y-2';

  return (
    <div className="w-full pb-16 space-y-6 select-none">
      {/* 1. CABEÇALHO DE BOAS-VINDAS & AÇÕES RÁPIDAS */}
      <div
        style={{ transitionDelay: '0ms' }}
        className={`bg-[#1c1c1e] border border-white/10 rounded-xl p-5 md:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-lg transition-all duration-500 ease-out ${entranceClass}`}
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E8AC51]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Painel Operacional • Évora Models</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Bem-vindo de volta, Mozart de Marias
          </h1>
          <p className="text-xs text-neutral-400">
            Resumo executivo de castings, talentos, pacotes e faturamento da agência em tempo real.
          </p>
        </div>

        {/* Botões Compactos de Ação Rápida (#880E1B) */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/talentos/novo')}
            className="px-3.5 py-2 bg-[#880E1B] hover:bg-[#a31121] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5] text-[#E8AC51]" />
            <span>Novo Talento</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/projetos')}
            className="px-3.5 py-2 bg-[#880E1B] hover:bg-[#a31121] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5] text-[#E8AC51]" />
            <span>Novo Projeto</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/pacotes/novo')}
            className="px-3.5 py-2 bg-[#880E1B] hover:bg-[#a31121] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5] text-[#E8AC51]" />
            <span>Criar Pacote</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/calendario')}
            className="px-3.5 py-2 bg-[#880E1B] hover:bg-[#a31121] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5] text-[#E8AC51]" />
            <span>Agendar Casting</span>
          </button>
        </div>
      </div>

      {/* 2. TOP KPI ROW (4 Cartões Clicáveis) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Trabalhos & Castings Hoje */}
        <button
          type="button"
          onClick={() => navigate('/calendario')}
          style={{ transitionDelay: '60ms' }}
          className={`group text-left bg-[#1c1c1e] hover:bg-[#1c1c1e]/90 border border-white/10 hover:border-[#E8AC51]/50 rounded-xl p-5 transition-all duration-500 ease-out cursor-pointer shadow-md ${entranceClass}`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="w-10 h-10 rounded-lg bg-[#161617] border border-white/10 flex items-center justify-center text-[#E8AC51]">
              <Calendar className="w-5 h-5" />
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#E8AC51] group-hover:translate-x-0.5 transition-transform">
              <span>Ver agenda</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <p className="text-xs font-medium text-neutral-400">
            Trabalhos & Castings Hoje
          </p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white tabular-nums">
              {Math.round(animatedTodayEvents)}
            </span>
            <span className="text-[11px] text-[#E8AC51] font-medium">
              +2 vs. ontem
            </span>
          </div>
          <p className="mt-2 text-[11px] text-neutral-400">
            2 Trabalhos • 2 Castings • 1 Callback • 1 P. Roupa
          </p>
        </button>

        {/* KPI 2: Talentos Ativos */}
        <button
          type="button"
          onClick={() => navigate('/talentos')}
          style={{ transitionDelay: '120ms' }}
          className={`group text-left bg-[#1c1c1e] hover:bg-[#1c1c1e]/90 border border-white/10 hover:border-[#E8AC51]/50 rounded-xl p-5 transition-all duration-500 ease-out cursor-pointer shadow-md ${entranceClass}`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="w-10 h-10 rounded-lg bg-[#161617] border border-white/10 flex items-center justify-center text-[#E8AC51]">
              <Users className="w-5 h-5" />
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#E8AC51] group-hover:translate-x-0.5 transition-transform">
              <span>Casting completo</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <p className="text-xs font-medium text-neutral-400">Talentos Ativos</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white tabular-nums">
              {Math.round(animatedActiveTalents)}
            </span>
            <span className="text-[11px] text-neutral-400 tabular-nums">
              / {Math.round(animatedStandbyTalents)} em Stand-by
            </span>
          </div>
          <p className="mt-2 text-[11px] text-neutral-400">
            19 Feminino • 9 Masculino • 3 New Faces no mês
          </p>
        </button>

        {/* KPI 3: Pendências & Contratos */}
        <button
          type="button"
          onClick={() => navigate('/projetos')}
          style={{ transitionDelay: '180ms' }}
          className={`group text-left bg-[#1c1c1e] hover:bg-[#1c1c1e]/90 border border-white/10 hover:border-[#E8AC51]/50 rounded-xl p-5 transition-all duration-500 ease-out cursor-pointer shadow-md ${entranceClass}`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="w-10 h-10 rounded-lg bg-[#161617] border border-white/10 flex items-center justify-center text-[#E8AC51]">
              <FileSignature className="w-5 h-5" />
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#880E1B] text-white text-[10px] font-bold">
              1 Urgente
            </span>
          </div>
          <p className="text-xs font-medium text-neutral-400">
            Pendências & Contratos
          </p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white tabular-nums">
              {Math.round(animatedPendingCount)}
            </span>
            <span className="text-[11px] text-[#E8AC51] font-medium tabular-nums">
              {Math.round(animatedActiveProjects)} projetos ativos
            </span>
          </div>
          <p className="mt-2 text-[11px] text-neutral-400">
            1 contrato (Sophia Évora) vence em 30/Nov • 3 opções
          </p>
        </button>

        {/* KPI 4: Webmail & Pacotes */}
        <div
          style={{ transitionDelay: '240ms' }}
          className={`bg-[#1c1c1e] border border-white/10 hover:border-[#E8AC51]/50 rounded-xl p-5 transition-all duration-500 ease-out shadow-md flex flex-col justify-between ${entranceClass}`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="w-10 h-10 rounded-lg bg-[#161617] border border-white/10 flex items-center justify-center text-[#E8AC51]">
                <Mail className="w-5 h-5" />
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => navigate('/webmail/inbox')}
                  className="px-2 py-1 rounded-md bg-[#161617] hover:bg-[#880E1B] text-[10px] font-semibold text-[#E8AC51] hover:text-white border border-white/10 transition-colors cursor-pointer"
                >
                  Webmail
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/pacotes')}
                  className="px-2 py-1 rounded-md bg-[#161617] hover:bg-[#880E1B] text-[10px] font-semibold text-[#E8AC51] hover:text-white border border-white/10 transition-colors cursor-pointer"
                >
                  Pacotes
                </button>
              </div>
            </div>
            <p className="text-xs font-medium text-neutral-400">
              Webmail & Pacotes
            </p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white tabular-nums">
                {Math.round(animatedWebmailPackages)}
              </span>
              <span className="text-[11px] text-[#E8AC51] font-medium">
                5 pacotes abertos
              </span>
            </div>
          </div>
          <p className="mt-2 text-[11px] text-neutral-400">
            4 e-mails não lidos • 5 pacotes visualizados por clientes
          </p>
        </div>
      </div>

      {/* 3. MIDDLE GRID (2 Colunas no Desktop: Agenda do Dia + Mini Calendário | Desempenho & Financeiro) */}
      <div
        style={{ transitionDelay: '300ms' }}
        className={`grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch transition-all duration-500 ease-out ${entranceClass}`}
      >
        {/* COLUNA ESQUERDA (7 cols): Agenda do Dia (Próximas 48h) + Mini-Calendário */}
        <div className="lg:col-span-7 bg-[#1c1c1e] border border-white/10 rounded-xl p-5 md:p-6 flex flex-col justify-between shadow-md">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-[#161617] border border-white/10 flex items-center justify-center text-[#E8AC51]">
                  <Clock className="w-4 h-4" />
                </span>
                <div>
                  <h2 className="text-sm font-bold text-white">
                    Agenda do Dia (Próximas 48h)
                  </h2>
                  <p className="text-[11px] text-neutral-400">
                    Cronograma de castings, provas de roupa, vôos e trabalhos confirmados
                  </p>
                </div>
              </div>

              {/* Filtro Rápido Hoje / Amanhã / Todos */}
              <div className="flex items-center gap-1 bg-[#161617] p-1 rounded-lg border border-white/10 self-start sm:self-auto">
                {['TODOS', 'Hoje', 'Amanhã'].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setEventFilter(tab)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                      eventFilter === tab
                        ? 'bg-[#880E1B] text-white'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Layout Interno: Lista Cronológica + Mini-Calendário Mensal ao lado/abaixo */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
              {/* Lista Cronológica de Eventos (7 cols) */}
              <div className="md:col-span-7 space-y-2.5">
                {filteredEvents.map((ev) => (
                  <div
                    key={ev.id}
                    onClick={() => navigate('/calendario')}
                    className="p-3 rounded-lg bg-[#161617] hover:bg-[#161617]/80 border border-white/10 hover:border-[#E8AC51]/40 transition-all cursor-pointer flex items-start justify-between gap-3"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="text-center shrink-0 pt-0.5">
                        <span className="block text-xs font-bold text-[#E8AC51]">
                          {ev.time}
                        </span>
                        <span className="block text-[9px] uppercase tracking-wider text-neutral-400">
                          {ev.dayLabel}
                        </span>
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${ev.badgeBg}`}
                          >
                            {ev.type}
                          </span>
                          <span className="text-xs font-bold text-white truncate">
                            {ev.talent}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-300 mt-1 truncate">
                          {ev.client}
                        </p>
                        <p className="text-[10px] text-neutral-400 truncate">
                          {ev.location}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mini-Calendário Mensal Compacto com pontos dourados #E8AC51 (5 cols) */}
              <div className="md:col-span-5 bg-[#161617] border border-white/10 rounded-xl p-4">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                  <span className="text-xs font-bold text-white">
                    Novembro 2026
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => navigate('/calendario')}
                      className="p-1 text-neutral-400 hover:text-[#E8AC51] rounded cursor-pointer"
                      title="Abrir Calendário Completo"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/calendario')}
                      className="p-1 text-neutral-400 hover:text-[#E8AC51] rounded cursor-pointer"
                      title="Abrir Calendário Completo"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Cabeçalho Seg..Dom */}
                <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
                  {MINI_CALENDAR_WEEKDAYS.map((wd, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-bold text-neutral-400"
                    >
                      {wd}
                    </span>
                  ))}
                </div>

                {/* Dias do Mês com Pontos Dourados (#E8AC51) */}
                <div className="grid grid-cols-7 gap-1 text-center">
                  {Array.from({ length: novOffset }).map((_, idx) => (
                    <div key={`empty-${idx}`} className="h-7" />
                  ))}
                  {novDays.map((day) => {
                    const hasEvent = EVENT_DAYS_NOV.has(day);
                    const isSelected = selectedCalDay === day;
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => setSelectedCalDay(day)}
                        className={`h-7 rounded-md text-[11px] flex flex-col items-center justify-center relative transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#880E1B] text-white font-bold'
                            : 'text-neutral-300 hover:bg-[#1c1c1e]'
                        }`}
                      >
                        <span className="leading-none">{day}</span>
                        {hasEvent && (
                          <span className="w-1 h-1 rounded-full bg-[#E8AC51] mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-neutral-400">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#E8AC51]" />
                    <span>Dias com atividades</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => navigate('/calendario')}
                    className="text-[#E8AC51] hover:underline font-semibold cursor-pointer"
                  >
                    Ver mês →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Rodapé de Legenda Rápida */}
          <div className="mt-5 pt-3.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-neutral-400">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#f8b400]" />
                <span>Casting</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#c5299b]" />
                <span>Callback</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#3ab565]" />
                <span>P. Roupa</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#2aa9d2]" />
                <span>Trabalho</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#9265cc]" />
                <span>Ensaio</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#512da8]" />
                <span>Vôo</span>
              </span>
            </div>

            <button
              type="button"
              onClick={() => navigate('/calendario')}
              className="text-[#E8AC51] hover:underline font-semibold cursor-pointer"
            >
              Abrir Calendário Completo →
            </button>
          </div>
        </div>

        {/* COLUNA DIREITA (5 cols): Desempenho & Financeiro */}
        <div className="lg:col-span-5 bg-[#1c1c1e] border border-white/10 rounded-xl p-5 md:p-6 flex flex-col shadow-md">
          <div className="flex items-center justify-between gap-3 pb-4 mb-5 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-[#161617] border border-white/10 flex items-center justify-center text-[#E8AC51]">
                <TrendingUp className="w-4 h-4" />
              </span>
              <div>
                <h2 className="text-sm font-bold text-white">
                  Desempenho & Financeiro
                </h2>
                <p className="text-[11px] text-neutral-400">
                  Faturamento e trabalhos fechados (últimos 6 meses)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {showFinancials && (
                <button
                  type="button"
                  onClick={() => setShowFinancials(false)}
                  title="Ocultar valores financeiros"
                  aria-label="Ocultar valores financeiros"
                  className="p-1.5 rounded-lg bg-[#161617] border border-white/10 text-neutral-400 hover:text-[#E8AC51] hover:border-[#E8AC51]/40 transition-colors cursor-pointer"
                >
                  <EyeOff className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={() => navigate('/contabilidade')}
                className="text-[11px] font-semibold text-[#E8AC51] hover:underline cursor-pointer"
              >
                Contabilidade →
              </button>
            </div>
          </div>

          <div className="relative flex-1 flex flex-col justify-between">
            <div
              role="button"
              tabIndex={showFinancials ? -1 : 0}
              aria-hidden={showFinancials}
              onClick={() => {
                if (!showFinancials) setShowFinancials(true);
              }}
              onKeyDown={(e) => {
                if (!showFinancials && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  setShowFinancials(true);
                }
              }}
              className={`absolute inset-0 flex flex-col items-center justify-center bg-[#161617]/55 backdrop-blur-sm rounded-xl z-10 transition-all duration-500 ease-out ${
                showFinancials
                  ? 'opacity-0 scale-105 pointer-events-none'
                  : 'opacity-100 scale-100 cursor-pointer'
              }`}
            >
              <div className="px-4 py-2.5 rounded-xl bg-[#1c1c1e]/95 border border-white/10 shadow-lg flex items-center gap-2.5 hover:border-[#E8AC51]/50 hover:scale-[1.02] transition-all">
                <Eye className="w-4 h-4 text-[#E8AC51]" />
                <span className="text-xs font-semibold text-white">
                  Clique para visualizar
                </span>
              </div>
            </div>

            <div
              className={`flex-1 flex flex-col justify-between transition-all duration-500 ${
                !showFinancials
                  ? 'blur-md select-none pointer-events-none'
                  : 'blur-0'
              }`}
            >
              <div>
                {/* Gráfico de Barras Responsivo (Últimos 6 Meses) */}
                <div className="bg-[#161617] border border-white/10 rounded-xl p-4 mb-5">
                  <div className="flex items-center justify-between text-xs mb-4">
                    <div>
                      <span className="text-neutral-400">Acumulado Semestral: </span>
                      <strong className="text-white font-bold tabular-nums">
                        {showFinancials
                          ? `R$ ${Math.round(animatedSemestralTotal).toLocaleString('pt-BR')}`
                          : 'R$ 0'}
                      </strong>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#E8AC51]/15 text-[#E8AC51] text-[10px] font-bold tabular-nums">
                      {showFinancials
                        ? `+${animatedSemestralGrowth.toFixed(1).replace('.', ',')}% vs. semestre ant.`
                        : '0% vs. semestre ant.'}
                    </span>
                  </div>

                  <div className="h-40 flex items-end justify-between gap-2.5 pt-4 px-1">
                    {SIX_MONTH_PERFORMANCE.map((item, idx) => (
                      <FinancialBarColumn
                        key={item.month}
                        item={item}
                        index={idx}
                        maxRevenue={maxRevenue}
                        showFinancials={showFinancials}
                      />
                    ))}
                  </div>
                </div>

                {/* Barras de Progresso Horizontais (Metas & Conversão) */}
                <div className="space-y-4">
                  {/* Meta Mensal de Faturamento */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-300 font-medium">
                        Meta de Faturamento Mensal (Nov)
                      </span>
                      <span className="font-bold text-white tabular-nums">
                        {showFinancials
                          ? `R$ ${Math.round(animatedMonthlyRev).toLocaleString('pt-BR')}`
                          : 'R$ 0'}{' '}
                        <span className="text-neutral-400 font-normal">
                          / {showFinancials
                            ? `R$ ${Math.round(animatedMonthlyGoal).toLocaleString('pt-BR')}`
                            : 'R$ 0'}{' '}
                          ({showFinancials
                            ? `${animatedMonthlyPct.toFixed(1).replace('.', ',')}%`
                            : '0%'})
                        </span>
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                      <div
                        className={`h-full bg-gradient-to-r from-[#880E1B] to-[#E8AC51] rounded-full ${
                          showFinancials
                            ? 'transition-all duration-1000 ease-out'
                            : 'transition-none'
                        }`}
                        style={{ width: showFinancials ? '82.5%' : '0%' }}
                      />
                    </div>
                  </div>

                  {/* Taxa de Conversão: Castings -> Trabalhos */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-300 font-medium">
                        Taxa de Conversão (Castings → Trabalhos)
                      </span>
                      <span className="font-bold text-[#E8AC51] tabular-nums">
                        {showFinancials ? `${Math.round(animatedConvPct)}%` : '0%'}{' '}
                        <span className="text-neutral-400 font-normal">
                          ({Math.round(animatedClosedJobs)} fechados de{' '}
                          {Math.round(animatedTotalCastings)} castings)
                        </span>
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                      <div
                        className={`h-full bg-[#E8AC51] rounded-full ${
                          showFinancials
                            ? 'transition-all duration-1000 ease-out'
                            : 'transition-none'
                        }`}
                        style={{ width: showFinancials ? '34%' : '0%' }}
                      />
                    </div>
                  </div>

                  {/* Taxa de Engajamento de Pacotes */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-300 font-medium">
                        Pacotes com Seleção de Clientes
                      </span>
                      <span className="font-bold text-white tabular-nums">
                        {showFinancials ? `${Math.round(animatedPkgPct)}%` : '0%'}{' '}
                        <span className="text-neutral-400 font-normal">
                          ({Math.round(animatedSelectedPkgs)} de{' '}
                          {Math.round(animatedSentPkgs)} pacotes enviados)
                        </span>
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                      <div
                        className={`h-full bg-[#880E1B] rounded-full ${
                          showFinancials
                            ? 'transition-all duration-1000 ease-out'
                            : 'transition-none'
                        }`}
                        style={{ width: showFinancials ? '68%' : '0%' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400">
                <span className="tabular-nums">
                  Comissões líquidas do mês:{' '}
                  {showFinancials
                    ? `R$ ${Math.round(animatedCommissions).toLocaleString('pt-BR')}`
                    : 'R$ 0'}
                </span>
                <button
                  type="button"
                  onClick={() => navigate('/estatisticas')}
                  className="text-[#E8AC51] hover:underline font-semibold cursor-pointer"
                >
                  Ver Ranking & Estatísticas →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM ROW — CENTRAL DE ALERTAS (Aniversariantes do Dia & Perfis Incompletos) */}
      <div
        style={{ transitionDelay: '380ms' }}
        className={`grid grid-cols-1 lg:grid-cols-2 gap-6 transition-all duration-500 ease-out ${entranceClass}`}
      >
        {/* Card Esquerdo: Aniversariantes do Dia */}
        <div className="bg-[#1c1c1e] border border-white/10 rounded-xl p-5 md:p-6 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-[#161617] border border-white/10 flex items-center justify-center text-[#E8AC51]">
                  <Cake className="w-4 h-4" />
                </span>
                <div>
                  <h2 className="text-sm font-bold text-white">
                    Aniversariantes do Dia
                  </h2>
                  <p className="text-[11px] text-neutral-400">
                    Talentos e contatos de clientes celebrando aniversário hoje
                  </p>
                </div>
              </div>

              <span className="px-2.5 py-0.5 rounded-full bg-[#E8AC51]/15 text-[#E8AC51] text-[11px] font-bold">
                {BIRTHDAYS_TODAY.length} hoje
              </span>
            </div>

            <div className="space-y-3">
              {BIRTHDAYS_TODAY.map((person) => (
                <div
                  key={person.id}
                  className="p-3.5 rounded-lg bg-[#161617] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-[#880E1B] text-white font-serif font-bold text-xs flex items-center justify-center shrink-0 border border-[#E8AC51]/40">
                      {person.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-bold text-white truncate">
                          {person.name}
                        </p>
                        <span className="px-1.5 py-0.2 rounded bg-[#1c1c1e] border border-white/10 text-[9px] font-semibold text-[#E8AC51] uppercase">
                          {person.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-300 truncate">
                        {person.role}
                      </p>
                      <p className="text-[10px] text-neutral-400">
                        {person.ageOrNote}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate('/webmail/new')}
                    className="px-3 py-1.5 bg-[#880E1B] hover:bg-[#a31121] text-white text-[11px] font-semibold rounded-md inline-flex items-center gap-1.5 shrink-0 self-start sm:self-center transition-colors cursor-pointer"
                  >
                    <Send className="w-3 h-3 text-[#E8AC51]" />
                    <span>Parabenizar</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400">
            <span>Próximos 7 dias: 5 aniversários programados</span>
            <button
              type="button"
              onClick={() => navigate('/contatos')}
              className="text-[#E8AC51] hover:underline font-semibold cursor-pointer"
            >
              Ver todos os contatos →
            </button>
          </div>
        </div>

        {/* Card Direito: Perfis Incompletos */}
        <div className="bg-[#1c1c1e] border border-white/10 rounded-xl p-5 md:p-6 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-[#161617] border border-white/10 flex items-center justify-center text-[#E8AC51]">
                  <AlertTriangle className="w-4 h-4" />
                </span>
                <div>
                  <h2 className="text-sm font-bold text-white">
                    Perfis Incompletos — Central de Alertas
                  </h2>
                  <p className="text-[11px] text-neutral-400">
                    Talentos ativos com pendências de Book, Snaps ou Documentação
                  </p>
                </div>
              </div>

              <span className="px-2.5 py-0.5 rounded-full bg-[#880E1B] text-white text-[11px] font-bold">
                {INCOMPLETE_PROFILES.length} alertas
              </span>
            </div>

            <div className="space-y-3">
              {INCOMPLETE_PROFILES.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-lg bg-[#161617] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-xs font-bold text-white">
                        {item.talentName}
                      </span>
                      {item.missing.map((badge) => (
                        <span
                          key={badge}
                          className="px-2 py-0.5 rounded bg-[#880E1B]/40 border border-[#880E1B] text-[#E8AC51] text-[10px] font-bold uppercase"
                        >
                          Falta: {badge}
                        </span>
                      ))}
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-snug">
                      {item.note}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate('/talentos/novo')}
                    className="px-3 py-1.5 bg-[#1c1c1e] hover:bg-[#880E1B] border border-white/10 text-[#E8AC51] hover:text-white text-[11px] font-semibold rounded-md shrink-0 self-start sm:self-center transition-colors cursor-pointer"
                  >
                    Completar Perfil
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#E8AC51]" />
              <span>86% do casting ativo está com book e documentos 100% em dia</span>
            </span>
            <button
              type="button"
              onClick={() => navigate('/talentos')}
              className="text-[#E8AC51] hover:underline font-semibold cursor-pointer"
            >
              Auditar Talentos →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
