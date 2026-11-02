import React, { useState } from 'react';
import CalendarNotificationsConfig from './CalendarNotificationsConfig';
import CalendarViewConfig from './CalendarViewConfig';

export const CALENDAR_SIDEBAR_SECTIONS = [
  { key: 'notificacoes', label: 'Notificações' },
  { key: 'visualizacao', label: 'Visualização' },
];

const CALENDAR_SECTION_COMPONENTS = {
  notificacoes: CalendarNotificationsConfig,
  visualizacao: CalendarViewConfig,
};

export default function CalendarSettings() {
  const [activeSection, setActiveSection] = useState('notificacoes');

  const ActiveComponent = CALENDAR_SECTION_COMPONENTS[activeSection];

  return (
    <div className="flex flex-col md:flex-row gap-4 lg:gap-6 pt-1 items-start">
      {/* Barra Lateral Esquerda (Duas opções: Notificações e Visualização - Imagens 103 e 104) */}
      <aside className="w-full md:w-52 shrink-0 bg-[#ebebeb]">
        {/* Espaçamento superior cinzento */}
        <div className="h-8 bg-[#ebebeb]" />

        <nav className="flex flex-col">
          {CALENDAR_SIDEBAR_SECTIONS.map((section) => {
            const isActive = activeSection === section.key;

            return (
              <button
                key={section.key}
                type="button"
                onClick={() => setActiveSection(section.key)}
                className={`w-full text-left px-3 py-2 text-xs transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-white text-[#0088cc] font-normal'
                    : 'bg-[#ebebeb] hover:bg-[#e2e2e2] text-[#0088cc] font-normal'
                }`}
              >
                {section.label}
              </button>
            );
          })}
        </nav>

        {/* Espaçamento inferior cinzento fiel às Imagens 103 e 104 */}
        <div className="h-24 bg-[#ebebeb]" />
      </aside>

      {/* Área de Conteúdo Principal (Direita) */}
      <div className="flex-1 min-w-0 w-full">
        {ActiveComponent ? <ActiveComponent key={activeSection} /> : null}
      </div>
    </div>
  );
}

