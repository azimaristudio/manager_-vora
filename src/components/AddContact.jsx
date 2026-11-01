import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  Plus,
  Building2,
  User,
  Star,
  FolderOpen,
  ChevronDown,
  ChevronRight,
  Trash2,
  MessageCircle,
  Facebook,
  Globe,
  Twitter,
  Instagram,
  Share2,
} from 'lucide-react';

export default function AddContact({ onSaveContact, onDeleteContact }) {
  const location = useLocation();
  const navigate = useNavigate();
  const logoInputRef = useRef(null);

  const initialGroup = location.state?.contactGroup || 'fornecedores'; // 'clientes' | 'fornecedores' | 'outros'
  const contactToEdit = location.state?.contactToEdit || null;

  const [contactGroup, setContactGroup] = useState(initialGroup);
  const [entityType, setEntityType] = useState(
    contactToEdit?.entityType || 'company'
  ); // 'company' | 'person'

  // Coluna 1: Info básica
  const [status, setStatus] = useState('Ativo'); // 'Stand By' | 'Inativo' | 'Ativo'
  const [name, setName] = useState(contactToEdit?.name || '');
  const [category, setCategory] = useState(
    contactToEdit?.category || 'Agencia'
  );
  const [booker, setBooker] = useState(contactToEdit?.booker || '');
  const [country, setCountry] = useState('Brasil');
  const [city, setCity] = useState('Recife');
  const [rating, setRating] = useState(contactToEdit?.rating || 0);
  const [reputation, setReputation] = useState('');
  const [reputationNotes, setReputationNotes] = useState('');
  const [interest, setInterest] = useState('Todos');
  const [genderInterest, setGenderInterest] = useState('Masculino/Feminino');
  const [notes, setNotes] = useState('');
  const [logoPreviewUrl, setLogoPreviewUrl] = useState(null);

  // Coluna 2: Info de contato + Accordions (Info de faturamento & Conta Bancária)
  const [address, setAddress] = useState('');
  const [phones, setPhones] = useState([
    { id: 1, country: 'Brasil (+55)', number: '' },
  ]);
  const [faxCountry, setFaxCountry] = useState('');
  const [faxNumber, setFaxNumber] = useState('');
  const [website, setWebsite] = useState('');
  const [activeSocialInput, setActiveSocialInput] = useState(null);
  const [socials, setSocials] = useState({
    whatsapp: '',
    facebook: '',
    google: '',
    skype: '',
    twitter: '',
    instagram: '',
  });

  const [isBillingOpen, setIsBillingOpen] = useState(false);
  const [billingItems, setBillingItems] = useState([]);

  const [isBankOpen, setIsBankOpen] = useState(false);
  const [bankItems, setBankItems] = useState([]);

  // Coluna 3: Staff
  const [staffMembers, setStaffMembers] = useState([]);

  // Limpa URL do logo ao desmontar
  useEffect(() => {
    return () => {
      if (logoPreviewUrl) {
        URL.revokeObjectURL(logoPreviewUrl);
      }
    };
  }, [logoPreviewUrl]);

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (logoPreviewUrl) {
      URL.revokeObjectURL(logoPreviewUrl);
    }
    setLogoPreviewUrl(URL.createObjectURL(file));
    e.target.value = '';
  };

  // Telefones dinâmicos
  const addPhoneRow = () => {
    setPhones((prev) => [
      ...prev,
      { id: Date.now(), country: 'Brasil (+55)', number: '' },
    ]);
  };

  const updatePhoneRow = (id, key, val) => {
    setPhones((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [key]: val } : p))
    );
  };

  // Info de faturamento dinâmica
  const handleAddBilling = () => {
    setIsBillingOpen(true);
    setBillingItems((prev) => [
      ...prev,
      { id: Date.now(), companyName: '', taxId: '', billingEmail: '' },
    ]);
  };

  // Conta Bancária dinâmica
  const handleAddBank = () => {
    setIsBankOpen(true);
    setBankItems((prev) => [
      ...prev,
      { id: Date.now(), bankName: '', branch: '', accountNumber: '' },
    ]);
  };

  // Staff dinâmico
  const handleAddStaffMember = () => {
    setStaffMembers((prev) => [
      ...prev,
      { id: Date.now(), memberName: '', role: 'Booker / Produtor', email: '' },
    ]);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newContact = {
      id: contactToEdit?.id || `contact_${Date.now()}`,
      group: contactGroup,
      entityType,
      statusLabel: status,
      name: name.trim() || 'Novo Contato',
      category: category || 'Agencia',
      location: `${city || 'Recife'}, ${
        country === 'Brasil' ? 'Brazil' : country
      }`,
      booker,
      rating,
      reputation,
      reputationNotes,
      interest,
      genderInterest,
      notes,
      address,
      phones,
      website,
      socials,
      billingItems,
      bankItems,
      staffMembers,
    };

    console.log('✅ [AddContact] Contato salvo com sucesso:', newContact);

    if (onSaveContact) {
      onSaveContact(contactGroup, newContact);
    }

    navigate('/contatos');
  };

  const handleDelete = () => {
    console.log('🗑️ [AddContact] Contato excluído.');
    if (contactToEdit?.id && onDeleteContact) {
      onDeleteContact(contactGroup, contactToEdit.id);
    }
    navigate('/contatos');
  };

  const profileTitle =
    contactGroup === 'clientes' ? 'Perfil do Cliente:' : 'Perfil do Provedor:';

  return (
    <div className="w-full pb-20 select-none">
      {/* 1. Sub-Cabeçalho: Breadcrumb "Início > Contatos > Novo perfil" + Busca */}
      <div className="w-full bg-[#f8f9fa] border border-slate-200/90 rounded-xs px-4 py-2.5 mb-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link
            to="/"
            className="text-[#0077b5] hover:underline font-normal cursor-pointer"
          >
            Início
          </Link>
          <span>&gt;</span>
          <Link
            to="/contatos"
            className="text-[#0077b5] hover:underline font-normal cursor-pointer"
          >
            Contatos
          </Link>
          <span>&gt;</span>
          <span className="text-slate-500">Novo perfil</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white border border-slate-200 rounded-xs overflow-hidden w-full sm:w-64">
            <span className="px-2.5 py-1.5 bg-slate-100 border-r border-slate-200 text-slate-500">
              <Search className="w-3.5 h-3.5" />
            </span>
            <input
              type="text"
              placeholder="Buscar um contato"
              className="w-full px-2.5 py-1 text-xs text-slate-700 placeholder:text-slate-400 outline-none"
            />
          </div>
          <button
            type="button"
            className="px-2.5 py-1.5 bg-[#0077b5] text-white rounded-xs flex items-center justify-center"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

      <form onSubmit={handleSave}>
        {/* 2. Seletor de Tipo de Perfil: "Perfil do Cliente:" / "Perfil do Provedor:" + Empresa / Pessoa */}
        <div className="border-y border-slate-200 py-4 mb-8 flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-8 sm:gap-14">
            <h2 className="text-base font-normal text-slate-500">
              {profileTitle}
            </h2>

            {/* Radio: Empresa */}
            <label className="inline-flex items-center gap-2 text-xs text-[#0077b5] cursor-pointer">
              <input
                type="radio"
                name="entityType"
                value="company"
                checked={entityType === 'company'}
                onChange={() => setEntityType('company')}
                className="accent-[#0077b5] cursor-pointer"
              />
              <Building2 className="w-4 h-4 text-[#0077b5]" />
              <span>Empresa</span>
            </label>

            {/* Radio: Pessoa */}
            <label className="inline-flex items-center gap-2 text-xs text-[#0077b5] cursor-pointer">
              <input
                type="radio"
                name="entityType"
                value="person"
                checked={entityType === 'person'}
                onChange={() => setEntityType('person')}
                className="accent-[#0077b5] cursor-pointer"
              />
              <User className="w-4 h-4 text-[#0077b5]" />
              <span>Pessoa</span>
            </label>
          </div>

          {/* Alternador rápido entre Cliente (Img 17) e Provedor/Fornecedor (Img 18) */}
          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="text-slate-400">Tipo de cadastro:</span>
            <button
              type="button"
              onClick={() => setContactGroup('clientes')}
              className={`px-2 py-0.5 rounded-xs cursor-pointer ${
                contactGroup === 'clientes'
                  ? 'bg-[#0077b5] text-white font-semibold'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              Cliente (Img 17)
            </button>
            <button
              type="button"
              onClick={() => setContactGroup('fornecedores')}
              className={`px-2 py-0.5 rounded-xs cursor-pointer ${
                contactGroup === 'fornecedores'
                  ? 'bg-[#0077b5] text-white font-semibold'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              Provedor / Fornecedor (Img 18)
            </button>
          </div>
        </div>

        {/* 3. Layout Principal de Três Colunas (Info básica | Info de contato | Staff) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* ==================== COLUNA 1: Info básica ==================== */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 pb-2 mb-5 border-b border-slate-200">
              Info básica
            </h3>

            <div className="space-y-3.5">
              {/* Status * */}
              <div className="grid grid-cols-12 items-start gap-2">
                <label className="col-span-4 text-[11px] text-slate-600 pt-0.5">
                  Status <span className="text-red-500">*</span>
                </label>
                <div className="col-span-8 space-y-2">
                  <div className="flex items-center gap-6">
                    {['Stand By', 'Inativo'].map((st) => (
                      <label
                        key={st}
                        className="inline-flex items-center gap-1.5 text-[11px] text-[#0077b5] cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="contactStatus"
                          value={st}
                          checked={status === st}
                          onChange={(e) => setStatus(e.target.value)}
                          className="accent-[#0077b5] cursor-pointer"
                        />
                        <span>{st}</span>
                      </label>
                    ))}
                  </div>
                  <div>
                    <label className="inline-flex items-center gap-1.5 text-[11px] text-[#0077b5] cursor-pointer">
                      <input
                        type="radio"
                        name="contactStatus"
                        value="Ativo"
                        checked={status === 'Ativo'}
                        onChange={(e) => setStatus(e.target.value)}
                        className="accent-[#0077b5] cursor-pointer"
                      />
                      <span>Ativo</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Nome * */}
              <div className="grid grid-cols-12 items-center gap-2">
                <label className="col-span-4 text-[11px] text-slate-600">
                  Nome <span className="text-red-500">*</span>
                </label>
                <div className="col-span-8">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={
                      entityType === 'company'
                        ? 'Nome da empresa'
                        : 'Nome completo'
                    }
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs outline-none focus:border-[#0077b5]"
                  />
                </div>
              </div>

              {/* Categoria */}
              <div className="grid grid-cols-12 items-center gap-2">
                <label className="col-span-4 text-[11px] text-slate-600">
                  Categoria
                </label>
                <div className="col-span-8">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs outline-none focus:border-[#0077b5]"
                  >
                    <option value="">Selecione...</option>
                    <option value="Agencia">Agencia</option>
                    <option value="Produtora">Produtora</option>
                    <option value="Marca / Moda">Marca / Moda</option>
                    <option value="Publicidade">Agência de Publicidade</option>
                    <option value="Fotógrafo">Estúdio / Fotógrafo</option>
                  </select>
                </div>
              </div>

              {/* Booker */}
              <div className="grid grid-cols-12 items-center gap-2">
                <label className="col-span-4 text-[11px] text-slate-600">
                  Booker
                </label>
                <div className="col-span-8">
                  <select
                    value={booker}
                    onChange={(e) => setBooker(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-xs outline-none focus:border-[#0077b5]"
                  >
                    <option value="">Faça uma seleção</option>
                    <option value="Sophia Booker">Sophia Booker</option>
                    <option value="Equipe Évora">Equipe Évora</option>
                  </select>
                </div>
              </div>

              {/* País * */}
              <div className="grid grid-cols-12 items-center gap-2">
                <label className="col-span-4 text-[11px] text-slate-600">
                  País <span className="text-red-500">*</span>
                </label>
                <div className="col-span-8">
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-xs outline-none focus:border-[#0077b5]"
                  >
                    <option value="Brasil">Brasil</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Estados Unidos">Estados Unidos</option>
                    <option value="França">França</option>
                  </select>
                </div>
              </div>

              {/* Cidade * */}
              <div className="grid grid-cols-12 items-center gap-2">
                <label className="col-span-4 text-[11px] text-slate-600">
                  Cidade <span className="text-red-500">*</span>
                </label>
                <div className="col-span-8">
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-xs outline-none focus:border-[#0077b5]"
                  >
                    <option value="">Cidade</option>
                    <option value="Recife">Recife</option>
                    <option value="São Paulo">São Paulo</option>
                    <option value="Rio de Janeiro">Rio de Janeiro</option>
                    <option value="Belo Horizonte">Belo Horizonte</option>
                  </select>
                </div>
              </div>

              {/* Classificação (Estrelas + NO RATED) */}
              <div className="grid grid-cols-12 items-center gap-2">
                <label className="col-span-4 text-[11px] text-slate-600">
                  Classificação
                </label>
                <div className="col-span-8 flex items-center gap-1.5">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() =>
                          setRating((prev) => (prev === star ? 0 : star))
                        }
                        className="cursor-pointer"
                      >
                        <Star
                          className={`w-3.5 h-3.5 ${
                            star <= rating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-300 hover:text-amber-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 leading-none uppercase">
                    {rating === 0 ? (
                      <>
                        NO
                        <br />
                        RATED
                      </>
                    ) : (
                      `${rating}/5`
                    )}
                  </span>
                </div>
              </div>

              {/* Reputação */}
              <div className="grid grid-cols-12 items-center gap-2">
                <label className="col-span-4 text-[11px] text-slate-600">
                  Reputação
                </label>
                <div className="col-span-8">
                  <select
                    value={reputation}
                    onChange={(e) => setReputation(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-xs outline-none focus:border-[#0077b5]"
                  >
                    <option value="">Faça uma seleção</option>
                    <option value="Excelente">Excelente</option>
                    <option value="Boa">Boa</option>
                    <option value="Regular">Regular</option>
                    <option value="Atenção">Requer Atenção</option>
                  </select>
                </div>
              </div>

              {/* Notas sobre reputação */}
              <div className="grid grid-cols-12 items-start gap-2">
                <label className="col-span-4 text-[11px] text-slate-600 pt-1">
                  Notas sobre
                  <br />
                  reputação
                </label>
                <div className="col-span-8">
                  <textarea
                    rows={3}
                    value={reputationNotes}
                    onChange={(e) => setReputationNotes(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs outline-none focus:border-[#0077b5]"
                  />
                </div>
              </div>

              {/* Interesse */}
              <div className="grid grid-cols-12 items-center gap-2">
                <label className="col-span-4 text-[11px] text-slate-600">
                  Interesse
                </label>
                <div className="col-span-8">
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-xs outline-none focus:border-[#0077b5]"
                  >
                    <option value="Todos">Todos</option>
                    <option value="Fashion">Fashion / Passarela</option>
                    <option value="Comercial">Comercial / Publicidade</option>
                  </select>
                </div>
              </div>

              {/* Gênero */}
              <div className="grid grid-cols-12 items-center gap-2">
                <label className="col-span-4 text-[11px] text-slate-600">
                  Gênero
                </label>
                <div className="col-span-8">
                  <select
                    value={genderInterest}
                    onChange={(e) => setGenderInterest(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-xs outline-none focus:border-[#0077b5]"
                  >
                    <option value="Masculino/Feminino">
                      Masculino/Feminino
                    </option>
                    <option value="Feminino">Feminino</option>
                    <option value="Masculino">Masculino</option>
                  </select>
                </div>
              </div>

              {/* Notas */}
              <div className="grid grid-cols-12 items-start gap-2">
                <label className="col-span-4 text-[11px] text-slate-600 pt-1">
                  Notas
                </label>
                <div className="col-span-8">
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs outline-none focus:border-[#0077b5]"
                  />
                </div>
              </div>

              {/* Logo (Botão Verde BROWSE) */}
              <div className="grid grid-cols-12 items-center gap-2 pt-1">
                <label className="col-span-4 text-[11px] text-slate-600">
                  Logo
                </label>
                <div className="col-span-8 flex items-center gap-3">
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => logoInputRef.current?.click()}
                    className="px-3.5 py-2 bg-[#28a745] hover:bg-[#218838] text-white text-[11px] font-bold uppercase rounded-xs flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                  >
                    <FolderOpen className="w-3.5 h-3.5 fill-white" />
                    <span>BROWSE</span>
                  </button>

                  {logoPreviewUrl && (
                    <img
                      src={logoPreviewUrl}
                      alt="Logo Preview"
                      className="w-9 h-9 object-contain border border-slate-200 rounded-xs bg-white p-0.5"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ==================== COLUNA 2: Info de contato ==================== */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 pb-2 mb-5 border-b border-slate-200">
              Info de contato
            </h3>

            <div className="space-y-3.5">
              {/* Endereço */}
              <div className="grid grid-cols-12 items-start gap-2">
                <label className="col-span-3 text-[11px] text-slate-600 pt-1">
                  Endereço
                </label>
                <div className="col-span-9">
                  <textarea
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs outline-none focus:border-[#0077b5]"
                  />
                </div>
              </div>

              {/* Telefone (Com select de País + Número + Botão Azul "+") */}
              <div className="space-y-2">
                {phones.map((phone, idx) => (
                  <div
                    key={phone.id}
                    className="grid grid-cols-12 items-center gap-2"
                  >
                    <label className="col-span-3 text-[11px] text-slate-600">
                      {idx === 0 ? 'Telefone' : ''}
                    </label>
                    <div className="col-span-4">
                      <select
                        value={phone.country}
                        onChange={(e) =>
                          updatePhoneRow(phone.id, 'country', e.target.value)
                        }
                        className="w-full px-2 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-xs outline-none focus:border-[#0077b5]"
                      >
                        <option value="">País</option>
                        <option value="Brasil (+55)">Brasil (+55)</option>
                        <option value="Portugal (+351)">Portugal (+351)</option>
                        <option value="EUA (+1)">EUA (+1)</option>
                      </select>
                    </div>
                    <div className="col-span-4">
                      <input
                        type="tel"
                        value={phone.number}
                        onChange={(e) =>
                          updatePhoneRow(phone.id, 'number', e.target.value)
                        }
                        placeholder="Número"
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs outline-none focus:border-[#0077b5]"
                      />
                    </div>
                    <div className="col-span-1 flex justify-end">
                      {idx === 0 ? (
                        <button
                          type="button"
                          onClick={addPhoneRow}
                          title="Adicionar Telefone"
                          className="w-6 h-6 bg-[#0077b5] hover:bg-[#006399] text-white rounded-xs flex items-center justify-center cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            setPhones((prev) =>
                              prev.filter((item) => item.id !== phone.id)
                            )
                          }
                          className="text-slate-400 hover:text-red-500 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Fax */}
              <div className="grid grid-cols-12 items-center gap-2">
                <label className="col-span-3 text-[11px] text-slate-600">
                  Fax
                </label>
                <div className="col-span-4">
                  <select
                    value={faxCountry}
                    onChange={(e) => setFaxCountry(e.target.value)}
                    className="w-full px-2 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-xs outline-none focus:border-[#0077b5]"
                  >
                    <option value="">País</option>
                    <option value="Brasil (+55)">Brasil (+55)</option>
                  </select>
                </div>
                <div className="col-span-4">
                  <input
                    type="text"
                    value={faxNumber}
                    onChange={(e) => setFaxNumber(e.target.value)}
                    placeholder="Número"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs outline-none focus:border-[#0077b5]"
                  />
                </div>
              </div>

              {/* Website */}
              <div className="grid grid-cols-12 items-center gap-2">
                <label className="col-span-3 text-[11px] text-slate-600">
                  Website
                </label>
                <div className="col-span-9">
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs outline-none focus:border-[#0077b5]"
                  />
                </div>
              </div>

              {/* Social */}
              <div className="grid grid-cols-12 items-center gap-2 pt-1">
                <label className="col-span-3 text-[11px] text-slate-600">
                  Social
                </label>
                <div className="col-span-9 space-y-2">
                  <div className="flex items-center gap-2 text-[#0077b5]">
                    {[
                      { id: 'whatsapp', icon: MessageCircle, label: 'WhatsApp' },
                      { id: 'facebook', icon: Facebook, label: 'Facebook' },
                      { id: 'google', icon: Globe, label: 'Google / Web' },
                      { id: 'skype', icon: Share2, label: 'Skype' },
                      { id: 'twitter', icon: Twitter, label: 'Twitter / X' },
                      { id: 'instagram', icon: Instagram, label: 'Instagram' },
                    ].map((net) => {
                      const Icon = net.icon;
                      return (
                        <button
                          key={net.id}
                          type="button"
                          onClick={() =>
                            setActiveSocialInput((prev) =>
                              prev === net.id ? null : net.id
                            )
                          }
                          title={net.label}
                          className={`p-1 rounded-xs transition-colors cursor-pointer ${
                            activeSocialInput === net.id
                              ? 'bg-[#0077b5] text-white'
                              : 'hover:bg-sky-50 text-[#0077b5]'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </button>
                      );
                    })}
                  </div>

                  {activeSocialInput && (
                    <input
                      type="text"
                      value={socials[activeSocialInput] || ''}
                      onChange={(e) =>
                        setSocials((prev) => ({
                          ...prev,
                          [activeSocialInput]: e.target.value,
                        }))
                      }
                      placeholder={`Link / usuário para ${activeSocialInput}...`}
                      className="w-full px-2.5 py-1 text-xs bg-white border border-slate-300 rounded-xs outline-none focus:border-[#0077b5]"
                    />
                  )}
                </div>
              </div>

              {/* Bloco Expansível 1: Info de faturamento */}
              <div className="pt-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <button
                    type="button"
                    onClick={() => setIsBillingOpen((prev) => !prev)}
                    className="flex items-center gap-1.5 text-xs font-bold text-slate-800 cursor-pointer"
                  >
                    {isBillingOpen ? (
                      <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    )}
                    <span>Info de faturamento</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleAddBilling}
                    className="px-2.5 py-1 bg-[#28a745] hover:bg-[#218838] text-white text-[10px] font-bold uppercase rounded-xs flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3 h-3 stroke-[2.5]" />
                    <span>ADICIONAR NOVO</span>
                  </button>
                </div>

                {isBillingOpen && (
                  <div className="pt-3 space-y-2.5">
                    {billingItems.length === 0 ? (
                      <p className="text-[11px] text-slate-400">
                        Clique em &ldquo;+ ADICIONAR NOVO&rdquo; para inserir dados fiscais.
                      </p>
                    ) : (
                      billingItems.map((item) => (
                        <div
                          key={item.id}
                          className="p-3 bg-slate-50 border border-slate-200 rounded-xs space-y-2 relative"
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setBillingItems((prev) =>
                                prev.filter((b) => b.id !== item.id)
                              )
                            }
                            className="absolute top-2 right-2 text-slate-400 hover:text-red-500 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <input
                            type="text"
                            placeholder="Razão Social / Nome Fiscal"
                            value={item.companyName}
                            onChange={(e) =>
                              setBillingItems((prev) =>
                                prev.map((b) =>
                                  b.id === item.id
                                    ? { ...b, companyName: e.target.value }
                                    : b
                                )
                              )
                            }
                            className="w-full px-2.5 py-1 text-xs bg-white border border-slate-300 rounded-xs outline-none"
                          />
                          <input
                            type="text"
                            placeholder="CNPJ / CPF / Tax ID"
                            value={item.taxId}
                            onChange={(e) =>
                              setBillingItems((prev) =>
                                prev.map((b) =>
                                  b.id === item.id
                                    ? { ...b, taxId: e.target.value }
                                    : b
                                )
                              )
                            }
                            className="w-full px-2.5 py-1 text-xs bg-white border border-slate-300 rounded-xs outline-none"
                          />
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              {/* Bloco Expansível 2: Conta Bancária */}
              <div className="pt-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <button
                    type="button"
                    onClick={() => setIsBankOpen((prev) => !prev)}
                    className="flex items-center gap-1.5 text-xs font-bold text-slate-800 cursor-pointer"
                  >
                    {isBankOpen ? (
                      <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    )}
                    <span>Conta Bancária</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleAddBank}
                    className="px-2.5 py-1 bg-[#28a745] hover:bg-[#218838] text-white text-[10px] font-bold uppercase rounded-xs flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3 h-3 stroke-[2.5]" />
                    <span>ADICIONAR NOVO</span>
                  </button>
                </div>

                {isBankOpen && (
                  <div className="pt-3 space-y-2.5">
                    {bankItems.length === 0 ? (
                      <p className="text-[11px] text-slate-400">
                        Clique em &ldquo;+ ADICIONAR NOVO&rdquo; para inserir conta bancária.
                      </p>
                    ) : (
                      bankItems.map((item) => (
                        <div
                          key={item.id}
                          className="p-3 bg-slate-50 border border-slate-200 rounded-xs space-y-2 relative"
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setBankItems((prev) =>
                                prev.filter((b) => b.id !== item.id)
                              )
                            }
                            className="absolute top-2 right-2 text-slate-400 hover:text-red-500 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <input
                            type="text"
                            placeholder="Banco (ex: Itaú, Bradesco)"
                            value={item.bankName}
                            onChange={(e) =>
                              setBankItems((prev) =>
                                prev.map((b) =>
                                  b.id === item.id
                                    ? { ...b, bankName: e.target.value }
                                    : b
                                )
                              )
                            }
                            className="w-full px-2.5 py-1 text-xs bg-white border border-slate-300 rounded-xs outline-none"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              placeholder="Agência"
                              value={item.branch}
                              onChange={(e) =>
                                setBankItems((prev) =>
                                  prev.map((b) =>
                                    b.id === item.id
                                      ? { ...b, branch: e.target.value }
                                      : b
                                  )
                                )
                              }
                              className="w-full px-2.5 py-1 text-xs bg-white border border-slate-300 rounded-xs outline-none"
                            />
                            <input
                              type="text"
                              placeholder="Conta / PIX"
                              value={item.accountNumber}
                              onChange={(e) =>
                                setBankItems((prev) =>
                                  prev.map((b) =>
                                    b.id === item.id
                                      ? { ...b, accountNumber: e.target.value }
                                      : b
                                  )
                                )
                              }
                              className="w-full px-2.5 py-1 text-xs bg-white border border-slate-300 rounded-xs outline-none"
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ==================== COLUNA 3: Staff ==================== */}
          <div>
            <div className="flex items-center justify-between pb-2 mb-5 border-b border-slate-200">
              <h3 className="text-xs font-bold text-slate-800">Staff</h3>
              <button
                type="button"
                onClick={handleAddStaffMember}
                className="px-2.5 py-1 bg-[#28a745] hover:bg-[#218838] text-white text-[10px] font-bold uppercase rounded-xs flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Plus className="w-3 h-3 stroke-[2.5]" />
                <span>ADICIONAR MEMBRO</span>
              </button>
            </div>

            {staffMembers.length > 0 && (
              <div className="space-y-3">
                {staffMembers.map((member) => (
                  <div
                    key={member.id}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-xs space-y-2 relative"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setStaffMembers((prev) =>
                          prev.filter((m) => m.id !== member.id)
                        )
                      }
                      className="absolute top-2 right-2 text-slate-400 hover:text-red-500 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <input
                      type="text"
                      placeholder="Nome do Membro"
                      value={member.memberName}
                      onChange={(e) =>
                        setStaffMembers((prev) =>
                          prev.map((m) =>
                            m.id === member.id
                              ? { ...m, memberName: e.target.value }
                              : m
                          )
                        )
                      }
                      className="w-full px-2.5 py-1 text-xs bg-white border border-slate-300 rounded-xs outline-none"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Cargo"
                        value={member.role}
                        onChange={(e) =>
                          setStaffMembers((prev) =>
                            prev.map((m) =>
                              m.id === member.id
                                ? { ...m, role: e.target.value }
                                : m
                            )
                          )
                        }
                        className="w-full px-2.5 py-1 text-xs bg-white border border-slate-300 rounded-xs outline-none"
                      />
                      <input
                        type="email"
                        placeholder="E-mail"
                        value={member.email}
                        onChange={(e) =>
                          setStaffMembers((prev) =>
                            prev.map((m) =>
                              m.id === member.id
                                ? { ...m, email: e.target.value }
                                : m
                            )
                          )
                        }
                        className="w-full px-2.5 py-1 text-xs bg-white border border-slate-300 rounded-xs outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 4. Rodapé de Ações: EXCLUIR (vermelho à esquerda) | CANCELAR + SALVAR (à direita) */}
        <div className="mt-12 pt-4 border-t border-slate-200 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleDelete}
            className="px-3.5 py-2 bg-[#d9534f] hover:bg-[#c9302c] text-white text-[11px] font-semibold uppercase tracking-wider rounded-xs shadow-2xs transition-colors cursor-pointer"
          >
            EXCLUIR
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <button
              type="button"
              onClick={() => navigate('/contatos')}
              className="text-xs font-medium text-[#0077b5] hover:underline uppercase tracking-wider cursor-pointer"
            >
              CANCELAR
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-[#0077b5] hover:bg-[#006399] active:scale-[0.99] text-white text-[11px] font-semibold uppercase tracking-wider rounded-xs shadow-2xs transition-all cursor-pointer"
            >
              SALVAR
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

