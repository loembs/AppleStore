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
          {/* Mobile: Image à gauche, texte à droite */}
          <div className="md:hidden max-w-7xl mx-auto w-full px-6 py-12">
            <div className="grid grid-cols-1 gap-8 items-center">
              <div className="flex items-center justify-center">
                <img 
                  src="https://res.cloudinary.com/dlna2kuo1/image/upload/v1761221311/iphone17_sfkbuk.jpg" 
                  className="object-contain h-[600px] w-auto max-w-full"
                  alt="iPhone 17"
                />
              </div>
              <div className="text-center">
                <div className="flex justify-center">
                  <Button 
                    className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg"
                    onClick={() => navigate('/iphone')}
                  >
                    En savoir plus
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* Desktop: Design centré original */}
          <div className="hidden md:block absolute inset-0 w-full h-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="https://res.cloudinary.com/dlna2kuo1/image/upload/v1761221311/iphone17_sfkbuk.jpg" 
                className="object-contain h-full w-auto max-h-full mx-auto"
                alt="iPhone 17"
              />
            </div>
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          <div className="hidden md:block relative z-10 text-center px-6">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">iPhone</h1>
            <p className="text-2xl md:text-3xl mb-12 font-light">Découvrez tous les iPhone 17.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg"
                onClick={() => navigate('/iphone')}
              >
                En savoir plus
              </Button>
            </div>
          </div>
        </section>

        {/* MacBook Air */}
        <section className="relative min-h-screen flex items-center bg-white text-black">
          <div className="max-w-7xl mx-auto w-full px-6 py-12 md:py-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Image à gauche */}
              <div className="flex items-center justify-center">
                <img 
                  src="https://res.cloudinary.com/dprbhsvxl/image/upload/v1768545540/Apple_16-inch-MacBook-Pro_111319.jpg.landing-big_2x_s6k1il.jpg" 
                  className="object-contain h-[400px] md:h-[600px] lg:h-[700px] w-auto"
                  alt="MacBook Air"
                />
              </div>
              {/* Texte à droite */}
              <div className="text-center md:text-left">
                <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">MacBook Air</h1>
                <p className="text-2xl md:text-3xl mb-3 font-light">Finition bleu ciel.</p>
                <p className="text-2xl md:text-3xl mb-12 font-light">Performances de haut vol avec la M4.</p>
                <div className="flex justify-center md:justify-start">
                  <Button 
                    className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg"
                    onClick={() => navigate('/mac')}
                  >
                    En savoir plus
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* iPad Air */}
        <section className="relative min-h-screen flex items-center bg-white text-white">
          <div className="max-w-7xl mx-auto w-full px-6 py-12 md:py-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Image à gauche */}
              <div className="order-2 md:order-1 flex items-center justify-center">
                <img 
                  src="https://res.cloudinary.com/dprbhsvxl/image/upload/v1767151614/iPad_Air_rpgkfj.webp" 
                  className="object-contain h-[400px] md:h-[600px] lg:h-[700px] w-auto opacity-80"
                  alt="iPad Air"
                />
              </div>
              {/* Texte à droite */}
              <div className="order-1 md:order-2 text-center md:text-left">
                <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">iPad Air</h1>
                <p className="text-2xl md:text-3xl mb-12 font-light">Maintenant boosté par la puce M3.</p>
                <div className="flex justify-center md:justify-start">
                  <Button 
                    className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg"
                    onClick={() => navigate('/ipad')}
                  >
                    En savoir plus
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MacBook Pro */}
        <section className="relative min-h-screen flex items-center bg-black text-white">
          <div className="max-w-7xl mx-auto w-full px-6 py-12 md:py-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Image à gauche */}
              <div className="order-2 md:order-1 flex items-center justify-center">
                <img 
                  src="https://res.cloudinary.com/dlna2kuo1/image/upload/v1761667919/mack_otyxqu.jpg" 
                  className="object-contain h-[400px] md:h-[600px] lg:h-[700px] w-auto opacity-80"
                  alt="MacBook Pro 14"
                />
              </div>
              {/* Texte à droite */}
              <div className="order-1 md:order-2 text-center md:text-left">
                <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">MacBook Pro</h1>
                <p className="text-2xl md:text-3xl mb-12 font-light">Prodigieux en tout.</p>
                <div className="flex justify-center md:justify-start">
                  <Button 
                    className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg"
                    onClick={() => navigate('/mac')}
                  >
                    En savoir plus
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* iPad Pro */}
        <section className="relative min-h-screen flex items-center bg-white text-black">
          <div className="max-w-7xl mx-auto w-full px-6 py-12 md:py-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Image à gauche */}
              <div className="flex items-center justify-center">
                <img 
                  src="https://res.cloudinary.com/dprbhsvxl/image/upload/v1767151615/iPad_Pro_qaw13r.jpg" 
                  className="object-contain h-[400px] md:h-[600px] lg:h-[700px] w-auto"
                  alt="iPad Pro"
                />
              </div>
              {/* Texte à droite */}
              <div className="text-center md:text-left">
                <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">iPad Pro</h1>
                <p className="text-2xl md:text-3xl mb-3 font-light">Impossiblement fin.</p>
                <p className="text-2xl md:text-3xl mb-12 font-light">Incroyablement puissant.</p>
                <div className="flex justify-center md:justify-start">
                  <Button 
                    className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg"
                    onClick={() => navigate('/ipad')}
                  >
                    En savoir plus
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mac Studio */}
        <section className="relative min-h-screen flex items-center bg-black text-white">
          <div className="max-w-7xl mx-auto w-full px-6 py-12 md:py-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Image à gauche */}
              <div className="order-2 md:order-1 flex items-center justify-center">
                <img 
                  src="https://res.cloudinary.com/dlna2kuo1/image/upload/v1761669963/mac_studio-removebg-preview_nyvmvz.png" 
                  className="object-contain h-[400px] md:h-[600px] lg:h-[700px] w-auto"
                  alt="Mac Studio"
                />
              </div>
              {/* Texte à droite */}
              <div className="order-1 md:order-2 text-center md:text-left">
                <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">Mac Studio</h1>
                <p className="text-2xl md:text-3xl mb-3 font-light">M4 Max et M3 Ultra.</p>
                <p className="text-2xl md:text-3xl mb-12 font-light">Choisissez votre superpouvoir.</p>
                <div className="flex justify-center md:justify-start">
                  <Button 
                    className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg"
                    onClick={() => navigate('/mac')}
                  >
                    En savoir plus
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
