import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

// 1) Récupérer les familles Mac (une carte par famille)
export async function fetchMacFamilies() {
  const { data, error } = await supabase
    .from('product')
    .select('*')
    .not('family', 'is', null)
    .order('price', { ascending: true });

  // Debug: afficher la réponse Supabase dans la console pour diagnostiquer l'absence de résultats
  // Ces logs apparaîtront dans la console du navigateur côté client.
  // eslint-disable-next-line no-console
  console.debug('fetchMacFamilies', { data, error });

  if (error) throw error;

  // Dédupliquer par family (garder un représentant par famille)
  const seen = new Set();
  const families = (data || []).filter((p) => {
    if (seen.has(p.family)) return false;
    seen.add(p.family);
    return true;
  });

  return families.map((p) => ({
    id: p.id,
    family: p.family,
    name: p.name,
    tagline: p.tagline,
    price: p.price,
    image: p.image,
    is_featured: p.is_featured,
    is_new: p.is_new
  }));
}

// 2) Toutes les variantes d'une famille (ex: 'macbook-pro')
export async function fetchVariantsByFamily(family: string) {
  const { data, error } = await supabase
    .from('product')
    .select('*')
    .eq('family', family)
    .order('price', { ascending: true });

  // Debug: log response
  // eslint-disable-next-line no-console
  console.debug('fetchVariantsByFamily', { family, data, error });

  if (error) throw error;
  return data;
}

// 3) Détail produit + toutes ses options
export async function fetchMacWithOptions(productId: string | number) {
  const [
    productResult,
    colorsResult,
    storagesResult,
    displaysResult,
    chipsResult
  ] = await Promise.all([
    supabase.from('product').select('*').eq('id', productId).single(),
    supabase.from('product_color').select('*').eq('product_id', productId).eq('available', true),
    supabase.from('product_storage').select('*').eq('product_id', productId).eq('available', true),
    supabase.from('product_display').select('*').eq('product_id', productId),
    supabase.from('product_chip').select('*').eq('product_id', productId),
  ]);

  // Debug: log all results pour diagnostiquer les réponses depuis Supabase
  // eslint-disable-next-line no-console
  console.debug('fetchMacWithOptions', { productId, productResult, colorsResult, storagesResult, displaysResult, chipsResult });

  const firstError = [
    productResult,
    colorsResult,
    storagesResult,
    displaysResult,
    chipsResult
  ].find((r) => r.error)?.error;

  if (firstError) throw firstError;
  if (!productResult.data) throw new Error('Product not found');

  return {
    product: productResult.data,
    colors: colorsResult.data || [],
    storages: storagesResult.data || [],
    displays: displaysResult.data || [],
    chips: chipsResult.data || [],
  };
}

// 4) Calculer le prix total selon les sélections
export function calculateMacPrice(
  basePrice: number,
  storagePrice?: number,
  displayPrice?: number,
  chipPrice?: number
): number {
  let total = basePrice;
  if (storagePrice) total += storagePrice;
  if (displayPrice) total += displayPrice;
  if (chipPrice) total += chipPrice;
  return total;
}
