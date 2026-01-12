import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Package, ArrowLeft, Truck, CheckCircle, Clock, XCircle, Eye } from 'lucide-react';
import { useAuth } from '@/hooks/useSupabase';
import { ordersService } from '@/services/orders.service';
import { formatCurrency } from '@/utils/currency';
import { toast } from 'sonner';

interface OrderItem {
  id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  total_price: number;
  product?: {
    id: number;
    name: string;
    image_url?: string;
    price: number;
  };
}

interface Order {
  id: number;
  orderDate: string;
  totalAmount: number;
  status: string;
  items: OrderItem[];
  orderNumber?: string;
}

const Orders = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login', { state: { returnUrl: '/orders' } });
      return;
    }

    if (user) {
      loadOrders();
    }
  }, [user, authLoading, navigate]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await ordersService.getMyOrders();
      setOrders(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des commandes:', error);
      toast.error('Erreur lors du chargement des commandes');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'confirmed' || statusLower === 'paid') {
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          <CheckCircle className="w-3 h-3 mr-1" />
          Confirmée
        </Badge>
      );
    }
    if (statusLower === 'pending') {
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          <Clock className="w-3 h-3 mr-1" />
          En attente
        </Badge>
      );
    }
    if (statusLower === 'shipped' || statusLower === 'delivered') {
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          <Truck className="w-3 h-3 mr-1" />
          {statusLower === 'shipped' ? 'Expédiée' : 'Livrée'}
        </Badge>
      );
    }
    if (statusLower === 'cancelled') {
      return (
        <Badge variant="destructive">
          <XCircle className="w-3 h-3 mr-1" />
          Annulée
        </Badge>
      );
    }
    return <Badge>{status}</Badge>;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                <p className="text-gray-600">Chargement de vos commandes...</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Button>
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-gray-600" />
              <h1 className="text-3xl font-bold text-gray-900">
                Mes commandes
              </h1>
            </div>
          </div>

          {orders.length === 0 ? (
            <Card>
              <CardContent className="pt-12 pb-12 text-center">
                <Package className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Aucune commande
                </h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Vous n'avez pas encore passé de commande. Découvrez nos produits et commencez vos achats.
                </p>
                <Button
                  onClick={() => navigate('/store')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Découvrir nos produits
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardHeader className="bg-gray-50 border-b">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <CardTitle className="text-lg">
                          Commande {order.orderNumber || `#${order.id}`}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          Passée le {formatDate(order.orderDate)}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        {getStatusBadge(order.status)}
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Total</p>
                          <p className="text-xl font-bold text-gray-900">
                            {formatCurrency(order.totalAmount)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {/* Articles de la commande */}
                      <div className="space-y-3">
                        {order.items?.slice(0, 3).map((item, index) => (
                          <div key={item.id || index} className="flex gap-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                              {item.product?.image_url ? (
                                <img
                                  src={item.product.image_url}
                                  alt={item.product.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                  <Package className="w-6 h-6" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900">
                                {item.product?.name || `Produit #${item.product_id}`}
                              </p>
                              <p className="text-sm text-gray-500">
                                Quantité: {item.quantity}
                              </p>
                              <p className="font-medium text-gray-900 mt-1">
                                {formatCurrency(item.total_price)}
                              </p>
                            </div>
                          </div>
                        ))}
                        {order.items && order.items.length > 3 && (
                          <p className="text-sm text-gray-500 text-center pt-2">
                            + {order.items.length - 3} autre(s) article(s)
                          </p>
                        )}
                      </div>

                      <Separator />

                      {/* Actions */}
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => {
                            // TODO: Navigate to order detail page
                            toast.info('Page de détail à venir');
                          }}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Voir les détails
                        </Button>
                        {(order.status === 'PENDING' || order.status === 'pending') && (
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => navigate('/checkout')}
                          >
                            Finaliser le paiement
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Orders;
