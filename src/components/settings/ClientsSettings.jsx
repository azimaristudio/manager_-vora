import React, { useState } from 'react';
import ClientCategoriesConfig from './ClientCategoriesConfig';
import ClientRolesConfig from './ClientRolesConfig';

export const CLIENT_SIDEBAR_SECTIONS = [
  { key: 'categorias', label: 'Categorias' },
  { key: 'cargos', label: 'Cargos' },
];

const CLIENT_SECTION_COMPONENTS = {
  categorias: ClientCategoriesConfig,
  cargos: ClientRolesConfig,
};

export default function ClientsSettings() {
  const [activeSection, setActiveSection] = useState('categorias');

  const ActiveComponent = CLIENT_SECTION_COMPONENTS[activeSection];

  return (
    <div className="flex flex-col md:flex-row gap-4 lg:gap-6 pt-1 items-start">
      {/* Barra Lateral Esquerda (Duas opções: Categorias e Cargos - Imagens 88 e 89) */}
      <aside className="w-full md:w-52 shrink-0 bg-[#1c1c1e]">
        {/* Espaçamento superior cinzento */}
        <div className="h-8 bg-[#1c1c1e]" />

        <nav className="flex flex-col">
          {CLIENT_SIDEBAR_SECTIONS.map((section) => {
            const isActive = activeSection === section.key;

            return (
              <button
                key={section.key}
                type="button"
                onClick={() => setActiveSection(section.key)}
                className={`w-full text-left px-3 py-2 text-xs transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#1c1c1e] text-[#E8AC51] font-normal'
                    : 'bg-[#1c1c1e] hover:bg-[#1c1c1e] text-[#E8AC51] font-normal'
                }`}
              >
                {section.label}
              </button>
            );
          })}
        </nav>

        {/* Espaçamento inferior cinzento fiel às Imagens 88 e 89 */}
        <div className="h-32 bg-[#1c1c1e]" />
      </aside>

      {/* Área de Conteúdo Principal (Direita) */}
      <div className="flex-1 min-w-0 w-full">
        {ActiveComponent ? <ActiveComponent key={activeSection} /> : null}
      </div>
    </div>
  );
}

