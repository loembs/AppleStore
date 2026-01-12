import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, User, LogOut, Package } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartWithAuth } from '@/hooks/useCartWithAuth';
import { useAuth } from '@/hooks/useSupabase';
import { useProductSearch } from '@/hooks/useSupabase';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  
  // Utiliser le hook de panier pour obtenir le compteur
  const { itemCount } = useCartWithAuth();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Store', path: '/store' },
    { 
      name: 'Mac', 
      path: '/mac',
      dropdown: {
        left: {
          title: 'Univers Mac',
          items: [
            { name: 'Découvrir tous les Mac', path: '/mac', highlight: true },
            { name: 'MacBook Air', path: '/mac' },
            { name: 'MacBook Pro', path: '/mac' },
            { name: 'iMac', path: '/mac' },
            { name: 'Mac mini', path: '/mac' },
            { name: 'Mac Studio', path: '/mac' },
            { name: 'Mac Pro', path: '/mac' },
            { name: 'Écrans', path: '/mac' }
          ]
        },
        right: {
          title: 'Autour du Mac',
          items: [
            { name: 'Accessoires Mac', path: '/accessories' }
          ]
        }
      }
    },
    { 
      name: 'iPad', 
      path: '/ipad',
      dropdown: {
        left: {
          title: 'Univers iPad',
          items: [
            { name: 'Découvrir tous les iPad', path: '/ipad', highlight: true },
            { name: 'iPad Pro', path: '/ipad' },
            { name: 'iPad Air', path: '/ipad' },
            { name: 'iPad', path: '/ipad' },
            { name: 'iPad mini', path: '/ipad' },
            { name: 'Apple Pencil', path: '/ipad' },
            { name: 'Claviers', path: '/ipad' }
          ]
        },
        right: {
          title: 'Autour de l\'iPad',
          items: [
            { name: 'Accessoires iPad', path: '/accessories' }
          ]
        }
      }
    },
    { 
      name: 'iPhone', 
      path: '/iphone',
      dropdown: {
        left: {
          title: 'Univers iPhone',
          items: [
            { name: 'Découvrir tous les iPhone', path: '/iphone', highlight: true },
            { name: 'iPhone 17 Pro', path: '/iphone' },
            { name: 'iPhone 17', path: '/iphone' },
            { name: 'iPhone 16', path: '/iphone' },
            { name: 'iPhone 15', path: '/iphone' },
            { name: 'iPhone SE', path: '/iphone' },
            { name: 'Accessoires iPhone', path: '/accessories' }
          ]
        },
        right: {
          title: 'Autour de l\'iPhone',
          items: [
            { name: 'Accessoires iPhone', path: '/accessories' }
          ]
        }
      }
    },
    { name: 'Watch', path: '/watch' },
    { name: 'AirPods', path: '/airpods' },
    { name: 'TV & Home', path: '/tv-home' },
    { name: 'Accessories', path: '/accessories' }
  ];

  // Déterminer si la page doit avoir un header noir
  const isBlackHeaderPage = () => {
    const currentPath = window.location.pathname;
    return currentPath === '/watch' || currentPath === '/' || currentPath === '/tv-home';
  };

  // Recherche
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { products: searchResults } = useProductSearch(searchQuery)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isBlackHeaderPage() 
          ? (scrolled ? 'bg-black/80 backdrop-blur-xl' : 'bg-black/60 backdrop-blur-xl')
          : (scrolled ? 'bg-white/95 backdrop-blur-xl shadow-sm' : 'bg-white/90 backdrop-blur-xl')
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 relative">
        <div className="flex items-center justify-between h-11">
          {/* Logo iStar + Apple Authorized Reseller */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center hover:opacity-70 transition-opacity">
              <span className={`text-2xl font-bold ${isBlackHeaderPage() ? 'text-white' : 'text-black'}`}>iStar</span>
            </Link>
            <div className={`h-6 w-px ${isBlackHeaderPage() ? 'bg-white/30' : 'bg-gray-300'}`}></div>
            <div className="flex items-center gap-2">
              <svg className={`w-5 h-5 ${isBlackHeaderPage() ? 'text-white' : 'text-gray-600'}`} viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span className={`text-[10px] md:text-xs font-medium ${isBlackHeaderPage() ? 'text-white/80' : 'text-gray-600'}`}>Revendeur agréé</span>
            </div>
          </div>

          {/* Desktop Navigation - Apple style */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div
                key={item.name}
                onMouseEnter={() => {
                  if (dropdownTimeout) {
                    clearTimeout(dropdownTimeout);
                    setDropdownTimeout(null);
                  }
                  if (item.dropdown) {
                    setActiveDropdown(item.name);
                  }
                }}
                onMouseLeave={() => {
                  const timeout = setTimeout(() => {
                    setActiveDropdown(null);
                  }, 150);
                  setDropdownTimeout(timeout);
                }}
              >
                <Link
                  to={item.path}
                  className={`text-sm transition-colors duration-200 ${
                    isBlackHeaderPage() 
                      ? 'text-white hover:text-gray-300' 
                      : 'text-black hover:text-gray-600'
                  }`}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Barre de recherche */}
            <div className="relative">
              <div className={`flex items-center rounded-md ${isBlackHeaderPage() ? 'bg-white/10' : 'bg-black/5'} px-2`}> 
                <Search className={`h-4 w-4 mr-1 ${isBlackHeaderPage() ? 'text-white' : 'text-black'}`} />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher"
                  className={`outline-none bg-transparent text-sm py-1 ${isBlackHeaderPage() ? 'text-white placeholder:text-white/60' : 'text-black placeholder:text-gray-500'}`}
                />
              </div>
              {searchOpen || searchQuery ? (
                <div className={`absolute mt-2 w-72 max-h-72 overflow-auto rounded-md shadow-lg ${isBlackHeaderPage() ? 'bg-black text-white' : 'bg-white text-black'} border ${isBlackHeaderPage() ? 'border-gray-700' : 'border-gray-200'}`}>
                  {searchResults.slice(0, 8).map(p => (
                    <button key={p.id} onClick={() => navigate(`/${p.categoryid === 1 ? 'mac' : p.categoryid === 2 ? 'iphone' : 'store'}/${p.id}`)} className={`w-full text-left px-3 py-2 hover:${isBlackHeaderPage() ? 'bg-white/10' : 'bg-black/5'}`}>
                      {p.name}
                    </button>
                  ))}
                  {searchResults.length === 0 && (
                    <div className="px-3 py-2 text-sm opacity-70">Aucun résultat</div>
                  )}
                </div>
              ) : null}
            </div>
            {/* User menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className={`h-8 w-8 ${isBlackHeaderPage() ? 'text-white hover:text-gray-300 hover:bg-white/10' : 'text-black hover:text-gray-600 hover:bg-black/10'}`}
                    aria-label="User menu"
                  >
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate('/profile')}>Profil</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/orders')}>
                    <Package className="h-4 w-4 mr-2" /> Mes commandes
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()} className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" /> Se déconnecter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="ghost" 
                size="icon"
                className={`h-8 w-8 ${isBlackHeaderPage() ? 'text-white hover:text-gray-300 hover:bg-white/10' : 'text-black hover:text-gray-600 hover:bg-black/10'}`}
                aria-label="Login"
                onClick={() => navigate('/login', { state: { returnUrl: '/checkout' } })}
              >
                <User className="h-4 w-4" />
              </Button>
            )}
            {/* Commandes - visible seulement si connecté */}
            {user && (
              <Button 
                variant="ghost" 
                size="icon" 
                className={`h-8 w-8 ${isBlackHeaderPage() ? 'text-white hover:text-gray-300 hover:bg-white/10' : 'text-black hover:text-gray-600 hover:bg-black/10'}`}
                aria-label="Mes commandes"
                onClick={() => navigate('/orders')}
              >
                <Package className="h-4 w-4" />
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              className={`h-8 w-8 ${isBlackHeaderPage() ? 'text-white hover:text-gray-300 hover:bg-white/10' : 'text-black hover:text-gray-600 hover:bg-black/10'} relative`}
              aria-label="Shopping bag"
              onClick={() => navigate('/cart')}
            >
              <ShoppingBag className="h-4 w-4" />
              {itemCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs"
                >
                  {itemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
        
        {/* Dropdown Menu - Positioned relative to nav container */}
        {activeDropdown && menuItems.find(item => item.name === activeDropdown)?.dropdown && (
          <div 
            className={`absolute top-full left-0 right-0 py-8 z-50 ${
              isBlackHeaderPage() 
                ? 'bg-black/95 backdrop-blur-xl border-t border-gray-700' 
                : 'bg-white border-t border-gray-200'
            }`}
            onMouseEnter={() => {
              if (dropdownTimeout) {
                clearTimeout(dropdownTimeout);
                setDropdownTimeout(null);
              }
            }}
            onMouseLeave={() => {
              const timeout = setTimeout(() => {
                setActiveDropdown(null);
              }, 150);
              setDropdownTimeout(timeout);
            }}
          >
            <div className="px-6">
              <div className="flex">
                {/* Left Column */}
                <div className="flex-1 pr-8">
                  <h3 className={`text-xs font-medium uppercase tracking-wide mb-4 ${
                    isBlackHeaderPage() ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {menuItems.find(item => item.name === activeDropdown)?.dropdown?.left.title}
                  </h3>
                  <ul className="space-y-2">
                    {menuItems.find(item => item.name === activeDropdown)?.dropdown?.left.items.map((dropdownItem, idx) => (
                      <li key={idx}>
                        <Link
                          to={dropdownItem.path}
                          className={`block text-sm transition-colors ${
                            isBlackHeaderPage()
                              ? `hover:text-blue-400 ${dropdownItem.highlight ? 'font-semibold text-white' : 'text-gray-300'}`
                              : `hover:text-blue-600 ${dropdownItem.highlight ? 'font-semibold text-gray-900' : 'text-gray-700'}`
                          }`}
                        >
                          {dropdownItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Right Column */}
                <div className={`flex-1 pl-8 ${isBlackHeaderPage() ? 'border-l border-gray-700' : 'border-l border-gray-200'}`}>
                  <h3 className={`text-xs font-medium uppercase tracking-wide mb-4 ${
                    isBlackHeaderPage() ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {menuItems.find(item => item.name === activeDropdown)?.dropdown?.right.title}
                  </h3>
                  <ul className="space-y-2">
                    {menuItems.find(item => item.name === activeDropdown)?.dropdown?.right.items.map((dropdownItem, idx) => (
                      <li key={idx}>
                        <Link
                          to={dropdownItem.path}
                          className={`block text-sm transition-colors ${
                            isBlackHeaderPage()
                              ? 'text-gray-300 hover:text-blue-400'
                              : 'text-gray-700 hover:text-blue-600'
                          }`}
                        >
                          {dropdownItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Right Icons */}
        <div className="lg:hidden absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {/* Profil */}
          {user ? (
            <Button variant="ghost" size="icon" className={`h-8 w-8 ${isBlackHeaderPage() ? 'text-white hover:text-gray-300 hover:bg-white/10' : 'text-black hover:text-gray-600 hover:bg-black/10'}`} onClick={() => navigate('/profile')} aria-label="Profil">
              <User className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="ghost" size="icon" className={`h-8 w-8 ${isBlackHeaderPage() ? 'text-white hover:text-gray-300 hover:bg-white/10' : 'text-black hover:text-gray-600 hover:bg-black/10'}`} onClick={() => navigate('/login', { state: { returnUrl: '/checkout' } })} aria-label="Login">
              <User className="h-4 w-4" />
            </Button>
          )}
          {/* Panier */}
          <Button variant="ghost" size="icon" className={`h-8 w-8 ${isBlackHeaderPage() ? 'text-white hover:text-gray-300 hover:bg-white/10' : 'text-black hover:text-gray-600 hover:bg-black/10'} relative`} onClick={() => navigate('/cart')} aria-label="Panier">
            <ShoppingBag className="h-4 w-4" />
            {itemCount > 0 && (
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs">{itemCount}</Badge>
            )}
          </Button>
          {/* Menu */}
          <Button variant="ghost" size="icon" className={`h-8 w-8 ${isBlackHeaderPage() ? 'text-white hover:text-gray-300 hover:bg-white/10' : 'text-black hover:text-gray-600 hover:bg-black/10'}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
            {mobileMenuOpen ? <X className={`h-5 w-5 ${isBlackHeaderPage() ? 'text-white' : 'text-black'}`} /> : <Menu className={`h-5 w-5 ${isBlackHeaderPage() ? 'text-white' : 'text-black'}`} />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`lg:hidden pb-4 backdrop-blur-xl ${isBlackHeaderPage() ? 'bg-black/95' : 'bg-white/95'}`}>
            <div className="space-y-1 pt-4">
              {menuItems.map((item, idx) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block py-3 text-sm transition-colors duration-200 ${
                    isBlackHeaderPage() 
                      ? 'text-white hover:text-gray-300' 
                      : 'text-black hover:text-gray-600'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className={`pt-4 border-t flex gap-2 mt-4 ${isBlackHeaderPage() ? 'border-white/20' : 'border-gray-200'}`}>
              <Button variant="ghost" size="sm" className={`flex-1 ${isBlackHeaderPage() ? 'text-white hover:text-gray-300 hover:bg-white/10' : 'text-black hover:text-gray-600 hover:bg-black/10'}`}>
                <Search className="h-4 w-4 mr-2" />
                Rechercher
              </Button>
              {user ? (
                <>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={`flex-1 ${isBlackHeaderPage() ? 'text-white hover:text-gray-300 hover:bg-white/10' : 'text-black hover:text-gray-600 hover:bg-black/10'}`}
                    onClick={() => {
                      navigate('/profile');
                      setMobileMenuOpen(false);
                    }}
                  >
                    <User className="h-4 w-4 mr-2" /> Profil
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={`flex-1 ${isBlackHeaderPage() ? 'text-white hover:text-gray-300 hover:bg-white/10' : 'text-black hover:text-gray-600 hover:bg-black/10'}`}
                    onClick={() => {
                      navigate('/orders');
                      setMobileMenuOpen(false);
                    }}
                  >
                    <Package className="h-4 w-4 mr-2" /> Mes commandes
                  </Button>
                </>
              ) : (
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={`flex-1 ${isBlackHeaderPage() ? 'text-white hover:text-gray-300 hover:bg-white/10' : 'text-black hover:text-gray-600 hover:bg-black/10'}`}
                  onClick={() => navigate('/login', { state: { returnUrl: '/checkout' } })}
                >
                  <User className="h-4 w-4 mr-2" /> Se connecter
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                className={`flex-1 relative ${isBlackHeaderPage() ? 'text-white hover:text-gray-300 hover:bg-white/10' : 'text-black hover:text-gray-600 hover:bg-black/10'}`}
                onClick={() => {
                  navigate('/cart');
                  setMobileMenuOpen(false);
                }}
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Panier
                {itemCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="ml-2 h-4 w-4 p-0 flex items-center justify-center text-xs"
                  >
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
