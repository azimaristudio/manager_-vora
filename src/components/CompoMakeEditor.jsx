import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Move,
  Crop,
  ZoomIn,
  ZoomOut,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  RotateCw,
  MoveHorizontal,
  MoveVertical,
  RefreshCw,
  CheckCircle2,
  Eye,
  X,
} from 'lucide-react';

const INITIAL_SELECTED_ATTRS = [
  { id: 'altura', label: 'Altura', value: '180/5\'11"' },
  { id: 'olhos', label: 'Olhos', value: 'Avelãs' },
  { id: 'cabelo', label: 'Cabelo', value: 'Loiro' },
  { id: 'manequim', label: 'Manequim', value: '32x4.5 BR' },
  { id: 'sapato', label: 'Sapato', value: '36.5/35.5 BR' },
];

const INITIAL_AVAILABLE_ATTRS = [
  { id: 'nacionalidade', label: 'Nacionalidade', value: 'Brasil' },
  { id: 'peso', label: 'Peso', value: '15/33.1' },
  { id: 'coloracao', label: 'Coloração', value: 'natural' },
  { id: 'tipo_cabelo', label: 'Tipo de cabelo', value: 'Liso' },
  { id: 'nascimento', label: 'Data de Nascimento', value: '05/04/2004' },
  { id: 'residencia', label: 'Residencia', value: 'Recife' },
  { id: 'idiomas', label: 'Idiomas', value: 'Inglês Avançado / Português Nativo' },
];

