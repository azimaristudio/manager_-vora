import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { uploadImageToCloudinary } from './cloudinaryService';
import {
  CATEGORY_OPTIONS,
  EYES_OPTIONS,
  HAIR_COLOR_OPTIONS,
  HAIR_LENGTH_OPTIONS,
  HAIR_TYPE_OPTIONS,
  LANGUAGE_OPTIONS,
  OFFICE_OPTIONS,
  SKIN_TONE_OPTIONS,
  STATUS_OPTIONS,
  TAG_OPTIONS,
} from '../data/talentFormOptions';

const MONTHS_PT = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
];

function lookupLabel(options, value, fallback = '') {
  const match = options.find((opt) => String(opt.value) === String(value));
  return match ? match.label : fallback;
}

function calculateAge(day, month, year) {
  const y = Number(year);
  const m = Number(month);
  const d = Number(day);
  if (!Number.isFinite(y) || y < 1900) return null;
  const now = new Date();
  let age = now.getFullYear() - y;
  if (Number.isFinite(m) && m >= 1 && m <= 12) {
    const birthDay = Number.isFinite(d) && d >= 1 ? d : 1;
    const currentMonth = now.getMonth() + 1;
    if (
      currentMonth < m ||
      (currentMonth === m && now.getDate() < birthDay)
    ) {
      age -= 1;
    }
  }
  return age >= 0 ? age : null;
}

function timestampToIso(value, fallbackIso = null) {
  if (!value) return fallbackIso;
  if (typeof value?.toDate === 'function') {
    return value.toDate().toISOString();
  }
  if (typeof value === 'string') return value;
  return fallbackIso;
}

