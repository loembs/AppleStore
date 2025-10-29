import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import productsData from '@/data/products.json';

const Accessoires = () => {
  const navigate = useNavigate();
  const accessories = productsData.accessories;

  const categories = [
    { name: 'Claviers', icon: '⌨️', color: 'bg-blue-500/10 text-blue-600' },
    { name: 'Stylets', icon: '✏️', color: 'bg-purple-500/10 text-purple-600' },
    { name: 'Chargeurs', icon: '🔌', color: 'bg-green-500/10 text-green-600' },
    { name: 'Étuis', icon: '📱', color: 'bg-orange-500/10 text-orange-600' },
    { name: 'Écouteurs', icon: '🎧', color: 'bg-pink-500/10 text-pink-600' },
    { name: 'Montres', icon: '⌚', color: 'bg-cyan-500/10 text-cyan-600' },
  ];

  const features = [
    { 
      title: 'Qualité Apple', 
      description: 'Accessoires officiels Apple garantis',
      icon: '✨'
    },
    { 
      title: 'Compatibilité parfaite', 
      description: 'Conçus pour fonctionner parfaitement avec vos appareils',
      icon: '🔗'
    },
    { 
      title: 'Design premium', 
      description: 'Esthétique et fonctionnalité réunies',
      icon: '🎨'
    },
    { 
      title: 'Garantie étendue', 
      description: 'Protection et support Apple inclus',
      icon: '🛡️'
    },
    { 
      title: 'Livraison gratuite', 
      description: 'Expédition rapide et sécurisée',
      icon: '🚚'
    },
    { 
      title: 'Installation', 
      description: 'Aide à l\'installation en magasin',
      icon: '🔧'
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-20 pb-16 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="space-y-6 animate-fade-in-down">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
                Accessoires officiels
              </Badge>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
                Accessoires
              </h1>
              <p className="text-2xl md:text-4xl font-light max-w-3xl mx-auto text-muted-foreground">
                Complétez votre expérience Apple.
              </p>
              <div className="flex gap-4 justify-center pt-6">
                <Button 
                  size="lg"
                  onClick={() => navigate('/store')}
                >
                  Voir tous les accessoires
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                >
                  Aide au choix
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Catégories */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <h2 className="text-5xl font-bold text-center mb-4">
              Catégories d'accessoires
            </h2>
            <p className="text-center text-xl text-muted-foreground mb-16 max-w-2xl mx-auto">
              Trouvez l'accessoire parfait pour votre appareil Apple.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categories.map((category, idx) => (
                <Card 
                  key={category.name}
                  className="p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <h3 className="font-semibold">{category.name}</h3>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Produits vedettes */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-6">
            <h2 className="text-5xl font-bold text-center mb-4">
              Accessoires vedettes
            </h2>
            <p className="text-center text-xl text-muted-foreground mb-16 max-w-2xl mx-auto">
              Nos accessoires les plus populaires et les mieux notés.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {accessories.map((accessory, idx) => (
                <Card 
                  key={accessory.id}
                  className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                  onClick={() => navigate(`/accessoires/${accessory.id}`)}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="aspect-video bg-gradient-to-br from-muted/30 to-muted/10 flex items-center justify-center p-8 overflow-hidden">
                    <img 
                      src={accessory.image} 
                      alt={accessory.name} 
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <Badge variant="secondary" className="text-xs">
                        {accessory.category}
                      </Badge>
                      <h3 className="text-xl font-bold">{accessory.name}</h3>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-2xl font-bold">{accessory.price} €</p>
                    </div>
                    
                    {accessory.compatibility && (
                      <div className="space-y-2">
                        <p className="text-sm font-semibold">Compatible avec :</p>
                        <div className="flex flex-wrap gap-1">
                          {accessory.compatibility.map((device, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {device}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {accessory.features && (
                      <ul className="space-y-1 pt-4 border-t text-sm">
                        {accessory.features.slice(0, 2).map((feature, i) => (
                          <li key={i} className="text-muted-foreground flex items-start">
                            <span className="mr-2">•</span>
                            <span className="line-clamp-1">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    <Button className="w-full mt-4" onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/accessoires/${accessory.id}`);
                    }}>
                      Acheter
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <h2 className="text-5xl font-bold text-center mb-16">
              Pourquoi choisir nos accessoires
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, idx) => (
                <div 
                  key={feature.title}
                  className="p-8 bg-muted/50 rounded-3xl space-y-4 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="text-5xl">{feature.icon}</div>
                  <h3 className="text-2xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-6">
            <h2 className="text-5xl font-bold text-center mb-16">
              Services iStar
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="p-8 text-center hover:shadow-lg transition-all">
                <div className="text-5xl mb-4">🔧</div>
                <h3 className="text-xl font-bold mb-2">Installation</h3>
                <p className="text-muted-foreground text-sm">
                  Installation gratuite de vos accessoires en magasin
                </p>
              </Card>
              
              <Card className="p-8 text-center hover:shadow-lg transition-all">
                <div className="text-5xl mb-4">🛡️</div>
                <h3 className="text-xl font-bold mb-2">Garantie</h3>
                <p className="text-muted-foreground text-sm">
                  Garantie Apple étendue sur tous nos accessoires
                </p>
              </Card>
              
              <Card className="p-8 text-center hover:shadow-lg transition-all">
                <div className="text-5xl mb-4">🚚</div>
                <h3 className="text-xl font-bold mb-2">Livraison</h3>
                <p className="text-muted-foreground text-sm">
                  Livraison gratuite dès 50€ d'achat
                </p>
              </Card>
              
              <Card className="p-8 text-center hover:shadow-lg transition-all">
                <div className="text-5xl mb-4">💬</div>
                <h3 className="text-xl font-bold mb-2">Conseil</h3>
                <p className="text-muted-foreground text-sm">
                  Conseils personnalisés par nos experts
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Personnalisez votre expérience
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Découvrez notre gamme complète d'accessoires Apple officiels. 
              Livraison gratuite et installation en magasin.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/store')}>
                Voir tous les accessoires
              </Button>
              <Button size="lg" variant="outline">
                Prendre rendez-vous
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Accessoires;