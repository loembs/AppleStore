// Utilitaires de debug pour la production
export const debugProduction = () => {
  console.log('🔍 === DEBUG PRODUCTION ===')
  console.log('Environment:', import.meta.env.MODE)
  console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL)
  console.log('VITE_SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ Présent' : '❌ Manquant')
  console.log('URL actuelle:', window.location.href)
  console.log('User Agent:', navigator.userAgent)
  console.log('========================')
}

// Fonction pour tester la configuration
export const testProductionConfig = () => {
  const config = {
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
    supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
    isConfigured: !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY)
  }
  
  console.log('📊 Configuration Production:', config)
  return config
}

// Fonction pour afficher un message d'erreur détaillé
export const showProductionError = (error: any) => {
  console.error('❌ Erreur Production:', error)
  
  const errorInfo = {
    message: error?.message || 'Erreur inconnue',
    code: error?.code || 'NO_CODE',
    details: error?.details || 'Pas de détails',
    hint: error?.hint || 'Pas de suggestion',
    timestamp: new Date().toISOString(),
    url: window.location.href
  }
  
  console.table(errorInfo)
  return errorInfo
}
