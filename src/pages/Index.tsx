import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* iPhone Hero */}
        <section className="relative h-screen flex items-center justify-center bg-black text-white overflow-hidden">
          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
            <img 
              src="https://res.cloudinary.com/dlna2kuo1/image/upload/v1761221311/iphone17_sfkbuk.jpg" 
              className="object-contain md:object-contain h-[115%] md:h-full w-auto md:w-auto translate-y-6 md:translate-y-0"
              alt="iPhone 17"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          <div className="relative z-10 text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-4">iPhone</h1>
            <p className="text-2xl md:text-3xl mb-8">Découvrez tous les iPhone 17.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-lg"
                onClick={() => navigate('/iphone')}
              >
                En savoir plus
              </Button>
            </div>
          </div>
        </section>

        {/* MacBook Air */}
        <section className="relative h-screen flex items-center justify-center bg-white text-black">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-4">MacBook Air</h1>
            <p className="text-2xl md:text-3xl mb-4">Finition bleu ciel.</p>
            <p className="text-2xl md:text-3xl mb-8">Performances de haut vol avec la M4.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-lg"
                onClick={() => navigate('/mac')}
              >
                En savoir plus
              </Button>
            </div>
          </div>
        </section>

        {/* iPad Air */}
        <section className="relative h-screen flex items-center justify-center bg-black text-white">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-4">iPad Air</h1>
            <p className="text-2xl md:text-3xl mb-8">Maintenant boosté par la puce M3.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-lg"
                onClick={() => navigate('/ipad')}
              >
                En savoir plus
              </Button>
            </div>
          </div>
        </section>

        {/* iPad */}
        <section className="relative h-screen flex items-center justify-center bg-white text-black">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-4">iPad</h1>
            <p className="text-2xl md:text-3xl mb-8">Maintenant avec la vitesse de la puce A16 et un stockage de base doublé.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg"
                onClick={() => navigate('/ipad')}
              >
                En savoir plus
              </Button>
            </div>
          </div>
        </section>

        {/* MacBook Pro */}
        <section className="relative h-screen flex items-center justify-center bg-black text-white overflow-hidden">
          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
            <img 
              src="https://res.cloudinary.com/dlna2kuo1/image/upload/v1761667919/mack_otyxqu.jpg" 
              className="w-auto h-full object-contain opacity-30"
              alt="MacBook Pro 14"
            />
          </div>
          <div className="relative z-10 text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-4">MacBook Pro</h1>
            <p className="text-2xl md:text-3xl mb-8">Prodigieux en tout.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-lg"
                onClick={() => navigate('/mac')}
              >
                En savoir plus
              </Button>
            </div>
          </div>
        </section>

        {/* iPad Pro */}
        <section className="relative h-screen flex items-center justify-center bg-white text-black">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-4">iPad Pro</h1>
            <p className="text-2xl md:text-3xl mb-4">Impossiblement fin.</p>
            <p className="text-2xl md:text-3xl mb-8">Incroyablement puissant.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-lg"
                onClick={() => navigate('/ipad')}
              >
                En savoir plus
              </Button>
            </div>
          </div>
        </section>

        {/* Mac Studio */}
        <section className="relative h-screen flex items-center justify-center bg-black text-white overflow-hidden">
          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
            <img 
              src="https://res.cloudinary.com/dlna2kuo1/image/upload/v1761669963/mac_studio-removebg-preview_nyvmvz.png" 
              className="w-auto h-full object-contain"
              alt="Mac Studio"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          <div className="relative z-10 text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-4">Mac Studio</h1>
            <p className="text-2xl md:text-3xl mb-4">M4 Max et M3 Ultra.</p>
            <p className="text-2xl md:text-3xl mb-8">Choisissez votre superpouvoir.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-lg"
                onClick={() => navigate('/mac')}
              >
                En savoir plus
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
