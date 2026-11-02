import React, { useState } from 'react';
import SettingsListConfig from './SettingsListConfig';
import TagsConfig from './TagsConfig';
import ProfileAttributesConfig from './ProfileAttributesConfig';
import AccentsConfig from './AccentsConfig';
import SkillsConfig from './SkillsConfig';
import OnlineFormConfig from './OnlineFormConfig';
import CompoConfig from './CompoConfig';
import CitiesConfig from './CitiesConfig';
import DRTConfig from './DRTConfig';
import SiteCategoriesConfig from './SiteCategoriesConfig';

export const TALENT_SIDEBAR_SECTIONS = [
  { key: 'categorias', label: 'Categorias' },
  { key: 'etiquetas', label: 'Etiquetas' },
  { key: 'tom-da-pele', label: 'Tom da Pele' },
  { key: 'tamanho-do-cabelo', label: 'Tamanho do cabelo' },
  { key: 'olhos', label: 'Olhos' },
  { key: 'cabelo', label: 'Cabelo' },
  { key: 'tipo-de-cabelo', label: 'Tipo de cabelo' },
  { key: 'identidade-de-genero', label: 'Identidade de Gênero' },
  { key: 'etnias', label: 'Etnias' },
  { key: 'atributos-de-perfil', label: 'Atributos de Perfil' },
  { key: 'sotaques-de-idioma', label: 'Sotaques de Idioma' },
  { key: 'medidas', label: 'Medidas' },
  { key: 'habilidades', label: 'Habilidades' },
  { key: 'albuns', label: 'Álbuns' },
  { key: 'ficha-online', label: 'Ficha online' },
  { key: 'compo', label: 'Compo' },
  { key: 'cidades', label: 'Cidades' },
  { key: 'drt', label: 'DRT' },
  { key: 'categorias-de-site', label: 'Categorias de Site' },
];

