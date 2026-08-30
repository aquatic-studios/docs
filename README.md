# Aquatic Studios — Documentation

Documentación oficial de todos los plugins, libraries y APIs de **Aquatic Studios**.

Construida con [Nextra 4](https://nextra.site) + Next.js 15 (App Router), exportada como sitio 100 %
estático y publicada en GitHub Pages.

**Autor:** Senkex

---

## Stack

| Pieza | Qué hace |
| --- | --- |
| **Next.js 15** (App Router) | Framework, export estático (`output: 'export'`) |
| **Nextra 4** | Motor de documentación: sidebar, TOC, breadcrumbs, MDX |
| **MDX** | Markdown + componentes React dentro del mismo archivo |
| **Pagefind** | Buscador estático (`Ctrl` + `K`), sin servidor |
| **Fontsource** | Poppins + JetBrains Mono servidas desde el propio sitio |
| **GitHub Actions** | Build y deploy automático en cada push a `main` |

---

## Comandos

```bash
npm install       # instalar dependencias
npm run dev       # servidor local -> http://localhost:3000
npm run build     # export estático a /out + índice de búsqueda
npm run preview   # servir /out para revisar el build final
npm run clean     # borrar /out y /.next
```

> **No borres el bloque `overrides` de `package.json`.** Nextra 4.6.1 valida sus props con
> Zod y rompe con `zod@4.5.x` (`Invalid input: expected nonoptional, received undefined`).
> El override lo fija en `4.1.12`, que es la versión contra la que Nextra está compilado.

---

## Estructura

```
.
├─ app/
│  ├─ layout.tsx              # navbar, footer, banner, metadatos, tema
│  ├─ globals.css             # TODO el CSS propio (tokens + componentes)
│  ├─ not-found.tsx           # página 404
│  └─ [[...mdxPath]]/page.tsx # ruta catch-all que renderiza el MDX
│
├─ components/                # componentes React usables desde cualquier .mdx
│  ├─ badge.tsx               # <Badge variant="tip">Stable</Badge>
│  ├─ cards.tsx               # <CardGrid> + <LinkCard>
│  ├─ feature.tsx             # <FeatureGrid> + <Feature>
│  ├─ hero.tsx                # <Hero> de la landing
│  ├─ logo.tsx                # isotipo + wordmark de la navbar
│  ├─ plugin-meta.tsx         # <PluginMeta items={{...}} /> ficha técnica
│  ├─ since.tsx               # <Since v="2.0.0" />
│  └─ site-footer.tsx         # footer propio con créditos y disclaimer
│
├─ content/                   # ← acá se escribe la documentación
│  ├─ _meta.ts                # orden y títulos del nivel raíz
│  ├─ index.mdx               # landing
│  ├─ changelog.mdx
│  ├─ start/                  # introduction, installation, conventions, support
│  ├─ libraries/              # aqualib, headrender
│  ├─ api/                    # aquaapi
│  ├─ plugins/
│  │  ├─ aquacore/            # overview, commands, permissions, configuration…
│  │  └─ aquatags/
│  └─ wip/                    # plugins sin publicar
│
├─ public/
│  ├─ CNAME                   # dominio propio de GitHub Pages
│  ├─ .nojekyll               # evita que Pages ignore /_pagefind
│  ├─ favicon.svg
│  └─ images/
│
├─ site.config.ts             # nombre, dominio, repo, redes, colores
├─ mdx-components.tsx         # registra los componentes globales de MDX
├─ next.config.mjs            # Nextra + export estático
└─ .github/workflows/deploy.yml
```

---

## Escribir una página nueva

1. Creá el archivo dentro de `content/`, por ejemplo
   `content/plugins/aquacore/hooks.mdx`.
2. Poné el frontmatter:

   ```mdx
   ---
   title: Hooks
   description: Aparece en Google y en los resultados del buscador.
   ---
   ```

3. Agregala al `_meta.ts` de esa carpeta para fijar su posición en el sidebar:

   ```ts
   export default {
     overview: 'Overview',
     commands: 'Commands',
     hooks: 'Hooks' // ← nueva
   }
   ```

Si no la agregás al `_meta.ts` igual aparece, pero al final y con el título derivado
del nombre del archivo.

---

## Componentes disponibles en MDX

No hace falta importarlos: están registrados en `mdx-components.tsx`.

```mdx
<Badge variant="tip">Stable</Badge>
<Since v="2.0.0" />

<PluginMeta items={{ 'Base command': '`/aqua`', Java: '`17+`' }} />

<Callout type="warning">Ojo con esto.</Callout>

<CardGrid>
  <LinkCard title="Commands" href="/plugins/aquacore/commands" description="Todos los comandos." />
</CardGrid>

<Tabs items={['Gradle', 'Maven']}>
  <Tabs.Tab>…</Tabs.Tab>
  <Tabs.Tab>…</Tabs.Tab>
</Tabs>

<Steps>
### Paso uno
### Paso dos
</Steps>

<FileTree>
  <FileTree.Folder name="plugins" defaultOpen>
    <FileTree.File name="AquaCore.jar" />
  </FileTree.Folder>
</FileTree>
```

Para crear uno nuevo: agregá el `.tsx` en `components/`, sumalo al objeto
`customComponents` de `mdx-components.tsx` y estilalo en `app/globals.css`.

---

## Personalizar el diseño

Todo el CSS propio vive en un solo archivo: **`app/globals.css`**, dividido en secciones
numeradas. Los colores salen de variables CSS, así que para recolorear el sitio entero
alcanza con tocar el bloque `:root` / `.dark` de la sección 1.

El tono del acento que usa Nextra (links, sidebar activo, foco) se define en
`site.config.ts` → `theme`, y se aplica desde `app/layout.tsx` vía el componente `<Head>`.

---

## Deploy en GitHub Pages

### 1. Subir el repo

```bash
git init
git add .
git commit -m "docs: initial Aquatic Studios documentation"
git branch -M main
git remote add origin https://github.com/aquatic-studios/docs.git
git push -u origin main
```

### 2. Activar Pages

En el repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

### 3. Dominio propio

`public/CNAME` ya contiene `docs.aquatic-studios.com`. En tu proveedor de DNS creá:

| Tipo | Nombre | Valor |
| --- | --- | --- |
| `CNAME` | `docs` | `aquatic-studios.github.io` |

Después, en **Settings → Pages → Custom domain**, escribí el dominio y activá
**Enforce HTTPS**.

> Si no vas a usar dominio propio: borrá `public/CNAME` y agregá `basePath: '/docs'` +
> `assetPrefix: '/docs/'` en `next.config.mjs`, porque el repo se llama `docs` y Pages lo
> sirve en `https://aquatic-studios.github.io/docs/`.

### 4. Listo

Cada push a `main` dispara el workflow `.github/workflows/deploy.yml`: instala, buildea,
genera el índice de Pagefind y publica.

---

## Pendientes

En `site.config.ts` quedan dos valores por confirmar:

- `discord` → hoy apunta a `discord.gg/aquaticstudios`, cambialo por la invitación real.
- `url` → `https://docs.aquatic-studios.com`, ajustalo si el dominio final es otro
  (y actualizá `public/CNAME` en consecuencia).

Y en `app/layout.tsx`, el texto del `<Banner>` (o borralo si no lo querés).

---

## Licencia

Documentación © Aquatic Studios. Escrita y mantenida por Senkex.

Este sitio no es un sitio oficial de Minecraft y no está asociado con Mojang Studios ni
Microsoft.
