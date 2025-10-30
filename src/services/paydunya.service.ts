// =============================================
// SERVICE PAIEMENT - SUPABASE + PAYDUNYA
// =============================================
import { supabase, supabaseUrl, supabaseAnonKey } from '@/config/supabase';

export interface PaymentRequest {
  amount: number;
  currency?: string;
  email: string;
  phoneNumber: string;
  name: string;
  orderId: number;
  orderNumber: string;
  description?: string;
}

export interface PayDunyaInvoiceResponse {
  status: string;
  message: string;
  token: string;
  url: string;
  responseCode?: string;
}

export interface PaymentVerificationRequest {
  token: string;
  orderId: number;
}

export const paydunyaService = {
  /**
   * Créer une facture PayDunya via Edge Function
   */
  async createInvoice(request: PaymentRequest): Promise<PayDunyaInvoiceResponse> {
    try {
      console.log('🔄 Création facture PayDunya:', request);
      
      // Timeout de 15 secondes pour éviter d'attendre trop longtemps
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      
      const response = await fetch(`${supabaseUrl}/functions/v1/paydunya-create-invoice`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`
        },
        body: JSON.stringify(request),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ Erreur création facture:', errorData);
        throw new Error(errorData.error || 'Impossible de créer la facture');
      }

      const data = await response.json();
      console.log('✅ Facture créée:', data);
      return data;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.error('❌ Timeout création facture (> 15s)');
        throw new Error('Le service de paiement met trop de temps à répondre. Veuillez réessayer.');
      }
      console.error('❌ Erreur service PayDunya:', error);
      throw new Error('Service de paiement temporairement indisponible');
    }
  },

  /**
   * Vérifier le statut d'un paiement PayDunya
   */
  async verifyPayment(verification: PaymentVerificationRequest) {
    try {
      console.log('🔍 Vérification paiement:', verification);
      
      const response = await fetch(`${supabaseUrl}/functions/v1/paydunya-verify-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`
        },
        body: JSON.stringify({
          token: verification.token,
          order_id: verification.orderId
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ Erreur vérification:', errorData);
        throw new Error('Vérification du paiement impossible');
      }

      const data = await response.json();
      console.log('✅ Vérification réussie:', data);
      return data;
    } catch (error) {
      console.error('❌ Erreur vérification:', error);
      throw new Error('Erreur de vérification');
    }
  },

  /**
   * Mettre à jour le statut d'une commande après paiement
   */
  async updateOrderPaymentStatus(
    orderId: number, 
    status: 'PAID' | 'FAILED', 
    transactionRef?: string
  ) {
    try {
      console.log(`📝 Mise à jour commande ${orderId}:`, status);
      
      const updateData: any = {
        payment_status: status,
        status: status === 'PAID' ? 'CONFIRMED' : 'PENDING',
        updated_at: new Date().toISOString()
      };

      if (transactionRef) {
        updateData.payment_reference = transactionRef;
      }

      const { error } = await supabase
        .from('ethio_orders')
        .update(updateData)
        .eq('id', orderId);

      if (error) {
        console.error('❌ Erreur mise à jour:', error);
        throw new Error('Mise à jour impossible');
      }

      console.log('✅ Commande mise à jour');
      return true;
    } catch (error) {
      console.error('❌ Erreur:', error);
      throw new Error('Erreur de mise à jour');
    }
  },

  /**
   * Obtenir les méthodes de paiement disponibles
   */
  getPaymentMethods() {
    return [
      {
        id: 'card',
        name: 'Carte Bancaire',
        description: 'Visa, Mastercard',
        icon: 'CreditCard',
        enabled: true
      },
      {
        id: 'mobile_money',
        name: 'Mobile Money',
        description: 'Orange, MTN, Moov, Wave, Free Money',
        icon: 'Smartphone',
        enabled: true
      }
    ];
  }
};

// Export pour compatibilité
export const paymentService = paydunyaService;