// Configurações das secções que utilizam o componente base reutilizável SettingsListConfig (Imagens 65, 67–73, 80, 82, 86)
const LIST_SECTIONS_DATA = {
  categorias: {
    initialItems: [
      { id: 'cat-1', name: 'Ator', isDefault: true },
      { id: 'cat-2', name: 'Celebridade', isDefault: true },
      { id: 'cat-3', name: 'Modelo', isDefault: true },
    ],
    inputType: 'checkbox',
    defaultTagText: 'Padrão',
    showInfoBanner: false,
    selectionLabel: 'Seleção',
    showDefaultAction: true,
    placeholder: 'Inserir uma nova categoria',
    saveButtonLabel: 'SALVAR CATEGORIA',
  },
  'tom-da-pele': {
    initialItems: [
      { id: 'tp-1', name: 'albino', isDefault: false },
      { id: 'tp-2', name: 'black', isDefault: false },
      { id: 'tp-3', name: 'brown', isDefault: false },
      { id: 'tp-4', name: 'indigenous', isDefault: false },
      { id: 'tp-5', name: 'vitiligo', isDefault: false },
      { id: 'tp-6', name: 'white', isDefault: false },
      { id: 'tp-7', name: 'yellowish', isDefault: false },
    ],
    inputType: 'checkbox',
    defaultTagText: 'Padrão',
    showInfoBanner: true,
    infoText: '..',
    selectionLabel: 'Seleção',
    showDefaultAction: true,
    placeholder: 'Declare a new category',
    saveButtonLabel: 'SALVAR',
  },
  'tamanho-do-cabelo': {
    initialItems: [
      { id: 'tc-1', name: 'Careca', isDefault: false },
      { id: 'tc-2', name: 'Longo', isDefault: false },
      { id: 'tc-3', name: 'Médio', isDefault: false },
      { id: 'tc-4', name: 'Curto', isDefault: false },
    ],
    inputType: 'checkbox',
    defaultTagText: 'Padrão',
    showInfoBanner: true,
    infoText: '..',
    selectionLabel: 'Seleção',
    showDefaultAction: true,
    placeholder: 'Declare uma nova categoria',
    saveButtonLabel: 'SALVAR',
  },
  olhos: {
    initialItems: [
      'Preto',
      'Azul',
      'Azul Esverdeado',
      'Azul Acinzentado',
      'Castanho',
      'Castanho Café',
      'Castanho Escuro',
      'Verde',
      'Castanho Esverdeado',
      'Verde Acinzentado',
      'Verde Azeitona',
      'Cinza',
      'Aveleira',
      'Mel',
      'Azul Claro',
      'Castanho Claro',
    ].map((name, i) => ({ id: `ol-${i}`, name, isDefault: true })),
    inputType: 'checkbox',
    defaultTagText: 'default',
    showInfoBanner: true,
    infoText: '..',
    selectionLabel: 'Seleção',
    showDefaultAction: true,
    placeholder: 'Declare uma nova categoria',
    saveButtonLabel: 'SALVAR',
  },
  cabelo: {
    initialItems: [
      'Loiro Acinzentado',
      'Ruivo',
      'Preto',
      'Loiro',
      'Castanho',
      'Castanho Café',
      'Escuro',
      'Preto Escuro',
      'Loiro Escuro',
      'Castanho Escuro',
      'Cinza',
      'Cinza Escuro',
      'Careca',
      'Aveleira',
      'Loiro Claro',
      'Castanho Claro',
      'Loiro Médio',
      'Loiro Platinado',
      'Vermelho',
      'Ruivo Loiro',
      'Vermelho Castanho',
      'Grisalho',
      'Loiro Morango',
    ].map((name, i) => ({ id: `cb-${i}`, name, isDefault: true })),
    inputType: 'checkbox',
    defaultTagText: 'default',
    showInfoBanner: true,
    infoText: '..',
    selectionLabel: 'Seleção',
    showDefaultAction: true,
    placeholder: 'Declare uma nova categoria',
    saveButtonLabel: 'SALVAR',
  },
  'tipo-de-cabelo': {
    initialItems: [
      'Crespo',
      'Cacheado',
      'Dreadlock',
      'Outro Tipo de Cabelo',
      'Liso',
      'Ondulado',
    ].map((name, i) => ({ id: `tpc-${i}`, name, isDefault: true })),
    inputType: 'checkbox',
    defaultTagText: 'default',
    showInfoBanner: true,
    infoText: '..',
    selectionLabel: 'Seleção',
    showDefaultAction: true,
    placeholder: 'Declare uma nova categoria',
    saveButtonLabel: 'SALVAR',
  },
  'identidade-de-genero': {
    initialItems: [
      { id: 'ig-1', name: 'Female', isDefault: true },
      { id: 'ig-2', name: 'Genderfluid', isDefault: true },
      { id: 'ig-3', name: 'Male', isDefault: true },
    ],
    inputType: 'radio',
    defaultTagText: 'default',
    showInfoBanner: false,
    selectionLabel: 'Seleção',
    showDefaultAction: false,
    placeholder: 'Inserir uma nova identidade de gênero',
    saveButtonLabel: 'SALVAR IDENTIDADE DE GÊNERO',
  },
  etnias: {
    initialItems: [
      'Africano',
      'Asiático',
      'Caucasiano / Loiro',
      'Caucasiano/Europeus',
      'Indiano',
      'Indígena',
      'Latino Americano/Hispanico',
      'Latino Americano/International',
      'Latino Americano/Moreno',
      'Latinoamericano/Moreno Claro',
      'Mestiço',
      'Nativo Americano',
      'Oriente Médio / Norte Africano',
      'Polinésio',
    ].map((name, i) => ({ id: `et-${i}`, name, isDefault: false })),
    inputType: 'checkbox',
    defaultTagText: 'Padrão',
    showInfoBanner: true,
    infoText: 'Aqui você pode editar ou criar uma nova categoria..',
    selectionLabel: 'Seleção',
    showDefaultAction: true,
    placeholder: 'Declare a new category',
    saveButtonLabel: 'SALVAR',
  },
  medidas: {
    initialItems: [
      { id: 'un-br', name: 'BR', isDefault: true },
      { id: 'un-eur', name: 'EUR', isDefault: true },
      { id: 'un-mx', name: 'MX', isDefault: true },
      { id: 'un-uk', name: 'UK', isDefault: true },
      { id: 'un-us', name: 'US', isDefault: true },
    ],
    inputType: 'checkbox',
    defaultTagText: 'Padrão',
    showInfoBanner: true,
    infoText:
      'Aqui você pode editar ou adicionar novas unidades para medições usadas em seus perfis de Talentos para jeans, terno / vestido e sapatos.',
    selectionLabel: 'Seleção',
    showDefaultAction: true,
    placeholder: 'Insira uma nova unidade',
    saveButtonLabel: 'SALVAR UNIDADE',
  },
  albuns: {
    initialItems: [],
    inputType: 'checkbox',
    defaultTagText: 'Padrão',
    showInfoBanner: false,
    selectionLabel: 'Selection',
    showDefaultAction: false,
    placeholder: 'Insira um novo álbum',
    saveButtonLabel: 'SALVAR ALBUM',
  },
};

// Mapa modular para os componentes de secção dedicados (Imagens 66, 74–79, 81, 83–87)
const CUSTOM_SECTION_COMPONENTS = {
  etiquetas: TagsConfig,
  'atributos-de-perfil': ProfileAttributesConfig,
  'sotaques-de-idioma': AccentsConfig,
  habilidades: SkillsConfig,
  'ficha-online': OnlineFormConfig,
  compo: CompoConfig,
  cidades: CitiesConfig,
  drt: DRTConfig,
  'categorias-de-site': SiteCategoriesConfig,
};

export default function TalentsSettings() {
  const [activeSection, setActiveSection] = useState('categorias');

  const listConfigProps = LIST_SECTIONS_DATA[activeSection];
  const CustomComponent = CUSTOM_SECTION_COMPONENTS[activeSection];

  return (
    <div className="flex flex-col md:flex-row gap-8 lg:gap-12 pt-1 items-start">
      {/* Barra Lateral Esquerda (Fundo cinzento claro com item ativo branco) */}
      <aside className="w-full md:w-52 shrink-0 bg-[#ebebeb]">
        {/* Espaçamento superior cinzento conforme Imagem 65 */}
        <div className="h-8 bg-[#ebebeb]" />

        <nav className="flex flex-col">
          {TALENT_SIDEBAR_SECTIONS.map((section) => {
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

        {/* Espaçamento inferior cinzento conforme Imagem 65 */}
        <div className="h-6 bg-[#ebebeb]" />
      </aside>

      {/* Área de Conteúdo Principal (Direita) */}
      <div className="flex-1 min-w-0 w-full">
        {listConfigProps ? (
          <SettingsListConfig key={activeSection} {...listConfigProps} />
        ) : CustomComponent ? (
          <CustomComponent />
        ) : null}
      </div>
    </div>
  );
}
