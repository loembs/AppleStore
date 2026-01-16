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
import { formatPrice } from '@/utils/currency';

// Icône WhatsApp personnalisée
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { product, colors, storage, features, loading, error } = useProduct(productId || '');
  const { addToCart, isAddingToCart } = useCartWithAuth();

  // États pour la configuration du produit
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<number | null>(null);
  const [selectedSim, setSelectedSim] = useState<string>('');
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

  // Réinitialiser l'option SIM si le produit n'est pas un iPhone
  useEffect(() => {
    if (product && product.categoryid !== 1) {
      setSelectedSim('');
    }
  }, [product]);

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      // console.log('🛒 handleAddToCart appelé:', {
      //   productId: product.id,
      //   quantity,
      //   selectedColor,
      //   selectedStorage,
      //   product,
      //   colorData: selectedColor ? colors.find(c => c.id === selectedColor) : null,
      //   storageData: selectedStorage ? storage.find(s => s.id === selectedStorage) : null
      // });

      await addToCart(
        product.id,
        quantity,
        selectedColor || undefined,
        selectedStorage || undefined,
        product,
        selectedColor ? colors.find(c => c.id === selectedColor) : undefined,
        selectedStorage ? storage.find(s => s.id === selectedStorage) : undefined
      );
      
      // Optionnel : afficher une notification de succès
      alert(`${product.name} ajouté au panier !`);
    } catch (error) {
      // console.error('Erreur lors de l\'ajout au panier:', error);
      alert('Erreur lors de l\'ajout au panier');
    }
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    navigate('/checkout');
  };

  const handleWhatsAppOrder = () => {
    const selectedColorName = selectedColor ? colors.find(c => c.id === selectedColor)?.name || '' : '';
    const selectedStorageSize = selectedStorage ? storage.find(s => s.id === selectedStorage)?.size || '' : '';
    const price = calculatePrice();
    const message = `Bonjour, je souhaite commander:\n\n` +
      `📱 Produit: ${product.name}\n` +
      `🎨 Couleur: ${selectedColorName}\n` +
      `💾 Mémoire: ${selectedStorageSize}\n` +
      (selectedSim ? `📲 Option SIM: ${selectedSim}\n` : '') +
      `🔢 Quantité: ${quantity}\n` +
      `💰 Prix total: ${price.toLocaleString('fr-FR')} CFA\n\n` +
      `Merci de confirmer la disponibilité et les modalités de paiement.`;
    
    const whatsappUrl = `https://wa.me/221771234567?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
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
                  {formatPrice(calculatePrice(), 'XOF')}
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
                    MÉMOIRE
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
                            +{formatPrice(storageOption.price, 'XOF')}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sélection d'option SIM - Uniquement pour les iPhones (categoryid = 1) */}
              {product.categoryid === 1 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    OPTION SIM
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all hover:border-gray-400">
                      <input
                        type="radio"
                        name="simOption"
                        value="Esim"
                        checked={selectedSim === 'Esim'}
                        onChange={(e) => setSelectedSim(e.target.value)}
                        className="w-4 h-4 text-gray-900 border-gray-300 focus:ring-gray-900"
                      />
                      <span className="font-medium text-gray-900">Esim</span>
                    </label>
                    <label className="flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all hover:border-gray-400">
                      <input
                        type="radio"
                        name="simOption"
                        value="Sim Physique"
                        checked={selectedSim === 'Sim Physique'}
                        onChange={(e) => setSelectedSim(e.target.value)}
                        className="w-4 h-4 text-gray-900 border-gray-300 focus:ring-gray-900"
                      />
                      <span className="font-medium text-gray-900">Sim Physique</span>
                    </label>
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
                  className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {isAddingToCart ? 'Ajout en cours...' : 'AJOUTER AU PANIER'}
                </Button>
                
                <Button
                  onClick={handleBuyNow}
                  disabled={isAddingToCart}
                  className="w-full h-12 text-lg bg-green-600 hover:bg-green-700 text-white"
                >
                  ACHETER MAINTENANT
                </Button>

                <Button
                  onClick={handleWhatsAppOrder}
                  className="w-full h-12 text-lg bg-green-500 hover:bg-green-600 text-white"
                >
                  <WhatsAppIcon className="w-5 h-5 mr-2" />
                  COMMANDER VIA WHATSAPP
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