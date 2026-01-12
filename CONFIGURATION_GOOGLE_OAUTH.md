# Configuration Google OAuth avec Backend Java

## ⚠️ Problème
Le backend Java utilise une implémentation manuelle d'OAuth2 (pas Spring Security OAuth2 Client standard). L'URL de callback doit correspondre à ce qui est configuré dans le backend.

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
   http://localhost:8081
   https://istar-back.onrender.com
   https://apple-store-hazel.vercel.app
   ```
   
   **Authorized redirect URIs** (IMPORTANT - ajoutez EXACTEMENT l'URL utilisée par le backend) :
   ```
   http://localhost:8081/api/auth/oauth2/callback
   https://istar-back.onrender.com/api/auth/oauth2/callback
   ```
   
   ⚠️ **CRITIQUE** : L'URL doit correspondre EXACTEMENT à celle configurée dans `GOOGLE_REDIRECT_URI` du backend (même protocole, même domaine, même port, même chemin)
   
6. **Copiez le Client ID et Client Secret** générés

### 2. Configurer le Backend Java

1. **Variables d'environnement à configurer dans le backend** :
   ```bash
   GOOGLE_CLIENT_ID=votre-client-id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=votre-client-secret
   GOOGLE_REDIRECT_URI=http://localhost:8081/api/auth/oauth2/callback
   ```
   
   Pour la production (Render) :
   ```bash
   GOOGLE_CLIENT_ID=votre-client-id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=votre-client-secret
   GOOGLE_REDIRECT_URI=https://istar-back.onrender.com/api/auth/oauth2/callback
   ```

### 3. Vérifier la configuration dans application.properties

Le fichier `application.properties` contient des configurations Spring Security OAuth2 Client qui ne sont PAS utilisées par l'implémentation manuelle. Ces configurations peuvent être ignorées ou supprimées si vous n'utilisez que l'implémentation manuelle.

### 4. Comment ça fonctionne

1. L'utilisateur clique sur "Continuer avec Google" dans le frontend
2. Le frontend redirige vers `/api/auth/oauth2/google` (backend Java)
3. Le backend redirige vers Google avec le `redirect_uri` configuré dans `GOOGLE_REDIRECT_URI`
4. Google authentifie l'utilisateur et redirige vers le `redirect_uri` (par exemple : `http://localhost:8081/api/auth/oauth2/callback`)
5. Le backend doit avoir un endpoint pour gérer ce callback (à vérifier dans `AuthController`)

## 🔍 Vérification

1. Vérifiez que les variables d'environnement sont correctement configurées dans le backend
2. Vérifiez que l'URL de redirection dans Google Cloud Console correspond exactement à `GOOGLE_REDIRECT_URI`
3. Redémarrez le backend après avoir configuré les variables d'environnement
4. Testez la connexion Google depuis le frontend

## ⚠️ Erreurs courantes

- **"redirect_uri_mismatch" (Erreur 400)** : 
  - L'URL dans Google Cloud Console ne correspond PAS EXACTEMENT à celle utilisée par le backend
  - Vérifiez que l'URL dans Google Cloud Console est identique à `GOOGLE_REDIRECT_URI` (ou la valeur par défaut `https://istar-back.onrender.com/api/auth/oauth2/callback`)
  - Pour le développement local, utilisez : `http://localhost:8081/api/auth/oauth2/callback`
  - Pour la production, utilisez : `https://istar-back.onrender.com/api/auth/oauth2/callback`
  - ⚠️ Attention aux différences : `http` vs `https`, `localhost` vs domaine, `8081` vs autre port
- **"ERR_CONNECTION_REFUSED"** : Le backend n'est pas démarré ou l'URL de callback n'est pas accessible
- **"invalid_client"** : Le Client ID ou Client Secret est incorrect dans les variables d'environnement

## 📝 Notes importantes

- L'URL de redirection dans Google Cloud Console doit être **exactement** la même que `GOOGLE_REDIRECT_URI`
- Pour le développement local : `http://localhost:8081/api/auth/oauth2/callback`
- Pour la production : `https://istar-back.onrender.com/api/auth/oauth2/callback`
- ⚠️ Le backend Java utilise une implémentation manuelle, PAS Spring Security OAuth2 Client standard
- Il faut vérifier que le backend a bien un endpoint pour gérer le callback `/api/auth/oauth2/callback`
