import React from 'react';
import { Ruler, Shirt, Camera } from 'lucide-react';
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

const SELECT_CLASS =
  'w-full px-2.5 py-1.5 text-xs bg-[#161617] text-white border border-white/10 rounded-lg focus:border-[#E8AC51]/60 outline-none transition-colors';

const INPUT_CLASS =
  'w-full px-2.5 py-1.5 text-xs bg-[#161617] text-white placeholder:text-neutral-500 border border-white/10 rounded-lg focus:border-[#E8AC51]/60 outline-none transition-colors';

export default function MeasurementsForm({ formData, onNestedChange }) {
  const { measurements } = formData;

  const handleField = (field, value) => {
    onNestedChange('measurements', field, value);
  };

  return (
    <div className="space-y-5">
      {/* 1. Medidas */}
      <div className="bg-[#1c1c1e] border border-white/10 rounded-xl p-5 shadow-xs">
        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-white/10">
          <Ruler className="w-4 h-4 text-[#E8AC51] shrink-0" />
          <h3 className="text-sm font-semibold text-white">Medidas</h3>
        </div>

        <div className="space-y-2.5">
          {[
            { field: 'height', label: 'Altura', options: HEIGHT_OPTIONS },
            { field: 'weight', label: 'Peso', options: WEIGHT_OPTIONS },
            {
              field: 'bust',
              label: 'Busto / Tórax',
              options: BUST_WAIST_HIPS_OPTIONS,
            },
            {
              field: 'waist',
              label: 'Cintura',
              options: BUST_WAIST_HIPS_OPTIONS,
            },
            {
              field: 'hips',
              label: 'Quadril',
              options: BUST_WAIST_HIPS_OPTIONS,
            },
            { field: 'eyes', label: 'Olhos', options: EYES_OPTIONS },
            { field: 'hairColor', label: 'Cabelo', options: HAIR_COLOR_OPTIONS },
          ].map(({ field, label, options }) => (
            <div key={field} className="grid grid-cols-12 items-center gap-2">
              <label className="col-span-5 text-xs font-medium text-neutral-400">
                {label}
              </label>
              <div className="col-span-7">
                <select
                  value={measurements[field]}
                  onChange={(e) => handleField(field, e.target.value)}
                  className={SELECT_CLASS}
                >
                  <option value="">Selecione</option>
                  {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}

          {/* Cor de Cabelo */}
          <div className="grid grid-cols-12 items-center gap-2 py-1">
            <label className="col-span-5 text-xs font-medium text-neutral-400">
              Cor de Cabelo
            </label>
            <div className="col-span-7 flex items-center gap-4">
              {[
                { value: 'natural', label: 'natural' },
                { value: 'colorido', label: 'colorido' },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className="inline-flex items-center gap-1.5 text-xs text-white cursor-pointer"
                >
                  <input
                    type="radio"
                    name="hairDye"
                    value={opt.value}
                    checked={measurements.hairDye === opt.value}
                    onChange={(e) => handleField('hairDye', e.target.value)}
                    className="accent-[#880E1B] cursor-pointer"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {[
            {
              field: 'hairLength',
              label: 'Tamanho do Cabelo',
              options: HAIR_LENGTH_OPTIONS,
            },
            {
              field: 'hairType',
              label: 'Tipo de Cabelo',
              options: HAIR_TYPE_OPTIONS,
            },
            { field: 'shirt', label: 'Camisa', options: SHIRT_SIZE_OPTIONS },
            {
              field: 'mannequin',
              label: 'Manequim',
              options: MANNEQUIN_OPTIONS,
            },
            { field: 'shoes', label: 'Sapato', options: SHOES_OPTIONS },
          ].map(({ field, label, options }) => (
            <div key={field} className="grid grid-cols-12 items-center gap-2">
              <label className="col-span-5 text-xs font-medium text-neutral-400">
                {label}
              </label>
              <div className="col-span-7">
                <select
                  value={measurements[field]}
                  onChange={(e) => handleField(field, e.target.value)}
                  className={SELECT_CLASS}
                >
                  <option value="">Selecione</option>
                  {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Detalhes de corpo */}
      <div className="bg-[#1c1c1e] border border-white/10 rounded-xl p-5 shadow-xs">
        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-white/10">
          <Shirt className="w-4 h-4 text-[#E8AC51] shrink-0" />
          <h3 className="text-sm font-semibold text-white">Detalhes de corpo</h3>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-12 items-center gap-2">
            <label className="col-span-4 text-xs font-medium text-neutral-400">
              Tom da Pele
            </label>
            <div className="col-span-8">
              <select
                value={measurements.skinTone}
                onChange={(e) => handleField('skinTone', e.target.value)}
                className={SELECT_CLASS}
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

          <div className="grid grid-cols-12 items-center gap-2">
            <label className="col-span-4 text-xs font-medium text-neutral-400">
              Cicatrizes
            </label>
            <div className="col-span-8">
              <input
                type="text"
                value={measurements.scars}
                onChange={(e) => handleField('scars', e.target.value)}
                placeholder="Cicatrizes"
                className={INPUT_CLASS}
              />
            </div>
          </div>

          {/* Tatuagem */}
          <div className="grid grid-cols-12 items-center gap-2">
            <label className="col-span-4 text-xs font-medium text-neutral-400">
              Tatuagem
            </label>
            <div className="col-span-8 flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2.5 shrink-0">
                {[
                  { value: 'yes', label: 'Sim' },
                  { value: 'no', label: 'Não' },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className="inline-flex items-center gap-1 text-xs text-white cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="hasTattoo"
                      value={opt.value}
                      checked={measurements.hasTattoo === opt.value}
                      onChange={(e) => handleField('hasTattoo', e.target.value)}
                      className="accent-[#880E1B] cursor-pointer"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
              <input
                type="text"
                value={measurements.tattooNotes}
                onChange={(e) => handleField('tattooNotes', e.target.value)}
                placeholder="Notas Tatuagem (locais, tamanhos)"
                className="flex-1 min-w-[120px] px-2.5 py-1.5 text-xs bg-[#161617] text-white placeholder:text-neutral-500 border border-white/10 rounded-lg focus:border-[#E8AC51]/60 outline-none"
              />
            </div>
          </div>

          {/* Piercing */}
          <div className="grid grid-cols-12 items-center gap-2">
            <label className="col-span-4 text-xs font-medium text-neutral-400">
              Piercing
            </label>
            <div className="col-span-8 flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2.5 shrink-0">
                {[
                  { value: 'yes', label: 'Sim' },
                  { value: 'no', label: 'Não' },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className="inline-flex items-center gap-1 text-xs text-white cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="hasPiercing"
                      value={opt.value}
                      checked={measurements.hasPiercing === opt.value}
                      onChange={(e) =>
                        handleField('hasPiercing', e.target.value)
                      }
                      className="accent-[#880E1B] cursor-pointer"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
              <input
                type="text"
                value={measurements.piercingNotes}
                onChange={(e) => handleField('piercingNotes', e.target.value)}
                placeholder="Notas Piercing"
                className="flex-1 min-w-[120px] px-2.5 py-1.5 text-xs bg-[#161617] text-white placeholder:text-neutral-500 border border-white/10 rounded-lg focus:border-[#E8AC51]/60 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-12 items-center gap-2">
            <label className="col-span-4 text-xs font-medium text-neutral-400">
              Marcas de Nascimento
            </label>
            <div className="col-span-8">
              <input
                type="text"
                value={measurements.birthmarks}
                onChange={(e) => handleField('birthmarks', e.target.value)}
                placeholder="Marcas de Nascimento"
                className={INPUT_CLASS}
              />
            </div>
          </div>

          <div className="grid grid-cols-12 items-center gap-2">
            <label className="col-span-4 text-xs font-medium text-neutral-400">
              Restrições Corporais
            </label>
            <div className="col-span-8">
              <input
                type="text"
                value={measurements.bodyRestrictions}
                onChange={(e) => handleField('bodyRestrictions', e.target.value)}
                placeholder="Não Aceito Fotos De Biquíni, Lingerie..."
                className={INPUT_CLASS}
              />
            </div>
          </div>

          {/* Restrições Alimentares */}
          <div className="grid grid-cols-12 items-center gap-2">
            <label className="col-span-4 text-xs font-medium text-neutral-400">
              Restrições Alimentares
            </label>
            <div className="col-span-8 flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2.5 shrink-0">
                {[
                  { value: 'yes', label: 'Sim' },
                  { value: 'no', label: 'Não' },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className="inline-flex items-center gap-1 text-xs text-white cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="hasFoodRestriction"
                      value={opt.value}
                      checked={measurements.hasFoodRestriction === opt.value}
                      onChange={(e) =>
                        handleField('hasFoodRestriction', e.target.value)
                      }
                      className="accent-[#880E1B] cursor-pointer"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
              <input
                type="text"
                value={measurements.foodRestrictionNotes}
                onChange={(e) =>
                  handleField('foodRestrictionNotes', e.target.value)
                }
                placeholder="Notas De Restrições Alimentares"
                className="flex-1 min-w-[120px] px-2.5 py-1.5 text-xs bg-[#161617] text-white placeholder:text-neutral-500 border border-white/10 rounded-lg focus:border-[#E8AC51]/60 outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Restrições para sessão fotográfica */}
      <div className="bg-[#1c1c1e] border border-white/10 rounded-xl p-5 shadow-xs">
        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-white/10">
          <Camera className="w-4 h-4 text-[#E8AC51] shrink-0" />
          <h3 className="text-sm font-semibold text-white">
            Restrições para sessão fotográfica
          </h3>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-12 items-center gap-2">
            <label className="col-span-4 text-xs font-medium text-neutral-400">
              Topless
            </label>
            <div className="col-span-8 flex items-center gap-4">
              {[
                { value: 'yes', label: 'Sim' },
                { value: 'no', label: 'Não' },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className="inline-flex items-center gap-1.5 text-xs text-white cursor-pointer"
                >
                  <input
                    type="radio"
                    name="toplessRestriction"
                    value={opt.value}
                    checked={measurements.toplessRestriction === opt.value}
                    onChange={(e) =>
                      handleField('toplessRestriction', e.target.value)
                    }
                    className="accent-[#880E1B] cursor-pointer"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-12 items-center gap-2">
            <label className="col-span-4 text-xs font-medium text-neutral-400">
              Nudez total
            </label>
            <div className="col-span-8 flex items-center gap-4">
              {[
                { value: 'yes', label: 'Sim' },
                { value: 'no', label: 'Não' },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className="inline-flex items-center gap-1.5 text-xs text-white cursor-pointer"
                >
                  <input
                    type="radio"
                    name="fullNudityRestriction"
                    value={opt.value}
                    checked={measurements.fullNudityRestriction === opt.value}
                    onChange={(e) =>
                      handleField('fullNudityRestriction', e.target.value)
                    }
                    className="accent-[#880E1B] cursor-pointer"
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
