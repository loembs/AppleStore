import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useAuth } from '@/hooks/useSupabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { User as UserIcon } from 'lucide-react'

const Profile = () => {
  const { user, signOut } = useAuth()

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-blue-50" />
      <div className="absolute -top-36 -left-24 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-blue-200/40 to-cyan-200/40 blur-3xl" />
      <div className="absolute -bottom-36 -right-24 w-[460px] h-[460px] rounded-full bg-gradient-to-br from-indigo-200/40 to-pink-200/40 blur-3xl" />

      <Header />
      <main className="relative z-10 pt-20 pb-16">
        <div className="max-w-2xl mx-auto px-6 py-12">
          <Card className="backdrop-blur-xl bg-white/70 border border-white/60 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.25)]">
            <CardHeader className="text-center">
              <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-white border border-gray-200 flex items-center justify-center shadow-sm mb-3">
                <UserIcon className="w-10 h-10 text-gray-500" />
              </div>
              <CardTitle className="text-xl">Mon profil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {user ? (
                <>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <div className="text-xs uppercase tracking-wide text-gray-500">Email</div>
                      <div className="text-lg font-medium text-gray-900">{user.email}</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button className="flex-1" variant="destructive" onClick={() => signOut()}>Se déconnecter</Button>
                    <Button className="flex-1" variant="outline" onClick={() => window.history.back()}>Retour</Button>
                  </div>
                </>
              ) : (
                <div className="text-center text-gray-700">Vous n'êtes pas connecté.</div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Profile
