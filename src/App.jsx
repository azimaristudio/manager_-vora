import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import Login from './components/Login';
import AppLayout from './components/AppLayout';
import AddTalent from './components/AddTalent';
import CompoMakeEditor from './components/CompoMakeEditor';
import BackgroundJobs from './components/BackgroundJobs';
import Contacts from './components/Contacts';
import AddContact from './components/AddContact';
import WebmailLayout from './components/webmail/WebmailLayout';
import PackagesList from './components/packages/PackagesList';
import CreatePackage from './components/packages/CreatePackage';
import ProjectsList from './components/projects/ProjectsList';
import ProjectDetails from './components/projects/ProjectDetails';
import CalendarView from './components/calendar/CalendarView';

const INITIAL_TALENTS = [
  {
    id: 'talent-sophia-evora',
    stageName: 'sophia évora',
    fullName: 'sophia egito',
    initial: 'S',
    officeName: 'ÉVORA',
    officeSubtitle: 'MODELS',
    category: 'Modelo',
    status: 'Ativo',
    coverUrl: null,
  },
];

const INITIAL_CONTACTS = {
  clientes: [],
  fornecedores: [
    {
      id: 'fornecedor-1',
      name: 'asdasdsa',
      entityType: 'company',
      statusLabel: 'Ativo',
      category: 'Agencia',
      location: 'Recife, Brazil',
      booker: '',
      rating: 0,
    },
  ],
  outros: [],
};

const INITIAL_PROJECTS_MAP = {
  1: {
    id: '1',
    projectName: 'foto',
    status: 'ATIVO',
    responsibleBooker: 'Mozart de Marias',
    createdBy: 'Mozart de Marias',
    createdAt: '2026-10-30 15:04:39',
    department: '',
    client: 'rubem',
    producer: '',
    workDatesLabel: '31/Out/2026 até 31/Out/2026',
    description: '',
    medias: '',
    type: '',
    products: '',
    exclusivity: false,
    usagePeriodRangeLabel: '30/Out/2026 - 31/Out/2026',
    exclusivityTerritory: '',
    activities: [
      { key: 'casting', label: 'CASTING', count: 0, bg: 'bg-[#f8b400]' },
      { key: 'callback', label: 'CALLBACK', count: 0, bg: 'bg-[#c5299b]' },
      { key: 'opcao', label: 'OPÇÃO', count: 0, bg: 'bg-[#f06711]' },
      { key: 'proupa', label: 'P. ROUPA', count: 0, bg: 'bg-[#3ab565]' },
      { key: 'trabalho', label: 'TRABALHO', count: 0, bg: 'bg-[#2aa9d2]' },
    ],
    billingSummary: {
      grossAmount: '0.00',
      extraCommission: '0.00',
      extraExpense: '0.00',
      totalToCharge: '0.00',
    },
  },
};

