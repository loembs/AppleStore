import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card' 
import { useAuth } from '@/hooks/useSupabase'
import { authService } from '@/lib/supabase'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation() as any
  const [searchParams] = useSearchParams()
  
  // Déterminer le returnUrl depuis plusieurs sources (par ordre de priorité)
  const getReturnUrl = () => {
    // 1. Depuis location.state (navigation programmatique)
    if (location.state?.returnUrl && location.state.returnUrl !== '/login') {
      return location.state.returnUrl
    }
    // 2. Depuis les paramètres URL
    const urlReturnUrl = searchParams.get('returnUrl')
    if (urlReturnUrl && urlReturnUrl !== '/login') {
      return decodeURIComponent(urlReturnUrl)
    }
    // 3. Depuis sessionStorage (pour OAuth)
    const sessionReturnUrl = sessionStorage.getItem('returnUrl')
    if (sessionReturnUrl && sessionReturnUrl !== '/login') {
      sessionStorage.removeItem('returnUrl')
      return sessionReturnUrl
    }
    // 4. Depuis le referrer (page précédente)
    const referrer = document.referrer
    if (referrer) {
      try {
        const referrerUrl = new URL(referrer)
        const currentUrl = new URL(window.location.href)
        // Si le referrer est du même domaine, utiliser le chemin
        if (referrerUrl.origin === currentUrl.origin && 
            referrerUrl.pathname !== '/login' && 
            referrerUrl.pathname !== '/checkout') {
          return referrerUrl.pathname + referrerUrl.search
        }
      } catch (e) {
        // Ignorer les erreurs de parsing URL
      }
    }
    // 5. Fallback par défaut : /store (jamais /checkout pour éviter les boucles)
    return '/store'
  }
  
  const returnUrl = getReturnUrl()
  const { user, loading: authLoading, signIn, signUp, signInWithGoogle } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignup, setIsSignup] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Rediriger automatiquement si l'utilisateur est déjà connecté
  useEffect(() => {
    if (!authLoading && user) {
      // Éviter la boucle infinie : ne pas rediriger si on est déjà sur la page de destination
      const currentPath = location.pathname
      // Ne pas utiliser /checkout comme fallback pour éviter les boucles avec Checkout.tsx
      const finalReturnUrl = returnUrl === '/checkout' ? '/store' : returnUrl
      
      if (currentPath === '/login' && finalReturnUrl !== '/login') {
        console.log('[Login] Utilisateur déjà connecté, redirection vers:', finalReturnUrl, '(returnUrl original:', returnUrl, ')')
        navigate(finalReturnUrl, { replace: true })
      }
    }
  }, [user, authLoading, returnUrl, navigate, location.pathname])

  // Sauvegarder le returnUrl dans sessionStorage si pas déjà présent (mais jamais /checkout)
  useEffect(() => {
    if (returnUrl && returnUrl !== '/store' && returnUrl !== '/checkout' && !sessionStorage.getItem('returnUrl')) {
      sessionStorage.setItem('returnUrl', returnUrl)
    }
  }, [returnUrl])

  // Écouter l'événement de connexion réussie pour rediriger
  useEffect(() => {
    const handleUserLoggedIn = () => {
      // Ne pas utiliser /checkout comme fallback pour éviter les boucles
      const finalReturnUrl = returnUrl === '/checkout' ? '/store' : returnUrl
      console.log('[Login] Événement userLoggedIn reçu, redirection vers:', finalReturnUrl)
      // Attendre un peu pour que l'état soit mis à jour
      setTimeout(() => {
        if (finalReturnUrl !== '/login') {
          navigate(finalReturnUrl, { replace: true })
        }
      }, 300)
    }

    window.addEventListener('userLoggedIn', handleUserLoggedIn)
    return () => {
      window.removeEventListener('userLoggedIn', handleUserLoggedIn)
    }
  }, [returnUrl, navigate])

  // Vérifier les erreurs OAuth dans l'URL
  useEffect(() => {
    const errorParam = searchParams.get('error')
    if (errorParam) {
      setError(decodeURIComponent(errorParam))
      // Nettoyer l'URL
      navigate('/login', { replace: true })
    }
  }, [searchParams, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      if (isSignup) {
        await signUp(email, password, { first_name: '', last_name: '' })
        // Attendre que l'utilisateur soit chargé
        await new Promise(resolve => setTimeout(resolve, 500))
        // Vérifier que l'utilisateur est bien connecté avant de rediriger
        const currentUser = await authService.getCurrentUser()
        if (currentUser) {
          // Ne pas utiliser /checkout comme fallback pour éviter les boucles
          const finalReturnUrl = returnUrl === '/checkout' ? '/store' : returnUrl
          console.log('[Login] Inscription réussie, redirection vers:', finalReturnUrl, '(returnUrl original:', returnUrl, ')')
          navigate(finalReturnUrl, { replace: true })
        } else {
          console.warn('[Login] Utilisateur non trouvé après inscription')
        }
      } else {
        await signIn(email, password)
        // Attendre que l'utilisateur soit chargé et que l'événement soit déclenché
        await new Promise(resolve => setTimeout(resolve, 500))
        // Vérifier que l'utilisateur est bien connecté avant de rediriger
        const currentUser = await authService.getCurrentUser()
        if (currentUser) {
          // Ne pas utiliser /checkout comme fallback pour éviter les boucles
          const finalReturnUrl = returnUrl === '/checkout' ? '/store' : returnUrl
          console.log('[Login] Connexion réussie, redirection vers:', finalReturnUrl, '(returnUrl original:', returnUrl, ')')
          navigate(finalReturnUrl, { replace: true })
        } else {
          console.warn('[Login] Utilisateur non trouvé après connexion, attente...')
          // Réessayer après un délai supplémentaire
          setTimeout(async () => {
            const retryUser = await authService.getCurrentUser()
            if (retryUser) {
              const finalReturnUrl = returnUrl === '/checkout' ? '/store' : returnUrl
              console.log('[Login] Utilisateur trouvé après attente, redirection vers:', finalReturnUrl, '(returnUrl original:', returnUrl, ')')
              navigate(finalReturnUrl, { replace: true })
            }
          }, 500)
        }
      }
    } catch (err: any) {
      setError(err?.message || 'Erreur lors de l\'authentification')
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    try {
      setLoading(true)
      setError(null)
      await signInWithGoogle(returnUrl)
      // Note: La redirection OAuth se fera automatiquement, on ne met pas setLoading(false) ici
    } catch (err: any) {
      setError(err?.message || 'Erreur lors de la connexion Google')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fond Apple-like */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-purple-50" />
      <div className="absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-blue-200/40 to-purple-200/40 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-[520px] h-[520px] rounded-full bg-gradient-to-br from-indigo-200/40 to-pink-200/40 blur-3xl" />

      {/* Contenu centré */}
      <div className="relative z-10 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900">Bienvenue</h1>
            <p className="text-sm text-gray-600 mt-1">Connectez-vous pour poursuivre votre commande</p>
          </div>

          <Card className="backdrop-blur-xl bg-white/70 border border-white/60 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:shadow-[0_12px_50px_-15px_rgba(0,0,0,0.3)]">
            <CardHeader>
              <CardTitle className="text-center text-xl font-semibold">
                {isSignup ? 'Créer un compte' : 'Se connecter'}
              </CardTitle>
            </CardHeader>
            <CardContent>
                            <div className="space-y-4">
                <Button type="button" variant="outline" className="w-full h-11" onClick={handleGoogle} disabled={loading}>                                                         
                  <img src="/icon_google.png" alt="Google" className="w-5 h-5 mr-2" /> Continuer avec Google     
                </Button>
                <div className="text-center text-xs text-gray-500">ou</div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div>
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                  {error && (
                    <p className="text-sm text-red-600">{error}</p>
                  )}
                  <Button type="submit" className="w-full h-11" disabled={loading}>
                    {loading ? 'Veuillez patienter...' : (isSignup ? 'Créer un compte' : 'Se connecter')}
                  </Button>
                  <Button type="button" variant="ghost" className="w-full h-11" onClick={() => setIsSignup(!isSignup)}>
                    {isSignup ? 'Déjà un compte ? Se connecter' : "Pas de compte ? S'inscrire"}
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Login
