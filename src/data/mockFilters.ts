import type {
  LegacyFilterItem,
  NormalizedFilterCategory,
  NormalizedFilterComponent,
  FilterOption,
} from '../types/filters';

/**
 * Função utilitária que sanitiza e normaliza os dados brutos vindos do `.json` legado,
 * tratando anomalias como `options: {}` e `type: Array` em `flights`.
 */
export function normalizeLegacyFilters(
  legacyFilters: LegacyFilterItem[]
): NormalizedFilterCategory[] {
  return legacyFilters
    .filter((f) => !f.input && f.title) // Ignora o pseudo-filtro oculto `talent_name` sem título
    .map((filter) => {
      const components: NormalizedFilterComponent[] = filter.components.map((comp) => {
        const rawOptions = Array.isArray(comp.options) ? comp.options : [];
        const normalizedType = Array.isArray(comp.type)
          ? 'select'
          : comp.type || (comp.magnitude_options ? 'gallery_status' : 'select');

        return {
          name: comp.name || filter.name,
          label: comp.label || comp.title || filter.title || '',
          type: normalizedType,
          allowSelectAll: Boolean(comp.all),
          options: rawOptions.map((opt: FilterOption) => ({
            value: String(opt.value),
            label: String(opt.text),
            selected: Boolean(opt.selected),
            group: opt.group,
          })),
        };
      });

      return {
        id: filter.name,
        title: filter.title || filter.name,
        defaultExpanded: Boolean(filter.active),
        isSearchInput: Boolean(filter.input),
        components,
      };
    });
}

/**
 * Dados fiéis extraídos do arquivo `.json` na raiz do projeto (`manager_-vora/.json`),
 * tipados com `LegacyFilterItem[]`.
 */
