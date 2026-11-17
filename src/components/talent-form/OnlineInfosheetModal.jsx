import React, { useState } from 'react';
import { X, AlertCircle, Info, Mail, Send, LayoutGrid } from 'lucide-react';
import {
  STATUS_OPTIONS,
  GENDER_OPTIONS,
  CATEGORY_OPTIONS,
} from '../../data/talentFormOptions';

export function OnlineInfosheetModal({ isOpen, onClose, initialName = '', initialEmail = '', onSendSuccess }) {
  const [mode, setMode] = useState('single'); // 'single' | 'multiple' | 'link'
  const [status, setStatus] = useState('1');
  const [gender, setGender] = useState('woman');
  const [categories, setCategories] = useState(['2', '3', '1']);
  const [department, setDepartment] = useState('');
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [language, setLanguage] = useState('Português');
  const [subject, setSubject] = useState('Cadastro');
  const [message, setMessage] = useState(
    `Olá {{name}},\n\nPor favor, verificar e atualizar suas informações, preencha o nosso formulário on-line.\n\nPara acessá-lo, use o link que aparece abaixo, se ele não funcionar, copie e cole no seu browser.\n{{link}}\n\nAtenciosamente,\nÉvora Models`
  );

  if (!isOpen) return null;

  const toggleCategory = (val) => {
    setCategories((prev) =>
      prev.includes(val) ? prev.filter((c) => c !== val) : [...prev, val]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('📩 [Ficha Online Simulada Enviada]:', {
      mode,
      status,
      gender,
      categories,
      department,
      name,
      email,
      language,
      subject,
      message,
    });
    if (onSendSuccess) {
      onSendSuccess(email || name || 'Talento');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#1c1c1e] rounded-sm shadow-2xl w-full max-w-lg border border-white/10 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Cabeçalho do Modal */}
        <div className="relative px-6 py-4 border-b border-white/10 flex items-center justify-center">
          <h2 className="text-sm font-semibold text-white">Ficha Online</h2>
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[82vh] overflow-y-auto">
          {/* Banner Laranja de Proteção de Dados (Fiel à Imagem 04) */}
          <div className="bg-[#ff7f0e] text-white p-4 rounded-xs text-xs space-y-1.5 shadow-xs">
            <div className="flex items-center gap-1.5 font-bold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Proteja os dados do seu talento</span>
            </div>
            <p className="text-[11px] leading-relaxed text-white/95">
              Percebemos que os Termos de Privacidade não estão totalmente
              configurados ou ativados para este tipo de pedido. Formalizar este
              passo garante o cumprimento das leis de proteção de dados.
            </p>
            <a
              href="#termos"
              onClick={(e) => e.preventDefault()}
              className="inline-block text-[11px] underline font-semibold hover:text-amber-100"
            >
              Configurar Termos de Privacidade aqui
            </a>
          </div>

          {/* Explicação com Ícone Azul "i" */}
          <div className="flex items-start gap-3 text-center px-2">
            <div className="w-6 h-6 rounded-full bg-[#880E1B] text-white flex items-center justify-center shrink-0 mt-0.5">
              <Info className="w-3.5 h-3.5" />
            </div>
            <p className="text-[11px] text-neutral-400 leading-relaxed text-center">
              Uma ficha de cadastro é um formulário online que seus talentos
              podem preencher para criar ou atualizar o perfil deles dentro da
              sua conta MF. Você também pode enviar uma solicitação por e-mail
              aos seus talentos ou compartilhar com eles um link para acessar a
              ficha de cadastro.
            </p>
          </div>

          {/* Seletor de Modo: Um Talento | Múltiplos Talentos | Link */}
          <div className="flex items-center justify-center gap-6 py-2 border-b border-white/10">
            {[
              { value: 'single', label: 'Um Talento' },
              { value: 'multiple', label: 'Múltiplos Talentos' },
              { value: 'link', label: 'Link' },
            ].map((opt) => (
              <label
                key={opt.value}
                className={`inline-flex items-center gap-1.5 text-xs cursor-pointer ${
                  mode === opt.value
                    ? 'text-[#E8AC51] font-semibold'
                    : 'text-neutral-400'
                }`}
              >
                <input
                  type="radio"
                  name="infosheetMode"
                  value={opt.value}
                  checked={mode === opt.value}
                  onChange={(e) => setMode(e.target.value)}
                  className="accent-[#880E1B] cursor-pointer"
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>

          {/* Campos do Formulário da Ficha Online */}
          <div className="space-y-3 pt-1">
            {/* Status */}
            <div className="grid grid-cols-12 items-center gap-2">
              <label className="col-span-4 text-xs text-neutral-400">Status</label>
              <div className="col-span-8">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-[#1c1c1e] border border-white/10 rounded-xs outline-none focus:border-[#880E1B]"
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
            <div className="grid grid-cols-12 items-center gap-2">
              <label className="col-span-4 text-xs text-neutral-400">Gênero</label>
              <div className="col-span-8 flex items-center gap-4">
                {GENDER_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className="inline-flex items-center gap-1 text-xs text-white cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="modalGender"
                      value={opt.value}
                      checked={gender === opt.value}
                      onChange={(e) => setGender(e.target.value)}
                      className="accent-[#880E1B]"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Categorias (Pills Azuis) */}
            <div className="grid grid-cols-12 items-center gap-2">
              <label className="col-span-4 text-xs text-neutral-400">
                Categorias
              </label>
              <div className="col-span-8 flex flex-wrap gap-1 p-1.5 border border-white/10 rounded-xs">
                {CATEGORY_OPTIONS.slice(0, 3).map((cat) => {
                  const active = categories.includes(cat.value);
                  return (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => toggleCategory(cat.value)}
                      className={`px-2 py-0.5 text-[11px] rounded-xs flex items-center gap-1 cursor-pointer ${
                        active
                          ? 'bg-[#880E1B] text-white'
                          : 'bg-[#161617] text-neutral-400'
                      }`}
                    >
                      <span>{cat.label}</span>
                      {active && <span className="text-[10px]">×</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Departamentos */}
            <div className="grid grid-cols-12 items-center gap-2">
              <label className="col-span-4 text-xs text-neutral-400">
                Departamentos
              </label>
              <div className="col-span-8">
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-[#1c1c1e] border border-white/10 rounded-xs outline-none focus:border-[#880E1B]"
                >
                  <option value="">Selecione</option>
                  <option value="fashion">Fashion / Passarela</option>
                  <option value="commercial">Comercial / Publicidade</option>
                </select>
              </div>
            </div>

            {/* Nome */}
            <div className="grid grid-cols-12 items-center gap-2">
              <label className="col-span-4 text-xs text-neutral-400">Nome</label>
              <div className="col-span-8">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome"
                  className="w-full px-2.5 py-1.5 text-xs border border-white/10 rounded-xs outline-none focus:border-[#880E1B]"
                />
              </div>
            </div>

            {/* Email */}
            <div className="grid grid-cols-12 items-center gap-2">
              <label className="col-span-4 text-xs text-neutral-400">Email</label>
              <div className="col-span-8 flex items-center border border-white/10 rounded-xs overflow-hidden">
                <span className="px-2 py-1.5 bg-[#161617] border-r border-white/10 text-neutral-400">
                  <Mail className="w-3.5 h-3.5" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@talento.com"
                  className="w-full px-2.5 py-1.5 text-xs outline-none"
                />
              </div>
            </div>

            {/* Idioma */}
            <div className="grid grid-cols-12 items-center gap-2">
              <label className="col-span-4 text-xs text-neutral-400">Idioma</label>
              <div className="col-span-8">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-[#1c1c1e] border border-white/10 rounded-xs outline-none focus:border-[#880E1B]"
                >
                  <option value="Português">Português</option>
                  <option value="English">English</option>
                  <option value="Español">Español</option>
                </select>
              </div>
            </div>

            {/* Assunto */}
            <div className="grid grid-cols-12 items-center gap-2">
              <label className="col-span-4 text-xs text-neutral-400">
                Assunto
              </label>
              <div className="col-span-8">
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-white/10 rounded-xs outline-none focus:border-[#880E1B]"
                />
              </div>
            </div>

            {/* Message */}
            <div className="grid grid-cols-12 items-start gap-2">
              <label className="col-span-4 text-xs text-neutral-400 pt-1.5">
                Message
              </label>
              <div className="col-span-8">
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-white/10 rounded-xs outline-none focus:border-[#880E1B]"
                />
              </div>
            </div>
          </div>

          {/* Rodapé do Modal */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-medium text-neutral-400 hover:text-white uppercase cursor-pointer"
            >
              CANCELAR
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#880E1B] hover:bg-[#a31121] text-white text-xs font-bold uppercase rounded-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>ENVIAR</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/**
 * Modal "CompoMake" (Fiel à Imagem 09 `09_comomake.png`)
 */
export function CompoMakeModal({ isOpen, onClose, initialTalentName = '' }) {
  const [talentQuery, setTalentQuery] = useState(initialTalentName || 'Sophia Évora');
  const [template, setTemplate] = useState('Compomake Trial');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#1c1c1e] rounded-sm shadow-2xl w-full max-w-md border border-white/10 overflow-hidden">
        <div className="relative px-6 py-4 flex items-center justify-center border-b border-white/10">
          <div className="flex items-baseline gap-2">
            <h2 className="text-xl font-normal text-white">CompoMake</h2>
            <span className="text-[10px] font-semibold text-[#E8AC51] uppercase tracking-wider">
              TUTORIAL
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 flex flex-col sm:flex-row items-center gap-6">
          {/* Ícone Grande Azul de Layout de Composite */}
          <div className="w-36 h-28 bg-[#880E1B] rounded-md flex items-center justify-center text-white shrink-0 shadow-sm">
            <LayoutGrid className="w-20 h-20 stroke-[1.5]" />
          </div>

          <div className="flex-1 w-full space-y-3">
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1">
                Selecione um talento
              </label>
              <input
                type="text"
                value={talentQuery}
                onChange={(e) => setTalentQuery(e.target.value)}
                placeholder="Pesquisar Talento..."
                className="w-full px-3 py-1.5 text-xs border border-white/10 rounded-xs outline-none focus:border-[#880E1B]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1">
                Selecionar um desenho
              </label>
              <select
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-[#1c1c1e] border border-white/10 rounded-xs outline-none focus:border-[#880E1B]"
              >
                <option value="Compomake Trial">Compomake Trial</option>
                <option value="Évora Classic 5 Fotos">Évora Classic 5 Fotos</option>
                <option value="Editorial High Fashion">Editorial High Fashion</option>
              </select>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-[#161617] border-t border-white/10 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1c1c1e] hover:bg-[#1c1c1e] text-white text-xs font-semibold uppercase rounded-xs cursor-pointer"
          >
            FECHAR
          </button>
          <button
            type="button"
            onClick={() => {
              console.log('🎨 [CompoMake Iniciado]:', { talentQuery, template });
              onClose();
            }}
            className="px-4 py-1.5 bg-[#E8AC51] hover:bg-[#d99b3f] text-white text-xs font-semibold uppercase rounded-xs cursor-pointer"
          >
            CRIAR
          </button>
        </div>
      </div>
    </div>
  );
}

