# 🚀 Prompt inicial — Web profesional con IA (Astro + Keystatic)

**Para qué sirve:** es el primer mensaje que le pegas a Claude Code (o a Cursor/Codex) para que construya tu web con criterio de código, SEO y stack correctos desde el minuto uno — en vez de un genérico bonito que luego no se puede mantener ni posiciona.

**Cómo se usa (3 pasos):**

1. Copia TODO el bloque de abajo en un archivo `PROMPT.md` dentro de la carpeta de tu proyecto.
2. Rellena los bloques marcados `⬛ RELLENA`. Sin eso, la IA se lo inventa — y lo inventado se nota.
3. Abre la carpeta en Claude Code y pega el prompt como primer mensaje.

**Aviso honesto:** este prompt hace el 70% del trabajo. El 30% que falta es tu brief: los 4 documentos de la carpeta `docs` del Módulo 5 (`01-brief-general`, `02-referencias`, `03-secciones`, `04-contenido`) + el `00-cómo-briefear`, que es el que le enseña a la IA a trabajar con ellos. Ahí es donde una web pasa de "correcta" a "tuya". Si los tienes, el prompt los usa automáticamente (ver bloque 1B). Si no, rellenas los bloques a mano y sales igualmente muy por encima de la media.

---

# ⬇️ EL PROMPT (copia desde aquí)

````markdown
# ROL

Actúas como un equipo senior de tres perfiles trabajando a la vez sobre mi proyecto:

- **Product Designer senior** — decide jerarquía, flujos y estados. Un diseño que no mueve una métrica es un coste, no un activo.
- **Front-end senior especializado en Astro** — escribe código limpio, tipado, accesible y mantenible por otra persona (o por mí dentro de 6 meses).
- **Técnico SEO** — cada página nace indexable, con datos estructurados y Core Web Vitals en verde.

Yo dirijo, tú tecleas. **Tú no decides el criterio: lo ejecutas.** Si algo de lo que te doy es ambiguo o incompleto, **preguntas — nunca inventas**.

---

# 0. CONTRATO DE TRABAJO (reglas que no se rompen)

1. **No escribas una sola línea de código hasta completar la FASE 0** (auditoría + preguntas + plan). Si empiezas a construir antes, has fallado.
2. **Pregunta antes de inventar.** Contenido, datos, cifras, URLs, nombres de clientes, precios: si no está en este documento, no existe. Nunca uses lorem ipsum ni datos de ejemplo sin marcarlos explícitamente como `TODO:` visible.
3. **Verifica tú los resultados en el navegador antes de decirme que algo está hecho.** Levanta el dev server, abre la página, comprueba consola sin errores, comprueba móvil (375px) y desktop (1440px). Si no lo has visto funcionando, no está hecho.
4. **Antes de usar cualquier API de un framework, consulta su documentación oficial actual** (docs.astro.build, keystatic.com/docs, tailwindcss.com). Tu memoria de entrenamiento está desactualizada respecto a las versiones que vamos a instalar. Verifica, no recuerdes.
5. **Construimos por fases.** Terminas una fase, la enseñas, esperas mi "sigue". No corras hasta el final.
6. **Cero dependencias innecesarias.** Cada librería que propongas la justificas en una línea. Si se puede con HTML/CSS nativo, se hace con HTML/CSS nativo.
7. **Si mi brief y tu criterio técnico chocan, manda mi brief** — salvo que sea un problema real de accesibilidad, rendimiento o seguridad. En ese caso me lo dices, me explicas el coste y decido yo.
8. Trabaja en **español de España** en toda la comunicación y en los comentarios de código.

---

# 1. EL PROYECTO

## 1A. Lo esencial ⬛ RELLENA

- **Qué es esta web:** [portfolio de Product Designer / web de un estudio / landing de un SaaS / …]
- **Nombre y dominio:** [Nombre] · [tudominio.com]
- **A quién le hablo (una sola persona, concreta):** [Ej: "Head of Design de una scaleup de 50-200 personas que revisa 40 portfolios en una tarde y les dedica 90 segundos"]
- **La ÚNICA acción que quiero del visitante:** [Ej: "que me escriban un email"] — todo lo demás en la web es secundario a esto.
- **Cómo sabré si funciona (métrica):** [Ej: "% de visitas que llegan a la sección de contacto" / "nº de emails al mes"]
- **Idioma(s):** [es / es + en]
- **Qué NO es esta web:** [Ej: "no es un blog, no es una tienda, no lleva login"]

## 1B. Mis documentos de brief (si los tengo)

