import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const Support = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Support Hero */}
        <section className="relative h-screen flex items-center justify-center bg-black text-white">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-4">Support</h1>
            <p className="text-2xl md:text-3xl mb-8">Get help with your Apple products.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg"
                onClick={() => navigate('/support')}
              >
                Get support
              </Button>
            </div>
          </div>
        </section>

        {/* Service & Repair Hero */}
        <section className="relative h-screen flex items-center justify-center bg-white text-black">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-4">Service & Repair</h1>
            <p className="text-2xl md:text-3xl mb-8">Expert repairs by Apple-certified technicians.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg"
                onClick={() => navigate('/support')}
              >
                Find a service location
              </Button>
              <Button 
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white px-6 py-3 text-lg"
                onClick={() => navigate('/support')}
              >
                Start a repair
              </Button>
            </div>
          </div>
        </section>

        {/* AppleCare+ Hero */}
        <section className="relative h-screen flex items-center justify-center bg-black text-white">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-4">AppleCare+</h1>
            <p className="text-2xl md:text-3xl mb-8">Extended coverage and support for your Apple products.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg"
                onClick={() => navigate('/support')}
              >
                Learn more
              </Button>
              <Button 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black px-6 py-3 text-lg"
                onClick={() => navigate('/support')}
              >
                Buy AppleCare+
              </Button>
            </div>
          </div>
        </section>

        {/* Community Hero */}
        <section className="relative h-screen flex items-center justify-center bg-white text-black">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-4">Community</h1>
            <p className="text-2xl md:text-3xl mb-8">Connect with other Apple users and get help from the community.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg"
                onClick={() => navigate('/support')}
              >
                Join the community
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Support;
