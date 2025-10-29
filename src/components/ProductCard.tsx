import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
  tag?: string;
}

const ProductCard = ({ name, price, image, tag }: ProductCardProps) => {
  return (
    <Card className="group relative overflow-hidden border-border bg-card hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
      <div className="aspect-square bg-muted/50 flex items-center justify-center p-8 relative overflow-hidden">
        {tag && (
          <span className="absolute top-4 right-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full z-10 animate-scale-in delay-200">
            {tag}
          </span>
        )}
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
          loading="lazy"
        />
      </div>
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-primary">{name}</h3>
          <p className="text-2xl font-bold text-primary">{price}</p>
        </div>
        <Button className="w-full hover:scale-105 transition-transform duration-300" variant="default">
          Acheter
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
