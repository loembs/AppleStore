import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SimpleCart } from '@/components/SimpleCart';
import { useCartWithAuth } from '@/hooks/useCartWithAuth';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { formatCurrency } from '@/utils/currency'
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const {
    localItems,
    items,
    itemCount,
    total,
    updateQuantity,
    removeFromCart,
    clearCart,
    loading,
    isAuthenticated
  } = useCartWithAuth();

  const displayItems = isAuthenticated ? items : localItems;
  const displayItemCount = displayItems.reduce((sum, item) => sum + item.quantity, 0);
  const displayTotal = displayItems.reduce((sum, item) => sum + item.total_price, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">

          {/* Header de la page + actions globales */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Button>
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-8 h-8 text-gray-600" />
              <h1 className="text-3xl font-bold text-gray-900">
                Panier ({displayItemCount})
              </h1>
            </div>
            {displayItemCount > 0 && (
              <Button variant="outline" size="sm" onClick={clearCart} className="text-red-600 hover:text-red-700 ml-auto">
                Vider le panier
              </Button>
            )}
          </div>

          {displayItemCount === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Votre panier est vide
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Découvrez nos produits et ajoutez vos favoris à votre panier pour commencer vos achats.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => navigate('/mac')} className="bg-blue-600 hover:bg-blue-700">
                  Voir les Mac
                </Button>
                <Button variant="outline" onClick={() => navigate('/iphone')}>Voir les iPhone</Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Liste des articles */}
              <div className="lg:col-span-2 space-y-4">
                {displayItems.map((item, index) => {
                  // Pour les utilisateurs authentifiés, utiliser item.id, sinon utiliser index
                  const itemId: number = isAuthenticated && 'id' in item && typeof (item as any).id === 'number' ? (item as any).id : index
                  const itemKey = isAuthenticated && 'id' in item && typeof (item as any).id === 'number' ? (item as any).id : index
                  
                  return (
                  <div key={itemKey} className="bg-white rounded-lg p-6 shadow-sm border flex flex-col sm:flex-row items-center gap-6">
                    {/* Image du produit */}
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      {item.product?.image ? (
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <ShoppingCart className="w-8 h-8" />
                        </div>
                      )}
                    </div>
                    {/* Détails */}
                    <div className="flex-1 min-w-0 self-stretch flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{item.product?.name || `Produit ${item.product_id}`}</h3>
                        <p className="text-gray-500 text-sm mb-2">{item.product?.tagline || 'Produit Apple'}</p>
                        <div className="flex gap-4 text-sm text-gray-500">
                          <p>Quantité :</p>
                          <div className="inline-flex border rounded overflow-hidden">
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              onClick={() => updateQuantity(itemId, Math.max(1, item.quantity - 1))} 
                              disabled={item.quantity <= 1 || loading}
                            >
                              −
                            </Button>
                            <span className="px-3 py-1 bg-gray-50 text-base">{item.quantity}</span>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              onClick={() => updateQuantity(itemId, item.quantity + 1)}
                              disabled={loading}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                        {item.color && <p className="text-xs text-gray-500 mt-1">Couleur: {item.color.name}</p>}
                        {item.storage && <p className="text-xs text-gray-500">Stockage: {item.storage.size}</p>}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeFromCart(itemId)} 
                        className="mt-2 text-red-600 hover:text-red-700 self-start"
                        disabled={loading}
                      >
                        Supprimer
                      </Button>
                    </div>
                    {/* Prix */}
                    <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">{formatCurrency(item.total_price)}</p>
                        <p className="text-sm text-gray-500">
                          {formatCurrency(item.unit_price)} × {item.quantity}
                        </p>
                    </div>
                  </div>
                  )
                })}
              </div>

              {/* Résumé de commande */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg p-6 shadow-sm border sticky top-24">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Résumé de la commande</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Sous-total</span>
                      <span className="font-medium">{formatCurrency(displayTotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Livraison</span>
                      <span className="font-medium text-green-600">Gratuite</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>{formatCurrency(displayTotal)}</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    type="button"
                    className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg" 
                    disabled={displayItemCount === 0 || loading}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (isAuthenticated) {
                        navigate('/checkout');
                      } else {
                        navigate('/login', { state: { returnUrl: '/checkout' } });
                      }
                    }}
                  >
                    Passer la commande
                  </Button>
                  <p className="text-xs text-gray-500 text-center mt-4">
                    Livraison gratuite sur toutes les commandes
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;

