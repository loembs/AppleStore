import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const IPad = () => {
  const navigate = useNavigate();

  const ipadModels = [
    {
      id: 'ipad-pro',
      name: 'iPad Pro',
      tagline: 'Advanced AI performance and game-changing capabilities.',
      price: 'From $799',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80',
      sizes: ['11-inch', '13-inch'],
      colors: [
        { name: 'Space Gray', hex: '#8E8E93', code: 'space-gray' },
        { name: 'Silver', hex: '#C7C7CC', code: 'silver' }
      ],
      storage: [
        { size: '256GB', price: 799 },
        { size: '512GB', price: 999 },
        { size: '1TB', price: 1399 },
        { size: '2TB', price: 1799 }
      ],
      features: ['M5 chip', 'Liquid Retina XDR display', 'Face ID', 'Apple Pencil Pro support'],
      connectivity: [
        { name: 'WiFi', price: 0 },
        { name: 'WiFi + Cellular', price: 200 }
      ]
    },
    {
      id: 'ipad-air',
      name: 'iPad Air',
      tagline: 'Powerful. Colorful. Wonderful.',
      price: 'From $599',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80',
      sizes: ['11-inch', '13-inch'],
      colors: [
        { name: 'Space Gray', hex: '#8E8E93', code: 'space-gray' },
        { name: 'Purple', hex: '#AF52DE', code: 'purple' },
        { name: 'Blue', hex: '#007AFF', code: 'blue' },
        { name: 'Starlight', hex: '#F2F2F7', code: 'starlight' }
      ],
      storage: [
        { size: '128GB', price: 599 },
        { size: '256GB', price: 749 },
        { size: '512GB', price: 949 },
        { size: '1TB', price: 1349 }
      ],
      features: ['M4 chip', 'Liquid Retina display', 'Touch ID', 'Apple Pencil Pro support'],
      connectivity: [
        { name: 'WiFi', price: 0 },
        { name: 'WiFi + Cellular', price: 150 }
      ]
    },
    {
      id: 'ipad',
      name: 'iPad',
      tagline: 'Lovable. Drawable. Magical.',
      price: 'From $449',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80',
      sizes: ['10.9-inch'],
      colors: [
        { name: 'Space Gray', hex: '#8E8E93', code: 'space-gray' },
        { name: 'Silver', hex: '#C7C7CC', code: 'silver' },
        { name: 'Blue', hex: '#007AFF', code: 'blue' },
        { name: 'Pink', hex: '#FF69B4', code: 'pink' },
        { name: 'Yellow', hex: '#FFD700', code: 'yellow' }
      ],
      storage: [
        { size: '64GB', price: 449 },
        { size: '256GB', price: 599 }
      ],
      features: ['A16 Bionic chip', 'Liquid Retina display', 'Touch ID', 'Apple Pencil support'],
      connectivity: [
        { name: 'WiFi', price: 0 },
        { name: 'WiFi + Cellular', price: 130 }
      ]
    },
    {
      id: 'ipad-mini',
      name: 'iPad mini',
      tagline: 'Mega power. Mini sized.',
      price: 'From $499',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80',
      sizes: ['8.3-inch'],
      colors: [
        { name: 'Space Gray', hex: '#8E8E93', code: 'space-gray' },
        { name: 'Purple', hex: '#AF52DE', code: 'purple' },
        { name: 'Pink', hex: '#FF69B4', code: 'pink' },
        { name: 'Starlight', hex: '#F2F2F7', code: 'starlight' }
      ],
      storage: [
        { size: '64GB', price: 499 },
        { size: '256GB', price: 649 }
      ],
      features: ['A17 Bionic chip', 'Liquid Retina display', 'Touch ID', 'Apple Pencil support'],
      connectivity: [
        { name: 'WiFi', price: 0 },
        { name: 'WiFi + Cellular', price: 130 }
      ]
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
              src="https://res.cloudinary.com/dlna2kuo1/video/upload/v1761668216/video_ipad_pro_vxkao7.mp4"
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          <div className="relative z-10 text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-4">iPad</h1>
            <p className="text-2xl md:text-3xl mb-8">The future of iPad.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg"
                onClick={() => navigate('/ipad')}
              >
                Learn more
              </Button>
              <Button 
                variant="outline"
                className="border-white text-black hover:bg-white hover:text-black px-6 py-3 text-lg"
                onClick={() => navigate('/ipad')}
              >
                Buy
              </Button>
            </div>
          </div>
        </section>

        {/* iPad Models Grid */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-4">Which iPad is right for you?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Compare features, sizes, and prices to find the perfect iPad for your needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {ipadModels.map((model, idx) => (
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
                      <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wide">Sizes</h4>
                      <div className="flex gap-2 flex-wrap">
                        {model.sizes.map((size) => (
                          <Badge key={size} variant="outline" className="text-xs">
                            {size}
                          </Badge>
                        ))}
                      </div>
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
                      <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wide">Connectivity</h4>
                      <div className="flex gap-2 flex-wrap">
                        {model.connectivity.map((option) => (
                          <Badge key={option.name} variant="outline" className="text-xs">
                            {option.name}
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


        {/* Apple Pencil Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-8">Apple Pencil</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The most advanced Apple Pencil ever. Now with Find My support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">✏️</span>
                </div>
                <h3 className="text-2xl font-semibold">Precision</h3>
                <p className="text-gray-600">Pixel-perfect precision with tilt and pressure sensitivity.</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-2xl font-semibold">Creativity</h3>
                <p className="text-gray-600">Bring your ideas to life with professional-grade tools.</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-2xl font-semibold">Find My</h3>
                <p className="text-gray-600">Never lose your Apple Pencil with Find My support.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Compare Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">Compare iPad models</h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              See the differences between iPad models and find the one that's right for you.
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

export default IPad;