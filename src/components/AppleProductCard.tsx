import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Star, ShoppingCart, Heart } from 'lucide-react'
import { useCartWithAuth } from '../hooks/useCartWithAuth'
import type { Product } from '../lib/supabase'

interface AppleProductCardProps {
  product: Product
  onViewDetails?: (product: Product) => void
  onAddToWishlist?: (product: Product) => void 
}

export const AppleProductCard: React.FC<AppleProductCardProps> = ({
  product,
  onViewDetails,
  onAddToWishlist
}) => {
  const { addToCart } = useCartWithAuth()

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, 1, undefined, undefined, product)
      // Optionnel: afficher une notification de succès
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error)
      // Optionnel: afficher une notification d'erreur
    }
  }

  const handleViewDetails = () => {
    onViewDetails?.(product)
  }

  const handleAddToWishlist = () => {
    onAddToWishlist?.(product)
  }

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-4">
        <div className="relative">
          <img
            src={product.image || '/placeholder-product.jpg'}
            alt={product.name}
            className="w-full h-48 object-cover rounded-lg"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.is_new && (
              <Badge variant="default" className="bg-green-500">
                Nouveau
              </Badge>
            )}
            {product.is_featured && (
              <Badge variant="secondary" className="bg-blue-500">
                Vedette
              </Badge>
            )}
            {product.is_bestseller && (
              <Badge variant="destructive" className="bg-red-500">
                Best-seller
              </Badge>
            )}
          </div>

          {/* Bouton wishlist */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleAddToWishlist}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg line-clamp-2">
            {product.name}
          </h3>
          
          {product.tagline && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.tagline}
            </p>
          )}

          {/* Rating */}
          {product.rating > 0 && (
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating.toFixed(1)} ({product.review_count})
              </span>
            </div>
          )}

          {/* Prix */}
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">
              {product.price.toLocaleString('fr-FR')} €
            </span>
            
            {/* Stock */}
            <div className="text-sm text-muted-foreground">
              {product.stock > 0 ? (
                <span className="text-green-600">
                  {product.stock > 10 ? 'En stock' : `${product.stock} restants`}
                </span>
              ) : (
                <span className="text-red-600">Rupture de stock</span>
              )}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex gap-2 w-full">
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleViewDetails}
          >
            Voir détails
          </Button>
          
          <Button
            className="flex-1"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Ajouter
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
