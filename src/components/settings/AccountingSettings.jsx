import React, { useState } from 'react';
import CurrencyConfig from './accounting/CurrencyConfig';
import PaymentMethodsConfig from './accounting/PaymentMethodsConfig';
import AccountsConfig from './accounting/AccountsConfig';
import GroupsConfig from './accounting/GroupsConfig';
import CategoriesAccConfig from './accounting/CategoriesAccConfig';
import SubCategoriesConfig from './accounting/SubCategoriesConfig';
import TransfersConfig from './accounting/TransfersConfig';
import OptionsAccConfig from './accounting/OptionsAccConfig';
import InvoicesConfig from './accounting/InvoicesConfig';
import TaxConfig from './accounting/TaxConfig';
import CommissionConfig from './accounting/CommissionConfig';

export const ACCOUNTING_SIDEBAR_SECTIONS = [
  { key: 'moeda', label: 'Moeda' },
  { key: 'metodos-de-pagamento', label: 'Métodos de Pagamento' },
  { key: 'contas', label: 'Contas' },
  { key: 'grupos', label: 'Grupos' },
  { key: 'categorias', label: 'Categorias' },
  { key: 'sub-categorias', label: 'Sub Categorias' },
  { key: 'transferencias', label: 'Transferências' },
  { key: 'opcoes', label: 'Opções' },
  { key: 'faturas', label: 'Faturas' },
  { key: 'imposto', label: 'Imposto' },
  { key: 'comissao', label: 'Comissão' },
];

const ACCOUNTING_SECTION_COMPONENTS = {
  moeda: CurrencyConfig,
  'metodos-de-pagamento': PaymentMethodsConfig,
  contas: AccountsConfig,
  grupos: GroupsConfig,
  categorias: CategoriesAccConfig,
  'sub-categorias': SubCategoriesConfig,
  transferencias: TransfersConfig,
  opcoes: OptionsAccConfig,
  faturas: InvoicesConfig,
  imposto: TaxConfig,
  comissao: CommissionConfig,
};

export default function AccountingSettings() {
  const [activeSection, setActiveSection] = useState('moeda');

  const ActiveComponent = ACCOUNTING_SECTION_COMPONENTS[activeSection];

  return (
    <div className="flex flex-col md:flex-row gap-4 lg:gap-6 pt-1 items-start">
      {/* Barra Lateral Esquerda (11 Opções de Contabilidade - Imagens 92 a 102) */}
      <aside className="w-full md:w-52 shrink-0 bg-[#ebebeb]">
        {/* Espaçamento superior cinzento */}
        <div className="h-8 bg-[#ebebeb]" />

        <nav className="flex flex-col">
          {ACCOUNTING_SIDEBAR_SECTIONS.map((section) => {
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

        {/* Espaçamento inferior cinzento */}
        <div className="h-8 bg-[#ebebeb]" />
      </aside>

      {/* Área de Conteúdo Principal (Direita) */}
      <div className="flex-1 min-w-0 w-full">
        {ActiveComponent ? <ActiveComponent key={activeSection} /> : null}
      </div>
    </div>
  );
}

