import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Instagram, ArrowRight } from 'lucide-react';

export default function Login({ onLoginSuccess }) {
  const [lang, setLang] = useState('PT');
  const [email, setEmail] = useState('contato@evoramodels.com.br');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLoginSuccess) {
      onLoginSuccess();
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-gradient-to-br from-[#026aa7] via-[#1b8cc4] to-[#cce7f5] font-sans select-none">
      {/* Área Esquerda: Branding "10 YEARS MF" modernizada */}
      <div className="relative flex-1 flex flex-col items-center justify-center p-10 lg:p-16 overflow-hidden min-h-[260px] lg:min-h-screen">
        {/* Efeitos de iluminação de fundo sutis */}
        <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-12 right-12 w-80 h-80 rounded-full bg-sky-300/20 blur-3xl" />

        <div className="relative z-10 flex flex-col items-start">
          <div className="flex items-baseline tracking-tighter leading-none">
            <span
              className="text-7xl sm:text-8xl lg:text-[108px] font-light text-transparent mr-1"
              style={{
                WebkitTextStroke: '2.5px rgba(255, 255, 255, 0.92)',
              }}
            >
              10
            </span>
            <span className="text-7xl sm:text-8xl lg:text-[108px] font-extrabold text-white tracking-tight drop-shadow-sm">
              MF
            </span>
          </div>
          <span className="text-xl sm:text-2xl lg:text-[26px] font-medium tracking-[0.26em] text-white/80 -mt-2 ml-1.5">
            YEARS
          </span>
          <p className="mt-6 text-xs sm:text-sm text-white/75 max-w-xs tracking-wide font-light">
            Plataforma integrada de agenciamento artístico, casting e gestão financeira para agências de talentos.
          </p>
        </div>
      </div>

      {/* Painel Direito: Card Vertical Clean de Autenticação */}
      <div className="w-full lg:w-[430px] xl:w-[460px] lg:mr-20 bg-white/95 backdrop-blur-md shadow-2xl flex flex-col justify-between px-8 sm:px-12 py-8 min-h-[calc(100vh-260px)] lg:min-h-screen border-l border-white/40">
        {/* Seletor de Idiomas (EN / ES / PT) */}
        <div className="flex justify-center items-center gap-1.5 text-xs tracking-widest font-semibold text-slate-400">
          {['EN', 'ES', 'PT'].map((item, index) => (
            <React.Fragment key={item}>
              <button
                type="button"
                onClick={() => setLang(item)}
                className={`cursor-pointer transition-colors px-1 py-0.5 rounded ${
                  lang === item
                    ? 'text-[#0077b5] font-bold'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {item}
              </button>
              {index < 2 && <span className="text-slate-300">/</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Bloco Central: Avatar + Formulário */}
        <div className="my-auto py-8 flex flex-col items-center w-full">
          {/* Ícone de Avatar circular inspirado no original */}
          <div className="relative mb-10 group">
            <div className="w-28 h-28 rounded-full p-1.5 border-2 border-[#0077b5] shadow-md bg-white flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#0487cc] to-[#006da8] flex items-end justify-center overflow-hidden">
                <User className="w-20 h-20 text-white fill-white translate-y-2.5" />
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            {/* Campo de E-mail */}
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ENDEREÇO EMAIL"
                aria-label="Endereço de Email"
                required
                className="w-full pl-10 pr-4 py-3.5 bg-slate-100/90 hover:bg-slate-200/60 focus:bg-white text-slate-700 placeholder:text-slate-400 text-xs font-medium tracking-wider text-center rounded-md border border-transparent focus:border-[#0077b5] focus:ring-3 focus:ring-[#0077b5]/15 outline-none transition-all"
              />
            </div>

            {/* Campo de Senha */}
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="SENHA"
                aria-label="Senha"
                required
                className="w-full pl-10 pr-10 py-3.5 bg-slate-100/90 hover:bg-slate-200/60 focus:bg-white text-slate-700 placeholder:text-slate-400 text-xs font-medium tracking-wider text-center rounded-md border border-transparent focus:border-[#0077b5] focus:ring-3 focus:ring-[#0077b5]/15 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                title={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Botão Entrar */}
            <div className="pt-3 flex flex-col items-center space-y-4">
              <button
                type="submit"
                className="w-56 py-3 px-6 bg-[#0077b5] hover:bg-[#006399] active:scale-[0.99] text-white text-xs font-semibold tracking-widest uppercase rounded shadow-md hover:shadow-lg shadow-[#0077b5]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>ENTRAR</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                className="text-[11px] font-medium tracking-wider uppercase text-slate-400 hover:text-[#0077b5] transition-colors cursor-pointer"
              >
                ESQUECI MINHA SENHA
              </button>
            </div>
          </form>
        </div>

        {/* Rodapé: Instagram + Copyright */}
        <div className="flex flex-col items-center space-y-1.5 text-slate-400 pt-4 border-t border-slate-100">
          <a
            href="#instagram"
            onClick={(e) => e.preventDefault()}
            className="flex flex-col items-center gap-1 hover:text-[#0077b5] transition-colors"
          >
            <Instagram className="w-4 h-4 stroke-[1.75]" />
            <span className="text-[11px] tracking-wide">@manager.fashion.brazil</span>
          </a>
          <span className="text-[10px] tracking-widest uppercase text-slate-300 pt-1">
            ©MANAGERFASHION
          </span>
        </div>
      </div>
    </div>
  );
}

