import React from 'react';
import {
  Plus,
  Trash2,
  Mail,
  Phone,
  Globe,
  UserPlus,
  Instagram,
  Youtube,
  Facebook,
  MessageCircle,
} from 'lucide-react';
import {
  OFFICE_OPTIONS,
  STATUS_OPTIONS,
  CATEGORY_OPTIONS,
  TAG_OPTIONS,
  GENDER_OPTIONS,
  GENDER_IDENTITY_OPTIONS,
  PRONOUN_OPTIONS,
  NATIONALITY_OPTIONS,
  STATE_OPTIONS,
  ETHNICITY_OPTIONS,
  LANGUAGE_OPTIONS,
  LANGUAGE_LEVEL_OPTIONS,
  CONTACT_RELATION_OPTIONS,
} from '../../data/talentFormOptions';

export default function PersonalInfoForm({ formData, onChange, onNestedChange }) {
  const { personal } = formData;

  const handleField = (field, value) => {
    onNestedChange('personal', field, value);
  };

  const toggleCategory = (catValue) => {
    const exists = personal.categories.includes(catValue);
    const updated = exists
      ? personal.categories.filter((c) => c !== catValue)
      : [...personal.categories, catValue];
    handleField('categories', updated);
  };

  // Manipuladores de listas dinâmicas (Idiomas, E-mails Alternativos, Telefones, Contatos Relacionados)
  const addLanguage = () => {
    handleField('languages', [
      ...personal.languages,
      { id: Date.now(), language: 'EN', level: 'intermediary' },
    ]);
  };

  const updateLanguage = (id, key, value) => {
    handleField(
      'languages',
      personal.languages.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      )
    );
  };

  const removeLanguage = (id) => {
    handleField(
      'languages',
      personal.languages.filter((item) => item.id !== id)
    );
  };

  const addAltEmail = () => {
    handleField('altEmails', [
      ...personal.altEmails,
      { id: Date.now(), email: '', label: '' },
    ]);
  };

  const updateAltEmail = (id, key, value) => {
    handleField(
      'altEmails',
      personal.altEmails.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      )
    );
  };

  const removeAltEmail = (id) => {
    handleField(
      'altEmails',
      personal.altEmails.filter((item) => item.id !== id)
    );
  };

  const addPhone = () => {
    handleField('phones', [
      ...personal.phones,
      { id: Date.now(), type: 'Celular', ddi: '+55', number: '', notes: '' },
    ]);
  };

  const updatePhone = (id, key, value) => {
    handleField(
      'phones',
      personal.phones.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      )
    );
  };

  const removePhone = (id) => {
    handleField(
      'phones',
      personal.phones.filter((item) => item.id !== id)
    );
  };

  const addEmergencyContact = () => {
    handleField('relatedContacts', [
      ...personal.relatedContacts,
      { id: Date.now(), relation: 'mother', name: '', phone: '' },
    ]);
  };

  const updateEmergencyContact = (id, key, value) => {
    handleField(
      'relatedContacts',
      personal.relatedContacts.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      )
    );
  };

  const removeEmergencyContact = (id) => {
    handleField(
      'relatedContacts',
      personal.relatedContacts.filter((item) => item.id !== id)
    );
  };

  const handleSocialChange = (network, value) => {
    handleField('socials', {
      ...personal.socials,
      [network]: value,
    });
  };

  return (
    <div className="space-y-6">
      {/* Seção: Info Básica */}
      <div className="bg-white border border-slate-200 rounded-md p-5 shadow-2xs">
        <h3 className="text-sm font-bold text-slate-800 pb-2.5 mb-4 border-b border-slate-200">
          Info básica
        </h3>

        <div className="space-y-3.5">
          {/* Unidade */}
          <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2">
            <label className="sm:col-span-4 text-xs font-medium text-slate-600">
              Unidade
            </label>
            <div className="sm:col-span-8">
              <select
                value={personal.office}
                onChange={(e) => handleField('office', e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
              >
                {OFFICE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Categorias (Chips selecionáveis fiéis à ficha do ManagerFashion) */}
          <div className="grid grid-cols-1 sm:grid-cols-12 items-start gap-2">
            <label className="sm:col-span-4 text-xs font-medium text-slate-600 pt-1">
              Categorias
            </label>
            <div className="sm:col-span-8 flex flex-wrap gap-1.5">
              {CATEGORY_OPTIONS.map((cat) => {
                const active = personal.categories.includes(cat.value);
                return (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => toggleCategory(cat.value)}
                    className={`px-2.5 py-1 rounded-xs text-xs font-medium border transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#0077b5] text-white border-[#0077b5]'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Etiquetas */}
          <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2">
            <label className="sm:col-span-4 text-xs font-medium text-slate-600">
              Etiquetas
            </label>
            <div className="sm:col-span-8">
              <select
                value={personal.tag}
                onChange={(e) => handleField('tag', e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
              >
                <option value="">Selecione</option>
                {TAG_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Status */}
          <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2">
            <label className="sm:col-span-4 text-xs font-medium text-slate-600">
              Status
            </label>
            <div className="sm:col-span-8">
              <select
                value={personal.status}
                onChange={(e) => handleField('status', e.target.value)}
                className="w-full px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Gênero */}
          <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2">
            <label className="sm:col-span-4 text-xs font-medium text-slate-600">
              Gênero
            </label>
            <div className="sm:col-span-8 flex flex-wrap items-center gap-4">
              {GENDER_OPTIONS.map((g) => (
                <label
                  key={g.value}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="gender"
                    value={g.value}
                    checked={personal.gender === g.value}
                    onChange={(e) => handleField('gender', e.target.value)}
                    className="accent-[#0077b5] cursor-pointer"
                  />
                  <span>{g.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Identidade De Gênero & Pronome */}
          <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2">
            <label className="sm:col-span-4 text-xs font-medium text-slate-600">
              Identidade De Gênero
            </label>
            <div className="sm:col-span-8">
              <select
                value={personal.genderIdentity}
                onChange={(e) => handleField('genderIdentity', e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
              >
                <option value="">Selecione</option>
                {GENDER_IDENTITY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2">
            <label className="sm:col-span-4 text-xs font-medium text-slate-600">
              Pronome
            </label>
            <div className="sm:col-span-8">
              <select
                value={personal.pronoun}
                onChange={(e) => handleField('pronoun', e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
              >
                <option value="">Selecione</option>
                {PRONOUN_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Nome Artístico */}
          <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2">
            <label className="sm:col-span-4 text-xs font-medium text-slate-600">
              Nome Artístico <span className="text-red-500">*</span>
            </label>
            <div className="sm:col-span-8">
              <input
                type="text"
                value={personal.stageName}
                onChange={(e) => handleField('stageName', e.target.value)}
                placeholder="Nome Artístico (ex: Sophia Évora)"
                className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
              />
            </div>
          </div>

          {/* Nome Completo */}
          <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2">
            <label className="sm:col-span-4 text-xs font-medium text-slate-600">
              Nome Completo <span className="text-red-500">*</span>
            </label>
            <div className="sm:col-span-8">
              <input
                type="text"
                value={personal.fullName}
                onChange={(e) => handleField('fullName', e.target.value)}
                placeholder="Nome Completo Civil"
                className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
              />
            </div>
          </div>

          {/* Data de Nascimento (Dia / Mês / Ano) */}
          <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2">
            <label className="sm:col-span-4 text-xs font-medium text-slate-600">
              Data De Nascimento
            </label>
            <div className="sm:col-span-8 grid grid-cols-3 gap-2">
              <select
                value={personal.birthDay}
                onChange={(e) => handleField('birthDay', e.target.value)}
                className="px-2 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
              >
                <option value="">Dia</option>
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={String(d).padStart(2, '0')}>
                    {String(d).padStart(2, '0')}
                  </option>
                ))}
              </select>

              <select
                value={personal.birthMonth}
                onChange={(e) => handleField('birthMonth', e.target.value)}
                className="px-2 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
              >
                <option value="">Mês</option>
                {[
                  '01 - Jan',
                  '02 - Fev',
                  '03 - Mar',
                  '04 - Abr',
                  '05 - Mai',
                  '06 - Jun',
                  '07 - Jul',
                  '08 - Ago',
                  '09 - Set',
                  '10 - Out',
                  '11 - Nov',
                  '12 - Dez',
                ].map((m, i) => (
                  <option key={m} value={String(i + 1).padStart(2, '0')}>
                    {m}
                  </option>
                ))}
              </select>

              <select
                value={personal.birthYear}
                onChange={(e) => handleField('birthYear', e.target.value)}
                className="px-2 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
              >
                <option value="">Ano</option>
                {Array.from({ length: 70 }, (_, i) => 2024 - i).map((y) => (
                  <option key={y} value={String(y)}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Etnia */}
          <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2">
            <label className="sm:col-span-4 text-xs font-medium text-slate-600">
              Etnia
            </label>
            <div className="sm:col-span-8">
              <select
                value={personal.ethnicity}
                onChange={(e) => handleField('ethnicity', e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
              >
                <option value="">Selecione</option>
                {ETHNICITY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Nacionalidade & Cidade de Nascimento */}
          <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2">
            <label className="sm:col-span-4 text-xs font-medium text-slate-600">
              Nacionalidade
            </label>
            <div className="sm:col-span-8">
              <select
                value={personal.nationality}
                onChange={(e) => handleField('nationality', e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
              >
                <option value="">Selecione</option>
                {NATIONALITY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2">
            <label className="sm:col-span-4 text-xs font-medium text-slate-600">
              Cidade De Nascimento
            </label>
            <div className="sm:col-span-8">
              <input
                type="text"
                value={personal.birthCity}
                onChange={(e) => handleField('birthCity', e.target.value)}
                placeholder="Ex: São Paulo - SP"
                className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
              />
            </div>
          </div>

          {/* Idiomas (Dinâmico com botão +) */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-700">
                Idiomas
              </label>
              <button
                type="button"
                onClick={addLanguage}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#0077b5] hover:bg-[#006399] text-white text-[11px] font-medium rounded-full transition-colors cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Adicionar</span>
              </button>
            </div>

            <div className="space-y-2">
              {personal.languages.map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <select
                    value={item.language}
                    onChange={(e) =>
                      updateLanguage(item.id, 'language', e.target.value)
                    }
                    className="flex-1 px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
                  >
                    <option value="">Idioma</option>
                    {LANGUAGE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>

                  <select
                    value={item.level}
                    onChange={(e) =>
                      updateLanguage(item.id, 'level', e.target.value)
                    }
                    className="flex-1 px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
                  >
                    <option value="">Nível</option>
                    {LANGUAGE_LEVEL_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>

                  {personal.languages.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLanguage(item.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                      title="Remover idioma"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Seção: Residência & Endereço */}
      <div className="bg-white border border-slate-200 rounded-md p-5 shadow-2xs">
        <h3 className="text-sm font-bold text-slate-800 pb-2.5 mb-4 border-b border-slate-200">
          Residência e Endereço
        </h3>

        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1">
                País
              </label>
              <select
                value={personal.country}
                onChange={(e) => handleField('country', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
              >
                {NATIONALITY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1">
                Estado
              </label>
              <select
                value={personal.state}
                onChange={(e) => handleField('state', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
              >
                <option value="">Estado</option>
                {STATE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1">
                Cidade
              </label>
              <input
                type="text"
                value={personal.city}
                onChange={(e) => handleField('city', e.target.value)}
                placeholder="Cidade"
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">
              Endereço Atual (Complemento / Referência)
            </label>
            <textarea
              rows={2}
              value={personal.currentAddress}
              onChange={(e) => handleField('currentAddress', e.target.value)}
              placeholder="Endereço Atual"
              className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
            <div className="sm:col-span-6">
              <input
                type="text"
                value={personal.street}
                onChange={(e) => handleField('street', e.target.value)}
                placeholder="Rua / Logradouro"
                className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
              />
            </div>
            <div className="sm:col-span-2">
              <input
                type="text"
                value={personal.streetNumber}
                onChange={(e) => handleField('streetNumber', e.target.value)}
                placeholder="Número"
                className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
              />
            </div>
            <div className="sm:col-span-4">
              <input
                type="text"
                value={personal.neighborhood}
                onChange={(e) => handleField('neighborhood', e.target.value)}
                placeholder="Bairro"
                className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
              />
            </div>
          </div>

          <div className="w-full sm:w-1/2">
            <input
              type="text"
              value={personal.zipCode}
              onChange={(e) => handleField('zipCode', e.target.value)}
              placeholder="CEP (00000-000)"
              className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
            />
          </div>
        </div>
      </div>

      {/* Seção: E-mails, Telefones e Redes Sociais */}
      <div className="bg-white border border-slate-200 rounded-md p-5 shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-slate-800 pb-2.5 border-b border-slate-200">
          Comunicação & Redes Sociais
        </h3>

        {/* Email Principal */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Email Principal
          </label>
          <div className="flex items-center border border-slate-300 rounded-xs overflow-hidden focus-within:border-[#0077b5]">
            <span className="px-2.5 py-1.5 bg-slate-100 border-r border-slate-300 text-slate-500">
              <Mail className="w-3.5 h-3.5" />
            </span>
            <input
              type="email"
              value={personal.email}
              onChange={(e) => handleField('email', e.target.value)}
              placeholder="talento@email.com"
              className="w-full px-3 py-1.5 text-xs outline-none"
            />
          </div>
        </div>

        {/* Emails Alternativos */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-medium text-slate-600">
              Emails Alternativos
            </label>
            <button
              type="button"
              onClick={addAltEmail}
              className="w-5 h-5 rounded-full bg-[#0077b5] text-white flex items-center justify-center hover:bg-[#006399] cursor-pointer"
              title="Adicionar Email Alternativo"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-2">
            {personal.altEmails.map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <input
                  type="email"
                  value={item.email}
                  onChange={(e) =>
                    updateAltEmail(item.id, 'email', e.target.value)
                  }
                  placeholder="Email"
                  className="flex-1 px-2.5 py-1.5 text-xs border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
                />
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) =>
                    updateAltEmail(item.id, 'label', e.target.value)
                  }
                  placeholder="Etiqueta (ex: Assessoria)"
                  className="w-36 px-2.5 py-1.5 text-xs border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
                />
                {personal.altEmails.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeAltEmail(item.id)}
                    className="text-slate-400 hover:text-red-500 p-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Telefones */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-medium text-slate-600">
              Telefones
            </label>
            <button
              type="button"
              onClick={addPhone}
              className="w-5 h-5 rounded-full bg-[#0077b5] text-white flex items-center justify-center hover:bg-[#006399] cursor-pointer"
              title="Adicionar Telefone"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-2">
            {personal.phones.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 items-center gap-1.5"
              >
                <select
                  value={item.type}
                  onChange={(e) =>
                    updatePhone(item.id, 'type', e.target.value)
                  }
                  className="col-span-3 px-2 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
                >
                  <option value="Celular">Celular</option>
                  <option value="Fixo">Fixo</option>
                  <option value="WhatsApp">WhatsApp</option>
                </select>
                <span className="col-span-2 px-2 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xs text-center font-medium">
                  🇧🇷 {item.ddi}
                </span>
                <input
                  type="tel"
                  value={item.number}
                  onChange={(e) =>
                    updatePhone(item.id, 'number', e.target.value)
                  }
                  placeholder="(11) 99999-9999"
                  className="col-span-4 px-2.5 py-1.5 text-xs border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
                />
                <input
                  type="text"
                  value={item.notes}
                  onChange={(e) =>
                    updatePhone(item.id, 'notes', e.target.value)
                  }
                  placeholder="Notas"
                  className="col-span-2 px-2 py-1.5 text-xs border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
                />
                {personal.phones.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePhone(item.id)}
                    className="col-span-1 text-slate-400 hover:text-red-500 flex justify-center cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Redes Sociais e Models.com */}
        <div className="pt-2 border-t border-slate-100 space-y-2.5">
          <label className="block text-xs font-medium text-slate-600">
            Redes Sociais & Portfólios Externos
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="flex items-center border border-slate-300 rounded-xs overflow-hidden">
              <span className="px-2.5 py-1.5 bg-slate-50 border-r border-slate-300 text-pink-600">
                <Instagram className="w-3.5 h-3.5" />
              </span>
              <input
                type="text"
                value={personal.socials.instagram}
                onChange={(e) => handleSocialChange('instagram', e.target.value)}
                placeholder="@usuario_instagram"
                className="w-full px-2.5 py-1.5 text-xs outline-none"
              />
            </div>

            <div className="flex items-center border border-slate-300 rounded-xs overflow-hidden">
              <span className="px-2.5 py-1.5 bg-slate-50 border-r border-slate-300 text-emerald-600">
                <MessageCircle className="w-3.5 h-3.5" />
              </span>
              <input
                type="text"
                value={personal.socials.tiktok}
                onChange={(e) => handleSocialChange('tiktok', e.target.value)}
                placeholder="@usuario_tiktok"
                className="w-full px-2.5 py-1.5 text-xs outline-none"
              />
            </div>

            <div className="flex items-center border border-slate-300 rounded-xs overflow-hidden">
              <span className="px-2.5 py-1.5 bg-slate-50 border-r border-slate-300 text-red-600">
                <Youtube className="w-3.5 h-3.5" />
              </span>
              <input
                type="text"
                value={personal.socials.youtube}
                onChange={(e) => handleSocialChange('youtube', e.target.value)}
                placeholder="Canal YouTube / Vimeo"
                className="w-full px-2.5 py-1.5 text-xs outline-none"
              />
            </div>

            <div className="flex items-center border border-slate-300 rounded-xs overflow-hidden">
              <span className="px-2.5 py-1.5 bg-slate-50 border-r border-slate-300 text-[#0077b5]">
                <Globe className="w-3.5 h-3.5" />
              </span>
              <input
                type="text"
                value={personal.socials.modelsDotCom}
                onChange={(e) =>
                  handleSocialChange('modelsDotCom', e.target.value)
                }
                placeholder="Models.Com (Conta / URL)"
                className="w-full px-2.5 py-1.5 text-xs outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Notas Pacotes
            </label>
            <textarea
              rows={2}
              value={personal.packageNotes}
              onChange={(e) => handleField('packageNotes', e.target.value)}
              placeholder="Observações visíveis nos envios de pacotes / castings..."
              className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
            />
          </div>
        </div>
      </div>

      {/* Seção: Contatos de Emergência / Relacionados (visível na coluna esquerda da Imagem 03) */}
      <div className="bg-white border border-slate-200 rounded-md p-5 shadow-2xs">
        <div className="flex items-center justify-between pb-2.5 mb-4 border-b border-slate-200">
          <h3 className="text-sm font-bold text-slate-800">Contatos</h3>
          <button
            type="button"
            onClick={addEmergencyContact}
            className="px-2.5 py-1 bg-[#0077b5] hover:bg-[#006399] text-white text-[10px] font-semibold uppercase tracking-wider rounded-xs flex items-center gap-1 transition-colors cursor-pointer"
          >
            <UserPlus className="w-3 h-3" />
            <span>+ ADICIONAR CONTATOS</span>
          </button>
        </div>

        <div className="space-y-4">
          {personal.relatedContacts.map((contact, idx) => (
            <div
              key={contact.id}
              className="p-3 bg-slate-50/70 rounded-xs border border-slate-200/80 space-y-2.5 relative"
            >
              {personal.relatedContacts.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEmergencyContact(contact.id)}
                  className="absolute top-2 right-2 text-slate-400 hover:text-red-500 cursor-pointer"
                  title="Remover contato"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2">
                <label className="sm:col-span-3 text-xs text-slate-600">
                  Relação
                </label>
                <div className="sm:col-span-9">
                  <select
                    value={contact.relation}
                    onChange={(e) =>
                      updateEmergencyContact(
                        contact.id,
                        'relation',
                        e.target.value
                      )
                    }
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
                  >
                    <option value="">Selecione</option>
                    {CONTACT_RELATION_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2">
                <label className="sm:col-span-3 text-xs text-slate-600">
                  Nome
                </label>
                <div className="sm:col-span-9">
                  <input
                    type="text"
                    value={contact.name}
                    onChange={(e) =>
                      updateEmergencyContact(contact.id, 'name', e.target.value)
                    }
                    placeholder="Nome"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2">
                <label className="sm:col-span-3 text-xs text-slate-600">
                  Telefone
                </label>
                <div className="sm:col-span-9">
                  <input
                    type="tel"
                    value={contact.phone}
                    onChange={(e) =>
                      updateEmergencyContact(
                        contact.id,
                        'phone',
                        e.target.value
                      )
                    }
                    placeholder="Telefone"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

