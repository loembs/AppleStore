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

const AirPods = () => {
  const navigate = useNavigate();
  
  // Charger les produits AirPods depuis le backend (catégorie 5 = AirPods)
  const { products: airpodsProducts, loading, error } = useProducts(5);

  const airpodsModels = [
    {
      id: 'airpods-pro-3',
      name: 'AirPods Pro 3',
      tagline: 'Next-level noise cancellation.',
      price: 'From $249',
      image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800&q=80',
      colors: [
        { name: 'White', hex: '#F2F2F7', code: 'white' }
      ],
      features: ['H3 chip', 'Adaptive Transparency', 'Personalized Spatial Audio', 'Up to 6 hours listening time'],
      specs: {
        'Chip': 'H3',
        'Battery': '6h',
        'Case': 'USB-C',
        'Weight': '5.3g'
      }
    },
    {
      id: 'airpods-4',
      name: 'AirPods 4',
      tagline: 'All-new design. All-day comfort.',
      price: 'From $179',
      image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800&q=80',
      colors: [
        { name: 'White', hex: '#F2F2F7', code: 'white' },
        { name: 'Black', hex: '#1C1C1E', code: 'black' }
      ],
      features: ['H3 chip', 'Personalized Spatial Audio', 'Up to 6 hours listening time', 'USB-C charging'],
      specs: {
        'Chip': 'H3',
        'Battery': '6h',
        'Case': 'USB-C',
        'Weight': '5.1g'
      }
    },
    {
      id: 'airpods-max',
      name: 'AirPods Max',
      tagline: 'A perfect balance of exhilarating high-fidelity audio.',
      price: 'From $549',
      image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800&q=80',
      colors: [
        { name: 'Space Gray', hex: '#8E8E93', code: 'space-gray' },
        { name: 'Silver', hex: '#C7C7CC', code: 'silver' },
        { name: 'Sky Blue', hex: '#87CEEB', code: 'sky-blue' },
        { name: 'Green', hex: '#32CD32', code: 'green' },
        { name: 'Pink', hex: '#FF69B4', code: 'pink' }
      ],
      features: ['H2 chip', 'Active Noise Cancellation', 'Transparency mode', 'Up to 20 hours listening time'],
      specs: {
        'Chip': 'H2',
        'Battery': '20h',
        'Case': 'Lightning',
        'Weight': '384g'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center bg-black text-white">
          <div className="text-center px-6">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">AirPods</h1>
            <p className="text-2xl md:text-3xl mb-12 font-light">All-new design. All-day comfort.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-lg"
                onClick={() => navigate('/airpods')}
              >
                En savoir plus
              </Button>
              <Button 
                variant="outline"
                className="border-white text-black hover:bg-white hover:text-black px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-lg font-medium"
                onClick={() => navigate('/airpods')}
              >
                Acheter
              </Button>
            </div>
          </div>
        </section>

        {/* AirPods Models Grid */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Quels AirPods vous conviennent ?</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Comparez les fonctionnalités, le confort et les prix pour trouver les AirPods parfaits pour votre style de vie.
              </p>
            </div>

            {/* Utiliser les données du backend si disponibles, sinon les données statiques */}
            {airpodsProducts.length > 0 ? (
              <AppleProductGrid 
                categoryId={5}
                onProductClick={(product) => navigate(`/airpods/${product.id}`)}
              />
            ) : loading ? (
              <ProductSkeleton count={6} />
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun produit trouvé</h3>
                <p className="text-gray-600">Aucun AirPods disponible pour le moment.</p>
              </div>
            )}
          </div>
        </section>


        {/* Audio Technology Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-8">Technologie Audio</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Découvrez le son comme jamais auparavant avec la technologie audio la plus avancée d'Apple.
              </p>
            </div>

            
          </div>
        </section>

        {/* Compare Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">Comparez les modèles d'AirPods</h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Découvrez les différences entre les modèles d'AirPods et trouvez celui qui vous convient.
            </p>
            <Button 
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg"
            >
              Comparer tous les modèles
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AirPods;