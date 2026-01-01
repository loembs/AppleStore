import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/config/supabase';

const OAuth2Callback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') || '/';

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        // Supabase OAuth utilise des hash fragments (#access_token=...)
        // Le client Supabase les gère automatiquement, mais on doit attendre un peu
        // pour que les hash fragments soient traités
        
        // Attendre un court instant pour que Supabase traite les hash fragments
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Récupérer la session depuis les hash fragments de l'URL
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Erreur OAuth:', error);
          navigate(`/login?error=${encodeURIComponent(error.message || 'oauth_failed')}`, { replace: true });
          return;
        }

        if (data.session) {
          // Session créée avec succès
          // Stocker le token d'accès pour compatibilité
          if (data.session.access_token) {
            localStorage.setItem('token', data.session.access_token);
            localStorage.setItem('auth_token', data.session.access_token);
          }
          
          // Rediriger vers la page demandée ou la page d'accueil
          navigate(returnUrl, { replace: true });
        } else {
          // Pas de session, vérifier s'il y a une erreur dans l'URL (query params ou hash)
          const errorParam = searchParams.get('error');
          const errorDescription = searchParams.get('error_description');
          
          // Vérifier aussi dans le hash
          const hashParams = new URLSearchParams(window.location.hash.substring(1));
          const hashError = hashParams.get('error');
          const hashErrorDescription = hashParams.get('error_description');
          
          const finalError = errorParam || hashError;
          const finalErrorDescription = errorDescription || hashErrorDescription;
          
          if (finalError) {
            console.error('Erreur OAuth:', finalError, finalErrorDescription);
            navigate(`/login?error=${encodeURIComponent(finalErrorDescription || finalError)}`, { replace: true });
          } else {
            // Essayer de récupérer la session une dernière fois après un délai
            setTimeout(async () => {
              const { data: retryData } = await supabase.auth.getSession();
              if (retryData.session) {
                if (retryData.session.access_token) {
                  localStorage.setItem('token', retryData.session.access_token);
                  localStorage.setItem('auth_token', retryData.session.access_token);
                }
                navigate(returnUrl, { replace: true });
              } else {
                navigate('/login?error=oauth_failed', { replace: true });
              }
            }, 500);
          }
        }
      } catch (err: any) {
        console.error('Erreur lors du traitement OAuth:', err);
        navigate(`/login?error=${encodeURIComponent(err.message || 'oauth_failed')}`, { replace: true });
      }
    };

    handleOAuthCallback();
  }, [navigate, returnUrl, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Connexion en cours...</p>
      </div>
    </div>
  );
};

export default OAuth2Callback;

