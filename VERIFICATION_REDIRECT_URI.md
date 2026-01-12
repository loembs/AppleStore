# Vérification de l'URL de redirection Google OAuth

## ✅ Votre configuration Google Cloud Console

Vous avez bien l'URL correcte :
```
https://istar-back.onrender.com/api/auth/oauth2/callback
```

## 🔍 Vérifications à faire sur Render

### 1. Vérifier les variables d'environnement

Sur Render Dashboard → votre service backend → **Environment** :

**Variables REQUISES :**
- ✅ `GOOGLE_CLIENT_ID` : doit être défini
- ✅ `GOOGLE_CLIENT_SECRET` : doit être défini

**Variable à SUPPRIMER ou VÉRIFIER :**
- ⚠️ `GOOGLE_REDIRECT_URI` : 
  - **Option 1 (RECOMMANDÉ)** : Supprimez cette variable complètement
  - **Option 2** : Si elle existe, elle DOIT être exactement : `https://istar-back.onrender.com/api/auth/oauth2/callback`
  - **Pas d'espace, pas de slash final, exactement cette valeur**

### 2. Redéployer le service

Après avoir vérifié/supprimé `GOOGLE_REDIRECT_URI`, **redéployez le service** sur Render.

### 3. Vérifier les logs Render

Après le redéploiement, testez la connexion Google et vérifiez les logs Render. Vous devriez voir :

```
=== GOOGLE OAUTH DEBUG ===
GOOGLE_REDIRECT_URI env: null
redirectUri utilisé: https://istar-back.onrender.com/api/auth/oauth2/callback
redirectUri encodé: https%3A%2F%2Fistar-back.onrender.com%2Fapi%2Fauth%2Foauth2%2Fcallback
```

**⚠️ IMPORTANT :** Vérifiez que `redirectUri utilisé` correspond EXACTEMENT à l'URL dans Google Cloud Console.

## 🐛 Si l'erreur persiste

### Vérification supplémentaire

1. **Dans les logs Render**, copiez la ligne `redirectUri utilisé: ...`
2. **Comparez caractère par caractère** avec l'URL dans Google Cloud Console
3. **Vérifiez qu'il n'y a pas :**
   - D'espaces invisibles
   - De caractères spéciaux
   - De différences de casse
   - De slash final

### Test manuel

Vous pouvez aussi tester l'URL directement en construisant manuellement l'URL Google :

```
https://accounts.google.com/o/oauth2/v2/auth?
  client_id=VOTRE_CLIENT_ID&
  redirect_uri=https%3A%2F%2Fistar-back.onrender.com%2Fapi%2Fauth%2Foauth2%2Fcallback&
  response_type=code&
  scope=openid%20profile%20email&
  access_type=offline&
  prompt=consent
```

Remplacez `VOTRE_CLIENT_ID` par votre vrai Client ID et testez cette URL dans le navigateur.

## 📝 Checklist finale

- [ ] `GOOGLE_REDIRECT_URI` n'existe PAS sur Render (ou a la valeur exacte)
- [ ] `GOOGLE_CLIENT_ID` est défini sur Render
- [ ] `GOOGLE_CLIENT_SECRET` est défini sur Render
- [ ] Le service a été redéployé après les modifications
- [ ] Les logs Render montrent la bonne URL
- [ ] L'URL dans Google Cloud Console correspond exactement
