# Tailwind CSS 4 Configuration

Pour que Tailwind CSS détecte et inclue les classes utilisées par `devstack-notify`, ajoutez simplement une directive `@source` dans votre fichier CSS principal.

## Configuration

Dans votre fichier CSS principal (généralement `src/app.css`, `src/index.css` ou `src/style.css`) :

```css
@import "tailwindcss";

@source "../../node_modules/devstack-notify";
```

C'est tout ! Tailwind 4 scannera automatiquement les fichiers du package et inclura toutes les classes nécessaires.

## Exemple complet

```css
/* src/app.css */
@import "tailwindcss";

/* Ajoutez le package comme source */
@source "../../node_modules/devstack-notify";

/* Vos styles personnalisés */
@layer base {
  body {
    @apply bg-gray-50 dark:bg-gray-900;
  }
}
```

## Pourquoi c'est nécessaire ?

Tailwind CSS 4 utilise les directives `@source` pour détecter automatiquement les classes dans vos dépendances. Sans cette ligne, les styles des notifications (couleurs, espacements, transitions, etc.) ne seront pas inclus dans votre build final.

## Vérification

Après avoir ajouté la directive, vous pouvez vérifier que ça fonctionne en :
1. Redémarrant votre serveur de développement
2. Inspectant une notification dans les DevTools
3. Confirmant que les classes Tailwind sont bien appliquées (couleurs, ombres, etc.)

⚠️ **Important** : Le chemin relatif `../../node_modules/devstack-notify` peut varier selon la structure de votre projet. Ajustez-le si nécessaire.
