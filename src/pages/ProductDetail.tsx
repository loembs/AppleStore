import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useProduct } from '@/hooks/useSupabase';
import { useCartWithAuth } from '@/hooks/useCartWithAuth';
import { ProductSkeleton } from '@/components/ProductSkeleton';
import { SimpleCart } from '@/components/SimpleCart';
import { ArrowLeft, ShoppingCart, Heart, Share2, Star } from 'lucide-react';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { product, colors, storage, features, loading, error } = useProduct(productId || '');
  const { addToCart, isAddingToCart } = useCartWithAuth();

  // États pour la configuration du produit
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState<string>('');

  // Initialiser les sélections par défaut
  useEffect(() => {
    if (colors.length > 0 && selectedColor === null) {
      setSelectedColor(colors[0].id);
    }
    if (storage.length > 0 && selectedStorage === null) {
      setSelectedStorage(storage[0].id);
    }
    if (product?.image && !currentImage) {
      setCurrentImage(product.image);
    }
  }, [colors, storage, product, selectedColor, selectedStorage, currentImage]);

  // Mettre à jour l'image quand la couleur change
  useEffect(() => {
    if (selectedColor && colors.length > 0) {
      const selectedColorData = colors.find(c => c.id === selectedColor);
      if (selectedColorData?.image) {
        setCurrentImage(selectedColorData.image);
      } else if (product?.image) {
        setCurrentImage(product.image);
      }
    }
  }, [selectedColor, colors, product]);

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      await addToCart(
        product.id,
        quantity,
        selectedColor || undefined,
        selectedStorage || undefined
      );
      
      // Optionnel : afficher une notification de succès
      alert(`${product.name} ajouté au panier !`);
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error);
      alert('Erreur lors de l\'ajout au panier');
    }
  };

  const calculatePrice = () => {
    if (!product) return 0;
    
    let basePrice = product.price || 0;
    
    // Ajouter le prix du stockage si sélectionné
    if (selectedStorage) {
      const selectedStorageData = storage.find(s => s.id === selectedStorage);
      if (selectedStorageData?.price) {
        basePrice += selectedStorageData.price;
      }
    }
    
    return basePrice * quantity;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-20">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <ProductSkeleton count={1} />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-20">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Produit non trouvé
              </h1>
              <p className="text-gray-600 mb-8">
                Le produit que vous recherchez n'existe pas ou a été supprimé.
              </p>
              <Button onClick={() => navigate('/')}>
                Retour à l'accueil
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-4">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="p-0 h-auto font-normal"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Retour
              </Button>
              <span>/</span>
              <span>{product.name}</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                <img
                  src={currentImage || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Miniatures des couleurs */}
              {colors.length > 1 && (
                <div className="flex space-x-2">
                  {colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color.id)}
                      className={`w-12 h-12 rounded-full border-2 ${
                        selectedColor === color.id
                          ? 'border-gray-900'
                          : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Informations produit */}
            <div className="space-y-8">
              {/* Titre et prix */}
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                {product.tagline && (
                  <p className="text-xl text-gray-600 mb-4">
                    {product.tagline}
                  </p>
                )}
                <div className="text-3xl font-bold text-gray-900">
                  {calculatePrice().toLocaleString('fr-FR', {
                    style: 'currency',
                    currency: 'EUR'
                  })}
                </div>
              </div>

              {/* Sélection de couleur */}
              {colors.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Couleur
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {colors.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColor(color.id)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all ${
                          selectedColor === color.id
                            ? 'border-gray-900 bg-gray-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-sm font-medium">{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sélection de stockage */}
              {storage.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Stockage
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {storage.map((storageOption) => (
                      <button
                        key={storageOption.id}
                        onClick={() => setSelectedStorage(storageOption.id)}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          selectedStorage === storageOption.id
                            ? 'border-gray-900 bg-gray-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="font-medium">{storageOption.size}</div>
                        {storageOption.price && storageOption.price > 0 && (
                          <div className="text-sm text-gray-600">
                            +{(storageOption.price).toLocaleString('fr-FR', {
                              style: 'currency',
                              currency: 'EUR'
                            })}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantité */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Quantité
                </h3>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="w-full h-12 text-lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {isAddingToCart ? 'Ajout en cours...' : 'Ajouter au panier'}
                </Button>
                
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1">
                    <Heart className="w-4 h-4 mr-2" />
                    Favoris
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="w-4 h-4 mr-2" />
                    Partager
                  </Button>
                </div>
              </div>

              {/* Caractéristiques */}
              {features.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Caractéristiques
                  </h3>
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Panier simple */}
            <div className="lg:col-span-1">
              <SimpleCart />
            </div>
          </div>

          {/* Avis et évaluations */}
          <div className="mt-16">
            <Separator className="mb-8" />
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Avis clients
              </h2>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600">4.8/5 (127 avis)</span>
              </div>
              <p className="text-gray-600">
                Les avis clients seront bientôt disponibles
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;