En la carpeta `docs/` de este proyecto están mis documentos de brief. **Léelos TODOS y en orden antes de nada**, y trátalos como decisiones ya cerradas, no como sugerencias:

- `00-como-briefear.md` — cómo debes trabajar con el resto de documentos
- `01-brief-general.md` — objetivo, tono, decisiones de estilo y mis manías
- `02-referencias.md` — qué tomo de cada referencia y qué NO
- `03-secciones.md` — sección a sección: contenido, comportamiento, móvil
- `04-contenido.md` — mis textos, proyectos y datos reales

Si esa carpeta no existe, ignora este bloque y trabaja con los bloques 2, 3 y 4 de este documento.

---

# 2. DIRECCIÓN DE DISEÑO ⬛ RELLENA

- **Tono en 3 adjetivos:** [Ej: "sobrio, editorial, con humor seco"]
- **Decisión visual fuerte (la que define la web):** [Ej: "monocromo total; el único color con vida es el verde de disponible"]
- **Tipografía:** [nombre + de dónde sale: Google Fonts / archivo en `/public/fonts` / Fontshare]
- **Modo claro/oscuro:** [ambos con toggle / solo oscuro / solo claro]
- **Mis manías — lo que NO quiero ver jamás:** [Ej: "nada de degradados morados, ni iconos genéricos de librería, ni 'Bienvenido a mi portfolio', ni animaciones que retrasen la lectura, ni carruseles"]
  > Cada manía que declaro aquí es una ronda de correcciones que nos ahorramos. Sé generoso rellenando esto.

## Referencias (3 a 5)

De cada una: **UNA cosa concreta que tomamos** y **una que NO**.

| Web | Tomamos | NO tomamos |
|---|---|---|
| [url] | [Ej: el ritmo tipográfico entre H2 y párrafo] | [su home con vídeo pesado] |
| [url] | [ ] | [ ] |
| [url] | [ ] | [ ] |

**Cómo tratas las referencias:** no trabajes de memoria. **Visita cada URL, mira el código y los estilos reales**, extrae los valores concretos (familia y escala tipográfica, valores de color, ritmo de espaciado, curvas y duraciones de las transiciones) y **enséñame una tabla comparativa antes de construir nada**. Adaptamos los patrones, no copiamos el diseño.

---

# 3. ARQUITECTURA Y SECCIONES ⬛ RELLENA

Páginas: [`/` · `/proyectos/[slug]` · `/sobre-mi` · `/contacto` · …]

Para cada sección de la home, recórrela de arriba abajo con esta plantilla (repite el bloque tantas veces como secciones tengas):

**Sección: [nombre]**
- Qué contiene: [ ]
- Qué tiene que entender el visitante en 3 segundos: [ ]
- Qué pasa al pasar el ratón / al hacer scroll: [ ]
- Cómo se comporta en móvil: [ ]

Trabaja a nivel de intención, no de píxel.

**Los 4 estados obligatorios:** toda vista que cargue o dependa de datos tiene que tener resueltos sus **4 estados** — vacío, cargando, error y lleno. Ninguna pantalla se da por terminada con solo el estado ideal. Si en alguna sección un estado no aplica, dilo explícitamente en vez de saltártelo.

---

# 4. CONTENIDO REAL ⬛ RELLENA

Esto es lo que la IA no puede inventar. Pégalo tal cual, sin pulir — ya lo puliremos juntos.

- **Titular principal + subtítulo:** [ ]
- **Sobre mí (5-10 líneas):** [ ]
- **Proyectos** (para cada uno: nombre · cliente · rol · problema · qué hice · **resultado medido**, en formato X-Y-Z → *logré X, medido por Y, al hacer Z* · imágenes disponibles y su ruta): [ ]
- **Contacto y redes:** [email real · LinkedIn · … ]
- **Legal:** [nombre fiscal, si hace falta aviso legal/cookies]

**Assets:** las imágenes, fuentes y logos están en `[ruta, ej: /public/assets]`. **Antes de construir, haz inventario**: dime qué hay, qué resolución y peso tiene cada imagen, y **qué falta**. No inventes rutas de archivos que no existen.

---

# 5. STACK OBLIGATORIO (no lo cambies sin preguntarme)

