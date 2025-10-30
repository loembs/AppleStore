import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Package, Mail } from 'lucide-react';

const OrderConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 pb-16">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <Card className="text-center">
            <CardContent className="pt-12 pb-12">
              <div className="flex justify-center mb-6">
                <CheckCircle className="w-24 h-24 text-green-500" />
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Commande confirmée !
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Merci pour votre achat. Votre commande a été enregistrée avec succès.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h2 className="font-semibold text-gray-900 mb-2">
                  Numéro de commande: {Date.now().toString().slice(-8)}
                </h2>
                <p className="text-sm text-gray-600">
                  Vous recevrez un email de confirmation avec tous les détails
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-center gap-3 text-gray-700">
                  <Package className="w-5 h-5" />
                  <span>Votre commande sera expédiée sous 24h</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-gray-700">
                  <Mail className="w-5 h-5" />
                  <span>Email de confirmation envoyé</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate('/')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Retour à l'accueil
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/store')}
                >
                  Continuer vos achats
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;

