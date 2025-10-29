import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AppleProductGrid } from '@/components/AppleProductGrid';
import { ProductSkeleton } from '@/components/ProductSkeleton';
import { useProducts } from '@/hooks/useSupabase';

const IPhone = () => {
  const navigate = useNavigate();
  
  // Charger les produits iPhone depuis Supabase (catégorie 2 = iPhone)
  const { products: iphoneProducts, loading, error } = useProducts(2);

  const iphoneModels = [
    {
      id: 'iphone-17-pro',
      name: 'iPhone 17 Pro',
      tagline: 'All out Pro.',
      price: 'From $999',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80',
      colors: [
        { name: 'Natural Titanium', hex: '#8E8E93', code: 'natural' },
        { name: 'Blue Titanium', hex: '#007AFF', code: 'blue' },
        { name: 'White Titanium', hex: '#F2F2F7', code: 'white' },
        { name: 'Black Titanium', hex: '#1C1C1E', code: 'black' }
      ],
      storage: [
        { size: '128GB', price: 999 },
        { size: '256GB', price: 1099 },
        { size: '512GB', price: 1299 },
        { size: '1TB', price: 1499 }
      ],
      features: ['A18 Pro chip', 'Pro camera system', 'Titanium design', 'Action Button']
    },
    {
      id: 'iphone-17',
      name: 'iPhone 17',
      tagline: 'The thinnest iPhone ever.',
      price: 'From $799',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80',
      colors: [
        { name: 'Pink', hex: '#FF69B4', code: 'pink' },
        { name: 'Yellow', hex: '#FFD700', code: 'yellow' },
        { name: 'Green', hex: '#32CD32', code: 'green' },
        { name: 'Blue', hex: '#007AFF', code: 'blue' },
        { name: 'Black', hex: '#1C1C1E', code: 'black' }
      ],
      storage: [
        { size: '128GB', price: 799 },
        { size: '256GB', price: 899 },
        { size: '512GB', price: 1099 }
      ],
      features: ['A18 chip', 'Advanced camera system', 'Ceramic Shield', 'MagSafe']
    },
    {
      id: 'iphone-16',
      name: 'iPhone 16',
      tagline: 'Big and bigger.',
      price: 'From $699',
      image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&q=80',
      colors: [
        { name: 'Pink', hex: '#FF69B4', code: 'pink' },
        { name: 'Yellow', hex: '#FFD700', code: 'yellow' },
        { name: 'Green', hex: '#32CD32', code: 'green' },
        { name: 'Blue', hex: '#007AFF', code: 'blue' },
        { name: 'Black', hex: '#1C1C1E', code: 'black' }
      ],
      storage: [
        { size: '128GB', price: 699 },
        { size: '256GB', price: 799 },
        { size: '512GB', price: 999 }
      ],
      features: ['A17 Pro chip', 'Advanced camera system', 'Ceramic Shield', 'MagSafe']
    },
    {
      id: 'iphone-15',
      name: 'iPhone 15',
      tagline: 'New camera. New design. Newphoria.',
      price: 'From $599',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80',
      colors: [
        { name: 'Pink', hex: '#FF69B4', code: 'pink' },
        { name: 'Yellow', hex: '#FFD700', code: 'yellow' },
        { name: 'Green', hex: '#32CD32', code: 'green' },
        { name: 'Blue', hex: '#007AFF', code: 'blue' },
        { name: 'Black', hex: '#1C1C1E', code: 'black' }
      ],
      storage: [
        { size: '128GB', price: 599 },
        { size: '256GB', price: 699 },
        { size: '512GB', price: 899 }
      ],
      features: ['A16 Bionic chip', 'Advanced camera system', 'Ceramic Shield', 'MagSafe']
    },
    {
      id: 'iphone-se',
      name: 'iPhone SE',
      tagline: 'Love the power. Love the price.',
      price: 'From $429',
      image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&q=80',
      colors: [
        { name: 'Midnight', hex: '#1C1C1E', code: 'midnight' },
        { name: 'Starlight', hex: '#F2F2F7', code: 'starlight' },
        { name: 'Red', hex: '#FF3B30', code: 'red' }
      ],
      storage: [
        { size: '64GB', price: 429 },
        { size: '128GB', price: 479 },
        { size: '256GB', price: 579 }
      ],
      features: ['A15 Bionic chip', 'Single camera system', 'Touch ID', 'Wireless charging']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center bg-black text-white overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <video 
              src="https://res.cloudinary.com/dlna2kuo1/video/upload/v1761670225/iphonevideo_pgfrdl.mp4"
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          <div className="relative z-10 text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-4">iPhone</h1>
            <p className="text-2xl md:text-3xl mb-8">The most advanced iPhone lineup ever.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg"
                onClick={() => navigate('/iphone')}
              >
                Learn more
              </Button>
              <Button 
                variant="outline"
                className="border-white text-black hover:bg-white hover:text-black px-6 py-3 text-lg"
                onClick={() => navigate('/iphone')}
              >
                Buy
              </Button>
            </div>
          </div>
        </section>

        {/* iPhone Models Grid */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-4">Which iPhone is right for you?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Compare features, technical specifications, and prices to find the perfect iPhone.
              </p>
            </div>

            {/* Utiliser les données Supabase si disponibles, sinon les données statiques */}
            {iphoneProducts.length > 0 ? (
              <AppleProductGrid 
                categoryId={2}
                onProductClick={(product) => navigate('/product-config', { state: { product } })}
              />
            ) : loading ? (
              <ProductSkeleton count={6} />
            ) : (
              <div className="text-center py-12">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 max-w-2xl mx-auto">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">
                    Configuration Supabase requise
                  </h3>
                  <p className="text-blue-700 mb-6">
                    Pour afficher les produits iPhone depuis la base de données, veuillez configurer Supabase.
                  </p>
                  <div className="space-y-4">
                    <p className="text-sm text-blue-600">
                      1. Déployez Supabase : <code className="bg-blue-100 px-2 py-1 rounded">cd supabase && .\deploy-apple-store.ps1</code>
                    </p>
                    <p className="text-sm text-blue-600">
                      2. Mettez à jour <code className="bg-blue-100 px-2 py-1 rounded">.env.local</code> avec vos clés Supabase
                    </p>
                    <p className="text-sm text-blue-600">
                      3. Redémarrez l'application
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>


        {/* Compare Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">Compare iPhone models</h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              See the differences between iPhone models and find the one that's right for you.
            </p>
            <Button 
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg"
            >
              Compare all models
            </Button>
          </div>
        </section>

        {/* Apple Trade In */}
        <section className="py-24 bg-black text-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">Apple Trade In</h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Get up to $200–$700 in credit when you trade in iPhone 13 or higher.
            </p>
            <Button 
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg"
            >
              Get your estimate
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default IPhone;