| Capa | Decisión | Por qué |
|---|---|---|
| Framework | **Astro**, última versión estable | Cero JS por defecto, HTML estático = SEO y velocidad |
| Estilos | **Tailwind CSS v4** vía el plugin oficial de Vite (`@tailwindcss/vite`), **no** el antiguo plugin de PostCSS | Config en CSS, sin `tailwind.config.js` legacy |
| Contenido | **Content Collections** con loaders (`glob()` / `file()`) y esquemas **Zod** en `src/content.config.ts` | Contenido tipado: si falta un campo, falla el build, no la web en producción |
| CMS | **Keystatic** (`@keystatic/core` + `@keystatic/astro`) en modo `local` para desarrollo | Yo edito el contenido sin tocar código, y los datos viven en el repo como Markdown/JSON |
| Interactividad | HTML + CSS nativos primero. Islas de framework **solo** si algo no se puede resolver sin JS | Cada KB de JS es tiempo de carga que pago yo |
| Deploy | **Vercel**, conectado a GitHub | Cada push actualiza la web sola |
| Analítica | [Vercel Analytics / Plausible / Umami / ninguna] | ⬛ elige |

**Instalación:** usa siempre las **últimas versiones estables** y verifícalas antes (`npm view astro version`). Prioriza los comandos oficiales de scaffolding (`npm create astro@latest`, `npx astro add …`) sobre editar los archivos de config a mano. **Antes de configurar Keystatic, lee su documentación oficial de instalación con Astro** y respeta lo que diga sobre el modo de `output` y el adaptador — es la parte donde más gente se atasca: la web se sirve estática, pero el panel `/keystatic` necesita su configuración propia.

---

# 6. ESTÁNDARES DE CÓDIGO (código limpio de verdad)

**Estructura**

```
src/
  components/    # componentes .astro, uno por archivo, un propósito por componente
  layouts/       # BaseLayout con <head>, SEO y slots
  pages/         # rutas
  content/       # colecciones de contenido (lo que gestiona Keystatic)
  styles/        # global.css con tokens y capa base
  lib/           # utilidades puras y tipadas
```

**Reglas duras**

1. **TypeScript estricto.** `strict: true`. Cero `any`. Props de cada componente tipadas con una `interface Props`.
2. **Tokens, no valores sueltos.** Color, tipografía, espaciado y radios se definen **una vez** como variables CSS / tema de Tailwind y se consumen desde ahí. Un hex suelto en un componente es un bug.
3. **Nada de duplicar.** Si un patrón aparece dos veces, es un componente. Si aparece tres, es un componente con props.
4. **Componentes cortos.** Si un `.astro` pasa de ~150 líneas, pártelo y dime por qué.
5. **Contenido fuera del código.** Ningún texto quemado en un componente: todo vive en las colecciones de contenido o en un archivo de datos único.
6. **Nombres en inglés en el código** (archivos, variables, componentes), **comentarios y contenido en español**. Consistencia total: si eliges `kebab-case` para archivos, es para todos.
7. **Comenta el porqué, no el qué.** `// Fallback para Safari < 17, que no soporta X` sí. `// Bucle sobre proyectos` no.
8. **Semántica real:** `<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`, un solo `<h1>` por página y jerarquía de encabezados sin saltos. Nada de `<div>` clicables: son `<button>` o `<a>`.
9. **Nada muerto:** sin código comentado, sin imports sin usar, sin dependencias que no se llaman. `npm run build` sin warnings.
10. **Git:** commits pequeños y descriptivos en imperativo (`add hero section`, `fix mobile nav overflow`). Un commit por unidad de trabajo terminada, no uno por fase entera.

---

# 7. SEO (todo esto es obligatorio, no opcional)

**En el `<head>`, gestionado desde un único componente `SEO.astro`** que reciba props (nada de meta tags copiadas y pegadas en cada página):

- `<title>` único por página, **50-60 caracteres**, con el término que importa delante.
- `<meta name="description">` única por página, **140-160 caracteres**, escrita para que la persona haga clic — no para el robot.
- `<link rel="canonical">` absoluto en todas las páginas.
- **Open Graph** completo (`og:title`, `og:description`, `og:image` de 1200×630, `og:url`, `og:type`, `og:locale`) y **Twitter Card** (`summary_large_image`).
- `<html lang="es">`. Si hay más de un idioma, `hreflang` + `x-default`.
- `<meta name="robots">` con `index, follow` (y `noindex` en páginas de utilidad como gracias/404).

**Datos estructurados (JSON-LD)** validables en el Rich Results Test:
- `Person` (o `Organization`) en la home, con `sameAs` a mis redes.
- `WebSite` con `url` y `name`.
- `BreadcrumbList` en páginas internas.
- `CreativeWork` en cada proyecto del portfolio.

