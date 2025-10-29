import ProductCard from './ProductCard';
import product1 from '@/assets/product-1.png';
import product2 from '@/assets/product-2.png';
import product3 from '@/assets/product-3.png';
import product4 from '@/assets/product-4.png';

const products = [
  {
    id: 1,
    name: 'AirPods Pro',
    price: '279 €',
    image: product1,
    tag: 'Populaire',
  },
  {
    id: 2,
    name: 'SmartWatch Ultra',
    price: '849 €',
    image: product2,
  },
  {
    id: 3,
    name: 'MacBook Air',
    price: '1 299 €',
    image: product3,
    tag: 'Nouveau',
  },
  {
    id: 4,
    name: 'iPad Pro',
    price: '899 €',
    image: product4,
  },
];

const ProductGrid = () => {
  return (
    <section id="produits" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight animate-fade-in">
            Notre collection
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up delay-100">
            Des produits pensés pour transformer votre quotidien
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, idx) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <ProductCard
                name={product.name}
                price={product.price}
                image={product.image}
                tag={product.tag}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
