// =============================================
// CONFIGURATION DU FOURNISSEUR DE DONNÉES
// =============================================
// Changez simplement cette valeur pour switcher entre les providers
// 'supabase' | 'java-backend'

export type DataProvider = 'java-backend' | 'supabase'

// Activer Java Backend par défaut
export const DATA_PROVIDER: DataProvider = 
  (import.meta.env.VITE_DATA_PROVIDER as DataProvider) || 'java-backend'

// Configuration de l'URL du backend Java
// L'URL doit inclure /api à la fin car tous les endpoints backend commencent par /api
export const JAVA_BACKEND_URL = 
  import.meta.env.VITE_JAVA_BACKEND_URL || 'https://istar-back.onrender.com/api'

// URL de base sans /api pour OAuth2 (Spring Security gère OAuth2 sans /api)
export const JAVA_BACKEND_BASE_URL = JAVA_BACKEND_URL.replace('/api', '')

console.log(`📦 Provider configuré: ${DATA_PROVIDER}`)
if (DATA_PROVIDER === 'java-backend') {
  console.log(`🔗 Java Backend URL: ${JAVA_BACKEND_URL}`)
  console.log(`🔗 Java Backend Base URL (pour OAuth2): ${JAVA_BACKEND_BASE_URL}`)
}

