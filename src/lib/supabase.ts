import { 
  productService as providerProductService,
  cartService as providerCartService,
  orderService as providerOrderService,
  authService as providerAuthService
} from '@/services/providers'

// Importer le client Supabase depuis la configuration centrale (évite les instances multiples)
export { supabase } from '@/config/supabase'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

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

// Services pour les produits (DEPRECATED - utilisez les services depuis @/services/providers)
// Gardés pour compatibilité, mais redirigent vers les nouveaux providers
export const productService = providerProductService

// Services pour le panier (DEPRECATED - utilisez depuis @/services/providers)
export const cartService = providerCartService

// Services pour les commandes (DEPRECATED - utilisez depuis @/services/providers)
export const orderService = providerOrderService

// Services d'authentification (DEPRECATED - utilisez depuis @/services/providers)
export const authService = providerAuthService
