import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ListOrdered,
  Settings,
  Mail,
  Download,
  ChevronDown,
  Globe,
} from 'lucide-react';
import ActivitiesStats from './ActivitiesStats';
import PackagesStats from './PackagesStats';

const MAIN_TABS = [
  { key: 'ranking', label: 'Ranking', Icon: ListOrdered },
  { key: 'atividades', label: 'Atividades', Icon: Settings },
  { key: 'pacotes', label: 'Pacotes', Icon: Mail },
];

const RANKING_SUB_MENUS = [
  {
    key: 'talentos',
    label: 'Talentos',
    pageTitle: 'Ranking de Talentos',
    tableColumnHeader: 'Talento',
  },
  {
    key: 'clientes',
    label: 'Clientes',
    pageTitle: 'Ranking de clientes',
    tableColumnHeader: 'Cliente',
  },
  {
    key: 'departamentos',
    label: 'Departamentos',
    pageTitle: 'Ranking de departamentos',
    tableColumnHeader: 'Departamento',
  },
];

export default function StatisticsLayout() {
  // Estado para a aba principal ativa ('ranking' | 'atividades' | 'pacotes')
  const [activeMainTab, setActiveMainTab] = useState('ranking');

  // Estado para o sub-menu lateral da aba Ranking ('talentos' | 'clientes' | 'departamentos')
  const [activeRankingSubMenu, setActiveRankingSubMenu] = useState('talentos');

  // Estados dos filtros do formulário 'Opções' na aba Ranking
  const [dateFrom, setDateFrom] = useState('01/01/2026');
  const [dateTo, setDateTo] = useState('31/10/2026');
  const [currency, setCurrency] = useState('BRL - Brazil Real');
  const [gender, setGender] = useState('Todos');
  const [booker, setBooker] = useState('Você');
  const [responsibleBooker, setResponsibleBooker] = useState('Qualquer');
  const [jobType, setJobType] = useState('Apenas trabalhos fechados');
  const [analyzeByClosingDate, setAnalyzeByClosingDate] = useState(false);
  const [classificationLimit, setClassificationLimit] = useState('10');
  const [showActiveTalentsWithoutJobs, setShowActiveTalentsWithoutJobs] =
    useState(false);
  const [includeExtraCommission, setIncludeExtraCommission] = useState(true);

  // Estado do dropdown 'EXPORTAR'
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);
  const exportRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (exportRef.current && !exportRef.current.contains(event.target)) {
        setIsExportDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentRankingConfig =
    RANKING_SUB_MENUS.find((item) => item.key === activeRankingSubMenu) ||
    RANKING_SUB_MENUS[0];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white flex flex-col justify-between py-4 px-4 sm:px-8">
      <div className="max-w-[1160px] w-full mx-auto">
        {/* Topo: Breadcrumb 'Início > Estatísticas' */}
        <div className="bg-[#f5f5f5] border border-slate-200/80 rounded-xs px-4 py-3 flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-1.5 text-xs">
            <Link
              to="/"
              className="text-[#0077b5] hover:underline font-normal"
            >
              Início
            </Link>
            <span className="text-slate-400">&gt;</span>
            <span className="text-slate-500 font-normal">Estatísticas</span>
          </div>
        </div>

        {/* Menu de Abas Principais (Topo): Ranking | Atividades | Pacotes */}
        <div className="border-b border-slate-200 flex flex-wrap items-end gap-1.5 mb-5">
          {MAIN_TABS.map(({ key, label, Icon }) => {
            const isActive = activeMainTab === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveMainTab(key)}
                className={`px-3.5 py-2.5 rounded-t-xs flex items-center gap-2 text-xs transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-white border border-b-white border-slate-300 -mb-px text-slate-700 font-normal shadow-[0_-1px_0_0_rgba(0,0,0,0.02)] outline-1 outline-dotted outline-slate-400 -outline-offset-2'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-normal'
                }`}
              >
                <span className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0">
                  <Icon className="w-3.5 h-3.5" />
                </span>
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Conteúdo Dinâmico de acordo com a Aba Principal Selecionada */}
        {activeMainTab === 'ranking' && (
          <div className="pt-1 pb-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Sub-menu Lateral à Esquerda: Talentos, Clientes e Departamentos */}
              <aside className="lg:col-span-2 pt-3 space-y-1">
                {RANKING_SUB_MENUS.map((sub) => {
                  const isSubActive = activeRankingSubMenu === sub.key;
                  return (
                    <button
                      key={sub.key}
                      type="button"
                      onClick={() => setActiveRankingSubMenu(sub.key)}
                      className={`w-full text-left px-3 py-2 rounded-xs text-xs transition-colors cursor-pointer ${
                        isSubActive
                          ? 'bg-[#0077b5] text-white font-normal outline-1 outline-dotted outline-sky-200 -outline-offset-2'
                          : 'text-[#0077b5] hover:bg-sky-50 font-normal'
                      }`}
                    >
                      {sub.label}
                    </button>
                  );
                })}
              </aside>

              {/* Área Central (Título Dinâmico + Formulário 'Opções') e Área Direita (Tabela de Resultados) */}
              <div className="lg:col-span-10">
                {/* Título Dinâmico Acima */}
                <h1 className="text-[22px] text-slate-600 font-normal text-center mb-4">
                  {currentRankingConfig.pageTitle}
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Coluna Central: Formulário 'Opções' */}
                  <div className="lg:col-span-7">
                    <h2 className="text-[17px] text-slate-600 font-normal text-center mb-3">
                      Opções
                    </h2>

                    <div className="space-y-3 text-[11px] text-slate-600">
                      {/* Linha De e Até */}
                      <div className="grid grid-cols-12 items-center gap-3">
                        <label className="col-span-4 text-right text-slate-600">
                          De
                        </label>
                        <div className="col-span-8 flex items-center gap-2">
                          <input
                            type="text"
                            value={dateFrom}
                            onChange={(e) => setDateFrom(e.target.value)}
                            className="w-36 h-8 px-2.5 border border-slate-200 rounded-xs text-xs font-bold text-slate-700 focus:outline-none focus:border-[#0077b5]"
                          />
                          <span className="text-slate-600 px-2">Até</span>
                          <input
                            type="text"
                            value={dateTo}
                            onChange={(e) => setDateTo(e.target.value)}
                            className="w-36 h-8 px-2.5 border border-slate-200 rounded-xs text-xs font-bold text-slate-700 focus:outline-none focus:border-[#0077b5]"
                          />
                        </div>
                      </div>

                      {/* Moeda */}
                      <div className="grid grid-cols-12 items-center gap-3">
                        <label className="col-span-4 text-right text-slate-600">
                          Moeda
                        </label>
                        <div className="col-span-8">
                          <div className="relative w-full max-w-[300px]">
                            <select
                              value={currency}
                              onChange={(e) => setCurrency(e.target.value)}
                              className="w-full h-8 px-2.5 pr-7 border border-slate-200 rounded-xs bg-white text-xs font-bold text-slate-700 appearance-none focus:outline-none focus:border-[#0077b5]"
                            >
                              <option value="BRL - Brazil Real">
                                BRL - Brazil Real
                              </option>
                              <option value="USD - US Dollar">
                                USD - US Dollar
                              </option>
                              <option value="EUR - Euro">EUR - Euro</option>
                            </select>
                            <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      {/* Campos exclusivos de 'Talentos' (Imagem 49) */}
                      {activeRankingSubMenu === 'talentos' && (
                        <>
                          {/* Gênero */}
                          <div className="grid grid-cols-12 items-center gap-3">
                            <label className="col-span-4 text-right text-slate-600">
                              Gênero
                            </label>
                            <div className="col-span-8">
                              <div className="relative w-full max-w-[300px]">
                                <select
                                  value={gender}
                                  onChange={(e) => setGender(e.target.value)}
                                  className="w-full h-8 px-2.5 pr-7 border border-slate-200 rounded-xs bg-white text-xs font-bold text-slate-700 appearance-none focus:outline-none focus:border-[#0077b5]"
                                >
                                  <option value="Todos">Todos</option>
                                  <option value="Feminino">Feminino</option>
                                  <option value="Masculino">Masculino</option>
                                </select>
                                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                              </div>
                            </div>
                          </div>

                          {/* Booker */}
                          <div className="grid grid-cols-12 items-center gap-3">
                            <label className="col-span-4 text-right text-slate-600">
                              Booker
                            </label>
                            <div className="col-span-8">
                              <div className="relative w-full max-w-[300px]">
                                <select
                                  value={booker}
                                  onChange={(e) => setBooker(e.target.value)}
                                  className="w-full h-8 px-2.5 pr-7 border border-slate-200 rounded-xs bg-white text-xs font-bold text-slate-700 appearance-none focus:outline-none focus:border-[#0077b5]"
                                >
                                  <option value="Você">Você</option>
                                  <option value="Todos">Todos</option>
                                </select>
                                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                              </div>
                            </div>
                          </div>

                          {/* Booker Responsável */}
                          <div className="grid grid-cols-12 items-center gap-3">
                            <label className="col-span-4 text-right text-slate-600">
                              Booker Responsável
                            </label>
                            <div className="col-span-8">
                              <div className="relative w-full max-w-[300px]">
                                <select
                                  value={responsibleBooker}
                                  onChange={(e) =>
                                    setResponsibleBooker(e.target.value)
                                  }
                                  className="w-full h-8 px-2.5 pr-7 border border-slate-200 rounded-xs bg-white text-xs font-bold text-slate-700 appearance-none focus:outline-none focus:border-[#0077b5]"
                                >
                                  <option value="Qualquer">Qualquer</option>
                                  <option value="Mozart de Marias">
                                    Mozart de Marias
                                  </option>
                                </select>
                                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {/* Tipo de Trabalhos (presente nas 3 vistas) */}
                      <div className="grid grid-cols-12 items-center gap-3">
                        <label className="col-span-4 text-right text-slate-600">
                          Tipo de Trabalhos
                        </label>
                        <div className="col-span-8">
                          <div className="relative w-full max-w-[300px]">
                            <select
                              value={jobType}
                              onChange={(e) => setJobType(e.target.value)}
                              className="w-full h-8 px-2.5 pr-7 border border-slate-200 rounded-xs bg-white text-xs font-bold text-slate-700 appearance-none focus:outline-none focus:border-[#0077b5]"
                            >
                              <option value="Apenas trabalhos fechados">
                                Apenas trabalhos fechados
                              </option>
                              <option value="Todos os trabalhos">
                                Todos os trabalhos
                              </option>
                            </select>
                            <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      {/* Checkbox 'Analisar por data de fechamento de trabalho' */}
                      <div className="grid grid-cols-12 items-center gap-3">
                        <div className="col-span-4" />
                        <div className="col-span-8">
                          <label className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={analyzeByClosingDate}
                              onChange={(e) =>
                                setAnalyzeByClosingDate(e.target.checked)
                              }
                              className="w-3.5 h-3.5 rounded-xs border-slate-300 text-[#0077b5]"
                            />
                            <span>
                              Analisar por data de fechamento de trabalho
                            </span>
                          </label>
                        </div>
                      </div>

                      {/* Campos de Booker e Classificação em 'Clientes' (Imagem 50) */}
                      {activeRankingSubMenu === 'clientes' && (
                        <>
                          {/* Booker */}
                          <div className="grid grid-cols-12 items-center gap-3 pt-1">
                            <label className="col-span-4 text-right text-slate-600">
                              Booker
                            </label>
                            <div className="col-span-8">
                              <div className="relative w-full max-w-[300px]">
                                <select
                                  value={booker}
                                  onChange={(e) => setBooker(e.target.value)}
                                  className="w-full h-8 px-2.5 pr-7 border border-slate-200 rounded-xs bg-white text-xs font-bold text-slate-700 appearance-none focus:outline-none focus:border-[#0077b5]"
                                >
                                  <option value="Você">Você</option>
                                  <option value="Todos">Todos</option>
                                </select>
                                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                              </div>
                            </div>
                          </div>

                          {/* Booker Responsável */}
                          <div className="grid grid-cols-12 items-center gap-3">
                            <label className="col-span-4 text-right text-slate-600">
                              Booker Responsável
                            </label>
                            <div className="col-span-8">
                              <div className="relative w-full max-w-[300px]">
                                <select
                                  value={responsibleBooker}
                                  onChange={(e) =>
                                    setResponsibleBooker(e.target.value)
                                  }
                                  className="w-full h-8 px-2.5 pr-7 border border-slate-200 rounded-xs bg-white text-xs font-bold text-slate-700 appearance-none focus:outline-none focus:border-[#0077b5]"
                                >
                                  <option value="Qualquer">Qualquer</option>
                                  <option value="Mozart de Marias">
                                    Mozart de Marias
                                  </option>
                                </select>
                                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {/* Classificação até (presente em Talentos e Clientes) */}
                      {(activeRankingSubMenu === 'talentos' ||
                        activeRankingSubMenu === 'clientes') && (
                        <div className="grid grid-cols-12 items-center gap-3 pt-1">
                          <label className="col-span-4 text-right text-slate-600">
                            Classificação até
                          </label>
                          <div className="col-span-8">
                            <div className="relative w-48">
                              <select
                                value={classificationLimit}
                                onChange={(e) =>
                                  setClassificationLimit(e.target.value)
                                }
                                className="w-full h-8 px-2.5 pr-7 border border-slate-200 rounded-xs bg-white text-xs font-bold text-slate-700 appearance-none focus:outline-none focus:border-[#0077b5]"
                              >
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                              </select>
                              <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Checkbox contextual de Talentos: 'Mostrar talentos ativos sem trabalhos' */}
                      {activeRankingSubMenu === 'talentos' && (
                        <div className="grid grid-cols-12 items-center gap-3">
                          <div className="col-span-4" />
                          <div className="col-span-8">
                            <label className="inline-flex items-center gap-1.5 text-[11px] text-slate-600 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={showActiveTalentsWithoutJobs}
                                onChange={(e) =>
                                  setShowActiveTalentsWithoutJobs(
                                    e.target.checked
                                  )
                                }
                                className="w-3.5 h-3.5 rounded-xs border-slate-300 text-[#0077b5]"
                              />
                              <span>Mostrar talentos ativos sem trabalhos</span>
                            </label>
                          </div>
                        </div>
                      )}

                      {/* Checkbox contextual de Clientes e Departamentos: 'Incluir comissão extra' */}
                      {(activeRankingSubMenu === 'clientes' ||
                        activeRankingSubMenu === 'departamentos') && (
                        <div className="grid grid-cols-12 items-center gap-3">
                          <div className="col-span-4" />
                          <div className="col-span-8">
                            <label className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={includeExtraCommission}
                                onChange={(e) =>
                                  setIncludeExtraCommission(e.target.checked)
                                }
                                className="w-3.5 h-3.5 rounded-xs border-slate-300 text-[#0077b5]"
                              />
                              <span>Incluir comissão extra</span>
                            </label>
                          </div>
                        </div>
                      )}

                      {/* Botões Azuis: CARREGAR DADOS e EXPORTAR */}
                      <div className="pt-4 flex items-center justify-center gap-2">
                        <button
                          type="button"
                          className="h-8 px-3.5 bg-[#0077b5] hover:bg-[#006399] text-white text-[11px] font-semibold uppercase rounded-xs transition-colors cursor-pointer"
                        >
                          CARREGAR DADOS
                        </button>

                        <div ref={exportRef} className="relative">
                          <button
                            type="button"
                            onClick={() =>
                              setIsExportDropdownOpen((prev) => !prev)
                            }
                            className="h-8 px-3 bg-[#0077b5] hover:bg-[#006399] text-white text-[11px] font-semibold uppercase rounded-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Download className="w-3 h-3 stroke-[2.5]" />
                            <span>EXPORTAR</span>
                            <ChevronDown className="w-3 h-3" />
                          </button>

                          {isExportDropdownOpen && (
                            <div className="absolute left-0 mt-1 w-36 bg-white border border-slate-200 rounded-xs shadow-lg py-1 z-30 text-xs text-slate-700">
                              <button
                                type="button"
                                onClick={() => setIsExportDropdownOpen(false)}
                                className="w-full px-3 py-1.5 text-left hover:bg-sky-50 cursor-pointer"
                              >
                                Exportar Excel
                              </button>
                              <button
                                type="button"
                                onClick={() => setIsExportDropdownOpen(false)}
                                className="w-full px-3 py-1.5 text-left hover:bg-sky-50 cursor-pointer"
                              >
                                Exportar PDF
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Área Direita: Tabela de Resultados */}
                  <div className="lg:col-span-5">
                    <div className="w-full">
                      {/* Cabeçalho Azul Dinâmico */}
                      <div className="bg-[#0077b5] text-white px-3 py-2 flex items-center justify-between text-xs font-normal">
                        <span>{currentRankingConfig.tableColumnHeader}</span>
                        <span>Faturamento</span>
                      </div>

                      {/* Linha Única: Total | 0.00 */}
                      <div className="px-3 py-2 flex items-center justify-between text-xs font-bold text-slate-800 bg-white">
                        <span>Total</span>
                        <span>0.00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeMainTab === 'atividades' && <ActivitiesStats />}

        {activeMainTab === 'pacotes' && <PackagesStats />}
      </div>

      {/* Rodapé Padrão Évora Models */}
      <footer className="mt-8 pt-6 border-t border-slate-200 max-w-[1160px] w-full mx-auto pb-6 text-center space-y-2 text-xs text-slate-500">
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
        <p className="text-slate-500 text-xs">© Évora Models</p>
      </footer>
    </div>
  );
}

