import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
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

function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();
  const [talents, setTalents] = useState(INITIAL_TALENTS);
  const [contactsData, setContactsData] = useState(INITIAL_CONTACTS);

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

        {/* Rota (/talentos/novo): Cadastro de Talentos (Agregar Talento) */}
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
          onClick={() => navigate('/login')}
          className={`px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer ${
            location.pathname === '/login'
              ? 'bg-[#0077b5] text-white'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          /login
        </button>
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
          onClick={() => navigate('/talentos/novo')}
          className={`px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer ${
            location.pathname === '/talentos/novo'
              ? 'bg-[#0077b5] text-white'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          /talentos/novo
        </button>
        <button
          type="button"
          onClick={() => navigate('/contatos')}
          className={`px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer ${
            location.pathname === '/contatos'
              ? 'bg-[#0077b5] text-white'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          /contatos
        </button>
        <button
          type="button"
          onClick={() => navigate('/contatos/novo')}
          className={`px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer ${
            location.pathname === '/contatos/novo'
              ? 'bg-[#0077b5] text-white'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          /contatos/novo
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
        <button
          type="button"
          onClick={() => navigate('/background-jobs')}
          className={`px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer ${
            location.pathname === '/background-jobs'
              ? 'bg-[#0077b5] text-white'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          /background-jobs
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
