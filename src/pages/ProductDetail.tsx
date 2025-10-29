import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductConfigurator from '@/components/ProductConfigurator';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

// Import des données de produits
import productsData from '@/data/products.json';

const ProductDetail = () => {
  const { category, productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    // Charger le produit en fonction de la catégorie et de l'ID
    let foundProduct = null;
    
    switch (category) {
      case 'iphone':
        foundProduct = productsData.iphones.find((p: any) => p.id === productId);
        break;
      case 'mac':
        foundProduct = productsData.macs.find((p: any) => p.id === productId);
        break;
      case 'ipad':
        foundProduct = productsData.ipads.find((p: any) => p.id === productId);
        break;
      case 'watch':
        foundProduct = productsData.watches.find((p: any) => p.id === productId);
        break;
      case 'airpods':
        foundProduct = productsData.airpods.find((p: any) => p.id === productId);
        break;
    }
    
    setProduct(foundProduct);
  }, [category, productId]);

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-12">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold mb-4">Produit non trouvé</h1>
            <Button onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-6">
          {/* Bouton retour */}
          <Button
            variant="ghost"
            className="mb-8"
            onClick={() => navigate(`/${category}`)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux {category === 'iphone' ? 'iPhones' : category === 'ipad' ? 'iPads' : category === 'mac' ? 'Macs' : category === 'watch' ? 'Apple Watches' : 'AirPods'}
          </Button>

          {/* Configurateur de produit */}
          <ProductConfigurator product={product} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;

