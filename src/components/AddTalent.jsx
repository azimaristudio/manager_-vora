import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Trophy,
  PieChart,
  Banknote,
  CreditCard,
  Mail,
  CheckCircle2,
  Sparkles,
  Image as ImageIcon,
  Save,
  ArrowLeft,
  Code2,
  X,
} from 'lucide-react';
import PersonalInfoForm from './talent-form/PersonalInfoForm';
import MeasurementsForm from './talent-form/MeasurementsForm';
import MediaUploadForm from './talent-form/MediaUploadForm';
import SkillsAndCareerForm from './talent-form/SkillsAndCareerForm';
import AdminAndBankForm from './talent-form/AdminAndBankForm';
import { OnlineInfosheetModal } from './talent-form/OnlineInfosheetModal';
import CompoMakeModal from './CompoMakeModal';

const TABS = [
  { id: 'geral', label: 'Geral', icon: User },
  { id: 'midia', label: 'Fotos & Composites', icon: ImageIcon },
  { id: 'habilidades', label: 'Habilidades', icon: Trophy },
  { id: 'carreira', label: 'Carreira', icon: PieChart },
  { id: 'admin', label: 'Informações Administrativas', icon: Banknote },
  { id: 'bancos', label: 'Contas Bancárias', icon: CreditCard },
];

const INITIAL_FORM_STATE = {
  personal: {
    office: '2848',
    categories: ['1'], // Modelo
    tag: 'fashion',
    status: '1', // Ativo
    gender: 'woman',
    genderIdentity: 'Female',
    pronoun: 'ela_dela',
    stageName: '',
    fullName: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    ethnicity: '',
    nationality: 'BR',
    birthCity: '',
    languages: [{ id: 1, language: 'PT', level: 'native' }],
    country: 'BR',
    state: 'SP',
    city: '',
    currentAddress: '',
    street: '',
    streetNumber: '',
    neighborhood: '',
    zipCode: '',
    email: '',
    altEmails: [{ id: 1, email: '', label: '' }],
    phones: [{ id: 1, type: 'Celular', ddi: '+55', number: '', notes: '' }],
    socials: {
      instagram: '',
      tiktok: '',
      youtube: '',
      facebook: '',
      modelsDotCom: '',
    },
    packageNotes: '',
    relatedContacts: [{ id: 1, relation: '', name: '', phone: '' }],
  },
  measurements: {
    height: '',
    weight: '',
    bust: '',
    waist: '',
    hips: '',
    eyes: '',
    hairColor: '',
    hairDye: 'natural',
    hairLength: '',
    hairType: '',
    shirt: '',
    mannequin: '',
    shoes: '',
    skinTone: '',
    scars: '',
    hasTattoo: 'no',
    tattooNotes: '',
    hasPiercing: 'no',
    piercingNotes: '',
    birthmarks: '',
    bodyRestrictions: '',
    hasFoodRestriction: 'no',
    foodRestrictionNotes: '',
    toplessRestriction: 'no',
    fullNudityRestriction: 'no',
  },
  skills: {
    sport: [],
    drive_pilot: [],
    music: [],
    other_skills: [],
  },
  career: {
    careerNotes: '',
    motherAgency: 'ÉVORA MODELS',
    startYear: '',
  },
  admin: {
    maritalStatus: '',
    children: '',
    rg: '',
    cpf: '',
    invoicesAsCompany: '',
    municipalRegistration: '',
    imageRightsAuthorized: 'no',
    drtActor: '',
    drtModel: '',
    drtPresenter: '',
  },
  bankAccounts: [
    {
      id: 1,
      bankName: '',
      branch: '',
      accountNumber: '',
      beneficiary: '',
      personType: '',
      address: '',
      accountType: '',
      notes: '',
    },
  ],
};

