import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-product.png';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-muted/30 to-background pt-16">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* New Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium animate-fade-in-down">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Nouveau
          </div>

          {/* Hero Title */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight animate-fade-in delay-100">
            L'innovation
            <br />
            <span className="text-primary">redéfinie</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up delay-200">
            Découvrez une technologie qui allie élégance et performance exceptionnelle.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in-up delay-300">
            <Button variant="hero" size="lg" className="hover:scale-105 transition-transform duration-300">
              Découvrir
            </Button>
            <Button variant="heroinverted" size="lg" className="hover:scale-105 transition-transform duration-300">
              Comparer
            </Button>
          </div>

          {/* Hero Image */}
          <div className="pt-12 animate-scale-in delay-400">
            <img
              src={heroImage}
              alt="Premium smartphone with sleek design"
              className="w-full max-w-3xl mx-auto drop-shadow-2xl hover:scale-105 transition-transform duration-700 animate-float"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
