import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const OAuth2Callback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const returnUrl = searchParams.get('returnUrl') || '/';

  useEffect(() => {
    if (token) {
      // Stocker le token dans localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('auth_token', token);
      
      // Rediriger vers la page demandée ou la page d'accueil
      navigate(returnUrl, { replace: true });
    } else {
      // Pas de token, rediriger vers la page de login avec une erreur
      navigate('/login?error=oauth_failed', { replace: true });
    }
  }, [token, returnUrl, navigate]);

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

