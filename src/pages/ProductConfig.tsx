import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Check, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface Color {
  name: string;
  hex: string;
  code: string;
  material?: string;
  priceAdd?: number;
}

interface Storage {
  size: string;
  price: number;
}

interface Product {
  id: string;
  name: string;
  tagline: string;
  startingPrice: number;
  chip: string;
  image: string;
  colors: Color[];
  storage?: Storage[];
  features: string[];
  specs: Record<string, string>;
}

const ProductConfig = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [selectedStorage, setSelectedStorage] = useState(product?.storage?.[0]);

  // Specs par défaut si non définis
  const defaultSpecs = {
    'Chip': product?.chip || 'M5',
    'Display': 'Retina',
    'Battery': '18h',
    'Weight': '1.4kg'
  };
  
  const productSpecs = product?.specs || defaultSpecs;

  // Si pas de produit, rediriger vers la page d'accueil
  if (!product) {
    navigate('/');
    return null;
  }

  const calculateTotalPrice = () => {
    let total = product.startingPrice;
    if (selectedStorage) total = selectedStorage.price;
    if (selectedColor?.priceAdd) total += selectedColor.priceAdd;
    return total;
  };

  const handleAddToCart = () => {
    const config = {
      product: product.name,
      color: selectedColor?.name,
      storage: selectedStorage?.size,
      price: calculateTotalPrice(),
    };
    
    const cart = JSON.parse(localStorage.getItem('istar-cart') || '[]');
    cart.push(config);
    localStorage.setItem('istar-cart', JSON.stringify(cart));
    
    toast.success('Produit ajouté au panier !', {
      description: `${product.name} - ${selectedColor?.name}`,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-20">
        {/* Navigation */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-900 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-24">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Image du produit */}
            <div className="sticky top-32">
              <div className="bg-gray-50 rounded-3xl p-16 aspect-square flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Caractéristiques */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                {Object.entries(productSpecs).slice(0, 4).map(([key, value]) => (
                  <div key={key} className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">{key}</p>
                    <p className="font-semibold mt-1 text-sm text-gray-900">{String(value)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Configuration */}
            <div className="space-y-8">
              {/* En-tête du produit */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{product.name}</h1>
                <p className="text-xl text-gray-600">{product.tagline}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {product.chip}
                  </Badge>
                </div>
              </div>

              {/* Sélection de couleur */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">Couleur</h3>
                  <div className="flex gap-4 flex-wrap">
                    {product.colors.map((color) => (
                      <button
                        key={color.code}
                        onClick={() => setSelectedColor(color)}
                        className={`relative w-16 h-16 rounded-full border-4 transition-all duration-200 hover:scale-110 ${
                          selectedColor?.code === color.code
                            ? 'border-blue-500 shadow-lg'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {selectedColor?.code === color.code && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Check className="w-6 h-6 text-white drop-shadow-lg" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  {selectedColor && (
                    <p className="text-sm text-gray-600">
                      {selectedColor.name}
                      {selectedColor.material && ` • ${selectedColor.material}`}
                    </p>
                  )}
                </div>
              )}

              {/* Sélection de stockage */}
              {product.storage && product.storage.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">Stockage</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {product.storage.map((storage) => (
                      <button
                        key={storage.size}
                        onClick={() => setSelectedStorage(storage)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                          selectedStorage?.size === storage.size
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-900">{storage.size}</span>
                          <span className="text-gray-600">${storage.price}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Fonctionnalités */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Fonctionnalités</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prix et actions */}
              <div className="pt-8 border-t border-gray-200">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-900">Total</span>
                    <span className="text-3xl font-bold text-gray-900">${calculateTotalPrice()}</span>
                  </div>
                  
                  <div className="space-y-3">
                    <Button 
                      size="lg" 
                      className="w-full bg-blue-600 text-white hover:bg-blue-700 py-4 text-lg font-medium"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Ajouter au panier
                    </Button>
                    
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-4 text-lg font-medium"
                    >
                      Livraison gratuite
                    </Button>
                  </div>
                  
                  <p className="text-xs text-center text-gray-500">
                    * Sous réserve d'acceptation du dossier de financement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductConfig;