export default function CompoMakeEditor() {
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Nome do talento vindo da navegação do modal ou padrão 'sophia évora'
  const talentName =
    location.state?.talent?.name?.toLowerCase() || 'sophia évora';

  // Estados de transformação interativa do Canvas
  const [activeTool, setActiveTool] = useState('move'); // 'move' | 'crop'
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [flip, setFlip] = useState({ x: 1, y: 1 });
  const [importedImageUrl, setImportedImageUrl] = useState(null);
  const [activeSlot, setActiveSlot] = useState(0); // 0 = foto principal, 1..4 = slots pontilhados

  // Estados da Barra Lateral Direita (Informações do Talento)
  const [infoPreset, setInfoPreset] = useState('default');
  const [selectedAttrs, setSelectedAttrs] = useState(INITIAL_SELECTED_ATTRS);
  const [availableAttrs, setAvailableAttrs] = useState(INITIAL_AVAILABLE_ATTRS);

  // Modais / Toasts de Pré-visualização e Salvamento
  const [toast, setToast] = useState(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  // Limpa Blob URL ao desmontar
  useEffect(() => {
    return () => {
      if (importedImageUrl) {
        URL.revokeObjectURL(importedImageUrl);
      }
    };
  }, [importedImageUrl]);

  const handleResetTransform = () => {
    setZoom(1);
    setRotation(0);
    setOffset({ x: 0, y: 0 });
    setFlip({ x: 1, y: 1 });
  };

  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (importedImageUrl) {
      URL.revokeObjectURL(importedImageUrl);
    }
    const nextUrl = URL.createObjectURL(file);
    setImportedImageUrl(nextUrl);
    e.target.value = '';
  };

  const moveToAvailable = (attr) => {
    setSelectedAttrs((prev) => prev.filter((item) => item.id !== attr.id));
    setAvailableAttrs((prev) => [...prev, attr]);
  };

  const moveToSelected = (attr) => {
    setAvailableAttrs((prev) => prev.filter((item) => item.id !== attr.id));
    setSelectedAttrs((prev) => [...prev, attr]);
  };

  const handleSaveComposite = () => {
    const compositePayload = {
      talentName,
      infoPreset,
      transform: { zoom, rotation, offset, flip },
      selectedAttributes: selectedAttrs,
      availableAttributes: availableAttrs,
      savedAt: new Date().toISOString(),
    };
    console.log('💾 [CompoMakeEditor] Composite salvo com sucesso:', compositePayload);
    setToast({
      title: 'Composite salvo com sucesso!',
      subtitle: `O composite de "${talentName}" foi processado e registrado no console.log.`,
    });
    setTimeout(() => setToast(null), 5000);
  };

  const handleDoneSlot = () => {
    setToast({
      title: 'Recorte aplicado ao slot!',
      subtitle: 'Os ajustes de enquadramento da imagem foram aplicados ao esquema do composite.',
    });
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <div className="w-full pb-16 select-none">
      {/* Toast Flutuante */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 max-w-md bg-slate-900 text-white px-4 py-3.5 rounded-md shadow-2xl border-l-4 border-emerald-400 flex items-start gap-3 animate-in fade-in slide-in-from-top-3 duration-150">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="flex-1 text-xs">
            <p className="font-bold">{toast.title}</p>
            <p className="text-slate-300 mt-0.5 leading-relaxed">
              {toast.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 1. BARRA DE BREADCRUMB ("Início > CompoMake") */}
      <div className="w-full bg-[#f8f9fa] border border-slate-200/80 rounded-xs px-4 py-2.5 mb-5 flex items-center gap-2 text-xs text-slate-400">
        <Link
          to="/"
          className="text-[#0077b5] hover:underline font-normal cursor-pointer"
        >
          Início
        </Link>
        <span>&gt;</span>
        <span className="text-slate-500">CompoMake</span>
      </div>

      {/* 2. CABEÇALHO DO EDITOR ("CompoMake / sophia évora" + Botões à direita) */}
      <div className="w-full bg-[#f4f5f7] border border-slate-200/90 rounded-xs px-5 py-3.5 mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-baseline gap-1.5">
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">
            CompoMake /
          </h1>
          <span className="text-base font-bold text-[#0077b5]">
            {talentName}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-500 border border-slate-200 text-xs font-medium uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
          >
            CANCELAR
          </button>

          <button
            type="button"
            onClick={() => setIsPreviewModalOpen(true)}
            className="px-4 py-2.5 bg-[#f58220] hover:bg-[#e07112] active:scale-[0.99] text-white text-xs font-semibold uppercase tracking-wider rounded-xs shadow-2xs transition-all cursor-pointer"
          >
            PRÉ-VISUALIZAR
          </button>

          <button
            type="button"
            onClick={handleSaveComposite}
            className="px-4 py-2.5 bg-[#0077b5] hover:bg-[#006399] active:scale-[0.99] text-white text-xs font-semibold uppercase tracking-wider rounded-xs shadow-2xs transition-all cursor-pointer"
          >
            SALVAR COMPOSITE
          </button>
        </div>
      </div>

      {/* 3. LAYOUT PRINCIPAL EM DUAS COLUNAS (Esquerda: Canvas | Direita: Esquema e Informações) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* COLUNA ESQUERDA (8 colunas): Toolbar + Canvas Quadriculado */}
        <div className="lg:col-span-8 space-y-3">
          {/* Toolbar de Ferramentas do Editor */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              {/* Grupo 1: Mover e Cortar */}
              <div className="inline-flex rounded-xs border border-slate-200 bg-[#f1f3f5] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setActiveTool('move')}
                  title="Mover Imagem"
                  className={`p-2 transition-colors cursor-pointer ${
                    activeTool === 'move'
                      ? 'bg-slate-300/80 text-slate-900'
                      : 'text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Move className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTool('crop')}
                  title="Recortar Enquadramento"
                  className={`p-2 border-l border-slate-200 transition-colors cursor-pointer ${
                    activeTool === 'crop'
                      ? 'bg-slate-300/80 text-slate-900'
                      : 'text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Crop className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Grupo 2: Zoom In / Zoom Out */}
              <div className="inline-flex rounded-xs border border-slate-200 bg-[#f1f3f5] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.min(z + 0.1, 2.2))}
                  title="Aumentar Zoom"
                  className="p-2 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.max(z - 0.1, 0.5))}
                  title="Diminuir Zoom"
                  className="p-2 border-l border-slate-200 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Grupo 3: Setas de Deslocamento */}
              <div className="inline-flex rounded-xs border border-slate-200 bg-[#f1f3f5] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOffset((o) => ({ ...o, x: o.x - 10 }))}
                  title="Mover para Esquerda"
                  className="p-2 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setOffset((o) => ({ ...o, x: o.x + 10 }))}
                  title="Mover para Direita"
                  className="p-2 border-l border-slate-200 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setOffset((o) => ({ ...o, y: o.y - 10 }))}
                  title="Mover para Cima"
                  className="p-2 border-l border-slate-200 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setOffset((o) => ({ ...o, y: o.y + 10 }))}
                  title="Mover para Baixo"
                  className="p-2 border-l border-slate-200 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Grupo 4: Girar Esquerda / Direita */}
              <div className="inline-flex rounded-xs border border-slate-200 bg-[#f1f3f5] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setRotation((r) => r - 90)}
                  title="Girar -90°"
                  className="p-2 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setRotation((r) => r + 90)}
                  title="Girar +90°"
                  className="p-2 border-l border-slate-200 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Grupo 5: Espelhar Horizontal / Vertical */}
              <div className="inline-flex rounded-xs border border-slate-200 bg-[#f1f3f5] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setFlip((f) => ({ ...f, x: f.x * -1 }))}
                  title="Espelhar Horizontalmente"
                  className="p-2 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <MoveHorizontal className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setFlip((f) => ({ ...f, y: f.y * -1 }))}
                  title="Espelhar Verticalmente"
                  className="p-2 border-l border-slate-200 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <MoveVertical className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Grupo 6: Resetar */}
              <button
                type="button"
                onClick={handleResetTransform}
                title="Restaurar Transformação"
                className="p-2 rounded-xs border border-slate-200 bg-[#f1f3f5] text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Botões de Texto à Direita da Toolbar: IMPORTAR (azul claro) e FEITO! (verde) */}
            <div className="flex items-center gap-1.5 ml-auto">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImportFile}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-2 bg-[#5bc0de] hover:bg-[#31b0d5] text-white text-xs font-semibold uppercase rounded-xs transition-colors cursor-pointer"
              >
                IMPORTAR
              </button>
              <button
                type="button"
                onClick={handleDoneSlot}
                className="px-3.5 py-2 bg-[#28a745] hover:bg-[#218838] text-white text-xs font-semibold uppercase rounded-xs transition-colors cursor-pointer"
              >
                FEITO!
              </button>
            </div>
          </div>

          {/* Grande Área Cinza Escuro com Padrão Quadriculado (Checkerboard) e Retângulo Central "ÉVORA MODELS" */}
          <div
            className="w-full h-[540px] rounded-xs border border-slate-300 relative overflow-hidden flex items-center justify-center"
            style={{
              backgroundColor: '#585858',
              backgroundImage: `
                linear-gradient(45deg, #686868 25%, transparent 25%),
                linear-gradient(-45deg, #686868 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, #686868 75%),
                linear-gradient(-45deg, transparent 75%, #686868 75%)
              `,
              backgroundSize: '18px 18px',
              backgroundPosition: '0 0, 0 9px, 9px -9px, -9px 0',
            }}
          >
            {/* Retângulo Central Branco simulando a imagem sendo editada ("ÉVORA MODELS") */}
            <div
              className="relative w-64 h-80 bg-white shadow-2xl flex flex-col items-center justify-center transition-transform duration-150"
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px) scale(${
                  zoom * flip.x
                }, ${zoom * flip.y}) rotate(${rotation}deg)`,
              }}
            >
              {importedImageUrl ? (
                <img
                  src={importedImageUrl}
                  alt="Imagem em edição"
                  className="w-full h-full object-cover pointer-events-none"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <span className="text-3xl font-serif tracking-[0.22em] text-slate-900 font-semibold leading-none">
                    ÉVORA
                  </span>
                  <span className="text-[11px] tracking-[0.42em] text-slate-500 mt-2 uppercase font-medium">
                    MODELS
                  </span>
                </div>
              )}

              {/* Moldura Azul de Crop com Grade 3x3 (Regra dos Terços) e Alças */}
              <div className="absolute inset-3 border-[1.5px] border-[#0088ff] pointer-events-none">
                {/* Linhas tracejadas de terços */}
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                  <div className="border-r border-b border-dashed border-slate-400/50" />
                  <div className="border-r border-b border-dashed border-slate-400/50" />
                  <div className="border-b border-dashed border-slate-400/50" />
                  <div className="border-r border-b border-dashed border-slate-400/50" />
                  <div className="border-r border-b border-dashed border-slate-400/50" />
                  <div className="border-b border-dashed border-slate-400/50" />
                  <div className="border-r border-dashed border-slate-400/50" />
                  <div className="border-r border-dashed border-slate-400/50" />
                  <div />
                </div>

                {/* Alças quadradas azuis nos cantos e meios */}
                <span className="w-2 h-2 bg-[#0088ff] absolute -top-1 -left-1" />
                <span className="w-2 h-2 bg-[#0088ff] absolute -top-1 left-1/2 -translate-x-1/2" />
                <span className="w-2 h-2 bg-[#0088ff] absolute -top-1 -right-1" />
                <span className="w-2 h-2 bg-[#0088ff] absolute top-1/2 -translate-y-1/2 -left-1" />
                <span className="w-2 h-2 bg-[#0088ff] absolute top-1/2 -translate-y-1/2 -right-1" />
                <span className="w-2 h-2 bg-[#0088ff] absolute -bottom-1 -left-1" />
                <span className="w-2 h-2 bg-[#0088ff] absolute -bottom-1 left-1/2 -translate-x-1/2" />
                <span className="w-2 h-2 bg-[#0088ff] absolute -bottom-1 -right-1" />
              </div>
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA (4 colunas): Esquema Pontilhado do Composite + Informações do Talento */}
        <div className="lg:col-span-4 space-y-6">
          {/* Bloco Superior Branco: Esboço/Esquema de Layout do Composite com Linhas Pontilhadas */}
          <div className="bg-white border border-slate-400 p-3 shadow-2xs">
            <div className="grid grid-cols-12 gap-3 items-stretch">
              {/* Lado Esquerdo do Esquema: Logo MF + Foto Principal + Nome do Talento */}
              <div className="col-span-5 flex flex-col items-center justify-between">
                {/* Logo MF ManagerFashion */}
                <div className="flex items-center gap-1 mb-1.5">
                  <span className="bg-[#0077b5] text-white font-extrabold text-[10px] px-1 py-0.5 rounded-[1px] leading-none">
                    MF
                  </span>
                  <div className="flex flex-col leading-none">
                    <span className="text-[#0077b5] text-[11px] font-medium tracking-tight">
                      Manager<span className="font-bold">Fashion</span>
                    </span>
                    <span className="text-[6px] text-slate-400">
                      Solutions for Talents Agencies
                    </span>
                  </div>
                </div>

                {/* Slot Principal */}
                <div
                  onClick={() => setActiveSlot(0)}
                  className={`w-full aspect-[3/4] border flex flex-col items-center justify-center overflow-hidden cursor-pointer transition-all ${
                    activeSlot === 0
                      ? 'border-[#0077b5] ring-2 ring-[#0077b5]/20 bg-white'
                      : 'border-slate-300 bg-slate-50'
                  }`}
                >
                  {importedImageUrl ? (
                    <img
                      src={importedImageUrl}
                      alt={talentName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-2 text-center">
                      <span className="text-sm font-serif tracking-widest text-slate-900 font-semibold leading-none">
                        ÉVORA
                      </span>
                      <span className="text-[6px] tracking-[0.3em] text-slate-500 mt-1 uppercase">
                        MODELS
                      </span>
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-slate-600 mt-1.5 font-medium">
                  {talentName}
                </span>
              </div>

              {/* Lado Direito do Esquema: Grid 2x2 Pontilhado + Rodapé "Informações do talento" */}
              <div className="col-span-7 flex flex-col justify-between gap-2">
                <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-2">
                  {[1, 2, 3, 4].map((slotIdx) => (
                    <div
                      key={slotIdx}
                      onClick={() => setActiveSlot(slotIdx)}
                      title={`Selecionar Slot #${slotIdx}`}
                      className={`border border-dashed rounded-[1px] flex items-center justify-center text-[10px] cursor-pointer transition-colors ${
                        activeSlot === slotIdx
                          ? 'border-[#0077b5] bg-sky-50/50 text-[#0077b5] font-semibold'
                          : 'border-slate-400 hover:border-[#0077b5] text-transparent hover:text-slate-400'
                      }`}
                    >
                      Slot {slotIdx}
                    </div>
                  ))}
                </div>

                {/* Caixa Pontilhada Inferior: "Informações do talento" */}
                <div className="border border-dashed border-slate-400 py-1 px-2 text-center text-[10px] text-slate-600">
                  Informações do talento
                </div>
              </div>
            </div>
          </div>

          {/* Seção: "Informações do talento" + Dropdown "default" */}
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <h2 className="text-sm font-bold text-slate-800">
                Informações do talento
              </h2>
              <select
                value={infoPreset}
                onChange={(e) => setInfoPreset(e.target.value)}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none cursor-pointer"
              >
                <option value="default">default</option>
                <option value="Kids">Kids</option>
                <option value="Fashion">Fashion</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            {/* Quadro Dividido em Duas Colunas: SELECIONADO e DISPONIBILIDADE */}
            <div className="grid grid-cols-2 gap-3 items-start">
              {/* Coluna 1: SELECIONADO */}
              <fieldset className="border border-slate-200 rounded-xs p-2.5 bg-white">
                <legend className="px-1.5 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                  SELECIONADO
                </legend>
                <div className="divide-y divide-dotted divide-slate-200">
                  {selectedAttrs.map((attr) => (
                    <button
                      key={attr.id}
                      type="button"
                      onClick={() => moveToAvailable(attr)}
                      title="Clique para mover para DISPONIBILIDADE"
                      className="w-full py-2 px-1 text-center text-[11px] text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <span>{attr.label}: </span>
                      <strong className="font-bold text-slate-800">
                        {attr.value}
                      </strong>
                    </button>
                  ))}
                </div>
              </fieldset>

              {/* Coluna 2: DISPONIBILIDADE */}
              <fieldset className="border border-slate-200 rounded-xs p-2.5 bg-[#f4f5f7]">
                <legend className="px-1.5 text-[10px] font-semibold tracking-wider text-slate-400 uppercase bg-white">
                  DISPONIBILIDADE
                </legend>
                <div className="divide-y divide-dotted divide-slate-300">
                  {availableAttrs.map((attr) => (
                    <button
                      key={attr.id}
                      type="button"
                      onClick={() => moveToSelected(attr)}
                      title="Clique para mover para SELECIONADO"
                      className="w-full py-2 px-1 text-center text-[11px] text-slate-600 hover:bg-white/70 transition-colors cursor-pointer"
                    >
                      <span>{attr.label}: </span>
                      <strong className="font-bold text-slate-800">
                        {attr.value}
                      </strong>
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Pré-Visualização do Composite (quando clica em PRÉ-VISUALIZAR) */}
      {isPreviewModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsPreviewModalOpen(false)}
        >
          <div
            className="bg-white rounded-sm shadow-2xl max-w-2xl w-full p-6 border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                <Eye className="w-4 h-4 text-[#0077b5]" />
                <span>Pré-visualização do Composite — {talentName}</span>
              </div>
              <button
                type="button"
                onClick={() => setIsPreviewModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="border border-slate-300 p-6 bg-white">
              <div className="grid grid-cols-12 gap-6 items-center">
                <div className="col-span-5 flex flex-col items-center">
                  <div className="w-full aspect-[3/4] border border-slate-200 flex flex-col items-center justify-center bg-slate-50 overflow-hidden">
                    {importedImageUrl ? (
                      <img
                        src={importedImageUrl}
                        alt={talentName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <p className="text-2xl font-serif tracking-widest font-semibold text-slate-900">
                          ÉVORA
                        </p>
                        <p className="text-[8px] tracking-[0.35em] text-slate-500 uppercase mt-1">
                          MODELS
                        </p>
                      </div>
                    )}
                  </div>
                  <p className="mt-3 text-sm font-bold uppercase tracking-widest text-slate-800">
                    {talentName}
                  </p>
                </div>

                <div className="col-span-7 flex flex-col justify-between h-full space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {[1, 2, 3, 4].map((n) => (
                      <div
                        key={n}
                        className="aspect-[3/4] bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] text-slate-400"
                      >
                        Foto {n}
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] text-slate-600">
                    {selectedAttrs.map((a) => (
                      <span key={a.id}>
                        {a.label}: <strong className="text-slate-900">{a.value}</strong>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setIsPreviewModalOpen(false)}
                className="px-4 py-2 bg-[#0077b5] text-white text-xs font-semibold uppercase rounded-xs cursor-pointer"
              >
                Fechar Pré-visualização
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

