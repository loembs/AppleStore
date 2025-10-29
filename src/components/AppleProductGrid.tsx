import React from 'react'
import { AppleProductCard } from './AppleProductCard'
import { useProducts } from '../hooks/useSupabase'
import type { Product } from '../lib/supabase'

interface AppleProductGridProps {
  categoryId?: number
  onProductClick?: (product: Product) => void
  onAddToWishlist?: (product: Product) => void
}

export const AppleProductGrid: React.FC<AppleProductGridProps> = ({
  categoryId,
  onProductClick,
  onAddToWishlist
}) => {
  const { products, loading, error } = useProducts(categoryId)

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Erreur de chargement
        </h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Réessayer
        </button>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Aucun produit trouvé
        </h3>
        <p className="text-gray-600">
          {categoryId 
            ? 'Aucun produit dans cette catégorie pour le moment.'
            : 'Aucun produit disponible pour le moment.'
          }
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <AppleProductCard
          key={product.id}
          product={product}
          onViewDetails={onProductClick}
          onAddToWishlist={onAddToWishlist}
        />
      ))}
    </div>
  )
}
