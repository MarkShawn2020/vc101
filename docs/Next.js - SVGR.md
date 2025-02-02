---
title: Next.js - SVGR
source: https://react-svgr.com/docs/next/
---

Configure your [Next.js](https://nextjs.org/) project to import SVG as React components in your application.

[](https://react-svgr.com/docs/next/#install)Install
----------------------------------------------------

npm install --save-dev @svgr/webpack

yarn add --dev @svgr/webpack

[](https://react-svgr.com/docs/next/#usage)Usage
------------------------------------------------

Using SVGR in Next.js is possible with `@svgr/webpack`.

**next.config.js**

module.exports \= {

webpack(config) {

const fileLoaderRule \= config.module.rules.find((rule) \=\>

rule.test?.test?.('.svg'),

)

config.module.rules.push(

{

...fileLoaderRule,

test: /\\.svg$/i,

resourceQuery: /url/,

},

{

test: /\\.svg$/i,

issuer: fileLoaderRule.issuer,

resourceQuery: { not: \[...fileLoaderRule.resourceQuery.not, /url/\] },

use: \['@svgr/webpack'\],

},

)

fileLoaderRule.exclude \= /\\.svg$/i

return config

},

}

**Your code**

import Star from './star.svg'

const Example \= () \=\> (

<div\>

<Star /\>

</div\>

)

Or, using the classic (URL) import:

import Image from 'next/image'

import starUrl from './star.svg?url'

const Example \= () \=\> (

<div\>

<Image src\={starUrl} /\>

</div\>

)

Please refer to [SVGR webpack guide](https://react-svgr.com/docs/webpack/) for advanced use cases.

[](https://react-svgr.com/docs/next/#typescript)TypeScript
----------------------------------------------------------

Using SVGR with TypeScript support.

**Type decleration**

Add a custom type decleration file (e.g. **svgr.d.ts**) to the root of your repo.

declare module '\*.svg' {

import { FC, SVGProps } from 'react'

const content: FC<SVGProps<SVGElement\>\>

export default content

}

declare module '\*.svg?url' {

const content: any

export default content

}

**tsconfig.json**

Add the type decleration file to your tsconfig.json's `include` array. **Ensure it's the first item.**

{

"include": \[

"svgr.d.ts",

"next-env.d.ts",

"\*\*/\*.ts",

"\*\*/\*.tsx",

".next/types/\*\*/\*.ts"

\]

}

[Edit this page on GitHub](https://github.com/gregberge/svgredit/main/website/pages/docs/next.mdx)

[← Node.js](https://react-svgr.com/docs/node-api/)[Remix →](https://react-svgr.com/docs/remix/)