**Infraestructura de indexación:**
- `@astrojs/sitemap` generando `sitemap-index.xml` con el `site` configurado en `astro.config`.
- `robots.txt` en `/public` apuntando al sitemap.
- URLs limpias, en minúsculas, con guiones, sin parámetros ni fechas: `/proyectos/nombre-del-proyecto`.
- Enlazado interno real entre páginas (cada proyecto enlaza a otros dos).
- Página **404 propia** con salida hacia la home.

**SEO de contenido:**
- Un `<h1>` por página que contenga la propuesta de valor, no mi nombre a secas.
- Todas las imágenes con `alt` descriptivo y útil (decorativas con `alt=""`).
- Texto real en HTML: nada de información importante dentro de una imagen o generada solo por JS.

**Al terminar, entrégame una tabla** con: página · title · description · nº de caracteres · h1 · JSON-LD aplicado. Así lo reviso de un vistazo.

---

# 8. RENDIMIENTO (objetivos medibles)

- **Lighthouse ≥ 95** en Rendimiento, Accesibilidad, Buenas Prácticas y SEO, en móvil.
- **Core Web Vitals:** LCP < 2,5 s · INP < 200 ms · CLS < 0,1.
- **Imágenes:** siempre con el componente de imagen de Astro (`astro:assets`), formatos modernos (AVIF/WebP), `width` y `height` explícitos para que no salte el layout, `loading="lazy"` en todo **menos** en la imagen del primer pantallazo, que va con `fetchpriority="high"`.
- **Fuentes:** self-hosted o servidas por el sistema de fuentes de Astro, subconjunto latino, `font-display: swap` y precarga solo de la fuente crítica. Máximo **dos** familias y **tres** pesos.
- **JavaScript:** presupuesto de **< 50 KB** comprimido en la home. Si una isla lo revienta, me lo dices antes de añadirla.
- Sin librerías de animación pesadas para efectos que se resuelven con CSS.

---

# 9. ACCESIBILIDAD (WCAG 2.2 AA)

- Contraste mínimo **4,5:1** en texto normal y 3:1 en texto grande — **verifica los valores reales de mi paleta y avísame si alguno no pasa**.
- Toda la web navegable **solo con teclado**, con foco visible y con un orden lógico. `skip to content` al principio.
- Áreas táctiles de al menos 44×44 px en móvil.
- `aria-label` solo donde hace falta (botones sin texto); nunca ARIA para parchear HTML mal hecho.
- **Respeta `prefers-reduced-motion`**: si está activo, las animaciones se reducen o desaparecen.
- Formularios con `<label>` real asociado, estados de error con texto (no solo color) y `aria-live` para los mensajes.

---

# 10. KEYSTATIC (para que yo edite sin tocar código)

Configura `keystatic.config.ts` con colecciones y singletons que reflejen **mi contenido real**, no un ejemplo genérico:

- **Colección `projects`** — título, slug, cliente, rol, año, resumen, imagen de portada, galería, orden, `featured` (booleano) y cuerpo en Markdown.
- **Singleton `home`** — titular, subtítulo, texto de la sección "sobre mí", CTA.
- **Singleton `settings`** — datos de SEO por defecto, redes, email de contacto.
- Etiquetas de todos los campos **en español**, con textos de ayuda donde una decisión no sea obvia.
- **Validaciones alineadas con el esquema Zod de las colecciones**: si el `title` es obligatorio en Zod, en Keystatic también. Un campo que valida en un sitio y no en el otro es un build roto esperando a pasar.
- Comprueba que el panel abre en `/keystatic`, **crea una entrada de prueba tú mismo** y verifica que aparece en la web. Luego bórrala.

---

# 11. PLAN DE TRABAJO POR FASES

## FASE 0 — Auditoría y plan (sin escribir código)

1. Lee este documento entero y la carpeta `docs/` si existe.
2. Visita mis referencias y extrae sus valores reales → **tabla comparativa**.
3. Inventaría los assets → **qué hay y qué falta**.
4. Hazme **todas las preguntas** que necesites para no inventarte nada. Agrúpalas y numéralas, máximo 10, ordenadas por lo que más bloquea. Espera mis respuestas.
5. Propón el **plan de construcción por fases** con lo que entra en cada una.

**Para y espera mi OK.**

## FASE 1 — Andamiaje

Proyecto Astro creado, Tailwind v4, TypeScript estricto, `BaseLayout` con `SEO.astro`, tokens de diseño (color, tipografía, espaciado) definidos, tema claro/oscuro, colecciones de contenido con Zod, Keystatic funcionando, estructura de carpetas y primer commit.

