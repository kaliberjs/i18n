# i18n

Internationalize your React application.

## Motivation
i18n a.k.a. internationalization. More often than not you want to make your application available in multiple languages. @kaliber/i18n helps translating the static strings in your application.

## Polyfill
This module uses a Symbol to check wether a `I18nContextProvider` is available. At the time of writing, `Symbol` is [supported by most modern browsers](https://caniuse.com/#feat=mdn-javascript_builtins_symbol), but if you need to support IE11 you will have to polyfill it (Symbol is included in polyfill.io's `es2015` polyfill). 

## Installation

```
yarn add @kaliber/i18n
```

## Usage
```jsx
import { I18nContextProvider, useI18n } from '@kaliber/i18n'

const translations = {
  'hello-world': 'Hallo wereld!'
}

function App() {
  return (
    <I18nContextProvider value={translations}>
      <Component />
    </I18nContextProvider>
  )
}

function Component() {
  const i18n = useI18n()
  return <h1>{i18n('hello-world')}</h1>
}
```

![](https://media.giphy.com/media/OBP5KeYczcxxK/giphy.gif)

## Disclaimer
This library is intended for internal use, we provide __no__ support, use at your own risk. It does not import React, but expects it to be provided, which [@kaliber/build](https://kaliberjs.github.io/build/) can handle for you.

This library is not transpiled.