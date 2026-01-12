import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCartWithAuth } from '@/hooks/useCartWithAuth'
import { useAuth } from '@/hooks/useSupabase'
import { ordersService } from '@/services/orders.service'
import { formatCurrency } from '@/utils/currency'
import { toast } from 'sonner'
import { CreditCard, Lock, CheckCircle, ArrowLeft } from 'lucide-react'

const Payment = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { items, localItems, isAuthenticated, clearCart } = useCartWithAuth()
  const [loading, setLoading] = useState(false)

  // Charger brouillon de commande depuis localStorage
  const [draft, setDraft] = useState<any>(null)

  useEffect(() => {
    if (!isAuthenticated && !user) {
      navigate('/login', { state: { returnUrl: '/payment' } })
      return
    }

    try {
      const stored = localStorage.getItem('draft_order')
      const parsed = stored ? JSON.parse(stored) : null
      if (!parsed) {
        navigate('/checkout')
        return
      }
      setDraft(parsed)
    } catch {
      navigate('/checkout')
    }
  }, [isAuthenticated, user, navigate])

  const displayItems = draft?.items || (isAuthenticated ? items : localItems)
  const displayTotal = draft?.total || displayItems.reduce((sum: number, item: any) => sum + item.total_price, 0)

  const handlePay = async () => {
    if (!draft || !draft.shipping) {
      toast.error('Informations de commande manquantes')
      navigate('/checkout')
      return
    }

    setLoading(true)
    try {
      // 1. Créer la commande avec statut PENDING (non validée)
      const orderItems = displayItems.map((item: any) => ({
        product_id: typeof item.product_id === 'string' ? parseInt(item.product_id) : item.product_id,
        quantity: item.quantity,
        unit_price: item.unit_price || item.total_price / item.quantity
      }))

      const shippingAddress = {
        first_name: draft.shipping.firstName,
        last_name: draft.shipping.lastName,
        street: draft.shipping.address,
        city: draft.shipping.city,
        postal_code: draft.shipping.postalCode || '',
        country: draft.shipping.country || 'France',
        phone: draft.shipping.phone || ''
      }

      // Créer la commande dans la base de données avec status PENDING
      const order = await ordersService.createOrder({
        items: orderItems,
        total_amount: displayTotal,
        payment_method: 'PAYTECH',
        shipping_address: shippingAddress,
        notes: '',
        clear_cart: false // On videra le panier après paiement réussi
      })

      // 2. Initier le paiement PayTech
      const idTransaction = `ORDER_${order.id}`
      
      // Appeler l'endpoint PayTech pour obtenir l'URL de redirection
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/payments/requestPayment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify({ idTransaction })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Erreur lors de la demande de paiement PayTech')
      }

      const payTechResponse = await response.json()
      
      // La réponse PayTech contient une URL de redirection
      // Selon la documentation PayTech, la réponse JSON contient "redirect_url" ou "token"
      if (payTechResponse.redirect_url) {
        // Rediriger vers la page de paiement PayTech
        window.location.href = payTechResponse.redirect_url
        return
      } else if (payTechResponse.token) {
        // Si PayTech retourne un token, construire l'URL de redirection
        window.location.href = `https://paytech.sn/checkout/${payTechResponse.token}`
        return
      } else {
        // Si la réponse est une chaîne JSON, essayer de la parser
        let parsedResponse
        try {
          parsedResponse = typeof payTechResponse === 'string' ? JSON.parse(payTechResponse) : payTechResponse
          if (parsedResponse.redirect_url) {
            window.location.href = parsedResponse.redirect_url
            return
          } else if (parsedResponse.token) {
            window.location.href = `https://paytech.sn/checkout/${parsedResponse.token}`
            return
          }
        } catch (e) {
          // Ignorer l'erreur de parsing
        }
        throw new Error('URL de redirection PayTech non reçue dans la réponse')
      }
    } catch (error: any) {
      console.error('Erreur lors du paiement:', error)
      toast.error('Erreur lors du paiement', {
        description: error?.message || 'Une erreur est survenue'
      })
    } finally {
      setLoading(false)
    }
  }

  if (!draft) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 pb-16">
        <div className="max-w-3xl mx-auto px-6 py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/checkout')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Button>
          </div>

          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Lock className="w-6 h-6" />
                Paiement sécurisé
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Résumé de la commande */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-gray-900">Résumé de la commande</h3>
                <div className="space-y-2">
                  {displayItems.slice(0, 3).map((item: any, index: number) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.product?.name || `Produit ${item.product_id}`} × {item.quantity}
                      </span>
                      <span className="font-medium">
                        {formatCurrency(item.total_price)}
                      </span>
                    </div>
                  ))}
                  {displayItems.length > 3 && (
                    <div className="text-xs text-gray-500 text-center pt-2">
                      + {displayItems.length - 3} autre(s) article(s)
                    </div>
                  )}
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total à payer</span>
                    <span className="text-blue-600">{formatCurrency(displayTotal)}</span>
                  </div>
                </div>
              </div>

              {/* Informations de livraison */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Adresse de livraison</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>{draft.shipping.firstName} {draft.shipping.lastName}</p>
                  <p>{draft.shipping.address}</p>
                  <p>{draft.shipping.postalCode} {draft.shipping.city}</p>
                  <p>{draft.shipping.country}</p>
                </div>
              </div>

              {/* Message de sécurité */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-green-800">
                  <p className="font-medium mb-1">Paiement sécurisé</p>
                  <p className="text-green-700">
                    Vos informations de paiement sont protégées par un cryptage SSL. 
                    La commande ne sera validée qu'après confirmation du paiement.
                  </p>
                </div>
              </div>

              {/* Bouton de paiement */}
              <Button 
                className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700" 
                onClick={handlePay}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Traitement en cours...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Confirmer et payer {formatCurrency(displayTotal)}
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-gray-500">
                En cliquant sur "Confirmer et payer", vous acceptez nos conditions générales de vente
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Payment
