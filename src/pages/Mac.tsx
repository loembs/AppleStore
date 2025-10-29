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
import { testSupabaseConnection, testProducts } from '@/utils/testSupabase';
import { debugProduction, testProductionConfig, showProductionError } from '@/utils/productionDebug';

const Mac = () => {
  const navigate = useNavigate();
  
  // Charger les produits Mac depuis Supabase (catégorie 1 = Mac)
  const { products: macProducts, loading, error } = useProducts(1);

  const macModels = [
    {
      id: 'macbook-pro-14',
      name: 'MacBook Pro 14"',
      tagline: 'Supercharged by M5.',
      price: 'From $1,999',
      image: 'https://res.cloudinary.com/dlna2kuo1/image/upload/v1761665729/Mackbook_pro_14_yz8kbb.jpg',
      colors: [
        { name: 'Space Gray', hex: '#8E8E93', code: 'space-gray' },
        { name: 'Silver', hex: '#C7C7CC', code: 'silver' }
      ],
      storage: [
        { size: '512GB', price: 1999 },
        { size: '1TB', price: 2199 },
        { size: '2TB', price: 2599 },
        { size: '4TB', price: 3399 }
      ],
      features: ['M5 chip', 'Liquid Retina XDR display', 'Up to 22 hours battery', 'Pro camera system']
    },
    {
      id: 'macbook-pro-16',
      name: 'MacBook Pro 16"',
      tagline: 'Supercharged by M5.',
      price: 'From $2,499',
      image: 'https://res.cloudinary.com/dlna2kuo1/image/upload/v1761665729/Mackbook_pro_14_yz8kbb.jpg',
      colors: [
        { name: 'Space Gray', hex: '#8E8E93', code: 'space-gray' },
        { name: 'Silver', hex: '#C7C7CC', code: 'silver' }
      ],
      storage: [
        { size: '512GB', price: 2499 },
        { size: '1TB', price: 2699 },
        { size: '2TB', price: 3099 },
        { size: '4TB', price: 3899 }
      ],
      features: ['M5 chip', 'Liquid Retina XDR display', 'Up to 22 hours battery', 'Pro camera system']
    },
    {
      id: 'macbook-air-13',
      name: 'MacBook Air 13"',
      tagline: 'Supercharged by M5.',
      price: 'From $1,099',
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80',
      colors: [
        { name: 'Midnight', hex: '#1C1C1E', code: 'midnight' },
        { name: 'Starlight', hex: '#F2F2F7', code: 'starlight' },
        { name: 'Space Gray', hex: '#8E8E93', code: 'space-gray' },
        { name: 'Silver', hex: '#C7C7CC', code: 'silver' }
      ],
      storage: [
        { size: '256GB', price: 1099 },
        { size: '512GB', price: 1299 },
        { size: '1TB', price: 1699 },
        { size: '2TB', price: 2299 }
      ],
      features: ['M5 chip', 'Liquid Retina display', 'Up to 18 hours battery', '1080p FaceTime camera']
    },
    {
      id: 'macbook-air-15',
      name: 'MacBook Air 15"',
      tagline: 'Supercharged by M5.',
      price: 'From $1,299',
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80',
      colors: [
        { name: 'Midnight', hex: '#1C1C1E', code: 'midnight' },
        { name: 'Starlight', hex: '#F2F2F7', code: 'starlight' },
        { name: 'Space Gray', hex: '#8E8E93', code: 'space-gray' },
        { name: 'Silver', hex: '#C7C7CC', code: 'silver' }
      ],
      storage: [
        { size: '256GB', price: 1299 },
        { size: '512GB', price: 1499 },
        { size: '1TB', price: 1899 },
        { size: '2TB', price: 2499 }
      ],
      features: ['M5 chip', 'Liquid Retina display', 'Up to 18 hours battery', '1080p FaceTime camera']
    },
    {
      id: 'imac',
      name: 'iMac',
      tagline: 'The all-in-one for all.',
      price: 'From $1,299',
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80',
      colors: [
        { name: 'Blue', hex: '#007AFF', code: 'blue' },
        { name: 'Green', hex: '#32CD32', code: 'green' },
        { name: 'Pink', hex: '#FF69B4', code: 'pink' },
        { name: 'Silver', hex: '#C7C7CC', code: 'silver' },
        { name: 'Yellow', hex: '#FFD700', code: 'yellow' },
        { name: 'Orange', hex: '#FF9500', code: 'orange' },
        { name: 'Purple', hex: '#AF52DE', code: 'purple' }
      ],
      storage: [
        { size: '256GB', price: 1299 },
        { size: '512GB', price: 1499 },
        { size: '1TB', price: 1899 }
      ],
      features: ['M5 chip', '24-inch 4.5K Retina display', '1080p FaceTime camera', 'Six-speaker sound system']
    },
    {
      id: 'mac-studio',
      name: 'Mac Studio',
      tagline: 'Supercharged by M5.',
      price: 'From $1,999',
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80',
      colors: [
        { name: 'Silver', hex: '#C7C7CC', code: 'silver' }
      ],
      storage: [
        { size: '512GB', price: 1999 },
        { size: '1TB', price: 2199 },
        { size: '2TB', price: 2599 },
        { size: '4TB', price: 3399 },
        { size: '8TB', price: 4999 }
      ],
      features: ['M5 chip', 'Up to 8TB SSD', 'Multiple Thunderbolt ports', 'Professional connectivity']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center bg-black text-white">
        <div className="absolute inset-0 w-full h-full">
            <video 
              src="https://res.cloudinary.com/dlna2kuo1/video/upload/v1761670721/Macvideo_s6xjzx.mp4"
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          <div className=" relative z-10 text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-4">MacBook Air M4</h1>
           
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg"
                onClick={() => navigate('/mac')}
              >
                Learn more
              </Button>
              <Button 
                variant="outline"
                className="border-white text-black hover:bg-white hover:text-black px-6 py-3 text-lg"
                onClick={() => navigate('/mac')}
              >
                Buy
              </Button>
            </div>
          </div>
        </section>

        {/* Mac Models Grid */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-4">Which Mac is right for you?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Compare features, performance, and prices to find the perfect Mac for your needs.
              </p>
            </div>

            {/* Utiliser les données Supabase si disponibles, sinon les données statiques */}
                 {macProducts.length > 0 ? (
                   <AppleProductGrid 
                     categoryId={1}
                     onProductClick={(product) => navigate(`/mac/${product.id}`)}
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
                    Pour afficher les produits Mac depuis la base de données, veuillez configurer Supabase.
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
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Button 
                        onClick={() => {
                          debugProduction()
                          alert('Debug affiché dans la console (F12)')
                        }}
                        size="sm"
                        variant="outline"
                      >
                        Debug Config
                      </Button>
                      <Button 
                        onClick={async () => {
                          console.log('🧪 Test de connexion...')
                          const result = await testSupabaseConnection()
                          if (result.success) {
                            alert('✅ Connexion Supabase réussie! Vérifiez la console.')
                          } else {
                            const errorInfo = showProductionError(result.error)
                            alert(`❌ Erreur: ${result.error}`)
                          }
                        }}
                        size="sm"
                        variant="outline"
                      >
                        Test Connexion
                      </Button>
                      <Button 
                        onClick={async () => {
                          console.log('🧪 Test des produits...')
                          const result = await testProducts()
                          if (result.success) {
                            alert(`✅ ${result.data?.length || 0} produits trouvés! Vérifiez la console.`)
                          } else {
                            const errorInfo = showProductionError(result.error)
                            alert(`❌ Erreur: ${result.error}`)
                          }
                        }}
                        size="sm"
                        variant="outline"
                      >
                        Test Produits
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>


        {/* Performance Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-8">M5 Performance</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The most advanced chip ever built for a personal computer.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-2xl font-semibold">CPU Performance</h3>
                <p className="text-gray-600">Up to 3.5x faster than the fastest Intel-based MacBook Pro.</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🎮</span>
                </div>
                <h3 className="text-2xl font-semibold">GPU Performance</h3>
                <p className="text-gray-600">Up to 5x faster graphics performance for professional workflows.</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🔋</span>
                </div>
                <h3 className="text-2xl font-semibold">Battery Life</h3>
                <p className="text-gray-600">Up to 22 hours of battery life for all-day productivity.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Compare Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">Compare Mac models</h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              See the differences between Mac models and find the one that's right for you.
            </p>
            <Button 
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg"
            >
              Compare all models
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Mac;