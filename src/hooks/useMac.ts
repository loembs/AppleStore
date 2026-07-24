import { useState, useEffect } from 'react';
import { fetchMacFamilies, fetchVariantsByFamily, fetchMacWithOptions, calculateMacPrice } from '@/services/mac.service';

export function useMacFamilies() {
  const [families, setFamilies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchMacFamilies();
        setFamilies(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { families, loading, error };
}

export function useMacVariants(family: string) {
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!family) return;

    async function load() {
      try {
        const data = await fetchVariantsByFamily(family);
        setVariants(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [family]);

  return { variants, loading, error };
}

export function useMacWithOptions(productId: string | number) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [selectedStorage, setSelectedStorage] = useState<any>(null);
  const [selectedDisplay, setSelectedDisplay] = useState<any>(null);
  const [selectedChip, setSelectedChip] = useState<any>(null);

  useEffect(() => {
    // Ne rien charger si aucun productId n'est fourni (évite des requêtes invalides vers Supabase)
    if (!productId) {
      setLoading(false);
      return;
    }

    async function load() {
      try {
        const result = await fetchMacWithOptions(productId);
        setData(result);

        // Sélectionner les options par défaut (avec gardes pour éviter les accès sur null)
        if (result?.colors?.length > 0) setSelectedColor(result.colors[0]);
        if (result?.storages?.length > 0) setSelectedStorage(result.storages[0]);
        if (result?.displays?.length > 0) setSelectedDisplay(result.displays.find((d: any) => d.is_default) || result.displays[0]);
        if (result?.chips?.length > 0) setSelectedChip(result.chips.find((c: any) => c.is_default) || result.chips[0]);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [productId]);

  const totalPrice = data?.product ? calculateMacPrice(
    data.product.price,
    selectedStorage?.price,
    selectedDisplay?.price,
    selectedChip?.price
  ) : 0;

  return {
    data,
    loading,
    error,
    selectedColor,
    setSelectedColor,
    selectedStorage,
    setSelectedStorage,
    selectedDisplay,
    setSelectedDisplay,
    selectedChip,
    setSelectedChip,
    totalPrice
  };
}

export { calculateMacPrice };
