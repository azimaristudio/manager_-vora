/**
 * Arquitetura de Coleções recomendada para o Cloud Firestore (Firebase).
 * Projetada para suportar multi-unidade (offices), filtros rápidos no diretório de talentos
 * e metadados dinâmicos de filtros sem exceder limites de índices compostos do Firestore.
 */

export type TalentStatus = 'active' | 'inactive' | 'stand_by'; // Mapeado de 1, 0, -1 do legado

export interface FirestoreTimestampLike {
  seconds: number;
  nanoseconds: number;
}

/**
 * Coleção: `offices/{officeId}`
 * Representa as unidades da agência (ex: "2848" -> "ÉVORA MODELS")
 */
export interface OfficeDocument {
  id: string;
  name: string;
  active: boolean;
  createdAt: FirestoreTimestampLike;
}

/**
 * Coleção: `settings/talent_filters` (ou `filter_configs/{filterId}`)
 * Armazena as opções dinâmicas configuráveis pela agência (Categorias, Etiquetas, Olhos, Cabelo, etc.)
 */
export interface FilterConfigDocument {
  id: string;
  title: string;
  order: number;
  activeByDefault: boolean;
  componentType: 'multiselect' | 'select' | 'range' | 'date_range' | 'boolean';
  options: Array<{
    id: string;
    label: Record<'pt' | 'en' | 'es', string>;
    group?: string;
    active: boolean;
  }>;
  updatedAt: FirestoreTimestampLike;
}

/**
 * Coleção: `talents/{talentId}`
 * Documento principal do talento com campos indexados para filtragem rápida.
 */
export interface TalentDocument {
  id: string;
  /** Nome artístico / exibição (ex: "Sophia Évora") */
  stageName: string;
  /** Nome civil / completo (ex: "Sophia Egito") */
  fullName: string;
  /** Primeira letra em maiúsculo para o filtro alfabético A-Z da barra superior */
  initialLetter: string;
  /** ID da unidade (`offices/{officeId}`), ou "0" para Sem unidade */
  officeId: string;
  officeName: string;
  /** Status mapeado: 1 -> 'active', 0 -> 'inactive', -1 -> 'stand_by' */
  status: TalentStatus;
  /** IDs das categorias atribuídas (ex: ['1', '2', '3'] -> Modelo, Ator, Celebridade) */
  categoryIds: string[];
  /** Etiquetas personalizadas da agência */
  tagIds: string[];

  /** Dados demográficos e perfil */
  profile: {
    gender: 'man' | 'woman' | 'undefined';
    genderIdentity?: 'Male' | 'Female' | 'Genderfluid' | string;
    birthDate?: string; // ISO YYYY-MM-DD
    ageYears?: number;
    nationalityId?: string;
    ethnicityId?: string;
    skinToneId?: string;
    location?: {
      countryId: string;
      stateId: string;
      cityId: string;
      cityName: string;
    };
  };

  /** Medidas físicas (armazenadas em números para queries de range `>=` e `<=`) */
  measurements: {
    heightCm?: number;
    bustCm?: number;
    waistCm?: number;
    hipsCm?: number;
    shoesSize?: number;
    mannequinSize?: number;
    shirtSize?: string;
    eyesId?: string;
    hairColorId?: string;
    hairTypeId?: string;
    hasTattoo?: boolean;
  };

  /** Habilidades e Idiomas (arrays planos de IDs para uso com `array-contains` / `array-contains-any`) */
  skillIds: string[];
  languageCodes: string[]; // ex: ['PT', 'EN']
  drtStatus?: string;
  motherAgencyId?: string;

  /** Resumo de mídia para filtros rápidos de "Com conteúdo / Sem conteúdo / Atualizado há X meses" */
  mediaSummary: {
    coverPhotoUrl?: string;
    hasCompo: boolean;
    hasBook: boolean;
    hasSnap: boolean;
    hasVideo: boolean;
    lastMediaUpdateAt?: FirestoreTimestampLike;
  };

  /** Controle administrativo e termos */
  compliance: {
    infosheetFilled: boolean;
    privacyTermsSent: boolean;
    privacyTermsAccepted: boolean;
    hasActiveContract: boolean;
    contractStartDate?: string;
    contractEndDate?: string;
  };

  createdAt: FirestoreTimestampLike;
  updatedAt: FirestoreTimestampLike;
}

