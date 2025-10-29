import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Check } from 'lucide-react';
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

interface Memory {
  size: string;
  price: number;
}

interface Connectivity {
  type: string;
  price: number;
}

interface Variant {
  name: string;
  price: number;
  type?: string;
}

interface Band {
  name: string;
  price: number;
  type?: string;
}

interface Case {
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
  memory?: Memory[];
  connectivity?: Connectivity[];
  variants?: Variant[];
  bands?: Band[];
  cases?: Case[];
  features: string[];
  specs: Record<string, string>;
}

interface ProductConfiguratorProps {
  product: Product;
}

const ProductConfigurator = ({ product }: ProductConfiguratorProps) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedStorage, setSelectedStorage] = useState(product.storage?.[0]);
  const [selectedMemory, setSelectedMemory] = useState(product.memory?.[0]);
  const [selectedConnectivity, setSelectedConnectivity] = useState(product.connectivity?.[0]);
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]);
  const [selectedBand, setSelectedBand] = useState(product.bands?.[0]);
  const [selectedCase, setSelectedCase] = useState(product.cases?.[0]);

  const calculateTotalPrice = () => {
    let total = product.startingPrice;
    
    if (selectedStorage) total = selectedStorage.price;
    if (selectedMemory) total += selectedMemory.price;
    if (selectedConnectivity && selectedConnectivity.price > 0) total += selectedConnectivity.price;
    if (selectedColor?.priceAdd) total += selectedColor.priceAdd;
    if (selectedBand && selectedBand.price > 0) total += selectedBand.price;
    if (selectedCase && selectedCase.price > 0) total += selectedCase.price;
    
    return total;
  };

  const handleAddToCart = () => {
    const config = {
      product: product.name,
      color: selectedColor.name,
      storage: selectedStorage?.size,
      memory: selectedMemory?.size,
      connectivity: selectedConnectivity?.type,
      variant: selectedVariant?.name,
      band: selectedBand?.name,
      case: selectedCase?.size,
      price: calculateTotalPrice(),
    };
    
    // Sauvegarder dans le localStorage
    const cart = JSON.parse(localStorage.getItem('istar-cart') || '[]');
    cart.push(config);
    localStorage.setItem('istar-cart', JSON.stringify(cart));
    
    toast.success('Produit ajouté au panier !', {
      description: `${product.name} - ${selectedColor.name}`,
    });
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-start">
      {/* Image du produit */}
      <div className="sticky top-24">
        <div className="bg-muted/30 rounded-3xl p-12 aspect-square flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        {/* Caractéristiques */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          {Object.entries(product.specs).slice(0, 4).map(([key, value]) => (
            <div key={key} className="p-4 bg-muted/50 rounded-xl">
              <p className="text-xs text-muted-foreground capitalize">{key}</p>
              <p className="font-semibold mt-1 text-sm">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Configuration */}
      <div className="space-y-8">
        <div>
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm mb-3">
            Nouveau
          </div>
          <h1 className="text-5xl font-bold mb-3">{product.name}</h1>
          <p className="text-2xl text-muted-foreground font-light">{product.tagline}</p>
          <div className="mt-6">
            <p className="text-4xl font-bold">{calculateTotalPrice()} €</p>
            <p className="text-sm text-muted-foreground mt-1">
              ou à partir de {Math.round(calculateTotalPrice() / 24)} €/mois pendant 24 mois*
            </p>
          </div>
        </div>

        {/* Sélection de couleur */}
        <Card className="p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-1">Couleur</h3>
            <p className="text-sm text-muted-foreground">{selectedColor.name}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {product.colors.map((color) => (
              <button
                key={color.code}
                onClick={() => setSelectedColor(color)}
                className={`relative w-12 h-12 rounded-full border-2 transition-all hover:scale-110 ${
                  selectedColor.code === color.code
                    ? 'border-primary ring-2 ring-primary/20'
                    : 'border-muted-foreground/20'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              >
                {selectedColor.code === color.code && (
                  <Check className="absolute inset-0 m-auto w-6 h-6 text-white drop-shadow-lg" />
                )}
              </button>
            ))}
          </div>
          {selectedColor.material && (
            <Badge variant="outline">{selectedColor.material === 'titanium' ? 'Titane' : 'Aluminium'}</Badge>
          )}
        </Card>

        {/* Sélection de stockage */}
        {product.storage && (
          <Card className="p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-1">Stockage</h3>
              <p className="text-sm text-muted-foreground">
                {selectedStorage?.size} - {selectedStorage?.price} €
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {product.storage.map((storage) => (
                <button
                  key={storage.size}
                  onClick={() => setSelectedStorage(storage)}
                  className={`p-4 rounded-xl border-2 transition-all hover:border-primary ${
                    selectedStorage?.size === storage.size
                      ? 'border-primary bg-primary/5'
                      : 'border-muted'
                  }`}
                >
                  <p className="font-semibold">{storage.size}</p>
                  <p className="text-sm text-muted-foreground mt-1">{storage.price} €</p>
                </button>
              ))}
            </div>
          </Card>
        )}

        {/* Sélection de mémoire (pour Mac) */}
        {product.memory && (
          <Card className="p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-1">Mémoire</h3>
              <p className="text-sm text-muted-foreground">{selectedMemory?.size}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {product.memory.map((memory) => (
                <button
                  key={memory.size}
                  onClick={() => setSelectedMemory(memory)}
                  className={`p-4 rounded-xl border-2 transition-all hover:border-primary ${
                    selectedMemory?.size === memory.size
                      ? 'border-primary bg-primary/5'
                      : 'border-muted'
                  }`}
                >
                  <p className="font-semibold">{memory.size}</p>
                  {memory.price > 0 && (
                    <p className="text-sm text-muted-foreground mt-1">+{memory.price} €</p>
                  )}
                </button>
              ))}
            </div>
          </Card>
        )}

        {/* Sélection de connectivité (pour iPad) */}
        {product.connectivity && (
          <Card className="p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-1">Connectivité</h3>
              <p className="text-sm text-muted-foreground">{selectedConnectivity?.type}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {product.connectivity.map((conn) => (
                <button
                  key={conn.type}
                  onClick={() => setSelectedConnectivity(conn)}
                  className={`p-4 rounded-xl border-2 transition-all hover:border-primary ${
                    selectedConnectivity?.type === conn.type
                      ? 'border-primary bg-primary/5'
                      : 'border-muted'
                  }`}
                >
                  <p className="font-semibold">{conn.type}</p>
                  {conn.price > 0 && (
                    <p className="text-sm text-muted-foreground mt-1">+{conn.price} €</p>
                  )}
                </button>
              ))}
            </div>
          </Card>
        )}

        {/* Sélection de taille de boîtier (pour Watch) */}
        {product.cases && (
          <Card className="p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-1">Taille du boîtier</h3>
              <p className="text-sm text-muted-foreground">{selectedCase?.size}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {product.cases.map((caseOption) => (
                <button
                  key={caseOption.size}
                  onClick={() => setSelectedCase(caseOption)}
                  className={`p-4 rounded-xl border-2 transition-all hover:border-primary ${
                    selectedCase?.size === caseOption.size
                      ? 'border-primary bg-primary/5'
                      : 'border-muted'
                  }`}
                >
                  <p className="font-semibold">{caseOption.size}</p>
                  {caseOption.price > 0 && (
                    <p className="text-sm text-muted-foreground mt-1">+{caseOption.price} €</p>
                  )}
                </button>
              ))}
            </div>
          </Card>
        )}

        {/* Sélection de bracelet (pour Watch) */}
        {product.bands && (
          <Card className="p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-1">Bracelet</h3>
              <p className="text-sm text-muted-foreground">{selectedBand?.name}</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {product.bands.map((band) => (
                <button
                  key={band.name}
                  onClick={() => setSelectedBand(band)}
                  className={`p-4 rounded-xl border-2 transition-all hover:border-primary text-left ${
                    selectedBand?.name === band.name
                      ? 'border-primary bg-primary/5'
                      : 'border-muted'
                  }`}
                >
                  <p className="font-semibold">{band.name}</p>
                  {band.price > 0 && (
                    <p className="text-sm text-muted-foreground mt-1">+{band.price} €</p>
                  )}
                </button>
              ))}
            </div>
          </Card>
        )}

        {/* Variantes (pour AirPods) */}
        {product.variants && (
          <Card className="p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-1">Configuration</h3>
              <p className="text-sm text-muted-foreground">{selectedVariant?.name}</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {product.variants.map((variant) => (
                <button
                  key={variant.name}
                  onClick={() => setSelectedVariant(variant)}
                  className={`p-4 rounded-xl border-2 transition-all hover:border-primary text-left ${
                    selectedVariant?.name === variant.name
                      ? 'border-primary bg-primary/5'
                      : 'border-muted'
                  }`}
                >
                  <p className="font-semibold">{variant.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{variant.price} €</p>
                </button>
              ))}
            </div>
          </Card>
        )}

        {/* Caractéristiques principales */}
        <Card className="p-6 space-y-3">
          <h3 className="font-semibold text-lg mb-3">Caractéristiques principales</h3>
          <ul className="space-y-2">
            {product.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Actions */}
        <div className="sticky bottom-0 bg-background/95 backdrop-blur py-6 -mx-6 px-6 border-t">
          <div className="flex gap-4">
            <Button size="lg" className="flex-1" onClick={handleAddToCart}>
              <ShoppingCart className="w-5 h-5 mr-2" />
              Ajouter au panier
            </Button>
            <Button size="lg" variant="outline" className="flex-1">
              Livraison gratuite
            </Button>
          </div>
          <p className="text-xs text-center text-muted-foreground mt-4">
            * Sous réserve d'acceptation du dossier de financement
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductConfigurator;

