/**
 * Arrays estáticos de dados mocados baseados na estrutura do `.json` legado
 * para alimentar os selects, dropdowns e seletores do módulo "Agregar Talento".
 */

export const OFFICE_OPTIONS = [
  { value: '2848', label: 'ÉVORA MODELS' },
  { value: '0', label: 'Sem unidade' },
];

export const STATUS_OPTIONS = [
  { value: '1', label: 'Ativo' },
  { value: '-1', label: 'Stand by' },
  { value: '0', label: 'Inativo' },
];

export const CATEGORY_OPTIONS = [
  { value: '1', label: 'Modelo' },
  { value: '2', label: 'Ator' },
  { value: '3', label: 'Celebridade' },
  { value: '4', label: 'Influenciador / Digital' },
  { value: '5', label: 'Figurante' },
];

export const TAG_OPTIONS = [
  { value: '0', label: 'Sem etiqueta' },
  { value: 'commercial', label: 'Perfil Comercial' },
  { value: 'fashion', label: 'High Fashion / Passarela' },
  { value: 'curve', label: 'Plus Size / Curve' },
  { value: 'kids', label: 'Kids & Teens' },
  { value: 'new_face', label: 'New Face' },
];

export const GENDER_OPTIONS = [
  { value: 'woman', label: 'Feminino' },
  { value: 'man', label: 'Masculino' },
  { value: 'undefined', label: 'Indefinido' },
];

export const GENDER_IDENTITY_OPTIONS = [
  { value: 'Female', label: 'Female (Feminino)' },
  { value: 'Male', label: 'Male (Masculino)' },
  { value: 'Genderfluid', label: 'Genderfluid (Gênero Fluido)' },
  { value: 'NonBinary', label: 'Não-binário' },
];

export const PRONOUN_OPTIONS = [
  { value: 'ela_dela', label: 'Ela / Dela' },
  { value: 'ele_dele', label: 'Ele / Dele' },
  { value: 'elu_delu', label: 'Elu / Delu' },
];

export const SKIN_TONE_OPTIONS = [
  { value: 'muito_clara', label: 'Muito Clara' },
  { value: 'clara', label: 'Clara' },
  { value: 'morena_clara', label: 'Média / Morena Clara' },
  { value: 'morena', label: 'Morena / Parda' },
  { value: 'negra', label: 'Negra' },
  { value: 'retinta', label: 'Negra Retinta' },
];

export const ETHNICITY_OPTIONS = [
  { value: 'caucasian_european', label: 'Caucasiano / Europeu' },
  { value: 'caucasian_blonde', label: 'Caucasiano / Loiro' },
  { value: 'latin_american_brown', label: 'Latino Americano / Pardo' },
  { value: 'latin_american_light_brown', label: 'Latino Americano / Moreno Claro' },
  { value: 'latin_american_hispanic', label: 'Latino Americano / Hispano' },
  { value: 'african', label: 'Africano / Afrodescendente' },
  { value: 'asian', label: 'Asiático' },
  { value: 'indigenous', label: 'Indígena Americano' },
  { value: 'middle_east', label: 'Oriente Médio / Norte da África' },
  { value: 'mestizo', label: 'Mestiço' },
];

export const EYES_OPTIONS = [
  { value: 'dark_brown', label: 'Castanhos Escuros' },
  { value: 'brown', label: 'Castanhos' },
  { value: 'hazel', label: 'Mel / Avelã' },
  { value: 'green', label: 'Verdes' },
  { value: 'blue', label: 'Azuis' },
  { value: 'black', label: 'Pretos' },
  { value: 'gray', label: 'Cinzas' },
];

export const HAIR_COLOR_OPTIONS = [
  { value: 'black', label: 'Preto' },
  { value: 'dark_brown', label: 'Castanho Escuro' },
  { value: 'brown', label: 'Castanho Médio' },
  { value: 'light_brown', label: 'Castanho Claro' },
  { value: 'blonde', label: 'Loiro' },
  { value: 'platinum', label: 'Loiro Platinado' },
  { value: 'red', label: 'Ruivo' },
  { value: 'gray', label: 'Grisalho / Branco' },
  { value: 'colored', label: 'Colorido / Fantasia' },
];

export const HAIR_LENGTH_OPTIONS = [
  { value: 'bald', label: 'Raspado / Careca' },
  { value: 'very_short', label: 'Muito Curto' },
  { value: 'short', label: 'Curto' },
  { value: 'medium', label: 'Médio (Ombros)' },
  { value: 'long', label: 'Longo' },
  { value: 'very_long', label: 'Muito Longo' },
];

export const HAIR_TYPE_OPTIONS = [
  { value: 'straight', label: 'Liso' },
  { value: 'wavy', label: 'Ondulado' },
  { value: 'curly', label: 'Cacheado' },
  { value: 'coily', label: 'Crespo / Afro' },
  { value: 'dreadlocks', label: 'Dreadlocks / Tranças' },
];

// Geradores de faixas numéricas baseados nas opções do JSON legado
export const HEIGHT_OPTIONS = Array.from({ length: 71 }, (_, i) => {
  const cm = 140 + i; // 140cm a 210cm
  return { value: String(cm), label: `${cm} cm` };
});

export const WEIGHT_OPTIONS = Array.from({ length: 81 }, (_, i) => {
  const kg = 40 + i; // 40kg a 120kg
  return { value: String(kg), label: `${kg} kg` };
});

