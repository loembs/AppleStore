import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

// Créer le client Supabase même avec des valeurs par défaut
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Fonction pour vérifier si Supabase est configuré
export const isSupabaseConfigured = () => {
  console.log('🔍 Debug Supabase:', {
    supabaseUrl,
    supabaseAnonKey: supabaseAnonKey.substring(0, 20) + '...',
    isConfigured: supabaseUrl !== 'https://placeholder.supabase.co' && supabaseAnonKey !== 'placeholder-key'
  })
  return supabaseUrl !== 'https://placeholder.supabase.co' && supabaseAnonKey !== 'placeholder-key'
}

// Types pour les données Apple Store
export interface Category {
  id: number
  libelle: string
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  name: string
  tagline: string | null
  price: number
  image: string | null
  categoryid: number
  stock: number
  available: boolean
  is_featured: boolean
  is_new: boolean
  is_bestseller: boolean
  rating: number
  review_count: number
  view_count: number
  total_sales: number
  created_at: string
  updated_at: string
}

export interface ProductColor {
  id: number
  product_id: string
  name: string
  hex: string | null
  code: string | null
  image: string | null
  price_adjustment: number
  available: boolean
  created_at: string
}

export interface ProductStorage {
  id: number
  product_id: string
  size: string
  price: number
  available: boolean
  created_at: string
}

export interface ProductFeature {
  id: number
  product_id: string
  feature: string
  created_at: string
}

export interface ProductSpecs {
  id: number
  product_id: string
  spec_name: string
  spec_value: string
  created_at: string
}

export interface ProductImages {
  id: number
  product_id: string
  image_url: string
  alt_text: string | null
  display_order: number
  is_hero: boolean
  created_at: string
}

export interface CartItem {
  id: number
  cart_id: number
  product_id: string
  color_id: number | null
  storage_id: number | null
  quantity: number
  unit_price: number
  total_price: number
  added_at: string
  updated_at: string
  // Relations
  product?: Product
  color?: ProductColor
  storage?: ProductStorage
}

export interface LocalCartItem {
  product_id: string
  color_id?: number
  storage_id?: number
  quantity: number
  unit_price: number
  total_price: number
  added_at: string
  // Données du produit pour l'affichage
  product?: Product
  color?: ProductColor
  storage?: ProductStorage
}

export interface OrderItem {
  id: number
  order_id: number
  product_id: string
  color_id: number | null
  storage_id: number | null
  product_name: string
  color_name: string | null
  storage_size: string | null
  quantity: number
  unit_price: number
  total_price: number
  created_at: string
  // Relations
  product?: Product
  color?: ProductColor
  storage?: ProductStorage
}

