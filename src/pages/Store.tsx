import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Composant de carrousel dynamique personnalisé
export const DynamicCarousel = ({ products, onProductClick, formatPrice }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(4);

  // Détecter la taille de l'écran pour ajuster le nombre d'items
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 768) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play toutes les 3 secondes
  useEffect(() => {
    if (!isAutoPlaying || products.length === 0) return;

    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, products.length, itemsPerView]);

  const maxIndex = Math.max(0, products.length - itemsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  if (products.length === 0) return null;

  return (
    <div 
      className="relative w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Conteneur du carrousel */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 px-2"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              <div
                className="bg-gray-50 border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-100 hover:shadow-lg transition-all h-full"
                onClick={() => onProductClick(product)}
              >
                <div className="aspect-square mb-4 flex items-center justify-center bg-white rounded-lg">
                  <img
                    src={product.image || '/placeholder-product.jpg'}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain p-4"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2 line-clamp-2 text-black min-h-[3.5rem]">
                  {product.name}
                </h3>
                <p className="text-2xl font-bold text-black">
                  {formatPrice(product.price, 'XOF')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Boutons de navigation */}
      {products.length > itemsPerView && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-all z-10 border border-gray-300"
            aria-label="Produit précédent"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-all z-10 border border-gray-300"
            aria-label="Produit suivant"
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>
        </>
      )}

      {/* Indicateurs de pagination */}
      {products.length > itemsPerView && (
        <div className="flex justify-center gap-2 mt-6">
          {[...Array(maxIndex + 1)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                currentIndex === index
                  ? 'w-8 bg-black'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Aller à la slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};