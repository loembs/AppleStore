// =============================================
// SERVICE PRODUITS - SUPABASE DIRECT
// =============================================
// Ce service remplace tous les appels au backend Java Render
// par des requêtes directes à Supabase

import { supabase } from '@/config/supabase'
import type {
  Product,
  Category,
  ProductColor,
  ProductStorage,
  ProductFeature,
  ProductSpecs,
  ProductImages
} from '@/lib/supabase'

/**
 * Mapper les données Supabase vers le format Product du frontend
 */
const mapProduct = (data: any): Product => ({
  id: String(data.id),
  name: data.name,
  tagline: data.tagline || null,
  price: data.price || 0,
  image: data.image || null,
  categoryid: data.categoryid || 0,
  stock: data.stock || 0,
  available: data.available !== false,
  is_featured: data.is_featured || false,
  is_new: data.is_new || false,
  is_bestseller: data.is_bestseller || false,
  rating: data.rating || 0,
  review_count: data.review_count || 0,
  view_count: data.view_count || 0,
  total_sales: data.total_sales || 0,
  created_at: data.created_at || new Date().toISOString(),
  updated_at: data.updated_at || new Date().toISOString()
})

/**
 * Service de produits utilisant Supabase directement
 */
export const productServiceSupabase = {
  // =============================================
  // CATÉGORIES
  // =============================================

  /**
   * Récupérer toutes les catégories
   */
  async getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
      .from('category')
      .select('*')
      .order('libelle')

    if (error) throw error

    return (data || []).map((cat: any) => ({
      id: cat.id,
      libelle: cat.libelle || cat.name,
      created_at: cat.created_at || new Date().toISOString(),
      updated_at: cat.updated_at || new Date().toISOString()
    }))
  },

  // =============================================
  // PRODUITS
  // =============================================

  /**
   * Récupérer tous les produits, filtrés par catégorie si fourni
   */
  async getProducts(categoryId?: number): Promise<Product[]> {
    let query = supabase
      .from('product')
      .select('*')
      .eq('available', true)
      .order('created_at', { ascending: false })

    if (categoryId) {
      query = query.eq('categoryid', categoryId)
    }

    const { data, error } = await query

    if (error) throw error

    return (data || []).map(mapProduct)
  },

  /**
   * Récupérer un produit par son ID avec toutes ses relations
   */
  async getProduct(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('product')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // Not found
        return null
      }
      throw error
    }

    return mapProduct(data)
  },

  /**
   * Récupérer les produits en vedette
   */
  async getFeaturedProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('product')
      .select('*')
      .eq('is_featured', true)
      .eq('available', true)
      .order('created_at', { ascending: false })

    if (error) throw error

    return (data || []).map(mapProduct)
  },

  /**
   * Récupérer les nouveaux produits
   */
  async getNewProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('product')
      .select('*')
      .eq('is_new', true)
      .eq('available', true)
      .order('created_at', { ascending: false })

    if (error) throw error

    return (data || []).map(mapProduct)
  },

  /**
   * Récupérer les best-sellers
   */
  async getBestsellers(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('product')
      .select('*')
      .eq('is_bestseller', true)
      .eq('available', true)
      .order('total_sales', { ascending: false })

    if (error) throw error

    return (data || []).map(mapProduct)
  },

  /**
   * Rechercher des produits par nom ou description
   */
  async searchProducts(query: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('product')
      .select('*')
      .eq('available', true)
      .or(`name.ilike.%${query}%,tagline.ilike.%${query}%`)
      .order('created_at', { ascending: false })

    if (error) throw error

    return (data || []).map(mapProduct)
  },

  // =============================================
  // DÉTAILS PRODUITS
  // =============================================

  /**
   * Récupérer les couleurs d'un produit
   */
  async getProductColors(productId: string): Promise<ProductColor[]> {
    const { data, error } = await supabase
      .from('product_color')
      .select('*')
      .eq('product_id', productId)
      .order('name')

    if (error) throw error

    return (data || []).map((color: any) => ({
      id: color.id,
      product_id: color.product_id,
      name: color.name,
      hex: color.hex || null,
      code: color.code || null,
      image: color.image || null,
      price_adjustment: color.price_adjustment || 0,
      available: color.available !== false,
      created_at: color.created_at || new Date().toISOString()
    }))
  },

  /**
   * Récupérer les options de stockage d'un produit
   */
  async getProductStorage(productId: string): Promise<ProductStorage[]> {
    const { data, error } = await supabase
      .from('product_storage')
      .select('*')
      .eq('product_id', productId)
      .order('size')

    if (error) throw error

    return (data || []).map((storage: any) => ({
      id: storage.id,
      product_id: storage.product_id,
      size: storage.size,
      price: storage.price || 0,
      available: storage.available !== false,
      created_at: storage.created_at || new Date().toISOString()
    }))
  },

  /**
   * Récupérer les caractéristiques d'un produit
   */
  async getProductFeatures(productId: string): Promise<ProductFeature[]> {
    const { data, error } = await supabase
      .from('product_feature')
      .select('*')
      .eq('product_id', productId)
      .order('feature')

    if (error) throw error

    return (data || []).map((feature: any) => ({
      id: feature.id,
      product_id: feature.product_id,
      feature: feature.feature,
      created_at: feature.created_at || new Date().toISOString()
    }))
  },

  /**
   * Récupérer les spécifications d'un produit
   */
  async getProductSpecs(productId: string): Promise<ProductSpecs[]> {
    const { data, error } = await supabase
      .from('product_specs')
      .select('*')
      .eq('product_id', productId)
      .order('spec_name')

    if (error) throw error

    return (data || []).map((spec: any) => ({
      id: spec.id,
      product_id: spec.product_id,
      spec_name: spec.spec_name,
      spec_value: spec.spec_value,
      created_at: spec.created_at || new Date().toISOString()
    }))
  },

  /**
   * Récupérer les images d'un produit
   */
  async getProductImages(productId: string): Promise<ProductImages[]> {
    const { data, error } = await supabase
      .from('product_images')
      .select('*')
      .eq('product_id', productId)
      .order('display_order')

    if (error) throw error

    return (data || []).map((img: any) => ({
      id: img.id,
      product_id: img.product_id,
      image_url: img.image_url,
      alt_text: img.alt_text || null,
      display_order: img.display_order || 0,
      is_hero: img.is_hero || false,
      created_at: img.created_at || new Date().toISOString()
    }))
  },

  // =============================================
  // UTILITAIRES
  // =============================================

  /**
   * Calculer le prix d'un produit avec ses options
   */
  async calculateProductPrice(
    productId: string,
    colorId?: number,
    storageId?: number
  ): Promise<number> {
    const product = await this.getProduct(productId)
    if (!product) return 0

    let price = product.price

    // Ajouter l'ajustement de couleur si sélectionné
    if (colorId) {
      const colors = await this.getProductColors(productId)
      const color = colors.find(c => c.id === colorId)
      if (color) price += color.price_adjustment
    }

    // Utiliser le prix de stockage si sélectionné
    if (storageId) {
      const storages = await this.getProductStorage(productId)
      const storage = storages.find(s => s.id === storageId)
      if (storage) price = storage.price
    }

    return price
  },

  /**
   * Tracker les vues d'un produit (facultatif, sans erreur si échoue)
   */
  async trackProductView(productId: string, sessionId?: string): Promise<void> {
    try {
      // Incrémenter le compteur de vues
      await supabase.rpc('increment_view_count', {
        product_id: productId
      })
    } catch (error) {
      // Silencer les erreurs de tracking - ne pas bloquer l'expérience utilisateur
      console.debug('Product view tracking failed:', error)
    }
  }
}