function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();
  const [talents, setTalents] = useState(INITIAL_TALENTS);
  const [contactsData, setContactsData] = useState(INITIAL_CONTACTS);
  const [projectsMap, setProjectsMap] = useState(INITIAL_PROJECTS_MAP);

  const handleTalentCreated = (payload) => {
    const stageName =
      payload.personal?.stageName?.trim() ||
      payload.personal?.fullName?.trim() ||
      'Novo Talento';
    const fullName = payload.personal?.fullName?.trim() || stageName;

    const newCard = {
      id: payload.id,
      stageName: stageName.toLowerCase(),
      fullName: fullName.toLowerCase(),
      initial: stageName.charAt(0).toUpperCase(),
      officeName: 'ÉVORA',
      officeSubtitle: 'MODELS',
      category: 'Modelo',
      status:
        payload.personal?.status === '0'
          ? 'Inativo'
          : payload.personal?.status === '-1'
          ? 'Stand by'
          : 'Ativo',
      coverUrl: payload.media?.profilePhotoUrl || null,
    };

    setTalents((prev) => [newCard, ...prev]);
  };

  const handleSaveContact = (groupKey, contactObj) => {
    const targetGroup = groupKey || 'fornecedores';
    setContactsData((prev) => {
      const list = prev[targetGroup] || [];
      const exists = list.some((c) => c.id === contactObj.id);
      const nextList = exists
        ? list.map((c) => (c.id === contactObj.id ? contactObj : c))
        : [...list, contactObj];
      return {
        ...prev,
        [targetGroup]: nextList,
      };
    });
  };

  const handleDeleteContact = (groupKey, contactId) => {
    const targetGroup = groupKey || 'fornecedores';
    setContactsData((prev) => ({
      ...prev,
      [targetGroup]: (prev[targetGroup] || []).filter(
        (c) => c.id !== contactId
      ),
    }));
  };

  const handleUpdateContactBooker = (groupKey, contactId, newBooker) => {
    setContactsData((prev) => ({
      ...prev,
      [groupKey]: (prev[groupKey] || []).map((c) =>
        c.id === contactId ? { ...c, booker: newBooker } : c
      ),
    }));
  };

  const handleSaveProject = (formData, existingId = null) => {
    const targetId = existingId || '1';
    setProjectsMap((prev) => {
      const base = prev[targetId] || INITIAL_PROJECTS_MAP['1'];
      const updatedProject = {
        ...base,
        id: targetId,
        department: formData.department ?? base.department,
        projectName: formData.projectName?.trim() || base.projectName || 'foto',
        client: formData.client?.trim() || base.client || 'rubem',
        producer: formData.producer ?? base.producer,
        description: formData.description ?? base.description,
        medias: formData.medias ?? base.medias,
        type: formData.type ?? base.type,
        products: formData.products ?? base.products,
        exclusivity: Boolean(formData.exclusivity),
        exclusivityTerritory:
          formData.exclusivityTerritory ?? base.exclusivityTerritory,
      };
      return {
        ...prev,
        [targetId]: updatedProject,
      };
    });
    return targetId;
  };

  return (
    <div className="relative min-h-screen">
      <Routes>
        {/* Rota Inicial (/): Listagem Principal de Talentos */}
        <Route
          path="/"
          element={
            <AppLayout
              customTalents={talents}
              onOpenAddTalent={() => navigate('/talentos/novo')}
            />
          }
        />

        {/* Rota (/talentos/novo): Cadastro de Talentos */}
        <Route
          path="/talentos/novo"
          element={
            <AppLayout
              hideSidebar={true}
              hideSubHeader={true}
              customTalents={talents}
              onOpenAddTalent={() => navigate('/talentos/novo')}
            >
              <AddTalent
                onBackToList={() => navigate('/')}
                onTalentCreated={handleTalentCreated}
              />
            </AppLayout>
          }
        />

        {/* Rota (/contatos): Listagem de Contatos (Imagens 14, 15 e 16) */}
        <Route
          path="/contatos"
          element={
            <AppLayout
              hideSidebar={true}
              hideSubHeader={true}
              customTalents={talents}
              onOpenAddTalent={() => navigate('/contatos/novo')}
            >
              <Contacts
                contactsData={contactsData}
                onUpdateContactBooker={handleUpdateContactBooker}
              />
            </AppLayout>
          }
        />

        {/* Rota (/contatos/novo): Adicionar / Editar Contato (Imagens 17 e 18) */}
        <Route
          path="/contatos/novo"
          element={
            <AppLayout
              hideSidebar={true}
              hideSubHeader={true}
              customTalents={talents}
              onOpenAddTalent={() => navigate('/contatos/novo')}
            >
              <AddContact
                onSaveContact={handleSaveContact}
                onDeleteContact={handleDeleteContact}
              />
            </AppLayout>
          }
        />

        {/* Rotas (/webmail e /webmail/:section): Módulo de Webmail (Imagens 19 a 27) */}
        <Route
          path="/webmail"
          element={<Navigate to="/webmail/inbox" replace />}
        />
        <Route
          path="/webmail/packages"
          element={<Navigate to="/pacotes" replace />}
        />
        <Route
          path="/webmail/:section"
          element={
            <AppLayout
              hideSidebar={true}
              hideSubHeader={true}
              customTalents={talents}
              onOpenAddTalent={() => navigate('/webmail/new')}
            >
              <WebmailLayout />
            </AppLayout>
          }
        />

        {/* Rota (/projetos): Listagem de Projetos (Imagem 28 e Modal Imagem 29) */}
        <Route
          path="/projetos"
          element={
            <AppLayout
              hideSidebar={true}
              hideSubHeader={true}
              customTalents={talents}
              onOpenAddTalent={() => navigate('/projetos')}
            >
              <ProjectsList onProjectCreated={handleSaveProject} />
            </AppLayout>
          }
        />

        {/* Rota (/projetos/:id): Detalhes do Projeto (Imagem 30) */}
        <Route
          path="/projetos/:id"
          element={
            <AppLayout
              hideSidebar={true}
              hideSubHeader={true}
              customTalents={talents}
              onOpenAddTalent={() => navigate('/projetos')}
            >
              <ProjectDetails
                projectsMap={projectsMap}
                onSaveProject={handleSaveProject}
              />
            </AppLayout>
          }
        />

        {/* Rota (/calendario): Módulo de Calendário e Criação de Eventos (Imagens 31 a 45) */}
        <Route
          path="/calendario"
          element={
            <AppLayout
              hideSidebar={true}
              hideSubHeader={true}
              customTalents={talents}
              onOpenAddTalent={() => navigate('/calendario')}
            >
              <CalendarView />
            </AppLayout>
          }
        />

        {/* Rota (/pacotes): Listagem de Pacotes Criados e Enviados (Imagens 46 e 48) */}
        <Route path="/pacotes" element={<PackagesList />} />

        {/* Rota (/pacotes/novo): Criar / Editar Pacote (Imagem 47) */}
        <Route path="/pacotes/novo" element={<CreatePackage />} />

        {/* Rota (/compomake): Editor do CompoMake */}
        <Route
          path="/compomake"
          element={
            <AppLayout
              hideSidebar={true}
              hideSubHeader={true}
              customTalents={talents}
              onOpenAddTalent={() => navigate('/talentos/novo')}
            >
              <CompoMakeEditor />
            </AppLayout>
          }
        />

        {/* Rota (/background-jobs): Trabalhos em Segundo Plano */}
        <Route
          path="/background-jobs"
          element={
            <AppLayout
              hideSidebar={true}
              hideSubHeader={true}
              customTalents={talents}
              onOpenAddTalent={() => navigate('/talentos/novo')}
            >
              <BackgroundJobs />
            </AppLayout>
          }
        />

        {/* Rota (/login): Tela de Autenticação */}
        <Route
          path="/login"
          element={<Login onLoginSuccess={() => navigate('/')} />}
        />
      </Routes>

      {/* Barra Flutuante de Protótipo para Inspecionar as Rotas */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-wrap items-center gap-1.5 bg-slate-900/95 backdrop-blur-xs text-white px-3 py-1.5 rounded-full shadow-lg border border-white/15 text-xs">
        <span className="text-slate-400 font-medium mr-1">Rotas:</span>
        <button
          type="button"
          onClick={() => navigate('/')}
          className={`px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer ${
            location.pathname === '/'
              ? 'bg-[#0077b5] text-white'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          / (Talentos)
        </button>
        <button
          type="button"
          onClick={() => navigate('/contatos')}
          className={`px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer ${
            location.pathname.startsWith('/contatos')
              ? 'bg-[#0077b5] text-white'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          /contatos
        </button>
        <button
          type="button"
          onClick={() => navigate('/webmail/inbox')}
          className={`px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer ${
            location.pathname.startsWith('/webmail')
              ? 'bg-[#0077b5] text-white'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          /webmail
        </button>
        <button
          type="button"
          onClick={() => navigate('/projetos')}
          className={`px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer ${
            location.pathname === '/projetos'
              ? 'bg-[#0077b5] text-white'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          /projetos
        </button>
        <button
          type="button"
          onClick={() => navigate('/projetos/1')}
          className={`px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer ${
            location.pathname === '/projetos/1'
              ? 'bg-[#0077b5] text-white'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          /projetos/1
        </button>
        <button
          type="button"
          onClick={() => navigate('/calendario')}
          className={`px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer ${
            location.pathname.startsWith('/calendario')
              ? 'bg-[#0077b5] text-white'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          /calendario
        </button>
        <button
          type="button"
          onClick={() => navigate('/pacotes')}
          className={`px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer ${
            location.pathname === '/pacotes'
              ? 'bg-[#0077b5] text-white'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          /pacotes
        </button>
        <button
          type="button"
          onClick={() => navigate('/pacotes/novo')}
          className={`px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer ${
            location.pathname === '/pacotes/novo'
              ? 'bg-[#0077b5] text-white'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          /pacotes/novo
        </button>
        <button
          type="button"
          onClick={() => navigate('/compomake')}
          className={`px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer ${
            location.pathname === '/compomake'
              ? 'bg-[#0077b5] text-white'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          /compomake
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