// Services pour les produits
export const productService = {
  // Récupérer toutes les catégories
  async getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
      .from('category')
      .select('*')
      .order('id')
    
    if (error) throw error
    return data || []
  },

  // Récupérer tous les produits
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
    return data || []
  },

  // Récupérer un produit par ID
  async getProduct(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('product')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Récupérer les produits mis en avant
  async getFeaturedProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('product')
      .select('*')
      .eq('available', true)
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Récupérer les nouveaux produits
  async getNewProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('product')
      .select('*')
      .eq('available', true)
      .eq('is_new', true)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Récupérer les meilleures ventes
  async getBestsellers(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('product')
      .select('*')
      .eq('available', true)
      .eq('is_bestseller', true)
      .order('total_sales', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Récupérer les couleurs d'un produit
  async getProductColors(productId: string): Promise<ProductColor[]> {
    const { data, error } = await supabase
      .from('product_color')
      .select('*')
      .eq('product_id', productId)
      .eq('available', true)
      .order('name')
    
    if (error) throw error
    return data || []
  },

  // Récupérer les options de stockage d'un produit
  async getProductStorage(productId: string): Promise<ProductStorage[]> {
    const { data, error } = await supabase
      .from('product_storage')
      .select('*')
      .eq('product_id', productId)
      .eq('available', true)
      .order('price')
    
    if (error) throw error
    return data || []
  },

  // Récupérer les fonctionnalités d'un produit
  async getProductFeatures(productId: string): Promise<ProductFeature[]> {
    const { data, error } = await supabase
      .from('product_feature')
      .select('*')
      .eq('product_id', productId)
      .order('id')
    
    if (error) throw error
    return data || []
  },

  // Récupérer les spécifications d'un produit
  async getProductSpecs(productId: string): Promise<ProductSpecs[]> {
    const { data, error } = await supabase
      .from('product_specs')
      .select('*')
      .eq('product_id', productId)
      .order('spec_name')
    
    if (error) throw error
    return data || []
  },

  // Récupérer les images d'un produit
  async getProductImages(productId: string): Promise<ProductImages[]> {
    const { data, error } = await supabase
      .from('product_images')
      .select('*')
      .eq('product_id', productId)
      .order('display_order')
    
    if (error) throw error
    return data || []
  },

  // Rechercher des produits
  async searchProducts(query: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('product')
      .select('*')
      .eq('available', true)
      .or(`name.ilike.%${query}%,tagline.ilike.%${query}%`)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Calculer le prix d'un produit avec ses options
  async calculateProductPrice(
    productId: string,
    colorId?: number,
    storageId?: number
  ): Promise<number> {
    const { data, error } = await supabase
      .rpc('calculate_product_price', {
        p_product_id: productId,
        p_color_id: colorId,
        p_storage_id: storageId
      })
    
    if (error) throw error
    return data || 0
  },

  // Marquer un produit comme vu
  async trackProductView(productId: string, sessionId?: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser()
    
    await supabase
      .rpc('track_product_view', {
        p_product_id: productId,
        p_user_id: user?.id || null,
        p_session_id: sessionId || null
      })
  }
}

// Services pour le panier
export const cartService = {
  // Récupérer le panier de l'utilisateur (version simplifiée)
  async getCart(): Promise<CartItem[]> {
    console.log('🔍 getCart: Panier géré côté client (localStorage)')
    return []
  },

  // Ajouter un article au panier (version simplifiée)
  async addToCart(
    productId: string,
    quantity: number,
    colorId?: number,
    storageId?: number
  ): Promise<void> {
    console.log('🔍 addToCart appelé:', { productId, quantity, colorId, storageId })
    
    // Pour l'instant, simuler un ajout réussi
    // Le vrai ajout sera géré par useCartWithAuth avec localStorage
    return Promise.resolve()
  },

  // Mettre à jour la quantité d'un article (version simplifiée)
  async updateCartItemQuantity(itemId: number, quantity: number): Promise<void> {
    console.log('🔍 updateCartItemQuantity appelé:', { itemId, quantity })
    return Promise.resolve()
  },

  // Supprimer un article du panier (version simplifiée)
  async removeFromCart(itemId: number): Promise<void> {
    console.log('🔍 removeFromCart appelé:', { itemId })
    return Promise.resolve()
  },

  // Vider le panier (version simplifiée)
  async clearCart(): Promise<void> {
    console.log('🔍 clearCart appelé')
    return Promise.resolve()
  }
}

// Services pour les commandes
export const orderService = {
  // Créer une commande
  async createOrder(
    items: Array<{
      product_id: string
      color_id?: number
      storage_id?: number
      quantity: number
    }>,
    shippingAddress: {
      first_name: string
      last_name: string
      address: string
      city: string
      postal_code?: string
      country: string
      phone: string
    },
    paymentMethod: string,
    notes?: string
  ): Promise<{ order_id: number; order_number: string; total_amount: number }> {
    const { data, error } = await supabase
      .functions
      .invoke('create-apple-order', {
        body: {
          items,
          shipping_address: shippingAddress,
          payment_method: paymentMethod,
          notes
        }
      })
    
    if (error) throw error
    return data
  },

  // Récupérer les commandes de l'utilisateur
  async getUserOrders(): Promise<any[]> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    const { data, error } = await supabase
      .from('ethio_orders')
      .select(`
        *,
        order_items:order_items(
          *,
          product:product_id(*),
          color:color_id(*),
          storage:storage_id(*)
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Récupérer une commande par ID
  async getOrder(orderId: number): Promise<any> {
    const { data, error } = await supabase
      .from('ethio_orders')
      .select(`
        *,
        order_items:order_items(
          *,
          product:product_id(*),
          color:color_id(*),
          storage:storage_id(*)
        )
      `)
      .eq('id', orderId)
      .single()
    
    if (error) throw error
    return data
  }
}

// Services d'authentification
export const authService = {
  // Se connecter avec email et mot de passe
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    return data
  },

  // S'inscrire avec email et mot de passe
  async signUp(email: string, password: string, userData: {
    first_name: string
    last_name: string
  }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
        emailRedirectTo: `${window.location.origin}/login`
      }
    })
    
    if (error) throw error
    return data
  },

  // Se déconnecter
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // Obtenir l'utilisateur actuel
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  },

  // Écouter les changements d'authentification
  onAuthStateChange(callback: (user: any) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(session?.user || null)
    })
  },

  // Connexion avec Google
  async signInWithGoogle(returnUrl?: string) {
    // Déterminer l'URL de redirection
    const redirectTo = returnUrl 
      ? `${window.location.origin}${returnUrl}` 
      : `${window.location.origin}/checkout`
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        }
      }
    })
    if (error) throw error
    return data
  }
}
