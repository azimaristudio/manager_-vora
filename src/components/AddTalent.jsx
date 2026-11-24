import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Trophy,
  Clock,
  CreditCard,
  Mail,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Image as ImageIcon,
  Save,
  ArrowLeft,
  X,
  Loader2,
  IdCard,
} from 'lucide-react';
import PersonalInfoForm from './talent-form/PersonalInfoForm';
import MeasurementsForm from './talent-form/MeasurementsForm';
import MediaUploadForm from './talent-form/MediaUploadForm';
import SkillsAndCareerForm from './talent-form/SkillsAndCareerForm';
import AdminAndBankForm from './talent-form/AdminAndBankForm';
import { OnlineInfosheetModal } from './talent-form/OnlineInfosheetModal';
import CompoMakeModal from './CompoMakeModal';
import { createTalentWithMedia } from '../services/talentsService';

const TABS = [
  { id: 'geral', label: 'Geral', icon: User },
  { id: 'midia', label: 'Fotos & Composites', icon: ImageIcon },
  { id: 'habilidades', label: 'Habilidades', icon: Trophy },
  { id: 'carreira', label: 'Carreira', icon: Clock },
  { id: 'admin', label: 'Informações Administrativas', icon: IdCard },
  { id: 'bancos', label: 'Contas Bancárias', icon: CreditCard },
];

