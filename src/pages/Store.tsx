import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useProducts, useCategories, useFeaturedProducts } from '@/hooks/useSupabase';
import { AppleProductCard } from '@/components/AppleProductCard';
import { ProductListView } from '@/components/ProductListView';
import { ProductSkeleton } from '@/components/ProductSkeleton';
import { ChevronLeft, ChevronRight, Filter, Grid2x2, List } from 'lucide-react';
import { formatPrice } from '@/utils/currency';

// Icône personnalisée pour grille compacte (2x3)
const Grid3x2Icon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Product } from '@/lib/supabase';

const ITEMS_PER_PAGE = 12;

type ViewMode = 'grid-compact' | 'grid-dense' | 'list';
type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'newest';

const Store = () => {
  const navigate = useNavigate();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<ViewMode>('grid-compact');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  // Charger toutes les catégories
  const { categories, loading: categoriesLoading } = useCategories();
  
  // Charger tous les produits ou les produits filtrés par catégorie
  const { products: allProducts, loading: productsLoading } = useProducts(selectedCategoryId || undefined);
  
  // Charger les produits mis en avant pour le carrousel
  const { products: featuredProducts } = useFeaturedProducts();

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

  // Trier les produits
  const sortedProducts = useMemo(() => {
    const sorted = [...allProducts];
    
    switch (sortOption) {
      case 'price-asc':
        return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
      case 'price-desc':
        return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'newest':
        return sorted.sort((a, b) => {
          const dateA = new Date(a.created_at || 0).getTime();
          const dateB = new Date(b.created_at || 0).getTime();
          return dateB - dateA;
        });
      default:
        return sorted;
    }
  }, [allProducts, sortOption]);

  // Calculer les produits paginés
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return sortedProducts.slice(startIndex, endIndex);
  }, [sortedProducts, currentPage]);

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);

  // Fonction pour changer de page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Défilement automatique du carrousel
  useEffect(() => {
    if (!carouselApi) return;

    const interval = setInterval(() => {
      carouselApi.scrollNext();
    }, 3000); // Défile toutes les 3 secondes

    return () => clearInterval(interval);
  }, [carouselApi]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Store Hero avec Carrousel */}
        <section className="relative bg-white text-black py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">Store</h1>
              <p className="text-xl md:text-2xl font-light">The best way to buy the products you love.</p>
            </div>
            
            {/* Carrousel de produits mis en avant */}
            {featuredProducts.length > 0 && (
              <div className="mt-8">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  setApi={setCarouselApi}
                  className="w-full"
                >
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {featuredProducts.slice(0, 8).map((product) => (
                      <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                        <div 
                          className="bg-gray-50 border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-all"
                          onClick={() => handleProductClick(product)}
                        >
                          <div className="aspect-square mb-4 flex items-center justify-center">
                            <img
                              src={product.image || '/placeholder-product.jpg'}
                              alt={product.name}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                          <h3 className="text-lg font-semibold mb-2 line-clamp-2 text-black">{product.name}</h3>
                          <p className="text-2xl font-bold text-black">
                            {formatPrice(product.price, 'XOF')}
                          </p>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-0 text-black border-gray-300 hover:bg-gray-100" />
                  <CarouselNext className="right-0 text-black border-gray-300 hover:bg-gray-100" />
                </Carousel>
              </div>
            )}
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

        {/* Barre de filtres */}
        <section className="py-4 bg-white border-b border-gray-200 sticky top-0 z-20 bg-opacity-95 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between gap-4">
              {/* Bouton FILTRES */}
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Filter className="h-5 w-5 text-gray-700" />
                <span className="font-semibold text-gray-900">FILTRES</span>
              </button>

              {/* Options de vue */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid-compact')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid-compact'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  aria-label="Vue grille compacte"
                >
                  <Grid3x2Icon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('grid-dense')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid-dense'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  aria-label="Vue grille dense"
                >
                  <Grid2x2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  aria-label="Vue liste"
                >
                  <List className="h-5 w-5" />
                </button>
              </div>

              {/* Menu Trier par */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Trier par</span>
                <Select value={sortOption} onValueChange={(value) => setSortOption(value as SortOption)}>
                  <SelectTrigger className="w-[150px] border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Défaut</SelectItem>
                    <SelectItem value="price-asc">Prix: Croissant</SelectItem>
                    <SelectItem value="price-desc">Prix: Décroissant</SelectItem>
                    <SelectItem value="name-asc">Nom: A-Z</SelectItem>
                    <SelectItem value="name-desc">Nom: Z-A</SelectItem>
                    <SelectItem value="newest">Plus récent</SelectItem>
                  </SelectContent>
                </Select>
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
                  {sortedProducts.length} {sortedProducts.length === 1 ? 'produit trouvé' : 'produits trouvés'}
                  {selectedCategoryId && (
                    <span className="ml-2">
                      dans {categories.find(cat => cat.id === selectedCategoryId)?.libelle}
                    </span>
                  )}
                </span>
              )}
            </div>

            {/* Grille/Liste de produits */}
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
                {viewMode === 'list' ? (
                  <div className="space-y-4 mb-8">
                    {paginatedProducts.map((product) => (
                      <ProductListView
                        key={product.id}
                        product={product}
                        onViewDetails={handleProductClick}
                      />
                    ))}
                  </div>
                ) : (
                  <div className={`grid gap-6 mb-8 ${
                    viewMode === 'grid-compact'
                      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                      : 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'
                  }`}>
                    {paginatedProducts.map((product) => (
                      <AppleProductCard
                        key={product.id}
                        product={product}
                        onViewDetails={handleProductClick}
                      />
                    ))}
                  </div>
                )}

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
