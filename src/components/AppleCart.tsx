import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useCart } from '../hooks/useSupabase'
import type { CartItem } from '../lib/supabase'

interface AppleCartProps {
  onCheckout?: () => void
}

export const AppleCart: React.FC<AppleCartProps> = ({ onCheckout }) => {
  const { items, total, itemCount, loading, updateQuantity, removeFromCart, clearCart } = useCart()
  const [updatingItems, setUpdatingItems] = useState<Set<number>>(new Set())

  const handleQuantityChange = async (itemId: number, newQuantity: number) => {
    setUpdatingItems(prev => new Set(prev).add(itemId))
    try {
      await updateQuantity(itemId, newQuantity)
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la quantité:', error)
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev)
        newSet.delete(itemId)
        return newSet
      })
    }
  }

  const handleRemoveItem = async (itemId: number) => {
    try {
      await removeFromCart(itemId)
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
    }
  }

  const handleClearCart = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir vider le panier ?')) {
      try {
        await clearCart()
      } catch (error) {
        console.error('Erreur lors du vidage du panier:', error)
      }
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Panier
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse flex gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Panier
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <ShoppingBag className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Votre panier est vide
            </h3>
            <p className="text-gray-600 mb-4">
              Découvrez nos produits Apple et ajoutez-les à votre panier.
            </p>
            <Button onClick={() => window.location.href = '/'}>
              Continuer mes achats
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Panier
            <Badge variant="secondary">{itemCount} article{itemCount > 1 ? 's' : ''}</Badge>
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearCart}
            className="text-red-600 hover:text-red-700"
          >
            Vider le panier
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
            <img
              src={item.product?.image || '/placeholder-product.jpg'}
              alt={item.product?.name || 'Produit'}
              className="w-16 h-16 object-cover rounded"
            />
            
            <div className="flex-1 space-y-2">
              <h4 className="font-semibold">{item.product?.name}</h4>
              
              {/* Configuration */}
              <div className="text-sm text-gray-600">
                {item.color && (
                  <span>Couleur: {item.color.name}</span>
                )}
                {item.storage && (
                  <span className={item.color ? ' • ' : ''}>
                    Stockage: {item.storage.size}
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    disabled={updatingItems.has(item.id) || item.quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value) || 1
                      handleQuantityChange(item.id, newQuantity)
                    }}
                    className="w-16 text-center"
                    min="1"
                    disabled={updatingItems.has(item.id)}
                  />
                  
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    disabled={updatingItems.has(item.id)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="text-right">
                  <div className="font-semibold">
                    {item.total_price.toLocaleString('fr-FR')} €
                  </div>
                  <div className="text-sm text-gray-600">
                    {item.unit_price.toLocaleString('fr-FR')} € × {item.quantity}
                  </div>
                </div>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveItem(item.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        
        {/* Total */}
        <div className="border-t pt-4 space-y-4">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>{total.toLocaleString('fr-FR')} €</span>
          </div>
          
          <Button
            className="w-full"
            size="lg"
            onClick={onCheckout}
          >
            Commander maintenant
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
