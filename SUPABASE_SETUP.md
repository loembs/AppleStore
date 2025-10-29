# 🚀 Configuration Supabase pour Apple Store

## 📋 Étapes de configuration

### 1. **Déployer Supabase**
```bash
cd supabase
.\deploy-apple-store.ps1
```

### 2. **Récupérer vos clés Supabase**
1. Allez sur [supabase.com/dashboard](https://supabase.com/dashboard)
2. Sélectionnez votre projet
3. Allez dans **Settings** → **API**
4. Copiez :
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** → `VITE_SUPABASE_ANON_KEY`

### 3. **Mettre à jour .env.local**
```env
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre_cle_anon_supabase
PAYDUNYA_PUBLIC_KEY=votre_cle_publique_paydunya
```

### 4. **Redémarrer l'application**
```bash
npm run dev
```

## ✅ **Résultat attendu**

Une fois configuré, vos pages Mac et iPhone afficheront :
- **Produits depuis Supabase** avec images, couleurs, stockage
- **Données dynamiques** de votre base de données
- **Fonctionnalités complètes** : panier, commandes, authentification

## 🔧 **Vérification**

1. **Console du navigateur** : Plus d'avertissements Supabase
2. **Pages Mac/iPhone** : Produits avec données de la base
3. **Panier** : Fonctionne avec authentification

## 🆘 **Problèmes courants**

- **Erreur de connexion** : Vérifiez les clés dans `.env.local`
- **Données vides** : Vérifiez que les migrations sont appliquées
- **Images cassées** : Vérifiez les URLs dans la base de données

---

**🎉 Une fois configuré, votre Apple Store sera entièrement fonctionnel avec Supabase !**

