import { useState, useEffect } from 'react'
import { supabase, productService, cartService, orderService, authService } from '../lib/supabase'
import type { Product, Category, CartItem, ProductColor, ProductStorage } from '../lib/supabase'

// Hook pour l'authentification
export const useAuth = () => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Récupérer l'utilisateur actuel
    authService.getCurrentUser().then(setUser).finally(() => setLoading(false))

    // Écouter les changements d'authentification
    const { data: { subscription } } = authService.onAuthStateChange(setUser)

    return () => subscription.unsubscribe()
  }, [])

  return {
    user,
    loading,
    signIn: authService.signIn,
    signUp: authService.signUp,
    signOut: authService.signOut
  }
}

// Hook pour les produits
export const useProducts = (categoryId?: number) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await productService.getProducts(categoryId)
        setProducts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des produits')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [categoryId])

  return { products, loading, error, refetch: () => fetchProducts() }
}

// Hook pour les catégories
export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await productService.getCategories()
        setCategories(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des catégories')
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return { categories, loading, error }
}

// Hook pour un produit spécifique
export const useProduct = (productId: string) => {
  const [product, setProduct] = useState<Product | null>(null)
  const [colors, setColors] = useState<ProductColor[]>([])
  const [storage, setStorage] = useState<ProductStorage[]>([])
  const [features, setFeatures] = useState<string[]>([])
  const [specs, setSpecs] = useState<Record<string, string>>({})
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return

      try {
        setLoading(true)
        setError(null)

        // Charger le produit et ses données associées en parallèle
        const [
          productData,
          colorsData,
          storageData,
          featuresData,
          specsData,
          imagesData
        ] = await Promise.all([
          productService.getProduct(productId),
          productService.getProductColors(productId),
          productService.getProductStorage(productId),
          productService.getProductFeatures(productId),
          productService.getProductSpecs(productId),
          productService.getProductImages(productId)
        ])

        setProduct(productData)
        setColors(colorsData)
        setStorage(storageData)
        setFeatures(featuresData.map(f => f.feature))
        
        // Convertir les specs en objet
        const specsObj: Record<string, string> = {}
        specsData.forEach(spec => {
          specsObj[spec.spec_name] = spec.spec_value
        })
        setSpecs(specsObj)
        
        setImages(imagesData.map(img => img.image_url))

        // Marquer le produit comme vu
        await productService.trackProductView(productId)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement du produit')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  return {
    product,
    colors,
    storage,
    features,
    specs,
    images,
    loading,
    error
  }
}

// Hook pour les produits mis en avant
export const useFeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await productService.getFeaturedProducts()
        setProducts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des produits')
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  return { products, loading, error }
}

// Hook pour les nouveaux produits
export const useNewProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await productService.getNewProducts()
        setProducts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des produits')
      } finally {
        setLoading(false)
      }
    }

    fetchNewProducts()
  }, [])

  return { products, loading, error }
}

// Hook pour les meilleures ventes
export const useBestsellers = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBestsellers = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await productService.getBestsellers()
        setProducts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des produits')
      } finally {
        setLoading(false)
      }
    }

    fetchBestsellers()
  }, [])

  return { products, loading, error }
}

// Hook pour la recherche de produits
export const useProductSearch = (query: string) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!query.trim()) {
      setProducts([])
      return
    }

    const searchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await productService.searchProducts(query)
        setProducts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors de la recherche')
      } finally {
        setLoading(false)
      }
    }

    const timeoutId = setTimeout(searchProducts, 300) // Debounce
    return () => clearTimeout(timeoutId)
  }, [query])

  return { products, loading, error }
}

// Hook pour le panier
export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCart = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await cartService.getCart()
      setItems(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement du panier')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  const addToCart = async (
    productId: string,
    quantity: number,
    colorId?: number,
    storageId?: number
  ) => {
    try {
      setError(null)
      await cartService.addToCart(productId, quantity, colorId, storageId)
      await fetchCart() // Recharger le panier
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'ajout au panier')
      throw err
    }
  }

  const updateQuantity = async (itemId: number, quantity: number) => {
    try {
      setError(null)
      await cartService.updateCartItemQuantity(itemId, quantity)
      await fetchCart() // Recharger le panier
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour')
      throw err
    }
  }

  const removeFromCart = async (itemId: number) => {
    try {
      setError(null)
      await cartService.removeFromCart(itemId)
      await fetchCart() // Recharger le panier
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression')
      throw err
    }
  }

  const clearCart = async () => {
    try {
      setError(null)
      await cartService.clearCart()
      await fetchCart() // Recharger le panier
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du vidage du panier')
      throw err
    }
  }

  // Calculer le total du panier
  const total = items.reduce((sum, item) => sum + item.total_price, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return {
    items,
    total,
    itemCount,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    refetch: fetchCart
  }
}

// Hook pour les commandes
export const useOrders = () => {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchOrders = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await orderService.getUserOrders()
      setOrders(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des commandes')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const createOrder = async (
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
  ) => {
    try {
      setError(null)
      const result = await orderService.createOrder(items, shippingAddress, paymentMethod, notes)
      await fetchOrders() // Recharger les commandes
      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la création de la commande')
      throw err
    }
  }

  return {
    orders,
    loading,
    error,
    createOrder,
    refetch: fetchOrders
  }
}

// Hook pour le calcul de prix
export const useProductPrice = (productId: string, colorId?: number, storageId?: number) => {
  const [price, setPrice] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!productId) return

    const calculatePrice = async () => {
      try {
        setLoading(true)
        setError(null)
        const calculatedPrice = await productService.calculateProductPrice(productId, colorId, storageId)
        setPrice(calculatedPrice)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du calcul du prix')
      } finally {
        setLoading(false)
      }
    }

    calculatePrice()
  }, [productId, colorId, storageId])

  return { price, loading, error }
}
