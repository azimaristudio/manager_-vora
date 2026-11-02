import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Briefcase,
  Mail,
  DollarSign,
  Calendar,
} from 'lucide-react';
import TalentsSettings from './TalentsSettings';
import ClientsSettings from './ClientsSettings';
import WebmailSettings from './WebmailSettings';
import AccountingSettings from './AccountingSettings';
import CalendarSettings from './CalendarSettings';

export const SETTINGS_MAIN_TABS = [
  { key: 'talentos', label: 'Talentos', Icon: User },
  { key: 'clientes', label: 'Clientes', Icon: Briefcase },
  { key: 'webmail', label: 'Webmail', Icon: Mail },
  { key: 'contabilidade', label: 'Contabilidade', Icon: DollarSign },
  { key: 'calendario', label: 'Calendário', Icon: Calendar },
];

const MAIN_TAB_COMPONENTS = {
  talentos: TalentsSettings,
  clientes: ClientsSettings,
  webmail: WebmailSettings,
  contabilidade: AccountingSettings,
  calendario: CalendarSettings,
};

export default function SettingsLayout() {
  const [activeMainTab, setActiveMainTab] = useState('talentos');

  const ActiveTabContent = MAIN_TAB_COMPONENTS[activeMainTab];
  const currentTabObj = SETTINGS_MAIN_TABS.find(
    (tab) => tab.key === activeMainTab
  );

  return (
    <div className="max-w-[1060px] mx-auto px-4 sm:px-6 pt-3 pb-10">
      {/* 1. Breadcrumb: Início > Configurações */}
      <div className="w-full bg-[#f5f5f5] border border-slate-200/80 rounded-xs px-4 py-2 mb-6 text-xs flex items-center gap-2">
        <Link
          to="/"
          className="text-[#0088cc] hover:underline font-normal"
        >
          Início
        </Link>
        <span className="text-slate-300">&gt;</span>
        <span className="text-slate-400">Configurações</span>
      </div>

      {/* 2. Abas Principais (Menu Superior) */}
      <div className="border-b border-slate-200 flex flex-wrap items-end">
        {SETTINGS_MAIN_TABS.map((tab, index) => {
          const isActive = activeMainTab === tab.key;
          const IconComponent = tab.Icon;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveMainTab(tab.key)}
              className={`px-4 py-2.5 flex items-center gap-2 text-xs transition-colors cursor-pointer ${
                isActive
                  ? 'bg-white border-t border-l border-r border-slate-200 rounded-t-xs -mb-px text-slate-600 font-normal z-10'
                  : `bg-[#f7f7f7] hover:bg-white border-t border-r ${
                      index === 0 ? 'border-l' : ''
                    } border-slate-200 text-slate-600 font-normal`
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-[#333333] text-white flex items-center justify-center shrink-0">
                <IconComponent className="w-3 h-3 stroke-[2.2]" />
              </span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Conteúdo Dinâmico da Aba Selecionada */}
      <div>
        {ActiveTabContent ? (
          <ActiveTabContent />
        ) : (
          <div className="py-10 px-6 text-xs text-slate-500">
            Aba <strong className="text-slate-700">{currentTabObj?.label}</strong> pronta para implementação.
          </div>
        )}
      </div>
    </div>
  );
}
