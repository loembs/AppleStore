import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Store = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Store Hero */}
        <section className="relative h-screen flex items-center justify-center bg-black text-white">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-4">Store</h1>
            <p className="text-2xl md:text-3xl mb-8">The best way to buy the products you love.</p>
          </div>
        </section>

        {/* Product Grid - 2x2 Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* iPhone Section */}
          <section className="relative h-screen flex items-center justify-center bg-white text-black cursor-pointer" onClick={() => navigate('/iphone')}>
            <div className="text-center">
              <h2 className="text-5xl md:text-6xl font-bold mb-4">iPhone</h2>
              <p className="text-xl md:text-2xl mb-8">Découvrez tous les iPhone 17.</p>
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/iphone');
                }}
              >
                En savoir plus
              </Button>
            </div>
          </section>

          {/* MacBook Section */}
          <section className="relative h-screen flex items-center justify-center bg-black text-white cursor-pointer overflow-hidden" onClick={() => navigate('/mac')}>
            <div className="absolute inset-0 w-full h-full flex items-center justify-center">
              <img 
                src="https://res.cloudinary.com/dlna2kuo1/image/upload/v1761665729/Mackbook_pro_14_yz8kbb.jpg" 
                className="w-auto h-full object-contain opacity-30"
                alt="MacBook Pro 14"
              />
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
            <div className="relative z-10 text-center">
              <h2 className="text-5xl md:text-6xl font-bold mb-4">MacBook</h2>
              <p className="text-xl md:text-2xl mb-4">Finition bleu ciel.</p>
              <p className="text-xl md:text-2xl mb-8">Performances de haut vol avec la M4.</p>
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/mac');
                }}
              >
                En savoir plus
              </Button>
            </div>
          </section>

          {/* iPad Pro Section */}
          <section className="relative h-screen flex items-center justify-center bg-black text-white cursor-pointer" onClick={() => navigate('/ipad')}>
            <div className="text-center">
              <h2 className="text-5xl md:text-6xl font-bold mb-4">iPad Pro</h2>
              <p className="text-xl md:text-2xl mb-4">Impossiblement fin.</p>
              <p className="text-xl md:text-2xl mb-8">Incroyablement puissant.</p>
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/ipad');
                }}
              >
                En savoir plus
              </Button>
            </div>
          </section>

          {/* Mac Studio Section */}
          <section className="relative h-screen flex items-center justify-center bg-gray-100 text-black cursor-pointer overflow-hidden" onClick={() => navigate('/mac')}>
            <div className="absolute inset-0 w-full h-full flex items-center justify-center">
              <img 
                src="https://res.cloudinary.com/dlna2kuo1/image/upload/v1761669963/mac_studio-removebg-preview_nyvmvz.png" 
                className="w-auto h-full object-contain opacity-40"
                alt="Mac Studio"
              />
              <div className="absolute inset-0 bg-gray-100/30"></div>
            </div>
            <div className="relative z-10 text-center">
              <h2 className="text-5xl md:text-6xl font-bold mb-4">Mac Studio</h2>
              <p className="text-xl md:text-2xl mb-4">M4 Max et M3 Ultra.</p>
              <p className="text-xl md:text-2xl mb-8">Choisissez votre superpouvoir.</p>
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/mac');
                }}
              >
                En savoir plus
              </Button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Store;