import React from 'react'
import { Card } from './ui/card'

interface ProductSkeletonProps {
  count?: number
}

export const ProductSkeleton: React.FC<ProductSkeletonProps> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(count)].map((_, idx) => (
        <Card key={idx} className="overflow-hidden border-0 bg-gray-50 animate-pulse">
          <div className="aspect-square bg-gray-200"></div>
          <div className="p-8 space-y-6">
            <div className="space-y-3">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            </div>
            
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="flex gap-2">
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="flex gap-2">
                <div className="h-6 bg-gray-200 rounded w-12"></div>
                <div className="h-6 bg-gray-200 rounded w-12"></div>
                <div className="h-6 bg-gray-200 rounded w-12"></div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="space-y-1">
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
            
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </Card>
      ))}
    </div>
  )
}
