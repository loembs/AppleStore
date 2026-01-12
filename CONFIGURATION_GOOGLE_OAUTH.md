# Configuration Google OAuth avec Supabase

## ⚠️ Problème
Vous avez activé Google dans Supabase, mais vous n'avez pas configuré les **credentials Google OAuth** (Client ID et Client Secret).

## ✅ Solution : Configuration complète

### 1. Créer les credentials dans Google Cloud Console

1. **Allez sur Google Cloud Console** : https://console.cloud.google.com/
2. **Créez ou sélectionnez un projet**
3. **Activez l'API Google+** :
   - APIs & Services → Library
   - Cherchez "Google+ API" et activez-la
4. **Configurez l'écran de consentement OAuth** :
   - APIs & Services → OAuth consent screen
   - Choisissez "External" (pour les tests) ou "Internal" (si vous avez Google Workspace)
   - Remplissez les informations de base (nom de l'application, email de support, etc.)
5. **Créez les identifiants OAuth** :
   - APIs & Services → Credentials
   - Cliquez sur "Create Credentials" → "OAuth client ID"
   - Type : **Web application**
   - Nom : `Apple Store` (ou un nom de votre choix)
   
   **Authorized JavaScript origins** (ajoutez) :
   ```
   http://localhost:5173
   https://votre-domaine.com
   https://votre-projet.supabase.co
   ```
   
   **Authorized redirect URIs** (IMPORTANT - ajoutez votre URL Supabase) :
   ```
   https://votre-projet.supabase.co/auth/v1/callback
   http://localhost:5173/auth/oauth2/callback
   https://votre-domaine.com/auth/oauth2/callback
   ```
   
6. **Copiez le Client ID et Client Secret** générés

### 2. Configurer Supabase

1. **Allez dans votre Dashboard Supabase**
2. **Authentication → Providers**
3. **Activez Google** (si ce n'est pas déjà fait)
4. **Collez les credentials** (que vous avez copiés depuis Google Cloud Console) :
   - ⚠️ **IMPORTANT** : Vous devez entrer les valeurs DIRECTEMENT dans l'interface Supabase, pas comme des variables d'environnement
   - Dans l'interface Supabase, vous verrez deux champs :
     - **Client ID** : Collez ici votre Client ID (ressemble à `123456789-abc123def456.apps.googleusercontent.com`)
       - Vous le trouvez dans Google Cloud Console → APIs & Services → Credentials
       - Après avoir créé un "OAuth client ID", il s'affiche sous le nom "Your Client ID"
     - **Client Secret** : Collez ici votre Client Secret (ressemble à `GOCSPX-abc123def456xyz789`)
       - Vous le trouvez au même endroit, juste en dessous du Client ID
       - ⚠️ **Important** : Le Client Secret n'est affiché qu'une seule fois lors de la création. Si vous l'avez perdu, vous devrez créer de nouveaux credentials.
5. **Cliquez sur "Save"**

**❌ NE PAS créer de variables d'environnement** : Ces valeurs doivent être entrées directement dans l'interface Supabase Dashboard, pas dans un fichier `.env` ou des variables d'environnement.

### 3. Vérifier les URLs autorisées dans Supabase

1. **Authentication → URL Configuration**
2. **Site URL** : `http://localhost:5173` (pour le développement)
3. **Redirect URLs** : Ajoutez :
   ```
   http://localhost:5173/auth/oauth2/callback
   http://localhost:5173/**
   https://votre-domaine.com/auth/oauth2/callback
   https://votre-domaine.com/**
   ```

## 🔍 Vérification

1. Redémarrez votre application frontend
2. Essayez de vous connecter avec Google
3. Vérifiez la console du navigateur pour les erreurs
4. Vérifiez les logs Supabase : Dashboard → Logs → Auth Logs

## ⚠️ Erreurs courantes

- **"redirect_uri_mismatch"** : L'URL de redirection dans Google Cloud ne correspond pas à celle configurée dans Supabase
- **"invalid_client"** : Le Client ID ou Client Secret est incorrect dans Supabase
- **"access_denied"** : L'écran de consentement OAuth n'est pas configuré correctement dans Google Cloud

## 📝 Notes importantes

- Les credentials Google doivent être configurés dans **Google Cloud Console** ET dans **Supabase**
- L'URL de redirection dans Google Cloud doit être : `https://votre-projet.supabase.co/auth/v1/callback`
- Pour la production, changez l'URL dans Google Cloud vers votre domaine réel