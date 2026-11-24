import React, { useState, useRef, useEffect } from 'react';
import {
  Plus,
  Trash2,
  Mail,
  Globe,
  UserPlus,
  Instagram,
  Youtube,
  MessageCircle,
  ChevronDown,
  Search,
  Info,
  MapPin,
  Users,
  Contact,
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
  PHONE_COUNTRIES,
  getCountryByDdi,
  formatPhoneForCountry,
} from '../../data/talentFormOptions';

const INPUT_CLASS =
  'w-full px-3 py-1.5 text-xs bg-[#161617] text-white placeholder:text-neutral-500 border border-white/10 rounded-lg focus:border-[#E8AC51]/60 outline-none transition-colors';

function CountryCodeSelector({ value = '+55', onChange, className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef(null);

  const selectedCountry = getCountryByDdi(value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCountries = PHONE_COUNTRIES.filter((c) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.ddi.includes(q)
    );
  });

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => {
          setIsOpen((prev) => !prev);
          setSearch('');
        }}
        title={`${selectedCountry.name} (${selectedCountry.ddi})`}
        className="w-full px-2 py-1.5 text-xs bg-[#161617] hover:bg-white/5 border border-white/10 focus:border-[#E8AC51]/60 rounded-lg flex items-center justify-between gap-1 font-medium text-white cursor-pointer transition-colors"
      >
        <span className="truncate">
          {selectedCountry.flag} {selectedCountry.ddi}
        </span>
        <ChevronDown className="w-3 h-3 text-[#E8AC51] shrink-0" />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-1 w-60 bg-[#1c1c1e] border border-white/15 rounded-xl shadow-2xl z-50 overflow-hidden">
          <div className="p-2 border-b border-white/10 bg-[#161617] flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar país ou DDI (+55)..."
              autoFocus
              className="w-full bg-transparent text-xs text-white placeholder:text-neutral-500 outline-none"
            />
          </div>
          <div className="max-h-48 overflow-y-auto divide-y divide-white/5">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => {
                const isSelected = country.ddi === selectedCountry.ddi;
                return (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => {
                      onChange(country.ddi);
                      setIsOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#880E1B] text-white font-semibold'
                        : 'text-white hover:bg-[#161617]'
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <span>{country.flag}</span>
                      <span className="truncate">{country.name}</span>
                    </span>
                    <span className="text-[11px] shrink-0 text-[#E8AC51] font-semibold">
                      {country.ddi}
                    </span>
                  </button>
                );
              })
            ) : (
              <div className="px-3 py-2.5 text-[11px] text-neutral-400 text-center">
                Nenhum país encontrado
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function PersonalInfoForm({ formData, onNestedChange }) {
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
      personal.phones.map((item) => {
        if (item.id !== id) return item;
        if (key === 'ddi') {
          return {
            ...item,
            ddi: value,
            number: formatPhoneForCountry(item.number, value),
          };
        }
        if (key === 'number') {
          return {
            ...item,
            number: formatPhoneForCountry(value, item.ddi || '+55'),
          };
        }
        return { ...item, [key]: value };
      })
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
      { id: Date.now(), relation: 'mother', name: '', ddi: '+55', phone: '' },
    ]);
  };

  const updateEmergencyContact = (id, key, value) => {
    handleField(
      'relatedContacts',
      personal.relatedContacts.map((item) => {
        if (item.id !== id) return item;
        if (key === 'ddi') {
          return {
            ...item,
            ddi: value,
            phone: formatPhoneForCountry(item.phone, value),
          };
        }
        if (key === 'phone') {
          return {
            ...item,
            phone: formatPhoneForCountry(value, item.ddi || '+55'),
          };
        }
        return { ...item, [key]: value };
      })
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
    <div className="space-y-5">
      {/* 1. Info Básica */}
      <div className="bg-[#1c1c1e] border border-white/10 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-white/10">
          <Info className="w-4 h-4 text-[#E8AC51] shrink-0" />
          <h3 className="text-sm font-semibold text-white">Info básica</h3>
        </div>

        <div className="space-y-3">
          {/* Unidade & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-neutral-400">
                Unidade
              </label>
              <select
                value={personal.office}
                onChange={(e) => handleField('office', e.target.value)}
                className={INPUT_CLASS}
              >
                {OFFICE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-neutral-400">
                Status
              </label>
              <select
                value={personal.status}
                onChange={(e) => handleField('status', e.target.value)}
                className={INPUT_CLASS}
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Categorias */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-medium text-neutral-400">
              Categorias
            </label>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORY_OPTIONS.map((cat) => {
                const active = personal.categories.includes(cat.value);
                return (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => toggleCategory(cat.value)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#880E1B] text-white border-[#880E1B]'
                        : 'bg-[#161617] text-neutral-300 border-white/10 hover:border-[#E8AC51]/40'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Etiquetas & Gênero */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-neutral-400">
                Etiquetas
              </label>
              <select
                value={personal.tag}
                onChange={(e) => handleField('tag', e.target.value)}
                className={INPUT_CLASS}
              >
                <option value="">Selecione</option>
                {TAG_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-medium text-neutral-400">
                Gênero
              </label>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                {GENDER_OPTIONS.map((g) => (
                  <label
                    key={g.value}
                    className="inline-flex items-center gap-1.5 text-xs text-white cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={g.value}
                      checked={personal.gender === g.value}
                      onChange={(e) => handleField('gender', e.target.value)}
                      className="accent-[#880E1B] cursor-pointer"
                    />
                    <span>{g.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Identidade de Gênero & Pronome */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-neutral-400">
                Identidade de Gênero
              </label>
              <select
                value={personal.genderIdentity}
                onChange={(e) => handleField('genderIdentity', e.target.value)}
                className={INPUT_CLASS}
              >
                <option value="">Selecione</option>
                {GENDER_IDENTITY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-neutral-400">
                Pronome
              </label>
              <select
                value={personal.pronoun}
                onChange={(e) => handleField('pronoun', e.target.value)}
                className={INPUT_CLASS}
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

          {/* Nome Artístico & Nome Completo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-neutral-400">
                Nome Artístico <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={personal.stageName}
                onChange={(e) => handleField('stageName', e.target.value)}
                placeholder="Nome Artístico (ex: Sophia Évora)"
                className={INPUT_CLASS}
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-neutral-400">
                Nome Completo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={personal.fullName}
                onChange={(e) => handleField('fullName', e.target.value)}
                placeholder="Nome Completo Civil"
                className={INPUT_CLASS}
              />
            </div>
          </div>

          {/* Data de Nascimento & Etnia */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-neutral-400">
                Data de Nascimento
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                <select
                  value={personal.birthDay}
                  onChange={(e) => handleField('birthDay', e.target.value)}
                  className="px-2 py-1.5 text-xs bg-[#161617] text-white border border-white/10 rounded-lg focus:border-[#E8AC51]/60 outline-none"
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
                  className="px-2 py-1.5 text-xs bg-[#161617] text-white border border-white/10 rounded-lg focus:border-[#E8AC51]/60 outline-none"
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
                  className="px-2 py-1.5 text-xs bg-[#161617] text-white border border-white/10 rounded-lg focus:border-[#E8AC51]/60 outline-none"
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

            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-neutral-400">
                Etnia
              </label>
              <select
                value={personal.ethnicity}
                onChange={(e) => handleField('ethnicity', e.target.value)}
                className={INPUT_CLASS}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-neutral-400">
                Nacionalidade
              </label>
              <select
                value={personal.nationality}
                onChange={(e) => handleField('nationality', e.target.value)}
                className={INPUT_CLASS}
              >
                <option value="">Selecione</option>
                {NATIONALITY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-neutral-400">
                Cidade de Nascimento
              </label>
              <input
                type="text"
                value={personal.birthCity}
                onChange={(e) => handleField('birthCity', e.target.value)}
                placeholder="Ex: São Paulo - SP"
                className={INPUT_CLASS}
              />
            </div>
          </div>

          {/* Idiomas */}
          <div className="pt-3 border-t border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-neutral-300">
                Idiomas
              </label>
              <button
                type="button"
                onClick={addLanguage}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#880E1B] hover:bg-[#a31121] text-white text-[11px] font-semibold rounded-lg transition-colors cursor-pointer"
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
                    className={INPUT_CLASS}
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
                    className={INPUT_CLASS}
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
                      className="p-1.5 text-neutral-400 hover:text-red-400 transition-colors cursor-pointer shrink-0"
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

      {/* 2. Residência e endereço */}
      <div className="bg-[#1c1c1e] border border-white/10 rounded-xl p-5 shadow-xs space-y-3.5">
        <div className="flex items-center gap-2 pb-3 border-b border-white/10">
          <MapPin className="w-4 h-4 text-[#E8AC51] shrink-0" />
          <h3 className="text-sm font-semibold text-white">
            Residência e endereço
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <div className="space-y-1">
            <label className="block text-[11px] font-medium text-neutral-400">
              País
            </label>
            <select
              value={personal.country}
              onChange={(e) => handleField('country', e.target.value)}
              className={INPUT_CLASS}
            >
              {NATIONALITY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-medium text-neutral-400">
              Estado
            </label>
            <select
              value={personal.state}
              onChange={(e) => handleField('state', e.target.value)}
              className={INPUT_CLASS}
            >
              <option value="">Estado</option>
              {STATE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-medium text-neutral-400">
              Cidade
            </label>
            <input
              type="text"
              value={personal.city}
              onChange={(e) => handleField('city', e.target.value)}
              placeholder="Cidade"
              className={INPUT_CLASS}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-[11px] font-medium text-neutral-400">
            Endereço Atual (Complemento / Referência)
          </label>
          <input
            type="text"
            value={personal.currentAddress}
            onChange={(e) => handleField('currentAddress', e.target.value)}
            placeholder="Endereço Atual"
            className={INPUT_CLASS}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
          <div className="sm:col-span-5">
            <input
              type="text"
              value={personal.street}
              onChange={(e) => handleField('street', e.target.value)}
              placeholder="Rua / Logradouro"
              className={INPUT_CLASS}
            />
          </div>
          <div className="sm:col-span-2">
            <input
              type="text"
              value={personal.streetNumber}
              onChange={(e) => handleField('streetNumber', e.target.value)}
              placeholder="Núm."
              className={INPUT_CLASS}
            />
          </div>
          <div className="sm:col-span-3">
            <input
              type="text"
              value={personal.neighborhood}
              onChange={(e) => handleField('neighborhood', e.target.value)}
              placeholder="Bairro"
              className={INPUT_CLASS}
            />
          </div>
          <div className="sm:col-span-2">
            <input
              type="text"
              value={personal.zipCode}
              onChange={(e) => handleField('zipCode', e.target.value)}
              placeholder="CEP (00000-000)"
              className={INPUT_CLASS}
            />
          </div>
        </div>
      </div>

      {/* 3. Comunicação & redes sociais */}
      <div className="bg-[#1c1c1e] border border-white/10 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-white/10">
          <Users className="w-4 h-4 text-[#E8AC51] shrink-0" />
          <h3 className="text-sm font-semibold text-white">
            Comunicação &amp; redes sociais
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* Esquerda: E-mails */}
          <div className="lg:col-span-5 space-y-3">
            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-neutral-400">
                Email Principal
              </label>
              <div className="flex items-center bg-[#161617] border border-white/10 rounded-lg overflow-hidden focus-within:border-[#E8AC51]/60">
                <span className="px-2.5 py-1.5 border-r border-white/10 text-neutral-400">
                  <Mail className="w-3.5 h-3.5" />
                </span>
                <input
                  type="email"
                  value={personal.email}
                  onChange={(e) => handleField('email', e.target.value)}
                  placeholder="talento@email.com"
                  className="w-full px-2.5 py-1.5 text-xs bg-transparent text-white placeholder:text-neutral-500 outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-medium text-neutral-400">
                  Emails Alternativos
                </label>
                <button
                  type="button"
                  onClick={addAltEmail}
                  className="w-5 h-5 rounded-full bg-[#880E1B] text-white flex items-center justify-center hover:bg-[#a31121] cursor-pointer"
                  title="Adicionar Email Alternativo"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-2">
                {personal.altEmails.map((item) => (
                  <div key={item.id} className="flex items-center gap-1.5">
                    <input
                      type="email"
                      value={item.email}
                      onChange={(e) =>
                        updateAltEmail(item.id, 'email', e.target.value)
                      }
                      placeholder="Email"
                      className={INPUT_CLASS}
                    />
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) =>
                        updateAltEmail(item.id, 'label', e.target.value)
                      }
                      placeholder="Etiqueta (ex: Assessoria)"
                      className={INPUT_CLASS}
                    />
                    {personal.altEmails.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeAltEmail(item.id)}
                        className="text-neutral-400 hover:text-red-400 p-1 cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Direita: Telefones, Redes Sociais & Notas */}
          <div className="lg:col-span-7 space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-medium text-neutral-400">
                  Telefones
                </label>
                <button
                  type="button"
                  onClick={addPhone}
                  className="w-5 h-5 rounded-full bg-[#880E1B] text-white flex items-center justify-center hover:bg-[#a31121] cursor-pointer"
                  title="Adicionar Telefone"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-2">
                {personal.phones.map((item) => {
                  const currentCountry = getCountryByDdi(item.ddi || '+55');
                  return (
                    <div
                      key={item.id}
                      className="grid grid-cols-12 items-center gap-1.5"
                    >
                      <select
                        value={item.type}
                        onChange={(e) =>
                          updatePhone(item.id, 'type', e.target.value)
                        }
                        className="col-span-3 px-1.5 py-1.5 text-xs bg-[#161617] text-white border border-white/10 rounded-lg focus:border-[#E8AC51]/60 outline-none"
                      >
                        <option value="Celular">Celular</option>
                        <option value="Fixo">Fixo</option>
                        <option value="WhatsApp">WhatsApp</option>
                      </select>
                      <CountryCodeSelector
                        value={item.ddi || '+55'}
                        onChange={(nextDdi) =>
                          updatePhone(item.id, 'ddi', nextDdi)
                        }
                        className="col-span-4"
                      />
                      <input
                        type="tel"
                        inputMode="numeric"
                        value={item.number}
                        maxLength={currentCountry.placeholder.length}
                        onChange={(e) =>
                          updatePhone(item.id, 'number', e.target.value)
                        }
                        placeholder={currentCountry.placeholder}
                        className={`${
                          personal.phones.length > 1 ? 'col-span-4' : 'col-span-5'
                        } px-2.5 py-1.5 text-xs bg-[#161617] text-white placeholder:text-neutral-500 border border-white/10 rounded-lg focus:border-[#E8AC51]/60 outline-none`}
                      />
                      {personal.phones.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePhone(item.id)}
                          className="col-span-1 text-neutral-400 hover:text-red-400 flex justify-center cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-medium text-neutral-400">
                Redes Sociais &amp; Portfólios Externos
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="flex items-center bg-[#161617] border border-white/10 rounded-lg overflow-hidden">
                  <span className="px-2 py-1.5 border-r border-white/10 text-pink-500">
                    <Instagram className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="text"
                    value={personal.socials.instagram}
                    onChange={(e) =>
                      handleSocialChange('instagram', e.target.value)
                    }
                    placeholder="@usuario_instagram"
                    className="w-full px-2 py-1.5 text-xs bg-transparent text-white placeholder:text-neutral-500 outline-none"
                  />
                </div>

                <div className="flex items-center bg-[#161617] border border-white/10 rounded-lg overflow-hidden">
                  <span className="px-2 py-1.5 border-r border-white/10 text-[#E8AC51]">
                    <MessageCircle className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="text"
                    value={personal.socials.tiktok}
                    onChange={(e) =>
                      handleSocialChange('tiktok', e.target.value)
                    }
                    placeholder="@usuario_tiktok"
                    className="w-full px-2 py-1.5 text-xs bg-transparent text-white placeholder:text-neutral-500 outline-none"
                  />
                </div>

                <div className="flex items-center bg-[#161617] border border-white/10 rounded-lg overflow-hidden">
                  <span className="px-2 py-1.5 border-r border-white/10 text-red-500">
                    <Youtube className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="text"
                    value={personal.socials.youtube}
                    onChange={(e) =>
                      handleSocialChange('youtube', e.target.value)
                    }
                    placeholder="Canal YouTube / Vimeo"
                    className="w-full px-2 py-1.5 text-xs bg-transparent text-white placeholder:text-neutral-500 outline-none"
                  />
                </div>

                <div className="flex items-center bg-[#161617] border border-white/10 rounded-lg overflow-hidden">
                  <span className="px-2 py-1.5 border-r border-white/10 text-[#E8AC51]">
                    <Globe className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="text"
                    value={personal.socials.modelsDotCom}
                    onChange={(e) =>
                      handleSocialChange('modelsDotCom', e.target.value)
                    }
                    placeholder="Models.Com (Conta / URL)"
                    className="w-full px-2 py-1.5 text-xs bg-transparent text-white placeholder:text-neutral-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-neutral-400">
                Notas Pacotes
              </label>
              <textarea
                rows={2}
                value={personal.packageNotes}
                onChange={(e) => handleField('packageNotes', e.target.value)}
                placeholder="Observações visíveis nos envios de pacotes / castings..."
                className={INPUT_CLASS}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Contatos */}
      <div className="bg-[#1c1c1e] border border-white/10 rounded-xl p-5 shadow-xs space-y-3.5">
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Contact className="w-4 h-4 text-[#E8AC51] shrink-0" />
            <h3 className="text-sm font-semibold text-white">Contatos</h3>
          </div>
          <button
            type="button"
            onClick={addEmergencyContact}
            className="px-3 py-1 bg-[#880E1B] hover:bg-[#a31121] text-white text-[10px] font-bold uppercase tracking-wider rounded-lg inline-flex items-center gap-1 transition-colors cursor-pointer"
          >
            <UserPlus className="w-3 h-3" />
            <span>+ ADICIONAR CONTATOS</span>
          </button>
        </div>

        <div className="space-y-3">
          {personal.relatedContacts.map((contact) => (
            <div
              key={contact.id}
              className="p-3 bg-[#161617] rounded-xl border border-white/10 grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-end relative"
            >
              <div className="sm:col-span-3 space-y-1">
                <label className="block text-[11px] text-neutral-400">
                  Relação
                </label>
                <select
                  value={contact.relation}
                  onChange={(e) =>
                    updateEmergencyContact(
                      contact.id,
                      'relation',
                      e.target.value
                    )
                  }
                  className={INPUT_CLASS}
                >
                  <option value="">Selecione</option>
                  {CONTACT_RELATION_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-4 space-y-1">
                <label className="block text-[11px] text-neutral-400">
                  Nome
                </label>
                <input
                  type="text"
                  value={contact.name}
                  onChange={(e) =>
                    updateEmergencyContact(contact.id, 'name', e.target.value)
                  }
                  placeholder="Nome"
                  className={INPUT_CLASS}
                />
              </div>

              <div
                className={`${
                  personal.relatedContacts.length > 1
                    ? 'sm:col-span-4'
                    : 'sm:col-span-5'
                } space-y-1`}
              >
                <label className="block text-[11px] text-neutral-400">
                  Telefone
                </label>
                <div className="grid grid-cols-12 items-center gap-1.5">
                  <CountryCodeSelector
                    value={contact.ddi || '+55'}
                    onChange={(nextDdi) =>
                      updateEmergencyContact(contact.id, 'ddi', nextDdi)
                    }
                    className="col-span-5"
                  />
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={contact.phone}
                    maxLength={
                      getCountryByDdi(contact.ddi || '+55').placeholder.length
                    }
                    onChange={(e) =>
                      updateEmergencyContact(
                        contact.id,
                        'phone',
                        e.target.value
                      )
                    }
                    placeholder={
                      getCountryByDdi(contact.ddi || '+55').placeholder
                    }
                    className="col-span-7 px-2.5 py-1.5 text-xs bg-[#161617] text-white placeholder:text-neutral-500 border border-white/10 rounded-lg focus:border-[#E8AC51]/60 outline-none"
                  />
                </div>
              </div>

              {personal.relatedContacts.length > 1 && (
                <div className="sm:col-span-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeEmergencyContact(contact.id)}
                    className="p-1.5 text-neutral-400 hover:text-red-400 cursor-pointer"
                    title="Remover contato"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
