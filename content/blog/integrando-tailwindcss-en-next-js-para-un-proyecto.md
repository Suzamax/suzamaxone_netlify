---
path: tailwind-nextjs
date: 2020-10-11T11:42:49.253Z
title: Integrando TailwindCSS en Next.js para un proyecto
description: Un tutorial para solucionar los posibles problemas que surjan al
  realizar la implementación
---

Para utilizar Tailwind con el framework Next.js he tenido que implementar Babel y ajustar un par de cosillas. Además, personalmente prefiero usar Sass, así que eso también lo he añadido en la configuración de Next.js. A continuación unas instrucciones para que salga bien.

## Instalando las dependencias de desarrollo:

```yarn add -D @babel/plugin-transform-react-jsx @babel/types autoprefixer babel-plugin-macros babel-preset-react postcss-cli tailwindcss twin.macro```

Como dije, hay que instalar Babel. Además, usaremos macros para obtener los estilos de Tailwind y usarlos en Styled Components (se instala a continuación).

## Instalando las dependencias finales

Ahora es cuando instalamos React y Next.js además de Styled Components y un procesador de Sass para Webkit (Next.js lo trae integrado y se modifica en `next.config.js`).

```yarn add @zeit/next-sass next node-sass react react-dom styled-components```

## *Downgrade* de autoprefixer

Habrá que bajar la versión de autoprefixer a la "^9.0.0" ya que la 10 requiere PostCSS 8 y aún no lo soporta Next.js.

## Añadir scripts de uso

Los scripts del fichero package.json son los siguientes:

```js
{
  ...,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  ...
}
```

## Configurar Babel

Uso dos ficheros en la raíz del proyecto: **.babelrc** y **babel.plugin.js**. El primero lo utilizo para determinar los plugins de React (JSX) y los macros. El segundo para determinar la configuración de Tailwind.

```js
// .babelrc

{
    "plugins": [
        "@babel/plugin-transform-react-jsx",
        "macros"
    ]
}
```



```js
// babel.plugin.js

module.exports = {
  tailwind: {
    plugins: ["macros"],
    config: "./tailwind.config.js",
    format: "auto"
  }
};
```

## Configurando Next.js para usar SASS y Tailwind

Como hemos instalado anteriormente next-sass, entonces se puede poner una regla en Webkit que la utilice. La confiuguración es casi estándar, solo se llama a un plugin y aportamos como argumento un JSON con Webpack a next-sass.

```js
// next.config.js

const withSass = require("@zeit/next-sass");
const tailwindCss = require("tailwindcss");

module.exports = withSass({
  webpack(config, options) {
    const rules = [{
      test: /\.scss$/,
      use: [
          {
            loader: "postcss-loader",
            options: {
            ident: "postcss",
            plugins: [tailwindCss("./tailwind.config.js")]
          }
        },
      { loader: "sass-loader" }
    ]}
  ];
  return {
    ...config,
    module: { 
      ...config.module, 
      rules: [...config.module.rules, ...rules] 
    }
    };
}});
```

También añadirimos un fichero `src/pages/_app.js` (personalmente utilizo el directorio src para tener todo allí) con este contenido:

```js
import React from "react"
import "../styles/style.scss"

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}

export default MyApp
```

Y añadimos el fichero SASS en `src/styles/style.scss`:

```css
/* Importo también la tipografía */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;800&display=swap');
@import "tailwindcss/base";
@import "tailwindcss/components"; 
@import "tailwindcss/utilities";
```

Y con esto ya tendríamos lista la configuración.

## Crear componentes

Un ejemplo de implementación. Se crearía un fichero styled.js en el mismo directorio en el que tengamos un componente. 

```js
// styled.js
import styled from "styled-components"
import tw from "twin.macro"

export const Logo = styled.a`
    ${tw`bg-gray-900 text-gray-100`}
    width: 10rem;
    display:flex;
    align-items: center;
    justify-content: center;
    height: 3rem;
    font-size: 1.5rem;
    font-family: "Montserrat", sans-serif;
    & {
        span {
            font-weight: 800;
        }
    }
    :hover {
        box-shadow: 0 0 2px rgba(0,0,0,.75);
    }
`
```

Para importarlo se llama en el componente a cada elemento exportado y se utiliza en el JSX como de costumbre:

```js
//index.js
import React from "react"
import { Logo } from './styled'

export default function Header() {
    return <div>
        <Logo href="/">
             tutorial de <span>Tailwind</span> y <span>Next.js</span>
        </Logo>
    </div>
}
```

Espero que sirva para alguien que se plantee usar Next.js y Tailwind a la vez y se encuentre de primeras con los mismos problemas que yo.