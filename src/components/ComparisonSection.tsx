import { Check, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const plans = [
  {
    name: 'Essentiel',
    price: '899 €',
    features: [
      { name: 'Écran Retina', included: true },
      { name: 'Processeur A15', included: true },
      { name: 'Caméra 12MP', included: true },
      { name: 'Charge rapide', included: false },
      { name: '5G', included: false },
    ],
  },
  {
    name: 'Pro',
    price: '1 299 €',
    popular: true,
    features: [
      { name: 'Écran Retina', included: true },
      { name: 'Processeur A16 Pro', included: true },
      { name: 'Caméra 48MP', included: true },
      { name: 'Charge rapide', included: true },
      { name: '5G', included: true },
    ],
  },
  {
    name: 'Ultra',
    price: '1 799 €',
    features: [
      { name: 'Écran Retina XDR', included: true },
      { name: 'Processeur A17 Ultra', included: true },
      { name: 'Caméra 48MP Pro', included: true },
      { name: 'Charge rapide', included: true },
      { name: '5G mmWave', included: true },
    ],
  },
];

const ComparisonSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight animate-fade-in">
            Comparez nos modèles
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up delay-100">
            Trouvez le modèle qui correspond à vos besoins
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <Card
              key={plan.name}
              className={`relative p-8 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl animate-fade-in-up ${
                plan.popular
                  ? 'border-primary shadow-xl scale-105 bg-card'
                  : 'border-border bg-card'
              }`}
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 animate-scale-in delay-200">
                  <span className="px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                    Le plus populaire
                  </span>
                </div>
              )}

              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold transition-colors duration-300 group-hover:text-primary">{plan.name}</h3>
                  <p className="text-4xl font-bold text-primary">{plan.price}</p>
                </div>

                <ul className="space-y-4">
                  {plan.features.map((feature, featureIdx) => (
                    <li 
                      key={feature.name} 
                      className="flex items-center gap-3 transition-all duration-300 hover:translate-x-2"
                      style={{ animationDelay: `${(idx * 0.15) + (featureIdx * 0.05)}s` }}
                    >
                      {feature.included ? (
                        <Check className="h-5 w-5 text-primary flex-shrink-0 transition-transform duration-300 hover:scale-125" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      )}
                      <span
                        className={
                          feature.included
                            ? 'text-foreground'
                            : 'text-muted-foreground line-through'
                        }
                      >
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? 'default' : 'outline'}
                  className="w-full hover:scale-105 transition-transform duration-300"
                >
                  Choisir {plan.name}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
