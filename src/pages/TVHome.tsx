import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const TVHome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Apple TV 4K Hero with Video */}
        <section className="relative h-screen flex items-center justify-center bg-black text-white overflow-hidden">
          {/* Video Background */}
          <div className="absolute inset-0 w-full h-full">
            <video 
              className="w-full h-full object-cover opacity-30"
              autoPlay 
              muted 
              loop
              playsInline
            >
              <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          
          <div className="relative z-10 text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-4">Apple TV 4K</h1>
            <p className="text-2xl md:text-3xl mb-8">The ultimate way to watch TV.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg"
                onClick={() => navigate('/tv-home')}
              >
                Learn more
              </Button>
              <Button 
                variant="outline"
                className="border-white text-black hover:bg-white hover:text-black px-6 py-3 text-lg"
                onClick={() => navigate('/tv-home')}
              >
                Buy
              </Button>
            </div>
          </div>
        </section>

        {/* HomePod Hero */}
        <section className="relative h-screen flex items-center justify-center bg-white text-black">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-4">HomePod</h1>
            <p className="text-2xl md:text-3xl mb-8">The ultimate home audio experience.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg"
                onClick={() => navigate('/tv-home')}
              >
                Learn more
              </Button>
              <Button 
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white px-6 py-3 text-lg"
                onClick={() => navigate('/tv-home')}
              >
                Buy
              </Button>
            </div>
          </div>
        </section>

        {/* HomePod mini Hero */}
        <section className="relative h-screen flex items-center justify-center bg-black text-white">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-4">HomePod mini</h1>
            <p className="text-2xl md:text-3xl mb-8">Big sound. Small package.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg"
                onClick={() => navigate('/tv-home')}
              >
                Learn more
              </Button>
              <Button 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black px-6 py-3 text-lg"
                onClick={() => navigate('/tv-home')}
              >
                Buy
              </Button>
            </div>
          </div>
        </section>

        {/* Apple TV+ Hero */}
        <section className="relative h-screen flex items-center justify-center bg-white text-black">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-4">Apple TV+</h1>
            <p className="text-2xl md:text-3xl mb-8">Original stories from the most creative minds in TV and film.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg"
                onClick={() => navigate('/tv-home')}
              >
                Learn more
              </Button>
              <Button 
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white px-6 py-3 text-lg"
                onClick={() => navigate('/tv-home')}
              >
                Try it free
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TVHome;
