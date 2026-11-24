import React, { useRef } from 'react';
import {
  FolderOpen,
  Upload,
  Trash2,
  Star,
  LayoutGrid,
  Image as ImageIcon,
  Camera,
  X,
} from 'lucide-react';

export default function MediaUploadForm({
  mediaItems = [],
  profilePhotoUrl = '',
  onSelectProfileFile,
  onClearProfilePhoto,
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
    const file = e.target.files?.[0];
    if (file) {
      if (onSelectProfileFile) {
        onSelectProfileFile(file);
      } else {
        onAddMediaFiles?.([file], 'Perfil', true);
      }
    }
    e.target.value = '';
  };

  const handleMultipleFilesChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onAddMediaFiles?.(files, 'Polaroid / Snap', false);
    }
    e.target.value = '';
  };

  return (
    <div className="space-y-5">
      {/* Bloco 1: Foto de Perfil */}
      <div className="bg-[#1c1c1e] border border-white/10 rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-white/10">
          <div className="flex items-center gap-2 min-w-0">
            <ImageIcon className="w-4 h-4 text-[#E8AC51] shrink-0" />
            <h3 className="text-sm font-semibold text-white truncate">
              {compact ? 'Foto de perfil' : 'Foto de Perfil'}
            </h3>
          </div>
          {onOpenCompoMake && (
            <button
              type="button"
              onClick={onOpenCompoMake}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#161617] hover:bg-white/5 text-[#E8AC51] border border-[#E8AC51]/40 rounded-lg text-[11px] font-medium transition-colors cursor-pointer shrink-0"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>CompoMake</span>
            </button>
          )}
        </div>

        <div className="flex flex-col items-center">
          <div
            className={`${
              compact ? 'w-full aspect-[3/4] max-w-[240px]' : 'w-44 h-56'
            } mb-4 rounded-xl border border-dashed border-white/15 bg-[#161617] flex flex-col items-center justify-center overflow-hidden relative group`}
          >
            {profilePhotoUrl ? (
              <>
                <img
                  src={profilePhotoUrl}
                  alt="Preview Foto de Perfil"
                  className="w-full h-full object-cover object-top"
                />
                {onClearProfilePhoto && (
                  <button
                    type="button"
                    onClick={onClearProfilePhoto}
                    title="Remover foto de perfil"
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/75 hover:bg-red-600 text-white transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity text-center">
                  <span className="text-[10px] font-medium text-[#E8AC51]">
                    Foto de Capa Ativa
                  </span>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center text-neutral-400 p-4 text-center">
                <Camera className="w-8 h-8 mb-2 stroke-[1.5] text-neutral-500" />
                <span className="text-xs font-medium text-neutral-200">
                  Nenhuma foto de perfil selecionada
                </span>
                <span className="text-[11px] text-neutral-500 mt-1">
                  {compact
                    ? 'Recomendado: 3:4 • JPG, PNG ou WEBP'
                    : '3:4 recomendado'}
                </span>
              </div>
            )}
          </div>

          <input
            ref={profileInputRef}
            type="file"
            accept="image/*"
            onChange={handleProfileFileChange}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => profileInputRef.current?.click()}
            className={`${
              compact
                ? 'w-full max-w-[240px] justify-center bg-[#161617] hover:bg-[#E8AC51]/10 text-[#E8AC51] border border-[#E8AC51]/50'
                : 'px-5 bg-[#E8AC51] hover:bg-[#d99b3f] text-[#161617]'
            } py-2.5 text-[11px] font-bold uppercase tracking-wider rounded-lg shadow-xs flex items-center gap-2 transition-all cursor-pointer`}
          >
            <FolderOpen className="w-3.5 h-3.5" />
            <span>SELECIONAR ARQUIVO</span>
          </button>
        </div>
      </div>

      {/* Bloco 2: Composites, Polaroids & Book */}
      <div className="bg-[#1c1c1e] border border-white/10 rounded-xl p-5 shadow-xs">
        <div className="flex items-start justify-between gap-2 pb-3 mb-4 border-b border-white/10">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[#E8AC51] shrink-0" />
              <h3 className="text-sm font-semibold text-white">
                Composites, Polaroids &amp; Book
              </h3>
            </div>
            <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
              Selecione múltiplas imagens para enviar à galeria do talento ao salvar.
            </p>
          </div>

          <span className="px-2.5 py-0.5 bg-[#161617] text-[#E8AC51] border border-[#E8AC51]/40 rounded-full text-[11px] font-semibold shrink-0 tabular-nums">
            {mediaItems.length} {mediaItems.length === 1 ? 'foto' : 'fotos'}
          </span>
        </div>

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
          className="border border-dashed border-white/15 hover:border-[#E8AC51]/55 bg-[#161617] rounded-xl p-6 text-center transition-colors cursor-pointer"
        >
          <Upload className="w-6 h-6 text-[#E8AC51] mx-auto mb-2" />
          <p className="text-xs font-semibold text-white">
            Clique para selecionar múltiplas fotos (Composites / Polaroids)
          </p>
          <p className="text-[11px] text-neutral-400 mt-1">
            JPG, PNG ou WEBP • Múltiplos arquivos permitidos
          </p>
        </div>

        {mediaItems.length > 0 ? (
          <div
            className={`mt-4 grid gap-3 ${
              compact
                ? 'grid-cols-2'
                : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
            }`}
          >
            {mediaItems.map((item) => {
              const isCover = profilePhotoUrl === item.previewUrl;
              return (
                <div
                  key={item.id}
                  className={`group relative bg-[#161617] border rounded-xl overflow-hidden transition-all ${
                    isCover
                      ? 'border-[#E8AC51] ring-1 ring-[#E8AC51]/40'
                      : 'border-white/10 hover:border-white/25'
                  }`}
                >
                  <div className="aspect-[3/4] w-full bg-[#1c1c1e] overflow-hidden relative">
                    <img
                      src={item.previewUrl}
                      alt={item.name}
                      className="w-full h-full object-cover object-top"
                    />

                    <div className="absolute top-1.5 right-1.5 flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => onSetProfilePhoto?.(item.previewUrl)}
                        title="Definir como Foto de Perfil"
                        className={`p-1.5 rounded-lg shadow-xs transition-colors cursor-pointer ${
                          isCover
                            ? 'bg-[#E8AC51] text-[#161617]'
                            : 'bg-black/75 text-neutral-300 hover:bg-[#E8AC51] hover:text-[#161617]'
                        }`}
                      >
                        <Star className="w-3 h-3 fill-current" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemoveMediaItem?.(item.id)}
                        title="Remover imagem"
                        className="p-1.5 bg-black/75 hover:bg-red-600 text-neutral-300 hover:text-white rounded-lg shadow-xs transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="p-2.5 bg-[#1c1c1e] space-y-1.5 border-t border-white/10">
                    <p
                      className="text-[11px] font-medium text-neutral-300 truncate"
                      title={item.name}
                    >
                      {item.name}
                    </p>
                    <select
                      value={item.category}
                      onChange={(e) =>
                        onUpdateMediaCategory?.(item.id, e.target.value)
                      }
                      className="w-full px-2 py-1 text-[11px] font-medium bg-[#161617] border border-white/10 rounded-lg text-[#E8AC51] outline-none cursor-pointer"
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
          <div className="mt-4 py-3 text-center text-xs text-neutral-400 flex items-center justify-center gap-1.5">
            <ImageIcon className="w-4 h-4 text-neutral-500" />
            <span>Nenhuma foto adicionada à galeria ainda.</span>
          </div>
        )}
      </div>
    </div>
  );
}
