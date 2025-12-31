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

const IPad = () => {
  const navigate = useNavigate();
  
  // Charger les produits iPad depuis le backend (catégorie 2 = iPad)
  const { products: ipadProducts, loading, error } = useProducts(2);

  const ipadModels = [
    {
      id: 'ipad-pro',
      name: 'iPad Pro',
      tagline: 'Advanced AI performance and game-changing capabilities.',
      price: 'From $799',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80',
      sizes: ['11-inch', '13-inch'],
      colors: [
        { name: 'Space Gray', hex: '#8E8E93', code: 'space-gray' },
        { name: 'Silver', hex: '#C7C7CC', code: 'silver' }
      ],
      storage: [
        { size: '256GB', price: 799 },
        { size: '512GB', price: 999 },
        { size: '1TB', price: 1399 },
        { size: '2TB', price: 1799 }
      ],
      features: ['M5 chip', 'Liquid Retina XDR display', 'Face ID', 'Apple Pencil Pro support'],
      connectivity: [
        { name: 'WiFi', price: 0 },
        { name: 'WiFi + Cellular', price: 200 }
      ]
    },
    {
      id: 'ipad-air',
      name: 'iPad Air',
      tagline: 'Powerful. Colorful. Wonderful.',
      price: 'From $599',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80',
      sizes: ['11-inch', '13-inch'],
      colors: [
        { name: 'Space Gray', hex: '#8E8E93', code: 'space-gray' },
        { name: 'Purple', hex: '#AF52DE', code: 'purple' },
        { name: 'Blue', hex: '#007AFF', code: 'blue' },
        { name: 'Starlight', hex: '#F2F2F7', code: 'starlight' }
      ],
      storage: [
        { size: '128GB', price: 599 },
        { size: '256GB', price: 749 },
        { size: '512GB', price: 949 },
        { size: '1TB', price: 1349 }
      ],
      features: ['M4 chip', 'Liquid Retina display', 'Touch ID', 'Apple Pencil Pro support'],
      connectivity: [
        { name: 'WiFi', price: 0 },
        { name: 'WiFi + Cellular', price: 150 }
      ]
    },
    {
      id: 'ipad',
      name: 'iPad',
      tagline: 'Lovable. Drawable. Magical.',
      price: 'From $449',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80',
      sizes: ['10.9-inch'],
      colors: [
        { name: 'Space Gray', hex: '#8E8E93', code: 'space-gray' },
        { name: 'Silver', hex: '#C7C7CC', code: 'silver' },
        { name: 'Blue', hex: '#007AFF', code: 'blue' },
        { name: 'Pink', hex: '#FF69B4', code: 'pink' },
        { name: 'Yellow', hex: '#FFD700', code: 'yellow' }
      ],
      storage: [
        { size: '64GB', price: 449 },
        { size: '256GB', price: 599 }
      ],
      features: ['A16 Bionic chip', 'Liquid Retina display', 'Touch ID', 'Apple Pencil support'],
      connectivity: [
        { name: 'WiFi', price: 0 },
        { name: 'WiFi + Cellular', price: 130 }
      ]
    },
    {
      id: 'ipad-mini',
      name: 'iPad mini',
      tagline: 'Mega power. Mini sized.',
      price: 'From $499',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80',
      sizes: ['8.3-inch'],
      colors: [
        { name: 'Space Gray', hex: '#8E8E93', code: 'space-gray' },
        { name: 'Purple', hex: '#AF52DE', code: 'purple' },
        { name: 'Pink', hex: '#FF69B4', code: 'pink' },
        { name: 'Starlight', hex: '#F2F2F7', code: 'starlight' }
      ],
      storage: [
        { size: '64GB', price: 499 },
        { size: '256GB', price: 649 }
      ],
      features: ['A17 Bionic chip', 'Liquid Retina display', 'Touch ID', 'Apple Pencil support'],
      connectivity: [
        { name: 'WiFi', price: 0 },
        { name: 'WiFi + Cellular', price: 130 }
      ]
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
              src="https://res.cloudinary.com/dlna2kuo1/video/upload/v1761668216/video_ipad_pro_vxkao7.mp4"
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          <div className="relative z-10 text-center px-6">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">iPad</h1>
            <p className="text-2xl md:text-3xl mb-12 font-light">The future of iPad.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-lg"
                onClick={() => navigate('/ipad')}
              >
                En savoir plus
              </Button>
              <Button 
                variant="outline"
                className="border-white text-black hover:bg-white hover:text-black px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-lg"
                onClick={() => navigate('/ipad')}
              >
                Acheter
              </Button>
            </div>
          </div>
        </section>

        {/* iPad Models Grid */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Which iPad is right for you?</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Compare features, sizes, and prices to find the perfect iPad for your needs.
              </p>
            </div>

            {/* Utiliser les données du backend si disponibles, sinon les données statiques */}
            {ipadProducts.length > 0 ? (
              <AppleProductGrid 
                categoryId={2}
                onProductClick={(product) => navigate(`/ipad/${product.id}`)}
              />
            ) : loading ? (
              <ProductSkeleton count={6} />
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun produit trouvé</h3>
                <p className="text-gray-600">Aucun iPad disponible pour le moment.</p>
              </div>
            )}
          </div>
        </section>


        {/* Apple Pencil Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-8">Apple Pencil</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The most advanced Apple Pencil ever. Now with Find My support.
              </p>
            </div>

          </div>
        </section>

        {/* Compare Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">Compare iPad models</h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              See the differences between iPad models and find the one that's right for you.
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

export default IPad;