# Apple Design Guidelines 2019 - Digital Communication

## Principes fondamentaux

### 1. Hiérarchie & Espacement
- **Grid System**: 8px base unit (spacing)
- **Marges**: 24px, 32px, 48px, 64px (multiples de 8)
- **Padding**: 16px minimum pour les éléments cliquables
- **Max-width**: 1440px pour les contenus principaux

### 2. Typographie (Apple HIG)
- **Titres Hero**: 64-96px, font-weight 700
- **Titres Section**: 48-64px, font-weight 600
- **Sous-titres**: 24-32px, font-weight 400
- **Body text**: 17px, font-weight 400, line-height 1.47
- **Small text**: 13-15px, font-weight 400

### 3. Patterns Website Banners (Hero)

#### Layout standard Apple
```
[Image Background] full-height, centered
├─ Overlay: dark/light gradient (40-60% opacity)
└─ Content: centered vertically
   ├─ Title: 96px, bold, center
   ├─ Tagline: 32px, normal, center
   └─ CTA Buttons: 24px spacing
```

#### Règles d'affichage produits
- Image: hauteur 80% du viewport max
- Espacement texte-image: 48px minimum
- Boutons CTA: 48px spacing horizontal

### 4. Trademarks & Legal
- **"Apple Authorized Reseller"**: visible, non-modifiable
- **Logo Apple**: taille minimum 20px, espacement 1x autour
- **Prix**: pas de "€" avant le montant, format: "1 299 €"
- **Names**: toujours "iPhone", "MacBook", "iPad" (pas "i-Phone", "MAC")

### 5. Couleurs & Contrastes
- **Apple Blue**: #0071E3 (primary CTA)
- **Apple Gray**: #8E8E93 (secondary)
- **Background**: #FBFBFD (off-white standard)
- **Contrast minimum**: 4.5:1 pour accessibilité

### 6. Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px
- Large: > 1440px

### 7. Animations & Transitions
- **Durée**: 0.3s (300ms) standard
- **Easing**: cubic-bezier(0.4, 0.0, 0.2, 1) "ease-out"
- **Hover states**: scale(1.02), translateY(-2px)

## Application dans le projet

### Fichiers à corriger
- ✅ `index.css`: SF Pro Display configuré
- ✅ `Header.tsx`: logo + badge conforme
- ⏳ Pages hero: espacement/spacing
- ⏳ Typography: tailles respectées
- ⏳ Buttons: Apple blue, espacement correct

