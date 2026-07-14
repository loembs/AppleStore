// =============================================
// SERVICE COMMANDES - SUPABASE DIRECT
// =============================================
// Ce service remplace tous les appels au backend Java Render
// par des requêtes directes à Supabase

import { supabase } from '@/config/supabase'
import type { OrderItem } from '@/lib/supabase'

/**
 * Service de commandes utilisant Supabase directement
 */
export const orderServiceSupabase = {
  /**
   * Créer une nouvelle commande
   */
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
    // Récupérer l'utilisateur actuel
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Utilisateur non authentifié')

    // Récupérer le profil utilisateur
    const { data: userData } = await supabase
      .from('users')
      .select('id')
      .eq('auth_user_id', user.id)
      .single()

    if (!userData) throw new Error('Profil utilisateur non trouvé')

    // Calculer le total
    let totalAmount = 0
    const orderItems = []

    for (const item of items) {
      // Récupérer le produit
      const { data: product } = await supabase
        .from('product')
        .select('price, name')
        .eq('id', item.product_id)
        .single()

      if (!product) continue

      let itemPrice = product.price

      // Ajouter le prix de la couleur si spécifié
      if (item.color_id) {
        const { data: color } = await supabase
          .from('product_color')
          .select('price_adjustment')
          .eq('id', item.color_id)
          .single()

        if (color) itemPrice += color.price_adjustment || 0
      }

      // Utiliser le prix de stockage si spécifié
      if (item.storage_id) {
        const { data: storage } = await supabase
          .from('product_storage')
          .select('price')
          .eq('id', item.storage_id)
          .single()

        if (storage) itemPrice = storage.price || 0
      }

      totalAmount += itemPrice * item.quantity

      orderItems.push({
        product_id: item.product_id,
        color_id: item.color_id || null,
        storage_id: item.storage_id || null,
        product_name: product.name,
        quantity: item.quantity,
        unit_price: itemPrice,
        total_price: itemPrice * item.quantity
      })
    }

    // Générer un numéro de commande unique
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`

    // Créer la commande
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userData.id,
        order_number: orderNumber,
        total_amount: totalAmount,
        status: 'PENDING',
        payment_method: paymentMethod,
        payment_status: 'PENDING',
        shipping_address: shippingAddress,
        notes: notes || null
      })
      .select()
      .single()

    if (orderError) throw orderError

    // Créer les items de la commande
    const orderItemsData = orderItems.map(item => ({
      ...item,
      order_id: order.id
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItemsData)

    if (itemsError) throw itemsError

    // Vider le panier
    const { data: cart } = await supabase
      .from('carts')
      .select('id')
      .eq('user_id', userData.id)
      .single()

    if (cart) {
      await supabase
        .from('cart_items')
        .delete()
        .eq('cart_id', cart.id)
    }

    return {
      order_id: order.id,
      order_number: order.order_number,
      total_amount: order.total_amount
    }
  },

  /**
   * Récupérer toutes les commandes de l'utilisateur
   */
  async getUserOrders(): Promise<any[]> {
    // Récupérer l'utilisateur actuel
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    // Récupérer le profil utilisateur
    const { data: userData } = await supabase
      .from('users')
      .select('id')
      .eq('auth_user_id', user.id)
      .single()

    if (!userData) return []

    // Récupérer les commandes
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items(*)
      `)
      .eq('user_id', userData.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    return data || []
  },

  /**
   * Récupérer une commande par son ID
   */
  async getOrder(orderId: number): Promise<any> {
    // Récupérer l'utilisateur actuel
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Utilisateur non authentifié')

    // Récupérer le profil utilisateur
    const { data: userData } = await supabase
      .from('users')
      .select('id')
      .eq('auth_user_id', user.id)
      .single()

    if (!userData) throw new Error('Profil utilisateur non trouvé')

    // Récupérer la commande
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items(*)
      `)
      .eq('id', orderId)
      .eq('user_id', userData.id)
      .single()

    if (error) throw error

    return data
  },

  /**
   * Mettre à jour le statut d'une commande
   */
  async updateOrderStatus(orderId: number, status: string): Promise<any> {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      .select()
      .single()

    if (error) throw error
    return data
  },

  /**
   * Annuler une commande
   */
  async cancelOrder(orderId: number, reason?: string): Promise<any> {
    const { data, error } = await supabase
      .from('orders')
      .update({
        status: 'CANCELLED',
        notes: reason || null
      })
      .eq('id', orderId)
      .select()
      .single()

    if (error) throw error
    return data
  },

  /**
   * Obtenir les statistiques des commandes
   */
  async getOrderStatistics(): Promise<{
    totalOrders: number
    totalRevenue: number
    pendingOrders: number
    completedOrders: number
  }> {
    try {
      const orders = await this.getUserOrders()

      return {
        totalOrders: orders.length,
        totalRevenue: orders.reduce((sum, order) => sum + (order.total_amount || 0), 0),
        pendingOrders: orders.filter(order => order.status === 'PENDING').length,
        completedOrders: orders.filter(order =>
          order.status === 'DELIVERED' || order.status === 'SHIPPED'
        ).length
      }
    } catch (error) {
      console.warn('Erreur lors du calcul des statistiques:', error)
      return {
        totalOrders: 0,
        totalRevenue: 0,
        pendingOrders: 0,
        completedOrders: 0
      }
    }
  },

  /**
   * Libellés pour l'affichage
   */
  getOrderStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'PENDING': 'En attente',
      'CONFIRMED': 'Confirmée',
      'PROCESSING': 'En cours de traitement',
      'SHIPPED': 'Expédiée',
      'DELIVERED': 'Livrée',
      'CANCELLED': 'Annulée',
      'REFUNDED': 'Remboursée'
    }
    return labels[status] || status
  },

  getPaymentStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'PENDING': 'En attente',
      'PAID': 'Payé',
      'FAILED': 'Échoué',
      'REFUNDED': 'Remboursé'
    }
    return labels[status] || status
  },

  getPaymentMethodLabel(method: string): string {
    const labels: Record<string, string> = {
      'stripe': 'Carte de crédit',
      'card': 'Carte de crédit',
      'credit_card': 'Carte de crédit',
      'CREDIT_CARD': 'Carte de crédit',
      'PAYPAL': 'PayPal',
      'BANK_TRANSFER': 'Virement bancaire',
      'CASH_ON_DELIVERY': 'Paiement à la livraison'
    }
    return labels[method] || method
  }
}
