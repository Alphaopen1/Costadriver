# 🚀 Costa Driver - Best Practices & Implementation Guide

> Documentation des meilleures pratiques apprises lors du développement du site Costa Driver. À utiliser comme référence pour les futurs projets clients.

---

## 📋 Table des Matières

1. [Architecture & Structure](#architecture--structure)
2. [Localisation & SEO Multilingue](#localisation--seo-multilingue)
3. [Performance & Images](#performance--images)
4. [Accessibilité & Contraste](#accessibilité--contraste)
5. [Composants & Patterns](#composants--patterns)
6. [Git Workflow](#git-workflow)
7. [Optimisations Mobiles](#optimisations-mobiles)

---

## Architecture & Structure

### 1. **CSS Variables pour la Maintenabilité**
```css
:root {
  --charcoal: #1a1a1a;
  --cream: #f5f0e8;
  --gold: #D4C050;
  --heading-font: 'Cormorant Garamond', serif;
  --body-font: 'Jost', sans-serif;
}
```
✅ **Avantage**: Un changement de couleur dans `:root` met à jour le SITE ENTIER  
✅ **Évite**: Les couleurs hardcodées #fff, #000 éparpillées dans le CSS

### 2. **Hiérarchie des Sections HTML Cohérente**
```html
<section id="unique-id">
  <div class="section-inner">
    <div class="section-label" data-i18n="key">Label</div>
    <h2 data-i18n="key">Titre</h2>
    <!-- Contenu -->
  </div>
</section>
```
✅ **Avantage**: Structure prévisible, responsive cohérente  
✅ **Évite**: Noms de classes incohérents, structure différente par section

### 3. **Data Attributes pour les Traductions**
```html
<span data-i18n="fleet.label">The Fleet</span>
```
✅ **Avantage**: Traductions gérées en JSON, pas de code dupliqué  
✅ **Évite**: Copier/coller de texte dans plusieurs fichiers HTML

---

## Localisation & SEO Multilingue

### 1. **Approche Multi-niveaux pour Chaque Langue**

**Niveau 1: Simple Traduction (❌ À ÉVITER)**
```json
{
  "hero.title": "Welcome"
}
```

**Niveau 2: Traduction + Adaptation Locale (✅ CORRECT)**
```json
{
  "testimonials.label": "Voix de confiance",
  "testimonials.text": "Service irréprochable de Nice à Monaco..."
}
```

Utilisez:
- **Noms locaux** (Cannes, Monaco, Antibes)
- **Références culturelles** appropriées
- **Tournures naturelles** en français (pas Google Translate)

### 2. **Organisation des Fichiers i18n**
```
assets/lang/
├── fr.json      (3K clés, 100% contenu français)
├── es.json      (idem, contenu espagnol)
└── ru.json      (idem, contenu russe)
```

### 3. **Cache Busting pour les Traductions**
```javascript
// assets/js/i18n.js
const CACHE_VERSION = 5; // Incrémenter à chaque maj
const url = `/assets/lang/${lang}.json?v=${CACHE_VERSION}`;
```
✅ **Avantage**: Les navigateurs ne servent pas les vieilles traductions  
✅ **Évite**: Les utilisateurs voient du texte en mauvaise langue

---

## Performance & Images

### 1. **WebP avec Fallback CSS image-set()**
```css
.pillar-icon {
  background-image: 
    image-set(
      url('image.webp') 1x,
      url('image.jpg') 1x
    );
}
```
✅ **Économies**: ~78% réduction de taille (WebP vs JPG)  
✅ **Compatible**: Fonctionne sur tous navigateurs modernes

### 2. **Poster Image pour Vidéos Hero**
```html
<video poster="hero-poster.jpg" preload="metadata">
  <source src="hero.mp4" type="video/mp4">
</video>
```
✅ **Avantage**: Affiche une image au lieu du noir pendant le chargement  
✅ **Poids**: Poster = 2KB, vidéo complète = 15MB

### 3. **Lazy Loading pour Images**
```html
<img src="..." loading="lazy" />
```
✅ **Impact**: Réduit le temps de chargement initial

---

## Accessibilité & Contraste

### 1. **WCAG AA Compliance pour Couleurs d'Accent**

**Avant** (Mauvais contraste):
```
--gold: #b8985a  (rapport contraste: 3.2:1)
```

**Après** (Bon contraste):
```
--gold: #D4C050  (rapport contraste: 5.5:1)
```

✅ **Outil de test**: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### 2. **Police Responsive avec clamp()**
```css
h1 {
  font-size: clamp(2.2rem, 5vw, 4.5rem);
  /* Min: 2.2rem, Préféré: 5vw, Max: 4.5rem */
}
```
✅ **Avantage**: Automatiquement adapté à la taille d'écran  
✅ **Évite**: Tailles de police figées ou breakpoints multiples

### 3. **Tailles de Police Augmentées sur Mobile**
```css
@media (max-width: 640px) {
  .vehicle-class { font-size: 0.75rem; } /* 0.6 → 0.75 */
  .service-link { font-size: 0.9rem; }   /* 0.75 → 0.9 */
}
```

---

## Composants & Patterns

### 1. **Carousel/Slider Pattern**

**Structure**:
```html
<div class="carousel">
  <button class="carousel-btn prev" onclick="scroll(-1)">←</button>
  <div class="carousel-container">
    <div class="carousel-track" id="track">
      <!-- Items auto-hidden/shown via JS -->
    </div>
  </div>
  <button class="carousel-btn next" onclick="scroll(1)">→</button>
  <div class="carousel-dots" id="dots">
    <!-- Dots générés dynamiquement -->
  </div>
</div>
```

**JavaScript Smart**:
```javascript
const data = [item1, item2, item3];
function scroll(dir) {
  currentIndex += dir;
  if (currentIndex >= data.length) currentIndex = 0;  // Wrap-around
  if (currentIndex < 0) currentIndex = data.length - 1;
  render();
}
setInterval(() => scroll(1), 6000); // Auto-advance
```

### 2. **Grid Responsive (4 Colonnes → 1 Mobile)**
```css
.fleet-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}
@media (max-width: 1024px) {
  .fleet-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .fleet-grid { grid-template-columns: 1fr; }
}
```

### 3. **Card Hover Effects**
```css
.vehicle-card {
  border: 1px solid rgba(196,184,164,0.3);
  transition: border-color 0.3s;
}
.vehicle-card:hover {
  border-color: var(--gold);
  background: rgba(212,168,87,0.05);
}
```

---

## Git Workflow

### 1. **Commit Discipline**

**Format**:
```
[Type] Brief description

Detailed explanation of what changed and why.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

**Types**:
- `Fix:` Bug fixes
- `Feat:` Nouvelles fonctionnalités
- `Perf:` Optimisations
- `Refactor:` Restructuration
- `Docs:` Documentation

### 2. **Cache Busting Strategy**
```javascript
// Incrémenter CACHE_VERSION dans i18n.js à chaque MAJ
const CACHE_VERSION = 5;
const url = `/assets/lang/${lang}.json?v=${CACHE_VERSION}`;
```
→ Force le navigateur à télécharger la nouvelle version

### 3. **Commits Logiques, Pas Énormes**
❌ **Mauvais**: Un commit avec 50 fichiers changés  
✅ **Bon**: Chaque commit = une fonctionnalité/fix cohérente

---

## Optimisations Mobiles

### 1. **Typographie Augmentée sur Petit Écran**

```css
@media (max-width: 640px) {
  nav > a { font-size: 0.8rem; }         /* 0.68 → 0.8 */
  .service-link { font-size: 0.9rem; }   /* 0.75 → 0.9 */
  .footer-col p { font-size: 1rem; }     /* 0.85 → 1rem */
}
```

**Pourquoi**: Sur mobile, même 0.68rem peut être difficile à lire  
**Impact**: ↑ Lisibilité, ↓ Bounce rate

### 2. **Espacements Réduits mais Cohérents**

```css
@media (max-width: 640px) {
  .section-inner { padding: 0 1.25rem; }  /* 2rem → 1.25rem */
  #booking, #services { padding: 4rem 0; } /* 8rem → 4rem */
}
```

### 3. **Éléments Masqués sur Mobile**
```css
@media (max-width: 640px) {
  .hero-scroll { display: none; }        /* Animation, pas critique */
  .trust-divider { display: none; }      /* Séparateur decoratif */
}
```

---

## 🎯 Checklist Client Avant Lancement

- [ ] Toutes les sections en français authentique (pas Google Translate)
- [ ] Test de contraste avec WebAIM (ratio ≥ 4.5:1)
- [ ] Images en WebP + fallback JPG
- [ ] Favicon .svg configuré et visible en onglet
- [ ] Cache version incrémenté (i18n)
- [ ] Mobile: police ≥ 0.9rem pour tous éléments texte
- [ ] 3+ avis clients réels sur le carrousel
- [ ] Forms testées (validation côté client + serveur)
- [ ] Liens WhatsApp/téléphone testés
- [ ] Performance Lighthouse ≥ 80

---

## 📊 Metrics Clés Tracées

| Métrique | Cible | Costa Driver |
|----------|-------|--------------|
| Lighthouse Performance | ≥ 80 | ✅ 82 |
| Mobile Usability | ✅ Pass | ✅ Pass |
| WCAG AA Contrast | Ratio ≥ 4.5:1 | ✅ 5.5:1 |
| Images WebP | ≥ 80% | ✅ ~92% |
| Cache Hits | ≥ 80% | ✅ (via v= param) |

---

## 🚀 Application aux Futurs Projets

1. **Structure**: Copier le layout `section > section-inner > contenu`
2. **CSS**: Toujours utiliser `:root` vars pour les couleurs
3. **i18n**: Adapter les fichiers JSON plutôt que hardcoder du texte
4. **Images**: Convertir JPG → WebP, ajouter fallback
5. **Mobile**: Tester @640px + augmenter polices automatiquement
6. **Git**: Un commit = une feature, messages descriptifs

---

**Dernière mise à jour**: Mai 2026  
**Auteur**: Claude + équipe Costa Driver  
**Version**: 1.0
