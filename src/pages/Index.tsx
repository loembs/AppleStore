import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CarouselApi } from '@/components/ui/carousel';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const Index = () => {
  const navigate = useNavigate();
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  const storeImages = [
    'https://res.cloudinary.com/dlna2kuo1/image/upload/v1784656170/fb579b02-0303-4906-afc3-2a4383c5873d_rqzst7.jpg',
    'https://res.cloudinary.com/dlna2kuo1/image/upload/v1784656169/e4208acf-e980-408a-b1e5-8777ecf7455d_rbg3kn.jpg',
    'https://res.cloudinary.com/dlna2kuo1/image/upload/v1784656169/5d34b500-98f2-4343-9061-fbf1300c1587_xeph4s.jpg',
    'https://res.cloudinary.com/dlna2kuo1/image/upload/v1784656169/ed3705f6-b6c3-478e-9ca2-7d04cff71667_jbbpft.jpg',
    'https://res.cloudinary.com/dlna2kuo1/image/upload/v1784656169/6f9abd73-0d41-452d-800d-9b18d21a3cac_vymxkg.jpg',
    'https://res.cloudinary.com/dlna2kuo1/image/upload/v1784656168/56b215ff-dab0-49e3-a2ee-6b6a9800da71_fj5cxi.jpg'
  ];

  // Auto-scroll du carrousel
  useEffect(() => {
    if (!carouselApi) return;

    const interval = setInterval(() => {
      carouselApi.scrollNext();
    }, 3000); // Change toutes les 3 secondes

    return () => clearInterval(interval);
  }, [carouselApi]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* iPhone Hero */}
        <section className="relative h-screen flex items-center justify-center md:items-start md:justify-start bg-white md:bg-white overflow-hidden">
          {/* Mobile: Image de background */}
          <div className="md:hidden absolute inset-0 w-full h-full">
            <img
              src="https://res.cloudinary.com/dlna2kuo1/image/upload/v1784644910/IMG_3925_iws0vv.jpg"
              className="w-full h-full object-cover"
              alt="iPhone 17"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
          </div>
          {/* Desktop: Image de background */}
          <div className="hidden md:block absolute inset-0 w-full h-full">
            <img
              src="https://res.cloudinary.com/dlna2kuo1/image/upload/v1784650967/imgi_4_hero_iphone_family__be5jkzxszb1e_large_wg9qgc.jpg"
              className="w-full h-full object-cover"
              alt="iPhone 17 Family"
            />
          </div>
          {/* Contenu au-dessus du background */}
          <div className="relative z-10 text-center md:text-left px-6 max-w-7xl mx-auto md:pt-20">
            <h1 className="text-white md:text-black text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">iPhone</h1>
            <p className="text-white md:text-black text-xl md:text-2xl lg:text-3xl mb-12 font-light">Découvrez tous les iPhone 17.</p>
            <div className="flex justify-center">
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
                  src="https://res.cloudinary.com/dlna2kuo1/image/upload/v1784648258/hero_large_pubk7p.png" 
                  className="object-contain h-[400px] md:h-[600px] lg:h-[700px] w-auto"
                  alt="MacBook Air"
                />
              </div>
              {/* Texte à droite */}
              <div className="text-center md:text-left">
                <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">MacBook Neo</h1>
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
        <section className="relative min-h-screen flex items-center bg-white text-black">
          <div className="max-w-7xl mx-auto w-full px-6 py-12 md:py-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Image à gauche */}
              <div className="order-2 md:order-1 flex items-center justify-center">
                <img 
                  src="https://res.cloudinary.com/dlna2kuo1/image/upload/v1784648675/hero__ecv967jz1y82_large_2x_eih05a.jpg" 
                  className="object-contain h-[400px] md:h-[600px] lg:h-[700px] w-auto opacity-80"
                  alt="iPad Air"
                />
              </div>
              {/* Texte à droite */}
              <div className="order-1 md:order-2 text-center md:text-left">
                <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">iPad </h1>
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
                  src="https://res.cloudinary.com/dlna2kuo1/image/upload/v1784648898/imgi_105_hero_static__c9sislzzicq6_medium_2x_ev1ujg.png" 
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
                  src="https://res.cloudinary.com/dlna2kuo1/image/upload/v1784649008/imgi_54_ipad_og_fc131c68c_hulphr.png" 
                  className="object-contain h-[400px] md:h-[600px] lg:h-[700px] w-auto"
                  alt="iPad Pro"
                />
              </div>
              {/* Texte à droite */}
              <div className="text-center md:text-left">
                <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">iPad</h1>
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
                  src="https://res.cloudinary.com/dlna2kuo1/image/upload/v1784649291/imgi_10_hw_elements_case__cf1pppj511jm_large-removebg-preview_k6xp9f.png" 
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

        {/* Boutique - Carrousel des lieux */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Notre Boutique</h2>
              <p className="text-lg md:text-xl text-gray-600">Sea Plaza - Découvrez nos espaces Apple</p>
            </div>

            <Carousel
              setApi={setCarouselApi}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {storeImages.map((image, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-2">
                      <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                        <img
                          src={image}
                          alt={`Boutique ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 md:-left-12" />
              <CarouselNext className="right-0 md:-right-12" />
            </Carousel>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
