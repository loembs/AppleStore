import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const IPhone = () => {
  const navigate = useNavigate();

  const iphoneModels = [
    {
      id: 'iphone-17-pro',
      name: 'iPhone 17 Pro',
      tagline: 'All out Pro.',
      price: 'From $999',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80',
      colors: [
        { name: 'Natural Titanium', hex: '#8E8E93', code: 'natural' },
        { name: 'Blue Titanium', hex: '#007AFF', code: 'blue' },
        { name: 'White Titanium', hex: '#F2F2F7', code: 'white' },
        { name: 'Black Titanium', hex: '#1C1C1E', code: 'black' }
      ],
      storage: [
        { size: '128GB', price: 999 },
        { size: '256GB', price: 1099 },
        { size: '512GB', price: 1299 },
        { size: '1TB', price: 1499 }
      ],
      features: ['A18 Pro chip', 'Pro camera system', 'Titanium design', 'Action Button']
    },
    {
      id: 'iphone-17',
      name: 'iPhone 17',
      tagline: 'The thinnest iPhone ever.',
      price: 'From $799',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80',
      colors: [
        { name: 'Pink', hex: '#FF69B4', code: 'pink' },
        { name: 'Yellow', hex: '#FFD700', code: 'yellow' },
        { name: 'Green', hex: '#32CD32', code: 'green' },
        { name: 'Blue', hex: '#007AFF', code: 'blue' },
        { name: 'Black', hex: '#1C1C1E', code: 'black' }
      ],
      storage: [
        { size: '128GB', price: 799 },
        { size: '256GB', price: 899 },
        { size: '512GB', price: 1099 }
      ],
      features: ['A18 chip', 'Advanced camera system', 'Ceramic Shield', 'MagSafe']
    },
    {
      id: 'iphone-16',
      name: 'iPhone 16',
      tagline: 'Big and bigger.',
      price: 'From $699',
      image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&q=80',
      colors: [
        { name: 'Pink', hex: '#FF69B4', code: 'pink' },
        { name: 'Yellow', hex: '#FFD700', code: 'yellow' },
        { name: 'Green', hex: '#32CD32', code: 'green' },
        { name: 'Blue', hex: '#007AFF', code: 'blue' },
        { name: 'Black', hex: '#1C1C1E', code: 'black' }
      ],
      storage: [
        { size: '128GB', price: 699 },
        { size: '256GB', price: 799 },
        { size: '512GB', price: 999 }
      ],
      features: ['A17 Pro chip', 'Advanced camera system', 'Ceramic Shield', 'MagSafe']
    },
    {
      id: 'iphone-15',
      name: 'iPhone 15',
      tagline: 'New camera. New design. Newphoria.',
      price: 'From $599',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80',
      colors: [
        { name: 'Pink', hex: '#FF69B4', code: 'pink' },
        { name: 'Yellow', hex: '#FFD700', code: 'yellow' },
        { name: 'Green', hex: '#32CD32', code: 'green' },
        { name: 'Blue', hex: '#007AFF', code: 'blue' },
        { name: 'Black', hex: '#1C1C1E', code: 'black' }
      ],
      storage: [
        { size: '128GB', price: 599 },
        { size: '256GB', price: 699 },
        { size: '512GB', price: 899 }
      ],
      features: ['A16 Bionic chip', 'Advanced camera system', 'Ceramic Shield', 'MagSafe']
    },
    {
      id: 'iphone-se',
      name: 'iPhone SE',
      tagline: 'Love the power. Love the price.',
      price: 'From $429',
      image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&q=80',
      colors: [
        { name: 'Midnight', hex: '#1C1C1E', code: 'midnight' },
        { name: 'Starlight', hex: '#F2F2F7', code: 'starlight' },
        { name: 'Red', hex: '#FF3B30', code: 'red' }
      ],
      storage: [
        { size: '64GB', price: 429 },
        { size: '128GB', price: 479 },
        { size: '256GB', price: 579 }
      ],
      features: ['A15 Bionic chip', 'Single camera system', 'Touch ID', 'Wireless charging']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center bg-black text-white overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <video 
              src="https://res.cloudinary.com/dlna2kuo1/video/upload/v1761670225/iphonevideo_pgfrdl.mp4"
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          <div className="relative z-10 text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-4">iPhone</h1>
            <p className="text-2xl md:text-3xl mb-8">The most advanced iPhone lineup ever.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg"
                onClick={() => navigate('/iphone')}
              >
                Learn more
              </Button>
              <Button 
                variant="outline"
                className="border-white text-black hover:bg-white hover:text-black px-6 py-3 text-lg"
                onClick={() => navigate('/iphone')}
              >
                Buy
              </Button>
            </div>
          </div>
        </section>

        {/* iPhone Models Grid */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-4">Which iPhone is right for you?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Compare features, technical specifications, and prices to find the perfect iPhone.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {iphoneModels.map((model, idx) => (
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
                      <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wide">Storage</h4>
                      <div className="flex gap-2 flex-wrap">
                        {model.storage.map((storage) => (
                          <Badge key={storage.size} variant="outline" className="text-xs">
                            {storage.size}
                          </Badge>
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


        {/* Compare Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">Compare iPhone models</h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              See the differences between iPhone models and find the one that's right for you.
            </p>
            <Button 
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg"
            >
              Compare all models
            </Button>
          </div>
        </section>

        {/* Apple Trade In */}
        <section className="py-24 bg-black text-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">Apple Trade In</h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Get up to $200–$700 in credit when you trade in iPhone 13 or higher.
            </p>
            <Button 
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg"
            >
              Get your estimate
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default IPhone;