function formatDateLabel(isoString) {
  if (!isoString) return 'Recente';
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return 'Recente';
  const day = String(date.getDate()).padStart(2, '0');
  const month = MONTHS_PT[date.getMonth()] || 'Jan';
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function isSameCalendarMonth(isoString) {
  if (!isoString) return false;
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return false;
  const now = new Date();
  return (
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
}

export function normalizeTalentDoc(docSnap) {
  const data = typeof docSnap.data === 'function' ? docSnap.data() : docSnap;
  const id = docSnap.id || data.id;
  const createdAt =
    timestampToIso(data.createdAt, data.createdAtIso) ||
    new Date().toISOString();
  const updatedAt =
    timestampToIso(data.updatedAt, data.updatedAtIso) || createdAt;
  const photoUrl = data.photoUrl || data.coverUrl || null;
  const categories =
    Array.isArray(data.categories) && data.categories.length > 0
      ? data.categories
      : [data.category || 'Modelo'];

  return {
    ...data,
    id,
    code: data.code || `EV-${String(id).slice(0, 4).toUpperCase()}`,
    stageName: data.stageName || data.personal?.stageName || 'Sem nome',
    fullName: data.fullName || data.personal?.fullName || data.stageName || '',
    initial:
      data.initial ||
      String(data.stageName || data.fullName || 'T')
        .trim()
        .charAt(0)
        .toUpperCase(),
    officeId: String(data.officeId || data.personal?.office || '2848'),
    officeName: data.officeName || 'ÉVORA',
    officeSubtitle: data.officeSubtitle || 'MODELS',
    status: data.status || 'Ativo',
    category: data.category || categories[0] || 'Modelo',
    categories,
    photoUrl,
    coverUrl: photoUrl,
    galleryUrls: Array.isArray(data.galleryUrls) ? data.galleryUrls : [],
    galleryMedia: Array.isArray(data.galleryMedia) ? data.galleryMedia : [],
    createdAt,
    updatedAt,
    updatedAtLabel: data.updatedAtLabel || formatDateLabel(updatedAt),
    isNewThisMonth: isSameCalendarMonth(createdAt),
    attributes: data.attributes || {},
    overview: data.overview || {
      info: {},
      agenda: [],
      atividades: [],
      contratos: [],
      voos: [],
      compo: [],
      book: [],
      snaps: [],
      video: [],
      docs: [],
    },
  };
}

export function subscribeToTalents(onData, onError) {
  const talentsQuery = query(
    collection(db, 'talents'),
    orderBy('updatedAt', 'desc')
  );

  return onSnapshot(
    talentsQuery,
    (snapshot) => {
      const items = snapshot.docs.map(normalizeTalentDoc);
      onData(items);
    },
    (error) => {
      if (onError) onError(error);
    }
  );
}

export async function createTalentWithMedia({
  formData,
  profilePhotoFile,
  profilePhotoPreviewUrl,
  mediaItems = [],
}) {
  const talentRef = doc(collection(db, 'talents'));
  const talentId = talentRef.id;
  const nowIso = new Date().toISOString();

  // 1. Upload paralelo para o Cloudinary (foto de perfil + imagens da galeria)
  const galleryItemsToProcess = Array.isArray(mediaItems) ? mediaItems : [];

  const profileUploadPromise =
    profilePhotoFile instanceof File
      ? uploadImageToCloudinary(profilePhotoFile)
      : Promise.resolve(null);

  const galleryUploadPromises = galleryItemsToProcess.map(async (item) => {
    if (item?.file instanceof File) {
      const url = await uploadImageToCloudinary(item.file);
      return {
        id: item.id,
        name: item.name || item.file.name,
        category: item.category || 'Polaroid / Snap',
        sizeKB: item.sizeKB || Math.round(item.file.size / 1024),
        mimeType: item.mimeType || item.file.type || 'image/jpeg',
        previewUrl: item.previewUrl,
        url,
      };
    }
    if (item?.url) {
      return item;
    }
    return null;
  });

  const [dedicatedProfileUrl, rawGalleryResults] = await Promise.all([
    profileUploadPromise,
    Promise.all(galleryUploadPromises),
  ]);

  const uploadedGalleryMedia = rawGalleryResults.filter(Boolean);

  // 2. Define photoUrl prioritária (foto de perfil dedicada -> item estrelado da galeria -> primeira foto)
  let photoUrl = dedicatedProfileUrl;
  if (!photoUrl && profilePhotoPreviewUrl) {
    const matchedItem = uploadedGalleryMedia.find(
      (m) => m.previewUrl === profilePhotoPreviewUrl
    );
    photoUrl = matchedItem?.url || null;
  }

  if (!photoUrl && uploadedGalleryMedia.length > 0) {
    photoUrl = uploadedGalleryMedia[0].url;
  }

  const galleryMedia = uploadedGalleryMedia.map(
    ({ previewUrl: _unused, ...rest }) => rest
  );
  const galleryUrls = galleryMedia.map((m) => m.url).filter(Boolean);

  // 3. Normalização dos campos para cards, filtros e painel overview
  const { personal, measurements, skills, career, admin, bankAccounts } =
    formData;
  const stageNameRaw =
    personal.stageName?.trim() || personal.fullName?.trim() || 'Novo Talento';
  const fullNameRaw = personal.fullName?.trim() || stageNameRaw;

  const officeLabel = lookupLabel(OFFICE_OPTIONS, personal.office, 'ÉVORA MODELS');
  const [officeFirst, ...officeRest] = officeLabel.split(' ');
  const officeName = officeFirst || 'ÉVORA';
  const officeSubtitle = officeRest.join(' ') || 'MODELS';

  const statusLabel = lookupLabel(STATUS_OPTIONS, personal.status, 'Ativo');
  const categoryLabels = (personal.categories || [])
    .map((val) => lookupLabel(CATEGORY_OPTIONS, val))
    .filter(Boolean);
  const finalCategories =
    categoryLabels.length > 0 ? categoryLabels : ['Modelo'];

  const age = calculateAge(
    personal.birthDay,
    personal.birthMonth,
    personal.birthYear
  );
  const eyesLabel = lookupLabel(EYES_OPTIONS, measurements.eyes, '');
  const hairLabel = lookupLabel(HAIR_COLOR_OPTIONS, measurements.hairColor, '');
  const hairLengthLabel = lookupLabel(
    HAIR_LENGTH_OPTIONS,
    measurements.hairLength,
    ''
  );
  const hairTypeLabel = lookupLabel(
    HAIR_TYPE_OPTIONS,
    measurements.hairType,
    ''
  );
  const skinToneLabel = lookupLabel(
    SKIN_TONE_OPTIONS,
    measurements.skinTone,
    ''
  );
  const tagLabel = lookupLabel(TAG_OPTIONS, personal.tag, '');

  const languageCodes = (personal.languages || [])
    .map((l) => l.language)
    .filter(Boolean);
  const languageLabels = languageCodes
    .map((code) => lookupLabel(LANGUAGE_OPTIONS, code, code))
    .filter(Boolean);

  const primaryPhoneObj = (personal.phones || []).find((p) => p.number?.trim());
  const formattedPhone = primaryPhoneObj
    ? `${primaryPhoneObj.ddi || '+55'} ${primaryPhoneObj.number}`.trim()
    : '';

  const drtParts = [
    admin.drtActor ? `Ator: ${admin.drtActor}` : '',
    admin.drtModel ? `Modelo: ${admin.drtModel}` : '',
    admin.drtPresenter ? `Apresentador: ${admin.drtPresenter}` : '',
  ].filter(Boolean);
  const hasDrt = drtParts.length > 0;

  const cityLocation = [personal.city?.trim(), personal.state?.trim()]
    .filter(Boolean)
    .join(', ');

  const allSkillsFlat = [
    ...(skills.sport || []),
    ...(skills.drive_pilot || []),
    ...(skills.music || []),
    ...(skills.other_skills || []),
  ];

  const compoItems = galleryMedia
    .filter((m) => m.category === 'Composite')
    .map((m) => ({
      id: m.id,
      title: m.name,
      subtitle: 'Composite',
      url: m.url,
      status: `${m.sizeKB} KB`,
    }));

  const snapItems = galleryMedia
    .filter((m) => m.category === 'Polaroid / Snap')
    .map((m) => ({
      id: m.id,
      title: m.name,
      subtitle: 'Polaroid / Snap',
      url: m.url,
      status: `${m.sizeKB} KB`,
    }));

  const bookItems = galleryMedia
    .filter((m) => m.category === 'Book' || m.category === 'Perfil')
    .map((m) => ({
      id: m.id,
      title: m.name,
      subtitle: m.category,
      url: m.url,
      status: `${m.sizeKB} KB`,
    }));

  const code = `EV-${talentId.slice(0, 4).toUpperCase()}`;

  const docPayload = {
    id: talentId,
    code,
    stageName: stageNameRaw.toLowerCase(),
    fullName: fullNameRaw.toLowerCase(),
    initial: stageNameRaw.charAt(0).toUpperCase(),
    officeId: String(personal.office || '2848'),
    officeName,
    officeSubtitle,
    category: finalCategories[0],
    categories: finalCategories,
    status: statusLabel,
    photoUrl,
    coverUrl: photoUrl,
    galleryUrls,
    galleryMedia,
    createdAtIso: nowIso,
    updatedAtIso: nowIso,
    personal,
    measurements,
    skills,
    career,
    admin,
    bankAccounts,
    attributes: {
      gender: personal.gender || '',
      genderIdentity: personal.genderIdentity || '',
      ethnicity: personal.ethnicity || '',
      skinTone: skinToneLabel || measurements.skinTone || '',
      eyes: measurements.eyes || '',
      eyesLabel: eyesLabel || '—',
      hair: measurements.hairColor || '',
      hairLabel: hairLabel || '—',
      hairLength: hairLengthLabel || '',
      hairKind: measurements.hairType || '',
      hairTypeLabel: hairTypeLabel || '',
      shirt: measurements.shirt || '',
      manequim: measurements.manequim || measurements.mannequin || '',
      sapato: measurements.shoes || '',
      height: measurements.height ? Number(measurements.height) : null,
      weight: measurements.weight ? Number(measurements.weight) : null,
      age,
      city: cityLocation || '—',
      state: personal.state || '',
      country: personal.country === 'BR' ? '30' : personal.country || '',
      drt: hasDrt ? drtParts.join(' • ') : 'Não informado',
      licensing: hasDrt ? '1' : '0',
      infosheet: '1',
      languages: languageCodes,
      languagesLabel: languageLabels,
      skills: allSkillsFlat,
      tags: personal.tag && personal.tag !== '0' ? [tagLabel || personal.tag] : [],
      email: personal.email || '—',
      phone: formattedPhone || '—',
    },
    overview: {
      info: {
        codigo: code,
        unidade: officeLabel,
        status: statusLabel,
        categorias: finalCategories.join(', '),
        cidade: cityLocation || '—',
        idade: age !== null ? `${age} anos` : '—',
        altura: measurements.height ? `${measurements.height} cm` : '—',
        peso: measurements.weight ? `${measurements.weight} kg` : '—',
        busto: measurements.bust ? `${measurements.bust} cm` : '—',
        cintura: measurements.waist ? `${measurements.waist} cm` : '—',
        quadril: measurements.hips ? `${measurements.hips} cm` : '—',
        olhos: eyesLabel || '—',
        cabelo: hairLabel || '—',
        manequim: measurements.mannequin || '—',
        sapato: measurements.shoes || '—',
        drt: hasDrt ? drtParts.join(' • ') : 'Não informado',
        idiomas: languageLabels.join(', ') || '—',
        email: personal.email || '—',
        telefone: formattedPhone || '—',
        instagram: personal.socials?.instagram || '—',
        agenciaMae: career.motherAgency || '—',
      },
      agenda: [],
      atividades: [],
      contratos: [],
      voos: [],
      compo: compoItems,
      book: bookItems.length > 0 ? bookItems : galleryMedia.map((m) => ({
        id: m.id,
        title: m.name,
        subtitle: m.category,
        url: m.url,
        status: `${m.sizeKB} KB`,
      })),
      snaps: snapItems,
      video: [],
      docs: [],
    },
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  await setDoc(talentRef, docPayload);

  return normalizeTalentDoc({
    ...docPayload,
    createdAt: nowIso,
    updatedAt: nowIso,
  });
}
