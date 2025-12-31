import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useProducts } from '@/hooks/useSupabase';
import { ProductSkeleton } from '@/components/ProductSkeleton';

const Store = () => {
  const navigate = useNavigate();
  
  // Charger les produits par catégorie depuis le backend
  const { products: iphoneProducts } = useProducts(1); // iPhone
  const { products: ipadProducts } = useProducts(2); // iPad
  const { products: macProducts } = useProducts(3); // Mac
  const { products: watchProducts } = useProducts(4); // Watch
  const { products: airpodsProducts } = useProducts(5); // AirPods

  // Fonction pour obtenir le premier produit d'une catégorie (pour l'image)
  const getFeaturedProduct = (products: any[]) => {
    return products.length > 0 ? products[0] : null;
  };

  // Fonction pour obtenir l'image d'un produit
  const getProductImage = (product: any) => {
    return product?.image || 'https://via.placeholder.com/400x400?text=Produit';
  };

  // Fonction pour naviguer vers la page du produit ou de la catégorie
  const handleProductClick = (category: string, product?: any) => {
    if (product) {
      navigate(`/${category}/${product.id}`);
    } else {
      navigate(`/${category}`);
    }
  };

  const categories = [
    {
      id: 'mac',
      name: 'Mac',
      products: macProducts,
      route: '/mac',
      description: 'Découvrez tous les Mac.'
    },
    {
      id: 'iphone',
      name: 'iPhone',
      products: iphoneProducts,
      route: '/iphone',
      description: 'Découvrez tous les iPhone.'
    },
    {
      id: 'ipad',
      name: 'iPad',
      products: ipadProducts,
      route: '/ipad',
      description: 'Découvrez tous les iPad.'
    },
    {
      id: 'watch',
      name: 'Apple Watch',
      products: watchProducts,
      route: '/watch',
      description: 'Découvrez tous les Apple Watch.'
    },
    {
      id: 'airpods',
      name: 'AirPods',
      products: airpodsProducts,
      route: '/airpods',
      description: 'Découvrez tous les AirPods.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Store Hero */}
        <section className="relative h-screen flex items-center justify-center bg-black text-white">
          <div className="text-center px-6">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">Store</h1>
            <p className="text-2xl md:text-3xl mb-12 font-light">The best way to buy the products you love.</p>
          </div>
        </section>

        {/* Product Categories Grid */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {categories.map((category) => {
                const featuredProduct = getFeaturedProduct(category.products);
                const productImage = getProductImage(featuredProduct);
                
                return (
                  <div
                    key={category.id}
                    className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                    onClick={() => handleProductClick(category.id, featuredProduct)}
                  >
                    <div className="aspect-square bg-gray-100 flex items-center justify-center p-4 overflow-hidden">
                      {featuredProduct ? (
                        <img
                          src={productImage}
                          alt={category.name}
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=' + category.name;
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <span className="text-sm">{category.name}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-semibold text-gray-900 text-sm md:text-base">{category.name}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Products by Category */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            {categories.map((category) => {
              const featuredProduct = getFeaturedProduct(category.products);
              if (!featuredProduct) return null;

              return (
                <div
                  key={category.id}
                  className="mb-12 last:mb-0 cursor-pointer group"
                  onClick={() => handleProductClick(category.id, featuredProduct)}
                >
                  <div className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                      <div className="flex items-center justify-center">
                        <img
                          src={getProductImage(featuredProduct)}
                          alt={featuredProduct.name}
                          className="max-w-full h-auto max-h-96 object-contain group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=' + category.name;
                          }}
                        />
                      </div>
                      <div className="flex flex-col justify-center space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{category.name}</h2>
                        <p className="text-lg text-gray-600">{category.description}</p>
                        {featuredProduct.tagline && (
                          <p className="text-xl font-semibold text-gray-800">{featuredProduct.tagline}</p>
                        )}
                        <button
                          className="w-fit bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg rounded-lg transition-colors duration-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProductClick(category.id, featuredProduct);
                          }}
                        >
                          En savoir plus
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Store;
