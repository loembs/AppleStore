import React, { useState } from 'react';
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
import { ShoppingCart, CreditCard, Truck, Lock, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const Checkout = () => {
  const navigate = useNavigate();
  const { localItems, items, itemCount, total, isAuthenticated, clearCart, loading: cartLoading } = useCartWithAuth();
  
  const displayItems = isAuthenticated ? items : localItems;
  const displayItemCount = displayItems.reduce((sum, item) => sum + item.quantity, 0);
  const displayTotal = displayItems.reduce((sum, item) => sum + item.total_price, 0);
  
  // États du formulaire
  const [formData, setFormData] = useState({
    // Adresse de livraison
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    
    // Méthode de paiement
    paymentMethod: 'card',
    
    // Informations de carte (optionnel)
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });

  const [loading, setLoading] = useState(false);

  // Charger formulaire depuis localStorage
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem('checkout_form')
      if (stored) {
        const parsed = JSON.parse(stored)
        setFormData((prev) => ({ ...prev, ...parsed }))
      }
    } catch {}
  }, [])

  // Rediriger si panier vide
  React.useEffect(() => {
    if (displayItemCount === 0) {
      navigate('/cart');
    }
  }, [displayItemCount, navigate]);

  // Si non connecté, rediriger vers la page de connexion avec retour prévu
  // Attendre que le chargement soit terminé pour éviter les redirections prématurées
  React.useEffect(() => {
    if (!cartLoading && !isAuthenticated) {
      navigate('/login', { state: { returnUrl: '/checkout' } })
    }
  }, [cartLoading, isAuthenticated, navigate])

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    try {
      const next = { ...formData, [field]: value }
      localStorage.setItem('checkout_form', JSON.stringify(next))
    } catch {}
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validation basique
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.address || !formData.city) {
        toast.error('Veuillez remplir tous les champs obligatoires');
        setLoading(false);
        return;
      }

      // Simuler la création de commande
      await new Promise(resolve => setTimeout(resolve, 800));

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
      }
      try { localStorage.setItem('draft_order', JSON.stringify(draft)) } catch {}

      // Si utilisateur connecté, aller à la page paiement
      if (isAuthenticated) {
        navigate('/payment')
        return
      }

      // Si jamais non connecté (sécurité), renvoyer à login
      navigate('/login', { state: { returnUrl: '/checkout' } })
    } catch (error) {
      console.error('Erreur lors de la commande:', error);
      toast.error('Une erreur est survenue lors de la commande');
    } finally {
      setLoading(false);
    }
  };

  if (displayItemCount === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/cart')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au panier
            </Button>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <ShoppingCart className="w-4 h-4" />
              <span>Panier</span>
              <span>/</span>
              <span className="font-medium text-gray-900">Checkout</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulaire principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* Informations de livraison */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    Adresse de livraison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Prénom *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleChange('firstName', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Nom *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleChange('lastName', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Téléphone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Adresse *</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="city">Ville *</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleChange('city', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Code postal *</Label>
                        <Input
                          id="postalCode"
                          value={formData.postalCode}
                          onChange={(e) => handleChange('postalCode', e.target.value)}
                          required
                        />
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
                      <CardTitle className="flex items-center gap-2 mb-4">
                        <CreditCard className="w-5 h-5" />
                        Méthode de paiement
                      </CardTitle>
                      
                      <RadioGroup value={formData.paymentMethod} onValueChange={(value) => handleChange('paymentMethod', value)}>
                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="flex-1 cursor-pointer">
                            Carte bancaire
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                          <RadioGroupItem value="paypal" id="paypal" />
                          <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                            PayPal
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                          <RadioGroupItem value="apple" id="apple" />
                          <Label htmlFor="apple" className="flex-1 cursor-pointer">
                            Apple Pay
                          </Label>
                        </div>
                      </RadioGroup>

                      {formData.paymentMethod === 'card' && (
                        <div className="mt-4 space-y-4 p-4 border rounded-lg bg-gray-50">
                          <div>
                            <Label htmlFor="cardNumber">Numéro de carte</Label>
                            <Input
                              id="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              value={formData.cardNumber}
                              onChange={(e) => handleChange('cardNumber', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="cardHolder">Nom du titulaire</Label>
                            <Input
                              id="cardHolder"
                              value={formData.cardHolder}
                              onChange={(e) => handleChange('cardHolder', e.target.value)}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="expiryDate">Date d'expiration</Label>
                              <Input
                                id="expiryDate"
                                placeholder="MM/AA"
                                value={formData.expiryDate}
                                onChange={(e) => handleChange('expiryDate', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label htmlFor="cvv">CVV</Label>
                              <Input
                                id="cvv"
                                placeholder="123"
                                value={formData.cvv}
                                onChange={(e) => handleChange('cvv', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bouton de soumission */}
                    <Button
                      type="submit"
                      className="w-full h-12 text-lg mt-6"
                      disabled={loading || displayItemCount === 0}
                    >
                      {loading ? (
                        'Traitement en cours...'
                      ) : (
                        <>
                          <Lock className="w-5 h-5 mr-2" />
                          Confirmer la commande
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Résumé de commande */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Résumé de la commande</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Articles */}
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {displayItems.map((item, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          {item.product?.image ? (
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <ShoppingCart className="w-6 h-6" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm line-clamp-2">
                            {item.product?.name || `Produit ${item.product_id}`}
                          </p>
                          <p className="text-xs text-gray-500">
                            Qté: {item.quantity}
                          </p>
                          {item.color && (
                            <p className="text-xs text-gray-500">
                              Couleur: {item.color.name}
                            </p>
                          )}
                          {item.storage && (
                            <p className="text-xs text-gray-500">
                              Stockage: {item.storage.size}
                            </p>
                          )}
                          <p className="font-medium mt-1">
                            {item.total_price.toLocaleString('fr-FR', {
                              style: 'currency',
                              currency: 'EUR'
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Totaux */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Sous-total</span>
                      <span className="font-medium">
                        {displayTotal.toLocaleString('fr-FR', {
                          style: 'currency',
                          currency: 'EUR'
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Livraison</span>
                      <span className="font-medium text-green-600">Gratuite</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>
                        {displayTotal.toLocaleString('fr-FR', {
                          style: 'currency',
                          currency: 'EUR'
                        })}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 text-center">
                    Livraison gratuite sur toutes les commandes
                  </p>
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

