import React from 'react'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Star, ShoppingCart, Heart } from 'lucide-react'
import { useCartWithAuth } from '../hooks/useCartWithAuth'
import type { Product } from '../lib/supabase'

interface ProductListViewProps {
  product: Product
  onViewDetails?: (product: Product) => void
  onAddToWishlist?: (product: Product) => void 
}

export const ProductListView: React.FC<ProductListViewProps> = ({
  product,
  onViewDetails,
  onAddToWishlist
}) => {
  const { addToCart } = useCartWithAuth()

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, 1, undefined, undefined, product)
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error)
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
      <CardContent className="p-3 md:p-4">
        <div className="flex gap-3 md:gap-4">
          {/* Image */}
          <div className="relative flex-shrink-0 w-24 h-24 md:w-40 md:h-40">
            <img
              src={product.image || '/placeholder-product.jpg'}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
            
            {/* Badges */}
            <div className="absolute top-1 left-1 md:top-2 md:left-2 flex flex-col gap-1">
              {product.is_new && (
                <Badge variant="default" className="bg-green-500 text-[10px] md:text-xs px-1 py-0">
                  Nouveau
                </Badge>
              )}
              {product.is_featured && (
                <Badge variant="secondary" className="bg-blue-500 text-[10px] md:text-xs px-1 py-0">
                  Vedette
                </Badge>
              )}
              {product.is_bestseller && (
                <Badge variant="destructive" className="bg-red-500 text-[10px] md:text-xs px-1 py-0">
                  Best-seller
                </Badge>
              )}
            </div>
          </div>

          {/* Contenu */}
          <div className="flex-1 flex flex-col justify-between min-w-0 overflow-hidden">
            <div className="space-y-1 md:space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base md:text-lg line-clamp-2">
                    {product.name}
                  </h3>
                  
                  {product.tagline && (
                    <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 mt-0.5 md:mt-1">
                      {product.tagline}
                    </p>
                  )}
                </div>

                {/* Bouton wishlist */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden md:flex flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={handleAddToWishlist}
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>

              {/* Rating */}
              {product.rating > 0 && (
                <div className="hidden md:flex items-center gap-1">
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

              {/* Prix et Stock */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-xl md:text-2xl font-bold whitespace-nowrap">
                  {product.price.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} €
                </span>
                
                <div className="text-xs md:text-sm text-muted-foreground flex-shrink-0">
                  {product.stock > 0 ? (
                    <span className="text-green-600 whitespace-nowrap">
                      {product.stock > 10 ? 'En stock' : `${product.stock} restants`}
                    </span>
                  ) : (
                    <span className="text-red-600 whitespace-nowrap">Rupture</span>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col md:flex-row gap-2 mt-3 md:mt-4">
              <Button
                variant="outline"
                className="w-full md:flex-1 text-sm md:text-base"
                onClick={handleViewDetails}
              >
                Voir détails
              </Button>
              
              <Button
                className="w-full md:flex-1 text-sm md:text-base"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Ajouter
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
