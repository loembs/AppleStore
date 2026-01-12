# Résolution erreur 404 Google OAuth en Production

## ✅ Problème résolu

L'erreur 404 était due à l'absence de l'endpoint `/api/auth/oauth2/callback` dans le backend. Cet endpoint a été créé pour gérer le retour de Google après l'authentification.

## 📋 Configuration requise

### 1. Variables d'environnement sur Render

Assurez-vous que ces variables sont configurées sur Render :

```
GOOGLE_CLIENT_ID=votre_client_id_google
GOOGLE_CLIENT_SECRET=votre_client_secret_google
FRONTEND_URL=https://apple-store-hazel.vercel.app
```

**⚠️ IMPORTANT :** Ne définissez **PAS** `GOOGLE_REDIRECT_URI` sur Render. Le backend utilise la valeur par défaut qui correspond à votre URL dans Google Cloud Console.

### 2. Configuration Google Cloud Console

Dans Google Cloud Console → Credentials → OAuth 2.0 Client ID :

**Authorized redirect URIs** (ajoutez EXACTEMENT) :
```
https://istar-back.onrender.com/api/auth/oauth2/callback
```

**Authorized JavaScript origins** :
```
https://istar-back.onrender.com
https://apple-store-hazel.vercel.app
```

## 🔄 Flux d'authentification

1. **Utilisateur clique sur "Continuer avec Google"**
   - Frontend redirige vers : `https://istar-back.onrender.com/api/auth/oauth2/google`
   - Backend redirige vers Google OAuth

2. **Google authentifie l'utilisateur**
   - Google redirige vers : `https://istar-back.onrender.com/api/auth/oauth2/callback?code=...`

3. **Backend traite le callback**
   - Échange le code contre un token d'accès
   - Récupère les informations utilisateur Google
   - Crée ou met à jour l'utilisateur dans la base de données
   - Génère un JWT token
   - Redirige vers le frontend : `https://apple-store-hazel.vercel.app/auth/oauth2/callback?token=...`

4. **Frontend reçoit le token**
   - Le frontend doit avoir une page `/auth/oauth2/callback` qui récupère le token
   - Stocke le token dans localStorage
   - Redirige l'utilisateur vers la page d'origine

## ✅ Vérifications

1. **Redémarrez le service sur Render** après avoir vérifié les variables d'environnement
2. **Testez la connexion Google** depuis le frontend
3. **Vérifiez les logs Render** en cas d'erreur

## 🐛 Dépannage

### Erreur 404 persistante
- Vérifiez que le service a bien redémarré sur Render
- Vérifiez que l'endpoint `/api/auth/oauth2/callback` est accessible (doit être dans `permitAll()`)

### Erreur "Google OAuth non configuré"
- Vérifiez que `GOOGLE_CLIENT_ID` et `GOOGLE_CLIENT_SECRET` sont bien définis sur Render

### Erreur redirect_uri_mismatch
- Vérifiez que l'URL dans Google Cloud Console correspond EXACTEMENT à `https://istar-back.onrender.com/api/auth/oauth2/callback`
- Ne définissez PAS `GOOGLE_REDIRECT_URI` sur Render (laissez le backend utiliser la valeur par défaut)

### Erreur lors de l'échange du code
- Vérifiez que `GOOGLE_CLIENT_SECRET` est correct
- Vérifiez que l'URL de callback dans Google Cloud Console correspond exactement