export default function AddTalent({ onBackToList, onTalentCreated }) {
  const [activeTab, setActiveTab] = useState('geral');
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [mediaItems, setMediaItems] = useState([]);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState('');

  // Modais e Toasts
  const [isInfosheetModalOpen, setIsInfosheetModalOpen] = useState(false);
  const [isCompoMakeModalOpen, setIsCompoMakeModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [lastSavedPayload, setLastSavedPayload] = useState(null);
  const [showPayloadInspector, setShowPayloadInspector] = useState(false);

  // Limpeza de URLs temporárias (`URL.createObjectURL`) ao desmontar o componente
  useEffect(() => {
    return () => {
      mediaItems.forEach((item) => {
        if (item.previewUrl) {
          URL.revokeObjectURL(item.previewUrl);
        }
      });
    };
  }, []);

  // Atualizador genérico para seções aninhadas do estado
  const handleNestedChange = (section, field, value) => {
    setFormData((prev) => {
      if (field === null) {
        return { ...prev, [section]: value };
      }
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      };
    });
  };

  // Upload local com `URL.createObjectURL`
  const handleAddMediaFiles = (files, defaultCategory = 'Polaroid / Snap', setAsProfile = false) => {
    const createdItems = files.map((file, idx) => {
      const objectUrl = URL.createObjectURL(file);
      return {
        id: `${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 7)}`,
        name: file.name,
        sizeKB: Math.round(file.size / 1024),
        mimeType: file.type,
        category: defaultCategory,
        previewUrl: objectUrl,
      };
    });

    setMediaItems((prev) => [...createdItems, ...prev]);

    if (setAsProfile && createdItems[0]) {
      setProfilePhotoUrl(createdItems[0].previewUrl);
    } else if (!profilePhotoUrl && createdItems[0]) {
      setProfilePhotoUrl(createdItems[0].previewUrl);
    }
  };

  const handleRemoveMediaItem = (id) => {
    setMediaItems((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target?.previewUrl) {
        URL.revokeObjectURL(target.previewUrl);
      }
      const remaining = prev.filter((item) => item.id !== id);
      if (target?.previewUrl === profilePhotoUrl) {
        setProfilePhotoUrl(remaining[0]?.previewUrl || '');
      }
      return remaining;
    });
  };

  const handleUpdateMediaCategory = (id, nextCategory) => {
    setMediaItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, category: nextCategory } : item
      )
    );
  };

  // Preenchedor rápido para facilitar o teste local de todas as abas
  const handleFillDemoData = () => {
    setFormData({
      personal: {
        office: '2848',
        categories: ['1', '2'],
        tag: 'fashion',
        status: '1',
        gender: 'woman',
        genderIdentity: 'Female',
        pronoun: 'ela_dela',
        stageName: 'Helena Valente',
        fullName: 'Helena Valente Albuquerque',
        birthDay: '14',
        birthMonth: '05',
        birthYear: '2001',
        ethnicity: 'latin_american_light_brown',
        nationality: 'BR',
        birthCity: 'Belo Horizonte - MG',
        languages: [
          { id: 1, language: 'PT', level: 'native' },
          { id: 2, language: 'EN', level: 'fluent' },
        ],
        country: 'BR',
        state: 'SP',
        city: 'São Paulo',
        currentAddress: 'Apto 142 - Próximo à Av. Paulista',
        street: 'Rua Oscar Freire',
        streetNumber: '850',
        neighborhood: 'Jardins',
        zipCode: '01426-001',
        email: 'helena.valente@evoramodels.com.br',
        altEmails: [
          { id: 1, email: 'assessoria.helena@gmail.com', label: 'Assessoria' },
        ],
        phones: [
          {
            id: 1,
            type: 'WhatsApp',
            ddi: '+55',
            number: '(11) 99812-4450',
            notes: 'Principal',
          },
        ],
        socials: {
          instagram: '@helenavalente.model',
          tiktok: '@helenavalente',
          youtube: 'youtube.com/@helenavalente',
          facebook: '',
          modelsDotCom: 'models.com/models/helena-valente',
        },
        packageNotes: 'Disponível para viagens internacionais (Passaporte UE e Visto Americano válidos).',
        relatedContacts: [
          {
            id: 1,
            relation: 'mother',
            name: 'Cláudia Valente',
            phone: '(31) 98877-1122',
          },
        ],
      },
      measurements: {
        height: '177',
        weight: '56',
        bust: '84',
        waist: '61',
        hips: '89',
        eyes: 'green',
        hairColor: 'brown',
        hairDye: 'natural',
        hairLength: 'long',
        hairType: 'wavy',
        shirt: 'P',
        mannequin: '36',
        shoes: '38',
        skinTone: 'clara',
        scars: 'Nenhuma aparente',
        hasTattoo: 'yes',
        tattooNotes: 'Minimalista de 2cm no tornozelo esquerdo',
        hasPiercing: 'no',
        piercingNotes: '',
        birthmarks: 'Nenhuma',
        bodyRestrictions: 'Não aceita campanhas de cigarro/tabaco',
        hasFoodRestriction: 'yes',
        foodRestrictionNotes: 'Vegetariana',
        toplessRestriction: 'no',
        fullNudityRestriction: 'yes',
      },
      skills: {
        sport: ['Yoga / Pilates', 'Natação', 'Tênis / Beach Tennis'],
        drive_pilot: ['Carro Automático (CNH B)'],
        music: ['Violão', 'Canto Popular / Pop'],
        other_skills: ['Teatro / Dramaturgia', 'Dança Contemporânea'],
      },
      career: {
        careerNotes:
          'Desfilou no SPFW N56 e N57. Campanhas comerciais para marcas de cosméticos e editoriais na Vogue Brasil e Elle.',
        motherAgency: 'ÉVORA MODELS',
        startYear: '2019',
      },
      admin: {
        maritalStatus: 'single',
        children: '0',
        rg: '48.192.301-9',
        cpf: '412.890.123-45',
        invoicesAsCompany: 'yes',
        municipalRegistration: '7891234-5',
        imageRightsAuthorized: 'yes',
        drtActor: '0049182/SP',
        drtModel: '0019283/SP',
        drtPresenter: '',
      },
      bankAccounts: [
        {
          id: 1,
          bankName: 'Itaú Unibanco (341)',
          branch: '0392',
          accountNumber: '44910-2',
          beneficiary: 'Helena Valente Produções Artísticas LTDA',
          personType: 'PJ',
          address: 'Av. Brigadeiro Faria Lima, São Paulo - SP',
          accountType: 'checking',
          notes: 'PIX CNPJ: 34.123.456/0001-99',
        },
      ],
    });

    setToastMessage({
      type: 'info',
      title: 'Dados de exemplo preenchidos!',
      subtitle: 'Navegue pelas abas para conferir ou clique em SALVAR para testar a submissão.',
    });
    setTimeout(() => setToastMessage(null), 5000);
  };

  // Submissão falsa (`handleCreateTalent`) exigida na Fase 2
  const handleCreateTalent = (e) => {
    if (e) e.preventDefault();

    const consolidatedPayload = {
      id: `talent_${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...formData,
      media: {
        profilePhotoUrl: profilePhotoUrl || null,
        totalFiles: mediaItems.length,
        files: mediaItems.map((m) => ({
          id: m.id,
          name: m.name,
          category: m.category,
          sizeKB: m.sizeKB,
          mimeType: m.mimeType,
          previewObjectUrl: m.previewUrl,
        })),
      },
    };

    // Dispara o console.log estruturado conforme solicitado
    console.log('✅ [handleCreateTalent] Talento salvo com sucesso (Dados Mocados):', consolidatedPayload);

    setLastSavedPayload(consolidatedPayload);
    setShowPayloadInspector(true);
    setToastMessage({
      type: 'success',
      title: 'Talento salvo com sucesso!',
      subtitle: `${
        formData.personal.stageName || formData.personal.fullName || 'Novo Talento'
      } foi consolidado e exibido no console.log(dados).`,
    });

    if (onTalentCreated) {
      onTalentCreated(consolidatedPayload);
    }

    setTimeout(() => {
      setToastMessage((prev) => (prev?.type === 'success' ? null : prev));
    }, 7000);
  };

  return (
    <div className="w-full pb-16">
      {/* Toast / Alerta Visual Flutuante */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 max-w-md bg-slate-900 text-white px-4 py-3.5 rounded-md shadow-2xl border-l-4 border-emerald-400 flex items-start gap-3 animate-in fade-in slide-in-from-top-3 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="flex-1 text-xs">
            <p className="font-bold text-white">{toastMessage.title}</p>
            <p className="text-slate-300 mt-0.5 leading-relaxed">
              {toastMessage.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Barra de Topo: Voltar + Botão Laranja "ENVIAR FICHA ONLINE" + Auto-Preencher Demo */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2">
          {onBackToList && (
            <button
              type="button"
              onClick={onBackToList}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 rounded-xs text-xs font-medium transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar para listagem</span>
            </button>
          )}
          <span className="text-xs text-slate-400">
            <Link to="/" className="text-[#0077b5] hover:underline">
              Início
            </Link>{' '}
            &gt;{' '}
            <Link to="/" className="text-[#0077b5] hover:underline">
              Talentos
            </Link>{' '}
            &gt;{' '}
            <strong className="text-slate-600 font-semibold">
              {formData.personal.stageName || 'Novo perfil'}
            </strong>
          </span>
        </div>

        {/* Botão Central Laranja "ENVIAR FICHA ONLINE" (Fiel às Imagens 03 a 08) */}
        <button
          type="button"
          onClick={() => setIsInfosheetModalOpen(true)}
          className="px-4 py-2 bg-[#f58220] hover:bg-[#e07112] active:scale-[0.99] text-white text-[11px] font-bold uppercase tracking-wider rounded-xs shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>ENVIAR FICHA ONLINE</span>
        </button>

        {/* Botão Auxiliar para Preencher Dados de Exemplo com 1 clique */}
        <button
          type="button"
          onClick={handleFillDemoData}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-[#0077b5] border border-sky-200 rounded-xs text-xs font-semibold transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Preencher Dados de Teste</span>
        </button>
      </div>

      {/* Container Principal com as Abas (Geral, Habilidades, Carreira, Informações Administrativas, Contas Bancárias) */}
      <form onSubmit={handleCreateTalent}>
        <div className="bg-[#f4f5f7] border border-slate-200 rounded-t-sm flex flex-wrap items-center">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-5 py-3.5 flex items-center gap-2 text-xs font-medium border-r border-slate-200 transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-white text-[#0077b5] font-bold border-t-2 border-t-[#0077b5] -mb-px'
                    : 'text-slate-600 hover:bg-slate-200/60 hover:text-slate-900'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    isActive
                      ? 'bg-[#0077b5] text-white'
                      : 'bg-slate-800 text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </span>
                <span>{tab.label}</span>
                {tab.id === 'midia' && mediaItems.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 bg-[#0077b5] text-white rounded-full text-[10px]">
                    {mediaItems.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Conteúdo da Aba Selecionada */}
        <div className="bg-slate-50/50 border-x border-b border-slate-200 p-4 sm:p-6 rounded-b-sm">
          {/* ABA 1: GERAL (Layout de 3 colunas fiel à Imagem 03) */}
          {activeTab === 'geral' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Coluna Esquerda (4 cols): Upload de Foto de Perfil + Galeria Compacta */}
              <div className="lg:col-span-4">
                <MediaUploadForm
                  compact={true}
                  mediaItems={mediaItems}
                  profilePhotoUrl={profilePhotoUrl}
                  onAddMediaFiles={handleAddMediaFiles}
                  onRemoveMediaItem={handleRemoveMediaItem}
                  onUpdateMediaCategory={handleUpdateMediaCategory}
                  onSetProfilePhoto={setProfilePhotoUrl}
                  onOpenCompoMake={() => setIsCompoMakeModalOpen(true)}
                />
              </div>

              {/* Coluna Central (4 cols): Info Básica, Idiomas, Endereço, Redes Sociais, Contatos */}
              <div className="lg:col-span-4">
                <PersonalInfoForm
                  formData={formData}
                  onNestedChange={handleNestedChange}
                />
              </div>

              {/* Coluna Direita (4 cols): Medidas, Detalhes de Corpo e Restrições de Sessão */}
              <div className="lg:col-span-4">
                <MeasurementsForm
                  formData={formData}
                  onNestedChange={handleNestedChange}
                />
              </div>
            </div>
          )}

          {/* ABA 2: FOTOS & COMPOSITES (Visão expandida dedicada para Upload e CompoMake) */}
          {activeTab === 'midia' && (
            <MediaUploadForm
              compact={false}
              mediaItems={mediaItems}
              profilePhotoUrl={profilePhotoUrl}
              onAddMediaFiles={handleAddMediaFiles}
              onRemoveMediaItem={handleRemoveMediaItem}
              onUpdateMediaCategory={handleUpdateMediaCategory}
              onSetProfilePhoto={setProfilePhotoUrl}
              onOpenCompoMake={() => setIsCompoMakeModalOpen(true)}
            />
          )}

          {/* ABA 3: HABILIDADES (Fiel à Imagem 05) */}
          {activeTab === 'habilidades' && (
            <SkillsAndCareerForm
              mode="skills"
              formData={formData}
              onNestedChange={handleNestedChange}
            />
          )}

          {/* ABA 4: CARREIRA (Fiel à Imagem 06) */}
          {activeTab === 'carreira' && (
            <SkillsAndCareerForm
              mode="career"
              formData={formData}
              onNestedChange={handleNestedChange}
            />
          )}

          {/* ABA 5: INFORMAÇÕES ADMINISTRATIVAS (Fiel à Imagem 07) */}
          {activeTab === 'admin' && (
            <AdminAndBankForm
              mode="admin"
              formData={formData}
              onNestedChange={handleNestedChange}
            />
          )}

          {/* ABA 6: CONTAS BANCÁRIAS (Fiel à Imagem 08) */}
          {activeTab === 'bancos' && (
            <AdminAndBankForm
              mode="bank"
              formData={formData}
              onNestedChange={handleNestedChange}
            />
          )}
        </div>

        {/* Barra Inferior de Ações: CANCELAR | SALVAR (Fiel às Imagens 03 a 08) */}
        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => {
              if (onBackToList) onBackToList();
            }}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-300 text-xs font-semibold uppercase rounded-xs transition-colors cursor-pointer"
          >
            CANCELAR
          </button>

          <button
            type="submit"
            className="px-5 py-2 bg-[#0077b5] hover:bg-[#006399] active:scale-[0.99] text-white text-xs font-bold uppercase rounded-xs shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>SALVAR</span>
          </button>
        </div>
      </form>

      {/* Inspetor Visual do Payload consolidado pelo `handleCreateTalent` */}
      {lastSavedPayload && showPayloadInspector && (
        <div className="mt-8 bg-slate-900 text-slate-100 rounded-md p-5 border border-slate-700 shadow-lg">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Resultado do handleCreateTalent — Dados Consolidados (Também no console.log)
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowPayloadInspector(false)}
              className="text-xs text-slate-400 hover:text-white cursor-pointer"
            >
              Ocultar JSON
            </button>
          </div>
          <pre className="text-[11px] font-mono text-sky-200 overflow-x-auto max-h-80 leading-relaxed">
            {JSON.stringify(lastSavedPayload, null, 2)}
          </pre>
        </div>
      )}

      {/* Modal 04: Enviar Ficha Online */}
      <OnlineInfosheetModal
        isOpen={isInfosheetModalOpen}
        onClose={() => setIsInfosheetModalOpen(false)}
        initialName={formData.personal.stageName || formData.personal.fullName}
        initialEmail={formData.personal.email}
        onSendSuccess={(recipient) => {
          setToastMessage({
            type: 'success',
            title: 'Ficha Online enviada!',
            subtitle: `Solicitação de preenchimento enviada para ${recipient}.`,
          });
          setTimeout(() => setToastMessage(null), 5000);
        }}
      />

      {/* Modal 09: CompoMake */}
      <CompoMakeModal
        isOpen={isCompoMakeModalOpen}
        onClose={() => setIsCompoMakeModalOpen(false)}
        initialTalentName={
          formData.personal.stageName || formData.personal.fullName
        }
      />
    </div>
  );
}

