import React, { useRef } from 'react';
import {
  FolderOpen,
  Upload,
  Trash2,
  Star,
  LayoutGrid,
  Image as ImageIcon,
  Camera,
} from 'lucide-react';

export default function MediaUploadForm({
  mediaItems,
  profilePhotoUrl,
  onAddMediaFiles,
  onRemoveMediaItem,
  onUpdateMediaCategory,
  onSetProfilePhoto,
  onOpenCompoMake,
  compact = false,
}) {
  const profileInputRef = useRef(null);
  const multiInputRef = useRef(null);

  const handleProfileFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onAddMediaFiles(files, 'Perfil', true);
    }
    e.target.value = '';
  };

  const handleMultipleFilesChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onAddMediaFiles(files, 'Polaroid / Snap', false);
    }
    e.target.value = '';
  };

  return (
    <div className="space-y-6">
      {/* Bloco 1: Foto de Perfil (Fiel à Coluna Esquerda da Imagem 03) */}
      <div className="bg-white border border-slate-200 rounded-md p-5 shadow-2xs">
        <div className="flex items-center justify-between pb-2.5 mb-4 border-b border-slate-200">
          <h3 className="text-sm font-bold text-slate-800">Foto de Perfil</h3>
          {onOpenCompoMake && (
            <button
              type="button"
              onClick={onOpenCompoMake}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-sky-50 hover:bg-sky-100 text-[#0077b5] border border-sky-200 rounded-xs text-[11px] font-semibold transition-colors cursor-pointer"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>CompoMake</span>
            </button>
          )}
        </div>

        <div className="flex flex-col items-center">
          {/* Preview da Foto de Perfil */}
          <div className="w-40 h-52 mb-4 rounded-sm border-2 border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center overflow-hidden relative group">
            {profilePhotoUrl ? (
              <>
                <img
                  src={profilePhotoUrl}
                  alt="Preview Foto de Perfil"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-2 py-1 bg-black/70 text-white text-[10px] rounded">
                    Foto de Capa Ativa
                  </span>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center text-slate-400 p-4 text-center">
                <Camera className="w-9 h-9 mb-2 stroke-[1.5]" />
                <span className="text-[11px] font-medium">
                  Nenhuma foto de perfil selecionada
                </span>
                <span className="text-[10px] text-slate-400/80 mt-0.5">
                  3:4 recomendado
                </span>
              </div>
            )}
          </div>

          {/* Input oculto para Foto de Perfil */}
          <input
            ref={profileInputRef}
            type="file"
            accept="image/*"
            onChange={handleProfileFileChange}
            className="hidden"
          />

          {/* Botão Verde "SELECIONAR ARQUIVO" idêntico à Imagem 03 */}
          <button
            type="button"
            onClick={() => profileInputRef.current?.click()}
            className="px-4 py-2 bg-[#28a745] hover:bg-[#218838] active:scale-[0.99] text-white text-[11px] font-bold uppercase tracking-wider rounded-xs shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <FolderOpen className="w-3.5 h-3.5 fill-white" />
            <span>SELECIONAR ARQUIVO</span>
          </button>
        </div>
      </div>

      {/* Bloco 2: Upload Múltiplo de Composites, Polaroids/Snaps e Book */}
      <div className="bg-white border border-slate-200 rounded-md p-5 shadow-2xs">
        <div className="flex items-center justify-between pb-2.5 mb-4 border-b border-slate-200">
          <div>
            <h3 className="text-sm font-bold text-slate-800">
              Composites, Polaroids & Book
            </h3>
            <p className="text-[11px] text-slate-500">
              Selecione múltiplas imagens para visualizar o preview instantâneo
              (via <code className="text-[#0077b5]">URL.createObjectURL</code>)
            </p>
          </div>
          <span className="px-2 py-0.5 bg-sky-50 text-[#0077b5] border border-sky-200 rounded-full text-[11px] font-bold">
            {mediaItems.length} {mediaItems.length === 1 ? 'foto' : 'fotos'}
          </span>
        </div>

        {/* Dropzone / Botão de Seleção Múltipla */}
        <input
          ref={multiInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleMultipleFilesChange}
          className="hidden"
        />

        <div
          onClick={() => multiInputRef.current?.click()}
          className="border-2 border-dashed border-sky-300 hover:border-[#0077b5] bg-sky-50/40 hover:bg-sky-50/80 rounded-md p-5 text-center transition-all cursor-pointer"
        >
          <Upload className="w-7 h-7 text-[#0077b5] mx-auto mb-2" />
          <p className="text-xs font-semibold text-slate-700">
            Clique para selecionar múltiplas fotos (Composites / Polaroids)
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            JPG, PNG ou WEBP • Múltiplos arquivos permitidos (Apenas preview local)
          </p>
        </div>

        {/* Grid de Previews das Fotos Carregadas */}
        {mediaItems.length > 0 ? (
          <div
            className={`mt-4 grid gap-3 ${
              compact
                ? 'grid-cols-2'
                : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
            }`}
          >
            {mediaItems.map((item) => {
              const isCover = profilePhotoUrl === item.previewUrl;
              return (
                <div
                  key={item.id}
                  className={`group relative bg-slate-50 border rounded-sm overflow-hidden transition-all ${
                    isCover
                      ? 'border-[#0077b5] ring-2 ring-[#0077b5]/20'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="aspect-[3/4] w-full bg-slate-200 overflow-hidden relative">
                    <img
                      src={item.previewUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />

                    {/* Ações rápidas sobre a imagem */}
                    <div className="absolute top-1.5 right-1.5 flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => onSetProfilePhoto(item.previewUrl)}
                        title="Definir como Foto de Perfil"
                        className={`p-1 rounded-xs shadow-xs transition-colors cursor-pointer ${
                          isCover
                            ? 'bg-amber-400 text-slate-900'
                            : 'bg-white/90 text-slate-600 hover:bg-amber-400 hover:text-slate-900'
                        }`}
                      >
                        <Star className="w-3 h-3 fill-current" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemoveMediaItem(item.id)}
                        title="Remover imagem"
                        className="p-1 bg-white/90 hover:bg-red-600 text-slate-600 hover:text-white rounded-xs shadow-xs transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Seletor de Álbum (Polaroid / Composite / Book) */}
                  <div className="p-2 bg-white space-y-1">
                    <p
                      className="text-[10px] font-medium text-slate-600 truncate"
                      title={item.name}
                    >
                      {item.name}
                    </p>
                    <select
                      value={item.category}
                      onChange={(e) =>
                        onUpdateMediaCategory(item.id, e.target.value)
                      }
                      className="w-full px-1.5 py-1 text-[10px] font-semibold bg-slate-50 border border-slate-200 rounded-xs text-[#0077b5] outline-none"
                    >
                      <option value="Polaroid / Snap">Polaroid / Snap</option>
                      <option value="Composite">Composite</option>
                      <option value="Book">Book / Portfolio</option>
                      <option value="Perfil">Foto de Perfil</option>
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mt-4 py-4 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
            <ImageIcon className="w-4 h-4" />
            <span>Nenhuma foto adicionada à galeria ainda.</span>
          </div>
        )}
      </div>
    </div>
  );
}

