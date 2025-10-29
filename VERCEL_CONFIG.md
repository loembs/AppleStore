# Configuration Vercel pour Apple Store

## 🚨 Problème : Produits ne s'affichent pas en production

### Cause
Les variables d'environnement Supabase ne sont pas configurées sur Vercel.

### Solution

#### 1. Configurer les variables d'environnement sur Vercel

1. **Allez sur votre dashboard Vercel** : https://vercel.com/dashboard
2. **Sélectionnez votre projet Apple Store**
3. **Allez dans Settings > Environment Variables**
4. **Ajoutez ces variables** :

```env
VITE_SUPABASE_URL=https://enfgjsucpmsmrqxencxz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVuZmdqc3VjcGptc3JxeGVuY3h6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwODAxNjcsImV4cCI6MjA2NzY1NjE2N30.ZQoobekq-Ccq2JWqw1dT3QJl2sPIMA9-COU0F4v9IDE
```

#### 2. Déployer les migrations Supabase

**Option A : Via le Dashboard Supabase (Recommandé)**
1. Allez sur https://supabase.com/dashboard
2. Sélectionnez votre projet
3. Allez dans SQL Editor
4. Exécutez le contenu de `supabase/migrations/20240101000009_apple_store_simple_schema.sql`
5. Puis exécutez le contenu de `supabase/seed/20240101000002_apple_store_simple_data.sql`

**Option B : Via CLI (si installé)**
```bash
cd supabase
supabase db push
```

#### 3. Redéployer sur Vercel

Après avoir configuré les variables d'environnement :
1. Allez sur Vercel Dashboard
2. Cliquez sur "Redeploy" pour votre dernier déploiement
3. Ou poussez un nouveau commit

### Vérification

1. **Testez la connexion** : Ouvrez la console du navigateur sur votre site de production
2. **Regardez les logs** : Vous devriez voir "🔍 Debug Supabase:" avec les bonnes valeurs
3. **Testez les boutons** : Utilisez les boutons "Test Connexion" et "Test Produits"

### Debug

Si ça ne marche toujours pas :

1. **Vérifiez les variables** : Dans Vercel Dashboard > Settings > Environment Variables
2. **Vérifiez Supabase** : Dans Supabase Dashboard > Table Editor, vérifiez que les tables existent
3. **Regardez les logs** : Dans Vercel Dashboard > Functions > Logs

### URLs importantes

- **Vercel Dashboard** : https://vercel.com/dashboard
- **Supabase Dashboard** : https://supabase.com/dashboard
- **Votre site** : [Votre URL Vercel]