export const BUST_WAIST_HIPS_OPTIONS = Array.from({ length: 71 }, (_, i) => {
  const cm = 55 + i; // 55cm a 125cm
  return { value: String(cm), label: `${cm} cm` };
});

export const SHIRT_SIZE_OPTIONS = [
  { value: 'PP', label: 'PP / XS' },
  { value: 'P', label: 'P / S' },
  { value: 'M', label: 'M' },
  { value: 'G', label: 'G / L' },
  { value: 'GG', label: 'GG / XL' },
  { value: 'XG', label: 'XG / XXL' },
];

export const MANNEQUIN_OPTIONS = [
  '32', '34', '36', '38', '40', '42', '44', '46', '48', '50', '52',
].map((size) => ({ value: size, label: size }));

export const SHOES_OPTIONS = [
  '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45',
].map((size) => ({ value: size, label: size }));

export const NATIONALITY_OPTIONS = [
  { value: 'BR', label: 'Brasil' },
  { value: 'PT', label: 'Portugal' },
  { value: 'AR', label: 'Argentina' },
  { value: 'US', label: 'Estados Unidos' },
  { value: 'IT', label: 'Itália' },
  { value: 'FR', label: 'França' },
  { value: 'ES', label: 'Espanha' },
];

export const STATE_OPTIONS = [
  { value: 'SP', label: 'São Paulo' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'PR', label: 'Paraná' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'BA', label: 'Bahia' },
  { value: 'DF', label: 'Distrito Federal' },
];

export const LANGUAGE_OPTIONS = [
  { value: 'PT', label: 'Português' },
  { value: 'EN', label: 'Inglês' },
  { value: 'ES', label: 'Espanhol' },
  { value: 'FR', label: 'Francês' },
  { value: 'IT', label: 'Italiano' },
  { value: 'DE', label: 'Alemão' },
  { value: 'LIBRAS', label: 'Libras' },
];

export const LANGUAGE_LEVEL_OPTIONS = [
  { value: 'basic', label: 'Básico' },
  { value: 'intermediary', label: 'Intermediário' },
  { value: 'advanced', label: 'Avançado' },
  { value: 'fluent', label: 'Fluente' },
  { value: 'native', label: 'Nativo' },
];

export const CONTACT_RELATION_OPTIONS = [
  { value: 'mother', label: 'Mãe' },
  { value: 'father', label: 'Pai' },
  { value: 'legal_guardian', label: 'Responsável Legal' },
  { value: 'spouse', label: 'Cônjuge / Parceiro(a)' },
  { value: 'agent', label: 'Agente / Booker' },
  { value: 'other', label: 'Outro' },
];

export const SKILLS_BY_GROUP = {
  sport: [
    'Acrobacia',
    'Artes Marciais / Boxe',
    'Atletismo / Corrida',
    'Basquete',
    'Ciclismo',
    'Crossfit / Musculação',
    'Equitação',
    'Futebol',
    'Ginástica Artística / Rítmica',
    'Natação',
    'Patinação / Skate',
    'Surf',
    'Tênis / Beach Tennis',
    'Yoga / Pilates',
  ],
  drive_pilot: [
    'Aeromodelo',
    'Asa Delta',
    'Barco / Lancha',
    'Caminhão (CNH C/D/E)',
    'Carro Automático (CNH B)',
    'Carro Manual (CNH B)',
    'Helicóptero / Avião',
    'Jet Ski',
    'Kart / Pilotagem Esportiva',
    'Motocicleta (CNH A)',
  ],
  music: [
    'Bateria / Percussão',
    'Canto Lírico',
    'Canto Popular / Pop',
    'Contrabaixo',
    'DJ / Produção Musical',
    'Flauta / Sopro',
    'Guitarra',
    'Piano / Teclado',
    'Saxofone',
    'Ukulele',
    'Violão',
    'Violino',
  ],
  other_skills: [
    'Apresentador(a) / Mestre de Cerimônias',
    'Ballet Clássico',
    'Circo / Malabares / Tecido Acrobático',
    'Dança Contemporânea',
    'Dança de Salão / Tango / Samba',
    'Dança Urbana / Hip-Hop / Street',
    'Dublagem / Locução',
    'Gastronomia / Culinária',
    'Improviso / Stand-up Comedy',
    'Sapateado / Jazz Musical',
    'Teatro / Dramaturgia',
  ],
};

export const MARITAL_STATUS_OPTIONS = [
  { value: 'single', label: 'Solteiro(a)' },
  { value: 'married', label: 'Casado(a)' },
  { value: 'stable_union', label: 'União Estável' },
  { value: 'divorced', label: 'Divorciado(a)' },
  { value: 'widowed', label: 'Viúvo(a)' },
];

export const CHILDREN_OPTIONS = [
  { value: '0', label: 'Não possui filhos' },
  { value: '1', label: '1 filho(a)' },
  { value: '2', label: '2 filhos(as)' },
  { value: '3+', label: '3 ou mais filhos(as)' },
];

export const BANK_PERSON_TYPE_OPTIONS = [
  { value: 'PF', label: 'Pessoa Física (CPF)' },
  { value: 'PJ', label: 'Pessoa Jurídica (CNPJ)' },
];

export const BANK_ACCOUNT_TYPE_OPTIONS = [
  { value: 'checking', label: 'Conta Corrente' },
  { value: 'savings', label: 'Conta Poupança' },
  { value: 'payment', label: 'Conta de Pagamento / PIX' },
];

