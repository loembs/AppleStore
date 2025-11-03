import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Watch = () => {
  const navigate = useNavigate();
  const [currentInfoIndex, setCurrentInfoIndex] = useState(0);

  const healthInfo = [
    {
      title: "Heart Health",
      description: "Monitor your heart rate, detect irregular rhythms, and track your cardiovascular health with advanced sensors.",
      icon: "❤️",
      color: "red",
      data: "72 BPM",
      status: "Normal"
    },
    {
      title: "Fitness Tracking", 
      description: "Track your workouts, monitor your activity, and achieve your fitness goals with comprehensive metrics.",
      icon: "🏃",
      color: "green",
      data: "8,247 steps",
      status: "Goal: 10k"
    },
    {
      title: "Sleep Monitoring",
      description: "Track your sleep patterns and get insights to improve your rest with detailed sleep analysis.",
      icon: "😴", 
      color: "purple",
      data: "7h 32m",
      status: "Good"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInfoIndex((prevIndex) => (prevIndex + 1) % healthInfo.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const watchModels = [
    {
      id: 'apple-watch-series-11',
      name: 'Apple Watch Series 11',
      tagline: 'The ultimate way to watch your health.',
      price: 'From $399',
      image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&q=80',
      sizes: ['41mm', '45mm'],
      colors: [
        { name: 'Midnight', hex: '#1C1C1E', code: 'midnight' },
        { name: 'Starlight', hex: '#F2F2F7', code: 'starlight' },
        { name: 'Pink', hex: '#FF69B4', code: 'pink' },
        { name: 'Blue', hex: '#007AFF', code: 'blue' },
        { name: 'Red', hex: '#FF3B30', code: 'red' }
      ],
      features: ['S11 chip', 'Advanced health monitoring', 'Always-On Retina display', 'Water resistant']
    },
    {
      id: 'apple-watch-se',
      name: 'Apple Watch SE',
      tagline: 'A healthy leap ahead.',
      price: 'From $249',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
      sizes: ['40mm', '44mm'],
      colors: [
        { name: 'Midnight', hex: '#1C1C1E', code: 'midnight' },
        { name: 'Starlight', hex: '#F2F2F7', code: 'starlight' },
        { name: 'Silver', hex: '#C7C7CC', code: 'silver' }
      ],
      features: ['S8 chip', 'Health monitoring', 'Retina display', 'Water resistant']
    },
    {
      id: 'apple-watch-ultra',
      name: 'Apple Watch Ultra',
      tagline: 'Adventure awaits.',
      price: 'From $799',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
      sizes: ['49mm'],
      colors: [
        { name: 'Natural Titanium', hex: '#8E8E93', code: 'natural' }
      ],
      features: ['S9 chip', 'Titanium case', 'Action Button', 'Dive computer']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center bg-black text-white">

        <div className="absolute inset-0 w-full h-full">
            <video 
              className="w-full h-full object-cover opacity-30"
              autoPlay 
              muted 
              loop
              playsInline
            >
              <source src="https://res.cloudinary.com/dlna2kuo1/video/upload/v1760439859/watch_video_kzimuh.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          
          <div className="relative z-10 text-center px-6">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">Apple Watch</h1>
            <p className="text-2xl md:text-3xl mb-12 font-light">The most advanced Apple Watch lineup ever.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-lg"
                onClick={() => navigate('/watch')}
              >
                En savoir plus
              </Button>
              <Button 
                variant="outline"
                className="border-white text-black hover:bg-white hover:text-black px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-lg"
                onClick={() => navigate('/watch')}
              >
                Acheter
              </Button>
            </div>
          </div>
        </section>

        {/* Apple Watch Models Grid */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Which Apple Watch is right for you?</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Compare features, sizes, and prices to find the perfect Apple Watch for your lifestyle.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {watchModels.map((model, idx) => (
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
                      <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wide">Key Features</h4>
                      <ul className="space-y-1">
                        {model.features.slice(0, 2).map((feature, i) => (
                          <li key={i} className="text-sm text-gray-600">• {feature}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button 
                      className="w-full bg-black text-white hover:bg-gray-800"
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


        {/* Health & Fitness Section */}
        <section className="py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                Health & Fitness
              </h2>
              <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Track your health metrics, monitor your fitness goals, and stay connected to what matters most.
              </p>
            </div>

            <div className="flex justify-center">
              {/* Apple Watch Display */}
              <div className="relative">
                {/* Watch Case */}
                <div className="w-80 h-80 bg-gray-900 rounded-[60px] p-4 shadow-2xl">
                  {/* Watch Screen */}
                  <div className="w-full h-full bg-black rounded-[52px] overflow-hidden relative">
                    {/* Digital Crown */}
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gray-700 rounded-full border-2 border-gray-600"></div>
                    
                    {/* Watch Face Content */}
                    <div className="p-6 h-full flex flex-col justify-between text-white">
                      {/* Time */}
                      <div className="text-center">
                        <div className="text-3xl font-light">9:41</div>
                        <div className="text-xs text-gray-400 mt-1">Monday, Oct 28</div>
                      </div>

                      {/* Scrolling Health Info */}
                      <div className="flex-1 flex items-center justify-center">
                        <div className="text-center space-y-3 animate-pulse">
                          <div className="text-4xl mb-2">{healthInfo[currentInfoIndex].icon}</div>
                          <div className="text-lg font-semibold">{healthInfo[currentInfoIndex].title}</div>
                          <div className="text-2xl font-bold text-green-400">{healthInfo[currentInfoIndex].data}</div>
                          <div className="text-xs text-gray-300 max-w-48 leading-tight">
                            {healthInfo[currentInfoIndex].description}
                          </div>
                          <div className="text-xs text-green-400">{healthInfo[currentInfoIndex].status}</div>
                        </div>
                      </div>

                      {/* Bottom Status */}
                      <div className="text-center text-xs text-gray-400">
                        <div>Battery 87%</div>
                        <div className="mt-1 text-xs text-gray-500">
                          {currentInfoIndex + 1} of {healthInfo.length}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Watch Band */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-16 bg-gray-800 rounded-full"></div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-16 bg-gray-800 rounded-full"></div>
              </div>
            </div>

            {/* Feature Descriptions */}

          </div>
        </section>

        {/* Compare Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">Compare Apple Watch models</h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              See the differences between Apple Watch models and find the one that's right for you.
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

export default Watch