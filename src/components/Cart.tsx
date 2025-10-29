import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Trash2, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

interface CartItem {
  product: string;
  price: number;
  category: string;
  id: string;
  color?: string;
  storage?: string;
  memory?: string;
  connectivity?: string;
  variant?: string;
  band?: string;
  case?: string;
}

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('istar-cart') || '[]');
    setCart(savedCart);
    
    // Initialiser les quantités
    const initialQuantities: Record<string, number> = {};
    savedCart.forEach((item: CartItem) => {
      const key = `${item.id}-${item.color || ''}-${item.storage || ''}`;
      initialQuantities[key] = (initialQuantities[key] || 0) + 1;
    });
    setQuantities(initialQuantities);
  }, []);

  const updateQuantity = (item: CartItem, change: number) => {
    const key = `${item.id}-${item.color || ''}-${item.storage || ''}`;
    const newQuantity = Math.max(0, (quantities[key] || 1) + change);
    
    if (newQuantity === 0) {
      removeItem(item);
    } else {
      setQuantities(prev => ({ ...prev, [key]: newQuantity }));
    }
  };

  const removeItem = (item: CartItem) => {
    const key = `${item.id}-${item.color || ''}-${item.storage || ''}`;
    const newCart = cart.filter(cartItem => 
      !(cartItem.id === item.id && 
        cartItem.color === item.color && 
        cartItem.storage === item.storage)
    );
    
    setCart(newCart);
    localStorage.setItem('istar-cart', JSON.stringify(newCart));
    
    const newQuantities = { ...quantities };
    delete newQuantities[key];
    setQuantities(newQuantities);
    
    window.dispatchEvent(new Event('cart-updated'));
    toast.success('Produit retiré du panier');
  };

  const clearCart = () => {
    setCart([]);
    setQuantities({});
    localStorage.setItem('istar-cart', '[]');
    window.dispatchEvent(new Event('cart-updated'));
    toast.success('Panier vidé');
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const key = `${item.id}-${item.color || ''}-${item.storage || ''}`;
      return total + (item.price * (quantities[key] || 1));
    }, 0);
  };

  const getTotalItems = () => {
    return Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  };

  const groupedCart = cart.reduce((groups: Record<string, CartItem[]>, item) => {
    const key = `${item.id}-${item.color || ''}-${item.storage || ''}`;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {});

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-24">
          <div className="text-center space-y-6">
            <div className="text-8xl">🛒</div>
            <h1 className="text-4xl font-bold">Votre panier est vide</h1>
            <p className="text-xl text-muted-foreground max-w-md mx-auto">
              Découvrez nos produits Apple et ajoutez-les à votre panier pour commencer vos achats.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/store')}>
                <ShoppingBag className="w-5 h-5 mr-2" />
                Découvrir nos produits
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/')}>
                Retour à l'accueil
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Articles du panier */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Panier ({getTotalItems()} article{getTotalItems() > 1 ? 's' : ''})</h1>
              <Button variant="outline" size="sm" onClick={clearCart}>
                <Trash2 className="w-4 h-4 mr-2" />
                Vider le panier
              </Button>
            </div>

            <div className="space-y-4">
              {Object.entries(groupedCart).map(([key, items]) => {
                const item = items[0];
                const quantity = quantities[key] || 1;
                const totalPrice = item.price * quantity;

                return (
                  <Card key={key} className="p-6">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 bg-muted/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">📱</span>
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">{item.product}</h3>
                            <div className="flex gap-2 mt-1">
                              {item.color && (
                                <Badge variant="outline" className="text-xs">
                                  {item.color}
                                </Badge>
                              )}
                              {item.storage && (
                                <Badge variant="outline" className="text-xs">
                                  {item.storage}
                                </Badge>
                              )}
                              {item.memory && (
                                <Badge variant="outline" className="text-xs">
                                  {item.memory}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item, -1)}
                              disabled={quantity <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-8 text-center">{quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item, 1)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-lg font-bold">{totalPrice} €</p>
                            <p className="text-sm text-muted-foreground">
                              {item.price} € × {quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Résumé de commande */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Résumé de commande</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Sous-total ({getTotalItems()} article{getTotalItems() > 1 ? 's' : ''})</span>
                  <span>{getTotalPrice()} €</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{getTotalPrice()} €</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full" size="lg">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Finaliser la commande
                </Button>
                <Button variant="outline" className="w-full" onClick={() => navigate('/store')}>
                  Continuer mes achats
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t space-y-2 text-sm text-muted-foreground">
                <p>✓ Livraison gratuite dès 50€</p>
                <p>✓ Garantie Apple incluse</p>
                <p>✓ Retour sous 14 jours</p>
                <p>✓ Support client iStar</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
