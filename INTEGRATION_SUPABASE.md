# Guide d'Intégration Supabase - Frontend

## ✅ État actuel

Le frontend est **déjà configuré** avec Supabase ! Voici ce qui est en place :

### Configuration existante

1. **SDK Supabase** : `@supabase/supabase-js` installé
2. **Configuration** : `src/config/supabase.ts`
3. **Service d'authentification** : `src/services/auth.service.ts`
4. **Hook d'authentification** : `src/hooks/useSupabase.ts`
5. **Callback OAuth2** : `src/pages/OAuth2Callback.tsx`
6. **Headers API** : Le token Supabase est automatiquement envoyé dans les requêtes

## 🔧 Configuration requise

### 1. Variables d'environnement

Créez un fichier `.env` dans le dossier `Apple_store/` :

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Backend Java Configuration
VITE_JAVA_BACKEND_URL=https://your-backend.com/api
VITE_DATA_PROVIDER=java-backend
```

### 2. Configuration Supabase Dashboard

1. **Google OAuth** :
   - Allez dans Supabase Dashboard → Authentication → Providers
   - Activez Google
   - Configurez les credentials Google OAuth
   - **Redirect URL** : `https://your-project.supabase.co/auth/v1/callback`

2. **URLs autorisées** :
   - Dans Supabase Dashboard → Authentication → URL Configuration
   - Ajoutez votre URL frontend : `https://your-frontend.com`
   - Ajoutez aussi : `http://localhost:5173` (pour le développement)

## 🔄 Flux d'authentification

### Connexion avec Google

1. L'utilisateur clique sur "Se connecter avec Google"
2. Le frontend appelle `authService.signInWithGoogle()`
3. Supabase redirige vers Google OAuth
4. Après authentification, Google redirige vers `/auth/oauth2/callback`
5. Le callback récupère le token Supabase
6. Le token est stocké dans `localStorage` (`token` et `auth_token`)
7. Le token est automatiquement envoyé dans les headers des requêtes API

### Utilisation dans les requêtes API

Le token Supabase est automatiquement inclus dans les requêtes grâce à `getAuthHeaders()` :

```typescript
// Dans src/config/api.ts
export const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('token')
  if (token) {
    return { Authorization: `Bearer ${token}` }
  }
  return {}
}
```

## ✅ Vérification

### Test de connexion

1. Démarrez le frontend : `npm run dev`
2. Allez sur `/login`
3. Cliquez sur "Se connecter avec Google"
4. Vérifiez que vous êtes redirigé vers Google
5. Après connexion, vérifiez que vous êtes redirigé vers le frontend
6. Vérifiez dans la console du navigateur que le token est stocké :
   ```javascript
   localStorage.getItem('token')
   ```

### Test avec le backend

1. Après connexion, faites une requête API (ex: récupérer les commandes)
2. Vérifiez dans les DevTools → Network que le header `Authorization: Bearer <token>` est présent
3. Le backend Java devrait valider le token Supabase automatiquement

## 🐛 Dépannage

### Le token n'est pas stocké

- Vérifiez que le callback OAuth2 fonctionne (`/auth/oauth2/callback`)
- Vérifiez les logs de la console pour les erreurs
- Vérifiez que les URLs de redirection sont correctement configurées dans Supabase

### Le backend ne reconnaît pas le token

- Vérifiez que le backend a les bonnes variables d'environnement Supabase
- Vérifiez que `SUPABASE_JWT_SECRET` est correct (en base64)
- Vérifiez les logs du backend pour les erreurs de validation

### Erreur CORS

- Vérifiez que l'URL du frontend est dans les URLs autorisées de Supabase
- Vérifiez la configuration CORS du backend Java

## 📝 Notes importantes

1. **Token Supabase** : Le token JWT de Supabase est utilisé directement pour authentifier les requêtes au backend Java
2. **Synchronisation** : Le backend synchronise automatiquement les utilisateurs Supabase avec la base de données locale
3. **Provider** : Le frontend peut utiliser soit Supabase directement, soit le backend Java (configuré via `VITE_DATA_PROVIDER`)

## 🚀 Prochaines étapes

1. Configurez les variables d'environnement
2. Testez la connexion Google
3. Vérifiez que le token est bien envoyé au backend
4. Testez les endpoints protégés du backend