const INITIAL_FORM_STATE = {
  personal: {
    office: '2848',
    categories: ['1'],
    tag: 'fashion',
    status: '1',
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
    relatedContacts: [{ id: 1, relation: '', name: '', ddi: '+55', phone: '' }],
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
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('geral');
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [mediaItems, setMediaItems] = useState([]);
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const [isInfosheetModalOpen, setIsInfosheetModalOpen] = useState(false);
  const [isCompoMakeModalOpen, setIsCompoMakeModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const createdObjectUrlsRef = useRef([]);

  useEffect(() => {
    return () => {
      createdObjectUrlsRef.current.forEach((url) => {
        try {
          URL.revokeObjectURL(url);
        } catch {
          // ignore
        }
      });
    };
  }, []);

  const showToast = (toast, durationMs = 5500) => {
    setToastMessage(toast);
    if (durationMs > 0) {
      setTimeout(() => {
        setToastMessage((prev) => (prev === toast ? null : prev));
      }, durationMs);
    }
  };

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

  const handleSelectProfileFile = (file) => {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    createdObjectUrlsRef.current.push(objectUrl);
    setProfilePhotoFile(file);
    setProfilePhotoUrl(objectUrl);
  };

  const handleClearProfilePhoto = () => {
    setProfilePhotoFile(null);
    setProfilePhotoUrl('');
  };

  const handleAddMediaFiles = (
    files,
    defaultCategory = 'Polaroid / Snap',
    setAsProfile = false
  ) => {
    const createdItems = files.map((file, idx) => {
      const objectUrl = URL.createObjectURL(file);
      createdObjectUrlsRef.current.push(objectUrl);
      return {
        id: `${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 7)}`,
        name: file.name,
        sizeKB: Math.round(file.size / 1024),
        mimeType: file.type,
        category: defaultCategory,
        previewUrl: objectUrl,
        file,
      };
    });

    setMediaItems((prev) => [...createdItems, ...prev]);

    if (setAsProfile && createdItems[0]) {
      setProfilePhotoFile(createdItems[0].file);
      setProfilePhotoUrl(createdItems[0].previewUrl);
    }
  };

  const handleRemoveMediaItem = (id) => {
    setMediaItems((prev) => {
      const target = prev.find((item) => item.id === id);
      const remaining = prev.filter((item) => item.id !== id);
      if (target?.previewUrl && target.previewUrl === profilePhotoUrl) {
        setProfilePhotoFile(null);
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

  const handleSetProfileFromGallery = (previewUrl) => {
    setProfilePhotoFile(null);
    setProfilePhotoUrl(previewUrl);
  };

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
        packageNotes:
          'Disponível para viagens internacionais (Passaporte UE e Visto Americano válidos).',
        relatedContacts: [
          {
            id: 1,
            relation: 'mother',
            name: 'Cláudia Valente',
            ddi: '+55',
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

    showToast({
      type: 'info',
      title: 'Dados de exemplo preenchidos!',
      subtitle:
        'Navegue pelas abas para conferir ou clique em SALVAR para gravar no Firebase.',
    });
  };

  const handleCreateTalent = async (e) => {
    if (e) e.preventDefault();
    if (isSaving) return;

    const stageName = formData.personal.stageName?.trim();
    const fullName = formData.personal.fullName?.trim();

    if (!stageName && !fullName) {
      setActiveTab('geral');
      showToast({
        type: 'error',
        title: 'Campos obrigatórios pendentes',
        subtitle:
          'Informe ao menos o Nome Artístico ou Nome Completo na aba Geral antes de salvar.',
      });
      return;
    }

    setIsSaving(true);
    try {
      const savedTalent = await createTalentWithMedia({
        formData,
        profilePhotoFile,
        profilePhotoPreviewUrl: profilePhotoUrl,
        mediaItems,
      });

      if (onTalentCreated) {
        onTalentCreated(savedTalent);
      }

      navigate('/talentos', {
        state: {
          toast: {
            type: 'success',
            title: 'Talento cadastrado com sucesso!',
            subtitle: `${
              stageName || fullName
            } foi salvo com fotos e informações completas.`,
          },
        },
      });
    } catch (error) {
      console.error('Erro ao salvar talento:', error);
      showToast(
        {
          type: 'error',
          title: 'Não foi possível salvar o talento',
          subtitle:
            error?.message ||
            'Verifique sua conexão, as configurações do Cloudinary e as permissões do Firestore.',
        },
        7000
      );
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#161617] text-white pb-24">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-5 space-y-5">
        {/* Toast Flutuante */}
        {toastMessage && (
          <div
            className={`fixed top-20 right-6 z-50 max-w-md bg-[#1c1c1e] text-white px-4 py-3.5 rounded-xl shadow-2xl border border-white/10 border-l-4 ${
              toastMessage.type === 'error'
                ? 'border-l-red-500'
                : 'border-l-[#E8AC51]'
            } flex items-start gap-3 animate-content-fade`}
          >
            {toastMessage.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-[#E8AC51] shrink-0 mt-0.5" />
            )}
            <div className="flex-1 text-xs">
              <p className="font-semibold text-white">{toastMessage.title}</p>
              <p className="text-neutral-400 mt-0.5 leading-relaxed">
                {toastMessage.subtitle}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Linha 1: Voltar + Breadcrumbs */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => (onBackToList ? onBackToList() : navigate('/talentos'))}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1c1c1e] hover:bg-white/5 text-neutral-300 border border-white/10 rounded-full text-xs font-medium transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar para listagem</span>
          </button>

          <nav className="text-xs text-neutral-400 flex items-center gap-1.5">
            <Link to="/dashboard" className="text-[#E8AC51] hover:underline">
              Início
            </Link>
            <span>&gt;</span>
            <Link to="/talentos" className="text-[#E8AC51] hover:underline">
              Talentos
            </Link>
            <span>&gt;</span>
            <strong className="text-neutral-200 font-medium">
              {formData.personal.stageName || 'Novo perfil'}
            </strong>
          </nav>
        </div>

        {/* Linha 2: Header Principal */}
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#1c1c1e] border border-[#E8AC51]/40 flex items-center justify-center text-[#E8AC51] shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div className="h-9 w-px bg-white/10 hidden sm:block shrink-0" />
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-[#E8AC51]">
                Cadastro de Talento
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
                Crie um novo perfil de talento na base da agência.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsInfosheetModalOpen(true)}
              className="px-4 py-2.5 bg-[#E8AC51] hover:bg-[#d99b3f] text-[#161617] text-[11px] font-bold uppercase tracking-wider rounded-xl shadow-md inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>ENVIAR FICHA ONLINE</span>
            </button>

            <button
              type="button"
              onClick={handleFillDemoData}
              className="px-4 py-2.5 bg-[#1c1c1e] hover:bg-[#E8AC51]/10 text-[#E8AC51] border border-[#E8AC51]/50 text-[11px] font-semibold uppercase tracking-wider rounded-xl inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>PREENCHER DADOS DE TESTE</span>
            </button>
          </div>
        </header>

        {/* Formulário + Barra de 6 Abas */}
        <form id="add-talent-form" onSubmit={handleCreateTalent} className="space-y-5">
          <div className="bg-[#1c1c1e] border border-white/10 rounded-xl p-1 flex items-center gap-1 overflow-x-auto whitespace-nowrap">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 rounded-lg inline-flex items-center gap-2 text-xs font-medium transition-colors cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-[#880E1B] text-white font-semibold shadow-sm'
                      : 'text-neutral-400 hover:text-white hover:bg-white/[0.03]'
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      isActive ? 'text-white' : 'text-neutral-400'
                    }`}
                  />
                  <span>{tab.label}</span>
                  {tab.id === 'midia' && mediaItems.length > 0 && (
                    <span
                      className={`ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                        isActive
                          ? 'bg-[#161617]/50 text-[#E8AC51]'
                          : 'bg-[#880E1B] text-white'
                      }`}
                    >
                      {mediaItems.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Conteúdo da Aba Selecionada */}
          <div>
            {activeTab === 'geral' && (
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
                <div className="xl:col-span-3">
                  <MediaUploadForm
                    compact={true}
                    mediaItems={mediaItems}
                    profilePhotoUrl={profilePhotoUrl}
                    onSelectProfileFile={handleSelectProfileFile}
                    onClearProfilePhoto={handleClearProfilePhoto}
                    onAddMediaFiles={handleAddMediaFiles}
                    onRemoveMediaItem={handleRemoveMediaItem}
                    onUpdateMediaCategory={handleUpdateMediaCategory}
                    onSetProfilePhoto={handleSetProfileFromGallery}
                    onOpenCompoMake={() => setIsCompoMakeModalOpen(true)}
                  />
                </div>

                <div className="xl:col-span-5">
                  <PersonalInfoForm
                    formData={formData}
                    onNestedChange={handleNestedChange}
                  />
                </div>

                <div className="xl:col-span-4">
                  <MeasurementsForm
                    formData={formData}
                    onNestedChange={handleNestedChange}
                  />
                </div>
              </div>
            )}

            {activeTab === 'midia' && (
              <MediaUploadForm
                compact={false}
                mediaItems={mediaItems}
                profilePhotoUrl={profilePhotoUrl}
                onSelectProfileFile={handleSelectProfileFile}
                onClearProfilePhoto={handleClearProfilePhoto}
                onAddMediaFiles={handleAddMediaFiles}
                onRemoveMediaItem={handleRemoveMediaItem}
                onUpdateMediaCategory={handleUpdateMediaCategory}
                onSetProfilePhoto={handleSetProfileFromGallery}
                onOpenCompoMake={() => setIsCompoMakeModalOpen(true)}
              />
            )}

            {activeTab === 'habilidades' && (
              <SkillsAndCareerForm
                mode="skills"
                formData={formData}
                onNestedChange={handleNestedChange}
              />
            )}

            {activeTab === 'carreira' && (
              <SkillsAndCareerForm
                mode="career"
                formData={formData}
                onNestedChange={handleNestedChange}
              />
            )}

            {activeTab === 'admin' && (
              <AdminAndBankForm
                mode="admin"
                formData={formData}
                onNestedChange={handleNestedChange}
              />
            )}

            {activeTab === 'bancos' && (
              <AdminAndBankForm
                mode="bank"
                formData={formData}
                onNestedChange={handleNestedChange}
              />
            )}
          </div>
        </form>
      </div>

      {/* Barra Fixa Inferior: CANCELAR | SALVAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#161617]/95 backdrop-blur-md border-t border-white/10">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-3 flex items-center justify-end gap-3">
          <button
            type="button"
            disabled={isSaving}
            onClick={() => (onBackToList ? onBackToList() : navigate('/talentos'))}
            className="px-5 py-2 bg-[#1c1c1e] hover:bg-white/5 text-neutral-300 border border-white/10 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            CANCELAR
          </button>

          <button
            type="submit"
            form="add-talent-form"
            disabled={isSaving}
            className="px-6 py-2 bg-[#880E1B] hover:bg-[#a31121] active:scale-[0.99] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-md inline-flex items-center gap-2 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>SALVANDO...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>SALVAR</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Modal Enviar Ficha Online */}
      <OnlineInfosheetModal
        isOpen={isInfosheetModalOpen}
        onClose={() => setIsInfosheetModalOpen(false)}
        initialName={formData.personal.stageName || formData.personal.fullName}
        initialEmail={formData.personal.email}
        onSendSuccess={(recipient) => {
          showToast({
            type: 'success',
            title: 'Ficha Online enviada!',
            subtitle: `Solicitação de preenchimento enviada para ${recipient}.`,
          });
        }}
      />

      {/* Modal CompoMake */}
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
