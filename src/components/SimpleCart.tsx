import React from 'react'
import { useCartWithAuth } from '../hooks/useCartWithAuth'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { ShoppingCart, Trash2 } from 'lucide-react'

export const SimpleCart: React.FC = () => {
  const { items, total, itemCount, clearCart, removeFromCart } = useCartWithAuth()

  if (itemCount === 0) {
    return (
      <Card className="w-80">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Panier (0)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-4">
            Votre panier est vide
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Panier ({itemCount})
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearCart}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <div className="flex-1">
              <p className="font-medium text-sm">
                {item.product?.name || `Produit ${item.product_id}`}
              </p>
              <p className="text-xs text-gray-500">
                Quantité: {item.quantity}
              </p>
              {item.color && (
                <p className="text-xs text-gray-500">
                  Couleur: {item.color.name}
                </p>
              )}
              {item.storage && (
                <p className="text-xs text-gray-500">
                  Stockage: {item.storage.size}
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="font-medium">
                {item.total_price.toLocaleString('fr-FR', {
                  style: 'currency',
                  currency: 'EUR'
                })}
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFromCart(index)}
                className="text-red-600 hover:text-red-700 p-1 h-auto"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
        
        <div className="border-t pt-3">
          <div className="flex justify-between items-center font-bold text-lg">
            <span>Total:</span>
            <span>
              {total.toLocaleString('fr-FR', {
                style: 'currency',
                currency: 'EUR'
              })}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
