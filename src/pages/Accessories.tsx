import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const Accessories = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Accessories Hero */}
        <section className="relative h-screen flex items-center justify-center bg-black text-white">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-4">Accessoires</h1>
            <p className="text-2xl md:text-3xl mb-8">Tout ce dont vous avez besoin pour tirer le meilleur parti de vos appareils Apple.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg"
                onClick={() => navigate('/accessories')}
              >
                Acheter maintenant
              </Button>
            </div>
          </div>
        </section>

        {/* Cases & Protection Hero */}
        <section className="relative h-screen flex items-center justify-center bg-white text-black">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-4">Étuis et Protection</h1>
            <p className="text-2xl md:text-3xl mb-8">Protégez vos appareils avec style.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg"
                onClick={() => navigate('/accessories')}
              >
                Acheter des étuis
              </Button>
              <Button 
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white px-6 py-3 text-lg"
                onClick={() => navigate('/accessories')}
              >
                Acheter des protections d'écran
              </Button>
            </div>
          </div>
        </section>

        {/* Charging Hero */}
        <section className="relative h-screen flex items-center justify-center bg-black text-white">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-4">Charge</h1>
            <p className="text-2xl md:text-3xl mb-8">Rechargez vos appareils avec style.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg"
                onClick={() => navigate('/accessories')}
              >
                Acheter des chargeurs
              </Button>
              <Button 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black px-6 py-3 text-lg"
                onClick={() => navigate('/accessories')}
              >
                Acheter MagSafe
              </Button>
            </div>
          </div>
        </section>

        {/* Audio Hero */}
        <section className="relative h-screen flex items-center justify-center bg-white text-black">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-4">Audio</h1>
            <p className="text-2xl md:text-3xl mb-8">Améliorez votre expérience d'écoute.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg"
                onClick={() => navigate('/accessories')}
              >
                Acheter des accessoires audio
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Accessories;