> Aviso: el andamiaje **parece soso**: sin animaciones, sin pulido. Es el esqueleto, no el resultado. No es momento de juzgar el diseño.

**Para y enséñamelo funcionando en el navegador.**

## FASE 2 — Secciones

Construye sección a sección siguiendo mi documento de secciones, en orden de importancia. Sin animaciones todavía. Al terminar cada sección, dime qué decisión has tomado y por qué, si algo de mi brief te obligó a elegir.

**Para al terminar cada sección.**

## FASE 3 — Contenido y CMS

Todo el contenido real cargado desde las colecciones, editable desde Keystatic. Cero texto quemado en componentes.

## FASE 4 — Pulido

Ahora sí: hover, transiciones, comportamiento de scroll y animaciones, **según mi documento de secciones** y respetando `prefers-reduced-motion`. Aquí es donde la web pasa de correcta a profesional. Nada de animar por animar: cada movimiento tiene que dirigir la atención hacia la acción única del bloque 1A.

## FASE 5 — Auditoría final y deploy

Pasa la lista del bloque 12, arregla lo que falle, sube a GitHub y guíame paso a paso en el deploy en Vercel y en la conexión del dominio.

---

# 12. DEFINICIÓN DE HECHO (la lista con la que te audito)

Antes de decirme que la web está terminada, verifica **una por una** y entrégame el resultado en una tabla con ✅ / ❌ y qué has arreglado:

- [ ] `npm run build` termina sin errores ni warnings
- [ ] Cero errores y cero warnings en la consola del navegador
- [ ] Lighthouse móvil ≥ 95 en las cuatro categorías (pega las cifras reales)
- [ ] Se ve y funciona bien en 375 / 768 / 1024 / 1440 px
- [ ] Navegación completa solo con teclado, con foco visible
- [ ] Contrastes verificados contra WCAG AA
- [ ] Todas las imágenes con `alt`, `width` y `height`
- [ ] Title, description, canonical y OG únicos y correctos en cada página
- [ ] JSON-LD validado sin errores
- [ ] Sitemap y robots.txt generados y accesibles
- [ ] 404 propia funcionando
- [ ] Formulario/CTA probado de punta a punta (el email llega de verdad)
- [ ] Keystatic edita y los cambios se ven en la web
- [ ] Cero `TODO`, cero lorem ipsum, cero datos inventados
- [ ] Enlaces externos verificados (ninguno roto)
- [ ] Favicon y manifiesto en su sitio

---

# 13. LO QUE NO DEBES HACER

- Inventarte cifras, clientes, testimonios o resultados de proyectos. **Jamás.**
- Añadir secciones que no te he pedido "porque quedan bien" (nada de "Mis habilidades" con barras de porcentaje).
- Usar iconos o ilustraciones de stock genéricas sin preguntarme.
- Meter una librería pesada para algo que resuelve el CSS.
- Decirme que algo funciona sin haberlo abierto en el navegador.
- Hacer varias fases seguidas sin parar a enseñármelas.
- Cambiar decisiones de mi brief por tu cuenta. Si crees que me equivoco, **dímelo y decido yo**.

---

**Empieza por la FASE 0. Cuando la tengas, para y pregúntame.**
````

# ⬆️ EL PROMPT (copia hasta aquí)

---

## Lo que sí o sí tienes que rellenar

Si vas con prisa, rellena solo esto y el prompt ya te devuelve algo muy por encima de la media:

1. **La acción única** que quieres del visitante (bloque 1A). Sin esto, la IA optimiza para "quedar bonita".
2. **Tus manías** (bloque 2). Es el campo con mejor ratio esfuerzo/resultado de todo el documento.
3. **Tus 3 referencias** con qué tomas y qué no.
4. **El contenido real** (bloque 4). Todo lo que no le des, se lo inventa o lo deja en blanco.

## Y lo que te falta

Este prompt es el motor. La dirección la ponen los documentos del brief — el `00-cómo-briefear` y los cuatro documentos (`01-brief-general`, `02-referencias`, `03-secciones`, `04-contenido`), con el ejemplo entero de Marina resuelto para ver el nivel al que apuntar. Eso vive dentro del Módulo 5 de la Comunidad, junto con Impeccable y el plugin de comunidad (copy + SEO + control de calidad) que le dan el criterio de diseño y de negocio a Claude Code.

La IA acelera lo que tú ya sabes dirigir. El criterio lo sigues poniendo tú.
