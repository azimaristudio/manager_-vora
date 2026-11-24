import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
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
import StatisticsLayout from './components/statistics/StatisticsLayout';
import AccountingLayout from './components/accounting/AccountingLayout';
import MyAccount from './components/MyAccount';
import SettingsLayout from './components/settings/SettingsLayout';
import Dashboard from './pages/Dashboard';
import Talentos from './pages/Talentos';

const EMPTY_TALENT_OVERVIEW = {
  info: {},
  agenda: [],
  atividades: [],
  contratos: [],
  voos: [],
  compo: [],
  book: [],
  snaps: [],
  video: [],
  docs: [],
};

const INITIAL_TALENTS = [
  {
    id: 'talent-sophia-evora',
    code: 'EV-001',
    stageName: 'sophia évora',
    fullName: 'sophia egito',
    initial: 'S',
    officeId: '2848',
    officeName: 'ÉVORA',
    officeSubtitle: 'MODELS',
    category: 'Modelo',
    categories: ['Modelo', 'Celebridade'],
    status: 'Ativo',
    photoUrl: null,
    coverUrl: null,
    isNewThisMonth: true,
    createdAt: '2026-11-04T10:00:00Z',
    updatedAt: '2026-11-23T16:30:00Z',
    updatedAtLabel: '23/Nov/2026',
    attributes: {
      gender: 'woman',
      city: 'Recife, PE',
      state: 'PE',
      age: 22,
      height: 176,
      eyes: 'brown',
      eyesLabel: 'Castanhos',
      hair: 'brown',
      hairLabel: 'Castanho',
      manequim: '36',
      sapato: '37',
      drt: 'Não informado',
      languages: ['PT', 'EN'],
      languagesLabel: ['Português', 'Inglês'],
      licensing: '0',
    },
    overview: {
      ...EMPTY_TALENT_OVERVIEW,
      agenda: [
        {
          id: 'ag-1',
          title: 'Casting • Vogue Brasil Editorial Resort',
          subtitle: 'Estúdio Bob Wolfenson (SP)',
          date: 'Hoje • 09:30',
          status: 'Confirmado',
        },
      ],
    },
  },
  {
    id: 'talent-helena-valente',
    code: 'EV-002',
    stageName: 'helena valente',
    fullName: 'helena valente moura',
    initial: 'H',
    officeId: '2848',
    officeName: 'ÉVORA',
    officeSubtitle: 'MODELS',
    category: 'Modelo',
    categories: ['Modelo'],
    status: 'Ativo',
    photoUrl: null,
    coverUrl: null,
    isNewThisMonth: false,
    createdAt: '2026-08-14T10:00:00Z',
    updatedAt: '2026-11-22T14:00:00Z',
    updatedAtLabel: '22/Nov/2026',
    attributes: {
      gender: 'woman',
      city: 'São Paulo, SP',
      state: 'SP',
      age: 24,
      height: 178,
      eyes: 'green',
      eyesLabel: 'Verdes',
      hair: 'blonde',
      hairLabel: 'Loiro',
      manequim: '36',
      sapato: '38',
      languages: ['PT', 'EN'],
      languagesLabel: ['Português', 'Inglês'],
      licensing: '1',
    },
    overview: {
      ...EMPTY_TALENT_OVERVIEW,
      agenda: [
        {
          id: 'ag-2',
          title: 'Prova de Roupa • Animale Coleção Inverno',
          subtitle: 'Showroom Jardins',
          date: 'Hoje • 11:00',
          status: 'Confirmado',
        },
      ],
    },
  },
  {
    id: 'talent-lucas-montenegro',
    code: 'EV-003',
    stageName: 'lucas montenegro',
    fullName: 'lucas montenegro silva',
    initial: 'L',
    officeId: '2848',
    officeName: 'ÉVORA',
    officeSubtitle: 'MODELS',
    category: 'Ator',
    categories: ['Ator', 'Modelo'],
    status: 'Ativo',
    photoUrl: null,
    coverUrl: null,
    isNewThisMonth: false,
    createdAt: '2026-06-20T09:00:00Z',
    updatedAt: '2026-11-21T18:10:00Z',
    updatedAtLabel: '21/Nov/2026',
    attributes: {
      gender: 'man',
      city: 'São Paulo, SP',
      state: 'SP',
      age: 27,
      height: 185,
      eyes: 'dark_brown',
      eyesLabel: 'Castanhos Escuros',
      hair: 'black',
      hairLabel: 'Preto',
      manequim: '40',
      sapato: '42',
      drt: 'DRT SP-48210',
      languages: ['PT', 'EN'],
      languagesLabel: ['Português', 'Inglês'],
      licensing: '1',
    },
    overview: { ...EMPTY_TALENT_OVERVIEW },
  },
  {
    id: 'talent-valentina-costa',
    code: 'EV-004',
    stageName: 'valentina costa',
    fullName: 'valentina costa ferreira',
    initial: 'V',
    officeId: '2848',
    officeName: 'ÉVORA',
    officeSubtitle: 'MODELS',
    category: 'Modelo',
    categories: ['Modelo'],
    status: 'Ativo',
    photoUrl: null,
    coverUrl: null,
    isNewThisMonth: true,
    createdAt: '2026-11-10T11:30:00Z',
    updatedAt: '2026-11-20T12:00:00Z',
    updatedAtLabel: '20/Nov/2026',
    attributes: {
      gender: 'woman',
      city: 'Rio de Janeiro, RJ',
      state: 'RJ',
      age: 20,
      height: 175,
      eyes: 'hazel',
      eyesLabel: 'Mel',
      hair: 'brown',
      hairLabel: 'Castanho',
      manequim: '34',
      sapato: '36',
      languages: ['PT'],
      languagesLabel: ['Português'],
      licensing: '0',
    },
    overview: { ...EMPTY_TALENT_OVERVIEW },
  },
  {
    id: 'talent-gabriel-albuquerque',
    code: 'EV-005',
    stageName: 'gabriel albuquerque',
    fullName: 'gabriel albuquerque lima',
    initial: 'G',
    officeId: '2848',
    officeName: 'ÉVORA',
    officeSubtitle: 'MODELS',
    category: 'Modelo',
    categories: ['Modelo', 'Ator'],
    status: 'Ativo',
    photoUrl: null,
    coverUrl: null,
    isNewThisMonth: false,
    createdAt: '2026-09-02T15:00:00Z',
    updatedAt: '2026-11-19T09:45:00Z',
    updatedAtLabel: '19/Nov/2026',
    attributes: {
      gender: 'man',
      city: 'Recife, PE',
      state: 'PE',
      age: 25,
      height: 184,
      eyes: 'brown',
      eyesLabel: 'Castanhos',
      hair: 'black',
      hairLabel: 'Preto',
      manequim: '40',
      sapato: '42',
      languages: ['PT', 'EN'],
      languagesLabel: ['Português', 'Inglês'],
      licensing: '2',
    },
    overview: { ...EMPTY_TALENT_OVERVIEW },
  },
  {
    id: 'talent-amber-rodrigues',
    code: 'EV-006',
    stageName: 'amber rodrigues',
    fullName: 'amber rodrigues barros',
    initial: 'A',
    officeId: '2848',
    officeName: 'ÉVORA',
    officeSubtitle: 'MODELS',
    category: 'Modelo',
    categories: ['Modelo'],
    status: 'Ativo',
    photoUrl: null,
    coverUrl: null,
    isNewThisMonth: true,
    createdAt: '2026-11-15T14:20:00Z',
    updatedAt: '2026-11-18T17:15:00Z',
    updatedAtLabel: '18/Nov/2026',
    attributes: {
      gender: 'woman',
      city: 'Recife, PE',
      state: 'PE',
      age: 21,
      height: 177,
      eyes: 'blue',
      eyesLabel: 'Azuis',
      hair: 'red',
      hairLabel: 'Ruivo',
      manequim: '36',
      sapato: '37',
      languages: ['PT', 'EN'],
      languagesLabel: ['Português', 'Inglês'],
      licensing: '0',
    },
    overview: { ...EMPTY_TALENT_OVERVIEW },
  },
  {
    id: 'talent-caio-vasconcelos',
    code: 'EV-007',
    stageName: 'caio vasconcelos',
    fullName: 'caio vasconcelos duarte',
    initial: 'C',
    officeId: '2848',
    officeName: 'ÉVORA',
    officeSubtitle: 'MODELS',
    category: 'Celebridade',
    categories: ['Celebridade', 'Ator'],
    status: 'Stand by',
    photoUrl: null,
    coverUrl: null,
    isNewThisMonth: false,
    createdAt: '2026-05-12T10:00:00Z',
    updatedAt: '2026-11-14T11:20:00Z',
    updatedAtLabel: '14/Nov/2026',
    attributes: {
      gender: 'man',
      city: 'Rio de Janeiro, RJ',
      state: 'RJ',
      age: 31,
      height: 182,
      eyes: 'brown',
      eyesLabel: 'Castanhos',
      hair: 'brown',
      hairLabel: 'Castanho',
      manequim: '42',
      sapato: '42',
      drt: 'DRT RJ-33190',
      languages: ['PT', 'EN'],
      languagesLabel: ['Português', 'Inglês'],
      licensing: '1',
    },
    overview: { ...EMPTY_TALENT_OVERVIEW },
  },
  {
    id: 'talent-marina-salazar',
    code: 'EV-008',
    stageName: 'marina salazar',
    fullName: 'marina salazar nobre',
    initial: 'M',
    officeId: '2848',
    officeName: 'ÉVORA',
    officeSubtitle: 'MODELS',
    category: 'Modelo',
    categories: ['Modelo', 'Ator'],
    status: 'Stand by',
    photoUrl: null,
    coverUrl: null,
    isNewThisMonth: false,
    createdAt: '2026-07-08T09:30:00Z',
    updatedAt: '2026-11-10T15:40:00Z',
    updatedAtLabel: '10/Nov/2026',
    attributes: {
      gender: 'woman',
      city: 'São Paulo, SP',
      state: 'SP',
      age: 23,
      height: 174,
      eyes: 'dark_brown',
      eyesLabel: 'Castanhos Escuros',
      hair: 'black',
      hairLabel: 'Preto',
      manequim: '36',
      sapato: '37',
      languages: ['PT'],
      languagesLabel: ['Português'],
      licensing: '1',
    },
    overview: { ...EMPTY_TALENT_OVERVIEW },
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [talents, setTalents] = useState(INITIAL_TALENTS);
  const [contactsData, setContactsData] = useState(INITIAL_CONTACTS);
  const [projectsMap, setProjectsMap] = useState(INITIAL_PROJECTS_MAP);

  const handleTalentCreated = (payload) => {
    const stageName =
      payload.personal?.stageName?.trim() ||
      payload.personal?.fullName?.trim() ||
      'Novo Talento';
    const fullName = payload.personal?.fullName?.trim() || stageName;
    const nowIso = new Date().toISOString();
    const photo = payload.media?.profilePhotoUrl || null;

    const newCard = {
      id: payload.id,
      code: `EV-${String(talents.length + 1).padStart(3, '0')}`,
      stageName: stageName.toLowerCase(),
      fullName: fullName.toLowerCase(),
      initial: stageName.charAt(0).toUpperCase(),
      officeId: '2848',
      officeName: 'ÉVORA',
      officeSubtitle: 'MODELS',
      category: 'Modelo',
      categories: ['Modelo'],
      status:
        payload.personal?.status === '0'
          ? 'Inativo'
          : payload.personal?.status === '-1'
          ? 'Stand by'
          : 'Ativo',
      photoUrl: photo,
      coverUrl: photo,
      isNewThisMonth: true,
      createdAt: nowIso,
      updatedAt: nowIso,
      updatedAtLabel: 'Agora',
      attributes: {
        email: payload.personal?.email || '',
        phone: payload.personal?.phone || '',
      },
      overview: { ...EMPTY_TALENT_OVERVIEW },
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
        {/* Rota Inicial (/): Redireciona para /login se não autenticado; caso contrário exibe o Dashboard */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <AppLayout
                hideSidebar={true}
                hideSubHeader={true}
                customTalents={talents}
                onOpenAddTalent={() => navigate('/talentos/novo')}
              >
                <Dashboard talents={talents} projectsMap={projectsMap} />
              </AppLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Rota (/dashboard): Painel Operacional Principal */}
        <Route
          path="/dashboard"
          element={
            <AppLayout
              hideSidebar={true}
              hideSubHeader={true}
              customTalents={talents}
              onOpenAddTalent={() => navigate('/talentos/novo')}
            >
              <Dashboard talents={talents} projectsMap={projectsMap} />
            </AppLayout>
          }
        />

        {/* Rota (/talentos): Listagem Principal de Talentos */}
        <Route
          path="/talentos"
          element={
            <AppLayout
              hideSidebar={true}
              hideSubHeader={true}
              customTalents={talents}
              onOpenAddTalent={() => navigate('/talentos/novo')}
            >
              <Talentos
                talents={talents}
                onOpenAddTalent={() => navigate('/talentos/novo')}
              />
            </AppLayout>
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
                onBackToList={() => navigate('/talentos')}
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

        {/* Rota (/estatisticas): Módulo de Estatísticas (Imagens 49 a 53) */}
        <Route
          path="/estatisticas"
          element={
            <AppLayout
              hideSidebar={true}
              hideSubHeader={true}
              customTalents={talents}
              onOpenAddTalent={() => navigate('/estatisticas')}
            >
              <StatisticsLayout />
            </AppLayout>
          }
        />

        {/* Rota (/contabilidade): Módulo de Contabilidade (Imagens 54 a 62) */}
        <Route
          path="/contabilidade"
          element={
            <AppLayout
              hideSidebar={true}
              hideSubHeader={true}
              customTalents={talents}
              onOpenAddTalent={() => navigate('/contabilidade')}
            >
              <AccountingLayout />
            </AppLayout>
          }
        />

        {/* Rota (/minha-conta): Minha Conta / Configurações de Perfil (Imagem 63) */}
        <Route
          path="/minha-conta"
          element={
            <AppLayout
              hideSidebar={true}
              hideSubHeader={true}
              customTalents={talents}
              onOpenAddTalent={() => navigate('/minha-conta')}
            >
              <MyAccount />
            </AppLayout>
          }
        />

        {/* Rota (/configuracoes): Módulo de Configurações (Imagens 65 a 87) */}
        <Route
          path="/configuracoes"
          element={
            <AppLayout
              hideSidebar={true}
              hideSubHeader={true}
              customTalents={talents}
              onOpenAddTalent={() => navigate('/configuracoes')}
            >
              <SettingsLayout />
            </AppLayout>
          }
        />

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
          element={
            <Login
              onLoginSuccess={() => {
                setIsAuthenticated(true);
                navigate('/dashboard');
              }}
            />
          }
        />
      </Routes>
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
