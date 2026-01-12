# Étapes finales pour résoudre redirect_uri_mismatch

## ✅ Ce qui a été fait

- [x] `GOOGLE_REDIRECT_URI` supprimé de Render Environment
- [x] URL correcte dans Google Cloud Console : `https://istar-back.onrender.com/api/auth/oauth2/callback`
- [x] Code backend mis à jour avec logs de débogage

## 🔄 Actions à faire maintenant

### 1. Redéployer le service sur Render

**IMPORTANT** : Après avoir supprimé `GOOGLE_REDIRECT_URI`, vous DEVEZ redéployer le service pour que les changements prennent effet.

1. Allez sur [Render Dashboard](https://dashboard.render.com/)
2. Sélectionnez votre service backend (`istar-back`)
3. Cliquez sur **Manual Deploy** → **Deploy latest commit**
4. Attendez que le déploiement soit terminé (2-5 minutes)

### 2. Vérifier les logs Render

Une fois le service redéployé :

1. Testez la connexion Google depuis le frontend
2. Allez sur Render Dashboard → votre service → **Logs**
3. Cherchez les lignes qui commencent par `=== GOOGLE OAUTH DEBUG ===`

Vous devriez voir quelque chose comme :
```
=== GOOGLE OAUTH DEBUG ===
GOOGLE_REDIRECT_URI env: null
redirectUri utilisé: https://istar-back.onrender.com/api/auth/oauth2/callback
clientId: [premiers caractères]...
redirectUri encodé: https%3A%2F%2Fistar-back.onrender.com%2Fapi%2Fauth%2Foauth2%2Fcallback
URL Google complète: https://accounts.google.com/o/oauth2/v2/auth?client_id=...&redirect_uri=https%3A%2F%2Fistar-back.onrender.com%2Fapi%2Fauth%2Foauth2%2Fcallback&...
========================
```

**⚠️ Vérifiez que `redirectUri utilisé` correspond EXACTEMENT à :**
```
https://istar-back.onrender.com/api/auth/oauth2/callback
```

### 3. Si l'erreur persiste après redéploiement

#### Option A : Vérifier que le service a bien redémarré

1. Vérifiez dans les logs Render qu'il y a un message de démarrage récent
2. Vérifiez que la date/heure du dernier déploiement correspond à maintenant

#### Option B : Vérifier les variables d'environnement

1. Render Dashboard → votre service → **Environment**
2. Vérifiez que `GOOGLE_REDIRECT_URI` n'apparaît **PAS** dans la liste
3. Vérifiez que `GOOGLE_CLIENT_ID` et `GOOGLE_CLIENT_SECRET` sont bien présents

#### Option C : Attendre quelques minutes

Parfois Google met quelques minutes à propager les changements. Attendez 5-10 minutes après avoir modifié les URLs dans Google Cloud Console.

#### Option D : Vérifier l'URL dans Google Cloud Console

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. **APIs & Services** → **Credentials**
3. Cliquez sur votre **OAuth 2.0 Client ID**
4. Vérifiez que dans **Authorized redirect URIs**, vous avez EXACTEMENT :
   ```
   https://istar-back.onrender.com/api/auth/oauth2/callback
   ```
   - Pas d'espace au début/fin
   - Pas de slash final (`/`)
   - `https` (pas `http`)
   - Pas de port

## 🐛 Si le problème persiste toujours

1. **Copiez les logs Render** (la section `=== GOOGLE OAUTH DEBUG ===`)
2. **Copiez l'URL complète** de la page d'erreur Google (elle contient souvent l'URL reçue)
3. **Comparez** les deux URLs caractère par caractère

L'erreur `redirect_uri_mismatch` signifie que Google reçoit une URL différente de celle configurée. Les logs vous diront exactement quelle URL est envoyée.

## 📝 Checklist finale

- [ ] Service redéployé sur Render après suppression de `GOOGLE_REDIRECT_URI`
- [ ] Logs Render montrent `GOOGLE_REDIRECT_URI env: null`
- [ ] Logs Render montrent `redirectUri utilisé: https://istar-back.onrender.com/api/auth/oauth2/callback`
- [ ] URL dans Google Cloud Console correspond exactement
- [ ] Test effectué après redéploiement
- [ ] Attendu 5-10 minutes si modification récente dans Google Cloud Console
