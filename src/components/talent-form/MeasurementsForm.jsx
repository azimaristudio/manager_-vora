import React from 'react';
import {
  HEIGHT_OPTIONS,
  WEIGHT_OPTIONS,
  BUST_WAIST_HIPS_OPTIONS,
  EYES_OPTIONS,
  HAIR_COLOR_OPTIONS,
  HAIR_LENGTH_OPTIONS,
  HAIR_TYPE_OPTIONS,
  SHIRT_SIZE_OPTIONS,
  MANNEQUIN_OPTIONS,
  SHOES_OPTIONS,
  SKIN_TONE_OPTIONS,
} from '../../data/talentFormOptions';

export default function MeasurementsForm({ formData, onNestedChange }) {
  const { measurements } = formData;

  const handleField = (field, value) => {
    onNestedChange('measurements', field, value);
  };

  return (
    <div className="space-y-6">
      {/* Seção: Medidas Físicas */}
      <div className="bg-white border border-slate-200 rounded-md p-5 shadow-2xs">
        <h3 className="text-sm font-bold text-slate-800 pb-2.5 mb-4 border-b border-slate-200">
          Medidas
        </h3>

        <div className="space-y-3">
          {/* Altura */}
          <div className="grid grid-cols-12 items-center gap-2">
            <label className="col-span-5 text-xs font-medium text-slate-600">
              Altura
            </label>
            <div className="col-span-7">
              <select
                value={measurements.height}
                onChange={(e) => handleField('height', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
              >
                <option value="">Selecione</option>
                {HEIGHT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Peso */}
          <div className="grid grid-cols-12 items-center gap-2">
            <label className="col-span-5 text-xs font-medium text-slate-600">
              Peso
            </label>
            <div className="col-span-7">
              <select
                value={measurements.weight}
                onChange={(e) => handleField('weight', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
              >
                <option value="">Selecione</option>
                {WEIGHT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Busto / Cintura / Quadril */}
          <div className="grid grid-cols-12 items-center gap-2">
            <label className="col-span-5 text-xs font-medium text-slate-600">
              Busto / Tórax
            </label>
            <div className="col-span-7">
              <select
                value={measurements.bust}
                onChange={(e) => handleField('bust', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
              >
                <option value="">Selecione</option>
                {BUST_WAIST_HIPS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-12 items-center gap-2">
            <label className="col-span-5 text-xs font-medium text-slate-600">
              Cintura
            </label>
            <div className="col-span-7">
              <select
                value={measurements.waist}
                onChange={(e) => handleField('waist', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
              >
                <option value="">Selecione</option>
                {BUST_WAIST_HIPS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-12 items-center gap-2">
            <label className="col-span-5 text-xs font-medium text-slate-600">
              Quadril
            </label>
            <div className="col-span-7">
              <select
                value={measurements.hips}
                onChange={(e) => handleField('hips', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
              >
                <option value="">Selecione</option>
                {BUST_WAIST_HIPS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Olhos */}
          <div className="grid grid-cols-12 items-center gap-2">
            <label className="col-span-5 text-xs font-medium text-slate-600">
              Olhos
            </label>
            <div className="col-span-7">
              <select
                value={measurements.eyes}
                onChange={(e) => handleField('eyes', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
              >
                <option value="">Selecione</option>
                {EYES_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cabelo */}
          <div className="grid grid-cols-12 items-center gap-2">
            <label className="col-span-5 text-xs font-medium text-slate-600">
              Cabelo
            </label>
            <div className="col-span-7">
              <select
                value={measurements.hairColor}
                onChange={(e) => handleField('hairColor', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
              >
                <option value="">Selecione</option>
                {HAIR_COLOR_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cor De Cabelo (natural / colorido) */}
          <div className="grid grid-cols-12 items-center gap-2">
            <label className="col-span-5 text-xs font-medium text-slate-600">
              Cor De Cabelo
            </label>
            <div className="col-span-7 flex items-center gap-4">
              {[
                { value: 'natural', label: 'natural' },
                { value: 'colorido', label: 'colorido' },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="hairDye"
                    value={opt.value}
                    checked={measurements.hairDye === opt.value}
                    onChange={(e) => handleField('hairDye', e.target.value)}
                    className="accent-[#0077b5] cursor-pointer"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Tamanho do Cabelo */}
          <div className="grid grid-cols-12 items-center gap-2">
            <label className="col-span-5 text-xs font-medium text-slate-600">
              Tamanho Do Cabelo
            </label>
            <div className="col-span-7">
              <select
                value={measurements.hairLength}
                onChange={(e) => handleField('hairLength', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
              >
                <option value="">Selecione</option>
                {HAIR_LENGTH_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tipo de Cabelo */}
          <div className="grid grid-cols-12 items-center gap-2">
            <label className="col-span-5 text-xs font-medium text-slate-600">
              Tipo De Cabelo
            </label>
            <div className="col-span-7">
              <select
                value={measurements.hairType}
                onChange={(e) => handleField('hairType', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
              >
                <option value="">Selecione</option>
                {HAIR_TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Camisa / Manequim / Sapato */}
          <div className="grid grid-cols-12 items-center gap-2">
            <label className="col-span-5 text-xs font-medium text-slate-600">
              Camisa
            </label>
            <div className="col-span-7">
              <select
                value={measurements.shirt}
                onChange={(e) => handleField('shirt', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
              >
                <option value="">Selecione</option>
                {SHIRT_SIZE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-12 items-center gap-2">
            <label className="col-span-5 text-xs font-medium text-slate-600">
              Manequim
            </label>
            <div className="col-span-7">
              <select
                value={measurements.mannequin}
                onChange={(e) => handleField('mannequin', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
              >
                <option value="">Selecione</option>
                {MANNEQUIN_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-12 items-center gap-2">
            <label className="col-span-5 text-xs font-medium text-slate-600">
              Sapato
            </label>
            <div className="col-span-7">
              <select
                value={measurements.shoes}
                onChange={(e) => handleField('shoes', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
              >
                <option value="">Selecione</option>
                {SHOES_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Seção: Detalhes de Corpo (da coluna esquerda da Imagem 03) */}
      <div className="bg-white border border-slate-200 rounded-md p-5 shadow-2xs">
        <h3 className="text-sm font-bold text-slate-800 pb-2.5 mb-4 border-b border-slate-200">
          Detalhes de corpo
        </h3>

        <div className="space-y-3">
          {/* Tom da Pele */}
          <div className="grid grid-cols-12 items-center gap-2">
            <label className="col-span-5 text-xs font-medium text-slate-600">
              Tom Da Pele
            </label>
            <div className="col-span-7">
              <select
                value={measurements.skinTone}
                onChange={(e) => handleField('skinTone', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
              >
                <option value="">Selecione</option>
                {SKIN_TONE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cicatrizes */}
          <div className="grid grid-cols-12 items-center gap-2">
            <label className="col-span-5 text-xs font-medium text-slate-600">
              Cicatrizes
            </label>
            <div className="col-span-7">
              <input
                type="text"
                value={measurements.scars}
                onChange={(e) => handleField('scars', e.target.value)}
                placeholder="Cicatrizes"
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
              />
            </div>
          </div>

          {/* Tatuagem */}
          <div className="space-y-1.5">
            <div className="grid grid-cols-12 items-center gap-2">
              <label className="col-span-5 text-xs font-medium text-slate-600">
                Tatuagem
              </label>
              <div className="col-span-7 flex items-center gap-4">
                {[
                  { value: 'yes', label: 'Sim' },
                  { value: 'no', label: 'NÃO' },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="hasTattoo"
                      value={opt.value}
                      checked={measurements.hasTattoo === opt.value}
                      onChange={(e) => handleField('hasTattoo', e.target.value)}
                      className="accent-[#0077b5] cursor-pointer"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-7 col-start-6">
                <input
                  type="text"
                  value={measurements.tattooNotes}
                  onChange={(e) => handleField('tattooNotes', e.target.value)}
                  placeholder="Notas Tatuagem (locais, tamanhos)"
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
                />
              </div>
            </div>
          </div>

          {/* Piercing */}
          <div className="space-y-1.5">
            <div className="grid grid-cols-12 items-center gap-2">
              <label className="col-span-5 text-xs font-medium text-slate-600">
                Piercing
              </label>
              <div className="col-span-7 flex items-center gap-4">
                {[
                  { value: 'yes', label: 'Sim' },
                  { value: 'no', label: 'NÃO' },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="hasPiercing"
                      value={opt.value}
                      checked={measurements.hasPiercing === opt.value}
                      onChange={(e) =>
                        handleField('hasPiercing', e.target.value)
                      }
                      className="accent-[#0077b5] cursor-pointer"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-7 col-start-6">
                <input
                  type="text"
                  value={measurements.piercingNotes}
                  onChange={(e) => handleField('piercingNotes', e.target.value)}
                  placeholder="Notas Piercing"
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
                />
              </div>
            </div>
          </div>

          {/* Marcas De Nascimento */}
          <div className="grid grid-cols-12 items-center gap-2">
            <label className="col-span-5 text-xs font-medium text-slate-600">
              Marcas De Nascimento
            </label>
            <div className="col-span-7">
              <input
                type="text"
                value={measurements.birthmarks}
                onChange={(e) => handleField('birthmarks', e.target.value)}
                placeholder="Marcas De Nascimento"
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
              />
            </div>
          </div>

          {/* Restrições Corporais */}
          <div className="grid grid-cols-12 items-center gap-2">
            <label className="col-span-5 text-xs font-medium text-slate-600">
              Restrições Corporais
            </label>
            <div className="col-span-7">
              <input
                type="text"
                value={measurements.bodyRestrictions}
                onChange={(e) => handleField('bodyRestrictions', e.target.value)}
                placeholder="Não Aceito Fotos De Biquíni, Lingerie..."
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
              />
            </div>
          </div>

          {/* Restrições Alimentares */}
          <div className="space-y-1.5">
            <div className="grid grid-cols-12 items-center gap-2">
              <label className="col-span-5 text-xs font-medium text-slate-600">
                Restrições Alimentárias
              </label>
              <div className="col-span-7 flex items-center gap-4">
                {[
                  { value: 'yes', label: 'Sim' },
                  { value: 'no', label: 'NÃO' },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="hasFoodRestriction"
                      value={opt.value}
                      checked={measurements.hasFoodRestriction === opt.value}
                      onChange={(e) =>
                        handleField('hasFoodRestriction', e.target.value)
                      }
                      className="accent-[#0077b5] cursor-pointer"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-7 col-start-6">
                <input
                  type="text"
                  value={measurements.foodRestrictionNotes}
                  onChange={(e) =>
                    handleField('foodRestrictionNotes', e.target.value)
                  }
                  placeholder="Notas De Restrições Alimentares"
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seção: Restrições para Sessão Fotográfica (Coluna Direita da Imagem 03) */}
      <div className="bg-white border border-slate-200 rounded-md p-5 shadow-2xs">
        <h3 className="text-sm font-bold text-slate-800 pb-2.5 mb-4 border-b border-slate-200">
          Restrições para sessão fotográfica
        </h3>

        <div className="space-y-3">
          <div className="grid grid-cols-12 items-center gap-2">
            <label className="col-span-5 text-xs font-medium text-slate-600">
              Topless
            </label>
            <div className="col-span-7 flex items-center gap-4">
              {[
                { value: 'yes', label: 'Sim' },
                { value: 'no', label: 'NÃO' },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="toplessRestriction"
                    value={opt.value}
                    checked={measurements.toplessRestriction === opt.value}
                    onChange={(e) =>
                      handleField('toplessRestriction', e.target.value)
                    }
                    className="accent-[#0077b5] cursor-pointer"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-12 items-center gap-2">
            <label className="col-span-5 text-xs font-medium text-slate-600">
              Nudez total
            </label>
            <div className="col-span-7 flex items-center gap-4">
              {[
                { value: 'yes', label: 'Sim' },
                { value: 'no', label: 'NÃO' },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="fullNudityRestriction"
                    value={opt.value}
                    checked={measurements.fullNudityRestriction === opt.value}
                    onChange={(e) =>
                      handleField('fullNudityRestriction', e.target.value)
                    }
                    className="accent-[#0077b5] cursor-pointer"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

