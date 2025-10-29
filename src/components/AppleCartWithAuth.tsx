import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Trash2, Minus, Plus, ShoppingBag, LogIn, User } from 'lucide-react'
import { useCartWithAuth } from '../hooks/useCartWithAuth'
import { useAuth } from '../hooks/useSupabase'
import type { CartItem, LocalCartItem } from '../lib/supabase'

interface AppleCartWithAuthProps {
  onCheckout?: () => void
  onLogin?: () => void
}

export const AppleCartWithAuth: React.FC<AppleCartWithAuthProps> = ({ 
  onCheckout, 
  onLogin 
}) => {
  const { user } = useAuth()
  const { 
    items, 
    total, 
    itemCount, 
    loading, 
    isAuthenticated, 
    updateQuantity, 
    removeFromCart, 
    clearCart 
  } = useCartWithAuth()
  
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

  const handleCheckout = () => {
    if (!isAuthenticated) {
      onLogin?.()
      return
    }
    onCheckout?.()
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
            {!isAuthenticated && (
              <Badge variant="outline" className="text-orange-600">
                Panier temporaire
              </Badge>
            )}
          </CardTitle>
          <div className="flex gap-2">
            {!isAuthenticated && (
              <Button
                variant="outline"
                size="sm"
                onClick={onLogin}
                className="text-blue-600 hover:text-blue-700"
              >
                <LogIn className="h-4 w-4 mr-1" />
                Se connecter
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearCart}
              className="text-red-600 hover:text-red-700"
            >
              Vider le panier
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Message d'information pour les utilisateurs non connectés */}
        {!isAuthenticated && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-orange-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-orange-800 mb-1">
                  Panier temporaire
                </h4>
                <p className="text-sm text-orange-700">
                  Connectez-vous pour sauvegarder votre panier et passer commande.
                  Vos articles seront conservés après la connexion.
                </p>
              </div>
            </div>
          </div>
        )}

        {items.map((item, index) => {
          const itemId = 'id' in item ? item.id : index
          const product = 'product' in item ? item.product : item.product
          const color = 'color' in item ? item.color : item.color
          const storage = 'storage' in item ? item.storage : item.storage

          return (
            <div key={itemId} className="flex gap-4 p-4 border rounded-lg">
              <img
                src={product?.image || '/placeholder-product.jpg'}
                alt={product?.name || 'Produit'}
                className="w-16 h-16 object-cover rounded"
              />
              
              <div className="flex-1 space-y-2">
                <h4 className="font-semibold">{product?.name}</h4>
                
                {/* Configuration */}
                <div className="text-sm text-gray-600">
                  {color && (
                    <span>Couleur: {color.name}</span>
                  )}
                  {storage && (
                    <span className={color ? ' • ' : ''}>
                      Stockage: {storage.size}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleQuantityChange(itemId, item.quantity - 1)}
                      disabled={updatingItems.has(itemId) || item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value) || 1
                        handleQuantityChange(itemId, newQuantity)
                      }}
                      className="w-16 text-center"
                      min="1"
                      disabled={updatingItems.has(itemId)}
                    />
                    
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleQuantityChange(itemId, item.quantity + 1)}
                      disabled={updatingItems.has(itemId)}
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
                onClick={() => handleRemoveItem(itemId)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )
        })}
        
        {/* Total */}
        <div className="border-t pt-4 space-y-4">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>{total.toLocaleString('fr-FR')} €</span>
          </div>
          
          <Button
            className="w-full"
            size="lg"
            onClick={handleCheckout}
          >
            {isAuthenticated ? 'Commander maintenant' : 'Se connecter pour commander'}
          </Button>

          {!isAuthenticated && (
            <p className="text-sm text-gray-600 text-center">
              Vous devez être connecté pour passer commande
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
