import { Button } from '@/components/ui/button';

const PromoSection = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight animate-fade-in">
              Offre exclusive
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground animate-fade-in-up delay-100">
              Profitez de -20% sur tous nos accessoires premium jusqu'au 31 décembre
            </p>
          </div>

          <div className="pt-4 animate-scale-in delay-200">
            <Button variant="hero" size="lg" className="hover:scale-110 transition-all duration-300">
              Découvrir l'offre
            </Button>
          </div>

          <div className="pt-8 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 animate-slide-in-left delay-300 hover:text-primary transition-colors duration-300">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Livraison gratuite
            </div>
            <div className="flex items-center gap-2 animate-fade-in-up delay-400 hover:text-primary transition-colors duration-300">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Retour sous 14 jours
            </div>
            <div className="flex items-center gap-2 animate-slide-in-right delay-500 hover:text-primary transition-colors duration-300">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Garantie 2 ans
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
