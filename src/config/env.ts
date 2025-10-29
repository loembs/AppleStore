// =============================================
// CONFIGURATION DES VARIABLES D'ENVIRONNEMENT
// =============================================

export const config = {
  // Supabase
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || 'https://votre-projet.supabase.co',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'votre_cle_anon_supabase'
  },

  // Application
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Apple Store',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    url: import.meta.env.VITE_APP_URL || 'https://votre-apple-store.com'
  },

  // API
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://votre-projet.supabase.co/functions/v1'
  },

  // Paiements
  payments: {
    stripe: {
      publicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY || ''
    },
    paypal: {
      clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || ''
    }
  },

  // Analytics
  analytics: {
    googleAnalyticsId: import.meta.env.VITE_GOOGLE_ANALYTICS_ID || ''
  },

  // Feature Flags
  features: {
    analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    payments: import.meta.env.VITE_ENABLE_PAYMENTS === 'true',
    notifications: import.meta.env.VITE_ENABLE_NOTIFICATIONS === 'true'
  },

  // Development
  dev: {
    debug: import.meta.env.VITE_DEBUG === 'true',
    logLevel: import.meta.env.VITE_LOG_LEVEL || 'info'
  }
}

// Validation des variables d'environnement requises
export const validateEnv = () => {
  const required = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY'
  ]

  const missing = required.filter(key => !import.meta.env[key])

  if (missing.length > 0) {
    console.error('Variables d\'environnement manquantes:', missing)
    console.error('Veuillez créer un fichier .env.local avec les variables requises')
    return false
  }

  return true
}

// Vérifier la configuration au démarrage
if (import.meta.env.DEV) {
  validateEnv()
}
