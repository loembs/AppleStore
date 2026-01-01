import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/config/supabase';
import { DATA_PROVIDER, JAVA_BACKEND_BASE_URL } from '@/config/provider.config';

const OAuth2Callback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') || sessionStorage.getItem('oauth_return_url') || '/';

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        // Nettoyer le returnUrl du sessionStorage
        sessionStorage.removeItem('oauth_return_url');

        if (DATA_PROVIDER === 'java-backend') {
          // Backend Java - vérifier si on a un token dans l'URL
          const token = searchParams.get('token');
          const error = searchParams.get('error');
          
          if (error) {
            navigate(`/login?error=${encodeURIComponent(error)}`, { replace: true });
            return;
          }
          
          if (token) {
            // Stocker le token
            localStorage.setItem('token', token);
            localStorage.setItem('auth_token', token);
            navigate(returnUrl, { replace: true });
          } else {
            // Essayer de récupérer depuis le backend
            try {
              const response = await fetch(`${JAVA_BACKEND_BASE_URL}/api/auth/oauth2/success`, {
                credentials: 'include'
              });
              
              if (response.ok) {
                const data = await response.json();
                if (data.token) {
                  localStorage.setItem('token', data.token);
                  localStorage.setItem('auth_token', data.token);
                  navigate(returnUrl, { replace: true });
                } else {
                  navigate('/login?error=oauth_failed', { replace: true });
                }
              } else {
                navigate('/login?error=oauth_failed', { replace: true });
              }
            } catch (err) {
              console.error('Erreur récupération token OAuth:', err);
              navigate('/login?error=oauth_failed', { replace: true });
            }
          }
        } else {
          // Supabase OAuth utilise des hash fragments (#access_token=...)
          await new Promise(resolve => setTimeout(resolve, 100));
          
          const { data, error } = await supabase.auth.getSession();
          
          if (error) {
            console.error('Erreur OAuth:', error);
            navigate(`/login?error=${encodeURIComponent(error.message || 'oauth_failed')}`, { replace: true });
            return;
          }

          if (data.session) {
            if (data.session.access_token) {
              localStorage.setItem('token', data.session.access_token);
              localStorage.setItem('auth_token', data.session.access_token);
            }
            navigate(returnUrl, { replace: true });
          } else {
            const errorParam = searchParams.get('error');
            const hashParams = new URLSearchParams(window.location.hash.substring(1));
            const hashError = hashParams.get('error');
            
            if (errorParam || hashError) {
              navigate(`/login?error=${encodeURIComponent(errorParam || hashError || 'oauth_failed')}`, { replace: true });
            } else {
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

