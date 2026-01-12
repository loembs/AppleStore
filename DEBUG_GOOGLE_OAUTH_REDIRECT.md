# Débogage erreur redirect_uri_mismatch Google OAuth

## 🔍 Problème

Erreur `redirect_uri_mismatch` signifie que l'URL de redirection envoyée à Google ne correspond **PAS EXACTEMENT** à celle configurée dans Google Cloud Console.

## ✅ Vérifications à faire

### 1. Vérifier l'URL dans Google Cloud Console

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. **APIs & Services** → **Credentials**
3. Cliquez sur votre **OAuth 2.0 Client ID**
4. Vérifiez la section **Authorized redirect URIs**

L'URL doit être **EXACTEMENT** :
```
https://istar-back.onrender.com/api/auth/oauth2/callback
```

**⚠️ Points critiques :**
- Pas d'espace au début ou à la fin
- Pas de slash final (`/`) à la fin
- `https` (pas `http`)
- Pas de port (`:8080`, etc.)
- Chemin exact : `/api/auth/oauth2/callback`

### 2. Vérifier les variables d'environnement sur Render

1. Allez sur [Render Dashboard](https://dashboard.render.com/)
2. Sélectionnez votre service backend (`istar-back`)
3. **Environment** → **Environment Variables**

**Vérifiez :**
- `GOOGLE_CLIENT_ID` : doit être défini
- `GOOGLE_CLIENT_SECRET` : doit être défini
- `GOOGLE_REDIRECT_URI` : **NE DOIT PAS EXISTER** ou doit être exactement `https://istar-back.onrender.com/api/auth/oauth2/callback`

**⚠️ Si `GOOGLE_REDIRECT_URI` existe avec une valeur différente, SUPPRIMEZ-LA.**

### 3. Vérifier les logs Render après redéploiement

Après avoir redéployé le backend, testez la connexion Google et vérifiez les logs Render. Vous devriez voir :

```
=== GOOGLE OAUTH DEBUG ===
GOOGLE_REDIRECT_URI env: null (ou la valeur si définie)
redirectUri utilisé: https://istar-back.onrender.com/api/auth/oauth2/callback
clientId: ...
redirectUri encodé: https%3A%2F%2Fistar-back.onrender.com%2Fapi%2Fauth%2Foauth2%2Fcallback
URL Google complète: https://accounts.google.com/o/oauth2/v2/auth?client_id=...&redirect_uri=https%3A%2F%2Fistar-back.onrender.com%2Fapi%2Fauth%2Foauth2%2Fcallback&...
========================
```

**Vérifiez que `redirectUri utilisé` correspond EXACTEMENT à l'URL dans Google Cloud Console.**

### 4. Vérifier l'URL exacte envoyée à Google

Quand l'erreur apparaît, Google affiche souvent l'URL reçue dans le message d'erreur. Vérifiez :

1. **Copiez l'URL complète** de la page d'erreur Google
2. **Décodez l'URL** (utilisez un outil comme [urldecoder.org](https://www.urldecoder.org/))
3. **Comparez** avec l'URL dans Google Cloud Console

## 🔧 Solutions

### Solution 1 : Supprimer GOOGLE_REDIRECT_URI sur Render

1. Sur Render Dashboard → votre service → **Environment**
2. **Supprimez** la variable `GOOGLE_REDIRECT_URI` si elle existe
3. **Redéployez** le service
4. **Testez** à nouveau

### Solution 2 : Vérifier l'URL dans Google Cloud Console

1. Dans Google Cloud Console → **Credentials** → votre OAuth Client ID
2. **Authorized redirect URIs** doit contenir EXACTEMENT :
   ```
   https://istar-back.onrender.com/api/auth/oauth2/callback
   ```
3. **Sauvegardez** les modifications
4. **Attendez 5-10 minutes** (Google peut prendre du temps pour propager les changements)
5. **Testez** à nouveau

### Solution 3 : Vérifier qu'il n'y a pas de double encodage

Si l'URL est encodée deux fois, cela peut causer le problème. Les logs Render devraient montrer l'URL encodée. Vérifiez qu'elle correspond à :
```
https%3A%2F%2Fistar-back.onrender.com%2Fapi%2Fauth%2Foauth2%2Fcallback
```

## 📝 Checklist finale

- [ ] URL dans Google Cloud Console : `https://istar-back.onrender.com/api/auth/oauth2/callback` (exactement)
- [ ] `GOOGLE_REDIRECT_URI` n'existe PAS sur Render (ou a la même valeur)
- [ ] `GOOGLE_CLIENT_ID` est défini sur Render
- [ ] `GOOGLE_CLIENT_SECRET` est défini sur Render
- [ ] Le service a été redéployé après les modifications
- [ ] Les logs Render montrent la bonne URL
- [ ] Attendu 5-10 minutes après modification dans Google Cloud Console

## 🐛 Si le problème persiste

1. **Vérifiez les logs Render** pour voir l'URL exacte utilisée
2. **Copiez l'URL de l'erreur Google** et décodez-la
3. **Comparez** les deux URLs caractère par caractère
4. **Vérifiez** qu'il n'y a pas d'espaces invisibles ou de caractères spéciaux
