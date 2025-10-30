import { authService } from '@/lib/supabase'

// Helpers locaux pour validation et rate-limit (évite dépendance croisée)
const AUTH_FAIL_KEY = 'auth_failures'
const MAX_ATTEMPTS = 4
const LOCK_MINUTES = 15

function sanitizeStringLocal(input: string): string {
  return input.replace(/[\0\b\t\n\r\x1a'"\\%]/g, (c) => `\\${c}`)
}
function validateEmailLocal(email: string): boolean {
  return /.+@.+\..+/.test(email)
}
function readFailures() {
  try { return JSON.parse(localStorage.getItem(AUTH_FAIL_KEY) || '{}') } catch { return {} }
}
function writeFailures(map: any) { try { localStorage.setItem(AUTH_FAIL_KEY, JSON.stringify(map)) } catch {} }
function canAttemptAuthLocal(id: string) {
  const m = readFailures(); const r = m[id];
  if (!r) return true; if (r.lockedUntil && Date.now() < r.lockedUntil) return false; return true
}
function registerAuthFailureLocal(id: string) {
  const m = readFailures(); const r = m[id] || { count: 0 }; r.count += 1;
  if (r.count >= MAX_ATTEMPTS) { r.lockedUntil = Date.now() + LOCK_MINUTES * 60 * 1000; r.count = 0 }
  m[id] = r; writeFailures(m)
}
function resetAuthFailuresLocal(id: string) { const m = readFailures(); delete m[id]; writeFailures(m) }

export const appAuthService = {
  async loginWithEmail(email: string, password: string) {
    const cleanedEmail = sanitizeStringLocal(email)
    if (!validateEmailLocal(cleanedEmail)) {
      throw new Error('Email invalide')
    }
    if (!canAttemptAuthLocal(cleanedEmail)) {
      throw new Error('Trop de tentatives. Réessayez plus tard.')
    }
    try {
      const res = await authService.signIn(cleanedEmail, password)
      resetAuthFailuresLocal(cleanedEmail)
      return res
    } catch (e) {
      registerAuthFailureLocal(cleanedEmail)
      throw e
    }
  },

  async signupWithEmail(email: string, password: string, firstName = '', lastName = '') {
    const cleanedEmail = sanitizeStringLocal(email)
    if (!validateEmailLocal(cleanedEmail)) {
      throw new Error('Email invalide')
    }
    return authService.signUp(cleanedEmail, password, { first_name: firstName, last_name: lastName })
  },

  async logout() {
    return authService.signOut()
  },

  async loginWithGoogle() {
    return authService.signInWithGoogle()
  }
}


