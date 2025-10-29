import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AvailabilityBanner = () => {
  return (
    <section className="py-16 bg-primary text-primary-foreground overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto">
          <div className="flex items-center gap-4 animate-slide-in-left">
            <MapPin className="h-8 w-8 flex-shrink-0 animate-float" />
            <div>
              <h3 className="text-2xl font-bold mb-1">Disponible en magasin</h3>
              <p className="text-primary-foreground/90">
                Testez nos produits dans l'un de nos 120 points de vente
              </p>
            </div>
          </div>
          <Button
            variant="heroinverted"
            size="lg"
            className="shrink-0 animate-slide-in-right hover:scale-110 transition-transform duration-300"
          >
            Trouver un magasin
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AvailabilityBanner;
