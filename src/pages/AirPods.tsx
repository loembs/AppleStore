import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AirPods = () => {
  const navigate = useNavigate();

  const airpodsModels = [
    {
      id: 'airpods-pro-3',
      name: 'AirPods Pro 3',
      tagline: 'Next-level noise cancellation.',
      price: 'From $249',
      image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800&q=80',
      colors: [
        { name: 'White', hex: '#F2F2F7', code: 'white' }
      ],
      features: ['H3 chip', 'Adaptive Transparency', 'Personalized Spatial Audio', 'Up to 6 hours listening time'],
      specs: {
        'Chip': 'H3',
        'Battery': '6h',
        'Case': 'USB-C',
        'Weight': '5.3g'
      }
    },
    {
      id: 'airpods-4',
      name: 'AirPods 4',
      tagline: 'All-new design. All-day comfort.',
      price: 'From $179',
      image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800&q=80',
      colors: [
        { name: 'White', hex: '#F2F2F7', code: 'white' },
        { name: 'Black', hex: '#1C1C1E', code: 'black' }
      ],
      features: ['H3 chip', 'Personalized Spatial Audio', 'Up to 6 hours listening time', 'USB-C charging'],
      specs: {
        'Chip': 'H3',
        'Battery': '6h',
        'Case': 'USB-C',
        'Weight': '5.1g'
      }
    },
    {
      id: 'airpods-max',
      name: 'AirPods Max',
      tagline: 'A perfect balance of exhilarating high-fidelity audio.',
      price: 'From $549',
      image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800&q=80',
      colors: [
        { name: 'Space Gray', hex: '#8E8E93', code: 'space-gray' },
        { name: 'Silver', hex: '#C7C7CC', code: 'silver' },
        { name: 'Sky Blue', hex: '#87CEEB', code: 'sky-blue' },
        { name: 'Green', hex: '#32CD32', code: 'green' },
        { name: 'Pink', hex: '#FF69B4', code: 'pink' }
      ],
      features: ['H2 chip', 'Active Noise Cancellation', 'Transparency mode', 'Up to 20 hours listening time'],
      specs: {
        'Chip': 'H2',
        'Battery': '20h',
        'Case': 'Lightning',
        'Weight': '384g'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center bg-black text-white">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-4">AirPods</h1>
            <p className="text-2xl md:text-3xl mb-8">All-new design. All-day comfort.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg"
                onClick={() => navigate('/airpods')}
              >
                Learn more
              </Button>
              <Button 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black px-6 py-3 text-lg font-medium"
                onClick={() => navigate('/airpods')}
              >
                Buy
              </Button>
            </div>
          </div>
        </section>

        {/* AirPods Models Grid */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-4">Which AirPods are right for you?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Compare features, comfort, and prices to find the perfect AirPods for your lifestyle.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {airpodsModels.map((model, idx) => (
                <Card 
                  key={model.id}
                  className="overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer group border-0 bg-gray-50"
                  onClick={() => navigate('/product-config', { state: { product: model } })}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-8 overflow-hidden">
                    <img 
                      src={model.image} 
                      alt={model.name} 
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  
                  <div className="p-8 space-y-6">
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold">{model.name}</h3>
                      <p className="text-lg text-gray-600">{model.tagline}</p>
                      <p className="text-2xl font-bold">{model.price}</p>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wide">Colors</h4>
                      <div className="flex gap-2 flex-wrap">
                        {model.colors.map((color) => (
                          <div
                            key={color.code}
                            className="w-6 h-6 rounded-full border-2 border-gray-300"
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wide">Key Features</h4>
                      <ul className="space-y-1">
                        {model.features.slice(0, 2).map((feature, i) => (
                          <li key={i} className="text-sm text-gray-600">• {feature}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button 
                      className="w-full bg-blue-600 text-white hover:bg-blue-700 font-medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/product-config', { state: { product: model } });
                      }}
                    >
                      Configure
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>


        {/* Audio Technology Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-8">Audio Technology</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience sound like never before with Apple's most advanced audio technology.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🎵</span>
                </div>
                <h3 className="text-2xl font-semibold">Spatial Audio</h3>
                <p className="text-gray-600">Immersive sound that surrounds you with dynamic head tracking.</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🔇</span>
                </div>
                <h3 className="text-2xl font-semibold">Noise Cancellation</h3>
                <p className="text-gray-600">Block out the world with industry-leading active noise cancellation.</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🔋</span>
                </div>
                <h3 className="text-2xl font-semibold">All-Day Battery</h3>
                <p className="text-gray-600">Up to 6 hours of listening time with the charging case.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Compare Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">Compare AirPods models</h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              See the differences between AirPods models and find the one that's right for you.
            </p>
            <Button 
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg"
            >
              Compare all models
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AirPods;