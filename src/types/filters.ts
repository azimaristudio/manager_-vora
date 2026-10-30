/**
 * Tipagens TypeScript geradas a partir da engenharia reversa do arquivo `.json` (API Legada)
 * e interfaces normalizadas para o novo frontend React + Firebase.
 */

export type FilterName =
  | 'office'
  | 'status'
  | 'category'
  | 'tags'
  | 'gender'
  | 'gender_identity'
  | 'age'
  | 'height'
  | 'ethnicity'
  | 'skin_tone'
  | 'eyes'
  | 'hair'
  | 'hair_kind'
  | 'shirt'
  | 'shoes'
  | 'jeans'
  | 'talent_gallery'
  | 'skills'
  | 'nationality'
  | 'languages'
  | 'tattoo'
  | 'cities'
  | 'flights'
  | 'mother_agency'
  | 'licensing'
  | 'privacy_terms'
  | 'ID'
  | 'talent_name'
  | 'infosheet'
  | 'contract'
  | 'registration_date'
  | (string & {});

export type FilterComponentType =
  | 'multiselect'
  | 'select'
  | 'input'
  | 'abbreviatedMultiselect'
  | 'custom-select'
  | 'radio'
  | 'contract_range_component'
  | 'date_range'
  | '';

/**
 * Representa uma opção individual dentro de um componente de filtro (select, multiselect, etc.)
 * Nota sobre o legado: `value` e `text` podem vir como `string` ou `number` (ex: Status usa -1, 0, 1; Idade usa números).
 */
export interface FilterOption {
  value: string | number;
  text: string | number;
  selected: boolean;
  /** Presente em filtros agrupados como `skills` (ex: "Dirige/Pilota", "Esporte", "Música") */
  group?: string;
  /** Presente em filtros com busca textual normalizada como `languages` (ex: "Ingles", "Portugues") */
  text_cleaned?: string;
}

export interface ContractRangePoint {
  mode: 'before' | 'after' | 'between' | string;
  range_start: string;
  range_end: string;
}

export interface ContractRangeValue {
  contract_range_start: ContractRangePoint;
  contract_range_end: ContractRangePoint;
}

/**
 * Componente interno de um filtro na resposta da API legada.
 * Nota de engenharia reversa:
 * - No filtro `age` (birthdateFrom/To), `options` vem como `{}` (objeto vazio) em vez de `[]`.
 * - No filtro `flights`, a propriedade `type` vem erroneamente preenchida com um array de `FilterOption[]`.
 */
export interface LegacyFilterComponent {
  name: string;
  label?: string;
  title?: string;
  all?: boolean;
  /** Na API legada, `flights` envia um array de opções dentro de `type` por erro de serialização no backend legado */
  type?: FilterComponentType | FilterOption[];
  /** Na API legada, inputs de data podem retornar `{}` em vez de `FilterOption[]` */
  options?: FilterOption[] | Record<string, never>;
  attrs?: unknown[];
  /** Presente em `talent_gallery` (Compo, Book, Snap, Video) */
  magnitude_options?: FilterOption[];
  magnitude?: 'months' | 'days' | string;
  last_update?: boolean;
  /** Presente em `cities` (layout de grid Bootstrap legado, ex: 12) */
  cols?: number;
  /** Presente em `contract` */
  value?: string | ContractRangeValue;
}

/**
 * Item principal do array `filters` no JSON legado.
 */
export interface LegacyFilterItem {
  name: FilterName;
  title?: string;
  active: boolean;
  input?: boolean;
  type?: 'date_range' | string;
  components: LegacyFilterComponent[];
}

/**
 * Estrutura raiz do arquivo `.json` da API legada.
 */
export interface LegacyFiltersApiResponse {
  filters: LegacyFilterItem[];
  translations: Record<string, string>;
  current_lang: 'pt' | 'en' | 'es' | string;
  offices: unknown[];
  assets_handler: string;
  documents_handler: string;
}

/* ============================================================================
 * ESTRUTURA NORMALIZADA (MODERNA) PARA O FRONTEND & FIRESTORE
 * Corrige inconsistências do JSON legado (como options: {} ou type: Array)
 * ============================================================================ */

export interface NormalizedFilterOption {
  value: string;
  label: string;
  selected: boolean;
  group?: string;
}

export interface NormalizedFilterComponent {
  name: string;
  label: string;
  type: Exclude<FilterComponentType, ''> | 'gallery_status';
  allowSelectAll: boolean;
  options: NormalizedFilterOption[];
}

export interface NormalizedFilterCategory {
  id: FilterName;
  title: string;
  defaultExpanded: boolean;
  isSearchInput?: boolean;
  components: NormalizedFilterComponent[];
}

