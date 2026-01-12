import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useAuth } from '@/hooks/useSupabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { User, Package, ShoppingBag, LogOut, ArrowLeft, Mail, Settings } from 'lucide-react'

const Profile = () => {
  const { user, signOut, loading } = useAuth()
  const navigate = useNavigate()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                <p className="text-gray-600">Chargement...</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!user) {
    navigate('/login', { state: { returnUrl: '/profile' } })
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Header />
      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Header avec bouton retour */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Carte principale du profil */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white pb-12">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center shadow-lg">
                        <User className="w-10 h-10 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-white mb-1">Mon profil</CardTitle>
                        <div className="flex items-center gap-2 text-white/90">
                          <Mail className="w-4 h-4" />
                          <span className="text-sm">{user.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  {/* Informations personnelles */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations personnelles</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-medium uppercase tracking-wide text-gray-500">Email</label>
                        <div className="mt-1 text-base font-medium text-gray-900">{user.email}</div>
                      </div>
                      {user.user_metadata?.first_name && (
                        <div>
                          <label className="text-xs font-medium uppercase tracking-wide text-gray-500">Prénom</label>
                          <div className="mt-1 text-base font-medium text-gray-900">{user.user_metadata.first_name}</div>
                        </div>
                      )}
                      {user.user_metadata?.last_name && (
                        <div>
                          <label className="text-xs font-medium uppercase tracking-wide text-gray-500">Nom</label>
                          <div className="mt-1 text-base font-medium text-gray-900">{user.user_metadata.last_name}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Actions rapides */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        className="justify-start h-auto py-3"
                        onClick={() => navigate('/orders')}
                      >
                        <Package className="w-5 h-5 mr-3 text-blue-600" />
                        <div className="text-left">
                          <div className="font-medium">Mes commandes</div>
                          <div className="text-xs text-gray-500">Suivre vos commandes</div>
                        </div>
                      </Button>
                      <Button
                        variant="outline"
                        className="justify-start h-auto py-3"
                        onClick={() => navigate('/cart')}
                      >
                        <ShoppingBag className="w-5 h-5 mr-3 text-blue-600" />
                        <div className="text-left">
                          <div className="font-medium">Mon panier</div>
                          <div className="text-xs text-gray-500">Voir votre panier</div>
                        </div>
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Paramètres */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Paramètres</h3>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      disabled
                    >
                      <Settings className="w-5 h-5 mr-3" />
                      Paramètres du compte
                      <span className="ml-auto text-xs text-gray-400">Bientôt disponible</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar avec actions */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => navigate('/store')}
                  >
                    Continuer vos achats
                  </Button>
                  <Button
                    className="w-full"
                    variant="destructive"
                    onClick={() => signOut()}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Se déconnecter
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Profile
