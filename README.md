# TechVista - Landing Page Premium

Landing page moderne inspirée du design minimaliste, construite avec React, TypeScript et Tailwind CSS.

## 🚀 Démarrage rapide

### Prérequis
- Node.js (v18 ou supérieur)
- npm ou yarn

### Installation

```bash
# 1. Cloner le dépôt
git clone <YOUR_GIT_URL>

# 2. Naviguer dans le dossier
cd <YOUR_PROJECT_NAME>

# 3. Installer les dépendances
npm install

# 4. Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur `http://localhost:8080`

## 📁 Structure du projet

```
src/
├── assets/              # Images générées (hero, produits)
├── components/          # Composants React réutilisables
│   ├── Header.tsx       # Navigation sticky
│   ├── Hero.tsx         # Section héro avec CTAs
│   ├── ProductCard.tsx  # Carte produit
│   ├── ProductGrid.tsx  # Grille de produits
│   ├── PromoSection.tsx # Section promotionnelle
│   ├── ComparisonSection.tsx # Comparateur de modèles
│   ├── AvailabilityBanner.tsx # Bandeau disponibilité
│   └── Footer.tsx       # Footer complet
├── pages/
│   └── Index.tsx        # Page principale
└── index.css            # Design system (couleurs, animations)
```

## 🎨 Personnalisation

### Remplacer les images

Les images générées se trouvent dans `src/assets/`:
- `hero-product.png` (1920x1080) - Image principale du héro
- `product-1.png` à `product-4.png` (800x800) - Images produits

**Formats recommandés :**
- WebP ou AVIF pour la performance
- PNG pour la transparence
- JPG pour les photos

**Tailles recommandées :**
- Hero : 1920x1080px (16:9)
- Produits : 800x800px (1:1)
- Bannières : 1600x600px (8:3)

### Modifier les couleurs

Éditer `src/index.css` pour changer la palette :

```css
:root {
  --primary: 211 100% 50%;        /* Bleu principal */
  --background: 0 0% 100%;        /* Fond blanc */
  --foreground: 0 0% 13%;         /* Texte noir doux */
  /* ... autres variables */
}
```

### Modifier les produits

Éditer `src/components/ProductGrid.tsx` :

```typescript
const products = [
  {
    id: 1,
    name: 'Votre Produit',
    price: '999 €',
    image: votreImage,
    tag: 'Nouveau',
  },
  // ...
];
```

### Personnaliser la navigation

Éditer `src/components/Header.tsx` :

```typescript
const navItems = ['Produits', 'Accessoires', 'Entreprise', 'Support'];
```

## 🎭 Animations

Le design system inclut des animations subtiles :
- `animate-fade-in` - Apparition en fondu
- `animate-fade-in-up` - Apparition en montant
- `animate-scale-in` - Apparition avec zoom

Utilisables via className :
```tsx
<div className="animate-fade-in">Contenu</div>
```

## ♿️ Accessibilité

Le site respecte les standards WCAG 2.1 :
- Navigation au clavier
- Attributs ARIA appropriés
- Contrastes de couleurs suffisants
- Textes alternatifs sur images

## 🚀 Build et déploiement

```bash
# Build de production
npm run build

# Prévisualiser le build
npm run preview
```

Les fichiers de production seront générés dans `/dist`.

### Déploiement sur Lovable

1. Cliquer sur "Publish" en haut à droite
2. Votre site sera automatiquement déployé

### Autres plateformes

- **Vercel** : `vercel deploy`
- **Netlify** : Glisser-déposer le dossier `dist`
- **GitHub Pages** : Configurer GitHub Actions

## 📝 SEO

Le projet inclut :
- Meta tags essentiels dans `index.html`
- Structure sémantique HTML5
- Images optimisées avec lazy loading
- Balises Open Graph pour partage social

Pour améliorer le SEO :
1. Mettre à jour les meta tags dans `index.html`
2. Ajouter un `sitemap.xml`
3. Configurer Google Analytics
4. Implémenter le Schema.org JSON-LD

## 🛠 Technologies

- **React 18** - Library UI
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling utility-first
- **Vite** - Build tool rapide
- **Lucide React** - Icônes modernes
- **shadcn/ui** - Composants accessibles

## 📱 Responsive

Le site est entièrement responsive avec breakpoints :
- Mobile : < 768px
- Tablette : 768px - 1024px
- Desktop : > 1024px

## 🤝 Contribution

Pour contribuer :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 License

Ce projet est un template générique. Adaptez la licence selon vos besoins.

---

Développé avec ❤️ par TechVista
