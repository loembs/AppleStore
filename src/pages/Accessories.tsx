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
            <h1 className="text-6xl md:text-8xl font-bold mb-4">Accessories</h1>
            <p className="text-2xl md:text-3xl mb-8">Everything you need to get the most out of your Apple devices.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg"
                onClick={() => navigate('/accessories')}
              >
                Shop now
              </Button>
            </div>
          </div>
        </section>

        {/* Cases & Protection Hero */}
        <section className="relative h-screen flex items-center justify-center bg-white text-black">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-4">Cases & Protection</h1>
            <p className="text-2xl md:text-3xl mb-8">Keep your devices safe and stylish.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg"
                onClick={() => navigate('/accessories')}
              >
                Shop cases
              </Button>
              <Button 
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white px-6 py-3 text-lg"
                onClick={() => navigate('/accessories')}
              >
                Shop screen protectors
              </Button>
            </div>
          </div>
        </section>

        {/* Charging Hero */}
        <section className="relative h-screen flex items-center justify-center bg-black text-white">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-4">Charging</h1>
            <p className="text-2xl md:text-3xl mb-8">Power up your devices with style.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg"
                onClick={() => navigate('/accessories')}
              >
                Shop chargers
              </Button>
              <Button 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black px-6 py-3 text-lg"
                onClick={() => navigate('/accessories')}
              >
                Shop MagSafe
              </Button>
            </div>
          </div>
        </section>

        {/* Audio Hero */}
        <section className="relative h-screen flex items-center justify-center bg-white text-black">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-4">Audio</h1>
            <p className="text-2xl md:text-3xl mb-8">Enhance your listening experience.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg"
                onClick={() => navigate('/accessories')}
              >
                Shop audio accessories
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
