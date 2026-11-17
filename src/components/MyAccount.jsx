import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Folder,
  ChevronDown,
  Globe,
  CheckCircle2,
  X,
} from 'lucide-react';

export default function MyAccount() {
  // Estados da Coluna Central (Dados Pessoais)
  const [userName, setUserName] = useState('Mozart de Marias');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [role, setRole] = useState('Booker');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('mozartdemarias@gmail.com');
  const [password, setPassword] = useState('••••••');
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [defaultSection, setDefaultSection] = useState('Contatos');

  // Estados da Coluna Direita (Contactos)
  const [phone, setPhone] = useState('');
  const [mobile, setMobile] = useState('');
  const [skype, setSkype] = useState('');
  const [facebook, setFacebook] = useState('');
  const [twitter, setTwitter] = useState('');

  // Avatar preview opcional
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [savedToast, setSavedToast] = useState(false);

  const fileInputRef = useRef(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setAvatarUrl(preview);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#161617] flex flex-col justify-between py-4 px-4 sm:px-8">
      {/* Feedback visual discreto ao salvar */}
      {savedToast && (
        <div className="fixed top-20 right-6 z-50 bg-[#1c1c1e] text-white px-4 py-3 rounded-xs shadow-xl border-l-4 border-[#880E1B] flex items-center gap-2.5 text-xs">
          <CheckCircle2 className="w-4 h-4 text-[#E8AC51] shrink-0" />
          <span>Alterações da conta salvas (simulado).</span>
          <button
            type="button"
            onClick={() => setSavedToast(false)}
            className="text-neutral-400 hover:text-white ml-2 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <div className="max-w-[1160px] w-full mx-auto">
        {/* Topo: Breadcrumb 'Início > Minha Conta' */}
        <div className="bg-[#161617] border border-white/10 rounded-xs px-4 py-3 flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-1.5 text-xs">
            <Link
              to="/"
              className="text-[#E8AC51] hover:underline font-normal"
            >
              Início
            </Link>
            <span className="text-neutral-400">&gt;</span>
            <span className="text-neutral-400 font-normal">Minha Conta</span>
          </div>
        </div>

        {/* Aba / Título 'Minha Conta' com ícone e linha horizontal separadora */}
        <div className="border-b border-white/10 flex items-end mb-7">
          <div className="bg-[#1c1c1e] border border-b-[#1c1c1e] border-white/10 -mb-px px-4 py-2.5 rounded-t-xs inline-flex items-center gap-2 text-xs text-neutral-400">
            <span className="w-6 h-6 rounded-full bg-[#1c1c1e] text-white flex items-center justify-center shrink-0">
              <User className="w-3.5 h-3.5 fill-white" />
            </span>
            <span>Minha Conta</span>
          </div>
        </div>

        {/* Estrutura Principal (3 Colunas: Avatar, Dados Pessoais, Contactos) */}
        <form onSubmit={handleSave}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start px-2 sm:px-8">
            {/* Coluna Esquerda (Avatar) */}
            <div className="lg:col-span-3 flex flex-col items-center pt-1">
              <div className="w-36 h-36 rounded-[28px] bg-[#880E1B] flex items-center justify-center overflow-hidden shadow-xs">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg
                    viewBox="0 0 120 120"
                    className="w-24 h-24 text-white fill-current"
                  >
                    <circle cx="60" cy="42" r="20" />
                    <path d="M24 98 C24 74, 96 74, 96 98 Z" />
                  </svg>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-3.5 h-8 px-3.5 bg-[#E8AC51] hover:bg-[#d99b3f] text-white text-[10px] font-semibold uppercase rounded-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Folder className="w-3.5 h-3.5 fill-white text-white" />
                <span>UPLOAD AVATAR</span>
              </button>
            </div>

            {/* Coluna Central (Dados Pessoais) */}
            <div className="lg:col-span-5 space-y-2.5 text-[11px]">
              {/* Plano */}
              <div className="grid grid-cols-12 items-center gap-3 min-h-[28px]">
                <label className="col-span-4 text-right text-neutral-400">
                  Plano
                </label>
                <div className="col-span-8 flex items-center gap-1.5 text-xs">
                  <strong className="font-bold text-white">
                    Premium Plus
                  </strong>
                  <button
                    type="button"
                    className="text-[11px] text-[#E8AC51] underline cursor-pointer"
                  >
                    [Trocar]
                  </button>
                </div>
              </div>

              {/* Nome de Usuário */}
              <div className="grid grid-cols-12 items-center gap-3">
                <label className="col-span-4 text-right text-neutral-400">
                  Nome de Usuário
                </label>
                <div className="col-span-8">
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full max-w-[235px] h-8 px-2.5 bg-[#1c1c1e] border border-white/10 rounded-xs text-xs font-bold text-white focus:outline-none focus:border-[#880E1B]"
                  />
                </div>
              </div>

              {/* Data de Nascimento */}
              <div className="grid grid-cols-12 items-center gap-3">
                <label className="col-span-4 text-right text-neutral-400">
                  Data de Nascimento
                </label>
                <div className="col-span-8">
                  <input
                    type="text"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    placeholder="Data de Nascimento"
                    className="w-full max-w-[235px] h-8 px-2.5 bg-[#1c1c1e] border border-white/10 rounded-xs text-xs text-white placeholder:text-neutral-400 focus:outline-none focus:border-[#880E1B]"
                  />
                </div>
              </div>

              {/* Gênero */}
              <div className="grid grid-cols-12 items-center gap-3">
                <label className="col-span-4 text-right text-neutral-400">
                  Gênero
                </label>
                <div className="col-span-8">
                  <div className="relative w-full max-w-[235px]">
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full h-8 px-2.5 pr-7 bg-[#1c1c1e] border border-white/10 rounded-xs text-xs font-bold text-white appearance-none focus:outline-none focus:border-[#880E1B]"
                    >
                      <option value="">selecione um gênero</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Feminino">Feminino</option>
                      <option value="Outro">Outro</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Cargo */}
              <div className="grid grid-cols-12 items-center gap-3">
                <label className="col-span-4 text-right text-neutral-400">
                  Cargo
                </label>
                <div className="col-span-8">
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full max-w-[235px] h-8 px-2.5 bg-[#1c1c1e] border border-white/10 rounded-xs text-xs font-bold text-white focus:outline-none focus:border-[#880E1B]"
                  />
                </div>
              </div>

              {/* Departamento */}
              <div className="grid grid-cols-12 items-center gap-3">
                <label className="col-span-4 text-right text-neutral-400">
                  Departamento
                </label>
                <div className="col-span-8">
                  <div className="relative w-full max-w-[235px]">
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full h-8 px-2.5 pr-7 bg-[#1c1c1e] border border-white/10 rounded-xs text-xs font-bold text-white appearance-none focus:outline-none focus:border-[#880E1B]"
                    >
                      <option value="">Faça uma seleção</option>
                      <option value="Comercial">Comercial</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Editorial">Editorial</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="grid grid-cols-12 items-center gap-3">
                <label className="col-span-4 text-right text-neutral-400">
                  Email
                </label>
                <div className="col-span-8">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full max-w-[235px] h-8 px-2.5 bg-[#1c1c1e] border border-white/10 rounded-xs text-xs font-bold text-white focus:outline-none focus:border-[#880E1B]"
                  />
                </div>
              </div>

              {/* Senha */}
              <div className="grid grid-cols-12 items-center gap-3 min-h-[28px]">
                <label className="col-span-4 text-right text-neutral-400">
                  Senha
                </label>
                <div className="col-span-8 flex items-center gap-2">
                  {isEditingPassword ? (
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-36 h-7 px-2 border border-white/10 rounded-xs text-xs text-white focus:outline-none focus:border-[#880E1B]"
                    />
                  ) : (
                    <span className="text-xs font-bold text-white tracking-wider">
                      ••••••
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsEditingPassword((prev) => !prev)}
                    className="text-[11px] text-[#E8AC51] underline cursor-pointer"
                  >
                    Trocar
                  </button>
                </div>
              </div>

              {/* Tipo de Conta */}
              <div className="grid grid-cols-12 items-center gap-3 pt-2 min-h-[28px]">
                <label className="col-span-4 text-right text-neutral-400">
                  Tipo de Conta
                </label>
                <div className="col-span-8">
                  <strong className="text-xs font-bold text-white">
                    User
                  </strong>
                </div>
              </div>

              {/* Seção padrão */}
              <div className="grid grid-cols-12 items-center gap-3">
                <label className="col-span-4 text-right text-neutral-400">
                  Seção padrão
                </label>
                <div className="col-span-8">
                  <div className="relative w-full max-w-[235px]">
                    <select
                      value={defaultSection}
                      onChange={(e) => setDefaultSection(e.target.value)}
                      className="w-full h-8 px-2.5 pr-7 bg-[#1c1c1e] border border-white/10 rounded-xs text-xs font-bold text-white appearance-none focus:outline-none focus:border-[#880E1B]"
                    >
                      <option value="Contatos">Contatos</option>
                      <option value="Talentos">Talentos</option>
                      <option value="Webmail">Webmail</option>
                      <option value="Projetos">Projetos</option>
                      <option value="Calendário">Calendário</option>
                      <option value="Pacotes">Pacotes</option>
                      <option value="Estatísticas">Estatísticas</option>
                      <option value="Contabilidade">Contabilidade</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Coluna Direita (Contactos: Telefone, Celular, Skype, Facebook, Twitter) */}
            <div className="lg:col-span-4 space-y-2.5 text-[11px]">
              {/* Telefone */}
              <div className="grid grid-cols-12 items-center gap-3">
                <label className="col-span-3 text-right text-neutral-400">
                  Telefone
                </label>
                <div className="col-span-9">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full max-w-[235px] h-8 px-2.5 bg-[#1c1c1e] border border-white/10 rounded-xs text-xs text-white focus:outline-none focus:border-[#880E1B]"
                  />
                </div>
              </div>

              {/* Celular */}
              <div className="grid grid-cols-12 items-center gap-3">
                <label className="col-span-3 text-right text-neutral-400">
                  Celular
                </label>
                <div className="col-span-9">
                  <input
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full max-w-[235px] h-8 px-2.5 bg-[#1c1c1e] border border-white/10 rounded-xs text-xs text-white focus:outline-none focus:border-[#880E1B]"
                  />
                </div>
              </div>

              {/* Skype */}
              <div className="grid grid-cols-12 items-center gap-3">
                <label className="col-span-3 text-right text-neutral-400">
                  Skype
                </label>
                <div className="col-span-9">
                  <input
                    type="text"
                    value={skype}
                    onChange={(e) => setSkype(e.target.value)}
                    className="w-full max-w-[235px] h-8 px-2.5 bg-[#1c1c1e] border border-white/10 rounded-xs text-xs text-white focus:outline-none focus:border-[#880E1B]"
                  />
                </div>
              </div>

              {/* Facebook */}
              <div className="grid grid-cols-12 items-center gap-3">
                <label className="col-span-3 text-right text-neutral-400">
                  Facebook
                </label>
                <div className="col-span-9">
                  <input
                    type="text"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                    className="w-full max-w-[235px] h-8 px-2.5 bg-[#1c1c1e] border border-white/10 rounded-xs text-xs text-white focus:outline-none focus:border-[#880E1B]"
                  />
                </div>
              </div>

              {/* Twitter */}
              <div className="grid grid-cols-12 items-center gap-3">
                <label className="col-span-3 text-right text-neutral-400">
                  Twitter
                </label>
                <div className="col-span-9">
                  <input
                    type="text"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    className="w-full max-w-[235px] h-8 px-2.5 bg-[#1c1c1e] border border-white/10 rounded-xs text-xs text-white focus:outline-none focus:border-[#880E1B]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Rodapé de Ações: Linha separadora e botão azul 'SALVAR ALTERAÇÕES' alinhado à direita */}
          <div className="mt-7 pt-4 border-t border-white/10 flex justify-end">
            <button
              type="submit"
              className="h-8 px-3.5 bg-[#880E1B] hover:bg-[#a31121] text-white text-[10px] font-semibold uppercase rounded-xs transition-colors cursor-pointer"
            >
              SALVAR ALTERAÇÕES
            </button>
          </div>
        </form>
      </div>

      {/* Rodapé Padrão Évora Models */}
      <footer className="mt-6 pb-6 text-center space-y-2 text-xs text-neutral-400">
        <div className="flex items-center justify-center gap-4">
          <span className="inline-flex items-center gap-1.5 text-neutral-400">
            <Globe className="w-3.5 h-3.5" />
            <span>Idiomas</span>
          </span>
          <button
            type="button"
            className="text-[#E8AC51] underline font-normal text-[11px] uppercase cursor-pointer"
          >
            ENGLISH
          </button>
          <button
            type="button"
            className="text-[#E8AC51] hover:underline font-normal text-[11px] uppercase cursor-pointer"
          >
            ESPAÑOL
          </button>
          <button
            type="button"
            className="text-[#E8AC51] hover:underline font-normal text-[11px] uppercase cursor-pointer"
          >
            PORTUGUÊS
          </button>
        </div>
        <p className="text-neutral-400 text-xs">© Évora Models</p>
      </footer>
    </div>
  );
}

