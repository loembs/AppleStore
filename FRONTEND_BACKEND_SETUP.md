# 🚀 Configuration Frontend pour Backend Java

## ✅ Modifications effectuées

### 1. Provider Java Backend activé par défaut

Le frontend utilise maintenant le **Java Backend** par défaut au lieu de Supabase.

**Fichier modifié :** `src/config/provider.config.ts`
- `DATA_PROVIDER` = `'java-backend'` par défaut
- `JAVA_BACKEND_URL` = `http://localhost:8081/api` (inclut `/api`)
- `JAVA_BACKEND_BASE_URL` = `http://localhost:8081` (pour OAuth2 sans `/api`)

### 2. Tous les endpoints corrigés

**Fichier modifié :** `src/services/providers/java-backend.provider.ts`

Tous les endpoints incluent maintenant `/api` :
- ✅ `/api/auth/login`
- ✅ `/api/auth/register`
- ✅ `/api/auth/me`
- ✅ `/api/products`
- ✅ `/api/cart`
- ✅ `/api/orders`
- ✅ `/api/categories`

### 3. Authentification complète

**Gestion des tokens :**
- ✅ Stockage dans `localStorage` avec clé `token` (compatible avec `authService`)
- ✅ Stockage également dans `auth_token` (compatible avec `javaBackendAuthProvider`)
- ✅ Stockage de l'utilisateur dans `localStorage` avec mapping correct

**Mapping utilisateur :**
- ✅ `nomcomplet` → `firstName` et `lastName`
- ✅ `role` → `role` (CLIENT, ADMIN)
- ✅ `enabled` → `isActive`
- ✅ Gestion des dates (`createdAt`, `lastLogin`)

**OAuth2 :**
- ✅ Endpoint corrigé : utilise `JAVA_BACKEND_BASE_URL` (sans `/api`)
- ✅ Redirection vers `/oauth2/authorization/google`

### 4. Panier adapté

**Structure de réponse :**
- ✅ Le backend retourne `CartResponse` avec `items`, `total`, `itemCount`
- ✅ Mapping correct des `CartItemResponse` vers le format frontend
- ✅ Gestion des erreurs 403 (non authentifié) → retourne panier vide

### 5. Commandes adaptées

**Format de requête :**
- ✅ Mapping des items au format `OrderItemRequest`
- ✅ Mapping de l'adresse au format `ShippingAddressRequest`
- ✅ Gestion des valeurs par défaut (country: 'Senegal', paymentMethod: 'CARD')

### 6. Gestion des erreurs

- ✅ Extraction des messages d'erreur depuis les réponses API
- ✅ Gestion des erreurs 401 (token invalide) → suppression du token
- ✅ Gestion des erreurs 403 (non autorisé) → panier vide

## 📋 Configuration requise

### Variables d'environnement

Créer un fichier `.env.local` dans `Apple_store/` :

```env
# Provider de données
VITE_DATA_PROVIDER=java-backend

# URL du Backend Java
# Local
VITE_JAVA_BACKEND_URL=http://localhost:8081/api

# Production (après déploiement sur Render)
# VITE_JAVA_BACKEND_URL=https://votre-backend.render.com/api
```

### Fichier .env.example

Un fichier `.env.example` a été créé avec les variables nécessaires.

## 🔧 Utilisation

### Développement local

1. **Démarrer le backend :**
   ```bash
   cd applestore_back
   mvn spring-boot:run
   ```

2. **Démarrer le frontend :**
   ```bash
   cd Apple_store
   npm install
   npm run dev
   ```

3. **Vérifier la configuration :**
   - Ouvrir la console du navigateur
   - Vérifier les logs : `📦 Provider configuré: java-backend`
   - Vérifier l'URL : `🔗 Java Backend URL: http://localhost:8081/api`

### Production

1. **Déployer le backend sur Render**
2. **Mettre à jour `.env` ou variables d'environnement Vercel :**
   ```
   VITE_JAVA_BACKEND_URL=https://votre-backend.render.com/api
   ```

## ✅ Endpoints testés

### Authentification
- ✅ `POST /api/auth/login` - Connexion
- ✅ `POST /api/auth/register` - Inscription
- ✅ `GET /api/auth/me` - Utilisateur actuel
- ✅ `POST /api/auth/logout` - Déconnexion
- ✅ `GET /oauth2/authorization/google` - OAuth2 Google

### Produits
- ✅ `GET /api/products` - Tous les produits
- ✅ `GET /api/products/category/{id}` - Produits par catégorie
- ✅ `GET /api/products/{id}` - Détails produit
- ✅ `GET /api/products/featured` - Produits vedettes
- ✅ `GET /api/products/new` - Nouveaux produits
- ✅ `GET /api/products/bestsellers` - Meilleures ventes
- ✅ `GET /api/products/{id}/colors` - Couleurs
- ✅ `GET /api/products/{id}/storage` - Stockages
- ✅ `GET /api/products/{id}/features` - Caractéristiques
- ✅ `GET /api/products/{id}/specs` - Spécifications

### Panier
- ✅ `GET /api/cart` - Récupérer le panier
- ✅ `POST /api/cart/items` - Ajouter au panier
- ✅ `PUT /api/cart/items/{id}` - Modifier quantité
- ✅ `DELETE /api/cart/items/{id}` - Retirer du panier
- ✅ `DELETE /api/cart` - Vider le panier

### Commandes
- ✅ `POST /api/orders` - Créer une commande
- ✅ `GET /api/orders` - Liste des commandes
- ✅ `GET /api/orders/{id}` - Détails commande

### Catégories
- ✅ `GET /api/categories` - Toutes les catégories

## 🔍 Vérification

### Test de connexion

1. Ouvrir la console du navigateur
2. Vérifier les logs :
   ```
   📦 Provider configuré: java-backend
   🔗 Java Backend URL: http://localhost:8081/api
   🔗 Java Backend Base URL (pour OAuth2): http://localhost:8081
   ```

3. Tester la connexion :
   - Aller sur `/login`
   - Entrer email/password
   - Vérifier que le token est stocké dans `localStorage`

### Test du panier

1. Se connecter
2. Ajouter un produit au panier
3. Vérifier que le panier se charge depuis le backend
4. Vérifier que les items s'affichent correctement

## 🐛 Dépannage

### Erreur : "Provider configuré: supabase"
- Vérifier que `VITE_DATA_PROVIDER=java-backend` dans `.env.local`
- Redémarrer le serveur de développement

### Erreur : "Failed to fetch"
- Vérifier que le backend est démarré sur `http://localhost:8081`
- Vérifier que `VITE_JAVA_BACKEND_URL` est correct
- Vérifier CORS dans le backend

### Erreur : "401 Unauthorized"
- Vérifier que le token est présent dans `localStorage`
- Vérifier que le token n'est pas expiré
- Se reconnecter si nécessaire

### OAuth2 ne fonctionne pas
- Vérifier que `JAVA_BACKEND_BASE_URL` est correct (sans `/api`)
- Vérifier la configuration Google OAuth dans le backend
- Vérifier les variables d'environnement Render

## 📝 Notes importantes

1. **Token storage :** Le token est stocké dans `localStorage` avec la clé `token` (compatible avec `authService`)
2. **Format utilisateur :** Le mapping convertit `nomcomplet` en `firstName` et `lastName`
3. **OAuth2 :** Utilise l'URL de base sans `/api` car Spring Security gère OAuth2 séparément
4. **Panier :** Retourne un panier vide si l'utilisateur n'est pas authentifié (erreur 403)

