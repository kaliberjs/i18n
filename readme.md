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

[Skip to reference](#reference)

```jsx
import { I18nContextProvider, useI18n, useI18nLanguage } from '@kaliber/i18n'
import { i18n } from './config/i18n.js'

function App() {
  return (
    <I18nContextProvider value={i18n} language='en'>
      <Page />
    </I18nContextProvider>
  )
}

function Page() {
  const i18n = useI18n()
  const language = useI18nLanguage()

  return (
    <div>
      <header>
        <Navigation links={i18n('navigation')} />
      </header>
      <main>
        <PageMain i18nPath='home' />
      </main>
      <aside>
        {/* Missing translations while yield a warning, when not in production mode */}
        {i18n('missing.aMissingTranslation')}
      </aside>
      <footer>
        {i18n('footer').copyright()} - {language.toUpperCase()}
      </footer>
    </div>
  )
}

function PageMain({ i18nPath }) {
  const i18n = useI18n()

  return (
    <article>
      <header>
        {/* Prefix 'title' with the i18nPath */}
        <h1>{i18n(i18nPath, 'title')}</h1>

        {/* Access a translation in 'global' */}
        <em>{i18n('global.writtenBy')}: Kaliber</em>

        {/* Pass down the internationalized items as props */}
        <Tags tags={i18n(i18nPath, 'meta.tags')} />
      </header>

      {/* Or pass down the i18nPath and handle translations lower in the tree */}
      <PageContent {...{ i18nPath }} />
    </article>
  )
}
```

Example i18n object:
```js
const i18n = {
  navigation: [
    {
      label: 'Home',
      link: '#'
    },
    {
      label: {
        nl: 'Neem contact op',
        en: 'Contact us'
      },
      link: '#contact'
    }
  ],
  home: {
    title: {
      nl: 'Welkom!',
      en: 'Welcome!'
    },
    intro: {
      title: {
        nl: 'Een klein beetje typesetting tekst',
        en: 'A bit of typesetting text'
      },
      body: <p>Lorem ipsum dolor sit amet <strong>consectetur adipisicing elit</strong>.</p>,
    },
  },
  footer: {
    copyright: year => `Copyright ${year}`
  }
}
```

![](https://media.giphy.com/media/OBP5KeYczcxxK/giphy.gif)

## Reference

### `I18nContextProvider`

```jsx
<I18nContextProvider value={i18n} language='en'>
  {children}
</I18nContextProvider>
```

| Props          |                                                                               |
|----------------|-------------------------------------------------------------------------------|
| `value`        | The i18n object to use. |
| `language`     | _Optional._ <br />When a language is given, normalization will be attempted at the leave nodes. E.g.: given the language `en` this means a leafnode with the shape `{ en: 'countries', nl: 'landen' }` will be normalized to just `'countries'`. |

The provided i18n object may be a deeply nested object, optionally containing arrays. Values don't have to be strings, you can also provide numbers, functions or React elements (see the example i18n object under [usage](#usage))

### `useI18n`

Returns (a subsection of) the i18n object.

```js
const i18n = useI18n(i18nPath) 
const translatedString = i18n('path')
```

| Input          |                                                                               |
|----------------|-------------------------------------------------------------------------------|
| `i18nPath`         | _Optional._ <br />When given, the returned `i18n` function lookup translations in a subset of the i18n object indicated by `i18nPath`. |

| Output         |                                                                               |
|----------------|-------------------------------------------------------------------------------|
| `i18n`         | A `function` which accepts one or multiple path segments as arguments, which will be joined by dots. The value at this resulting path (prefixed with the `i18nPath`) will be normalized, then returned. When no value is found a warning will be logged (unless you're running production mode). |

### `useI18nLanguage`

Returns the language that is being used.

```js
const language = useI18nLanguage() 
```

## Disclaimer
This library is intended for internal use, we provide __no__ support, use at your own risk. It does not import React, but expects it to be provided, which [@kaliber/build](https://kaliberjs.github.io/build/) can handle for you.

This library is not transpiled.