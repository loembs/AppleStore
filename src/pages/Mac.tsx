import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useMacFamilies, useMacVariants, useMacWithOptions } from '@/hooks/useMac';
import MacFamilyCard from '@/components/MacFamilyCard';
import MacConfigurator from '@/components/MacConfigurator';
import { ProductSkeleton } from '@/components/ProductSkeleton';
import { ChevronLeft } from 'lucide-react';
import { formatPrice } from '@/utils/currency';
import { useCartWithAuth } from '@/hooks/useCartWithAuth';

const Mac = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const familyParam = searchParams.get('family');
  const productParam = searchParams.get('product');

  const { families, loading: familiesLoading, error: familiesError } = useMacFamilies();
  const { variants, loading: variantsLoading } = useMacVariants(familyParam || '');
  const { data, loading: productLoading, ...config } = useMacWithOptions(productParam || '');
  const { addToCart, isAddingToCart } = useCartWithAuth();

  // Scroll en haut de la page au chargement
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Afficher les familles Mac par défaut
  if (!familyParam && !productParam) {
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
            <div className="relative z-10 text-center px-6">
              <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">Mac</h1>
              <p className="text-2xl md:text-3xl mb-12 font-light">
                Quelle est votre puissance ?
              </p>
              <div className="flex justify-center">
                <Button
                  className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg"
                  onClick={() => document.getElementById('families-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Découvrir les Mac
                </Button>
              </div>
            </div>
          </section>

          {/* Mac Families Section */}
          <section id="families-section" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Les familles Mac</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Choisissez la famille qui vous correspond : MacBook Air, MacBook Pro, iMac ou Mac Mini.
                </p>
              </div>

              {familiesLoading ? (
                <ProductSkeleton count={4} />
              ) : familiesError ? (
                <div className="text-center py-12">
                  <p className="text-red-600">Erreur de chargement : {familiesError}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {families.map((family) => (
                    <MacFamilyCard key={family.id} family={family} />
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  // Afficher les variantes d'une famille
  if (familyParam && !productParam) {
    const familyData = families.find((f) => f.family === familyParam);

    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          {/* Header avec retour */}
          <div className="bg-gray-50 py-4">
            <div className="max-w-7xl mx-auto px-6">
              <Button
                variant="ghost"
                onClick={() => navigate('/mac')}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Retour aux Mac
              </Button>
            </div>
          </div>

          {/* Family Header */}
          <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">{familyData?.name}</h1>
              <p className="text-xl text-gray-600">{familyData?.tagline}</p>
            </div>
          </section>

          {/* Variantes de la famille */}
          <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-2xl font-semibold mb-8">Choisissez votre modèle</h2>
              {variantsLoading ? (
                <ProductSkeleton count={3} />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {variants.map((variant) => (
                    <div
                      key={variant.id}
                      onClick={() => navigate(`/mac?family=${familyParam}&product=${variant.id}`)}
                      className="cursor-pointer group"
                    >
                      <div className="relative overflow-hidden rounded-2xl hover:shadow-2xl transition-shadow duration-300">
                        {/* Image plein card */}
                        <div className="w-full h-56">
                          <img
                            src={variant.image}
                            alt={variant.name}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        {/* Overlay texte */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent pointer-events-none" />
                        <div className="absolute left-0 right-0 bottom-0 p-4">
                          <h3 className="text-lg font-bold text-white mb-1">{variant.name}</h3>
                          <p className="text-sm text-white/90 mb-2">{variant.tagline}</p>
                          <p className="inline-block bg-white/90 text-gray-900 font-semibold px-2 py-1 rounded-lg text-sm">{formatPrice(variant.price, 'XOF')}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  // Afficher le configurateur pour un produit spécifique
  if (productParam) {
    const handleAddToCart = async () => {
      if (!data?.product) return;

      try {
        await addToCart(
          data.product.id,
          1,
          config.selectedColor?.id,
          config.selectedStorage?.id,
          data.product,
          config.selectedColor,
          config.selectedStorage
        );
        alert('Ajouté au panier !');
      } catch (error) {
        alert('Erreur lors de l\'ajout au panier');
      }
    };

    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          {/* Header avec retour */}
          <div className="bg-gray-50 py-4">
            <div className="max-w-7xl mx-auto px-6">
              <Button
                variant="ghost"
                onClick={() => navigate('/mac')}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Retour aux Mac
              </Button>
            </div>
          </div>

          {/* Configurateur */}
          <section className="py-12 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Image du produit */}
                <div className="flex items-center justify-center">
                  <div className="aspect-[4/3] w-full max-w-2xl">
                    {/* Afficher l'image correspondant à la couleur sélectionnée si disponible */}
                    <img
                      src={config.selectedColor?.image || data?.product?.image || ''}
                      alt={data?.product?.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Configuration */}
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">{data?.product?.name}</h1>
                  <p className="text-xl text-gray-600 mb-8">{data?.product?.tagline}</p>

                  {productLoading ? (
                    <ProductSkeleton count={1} />
                  ) : (
                    <MacConfigurator
                      colors={data?.colors || []}
                      storages={data?.storages || []}
                      displays={data?.displays || []}
                      chips={data?.chips || []}
                      selectedColor={config.selectedColor}
                      selectedStorage={config.selectedStorage}
                      selectedDisplay={config.selectedDisplay}
                      selectedChip={config.selectedChip}
                      onColorChange={config.setSelectedColor}
                      onStorageChange={config.setSelectedStorage}
                      onDisplayChange={config.setSelectedDisplay}
                      onChipChange={config.setSelectedChip}
                      totalPrice={config.totalPrice}
                    />
                  )}

                  {/* Actions */}
                  <div className="space-y-4 mt-8">
                    <Button
                      onClick={handleAddToCart}
                      disabled={isAddingToCart}
                      className="w-full h-14 text-lg bg-blue-600 text-white hover:bg-blue-700"
                    >
                      {isAddingToCart ? 'Ajout en cours...' : 'Ajouter au panier'}
                    </Button>
                    <Button
                      className="w-full h-14 text-lg bg-green-600 text-white hover:bg-green-700"
                      onClick={() => navigate('/checkout')}
                    >
                      Acheter maintenant
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return null;
};

export default Mac;
