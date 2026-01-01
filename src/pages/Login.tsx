import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card' 
import { useAuth } from '@/hooks/useSupabase'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation() as any
  const [searchParams] = useSearchParams()
  const returnUrl = location.state?.returnUrl || '/checkout'
  const { signIn, signUp, signInWithGoogle } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignup, setIsSignup] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
        // Après inscription réussie, rediriger
        navigate(returnUrl)
      } else {
        await signIn(email, password)
        // Après connexion réussie, rediriger
        navigate(returnUrl)
      }
    } catch (err: any) {
      setError(err?.message || 'Erreur lors de l\'authentification')
    } finally {
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

          <p className="mt-6 text-center text-xs text-gray-500">
            Sécurisé par Supabase Auth
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
