import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCartWithAuth } from '@/hooks/useCartWithAuth';
import { useAuth } from '@/hooks/useSupabase';
import { ShoppingCart, CreditCard, Truck, Lock, ArrowLeft, Package, Mail, Phone, MapPin, User, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { formatCurrency } from '@/utils/currency';

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { localItems, items, itemCount, total, isAuthenticated, loading: cartLoading } = useCartWithAuth();
  
  const displayItems = isAuthenticated ? items : localItems;
  const displayItemCount = displayItems.reduce((sum, item) => sum + item.quantity, 0);
  const displayTotal = displayItems.reduce((sum, item) => sum + item.total_price, 0);

  // États du formulaire
  const [formData, setFormData] = useState({
    // Adresse de livraison
    firstName: user?.user_metadata?.first_name || '',
    lastName: user?.user_metadata?.last_name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    
    // Méthode de paiement
    paymentMethod: 'card',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Charger formulaire depuis localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('checkout_form');
      if (stored) {
        const parsed = JSON.parse(stored);
        setFormData((prev) => ({ ...prev, ...parsed }));
      }
    } catch {}
    
    // Pré-remplir avec les données utilisateur si disponibles
    if (user?.email && !formData.email) {
      setFormData((prev) => ({ ...prev, email: user.email }));
    }
  }, [user]);

  // Rediriger si panier vide
  useEffect(() => {
    if (!cartLoading && displayItemCount === 0) {
      navigate('/cart');
    }
  }, [displayItemCount, cartLoading, navigate]);

  // Si non connecté, rediriger vers la page de connexion
  useEffect(() => {
    if (!cartLoading && !isAuthenticated) {
      navigate('/login', { state: { returnUrl: '/checkout' } });
    }
  }, [cartLoading, isAuthenticated, navigate]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Effacer l'erreur du champ modifié
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
    // Sauvegarder dans localStorage
    try {
      const next = { ...formData, [field]: value };
      localStorage.setItem('checkout_form', JSON.stringify(next));
    } catch {}
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    } else if (!/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formData.phone)) {
      newErrors.phone = 'Numéro de téléphone invalide';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'L\'adresse est requise';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'La ville est requise';
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Le code postal est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Veuillez corriger les erreurs dans le formulaire');
      return;
    }

    setLoading(true);

    try {
      // Créer un brouillon de commande pour la page de paiement
      const draft = {
        items: displayItems,
        total: displayTotal,
        itemCount: displayItemCount,
        shipping: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        paymentMethod: formData.paymentMethod,
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem('draft_order', JSON.stringify(draft));

      // Aller à la page paiement
      navigate('/payment');
    } catch (error) {
      console.error('Erreur lors de la commande:', error);
      toast.error('Une erreur est survenue lors de la commande');
    } finally {
      setLoading(false);
    }
  };

  if (cartLoading || displayItemCount === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                <p className="text-gray-600">Chargement...</p>
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
          {/* Header avec breadcrumb */}
          <div className="mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/cart')}
              className="mb-4 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au panier
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Finaliser votre commande</h1>
            <p className="text-gray-600 mt-2">Vérifiez vos informations avant de procéder au paiement</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulaire principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* Informations de livraison */}
              <Card>
                <CardHeader className="border-b">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Truck className="w-5 h-5 text-blue-600" />
                    Adresse de livraison
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Prénom *
                        </Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleChange('firstName', e.target.value)}
                          className={errors.firstName ? 'border-red-500' : ''}
                          required
                        />
                        {errors.firstName && (
                          <p className="text-sm text-red-600 mt-1">{errors.firstName}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="lastName">Nom *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleChange('lastName', e.target.value)}
                          className={errors.lastName ? 'border-red-500' : ''}
                          required
                        />
                        {errors.lastName && (
                          <p className="text-sm text-red-600 mt-1">{errors.lastName}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className={errors.email ? 'border-red-500' : ''}
                        required
                      />
                      {errors.email && (
                        <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Téléphone *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className={errors.phone ? 'border-red-500' : ''}
                        placeholder="+33 6 12 34 56 78"
                        required
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="address" className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Adresse *
                      </Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        className={errors.address ? 'border-red-500' : ''}
                        placeholder="Numéro et nom de rue"
                        required
                      />
                      {errors.address && (
                        <p className="text-sm text-red-600 mt-1">{errors.address}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="city">Ville *</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleChange('city', e.target.value)}
                          className={errors.city ? 'border-red-500' : ''}
                          required
                        />
                        {errors.city && (
                          <p className="text-sm text-red-600 mt-1">{errors.city}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Code postal *</Label>
                        <Input
                          id="postalCode"
                          value={formData.postalCode}
                          onChange={(e) => handleChange('postalCode', e.target.value)}
                          className={errors.postalCode ? 'border-red-500' : ''}
                          required
                        />
                        {errors.postalCode && (
                          <p className="text-sm text-red-600 mt-1">{errors.postalCode}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="country">Pays *</Label>
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={(e) => handleChange('country', e.target.value)}
                        required
                      />
                    </div>

                    {/* Méthode de paiement */}
                    <Separator className="my-6" />
                    <div>
                      <CardTitle className="flex items-center gap-2 mb-4 text-lg">
                        <CreditCard className="w-5 h-5 text-blue-600" />
                        Méthode de paiement
                      </CardTitle>
                      
                      <RadioGroup 
                        value={formData.paymentMethod} 
                        onValueChange={(value) => handleChange('paymentMethod', value)}
                      >
                        <div className="flex items-center space-x-2 p-4 border rounded-lg hover:border-blue-500 transition-colors">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="flex-1 cursor-pointer font-medium">
                            Carte bancaire
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-4 border rounded-lg hover:border-blue-500 transition-colors">
                          <RadioGroupItem value="paypal" id="paypal" />
                          <Label htmlFor="paypal" className="flex-1 cursor-pointer font-medium">
                            PayPal
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-4 border rounded-lg hover:border-blue-500 transition-colors">
                          <RadioGroupItem value="apple" id="apple" />
                          <Label htmlFor="apple" className="flex-1 cursor-pointer font-medium">
                            Apple Pay
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Bouton de soumission */}
                    <Button
                      type="submit"
                      className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 mt-6"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Traitement...
                        </>
                      ) : (
                        <>
                          <Lock className="w-5 h-5 mr-2" />
                          Continuer vers le paiement
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Résumé de commande (sticky) */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader className="border-b bg-gray-50">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Package className="w-5 h-5 text-blue-600" />
                    Récapitulatif de la commande
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {/* Articles */}
                  <div className="space-y-4 max-h-96 overflow-y-auto mb-6">
                    {displayItems.map((item, index) => (
                      <div key={index} className="flex gap-3 pb-4 border-b last:border-0">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          {item.product?.image || item.product?.image_url ? (
                            <img
                              src={item.product.image || item.product.image_url}
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
                          <p className="font-medium text-sm line-clamp-2 text-gray-900">
                            {item.product?.name || `Produit ${item.product_id}`}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Quantité: {item.quantity}
                          </p>
                          {item.color && (
                            <p className="text-xs text-gray-500">Couleur: {item.color.name}</p>
                          )}
                          {item.storage && (
                            <p className="text-xs text-gray-500">Stockage: {item.storage.size}</p>
                          )}
                          <p className="font-semibold text-gray-900 mt-2">
                            {formatCurrency(item.total_price)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  {/* Totaux */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Sous-total</span>
                      <span className="font-medium text-gray-900">
                        {formatCurrency(displayTotal)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Livraison</span>
                      <span className="font-medium text-green-600">Gratuite</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-blue-600">
                        {formatCurrency(displayTotal)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-blue-900">
                        <p className="font-medium">Livraison gratuite</p>
                        <p className="text-blue-700">Sur toutes les commandes</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
