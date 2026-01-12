import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useProducts, useCategories } from '@/hooks/useSupabase';
import { AppleProductCard } from '@/components/AppleProductCard';
import { ProductSkeleton } from '@/components/ProductSkeleton';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Product } from '@/lib/supabase';

const ITEMS_PER_PAGE = 12;

const Store = () => {
  const navigate = useNavigate();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Charger toutes les catégories
  const { categories, loading: categoriesLoading } = useCategories();
  
  // Charger tous les produits ou les produits filtrés par catégorie
  const { products, loading: productsLoading } = useProducts(selectedCategoryId || undefined);

  // Fonction pour naviguer vers la page du produit
  const handleProductClick = (product: Product) => {
    const categoryName = categories.find(cat => cat.id === product.categoryid)?.libelle?.toLowerCase() || 'product';
    navigate(`/${categoryName}/${product.id}`);
  };

  // Fonction pour gérer le clic sur une catégorie
  const handleCategoryClick = (categoryId: number | null) => {
    setSelectedCategoryId(categoryId);
    setCurrentPage(1); // Réinitialiser à la première page
  };

  // Calculer les produits paginés
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return products.slice(startIndex, endIndex);
  }, [products, currentPage]);

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  // Fonction pour changer de page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Store Hero - Raccourci */}
        <section className="relative h-64 md:h-80 flex items-center justify-center bg-black text-white">
          <div className="text-center px-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">Store</h1>
            <p className="text-xl md:text-2xl font-light">The best way to buy the products you love.</p>
          </div>
        </section>

        {/* Catégories avec défilement horizontal */}
        <section className="py-6 bg-white border-b border-gray-200 sticky top-0 z-10 bg-opacity-95 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6">
            <div className="relative">
              <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {/* Bouton All */}
                <button
                  onClick={() => handleCategoryClick(null)}
                  className={`flex-shrink-0 px-6 py-2 rounded-full font-medium transition-all duration-200 whitespace-nowrap ${
                    selectedCategoryId === null
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                
                {/* Catégories */}
                {categoriesLoading ? (
                  <div className="flex gap-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex-shrink-0 w-24 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                    ))}
                  </div>
                ) : (
                  categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                      className={`flex-shrink-0 px-6 py-2 rounded-full font-medium transition-all duration-200 whitespace-nowrap ${
                        selectedCategoryId === category.id
                          ? 'bg-black text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category.libelle}
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Produits avec pagination */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            {/* Compteur de produits */}
            <div className="mb-6 text-gray-600">
              {productsLoading ? (
                <span>Chargement...</span>
              ) : (
                <span>
                  {products.length} {products.length === 1 ? 'produit trouvé' : 'produits trouvés'}
                  {selectedCategoryId && (
                    <span className="ml-2">
                      dans {categories.find(cat => cat.id === selectedCategoryId)?.libelle}
                    </span>
                  )}
                </span>
              )}
            </div>

            {/* Grille de produits */}
            {productsLoading ? (
              <ProductSkeleton count={ITEMS_PER_PAGE} />
            ) : paginatedProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Aucun produit trouvé
                </h3>
                <p className="text-gray-600">
                  {selectedCategoryId 
                    ? 'Aucun produit dans cette catégorie pour le moment.'
                    : 'Aucun produit disponible pour le moment.'
                  }
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                  {paginatedProducts.map((product) => (
                    <AppleProductCard
                      key={product.id}
                      product={product}
                      onViewDetails={handleProductClick}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                      aria-label="Page précédente"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>

                    <div className="flex gap-1">
                      {[...Array(totalPages)].map((_, index) => {
                        const page = index + 1;
                        // Afficher seulement les premières pages, la page actuelle, et les dernières pages
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <button
                              key={page}
                              onClick={() => handlePageChange(page)}
                              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                currentPage === page
                                  ? 'bg-black text-white'
                                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                              }`}
                            >
                              {page}
                            </button>
                          );
                        } else if (
                          page === currentPage - 2 ||
                          page === currentPage + 2
                        ) {
                          return (
                            <span key={page} className="px-2 text-gray-500">
                              ...
                            </span>
                          );
                        }
                        return null;
                      })}
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                      aria-label="Page suivante"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Store;
