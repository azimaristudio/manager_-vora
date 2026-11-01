import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  RefreshCw,
  Plus,
  ChevronDown,
  CheckCircle2,
  X,
} from 'lucide-react';
import SyncModal from './SyncModal';
import EmailList from './EmailList';
import NewEmail from './NewEmail';
import BouncedEmails, { BouncedEmailsTopBar } from './BouncedEmails';

const SIDEBAR_ITEMS = [
  {
    id: 'new',
    label: 'New mail',
    path: '/webmail/new',
    breadcrumb: 'New',
  },
  {
    id: 'inbox',
    label: 'Inbox',
    badge: 0,
    path: '/webmail/inbox',
    breadcrumb: 'Inbox',
  },
  {
    id: 'unread',
    label: 'Unread',
    path: '/webmail/unread',
    breadcrumb: 'Unread',
  },
  {
    id: 'sent',
    label: 'Sent',
    path: '/webmail/sent',
    breadcrumb: 'Sent',
  },
  {
    id: 'packages',
    label: 'Packages',
    path: '/pacotes',
    breadcrumb: 'Packages',
  },
  {
    id: 'draft',
    label: 'Draft',
    path: '/webmail/draft',
    breadcrumb: 'Draft',
  },
  {
    id: 'deleted',
    label: 'Deleted',
    path: '/webmail/deleted',
    breadcrumb: 'Deleted',
  },
  {
    id: 'bounced',
    label: 'Bounced emails',
    path: '/webmail/bounced',
    breadcrumb: 'Bounces',
  },
];

export default function WebmailLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Estado mocado das pastas de email (iniciam vazias como nas imagens 20, 21, 22, 24 e 25)
  const [foldersData, setFoldersData] = useState({
    inbox: [],
    unread: [],
    sent: [],
    draft: [],
    deleted: [],
  });

  // Determina a seção ativa pela URL
  const currentSection =
    SIDEBAR_ITEMS.find((item) => location.pathname === item.path) ||
    SIDEBAR_ITEMS[1]; // padrão: Inbox

  const handleSendEmail = (mailObj) => {
    setFoldersData((prev) => ({
      ...prev,
      sent: [mailObj, ...prev.sent],
    }));
    setToast({
      title: 'Email enviado (Simulado)!',
      subtitle: `Para: ${mailObj.to} • Assunto: ${mailObj.subject}`,
    });
    setTimeout(() => setToast(null), 5000);
    navigate('/webmail/sent');
  };

  const handleSaveDraft = (draftObj) => {
    setFoldersData((prev) => ({
      ...prev,
      draft: [draftObj, ...prev.draft],
    }));
    setToast({
      title: 'Rascunho salvo em Draft!',
      subtitle: `Assunto: ${draftObj.subject}`,
    });
    setTimeout(() => setToast(null), 5000);
    navigate('/webmail/draft');
  };

  const handleDeleteSelected = (folderKey, idsToRemove) => {
    setFoldersData((prev) => {
      const removedItems = (prev[folderKey] || []).filter((item) =>
        idsToRemove.includes(item.id)
      );
      const remainingItems = (prev[folderKey] || []).filter(
        (item) => !idsToRemove.includes(item.id)
      );
      return {
        ...prev,
        [folderKey]: remainingItems,
        deleted:
          folderKey === 'deleted'
            ? remainingItems
            : [...removedItems, ...prev.deleted],
      };
    });
  };

  return (
    <div className="w-full max-w-[1140px] mx-auto pb-20 select-none">
      {/* Toast Visual */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 max-w-md bg-slate-900 text-white px-4 py-3.5 rounded-md shadow-2xl border-l-4 border-emerald-400 flex items-start gap-3 animate-in fade-in slide-in-from-top-3 duration-150">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
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

      {/* Barra Extra de Pesquisa de Bounced Emails acima do Breadcrumb (Imagem 26) */}
      {currentSection.id === 'bounced' && <BouncedEmailsTopBar />}

      {/* 1. Barra Superior (Toolbar): Breadcrumb Dinâmico + Search Email + ADVANCED + Refresh + "+" */}
      <div className="w-full bg-[#f4f5f7] border border-slate-200/90 rounded-xs px-4 py-2 mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Breadcrumb Dinâmico */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link
            to="/"
            className="text-[#0077b5] hover:underline font-normal cursor-pointer"
          >
            Home
          </Link>
          <span>&gt;</span>
          <Link
            to="/webmail/inbox"
            className="text-[#0077b5] hover:underline font-normal cursor-pointer"
          >
            Webmail
          </Link>
          <span>&gt;</span>
          <span className="text-slate-400">{currentSection.breadcrumb}</span>
        </div>

        {/* Barra de Pesquisa + ADVANCED + Botão Azul Refresh + Botão Azul "+" */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center bg-white border border-slate-200 rounded-xs overflow-hidden focus-within:border-[#0077b5]">
            <span className="px-2.5 py-1.5 bg-[#eaecef] border-r border-slate-200 text-slate-600">
              <Search className="w-3.5 h-3.5" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search email"
              className="w-36 sm:w-44 px-2.5 py-1 text-xs text-slate-700 placeholder:text-slate-400 outline-none"
            />
            <button
              type="button"
              className="px-2.5 py-1.5 bg-[#eaecef] hover:bg-slate-200 border-l border-slate-200 text-[10px] font-medium text-slate-500 uppercase flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>ADVANCED</span>
              <ChevronDown className="w-2.5 h-2.5" />
            </button>
          </div>

          {/* Botão Azul de Atualização (Refresh) */}
          <button
            type="button"
            onClick={() => setIsSyncModalOpen(true)}
            title="Synchronize Inbox"
            className="p-2 bg-[#0077b5] hover:bg-[#006399] text-white rounded-xs shadow-2xs transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>

          {/* Botão Azul "+" (Novo Email) */}
          <button
            type="button"
            onClick={() => navigate('/webmail/new')}
            title="New mail"
            className="p-2 bg-[#0077b5] hover:bg-[#006399] text-white rounded-xs shadow-2xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* 2. Corpo Principal: Menu Lateral à Esquerda + Conteúdo à Direita */}
      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Menu Lateral (Sidebar) */}
        <aside className="w-full md:w-[195px] shrink-0 space-y-1">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = currentSection.id === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate(item.path)}
                className={`w-full px-3.5 py-2.5 rounded-xs text-xs flex items-center gap-2 text-left transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#0077b5] text-white font-medium shadow-2xs'
                    : 'text-[#0077b5] hover:bg-sky-50 font-normal'
                }`}
              >
                <span>{item.label}</span>
                {typeof item.badge === 'number' && (
                  <span
                    className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center ${
                      isActive
                        ? 'bg-white text-[#0077b5]'
                        : 'bg-[#0077b5] text-white'
                    }`}
                  >
                    {foldersData.inbox.length || item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Área Principal à Direita */}
        <div className="flex-1 w-full min-w-0">
          {currentSection.id === 'new' && (
            <NewEmail
              onSendEmail={handleSendEmail}
              onSaveDraft={handleSaveDraft}
            />
          )}

          {['inbox', 'unread', 'sent', 'draft', 'deleted'].includes(
            currentSection.id
          ) && (
            <EmailList
              folder={currentSection.id}
              emails={foldersData[currentSection.id] || []}
              onOpenSyncModal={() => setIsSyncModalOpen(true)}
              onDeleteSelected={handleDeleteSelected}
            />
          )}

          {currentSection.id === 'bounced' && <BouncedEmails />}
        </div>
      </div>

      {/* Modal "Synchronize Inbox" (Imagem 27) */}
      <SyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
      />
    </div>
  );
}