export const LEGACY_FILTERS_DATA: LegacyFilterItem[] = [
  {
    name: 'office',
    title: 'Unidade',
    active: true,
    components: [
      {
        label: 'Selecionar Tudo',
        all: true,
        name: 'office',
        type: 'multiselect',
        options: [
          { value: '0', text: 'Sem unidade', selected: false },
          { value: '2848', text: 'ÉVORA MODELS', selected: true },
        ],
        attrs: [],
      },
    ],
  },
  {
    name: 'status',
    title: 'Status',
    active: true,
    components: [
      {
        label: 'Selecionar Tudo',
        all: true,
        name: 'status',
        type: 'multiselect',
        options: [
          { value: -1, text: 'Stand by', selected: false },
          { value: 0, text: 'Inativo', selected: false },
          { value: 1, text: 'Ativo', selected: true },
        ],
        attrs: [],
      },
    ],
  },
  {
    name: 'category',
    title: 'Categoria',
    active: true,
    components: [
      {
        label: 'Selecionar Tudo',
        all: true,
        name: 'category',
        type: 'multiselect',
        options: [
          { value: '2', text: 'Ator', selected: true },
          { value: '3', text: 'Celebridade', selected: true },
          { value: '1', text: 'Modelo', selected: true },
        ],
        attrs: [],
      },
    ],
  },
  {
    name: 'tags',
    title: 'Etiquetas',
    active: false,
    components: [
      {
        label: 'Selecionar Tudo',
        all: true,
        name: 'tags',
        type: 'multiselect',
        options: [{ value: '0', text: 'sem etiqueta', selected: false }],
        attrs: [],
      },
    ],
  },
  {
    name: 'gender',
    title: 'Gênero',
    active: false,
    components: [
      {
        label: 'Selecionar Tudo',
        all: true,
        name: 'gender',
        type: 'select',
        options: [
          { value: 'man', text: 'Masculino', selected: false },
          { value: 'woman', text: 'Feminino', selected: false },
          { value: 'undefined', text: 'Indefinido', selected: false },
        ],
        attrs: [],
      },
    ],
  },
  {
    name: 'gender_identity',
    title: 'Identidade de Gênero',
    active: false,
    components: [
      {
        label: 'Selecionar Tudo',
        all: true,
        name: 'gender_identity',
        type: 'select',
        options: [
          { value: 'Male', text: 'Male', selected: false },
          { value: 'Female', text: 'Female', selected: false },
          { value: 'Genderfluid', text: 'Genderfluid', selected: false },
        ],
        attrs: [],
      },
    ],
  },
  {
    name: 'age',
    title: 'Idade',
    active: false,
    components: [
      {
        label: 'De',
        name: 'from',
        type: 'select',
        options: [
          { value: 0, text: 0, selected: false },
          { value: 18, text: 18, selected: false },
          { value: 21, text: 21, selected: false },
          { value: 25, text: 25, selected: false },
          { value: 30, text: 30, selected: false },
        ],
      },
      {
        label: 'Até',
        name: 'to',
        type: 'select',
        options: [
          { value: 25, text: 25, selected: false },
          { value: 30, text: 30, selected: false },
          { value: 40, text: 40, selected: false },
          { value: 60, text: 60, selected: false },
        ],
      },
    ],
  },
  {
    name: 'height',
    title: 'Altura',
    active: false,
    components: [
      {
        label: 'De (cm)',
        name: 'from',
        type: 'select',
        options: [
          { value: 150, text: '150 cm', selected: false },
          { value: 165, text: '165 cm', selected: false },
          { value: 170, text: '170 cm', selected: false },
          { value: 175, text: '175 cm', selected: false },
          { value: 180, text: '180 cm', selected: false },
        ],
      },
      {
        label: 'Até (cm)',
        name: 'to',
        type: 'select',
        options: [
          { value: 175, text: '175 cm', selected: false },
          { value: 180, text: '180 cm', selected: false },
          { value: 190, text: '190 cm', selected: false },
          { value: 200, text: '200 cm', selected: false },
        ],
      },
    ],
  },
  {
    name: 'ethnicity',
    title: 'Etnia',
    active: false,
    components: [
      {
        label: 'Selecionar Tudo',
        all: true,
        name: 'ethnicity',
        type: 'multiselect',
        options: [
          { value: 'african', text: 'Africano', selected: false },
          { value: 'asian', text: 'Asiático', selected: false },
          { value: 'caucasian_european', text: 'Caucasiano/Europeu', selected: false },
          { value: 'latin_american_brown', text: 'Latino Americano/Pardo', selected: false },
          { value: 'indigenous', text: 'Indígena Americano', selected: false },
        ],
      },
    ],
  },
  {
    name: 'skin_tone',
    title: 'Tom da Pele',
    active: false,
    components: [
      {
        label: 'Selecionar Tudo',
        all: true,
        name: 'skin_tone',
        type: 'multiselect',
        options: [
          { value: '1', text: 'Muito Clara', selected: false },
          { value: '2', text: 'Clara', selected: false },
          { value: '3', text: 'Média / Morena Clara', selected: false },
          { value: '4', text: 'Morena', selected: false },
          { value: '5', text: 'Negra', selected: false },
        ],
      },
    ],
  },
  {
    name: 'eyes',
    title: 'Olhos',
    active: false,
    components: [
      {
        label: 'Selecionar Tudo',
        all: true,
        name: 'eyes',
        type: 'multiselect',
        options: [
          { value: 'blue', text: 'Azuis', selected: false },
          { value: 'brown', text: 'Castanhos', selected: false },
          { value: 'dark_brown', text: 'Castanhos Escuros', selected: false },
          { value: 'green', text: 'Verdes', selected: false },
          { value: 'hazel', text: 'Mel', selected: false },
        ],
      },
    ],
  },
  {
    name: 'hair',
    title: 'Cabelo',
    active: false,
    components: [
      {
        label: 'Selecionar Tudo',
        all: true,
        name: 'hair',
        type: 'multiselect',
        options: [
          { value: 'black', text: 'Preto', selected: false },
          { value: 'brown', text: 'Castanho', selected: false },
          { value: 'blonde', text: 'Loiro', selected: false },
          { value: 'red', text: 'Ruivo', selected: false },
          { value: 'gray', text: 'Grisalho', selected: false },
        ],
      },
    ],
  },
  {
    name: 'hair_kind',
    title: 'Tipo de cabelo',
    active: false,
    components: [
      {
        label: 'Selecionar Tudo',
        all: true,
        name: 'hair_kind',
        type: 'multiselect',
        options: [
          { value: 'straight', text: 'Liso', selected: false },
          { value: 'wavy', text: 'Ondulado', selected: false },
          { value: 'curly', text: 'Cacheado', selected: false },
          { value: 'coily', text: 'Crespo', selected: false },
          { value: 'bald', text: 'Careca / Raspado', selected: false },
        ],
      },
    ],
  },
  {
    name: 'shirt',
    title: 'Camisa',
    active: false,
    components: [
      {
        label: 'Tamanho',
        name: 'from_size',
        type: 'select',
        options: [
          { value: 'PP', text: 'PP / XS', selected: false },
          { value: 'P', text: 'P / S', selected: false },
          { value: 'M', text: 'M', selected: false },
          { value: 'G', text: 'G / L', selected: false },
          { value: 'GG', text: 'GG / XL', selected: false },
        ],
      },
    ],
  },
  {
    name: 'shoes',
    title: 'Sapato',
    active: false,
    components: [
      {
        label: 'De',
        name: 'from',
        type: 'select',
        options: [
          { value: 34, text: '34', selected: false },
          { value: 36, text: '36', selected: false },
          { value: 38, text: '38', selected: false },
          { value: 40, text: '40', selected: false },
          { value: 42, text: '42', selected: false },
        ],
      },
    ],
  },
  {
    name: 'jeans',
    title: 'Manequim',
    active: false,
    components: [
      {
        label: 'De',
        name: 'from',
        type: 'select',
        options: [
          { value: 34, text: '34', selected: false },
          { value: 36, text: '36', selected: false },
          { value: 38, text: '38', selected: false },
          { value: 40, text: '40', selected: false },
          { value: 42, text: '42', selected: false },
        ],
      },
    ],
  },
  {
    name: 'talent_gallery',
    title: 'Mídia do Talento',
    active: false,
    components: [
      {
        title: 'Compo',
        name: 'compo',
        options: [
          { value: '', text: 'Faça uma seleção', selected: true },
          { value: '1', text: 'Com conteúdo', selected: false },
          { value: '0', text: 'Sem conteúdo', selected: false },
        ],
      },
      {
        title: 'Book',
        name: 'book',
        options: [
          { value: '', text: 'Faça uma seleção', selected: true },
          { value: '1', text: 'Com conteúdo', selected: false },
          { value: '0', text: 'Sem conteúdo', selected: false },
        ],
      },
    ],
  },
  {
    name: 'skills',
    title: 'Habilidades',
    active: false,
    components: [
      {
        label: 'Selecionar Tudo',
        all: true,
        name: 'skills',
        type: 'multiselect',
        options: [
          { value: '1', text: 'Aeromodelo', selected: false, group: 'Dirige/Pilota' },
          { value: '2', text: 'Asa Delta', selected: false, group: 'Dirige/Pilota' },
          { value: '3', text: 'Ballet Clássico', selected: false, group: 'Dança' },
          { value: '4', text: 'Violão / Guitarra', selected: false, group: 'Música' },
        ],
      },
    ],
  },
  {
    name: 'languages',
    title: 'Idiomas',
    active: false,
    components: [
      {
        label: 'Selecionar Tudo',
        all: true,
        name: 'languages',
        type: 'abbreviatedMultiselect',
        title: 'Idiomas',
        options: [
          { value: 'PT', text: 'Português', text_cleaned: 'Portugues', selected: false },
          { value: 'EN', text: 'Inglês', text_cleaned: 'Ingles', selected: false },
        ],
      },
    ],
  },
  {
    name: 'cities',
    title: 'Localização',
    active: false,
    components: [
      {
        label: 'País',
        name: 'country',
        type: 'select',
        options: [{ value: '30', text: 'Brasil', selected: false }],
      },
      {
        label: 'Estado',
        name: 'state',
        type: 'select',
        options: [
          { value: 'SP', text: 'São Paulo', selected: false },
          { value: 'RJ', text: 'Rio de Janeiro', selected: false },
        ],
      },
    ],
  },
  {
    name: 'licensing',
    title: 'DRT',
    active: false,
    components: [
      {
        label: 'Selecionar Tudo',
        all: true,
        name: 'licensing',
        type: 'multiselect',
        options: [
          { value: '1', text: 'Possui DRT', selected: false },
          { value: '2', text: 'DRT Provisório', selected: false },
          { value: '0', text: 'Sem DRT', selected: false },
        ],
      },
    ],
  },
  {
    name: 'infosheet',
    title: 'Ficha online',
    active: false,
    components: [
      {
        label: 'Selecionar Tudo',
        all: true,
        name: 'infosheet',
        type: 'select',
        options: [
          { value: '0', text: 'Não preenchido', selected: false },
          { value: '1', text: 'Preenchido', selected: false },
        ],
      },
    ],
  },
];

export const INITIAL_NORMALIZED_FILTERS: NormalizedFilterCategory[] =
  normalizeLegacyFilters(LEGACY_FILTERS_DATA);

