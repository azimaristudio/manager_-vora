import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { auth } from '../firebaseConfig'

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [show, setShow] = useState(false)
  const [remember, setRemember] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await signInWithEmailAndPassword(auth, email, password)
      onLoginSuccess?.()
      navigate('/talentos')
    } catch (err) {
      setError('E-mail ou senha incorretos. Tente novamente.')
    }
  }

  const field =
    'flex items-center gap-3 h-14 px-4 rounded-2xl bg-[#1c1c1c] border border-neutral-600 focus-within:border-[#d9ae5f]/60 transition-colors'
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#121212] text-white">
      <div className="relative hidden md:block overflow-hidden bg-[radial-gradient(ellipse_at_50%_35%,#5a4825_0%,#1d1711_55%,#121212_100%)]">
        <div className="absolute top-10 left-9 pl-5 border-l border-[#d9ae5f]/50">
          <div className="serif text-4xl tracking-[0.25em]">POSE</div>
          <div className="serif text-sm tracking-[0.4em] text-[#d9ae5f]/80 mt-1">MANAGER</div>
        </div>
        <img src="/model.png" alt="Modelo" className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[88%] max-w-none object-contain" />
        <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-r from-transparent to-[#121212]" />
      </div>

      <div className="relative flex flex-col items-center justify-center px-6 py-10 bg-[radial-gradient(ellipse_at_90%_90%,#2a2013_0%,#121212_55%)]">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-[492px] rounded-3xl border border-[#d9ae5f]/50 bg-black/60 backdrop-blur-xl p-12 shadow-[0_0_80px_rgba(217,174,95,0.08)]"
        >
          <div className="text-center mb-10">
            <div className="serif text-6xl text-[#d9ae5f] font-medium tracking-wide">ÉVORA</div>
            <div className="flex items-center justify-center gap-4 mt-1">
              <span className="h-px w-12 bg-[#d9ae5f]/70" />
              <span className="text-[11px] tracking-[0.4em] text-[#d9ae5f]">MODELS</span>
              <span className="h-px w-12 bg-[#d9ae5f]/70" />
            </div>
          </div>

          <div className="space-y-4">
            <label className={field}>
              <Mail size={16} className="text-[#d9ae5f]" />
              <input
                type="email"
                placeholder="Endereço de e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent outline-none placeholder:text-white/50 text-sm"
              />
            </label>
            <label className={field}>
              <Lock size={16} className="text-[#d9ae5f]" />
              <input
                type={show ? 'text' : 'password'}
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 bg-transparent outline-none placeholder:text-white/50 text-sm"
              />
              <button type="button" onClick={() => setShow(!show)} aria-label="Mostrar senha" className="text-[#d9ae5f]">
                {show ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </label>
          </div>

          <div className="flex items-center justify-between mt-5 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="size-5 appearance-none rounded-md border border-white/30 bg-transparent checked:bg-[#d9ae5f] checked:border-[#d9ae5f]" />
              Lembrar de mim
            </label>
            <a href="#" className="text-[#e0b35f] underline underline-offset-4">Esqueceu sua senha?</a>
          </div>

          <button className="mt-8 w-full h-16 rounded-2xl font-bold tracking-[0.3em] text-white bg-[#880E1B] hover:bg-[#a31121] hover:ring-2 hover:ring-[#d9ae5f] transition-all duration-300 ease-in-out">
            ENTRAR
          </button>
        </form>
        <footer className="mt-10 w-full max-w-[492px] text-xs">
          <div className="flex flex-col md:flex-row md:justify-between gap-8">
            <div className="space-y-1.5">
              <h3 className="serif text-sm tracking-[0.25em] text-[#d9ae5f]/70 mb-2">POSE MANAGER</h3>
              <p><a href="mailto:usepose@posemanager.com" className="text-neutral-300 hover:text-[#d9ae5f] transition-colors">usepose@posemanager.com</a></p>
              <p><a href="tel:+5581981011403" className="text-neutral-300 hover:text-[#d9ae5f] transition-colors">(81) 98101-1403</a></p>
            </div>
            <div className="space-y-1.5 md:text-right">
              <h3 className="serif text-sm tracking-[0.25em] text-[#d9ae5f]/70 mb-2">AZIMARI GROUP</h3>
              <p><a href="https://azimarigroup.com" target="_blank" rel="noreferrer" className="text-neutral-300 hover:text-[#d9ae5f] transition-colors">azimarigroup.com</a></p>
              <p><a href="mailto:azimaristudio@azimarigroup.com" className="text-neutral-300 hover:text-[#d9ae5f] transition-colors">azimaristudio@azimarigroup.com</a></p>
              <p><a href="tel:+5581981011403" className="text-neutral-300 hover:text-[#d9ae5f] transition-colors">(81) 98101-1403</a></p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-white/80">© 2026 Pose Manager. Todos os direitos reservados.</p>
            <p className="mt-2 text-[10px] tracking-[0.3em] text-white/35">POWERED BY AZIMARI GROUP</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
