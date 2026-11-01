import React, { useState, useRef } from 'react';
import {
  Send,
  Save,
  Check,
  Search,
  Paperclip,
  Package,
  Bold,
  Italic,
  Underline,
  Eraser,
  Strikethrough,
  Superscript,
  List,
  ListOrdered,
  AlignLeft,
  Image as ImageIcon,
  Link2,
  ChevronDown,
  X,
} from 'lucide-react';

export default function NewEmail({ onSendEmail, onSaveDraft }) {
  const fileInputRef = useRef(null);

  const [oneByOneMode, setOneByOneMode] = useState(true);
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('Hi /*contact_name*/,');
  const [attachments, setAttachments] = useState([]);
  const [fontSize, setFontSize] = useState('11');
  const [fontFamily, setFontFamily] = useState('HELVETICA NEUE');

  const handleAttachFile = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setAttachments((prev) => [
        ...prev,
        ...files.map((f) => ({ id: Date.now() + Math.random(), name: f.name, type: 'file' })),
      ]);
    }
    e.target.value = '';
  };

  const handleAttachPackage = () => {
    setAttachments((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: 'Casting_Evora_Models_Package.pdf',
        type: 'package',
      },
    ]);
  };

  const handleSend = (e) => {
    e.preventDefault();
    const payload = {
      id: `mail_${Date.now()}`,
      to: to.trim() || 'cliente@agencia.com',
      subject: subject.trim() || 'Casting Évora Models',
      body,
      oneByOneMode,
      attachments,
      date: new Date().toLocaleDateString('pt-BR'),
    };
    console.log('📨 [NewEmail] Email enviado (Simulado):', payload);
    if (onSendEmail) {
      onSendEmail(payload);
    }
  };

  const handleSave = () => {
    const payload = {
      id: `draft_${Date.now()}`,
      to: to.trim() || '(Rascunho sem destinatário)',
      subject: subject.trim() || '(Sem assunto)',
      body,
      oneByOneMode,
      attachments,
      date: new Date().toLocaleDateString('pt-BR'),
    };
    console.log('💾 [NewEmail] Rascunho salvo (Simulado):', payload);
    if (onSaveDraft) {
      onSaveDraft(payload);
    }
  };

  return (
    <form
      onSubmit={handleSend}
      className="border border-slate-200 rounded-xs bg-white overflow-hidden shadow-2xs select-none"
    >
      {/* 1. Cabeçalho de Ações: SEND, SAVE e Toggle "One by One Mode: YES" */}
      <div className="bg-[#f4f5f7] border-b border-slate-200 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="px-3.5 py-2 bg-[#0077b5] hover:bg-[#006399] active:scale-[0.99] text-white text-[11px] font-semibold uppercase tracking-wider rounded-xs flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 fill-white" />
            <span>SEND</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-3 py-2 bg-[#0077b5]/10 hover:bg-[#0077b5]/20 text-[#0077b5] text-[11px] font-semibold uppercase tracking-wider rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>SAVE</span>
          </button>
        </div>

        {/* Toggle "One by One Mode" */}
        <div className="flex items-center gap-2.5">
          <span className="text-xs text-slate-500">One by One Mode</span>
          <button
            type="button"
            onClick={() => setOneByOneMode((prev) => !prev)}
            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase flex items-center gap-1.5 transition-colors cursor-pointer ${
              oneByOneMode
                ? 'bg-[#0077b5] text-white'
                : 'bg-slate-300 text-slate-600'
            }`}
          >
            <span>{oneByOneMode ? 'YES' : 'NO'}</span>
            {oneByOneMode && <Check className="w-3 h-3 stroke-[3]" />}
          </button>
        </div>
      </div>

      {/* 2. Formulário: To, Subject, Attach e Editor Rich Text */}
      <div className="p-6 space-y-3.5">
        {/* Campo To */}
        <div className="grid grid-cols-12 items-center gap-3">
          <label className="col-span-2 sm:col-span-1 text-right text-[11px] text-slate-400">
            To
          </label>
          <div className="col-span-10 sm:col-span-11 flex items-center gap-2">
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder=""
              className="flex-1 px-3 py-1.5 text-xs text-slate-700 bg-white border border-slate-200 rounded-xs outline-none focus:border-[#0077b5]"
            />
            <button
              type="button"
              onClick={() =>
                setTo((prev) =>
                  prev
                    ? `${prev}, casting@evoramodels.com`
                    : 'sophia.evora@evoramodels.com'
                )
              }
              title="Buscar Contato / Talento"
              className="p-2 bg-[#eaecef] hover:bg-slate-300/70 border border-slate-200 text-slate-600 rounded-xs transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Campo Subject */}
        <div className="grid grid-cols-12 items-center gap-3">
          <label className="col-span-2 sm:col-span-1 text-right text-[11px] text-slate-400">
            Subject
          </label>
          <div className="col-span-10 sm:col-span-11">
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-1.5 text-xs text-slate-700 bg-white border border-slate-200 rounded-xs outline-none focus:border-[#0077b5]"
            />
          </div>
        </div>

        {/* Linha Attach: File & Package */}
        <div className="grid grid-cols-12 items-center gap-3 pt-0.5">
          <label className="col-span-2 sm:col-span-1 text-right text-[11px] text-slate-400">
            Attach
          </label>
          <div className="col-span-10 sm:col-span-11 flex flex-wrap items-center gap-4">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleAttachFile}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-[#0077b5] transition-colors cursor-pointer"
            >
              <Paperclip className="w-3.5 h-3.5 text-slate-700" />
              <span>File</span>
            </button>

            <button
              type="button"
              onClick={handleAttachPackage}
              className="inline-flex items-center gap-1 text-xs text-[#0077b5] hover:underline transition-colors cursor-pointer"
            >
              <Package className="w-3.5 h-3.5 text-[#0077b5]" />
              <span>Package</span>
            </button>

            {/* Chips de anexos selecionados */}
            {attachments.map((att) => (
              <span
                key={att.id}
                className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-sky-50 text-[#0077b5] border border-sky-200 rounded-xs text-[11px]"
              >
                <span>{att.name}</span>
                <button
                  type="button"
                  onClick={() =>
                    setAttachments((prev) =>
                      prev.filter((item) => item.id !== att.id)
                    )
                  }
                  className="hover:text-red-500 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Editor Rich Text (Fiel à Imagem 19) */}
        <div className="grid grid-cols-12 gap-3 pt-1">
          <div className="hidden sm:block sm:col-span-1" />
          <div className="col-span-12 sm:col-span-11 space-y-2">
            {/* Barra de Ferramentas do Editor */}
            <div className="flex flex-wrap items-center gap-1.5">
              {/* Bloco 1: Formatação Básica */}
              <div className="inline-flex items-center bg-[#eaecef] border border-slate-200/90 rounded-xs overflow-hidden">
                <button
                  type="button"
                  title="Bold"
                  className="p-1.5 hover:bg-slate-300/60 text-slate-700 cursor-pointer"
                >
                  <Bold className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  title="Italic"
                  className="p-1.5 hover:bg-slate-300/60 text-slate-700 border-l border-slate-200 cursor-pointer"
                >
                  <Italic className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  title="Underline"
                  className="p-1.5 hover:bg-slate-300/60 text-slate-700 border-l border-slate-200 cursor-pointer"
                >
                  <Underline className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  title="Clear Formatting"
                  className="p-1.5 hover:bg-slate-300/60 text-slate-700 border-l border-slate-200 cursor-pointer"
                >
                  <Eraser className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  title="Strikethrough"
                  className="p-1.5 hover:bg-slate-300/60 text-slate-700 border-l border-slate-200 cursor-pointer"
                >
                  <Strikethrough className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  title="Superscript"
                  className="p-1.5 hover:bg-slate-300/60 text-slate-700 border-l border-slate-200 cursor-pointer"
                >
                  <Superscript className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Bloco 2: Tamanho da Fonte */}
              <select
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="px-2 py-1 text-[11px] bg-[#eaecef] border border-slate-200/90 rounded-xs text-slate-700 outline-none cursor-pointer"
              >
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="14">14</option>
                <option value="16">16</option>
              </select>

              {/* Bloco 3: Família da Fonte */}
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                className="px-2 py-1 text-[11px] bg-[#eaecef] border border-slate-200/90 rounded-xs text-slate-700 uppercase outline-none cursor-pointer"
              >
                <option value="HELVETICA NEUE">HELVETICA NEUE</option>
                <option value="ARIAL">ARIAL</option>
                <option value="GEORGIA">GEORGIA</option>
              </select>

              {/* Bloco 4: Cor do Texto */}
              <button
                type="button"
                title="Text Color"
                className="px-2 py-1 bg-[#eaecef] hover:bg-slate-300/60 border border-slate-200/90 rounded-xs flex items-center gap-1 text-[11px] font-bold text-slate-800 cursor-pointer"
              >
                <span className="bg-yellow-300 px-1 leading-tight">A</span>
                <ChevronDown className="w-2.5 h-2.5 text-slate-500" />
              </button>

              {/* Bloco 5: Listas e Alinhamento */}
              <div className="inline-flex items-center bg-[#eaecef] border border-slate-200/90 rounded-xs overflow-hidden">
                <button
                  type="button"
                  title="Bullet List"
                  className="p-1.5 hover:bg-slate-300/60 text-slate-700 cursor-pointer"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  title="Numbered List"
                  className="p-1.5 hover:bg-slate-300/60 text-slate-700 border-l border-slate-200 cursor-pointer"
                >
                  <ListOrdered className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  title="Alignment"
                  className="p-1.5 hover:bg-slate-300/60 text-slate-700 border-l border-slate-200 flex items-center gap-0.5 cursor-pointer"
                >
                  <AlignLeft className="w-3.5 h-3.5" />
                  <ChevronDown className="w-2.5 h-2.5" />
                </button>
              </div>

              {/* Bloco 6: Espaçamento entre linhas */}
              <button
                type="button"
                title="Line Height"
                className="px-2 py-1 bg-[#eaecef] hover:bg-slate-300/60 border border-slate-200/90 rounded-xs flex items-center gap-0.5 text-[11px] font-serif text-slate-700 cursor-pointer"
              >
                <span>TI</span>
                <ChevronDown className="w-2.5 h-2.5" />
              </button>

              {/* Bloco 7: Imagem e Link */}
              <div className="inline-flex items-center bg-[#eaecef] border border-slate-200/90 rounded-xs overflow-hidden">
                <button
                  type="button"
                  title="Insert Image"
                  className="p-1.5 hover:bg-slate-300/60 text-slate-700 cursor-pointer"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  title="Insert Link"
                  className="p-1.5 hover:bg-slate-300/60 text-slate-700 border-l border-slate-200 cursor-pointer"
                >
                  <Link2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Área de Texto Grande pré-preenchida com a variável de contato */}
            <div className="border border-slate-200 rounded-xs overflow-hidden">
              <textarea
                rows={16}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full p-3 text-xs text-slate-700 bg-white outline-none resize-y leading-relaxed font-sans"
              />
              <div className="bg-[#f8f9fa] border-t border-slate-200 h-2.5 flex items-center justify-center">
                <span className="w-4 h-0.5 border-y border-slate-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
