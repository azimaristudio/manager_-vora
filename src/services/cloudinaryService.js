/**
 * Serviço de upload client-side (unsigned) para o Cloudinary.
 * Requer VITE_CLOUDINARY_CLOUD_NAME e VITE_CLOUDINARY_UPLOAD_PRESET no arquivo .env.
 */

export async function uploadImageToCloudinary(file) {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME?.trim();
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET?.trim();

  if (!cloudName || !uploadPreset) {
    throw new Error(
      'Configuração do Cloudinary ausente. Defina VITE_CLOUDINARY_CLOUD_NAME e VITE_CLOUDINARY_UPLOAD_PRESET no arquivo .env.'
    );
  }

  if (!file) {
    throw new Error('Nenhum arquivo de imagem foi informado para upload.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  let data = null;
  try {
    data = await response.json();
  } catch {
    // fallback caso o corpo não seja JSON válido
  }

  if (!response.ok || !data?.secure_url) {
    const remoteMessage = data?.error?.message;
    throw new Error(
      remoteMessage
        ? `Falha no upload para o Cloudinary: ${remoteMessage}`
        : `Falha no upload da imagem no Cloudinary (status ${response.status}).`
    );
  }

  return data.secure_url;
}
