// =============================================
// SERVICE PRODUITS - SUPABASE
// =============================================
import { supabase } from '@/config/supabase'

export const productsService = {
  // Récupérer tous les produits (format compatible avec l'ancien service)
  async getAllProducts(filters?: any) {
    let query = supabase
      .from('product')
      .select('*')
      .eq('available', true)

    // Filtrer par catégorie si spécifié
    if (filters?.categoryId) {
      query = query.eq('categoryid', filters.categoryId)
    }

    // Recherche
    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,tagline.ilike.%${filters.search}%`)
    }

    const { data, error } = await query
    if (error) throw error

    // Mapper au format attendu par le frontend
    const mappedProducts = (data || []).map((item: any) => ({
      id: item.id,
      name: item.name,
      description: item.tagline || item.description || '',
      price: item.price,
      category: item.categoryid,
      image: item.image,
      stock: item.stock,
      available: item.available,
      isFeatured: item.is_featured,
      isNew: item.is_new,
      isBestseller: item.is_bestseller,
      totalSales: item.total_sales,
      rating: item.rating,
      reviewCount: item.review_count,
      createdAt: item.created_at,
      updatedAt: item.updated_at
    }))

    return {
      content: mappedProducts,
      totalElements: mappedProducts.length,
      totalPages: 1,
      currentPage: 0,
      size: mappedProducts.length
    }
  },

  // Récupérer un produit par ID
  async getProductById(id: string) {
    const { data, error } = await supabase
      .from('product')
      .select(`
        *,
        product_color(*),
        product_storage(*),
        product_feature(*),
        product_specs(*),
        product_images(*)
      `)
      .eq('id', id)
      .single()

    if (error) throw error

    return {
      id: data.id,
      name: data.name,
      description: data.tagline || data.description || '',
      price: data.price,
      categoryid: data.categoryid,
      image: data.image,
      stock: data.stock,
      available: data.available,
      isFeatured: data.is_featured,
      isNew: data.is_new,
      isBestseller: data.is_bestseller,
      totalSales: data.total_sales,
      rating: data.rating,
      reviewCount: data.review_count,
      colors: data.product_color,
      storage: data.product_storage,
      features: data.product_feature,
      specs: data.product_specs,
      images: data.product_images,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    }
  },

  // Récupérer les produits par catégorie
  async getProductsByCategory(categoryId: number) {
    const { data, error } = await supabase
      .from('product')
      .select('*')
      .eq('categoryid', categoryId)
      .eq('available', true)

    if (error) throw error

    return (data || []).map((item: any) => ({
      id: item.id,
      name: item.name,
      description: item.tagline || item.description || '',
      price: item.price,
      categoryid: item.categoryid,
      image: item.image,
      stock: item.stock,
      available: item.available,
      isFeatured: item.is_featured,
      isNew: item.is_new,
      isBestseller: item.is_bestseller,
      totalSales: item.total_sales,
      createdAt: item.created_at,
      updatedAt: item.updated_at
    }))
  },

  // Récupérer les produits en vedette
  async getFeaturedProducts() {
    const { data, error } = await supabase
      .from('product')
      .select('*')
      .eq('is_featured', true)
      .eq('available', true)
      .limit(10)

    if (error) throw error

    return (data || []).map((item: any) => ({
      id: item.id,
      name: item.name,
      description: item.tagline || item.description || '',
      price: item.price,
      categoryid: item.categoryid,
      image: item.image,
      stock: item.stock,
      available: item.available,
      isFeatured: item.is_featured,
      isNew: item.is_new,
      isBestseller: item.is_bestseller,
      totalSales: item.total_sales,
      rating: item.rating,
      reviewCount: item.review_count,
      createdAt: item.created_at,
      updatedAt: item.updated_at
    }))
  },

  // Récupérer les nouveaux produits
  async getNewProducts() {
    const { data, error } = await supabase
      .from('product')
      .select('*')
      .eq('is_new', true)
      .eq('available', true)
      .limit(10)

    if (error) throw error

    return (data || []).map((item: any) => ({
      id: item.id,
      name: item.name,
      description: item.tagline || item.description || '',
      price: item.price,
      categoryid: item.categoryid,
      image: item.image,
      stock: item.stock,
      available: item.available,
      isFeatured: item.is_featured,
      isNew: item.is_new,
      isBestseller: item.is_bestseller,
      totalSales: item.total_sales,
      rating: item.rating,
      reviewCount: item.review_count,
      createdAt: item.created_at,
      updatedAt: item.updated_at
    }))
  },

  // Récupérer les best-sellers
  async getBestsellers() {
    const { data, error } = await supabase
      .from('product')
      .select('*')
      .eq('is_bestseller', true)
      .eq('available', true)
      .limit(10)

    if (error) throw error

    return (data || []).map((item: any) => ({
      id: item.id,
      name: item.name,
      description: item.tagline || item.description || '',
      price: item.price,
      categoryid: item.categoryid,
      image: item.image,
      stock: item.stock,
      available: item.available,
      isFeatured: item.is_featured,
      isNew: item.is_new,
      isBestseller: item.is_bestseller,
      totalSales: item.total_sales,
      rating: item.rating,
      reviewCount: item.review_count,
      createdAt: item.created_at,
      updatedAt: item.updated_at
    }))
  },

  // Récupérer les catégories
  async getCategories() {
    const { data, error } = await supabase
      .from('category')
      .select('*')
      .order('libelle')

    if (error) throw error
    return data
  },

  // Recherche de produits
  async searchProducts(query: string) {
    const { data, error } = await supabase
      .from('product')
      .select('*')
      .or(`name.ilike.%${query}%,tagline.ilike.%${query}%`)
      .eq('available', true)

    if (error) throw error
    return data || []
  },

  // Récupérer les couleurs d'un produit
  async getProductColors(productId: string) {
    const { data, error } = await supabase
      .from('product_color')
      .select('*')
      .eq('product_id', productId)

    if (error) throw error
    return data || []
  },

  // Récupérer les stockages d'un produit
  async getProductStorage(productId: string) {
    const { data, error } = await supabase
      .from('product_storage')
      .select('*')
      .eq('product_id', productId)

    if (error) throw error
    return data || []
  },

  // Méthodes admin (non implémentées - utiliser dashboard Supabase)
  async createProduct(product: any) {
    throw new Error('Non implémenté - Utiliser le dashboard Supabase')
  },

  async updateProduct(id: number, product: any) {
    throw new Error('Non implémenté - Utiliser le dashboard Supabase')
  },

  async deleteProduct(id: number) {
    throw new Error('Non implémenté - Utiliser le dashboard Supabase')
  },

  async addReview(productId: number, review: any) {
    throw new Error('Non implémenté')
  },

  async getProductReviews(productId: number) {
    throw new Error('Non implémenté')
  }
}
