// =============================================
// CONFIGURATION API
// =============================================

import { JAVA_BACKEND_URL } from './provider.config'

export const API_CONFIG = {
  BASE_URL: JAVA_BACKEND_URL || 'https://istar-back.onrender.com'
}

export const buildApiUrl = (endpoint: string): string => {
  // Si l'endpoint commence déjà par /api, ne pas le dupliquer
  if (endpoint.startsWith('/api')) {
    return `${API_CONFIG.BASE_URL.replace('/api', '')}${endpoint}`
  }
  return `${API_CONFIG.BASE_URL}${endpoint}`
}

export const getAuthHeaders = (): Record<string, string> => {
  // Essayer d'abord 'token' (utilisé par authService)
  const token = localStorage.getItem('token')
  if (token) {
    return { Authorization: `Bearer ${token}` }
  }
  
  // Sinon essayer 'auth_token' (utilisé par javaBackendAuthProvider)
  const authToken = localStorage.getItem('auth_token')
  if (authToken) {
    return { Authorization: `Bearer ${authToken}` }
  }
  
  return {}
}

