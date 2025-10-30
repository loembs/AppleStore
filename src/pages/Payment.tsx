import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCartWithAuth } from '@/hooks/useCartWithAuth'
import { formatCurrency } from '@/utils/currency'

const Payment = () => {
  const navigate = useNavigate()
  const { items, localItems, isAuthenticated, clearCart } = useCartWithAuth()

  // Charger brouillon
  let draft: any = null
  try {
    const stored = localStorage.getItem('draft_order')
    draft = stored ? JSON.parse(stored) : null
  } catch {}

  const displayItems = draft?.items || (isAuthenticated ? items : localItems)
  const displayTotal = draft?.total || displayItems.reduce((sum: number, item: any) => sum + item.total_price, 0)

  const handlePay = async () => {
    // Simuler un paiement réussi
    try {
      await clearCart()
      try { localStorage.removeItem('draft_order') } catch {}
    } finally {
      navigate('/order-confirmation')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 pb-16">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <Card>
            <CardHeader>
              <CardTitle>Paiement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Montant à payer :</p>
              <div className="text-3xl font-bold">
                {formatCurrency(displayTotal)}
              </div>
              <Button className="h-12" onClick={handlePay}>
                Payer maintenant
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Payment
