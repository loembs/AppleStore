import { useState, useEffect, useCallback } from 'react'
import { useAuth } from './useSupabase'
import { cartService } from '../lib/supabase'
import type { CartItem, Product, LocalCartItem } from '../lib/supabase'

// Hook pour le panier avec gestion de l'authentification
export const useCartWithAuth = () => {
  const { user, loading: authLoading } = useAuth()
  const [items, setItems] = useState<CartItem[]>([])
  const [localItems, setLocalItems] = useState<LocalCartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  // Clé pour le localStorage
  const LOCAL_CART_KEY = 'apple_store_cart'

  // Charger le panier local depuis localStorage
  const loadLocalCart = useCallback((): LocalCartItem[] => {
    try {
      const stored = localStorage.getItem(LOCAL_CART_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }, [])

  // Sauvegarder le panier local dans localStorage
  const saveLocalCart = useCallback((items: LocalCartItem[]) => {
    try {
      localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(items))
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du panier local:', error)
    }
  }, [])

  // Charger le panier Supabase
  const loadSupabaseCart = useCallback(async () => {
    if (!user) return []

    try {
      const data = await cartService.getCart()
      return data
    } catch (error) {
      console.error('Erreur lors du chargement du panier Supabase:', error)
      return []
    }
  }, [user])

  // Synchroniser le panier local vers Supabase
  const syncLocalToSupabase = useCallback(async () => {
    if (!user || localItems.length === 0) return

    try {
      setLoading(true)
      
      // Ajouter chaque article local au panier Supabase
      for (const localItem of localItems) {
        await cartService.addToCart(
          localItem.product_id,
          localItem.quantity,
          localItem.color_id,
          localItem.storage_id
        )
      }

      // Vider le panier local après synchronisation
      setLocalItems([])
      saveLocalCart([])
      
      // Recharger le panier Supabase
      const supabaseItems = await loadSupabaseCart()
      setItems(supabaseItems)
    } catch (error) {
      console.error('Erreur lors de la synchronisation:', error)
      setError('Erreur lors de la synchronisation du panier')
    } finally {
      setLoading(false)
    }
  }, [user, localItems, loadSupabaseCart, saveLocalCart])

  // Charger le panier approprié selon l'état d'authentification
  const loadCart = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      if (user) {
        // Utilisateur connecté : charger le panier Supabase
        const supabaseItems = await loadSupabaseCart()
        setItems(supabaseItems)
        setLocalItems([])
      } else {
        // Utilisateur non connecté : charger le panier local
        const localCart = loadLocalCart()
        setLocalItems(localCart)
        setItems([])
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erreur lors du chargement du panier')
    } finally {
      setLoading(false)
    }
  }, [user, loadSupabaseCart, loadLocalCart])

  // Effet pour charger le panier et synchroniser
  useEffect(() => {
    loadCart()
  }, [loadCart])

  // Effet pour synchroniser le panier local vers Supabase lors de la connexion
  useEffect(() => {
    if (user && localItems.length > 0) {
      syncLocalToSupabase()
    }
  }, [user, syncLocalToSupabase])

  // Ajouter un article au panier
  const addToCart = useCallback(async (
    productId: string,
    quantity: number,
    colorId?: number,
    storageId?: number,
    productData?: Product,
    colorData?: any,
    storageData?: any
  ) => {
    try {
      console.log('🛒 addToCart appelé:', { productId, quantity, colorId, storageId, user: !!user })
      setIsAddingToCart(true)
      setError(null)

      if (user) {
        // Utilisateur connecté : ajouter au panier Supabase
        await cartService.addToCart(productId, quantity, colorId, storageId)
        await loadCart() // Recharger le panier
      } else {
        // Utilisateur non connecté : ajouter au panier local
        console.log('🛒 Ajout au panier local (utilisateur non connecté)')
        const unitPrice = productData?.price || 0
        const totalPrice = unitPrice * quantity

        const newItem: LocalCartItem = {
          product_id: productId,
          color_id: colorId,
          storage_id: storageId,
          quantity,
          unit_price: unitPrice,
          total_price: totalPrice,
          added_at: new Date().toISOString(),
          product: productData,
          color: colorData,
          storage: storageData
        }

        console.log('🛒 Nouvel article créé:', newItem)

        // Vérifier si l'article existe déjà
        const existingIndex = localItems.findIndex(
          item => 
            item.product_id === productId && 
            item.color_id === colorId && 
            item.storage_id === storageId
        )

        console.log('🛒 Index existant:', existingIndex, 'Articles actuels:', localItems.length)

        let updatedItems: LocalCartItem[]
        if (existingIndex >= 0) {
          // Mettre à jour la quantité
          console.log('🛒 Mise à jour de la quantité existante')
          updatedItems = [...localItems]
          updatedItems[existingIndex].quantity += quantity
          updatedItems[existingIndex].total_price = updatedItems[existingIndex].unit_price * updatedItems[existingIndex].quantity
        } else {
          // Ajouter un nouvel article
          console.log('🛒 Ajout d\'un nouvel article')
          updatedItems = [...localItems, newItem]
        }

        console.log('🛒 Articles mis à jour:', updatedItems.length)
        setLocalItems(updatedItems)
        saveLocalCart(updatedItems)
        console.log('🛒 Panier sauvegardé dans localStorage')
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erreur lors de l\'ajout au panier')
      throw error
    } finally {
      setIsAddingToCart(false)
    }
  }, [user, localItems, loadCart, saveLocalCart])

  // Mettre à jour la quantité d'un article
  const updateQuantity = useCallback(async (itemId: number, quantity: number) => {
    try {
      setError(null)

      if (user) {
        // Utilisateur connecté : mettre à jour dans Supabase
        await cartService.updateCartItemQuantity(itemId, quantity)
        await loadCart()
      } else {
        // Utilisateur non connecté : mettre à jour localement
        if (quantity <= 0) {
          removeFromCart(itemId)
          return
        }

        const updatedItems = localItems.map(item => 
          item === localItems[itemId] 
            ? { ...item, quantity, total_price: item.unit_price * quantity }
            : item
        )

        setLocalItems(updatedItems)
        saveLocalCart(updatedItems)
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erreur lors de la mise à jour')
      throw error
    }
  }, [user, localItems, loadCart, saveLocalCart])

  // Supprimer un article du panier
  const removeFromCart = useCallback(async (itemId: number) => {
    try {
      setError(null)

      if (user) {
        // Utilisateur connecté : supprimer de Supabase
        await cartService.removeFromCart(itemId)
        await loadCart()
      } else {
        // Utilisateur non connecté : supprimer localement
        const updatedItems = localItems.filter((_, index) => index !== itemId)
        setLocalItems(updatedItems)
        saveLocalCart(updatedItems)
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erreur lors de la suppression')
      throw error
    }
  }, [user, localItems, loadCart, saveLocalCart])

  // Vider le panier
  const clearCart = useCallback(async () => {
    try {
      setError(null)

      if (user) {
        // Utilisateur connecté : vider le panier Supabase
        await cartService.clearCart()
        await loadCart()
      } else {
        // Utilisateur non connecté : vider le panier local
        setLocalItems([])
        saveLocalCart([])
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erreur lors du vidage du panier')
      throw error
    }
  }, [user, loadCart, saveLocalCart])

  // Calculer le total et le nombre d'articles
  const currentItems = user ? items : localItems
  const total = currentItems.reduce((sum, item) => sum + item.total_price, 0)
  const itemCount = currentItems.reduce((sum, item) => sum + item.quantity, 0)

  return {
    items: currentItems,
    localItems,
    total,
    itemCount,
    loading: loading || authLoading,
    error,
    isAuthenticated: !!user,
    isAddingToCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    refetch: loadCart
  }
}
