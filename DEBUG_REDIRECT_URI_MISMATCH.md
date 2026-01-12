# Debug redirect_uri_mismatch - Étapes de diagnostic

## 🔍 Diagnostic étape par étape

### Étape 1 : Vérifier les logs Render

**CRITIQUE** : Il faut absolument voir les logs Render pour identifier l'URL exacte envoyée à Google.

1. Allez sur [Render Dashboard](https://dashboard.render.com/)
2. Sélectionnez votre service backend (`istar-back`)
3. Cliquez sur **Logs**
4. Testez la connexion Google depuis le frontend
5. **Copiez TOUTES les lignes** qui contiennent `GOOGLE OAUTH DEBUG` ou `redirectUri`

Vous devriez voir quelque chose comme :
```
=== GOOGLE OAUTH DEBUG ===
GOOGLE_REDIRECT_URI env: null
redirectUri utilisé: https://istar-back.onrender.com/api/auth/oauth2/callback
redirectUri encodé: https%3A%2F%2Fistar-back.onrender.com%2Fapi%2Fauth%2Foauth2%2Fcallback
URL Google complète: https://accounts.google.com/o/oauth2/v2/auth?...
```

**⚠️ IMPORTANT** : Copiez ces lignes et partagez-les avec moi.

### Étape 2 : Vérifier l'URL dans Google Cloud Console

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. **APIs & Services** → **Credentials**
3. Cliquez sur votre **OAuth 2.0 Client ID**
4. Dans **Authorized redirect URIs**, copiez EXACTEMENT l'URL qui apparaît

Elle devrait être :
```
https://istar-back.onrender.com/api/auth/oauth2/callback
```

**Vérifiez :**
- Pas d'espace au début ou à la fin
- Pas de slash final (`/`)
- `https` (pas `http`)
- Pas de port (`:8080`, etc.)

### Étape 3 : Comparer les URLs

Comparez **caractère par caractère** :
- L'URL dans les logs Render (`redirectUri utilisé`)
- L'URL dans Google Cloud Console

**Si elles sont différentes, c'est le problème !**

### Étape 4 : Vérifier l'URL de l'erreur Google

Quand l'erreur apparaît, Google affiche parfois l'URL reçue dans l'URL de la page d'erreur.

1. **Copiez l'URL complète** de la page d'erreur Google (dans la barre d'adresse)
2. Cherchez le paramètre `redirect_uri` dans l'URL
3. **Décodez** cette URL (utilisez [urldecoder.org](https://www.urldecoder.org/))
4. Comparez avec l'URL dans Google Cloud Console

### Étape 5 : Vérifier les variables d'environnement sur Render

1. Render Dashboard → votre service → **Environment**
2. **Listez TOUTES les variables d'environnement** qui commencent par `GOOGLE`
3. Vérifiez qu'il n'y a **PAS** de `GOOGLE_REDIRECT_URI`

### Étape 6 : Vérifier le Client ID

Assurez-vous que le `GOOGLE_CLIENT_ID` sur Render correspond au Client ID dans Google Cloud Console.

## 🐛 Problèmes possibles

### Problème 1 : Double encodage
Si l'URL est encodée deux fois, cela peut causer le problème.

### Problème 2 : Espaces invisibles
Parfois il y a des espaces invisibles dans l'URL.

### Problème 3 : Différence de casse
Bien que les URLs soient normalement insensibles à la casse, vérifiez quand même.

### Problème 4 : Cache Google
Google peut mettre du temps à propager les changements. Attendez 10-15 minutes après modification.

## 📝 Informations à me fournir

Pour que je puisse vous aider, j'ai besoin de :

1. **Les logs Render** (la section `=== GOOGLE OAUTH DEBUG ===`)
2. **L'URL exacte** dans Google Cloud Console (copiez-collez)
3. **L'URL complète** de la page d'erreur Google (si possible)
4. **La liste des variables d'environnement** sur Render qui commencent par `GOOGLE`
